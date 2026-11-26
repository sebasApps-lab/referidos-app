import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { auditHistoricalSnapshot } from "./audit-historical-releases.mjs";

const uuid = (value) => "a1000000-0000-4000-8000-" + String(value).padStart(12, "0");
const SOURCE_SHA = "a".repeat(40);
const VERSION = "3.4.5";
const PRODUCT = "referidos_app";
const REPO = "example-owner/example-project";
const TIME = "2026-11-25T12:00:00Z";
const CUTOFF = "2026-11-26T05:24:15Z";
const CHECKED = "2026-11-27T12:00:00Z";
const BUCKET = "versioning-artifacts";
const ARCHIVE = "release-3.4.5.zip";

function row(id, env, product = PRODUCT) {
  return {
    id: uuid(id), tenant_id: uuid(11), product_id: uuid(product === PRODUCT ? 12 : 13),
    env_id: uuid({ dev: 14, staging: 15, prod: 16 }[env]), product_key: product,
    env_key: env, source_commit_sha: SOURCE_SHA, version_label: VERSION, created_at: TIME,
    build_number: 2, channel: env, labeled_tenant_id: uuid(11), labeled_product_key: product,
    labeled_env_key: env, labeled_source_commit_sha: SOURCE_SHA,
  };
}

function registry(release) {
  return {
    id: uuid(10), labeled_artifact_id: uuid(10), release_id: release.id,
    tenant_id: release.tenant_id, product_id: release.product_id, product_key: release.product_key,
    env_key: release.env_key, version_label: VERSION, semver: VERSION, commit_sha: SOURCE_SHA,
    artifact_provider: "supabase_storage", artifact_name: ARCHIVE,
    artifact_path: release.product_key + "/" + VERSION + "/" + SOURCE_SHA.slice(0, 12) + "/" + ARCHIVE,
    checksum_sha256: "b".repeat(64), size_bytes: 500, metadata: { storage_bucket: BUCKET },
  };
}

function promotion(id, from, to) {
  return {
    id: uuid(id), tenant_id: from.tenant_id, product_id: from.product_id,
    from_release_id: from.id, to_release_id: to.id, created_at: TIME,
  };
}

function dataset(product) {
  const dev = row(1, "dev", product);
  const staging = row(2, "staging", product);
  const prod = row(3, "prod", product);
  return {
    schema_version: 1, cutoff: CUTOFF, captured_at: CHECKED,
    targets: [dev.id, staging.id, prod.id], releases: [dev, staging, prod],
    artifacts: [registry(dev)], promotions: [promotion(20, dev, staging), promotion(21, staging, prod)],
  };
}

function withZip(t, snapshot, entry = "index.html") {
  const tempRoot = tmpdir();
  const folder = mkdtempSync(join(tempRoot, "historical-audit-fixture-"));
  const destination = join(folder, "archives");
  mkdirSync(destination);
  t.after(() => {
    if (dirname(folder) === tempRoot && basename(folder).startsWith("historical-audit-fixture-")) {
      rmSync(folder, { recursive: true, force: true });
    }
  });
  const [record] = snapshot.artifacts;
  const file = join(destination, record.id + ".zip");
  const created = spawnSync("python", ["-B", "-c",
    "from zipfile import ZipFile; import sys\nwith ZipFile(sys.argv[1], 'w') as out: out.writestr(sys.argv[2], '<html>fixture</html>')",
    file, entry,
  ], { encoding: "utf8", windowsHide: true });
  assert.equal(created.status, 0, created.stderr || created.error?.message);
  const bytes = readFileSync(file);
  record.size_bytes = bytes.length;
  record.checksum_sha256 = createHash("sha256").update(bytes).digest("hex");
  const evidence = { storage: {
    [record.id]: {
      result: "downloaded", bucket: BUCKET, path: record.artifact_path, checked_at: CHECKED,
      file_sha256: record.checksum_sha256, file_size_bytes: record.size_bytes,
    },
  } };
  return { folder, file, archiveDir: destination, evidence };
}

test("verifica el ZIP de Desarrollo y su reutilización exacta en Staging y Producción", (t) => {
  const snapshot = dataset();
  const options = withZip(t, snapshot);
  snapshot.promotions.push(promotion(22, snapshot.releases[0], snapshot.releases[1]));
  const before = structuredClone(snapshot);
  const { rows } = auditHistoricalSnapshot(snapshot, options);
  assert.deepEqual(rows.map((row) => row.result), Array(3).fill("verified_offline_evidence"));
  assert.deepEqual(rows[2].promotion_chain.map((hop) => hop.env), ["prod", "staging", "dev"]);
  assert.deepEqual(rows[1].promotion_chain[0].promotion_ids, [uuid(20), uuid(22)]);
  assert.ok(rows.every((row) => row.artifact_id === uuid(10) && row.artifact_owner_release_id === uuid(1)));
  assert.ok(rows.every((row) => row.evidence.local_extraction && row.callbacks.current.ok));
  assert.deepEqual(snapshot, before);
  assert.deepEqual(readdirSync(options.archiveDir), [uuid(10) + ".zip"]);
});

test("distingue callback histórico sin ID propio de uno con ID exacto para la release promovida", () => {
  const { rows } = auditHistoricalSnapshot(dataset("prelaunch_web"));
  assert.equal(rows[0].product, "prelaunch_web");
  assert.equal(rows[0].callbacks.legacy_without_id.ok, true);
  assert.equal(rows[2].callbacks.legacy_with_id.ok, true);
  assert.deepEqual(rows[2].callbacks.legacy_without_id, { ok: false, reason: "artifact_not_found" });
  assert.equal(rows[2].result, "blocked_missing_evidence");
});

test("bloquea un checksum ausente y tamaños vacíos, cero o fuera del límite", () => {
  for (const [key, value, code] of [
    ["checksum_sha256", null, "artifact_checksum_missing_or_invalid"],
    ["size_bytes", null, "artifact_size_missing_or_invalid"],
    ["size_bytes", 0, "artifact_size_missing_or_invalid"],
    ["size_bytes", 600 * 1024 * 1024, "artifact_size_missing_or_invalid"],
  ]) {
    const snapshot = dataset();
    snapshot.artifacts[0][key] = value;
    assert.equal(auditHistoricalSnapshot(snapshot).rows[2].reason.code, code);
  }
});

test("rechaza discrepancias de SHA en la cadena, el registro y la vista", () => {
  const snapshot = dataset();
  const changed = "9".repeat(40);
  snapshot.releases[1].source_commit_sha = changed;
  assert.equal(auditHistoricalSnapshot(snapshot).rows[1].reason.code, "release_view_mismatch");
  snapshot.releases[1].labeled_source_commit_sha = changed;
  assert.equal(auditHistoricalSnapshot(snapshot).rows[2].reason.code, "promotion_sha_mismatch");
  snapshot.artifacts[0].commit_sha = changed;
  assert.equal(auditHistoricalSnapshot(snapshot).rows[0].reason.code, "artifact_sha_mismatch");
});

test("sin arista de promoción, jamás elige por coincidencia de versión, producto o SHA", () => {
  const snapshot = dataset();
  snapshot.promotions = [];
  const { rows } = auditHistoricalSnapshot(snapshot);
  assert.equal(rows[1].reason.code, "artifact_absent");
  assert.equal(rows[1].artifact_id, null);
});

test("una marca de borrado en Storage corta la comprobación de compatibilidad", () => {
  const snapshot = dataset();
  snapshot.artifacts[0].metadata.storage_deleted_at = TIME;
  assert.equal(auditHistoricalSnapshot(snapshot).rows[2].reason.code, "artifact_storage_deleted");
});

test("distingue ausencia del ZIP observada de una consulta sin permiso", () => {
  const snapshot = dataset();
  const [artifact] = snapshot.artifacts;
  const proof = { bucket: BUCKET, path: artifact.artifact_path, result: "missing" };
  const evidence = { storage: { [artifact.id]: proof } };
  assert.equal(auditHistoricalSnapshot(snapshot, { evidence }).rows[0].reason.code, "artifact_storage_missing");
  proof.result = "unauthorized";
  assert.equal(auditHistoricalSnapshot(snapshot, { evidence }).rows[0].result, "blocked_missing_evidence");
});

test("rechaza un GitHub Artifact expirado y valida su ID, nombre y run", (t) => {
  const snapshot = dataset();
  const options = withZip(t, snapshot);
  const [artifact] = snapshot.artifacts;
  Object.assign(artifact, { artifact_provider: "github_actions", github_repository: REPO,
    github_run_id: 95, github_artifact_id: 97, artifact_name: "embedded-release" });
  const proof = { repository: REPO, result: "downloaded",
    checked_at: CHECKED, file_sha256: artifact.checksum_sha256, file_size_bytes: artifact.size_bytes,
    record: { id: 97, name: artifact.artifact_name, expired: true, workflow_run: { id: 95 } } };
  const evidence = { github: { [artifact.id]: proof } };
  const scope = { ...options, evidence, repository: REPO };
  assert.equal(auditHistoricalSnapshot(snapshot, scope).rows[0].reason.code, "artifact_github_expired");
  proof.record.expired = false;
  proof.record.workflow_run.id = 75;
  assert.equal(auditHistoricalSnapshot(snapshot, scope).rows[0].reason.code, "github_artifact_provenance_mismatch");
  proof.record.workflow_run.id = 95;
  assert.equal(auditHistoricalSnapshot(snapshot, scope).rows[0].result, "verified_offline_evidence");
});

test("bloquea una ascendencia con dos posibles orígenes distintos", () => {
  const snapshot = dataset();
  const other = row(22, "dev");
  snapshot.releases.push(other);
  snapshot.promotions.push(promotion(23, other, snapshot.releases[1]));
  assert.equal(auditHistoricalSnapshot(snapshot).rows[2].reason.code, "promotion_ambiguous");
});

test("un registro propio duplicado o incompatible no autoriza usar el ZIP de Desarrollo", () => {
  const snapshot = dataset();
  const owned = registry(snapshot.releases[1]);
  Object.assign(owned, { id: uuid(24), labeled_artifact_id: uuid(24), commit_sha: "5".repeat(40) });
  snapshot.artifacts.push(owned);
  assert.equal(auditHistoricalSnapshot(snapshot).rows[1].reason.code, "artifact_sha_mismatch");
  snapshot.artifacts.push({ ...owned, id: uuid(25), labeled_artifact_id: uuid(25) });
  assert.equal(auditHistoricalSnapshot(snapshot).rows[1].reason.code, "artifact_registry_duplicate");
});

test("un ZIP de bytes distintos o con rutas inseguras queda bloqueado aunque conste descargado", (t) => {
  const safe = dataset();
  const options = withZip(t, safe);
  safe.artifacts[0].checksum_sha256 = "c".repeat(64);
  assert.equal(auditHistoricalSnapshot(safe, options).rows[0].reason.code, "zip_validation_failed");
  const unsafe = dataset();
  const second = withZip(t, unsafe, "../outside.html");
  assert.equal(auditHistoricalSnapshot(unsafe, second).rows[0].reason.code, "zip_validation_failed");
  assert.equal(existsSync(join(second.folder, "outside.html")), false);
});

test("distingue copia local y presencia de catálogo de la descarga autorizada", (t) => {
  const snapshot = dataset();
  const options = withZip(t, snapshot);
  options.evidence.storage[uuid(10)].result = "listed";
  const { rows } = auditHistoricalSnapshot(snapshot, options);
  assert.equal(rows[0].evidence.remote_zip, "storage_catalog_only");
  assert.equal(rows[0].evidence.local_extraction, true);
  assert.equal(rows[0].result, "blocked_missing_evidence");
});

test("una observación de descarga exige fecha y huella de la misma copia local", (t) => {
  const snapshot = dataset();
  const options = withZip(t, snapshot);
  const proof = options.evidence.storage[uuid(10)];
  delete proof.checked_at;
  assert.equal(auditHistoricalSnapshot(snapshot, options).rows[0].reason.code, "download_evidence_incomplete");
  proof.checked_at = CHECKED;
  proof.file_sha256 = "e".repeat(64);
  assert.equal(auditHistoricalSnapshot(snapshot, options).rows[0].reason.code, "download_archive_mismatch");
});

test("un bucket alternativo sólo vale si es el fallback configurado en el workflow", (t) => {
  const snapshot = dataset();
  const options = withZip(t, snapshot);
  delete snapshot.artifacts[0].metadata.storage_bucket;
  const alternate = "historical-artifacts";
  options.evidence.storage[uuid(10)].bucket = alternate;
  assert.equal(auditHistoricalSnapshot(snapshot, options).rows[0].reason.code, "availability_scope_mismatch");
  assert.equal(auditHistoricalSnapshot(snapshot, { ...options, defaultBucket: alternate }).rows[0].result,
    "verified_offline_evidence");
});

test("para GitHub vincula la descarga al contenedor y verifica el ZIP interior registrado", (t) => {
  const snapshot = dataset();
  const options = withZip(t, snapshot);
  const [artifact] = snapshot.artifacts;
  const container = join(options.folder, "container.zip");
  const created = spawnSync("python", ["-B", "-c",
    "from zipfile import ZipFile; import sys\nwith ZipFile(sys.argv[1], 'w') as out: out.write(sys.argv[2], 'original.zip')",
    container, options.file,
  ], { encoding: "utf8", windowsHide: true });
  assert.equal(created.status, 0, created.stderr || created.error?.message);
  const outer = readFileSync(container);
  writeFileSync(options.file, outer);
  Object.assign(artifact, { artifact_provider: "github_actions", github_repository: REPO,
    github_run_id: 95, github_artifact_id: 97, artifact_name: "wrapped-release" });
  const proof = { repository: REPO, result: "downloaded", checked_at: CHECKED,
    file_sha256: createHash("sha256").update(outer).digest("hex"), file_size_bytes: outer.length,
    record: { id: 97, name: artifact.artifact_name, expired: false, workflow_run: { id: 95 } } };
  const scope = { ...options, evidence: { github: { [artifact.id]: proof } }, repository: REPO };
  const { rows } = auditHistoricalSnapshot(snapshot, scope);
  assert.equal(rows[0].result, "verified_offline_evidence");
  assert.equal(rows[0].evidence.registered_sha256, artifact.checksum_sha256);
  proof.file_sha256 = artifact.checksum_sha256;
  assert.equal(auditHistoricalSnapshot(snapshot, scope).rows[0].reason.code, "download_archive_mismatch");
});

test("la CLI devuelve código 2 e imprime la matriz cuando le falta evidencia", (t) => {
  const snapshot = dataset();
  const options = withZip(t, snapshot);
  const input = join(options.folder, "fixture.json");
  writeFileSync(input, JSON.stringify(snapshot));
  const script = fileURLToPath(new URL("./audit-historical-releases.mjs", import.meta.url));
  const run = spawnSync(process.execPath, [script, "--snapshot", input], { encoding: "utf8", windowsHide: true });
  assert.equal(run.status, 2, run.stderr);
  assert.equal(JSON.parse(run.stdout).rows.length, 3);
  assert.equal(readFileSync(input, "utf8"), JSON.stringify(snapshot));
});
