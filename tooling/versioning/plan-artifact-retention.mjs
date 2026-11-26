import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

const HISTORY = new URL("./historical-release-registry.json", import.meta.url);
const RELATIONS = ["releases", "artifacts", "heads", "deploy_requests", "deployments", "sync_requests", "promotions", "local_inventory", "runtime_configs"];
const UUID = /^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/;
const BUCKET = /^[a-zA-Z0-9._-]+$/;
const KEY_SEGMENT = /^[a-zA-Z0-9._-]+$/;
const SEMVER_BASE = /^\d+\.\d+\.\d+$/;
const SHA = /^[a-f\d]{40}$/i;
const SHA256 = /^[a-f\d]{64}$/i;
const TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const DAY_MS = 86_400_000;
const PROVIDERS = new Set(["supabase_storage", "github_actions", "local"]);
const DEPLOY_REQUEST_STATUSES = new Set(["pending", "approved", "executed", "failed", "rejected", "cancelled"]);
const DEPLOY_STATUSES = new Set(["started", "success", "failed"]);
const SYNC_STATUSES = new Set(["pending", "queued", "running", "success", "failed", "cancelled"]);

class IncompleteSnapshot extends Error {
  constructor(code, row = null) {
    super(code);
    this.row = typeof row === "string" && matches(row, UUID) ? row : null;
  }
}

function requireEvidence(condition, code, row) {
  if (!condition) throw new IncompleteSnapshot(code, row);
}

function matches(value, pattern) {
  return typeof value === "string" && value === value.trim() && pattern.test(value);
}

function record(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function timestamp(value) {
  if (!matches(value, TIMESTAMP)) return NaN;
  // Date.parse accepts out-of-calendar dates such as February 31.
  const calendarDay = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  if (!Number.isFinite(calendarDay.valueOf()) || calendarDay.toISOString().slice(0, 10) !== value.slice(0, 10)) return NaN;
  return Date.parse(value);
}

function pathValid(path) {
  return typeof path === "string" && path.split("/").every((segment) =>
    matches(segment, KEY_SEGMENT) && segment !== "." && segment !== "..");
}

function sizeInBytes(size) {
  if (typeof size !== "number" && !matches(size, /^[1-9]\d*$/)) return 0;
  const bytes = Number(size);
  return Number.isSafeInteger(bytes) && bytes > 0 ? bytes : 0;
}

function requireScope(row, release, code) {
  requireEvidence(release && row.tenant_id === release.tenant_id &&
    (!Object.hasOwn(row, "product_id") || row.product_id === release.product_id) &&
    (row.env_id == null || row.env_id === release.env_id), code, row.id);
}

function indexRows(rows, relation) {
  const index = new Map();
  for (const row of rows) {
    requireEvidence(record(row) && matches(row.id, UUID) && !index.has(row.id),
      `invalid_${relation}_identity`, row?.id);
    index.set(row.id, row);
  }
  return index;
}

function parsePolicy(snapshot, policy) {
  requireEvidence(record(snapshot) && snapshot.schema_version === 1 && snapshot.visibility === "all_tenants" &&
    record(snapshot.complete) && record(snapshot.row_counts) && RELATIONS.every((relation) =>
      snapshot.complete[relation] === true && Array.isArray(snapshot[relation]) &&
      snapshot.row_counts[relation] === snapshot[relation].length), "incomplete_registry_snapshot");
  const capturedAt = timestamp(snapshot.captured_at);
  requireEvidence(Number.isFinite(capturedAt), "invalid_snapshot_timestamp");
  requireEvidence(record(policy) && matches(policy.tenant_id, UUID) && matches(policy.product_id, UUID) &&
    Array.isArray(policy.buckets) && policy.buckets.length > 0 && policy.buckets.every((bucket) => matches(bucket, BUCKET)) &&
    new Set(policy.buckets).size === policy.buckets.length && Number.isSafeInteger(policy.minimum_age_days) &&
    policy.minimum_age_days > 0 && Number.isSafeInteger(policy.minimum_age_days * DAY_MS) &&
    Array.isArray(policy.recovery_pins), "invalid_retention_policy");
  return { capturedAt, cutoff: capturedAt - policy.minimum_age_days * DAY_MS, buckets: new Set(policy.buckets) };
}

function loadHistoricalRegistry() {
  let history;
  try {
    history = JSON.parse(readFileSync(HISTORY, "utf8"));
  } catch {
    throw new IncompleteSnapshot("historical_registry_unavailable");
  }
  requireEvidence(record(history) && Number.isFinite(timestamp(history.cutoff)) &&
    timestamp(history.captured_at) >= timestamp(history.cutoff) && Array.isArray(history.artifacts) && history.artifacts.length > 0 &&
    Array.isArray(history.releases) && history.releases.length > 0, "historical_registry_invalid");
  const artifacts = indexRows(history.artifacts, "historical_artifact");
  const releases = indexRows(history.releases, "historical_release");
  for (const row of artifacts.values()) {
    requireEvidence(row.provider === "supabase_storage" && matches(row.bucket, BUCKET) && pathValid(row.path) &&
      releases.get(row.owner_release_id)?.artifact_id === row.id && matches(row.source_commit_sha, SHA) && matches(row.sha256, SHA256) &&
      sizeInBytes(row.size_bytes) > 0, "historical_artifact_invalid", row.id);
  }
  for (const row of releases.values()) {
    requireEvidence(artifacts.has(row.artifact_id) && (row.predecessor_id === null ||
      releases.get(row.predecessor_id)?.artifact_id === row.artifact_id), "historical_release_invalid", row.id);
  }
  return { artifacts, releases };
}

function historicalRegistryEvidence() {
  try {
    return { registry: loadHistoricalRegistry(), blocker: null };
  } catch (error) {
    if (!(error instanceof IncompleteSnapshot)) throw error;
    return { registry: null, blocker: error };
  }
}

const historical = historicalRegistryEvidence();

function scopedVersion(release) {
  return JSON.stringify([release.tenant_id, release.product_id, release.version_base]);
}

function calculateRetention(snapshot, policy, history, { capturedAt, cutoff, buckets }) {
  const releases = indexRows(snapshot.releases, "release");
  const artifacts = indexRows(snapshot.artifacts, "artifact");
  const directArtifacts = new Map();
  const versionArtifacts = new Map();
  const groups = new Map();
  const artifactGroups = new Map();
  const unknownBuckets = new Map();
  const inScope = (row) => row.tenant_id === policy.tenant_id && row.product_id === policy.product_id;

  function objectGroup(bucket, path) {
    const key = JSON.stringify([bucket, path]);
    if (!groups.has(key)) groups.set(key, { bucket, path, rows: [], reasons: new Set(), identities: new Set() });
    return groups.get(key);
  }

  function holdLocator(bucket, path, reason, code, row) {
    requireEvidence(matches(bucket, BUCKET) && pathValid(path), code, row);
    if (buckets.has(bucket)) objectGroup(bucket, path).reasons.add(reason);
  }

  function holdArtifact(id, reason) {
    artifactGroups.get(id)?.reasons.add(reason);
  }

  function holdRelease(release, reason) {
    const direct = directArtifacts.get(release.id);
    if (direct) holdArtifact(direct.id, reason);
    // Older readers can consult the stable SemVer when there is no direct ZIP.
    // Keep all matching records in this scope instead of guessing which is used.
    else for (const id of versionArtifacts.get(scopedVersion(release)) || []) holdArtifact(id, reason);
  }

  function holdReference(row, reason, { requireArtifact = false, locator = false } = {}) {
    const release = releases.get(row.release_id);
    requireScope(row, release, "reference_release_mismatch");
    holdRelease(release, reason);
    requireEvidence(row.metadata === undefined || record(row.metadata), "invalid_reference_metadata", row.id);
    const artifactId = requireArtifact ? row.artifact_id : row.artifact_id ?? row.metadata?.artifact_id;
    if (requireArtifact || artifactId != null) {
      const artifact = artifacts.get(artifactId);
      requireEvidence(artifact && artifact.tenant_id === release.tenant_id && artifact.product_id === release.product_id,
        "reference_artifact_mismatch", row.id);
      holdArtifact(artifactId, reason);
    }
    if (locator && (row.metadata?.artifact_provider === "supabase_storage" || row.metadata?.artifact_storage_path != null)) {
      holdLocator(row.metadata.artifact_storage_bucket, row.metadata.artifact_storage_path, reason,
        "active_sync_locator_invalid", row.id);
    }
  }

  for (const release of releases.values()) {
    requireEvidence([release.tenant_id, release.product_id, release.env_id].every((id) => matches(id, UUID)) &&
      matches(release.version_base, SEMVER_BASE), "invalid_release_scope", release.id);
  }
  requireEvidence([...releases.values()].some(inScope), "scope_not_found");

  for (const artifact of artifacts.values()) {
    const release = releases.get(artifact.release_id);
    requireEvidence(matches(artifact.product_id, UUID) && PROVIDERS.has(artifact.artifact_provider) && record(artifact.metadata) &&
      !directArtifacts.has(artifact.release_id), "invalid_registry_artifact", artifact.id);
    requireScope(artifact, release, "artifact_release_mismatch");
    directArtifacts.set(release.id, artifact);
    const version = scopedVersion(release);
    if (!versionArtifacts.has(version)) versionArtifacts.set(version, []);
    versionArtifacts.get(version).push(artifact.id);

    const { storage_bucket: bucket, storage_path: metadataPath, storage_deleted_at: deletedAt } = artifact.metadata;
    if (artifact.artifact_provider !== "supabase_storage") {
      if (bucket != null || metadataPath != null) {
        holdLocator(bucket, metadataPath ?? artifact.artifact_path, "alternate_provider_storage_reference",
          "alternate_provider_locator_invalid", artifact.id);
      }
      continue;
    }
    const path = artifact.artifact_path;
    requireEvidence(pathValid(path) && (metadataPath == null || metadataPath === path), "registry_path_uncertain", artifact.id);
    if (bucket == null) {
      if (!unknownBuckets.has(path)) unknownBuckets.set(path, []);
      unknownBuckets.get(path).push(artifact.id);
      continue;
    }
    requireEvidence(matches(bucket, BUCKET), "registry_bucket_uncertain", artifact.id);
    if (!buckets.has(bucket)) continue;

    const group = objectGroup(bucket, path);
    group.rows.push(artifact.id);
    artifactGroups.set(artifact.id, group);
    if (!inScope(artifact)) group.reasons.add("registry_alias_outside_scope");
    if (deletedAt != null) group.reasons.add("tombstoned_registry_alias");
    if (!path.toLowerCase().endsWith(".zip")) group.reasons.add("non_zip_storage_key");
    const serializedSize = sizeInBytes(artifact.size_bytes);
    if (matches(artifact.checksum_sha256, SHA256) && serializedSize) {
      group.identities.add(JSON.stringify([artifact.checksum_sha256.toLowerCase(), serializedSize]));
    } else {
      group.reasons.add("unverified_registry_integrity");
    }
    const createdAt = timestamp(artifact.created_at);
    const updatedAt = timestamp(artifact.updated_at);
    requireEvidence(Number.isFinite(createdAt) && Number.isFinite(updatedAt) && createdAt <= updatedAt &&
      updatedAt <= capturedAt, "registry_age_uncertain", artifact.id);
    if (updatedAt >= cutoff) group.reasons.add("minimum_age_not_met");
  }

  for (const row of history.artifacts.values()) {
    holdLocator(row.bucket, row.path, "historical_registry", "historical_artifact_invalid", row.id);
    holdArtifact(row.id, "historical_registry");
  }
  for (const id of history.releases.keys()) {
    const release = releases.get(id);
    if (release) holdRelease(release, "historical_registry");
  }

  for (const row of indexRows(snapshot.heads, "head").values()) {
    requireEvidence(matches(row.product_id, UUID) && matches(row.env_id, UUID), "invalid_head_scope", row.id);
    holdReference(row, "environment_head", { requireArtifact: true });
  }
  for (const row of indexRows(snapshot.deploy_requests, "deploy_request").values()) {
    requireEvidence(matches(row.product_id, UUID) && matches(row.env_id, UUID) && DEPLOY_REQUEST_STATUSES.has(row.status) &&
      (row.deployment_status === null || DEPLOY_STATUSES.has(row.deployment_status)), "invalid_deploy_request", row.id);
    if (row.status === "pending" || row.status === "approved" || row.deployment_status === "started" ||
      (row.status === "executed" && row.deployment_status === null)) {
      holdReference(row, "active_deploy_request");
    }
    if (row.deployment_status === "success") holdReference(row, "deployment_recovery_point");
  }
  for (const row of indexRows(snapshot.deployments, "deployment").values()) {
    requireEvidence(matches(row.env_id, UUID) && DEPLOY_STATUSES.has(row.status), "invalid_deployment", row.id);
    if (row.status === "started") holdReference(row, "active_deployment");
    if (row.status === "success") holdReference(row, "deployment_recovery_point");
  }
  for (const row of indexRows(snapshot.sync_requests, "sync_request").values()) {
    requireEvidence(matches(row.product_id, UUID) && SYNC_STATUSES.has(row.status), "invalid_sync_request", row.id);
    if (["pending", "queued", "running"].includes(row.status)) {
      holdReference(row, "active_local_sync", { requireArtifact: true, locator: true });
    }
  }
  for (const row of indexRows(snapshot.local_inventory, "inventory").values()) {
    holdReference(row, "local_recovery_inventory", { requireArtifact: true });
  }
  for (const row of indexRows(snapshot.runtime_configs, "runtime_config").values()) {
    requireEvidence(matches(row.product_id, UUID) && matches(row.env_id, UUID), "invalid_runtime_config_scope", row.id);
    holdReference(row, "runtime_config_recovery_point");
  }
  for (const row of indexRows(snapshot.promotions, "promotion").values()) {
    requireEvidence(matches(row.product_id, UUID) && row.from_release_id !== row.to_release_id, "invalid_promotion", row.id);
    for (const id of [row.from_release_id, row.to_release_id]) {
      const release = releases.get(id);
      requireScope(row, release, "promotion_release_mismatch");
      holdRelease(release, "recorded_promotion");
    }
  }
  for (const pin of policy.recovery_pins) {
    requireEvidence(record(pin), "invalid_recovery_pin");
    const keys = Object.keys(pin);
    if (keys.length === 1 && typeof pin.artifact_id === "string") {
      requireEvidence(artifacts.has(pin.artifact_id), "recovery_artifact_unknown", pin.artifact_id);
      holdArtifact(pin.artifact_id, "explicit_recovery_pin");
    } else if (keys.length === 1 && typeof pin.release_id === "string") {
      const release = releases.get(pin.release_id);
      requireEvidence(release, "recovery_release_unknown", pin.release_id);
      holdRelease(release, "explicit_recovery_pin");
    } else {
      requireEvidence(keys.length === 2, "invalid_recovery_pin");
      holdLocator(pin.bucket, pin.path, "explicit_recovery_pin", "invalid_recovery_pin");
    }
  }

  const result = {
    dry_run: true,
    status: "planned",
    snapshot_at: snapshot.captured_at,
    blockers: [],
    candidates: [],
    retained: [],
    unresolved_buckets: [...unknownBuckets.keys()].sort()
      .map((path) => ({ path, artifact_ids: unknownBuckets.get(path).sort() })),
  };
  for (const key of [...groups.keys()].sort()) {
    const group = groups.get(key);
    if (unknownBuckets.has(group.path)) group.reasons.add("registry_bucket_ambiguous");
    if (group.identities.size > 1) group.reasons.add("registry_alias_integrity_conflict");
    const object = { bucket: group.bucket, path: group.path, artifact_ids: group.rows.sort() };
    if (group.reasons.size) result.retained.push({ ...object, reasons: [...group.reasons].sort() });
    else result.candidates.push(object);
  }
  return result;
}

export function planArtifactRetention(snapshot, policy) {
  try {
    const settings = parsePolicy(snapshot, policy);
    if (historical.blocker) throw historical.blocker;
    return calculateRetention(snapshot, policy, historical.registry, settings);
  } catch (error) {
    if (!(error instanceof IncompleteSnapshot)) throw error;
    const blocker = error.row ? { code: error.message, row_id: error.row } : { code: error.message };
    return { dry_run: true, status: "blocked", blockers: [blocker], candidates: [], retained: [], unresolved_buckets: [] };
  }
}

function runCli() {
  try {
    const { values } = parseArgs({ options: { snapshot: { type: "string" }, policy: { type: "string" } } });
    if (!values.snapshot || !values.policy) {
      throw new Error("Usage: node tooling/versioning/plan-artifact-retention.mjs --snapshot <json> --policy <json>");
    }
    const snapshot = JSON.parse(readFileSync(values.snapshot, "utf8"));
    const policy = JSON.parse(readFileSync(values.policy, "utf8"));
    const result = planArtifactRetention(snapshot, policy);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    if (result.status === "blocked") process.exitCode = 1;
  } catch {
    process.stderr.write("Cannot plan retention. Check the local snapshot and policy JSON and required --snapshot/--policy options.\n");
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runCli();
