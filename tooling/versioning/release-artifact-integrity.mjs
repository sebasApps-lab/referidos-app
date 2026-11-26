import { readFileSync } from "node:fs";

const REQUEST_FIELDS = [
  "id", "tenant_id", "product_id", "env_id", "release_id", "product_key", "env_key",
  "version_label", "status", "deployment_id", "deployment_status",
].join(", ");
const RELEASE_FIELDS = [
  "id", "tenant_id", "product_key", "env_key", "build_number", "channel",
  "source_commit_sha", "version_label",
].join(", ");
const RELEASE_IDENTITY_FIELDS = "id, tenant_id, product_id, env_id, source_commit_sha, created_at";
const ARTIFACT_FIELDS = [
  "id", "tenant_id", "product_id", "release_id", "product_key", "env_key",
  "version_label", "commit_sha", "artifact_name", "artifact_provider", "artifact_path",
  "size_bytes", "checksum_sha256", "github_repository", "github_run_id",
  "github_artifact_id", "metadata",
].join(", ");

const WAITABLE_REQUEST_STATUS = new Set(["pending", "approved"]);
const PRODUCT_KEYS = new Set(["referidos_app", "prelaunch_web"]);
const ENV_RANK = new Map([["dev", 0], ["staging", 1], ["prod", 2]]);
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const COMMIT_SHA = /^[a-f0-9]{40}$/i;
const SHA256 = /^[a-f0-9]{64}$/i;
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const MAX_ZIP_BYTES = 512 * 1024 * 1024;
const ARTIFACT_NAME = /^[a-z0-9._-]+$/i;
const REPOSITORY = /^[a-z0-9._-]+\/[a-z0-9._-]+$/i;
const DEFAULT_BUCKET = "versioning-artifacts";
const STORAGE_BUCKET = /^[a-z0-9_-]+$/i;
const AUTHENTICATED_DEPLOY = Symbol("authenticated deploy");
const MAX_PROMOTIONS_PER_RELEASE = 500;
const historicalRegistry = JSON.parse(readFileSync(new URL("./historical-release-registry.json", import.meta.url), "utf8"));
const historicalCutoff = Date.parse(historicalRegistry.cutoff);
const verifiedReleases = new Map(historicalRegistry.releases.map((release) => [release.id, release]));
const verifiedArtifacts = new Map(historicalRegistry.artifacts.map((artifact) => [artifact.id, artifact]));

export class ArtifactIntegrityError extends Error {
  constructor(code, message) {
    super(code + ": " + message);
    this.name = "ArtifactIntegrityError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new ArtifactIntegrityError(code, message);
}

function isMatch(value, pattern) {
  return typeof value === "string" && !/[\r\n]/.test(value) && pattern.test(value);
}

export function assertReleaseArtifactWritable(release) {
  if (!PRODUCT_KEYS.has(release.product_key)) return;
  const createdAt = Date.parse(release.created_at);
  if (!Number.isFinite(createdAt) || !Number.isFinite(historicalCutoff) ||
      createdAt < historicalCutoff || verifiedReleases.has(release.id)) {
    fail("historical_artifact_write_forbidden", "Recupera únicamente el ZIP original mediante una revisión de procedencia.");
  }
}

export function assertStorageArtifactWritable(bucket, path) {
  if (historicalRegistry.artifacts.some((record) => record.bucket === bucket && record.path === path)) {
    fail("historical_storage_write_forbidden", "El objeto está protegido por el registro histórico.");
  }
}

function normalizeInput(input) {
  const { requestId, productKey, envKey, semver, sourceCommitSha, deployExecutionId } = input;
  if (!isMatch(requestId, UUID) || !PRODUCT_KEYS.has(productKey) ||
      !["staging", "prod"].includes(envKey) || !isMatch(semver, SEMVER) ||
      !isMatch(sourceCommitSha, COMMIT_SHA)) {
    fail("deploy_input_invalid", "La solicitud requiere IDs, producto, entorno, SemVer y SHA completo válidos.");
  }

  const executionMatch = /^gha-([1-9]\d{0,15})-([a-f0-9]{8})$/i.exec(deployExecutionId ?? "");
  if (!executionMatch || executionMatch[0] !== deployExecutionId ||
      executionMatch[2].toLowerCase() !== requestId.slice(0, 8).toLowerCase()) {
    fail("deploy_execution_invalid", "El identificador de ejecución no corresponde a la solicitud.");
  }

  return Object.freeze({
    requestId: requestId.toLowerCase(),
    productKey,
    envKey,
    semver,
    sourceCommitSha: sourceCommitSha.toLowerCase(),
    deployExecutionId,
  });
}

async function readSingle(supabase, table, fields, idColumn, id) {
  const { data, error } = await supabase
    .from(table)
    .select(fields)
    .eq(idColumn, id)
    .maybeSingle();

  if (error) {
    fail("artifact_registry_read_failed", "No se pudo verificar un registro único en " + table + ".");
  }

  return data;
}

function assertRequestMatch(request, expected) {
  if (!request) {
    fail("deploy_request_not_found", "La solicitud de despliegue no existe.");
  }
  if (request.id !== expected.requestId || !isMatch(request.tenant_id, UUID) ||
      !isMatch(request.product_id, UUID) || !isMatch(request.env_id, UUID) ||
      !isMatch(request.release_id, UUID) ||
      request.product_key !== expected.productKey || request.env_key !== expected.envKey ||
      request.version_label !== expected.semver) {
    fail("deploy_request_mismatch", "La solicitud registrada no coincide con el producto, entorno y versión solicitados.");
  }
}

function assertReleaseMatch(release, target, { id, tenantId, envKey, errorCode }) {
  if (!release || release.id !== id || release.tenant_id !== tenantId ||
      release.product_key !== target.productKey || release.version_label !== target.semver ||
      !isMatch(release.source_commit_sha, COMMIT_SHA) ||
      release.source_commit_sha.toLowerCase() !== target.sourceCommitSha ||
      (envKey !== undefined && release.env_key !== envKey)) {
    fail(errorCode, "El registro de release no coincide con el tenant, producto, versión y SHA completo solicitados.");
  }
}

async function readRelease(supabase, expected, request, { id, envKey, envId, errorCode }) {
  const release = await readSingle(supabase, "version_releases_labeled", RELEASE_FIELDS, "id", id);
  assertReleaseMatch(release, expected, { id, tenantId: request.tenant_id, envKey, errorCode });

  // The labeled view does not expose product_id or env_id.
  const identity = await readSingle(supabase, "version_releases", RELEASE_IDENTITY_FIELDS, "id", id);
  if (!identity || identity.id !== id || identity.tenant_id !== request.tenant_id ||
      identity.product_id !== request.product_id || !isMatch(identity.env_id, UUID) ||
      !isMatch(identity.source_commit_sha, COMMIT_SHA) ||
      identity.source_commit_sha.toLowerCase() !== expected.sourceCommitSha ||
      (envId !== undefined && identity.env_id !== envId)) {
    fail(errorCode, "La referencia a tenant, producto y entorno no coincide con la release vinculada.");
  }
  const createdAt = Date.parse(identity.created_at);
  if (!Number.isFinite(createdAt) || !Number.isFinite(historicalCutoff)) {
    fail("historical_release_date_unverified", "No se pudo verificar la fecha registrada de la release.");
  }
  const verified = verifiedReleases.get(id);
  if (createdAt < historicalCutoff || verified) {
    const artifact = verifiedArtifacts.get(verified?.artifact_id);
    if (!artifact || verified.product !== expected.productKey || verified.env !== release.env_key ||
        verified.semver !== expected.semver || artifact.source_commit_sha !== expected.sourceCommitSha) {
      fail("historical_release_ineligible", "La release histórica no tiene evidencia exacta aprobada.");
    }
  }
  return release;
}

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function resolveReleaseForDeploy(
  supabase,
  input,
  { attempts = 8, delayMs = 2000, wait = sleep } = {},
) {
  const expected = normalizeInput(input);
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 30 ||
      !Number.isInteger(delayMs) || delayMs < 0 || delayMs > 5000) {
    fail("deploy_poll_config_invalid", "Los límites de espera de la ejecución no son válidos.");
  }

  for (let attempt = 0; attempt < attempts; attempt++) {
    const request = await readSingle(
      supabase, "version_deploy_requests_labeled", REQUEST_FIELDS, "id", expected.requestId,
    );
    assertRequestMatch(request, expected);

    if (request.deployment_id === expected.deployExecutionId &&
        request.status === "executed" && request.deployment_status === "started") {
      const release = await readRelease(supabase, expected, request, {
        id: request.release_id,
        envKey: request.env_key,
        envId: request.env_id,
        errorCode: "deploy_release_mismatch",
      });
      return Object.freeze({
        [AUTHENTICATED_DEPLOY]: true,
        expected,
        request: Object.freeze({ ...request }),
        release: Object.freeze({ ...release }),
      });
    }

    // OPS dispatches the workflow before it writes the running execution.
    // Only an unbound, still pending request is eligible for this wait.
    if (request.deployment_id != null || request.deployment_status != null ||
        !WAITABLE_REQUEST_STATUS.has(request.status)) {
      fail("deploy_execution_mismatch", "La ejecución ya registrada es distinta o dejó de estar activa.");
    }

    if (attempt + 1 < attempts) {
      await wait(delayMs);
    }
  }

  fail("deploy_execution_not_registered", "OPS no registró a tiempo esta ejecución iniciada.");
}

function assertBoundRelease(boundRelease) {
  if (!boundRelease?.[AUTHENTICATED_DEPLOY]) {
    fail("deploy_binding_required", "Se debe validar la solicitud y su ejecución antes de resolver el artefacto.");
  }
}

export function releaseOutputs(boundRelease) {
  assertBoundRelease(boundRelease);
  const { request, release, expected } = boundRelease;
  const buildNumber = release.build_number == null ? "" : positiveInteger(release.build_number);
  if (release.build_number != null && !buildNumber) {
    fail("deploy_release_build_number_invalid", "La release tiene un número de build inválido.");
  }
  const channel = release.channel || request.env_key;
  if (!isMatch(channel, /^[a-z0-9_.-]+$/i)) {
    fail("deploy_release_channel_invalid", "La release tiene un canal inválido.");
  }
  return {
    release_id: request.release_id,
    release_build_number: buildNumber,
    release_channel: channel,
    release_version_label: expected.semver,
    release_source_commit_sha: expected.sourceCommitSha,
    tenant_id: request.tenant_id,
  };
}

export async function assertBoundDeployAttempt(supabase, boundRelease, artifactId, checksum, {
  githubRunId, netlifySiteId,
}) {
  assertBoundRelease(boundRelease);
  const { request, expected } = boundRelease;
  const row = await readSingle(
    supabase, "version_deploy_requests", "id, deployment_id, status, deployment_status, metadata", "id", request.id,
  );
  const attempt = row?.metadata?.callback_attempt;
  if (!row || row.deployment_id !== expected.deployExecutionId || row.status !== "executed" ||
      row.deployment_status !== "started" || row.metadata?.publication != null ||
      !attempt || attempt.github_run_id !== githubRunId || attempt.github_run_attempt !== "1" ||
      attempt.netlify_site_id !== netlifySiteId || attempt.tenant_id !== request.tenant_id ||
      attempt.release_id !== request.release_id || attempt.artifact_id !== artifactId ||
      attempt.artifact_checksum_sha256 !== checksum || attempt.source_commit_sha !== expected.sourceCommitSha ||
      attempt.env_key !== expected.envKey || attempt.product_key !== expected.productKey || attempt.semver !== expected.semver) {
    fail("deploy_attempt_mismatch", "El intento, tenant, release, destino y artefacto ya no coinciden con la autorización de OPS.");
  }
}

function positiveInteger(value) {
  const result = typeof value === "number" ? value : typeof value === "string" && /^[1-9]\d*$/.test(value) ? Number(value) : NaN;
  return Number.isSafeInteger(result) && result > 0 ? String(result) : "";
}

function artifactBackfill(message) {
  fail("artifact_backfill_required", message + " Comprueba la procedencia y los bytes originales del ZIP exacto.");
}

function assertArtifactMatch(artifact, boundRelease, ownerRelease) {
  const { request, expected } = boundRelease;
  if (!isMatch(artifact.id, UUID) ||
      artifact.release_id !== ownerRelease.id ||
      artifact.tenant_id !== request.tenant_id || artifact.product_id !== request.product_id ||
      artifact.product_key !== expected.productKey || artifact.env_key !== ownerRelease.env_key ||
      artifact.version_label !== expected.semver ||
      !isMatch(artifact.commit_sha, COMMIT_SHA) ||
      artifact.commit_sha.toLowerCase() !== expected.sourceCommitSha) {
    fail("artifact_provenance_mismatch", "El artefacto registrado no coincide con la release vinculada y el SHA completo.");
  }
  if (!["supabase_storage", "github_actions"].includes(artifact.artifact_provider)) {
    artifactBackfill("El proveedor de este artefacto no admite despliegue web verificado.");
  }
  if (artifact.artifact_provider === "supabase_storage" && artifact.metadata?.storage_deleted_at != null) {
    artifactBackfill("El ZIP registrado dejó de estar disponible en Storage.");
  }
  if (!isMatch(artifact.artifact_name, ARTIFACT_NAME) ||
      !isMatch(artifact.checksum_sha256, SHA256) || !positiveInteger(artifact.size_bytes) ||
      Number(artifact.size_bytes) > MAX_ZIP_BYTES) {
    artifactBackfill("El registro del artefacto no tiene nombre seguro, tamaño y SHA-256 verificables.");
  }
}

async function resolvePredecessor(supabase, boundRelease, currentRelease) {
  const { expected, request } = boundRelease;
  const { data, count, error } = await supabase
    .from("version_promotions")
    .select("tenant_id, product_id, from_release_id, to_release_id", { count: "exact" })
    .eq("to_release_id", currentRelease.id)
    .limit(MAX_PROMOTIONS_PER_RELEASE);

  if (error || !Array.isArray(data) || count !== data.length || count >= MAX_PROMOTIONS_PER_RELEASE) {
    fail("artifact_lineage_read_failed", "No se puede comprobar todo el historial de promociones de la release.");
  }
  if (data.length === 0) return null;

  const predecessors = new Set();
  for (const promotion of data) {
    if (promotion.tenant_id !== request.tenant_id || promotion.product_id !== request.product_id ||
        promotion.to_release_id !== currentRelease.id || !isMatch(promotion.from_release_id, UUID)) {
      fail("artifact_lineage_invalid", "La promoción contiene referencias de release incompatibles.");
    }
    predecessors.add(promotion.from_release_id);
  }
  if (predecessors.size !== 1) {
    fail("artifact_lineage_ambiguous", "La release tiene más de un origen de promoción. Revisa el historial en OPS.");
  }

  const [id] = predecessors;
  const sourceRelease = await readRelease(supabase, expected, request, {
    id,
    errorCode: "artifact_lineage_commit_mismatch",
  });
  if (!ENV_RANK.has(sourceRelease.env_key) ||
      ENV_RANK.get(sourceRelease.env_key) >= ENV_RANK.get(currentRelease.env_key)) {
    fail("artifact_lineage_invalid", "El origen de promoción no corresponde a un entorno anterior.");
  }
  return sourceRelease;
}

export async function resolveArtifactMetadata(supabase, boundRelease) {
  assertBoundRelease(boundRelease);
  let currentRelease = boundRelease.release;
  for (let hop = 0; hop < ENV_RANK.size; hop++) {
    const currentPin = verifiedReleases.get(currentRelease.id);
    const artifact = await readSingle(
      supabase, "version_release_artifacts_labeled", ARTIFACT_FIELDS, "release_id", currentRelease.id,
    );
    if (artifact) {
      assertArtifactMatch(artifact, boundRelease, currentRelease);
      const pinned = verifiedReleases.get(boundRelease.release.id) ?? currentPin;
      if (pinned) {
        const record = verifiedArtifacts.get(pinned.artifact_id);
        if (currentPin?.predecessor_id || pinned.artifact_id !== artifact.id || record.owner_release_id !== artifact.release_id ||
            record.provider !== artifact.artifact_provider || record.bucket !== artifact.metadata?.storage_bucket ||
            record.path !== artifact.artifact_path || record.sha256 !== artifact.checksum_sha256.toLowerCase() ||
            record.size_bytes !== Number(artifact.size_bytes)) {
          fail("historical_artifact_mismatch", "El ZIP no coincide con la identidad y los bytes verificados en la auditoría.");
        }
      }
      return Object.freeze({ ...artifact });
    }
    const predecessor = await resolvePredecessor(supabase, boundRelease, currentRelease);
    if (currentPin && currentPin.predecessor_id !== (predecessor?.id ?? null)) {
      fail("historical_lineage_mismatch", "El origen de promoción difiere de la cadena verificada.");
    }
    if (!predecessor) {
      artifactBackfill("No hay un artefacto asociado a la release ni a su cadena registrada de promociones.");
    }
    currentRelease = predecessor;
  }
  fail("artifact_lineage_invalid", "Se superó el número de entornos de la cadena de promociones.");
}

function storagePathMatches(artifact) {
  const filename = artifact.artifact_name;
  const scope = artifact.product_key + "/" + artifact.version_label + "/";
  const full = artifact.commit_sha.toLowerCase();
  return [full, full.slice(0, 12)].some((sha) => artifact.artifact_path === scope + sha + "/" + filename);
}

function registeredGithubArtifact(artifact, githubRepository) {
  const storedRepo = artifact.github_repository;
  if (!isMatch(githubRepository, REPOSITORY) || !isMatch(storedRepo, REPOSITORY) ||
      githubRepository.toLowerCase() !== storedRepo.toLowerCase()) return null;
  const runId = positiveInteger(artifact.github_run_id);
  const id = positiveInteger(artifact.github_artifact_id);
  if (!runId || !id) return null;

  return { repository: githubRepository, runId, id, name: artifact.artifact_name };
}

export function metadataOutputs(artifact, { githubRepository, defaultBucket = DEFAULT_BUCKET } = {}) {
  const isStorage = artifact.artifact_provider === "supabase_storage";
  const bucket = isStorage ? (artifact.metadata?.storage_bucket || defaultBucket || DEFAULT_BUCKET) : "";
  if (isStorage && (!isMatch(bucket, STORAGE_BUCKET) ||
      !artifact.artifact_name.endsWith(".zip") || !storagePathMatches(artifact))) {
    artifactBackfill("La ruta de Storage no representa el ZIP registrado para ese producto, versión y commit.");
  }

  const github = isStorage ? null : registeredGithubArtifact(artifact, githubRepository);
  if (!isStorage && !github) {
    artifactBackfill("El backup de GitHub carece de identidad verificable de repositorio, run y artefacto.");
  }

  return {
    artifact_id: artifact.id,
    artifact_name: artifact.artifact_name,
    artifact_provider: artifact.artifact_provider,
    artifact_path: isStorage ? artifact.artifact_path : "",
    artifact_bucket: bucket,
    artifact_run_id: github?.runId ?? positiveInteger(artifact.github_run_id),
    artifact_repo: github?.repository ?? (isMatch(artifact.github_repository, REPOSITORY) ? artifact.github_repository : ""),
    artifact_commit_sha: artifact.commit_sha.toLowerCase(),
    artifact_sha256: artifact.checksum_sha256.toLowerCase(),
    artifact_size_bytes: positiveInteger(artifact.size_bytes),
    github_artifact_id: github?.id ?? "",
    github_artifact_name: github?.name ?? "",
  };
}

export function validateGitHubArtifact(apiRecord, { artifactId, artifactName, runId }) {
  if (!positiveInteger(artifactId) || !positiveInteger(runId) || !isMatch(artifactName, ARTIFACT_NAME) ||
      positiveInteger(apiRecord?.id) !== positiveInteger(artifactId) ||
      apiRecord?.name !== artifactName ||
      positiveInteger(apiRecord?.workflow_run?.id) !== positiveInteger(runId)) {
    fail("github_artifact_provenance_mismatch", "El artefacto de GitHub no coincide con el ID, nombre y run registrados en OPS.");
  }
  if (apiRecord.expired !== false) {
    artifactBackfill("El artefacto de GitHub expiró o GitHub no confirmó su disponibilidad.");
  }
}
