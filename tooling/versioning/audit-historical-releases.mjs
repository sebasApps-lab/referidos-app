import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, existsSync, lstatSync, mkdtempSync, openSync, readFileSync, readSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { callbackArtifactLookup, verifyCallbackArtifact } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-callback-artifact.mjs";
import { metadataOutputs, validateGitHubArtifact } from "./release-artifact-integrity.mjs";

const UUID = /^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i;
const SHA = /^[a-f\d]{40}$/i;
const SHA256 = /^[a-f\d]{64}$/i;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const NAME = /^[a-z\d._-]+$/i;
const ENV_RANK = new Map([["dev", 0], ["staging", 1], ["prod", 2]]);
const PRODUCTS = new Set(["referidos_app", "prelaunch_web"]);
const MAX_SIZE = 512 * 1024 * 1024;
const ZIP_VERIFIER = fileURLToPath(new URL("./prepare-release-artifact.py", import.meta.url));

class AuditBlock extends Error {
  constructor(code, detail) {
    super(detail || code);
    this.code = code;
  }
}

function requireEvidence(condition, code, detail) {
  if (!condition) throw new AuditBlock(code, detail);
}

function matches(value, regex) {
  return typeof value === "string" && !/[\r\n]/.test(value) && regex.test(value);
}

function groupBy(rows, column) {
  const groups = new Map();
  for (const row of rows) {
    const key = row?.[column];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  return groups;
}

function validateRelease(row) {
  requireEvidence(row && [row.id, row.tenant_id, row.product_id, row.env_id].every((id) => matches(id, UUID)) &&
    PRODUCTS.has(row.product_key) && ENV_RANK.has(row.env_key) && matches(row.version_label, SEMVER) &&
    matches(row.source_commit_sha, SHA), "release_identity_invalid", "Faltan IDs, SemVer estable o SHA completo de la release.");
  requireEvidence(row.tenant_id === row.labeled_tenant_id && row.product_key === row.labeled_product_key &&
    row.env_key === row.labeled_env_key && row.source_commit_sha === row.labeled_source_commit_sha,
  "release_view_mismatch", "La tabla base y la vista de releases discrepan.");
}

function traceArtifact(target, releaseIndex, promotionsByTarget, artifactsByRelease, result) {
  let current = target;
  for (let depth = 0; depth < ENV_RANK.size; depth++) {
    const hop = { release_id: current.id, env: current.env_key };
    result.promotion_chain.push(hop);
    const owned = artifactsByRelease.get(current.id) || [];
    requireEvidence(owned.length <= 1, "artifact_registry_duplicate", "Hay varios registros asociados al mismo release ID.");
    if (owned.length) return { owner: current, artifact: owned[0] };

    const promotions = promotionsByTarget.get(current.id) || [];
    requireEvidence(promotions.length < 500, "promotion_history_limit", "Se alcanzó el límite defensivo del resolver.");
    requireEvidence(promotions.length > 0, "artifact_absent", "No hay ZIP propio ni un origen de promoción registrado.");
    hop.promotion_ids = promotions.map((row) => row.id);
    requireEvidence(promotions.every((row) => row.tenant_id === target.tenant_id &&
      row.product_id === target.product_id && matches(row.from_release_id, UUID)),
    "promotion_identity_mismatch", "Una promoción se atribuye a otro tenant o producto.");
    const parentIds = new Set(promotions.map((row) => row.from_release_id));
    requireEvidence(parentIds.size === 1, "promotion_ambiguous", "La release registra más de un ID de origen.");
    const parents = releaseIndex.get([...parentIds][0]) || [];
    requireEvidence(parents.length === 1, "promotion_source_unverified", "El origen registrado no es visible o es ambiguo en el export.");
    const [parent] = parents;
    validateRelease(parent);
    requireEvidence(parent.tenant_id === target.tenant_id && parent.product_id === target.product_id &&
      parent.product_key === target.product_key && parent.version_label === target.version_label &&
      ENV_RANK.get(parent.env_key) < ENV_RANK.get(current.env_key),
    "promotion_release_mismatch", "El origen de promoción no respeta el producto, la versión y el orden de entornos.");
    requireEvidence(parent.source_commit_sha.toLowerCase() === target.source_commit_sha.toLowerCase(),
      "promotion_sha_mismatch", "El commit de origen cambia en la cadena de promociones.");
    current = parent;
  }
  throw new AuditBlock("promotion_history_limit", "La cadena supera el número de entornos.");
}

function callbackChecks(target, artifact, directArtifacts) {
  const request = { ...target, release_id: target.id };
  const source = { source_commit_sha: target.source_commit_sha };
  function check(metadata, record) {
    const lookup = callbackArtifactLookup(metadata, target.id);
    return lookup ? verifyCallbackArtifact({ request, release: target, artifact: record, lookup, metadata })
      : { ok: false, reason: "invalid_callback_artifact_id" };
  }
  return {
    current: matches(artifact.checksum_sha256, SHA256)
      ? check({ ...source, artifact_id: artifact.id, artifact_checksum_sha256: artifact.checksum_sha256 }, artifact)
      : { ok: false, reason: "checksum_required_by_current_workflow" },
    legacy_with_id: check({ ...source, artifact_id: artifact.id }, artifact),
    legacy_without_id: directArtifacts.length <= 1
      ? check(source, directArtifacts[0])
      : { ok: false, reason: "callback_artifact_lookup_ambiguous" },
  };
}

function validateArtifact(artifact, owner, occurrenceCount) {
  requireEvidence(occurrenceCount === 1 && matches(artifact.id, UUID) && artifact.labeled_artifact_id === artifact.id &&
    artifact.tenant_id === owner.tenant_id && artifact.product_id === owner.product_id &&
    artifact.product_key === owner.product_key && artifact.env_key === owner.env_key &&
    artifact.release_id === owner.id && artifact.version_label === owner.version_label &&
    artifact.semver === owner.version_label,
  "artifact_identity_mismatch", "El artefacto no coincide con la identidad de su release, o se repite su ID.");
  requireEvidence(matches(artifact.commit_sha, SHA) &&
    artifact.commit_sha.toLowerCase() === owner.source_commit_sha.toLowerCase(),
  "artifact_sha_mismatch", "El SHA completo del artefacto difiere de su release.");
  requireEvidence(["github_actions", "supabase_storage"].includes(artifact.artifact_provider),
    "artifact_provider_unsupported", "El proveedor no admite el despliegue web verificado.");
  requireEvidence(artifact.artifact_provider !== "supabase_storage" || artifact.metadata?.storage_deleted_at == null,
    "artifact_storage_deleted", "OPS marcó el ZIP como eliminado de Storage.");
  requireEvidence(matches(artifact.artifact_name, NAME), "artifact_name_invalid", "Falta un nombre de artefacto válido.");
  requireEvidence(matches(artifact.checksum_sha256, SHA256), "artifact_checksum_missing_or_invalid",
    "Falta un SHA-256 válido en el registro.");
  const size = Number(artifact.size_bytes);
  const hasSize = typeof artifact.size_bytes === "number" || matches(artifact.size_bytes, /^[1-9]\d*$/);
  requireEvidence(hasSize && Number.isSafeInteger(size) && size > 0 && size <= MAX_SIZE,
    "artifact_size_missing_or_invalid", "Falta un tamaño positivo registrado o supera 512 MiB.");
}

function recordDownload(proof, result) {
  requireEvidence(typeof proof.checked_at === "string" && Number.isFinite(Date.parse(proof.checked_at)) &&
    matches(proof.file_sha256, SHA256) && Number.isSafeInteger(proof.file_size_bytes) && proof.file_size_bytes > 0,
  "download_evidence_incomplete", "La descarga observada requiere fecha, tamaño y SHA-256 de su archivo.");
  result.evidence.remote_zip = "download_observed";
  result.evidence.remote_file = { sha256: proof.file_sha256.toLowerCase(), size_bytes: proof.file_size_bytes };
}

function inspectAvailability(artifact, metadata, evidence, result) {
  const id = artifact.id;
  if (artifact.artifact_provider === "github_actions") {
    const proof = evidence?.github?.[id];
    if (!proof) return;
    result.evidence.remote_checked_at = proof.checked_at ?? null;
    requireEvidence(typeof proof.repository === "string" && proof.repository.toLowerCase() === metadata.artifact_repo.toLowerCase(),
      "availability_scope_mismatch", "La comprobación no corresponde al repositorio registrado.");
    requireEvidence(proof.record?.expired !== true, "artifact_github_expired", "GitHub marcó el artefacto como expirado.");
    if (proof.result === "missing") throw new AuditBlock("artifact_github_missing", "La consulta autorizada no encontró el artefacto.");
    if (!proof.record) return;
    validateGitHubArtifact(proof.record, {
      artifactId: metadata.github_artifact_id,
      artifactName: metadata.github_artifact_name,
      runId: metadata.artifact_run_id,
    });
    if (proof.result === "downloaded") recordDownload(proof, result);
    else result.evidence.remote_zip = "github_metadata_only";
    return;
  }

  const proof = evidence?.storage?.[id];
  if (!proof) return;
  result.evidence.remote_checked_at = proof.checked_at ?? null;
  requireEvidence(proof.bucket === metadata.artifact_bucket && proof.path === metadata.artifact_path,
    "availability_scope_mismatch", "La comprobación corresponde a otro objeto de Storage.");
  if (proof.result === "missing") throw new AuditBlock("artifact_storage_missing", "La consulta autorizada no encontró el objeto.");
  if (proof.result === "downloaded") recordDownload(proof, result);
  else if (proof.result === "listed") result.evidence.remote_zip = "storage_catalog_only";
}

function checksumFile(file) {
  const sha = createHash("sha256");
  const handle = openSync(file, "r");
  const buffer = Buffer.alloc(1024 * 1024);
  let size = 0;
  try {
    let read;
    while ((read = readSync(handle, buffer))) {
      size += read;
      requireEvidence(size <= MAX_SIZE + 4 * 1024 * 1024, "zip_validation_failed", "El archivo supera el límite de verificación.");
      sha.update(buffer.subarray(0, read));
    }
  } finally {
    closeSync(handle);
  }
  return { sha256: sha.digest("hex"), size_bytes: size };
}

function verifyLocalZip(archiveDir, artifactId, metadata, python) {
  if (!archiveDir) return null;
  const root = realpathSync(archiveDir);
  const archive = join(root, artifactId + ".zip");
  if (!existsSync(archive)) return null;
  requireEvidence(lstatSync(archive).isFile() && dirname(realpathSync(archive)) === root,
    "unsafe_local_archive", "La copia debe ser un archivo local dentro del directorio indicado.");
  const tempRoot = realpathSync(tmpdir());
  const temp = mkdtempSync(join(tempRoot, "versioning-read-audit-"));
  try {
    const args = ["-B", ZIP_VERIFIER, "--archive", archive, "--output", join(temp, "extracted"),
      "--checksum", metadata.artifact_sha256, "--size", metadata.artifact_size_bytes];
    if (metadata.artifact_provider === "github_actions") args.push("--github-wrapper");
    const run = spawnSync(python, args, { encoding: "utf8", timeout: 120_000, windowsHide: true });
    requireEvidence(!run.error, "zip_verifier_unavailable", "No se pudo completar la verificación local con Python.");
    requireEvidence(run.status === 0, "zip_validation_failed", "La copia local no pasa la comprobación de bytes o la extracción segura.");
    return metadata.artifact_provider === "github_actions" ? checksumFile(archive) : {
      sha256: metadata.artifact_sha256,
      size_bytes: Number(metadata.artifact_size_bytes),
    };
  } finally {
    if (dirname(temp) === tempRoot && basename(temp).startsWith("versioning-read-audit-")) {
      rmSync(temp, { recursive: true, force: true });
    }
  }
}

export function auditHistoricalSnapshot(snapshot, { repository, defaultBucket, evidence, archiveDir, python = "python" } = {}) {
  if (snapshot?.schema_version !== 1 || !Number.isFinite(Date.parse(snapshot.cutoff)) ||
    !Number.isFinite(Date.parse(snapshot.captured_at)) ||
    !["targets", "releases", "artifacts", "promotions"].every((key) => Array.isArray(snapshot[key])) ||
    !snapshot.targets.every((id) => matches(id, UUID)) || new Set(snapshot.targets).size !== snapshot.targets.length) {
    throw new Error("El export no corresponde al formato de auditoría versión 1.");
  }
  const releases = groupBy(snapshot.releases, "id");
  const promotions = groupBy(snapshot.promotions, "to_release_id");
  const artifacts = groupBy(snapshot.artifacts, "release_id");
  const artifactIds = groupBy(snapshot.artifacts, "id");
  const zipChecks = new Map();
  const rows = snapshot.targets.map((id) => {
    const [target] = releases.get(id) || [];
    const result = {
      product: target?.product_key ?? null, version: target?.version_label ?? null,
      environment: target?.env_key ?? null, release_id: id, source_sha: target?.source_commit_sha ?? null,
      role: target?.env_key === "dev" ? "build_source" : "deploy_target",
      artifact_id: null, artifact_owner_release_id: null, promotion_chain: [], callbacks: null,
      evidence: { registry: "unverified", remote_zip: "unverified", remote_checked_at: null,
        registered_sha256: null, registered_size_bytes: null,
        local_sha256_and_size: false, local_extraction: false },
      result: "blocked", reason: null,
    };
    try {
      requireEvidence(releases.get(id)?.length === 1, "target_release_unverified", "Falta una release destino única en el export.");
      validateRelease(target);
      const build = target.build_number;
      const validBuild = build == null || ((typeof build === "number" || matches(build, /^[1-9]\d*$/)) &&
        Number.isSafeInteger(Number(build)) && Number(build) > 0);
      requireEvidence(validBuild && matches(target.channel || target.env_key, NAME),
        "target_release_metadata_invalid", "El número de build o el canal del destino no son válidos.");
      requireEvidence(Date.parse(target.created_at) < Date.parse(snapshot.cutoff),
        "target_outside_cutoff", "La release no consta como anterior al punto de corte.");
      const { owner, artifact } = traceArtifact(target, releases, promotions, artifacts, result);
      result.artifact_id = artifact.id;
      result.artifact_owner_release_id = owner.id;
      result.evidence.registered_sha256 = artifact.checksum_sha256 ?? null;
      result.evidence.registered_size_bytes = artifact.size_bytes ?? null;
      result.callbacks = callbackChecks(target, artifact, artifacts.get(target.id) || []);
      validateArtifact(artifact, owner, artifactIds.get(artifact.id)?.length);
      const locator = metadataOutputs(artifact, { githubRepository: repository, defaultBucket });
      result.evidence.registry = "verified";
      requireEvidence(result.callbacks.current.ok, "current_callback_incompatible", result.callbacks.current.reason);
      // Missing or inaccessible remote evidence never prevents local byte verification.
      let availabilityError;
      try { inspectAvailability(artifact, locator, evidence, result); } catch (error) { availabilityError = error; }
      const cached = zipChecks.get(artifact.id);
      if (!cached) {
        try { zipChecks.set(artifact.id, { file: verifyLocalZip(archiveDir, artifact.id, locator, python) }); }
        catch (error) { zipChecks.set(artifact.id, { error }); }
      }
      const zip = zipChecks.get(artifact.id);
      if (zip.error) throw zip.error;
      result.evidence.local_sha256_and_size = Boolean(zip.file);
      result.evidence.local_extraction = Boolean(zip.file);
      if (availabilityError) throw availabilityError;
      if (result.evidence.remote_zip === "download_observed" && zip.file) {
        const observed = result.evidence.remote_file;
        requireEvidence(zip.file.sha256 === observed.sha256 && zip.file.size_bytes === observed.size_bytes,
          "download_archive_mismatch", "La copia local no es el archivo identificado por la evidencia de descarga.");
        result.result = "verified_offline_evidence";
      } else {
        result.result = "blocked_missing_evidence";
        result.reason = { code: "artifact_evidence_incomplete", detail: "Falta evidencia de descarga autorizada o de bytes verificados." };
      }
    } catch (error) {
      if (!error.code) throw error;
      result.reason = {
        code: error.code,
        detail: error instanceof AuditBlock || error.name === "ArtifactIntegrityError" ? error.message : "Error local al verificar la evidencia.",
      };
    }
    return result;
  });
  return {
    cutoff: snapshot.cutoff, captured_at: snapshot.captured_at, scope: "historical_read_only",
    status: rows.length ? "evaluated" : "empty_snapshot", rows,
  };
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    const { values } = parseArgs({ options: {
      snapshot: { type: "string" }, evidence: { type: "string" }, archives: { type: "string" },
      repository: { type: "string" }, python: { type: "string" }, "default-bucket": { type: "string" },
    } });
    if (!values.snapshot) throw new Error("Indica --snapshot <export.json>.");
    const result = auditHistoricalSnapshot(readJson(values.snapshot), {
      repository: values.repository, evidence: values.evidence ? readJson(values.evidence) : null,
      archiveDir: values.archives, python: values.python, defaultBucket: values["default-bucket"],
    });
    console.log(JSON.stringify(result, null, 2));
    if (!result.rows.length || result.rows.some((row) => row.result !== "verified_offline_evidence")) process.exitCode = 2;
  } catch (error) {
    console.error(error.code || error.message);
    process.exitCode = 1;
  }
}
