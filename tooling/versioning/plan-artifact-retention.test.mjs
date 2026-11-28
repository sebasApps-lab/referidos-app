import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { planArtifactRetention } from "./plan-artifact-retention.mjs";

const HISTORY = JSON.parse(readFileSync(new URL("./historical-release-registry.json", import.meta.url), "utf8"));
const RELATIONS = ["releases", "artifacts", "heads", "deploy_requests", "deployments", "sync_requests", "promotions", "local_inventory", "runtime_configs"];
const id = (n) => `00000000-0000-0000-0000-${String(n).padStart(12, "0")}`;
const tenant = id(1);
const product = id(2);
const dev = id(3);
const staging = id(4);
const bucket = "versioning-artifacts";
const alternate = "other-artifacts";
const old = "2026-10-01T00:00:00.123456+00:00";

function blankSnapshot() {
  return {
    schema_version: 1,
    visibility: "all_tenants",
    captured_at: "2027-01-15T00:00:00+00:00",
    complete: Object.fromEntries(RELATIONS.map((name) => [name, true])),
    ...Object.fromEntries(RELATIONS.map((name) => [name, []])),
  };
}

function policy(overrides = {}) {
  return { tenant_id: tenant, product_id: product, buckets: [bucket], minimum_age_days: 30, recovery_pins: [], ...overrides };
}

function plan(snapshot, settings = policy()) {
  return planArtifactRetention(withCounts(snapshot), settings);
}

function withCounts(snapshot) {
  return { ...snapshot, row_counts: Object.fromEntries(RELATIONS.map((name) => [name, snapshot[name]?.length])) };
}

function addRelease(snapshot, n, overrides = {}) {
  const release = { id: id(n), tenant_id: tenant, product_id: product, env_id: dev, version_base: `1.0.${n}`, ...overrides };
  snapshot.releases.push(release);
  return release;
}

function addArtifact(snapshot, release, n, path = `product/version-${n}/abcdef123456/bundle.zip`, overrides = {}) {
  const artifact = {
    id: id(n), release_id: release.id, tenant_id: release.tenant_id, product_id: release.product_id,
    artifact_provider: "supabase_storage", artifact_path: path,
    metadata: { storage_bucket: bucket, storage_path: path }, size_bytes: 2500, checksum_sha256: "a".repeat(64),
    created_at: old, updated_at: old, ...overrides,
  };
  snapshot.artifacts.push(artifact);
  return artifact;
}

function addBundle(snapshot, n, path, overrides = {}) {
  return addArtifact(snapshot, addRelease(snapshot, n), n + 100, path, overrides);
}

function ref(release, n, extra) {
  return { id: id(n), tenant_id: release.tenant_id, product_id: release.product_id, release_id: release.id, env_id: release.env_id, ...extra };
}

function retained(result, artifact, reason) {
  assert.equal(result.status, "planned", JSON.stringify(result.blockers));
  const row = result.retained.find((item) => item.path === artifact.artifact_path && item.bucket === artifact.metadata.storage_bucket);
  assert.ok(row?.reasons.includes(reason), `Expected retention reason ${reason}`);
  return row;
}

test("one dry-run candidate per exact object across eligible aliases; the input stays intact", () => {
  const snapshot = blankSnapshot();
  const artifact = addBundle(snapshot, 20);
  const alias = addBundle(snapshot, 21, artifact.artifact_path, { size_bytes: "2500" });
  const otherCase = addBundle(snapshot, 22, artifact.artifact_path.replace("bundle", "Bundle"));
  const original = structuredClone(snapshot);
  const result = plan(snapshot);
  assert.equal(result.status, "planned");
  assert.equal(result.dry_run, true);
  assert.deepEqual(result.candidates, [
    { bucket, path: otherCase.artifact_path, artifact_ids: [otherCase.id] },
    { bucket, path: artifact.artifact_path, artifact_ids: [artifact.id, alias.id] },
  ]);
  assert.deepEqual(snapshot, original);
});

test("a head holds every alias of the same object, with no effect on another bucket", () => {
  const snapshot = blankSnapshot();
  const owner = addRelease(snapshot, 20);
  const original = addArtifact(snapshot, owner, 120);
  const target = addRelease(snapshot, 21, { env_id: staging });
  const alias = addBundle(snapshot, 22, original.artifact_path);
  const otherBucketAlias = addBundle(snapshot, 23, original.artifact_path, { metadata: { storage_bucket: alternate } });
  snapshot.heads.push(ref(target, 501, { artifact_id: original.id }));
  const result = plan(snapshot, policy({ buckets: [bucket, alternate] }));
  assert.deepEqual(retained(result, original, "environment_head").artifact_ids, [original.id, alias.id]);
  assert.deepEqual(result.candidates, [{ bucket: alternate, path: otherBucketAlias.artifact_path, artifact_ids: [otherBucketAlias.id] }]);
});

test("cross-tenant and cross-product aliases are retained even when their foreign records have no head", () => {
  const snapshot = blankSnapshot();
  const first = addBundle(snapshot, 20);
  const second = addBundle(snapshot, 21);
  const foreignTenant = addRelease(snapshot, 22, { tenant_id: id(7) });
  const foreignProduct = addRelease(snapshot, 23, { product_id: id(8) });
  addArtifact(snapshot, foreignTenant, 122, first.artifact_path);
  addArtifact(snapshot, foreignProduct, 123, second.artifact_path);
  const result = plan(snapshot);
  retained(result, first, "registry_alias_outside_scope");
  retained(result, second, "registry_alias_outside_scope");
  assert.deepEqual(result.candidates, []);
});

test("pending, approved and started requests retain exact artifacts and possible legacy version references", () => {
  const snapshot = blankSnapshot();
  const pending = addBundle(snapshot, 20);
  const approved = addBundle(snapshot, 21);
  const explicitlySelected = addBundle(snapshot, 22);
  const failed = addBundle(snapshot, 23);
  const legacy = addRelease(snapshot, 24, { env_id: staging, version_base: snapshot.releases[0].version_base });
  snapshot.deploy_requests.push(ref(legacy, 501, { status: "pending", deployment_status: null }));
  snapshot.deploy_requests.push(ref(snapshot.releases[1], 502, { status: "approved", deployment_status: null }));
  snapshot.deploy_requests.push(ref(legacy, 503, { status: "executed", deployment_status: "started", metadata: { artifact_id: explicitlySelected.id } }));
  snapshot.deploy_requests.push(ref(snapshot.releases[3], 504, { status: "failed", deployment_status: "failed" }));
  const result = plan(snapshot);
  for (const artifact of [pending, approved, explicitlySelected]) retained(result, artifact, "active_deploy_request");
  assert.deepEqual(result.candidates.map((object) => object.path), [failed.artifact_path]);
});

test("active local sync pins its current row and a prior exact in-flight locator", () => {
  const snapshot = blankSnapshot();
  const selected = addBundle(snapshot, 20);
  const dispatched = addBundle(snapshot, 21);
  for (const [i, status] of ["pending", "queued", "running"].entries()) {
    snapshot.sync_requests.push(ref(snapshot.releases[0], 501 + i, {
      status, artifact_id: selected.id, metadata: {
        artifact_provider: "supabase_storage", artifact_storage_bucket: bucket, artifact_storage_path: dispatched.artifact_path,
      },
    }));
  }
  const result = plan(snapshot);
  retained(result, selected, "active_local_sync");
  retained(result, dispatched, "active_local_sync");
  assert.deepEqual(result.candidates, []);
});

test("all promotion endpoints and ancestor objects stay retained across environments", () => {
  const snapshot = blankSnapshot();
  const initial = addRelease(snapshot, 20);
  const intermediate = addRelease(snapshot, 21, { env_id: staging });
  const final = addRelease(snapshot, 22, { env_id: id(5) });
  const artifacts = [initial, intermediate, final].map((release, index) => addArtifact(snapshot, release, 120 + index));
  snapshot.promotions.push({ id: id(501), tenant_id: tenant, product_id: product, from_release_id: initial.id, to_release_id: intermediate.id });
  snapshot.promotions.push({ id: id(502), tenant_id: tenant, product_id: product, from_release_id: intermediate.id, to_release_id: final.id });
  const result = plan(snapshot);
  for (const row of artifacts) retained(result, row, "recorded_promotion");
  assert.deepEqual(result.candidates, []);
});

test("recovery preserves successful and running deployments, local inventory, runtime config versions and explicit pins", () => {
  const snapshot = blankSnapshot();
  const rows = Array.from({ length: 9 }, (_, i) => addBundle(snapshot, 20 + i));
  snapshot.deployments.push(ref(snapshot.releases[0], 501, { status: "success" }));
  snapshot.deployments.push(ref(snapshot.releases[1], 502, { status: "started" }));
  snapshot.local_inventory.push(ref(snapshot.releases[2], 503, { artifact_id: rows[2].id }));
  snapshot.deploy_requests.push(ref(snapshot.releases[6], 504, { status: "executed", deployment_status: "success" }));
  snapshot.runtime_configs.push(ref(snapshot.releases[7], 505, { artifact_id: rows[7].id }));
  const result = plan(snapshot, policy({ recovery_pins: [
    { artifact_id: rows[3].id }, { release_id: rows[4].release_id }, { bucket, path: rows[5].artifact_path },
  ] }));
  retained(result, rows[0], "deployment_recovery_point");
  retained(result, rows[1], "active_deployment");
  retained(result, rows[2], "local_recovery_inventory");
  for (const artifact of rows.slice(3, 6)) retained(result, artifact, "explicit_recovery_pin");
  retained(result, rows[6], "deployment_recovery_point");
  retained(result, rows[7], "runtime_config_recovery_point");
  assert.deepEqual(result.candidates.map((object) => object.path), [rows[8].artifact_path]);
});

test("fixed historical registry protects all original exact locators despite ID drift and the historical release's new ZIP", () => {
  const snapshot = blankSnapshot();
  const buckets = new Set();
  for (const [index, item] of HISTORY.artifacts.entries()) {
    buckets.add(item.bucket);
    addBundle(snapshot, 20 + index, item.path, { metadata: { storage_bucket: item.bucket, storage_path: item.path } });
  }
  const entry = HISTORY.artifacts[0];
  const historicalRelease = addRelease(snapshot, 40, { id: entry.owner_release_id });
  const newObject = addArtifact(snapshot, historicalRelease, 140, "new/object.zip", { metadata: { storage_bucket: entry.bucket } });
  const reusedHistoricalId = addBundle(snapshot, 41, "another/object.zip", { id: entry.id, metadata: { storage_bucket: entry.bucket } });
  snapshot.historical_registry = { artifacts: [], releases: [] };
  const result = plan(snapshot, policy({ buckets: [...buckets], minimum_age_days: 1 }));
  for (const artifact of [...snapshot.artifacts.slice(0, HISTORY.artifacts.length), newObject, reusedHistoricalId]) {
    retained(result, artifact, "historical_registry");
  }
  assert.deepEqual(result.candidates, []);
});

test("unknown bucket, tombstones, recent updates and integrity conflicts stop every alias of their object", () => {
  const snapshot = blankSnapshot();
  const ambiguous = addBundle(snapshot, 20);
  addBundle(snapshot, 30, ambiguous.artifact_path, { metadata: {} });
  const tombstoned = addBundle(snapshot, 21);
  addBundle(snapshot, 31, tombstoned.artifact_path, { metadata: { storage_bucket: bucket, storage_deleted_at: old } });
  const recent = addBundle(snapshot, 22);
  addBundle(snapshot, 32, recent.artifact_path, { updated_at: "2027-01-14T00:00:00Z" });
  const conflicting = addBundle(snapshot, 23);
  addBundle(snapshot, 33, conflicting.artifact_path, { checksum_sha256: "b".repeat(64) });
  const unverified = addBundle(snapshot, 24);
  addBundle(snapshot, 34, unverified.artifact_path, { size_bytes: null });
  const result = plan(snapshot);
  retained(result, ambiguous, "registry_bucket_ambiguous");
  retained(result, tombstoned, "tombstoned_registry_alias");
  retained(result, recent, "minimum_age_not_met");
  retained(result, conflicting, "registry_alias_integrity_conflict");
  retained(result, unverified, "unverified_registry_integrity");
  assert.deepEqual(result.unresolved_buckets, [{ path: ambiguous.artifact_path, artifact_ids: [id(130)] }]);
  assert.deepEqual(result.candidates, []);
});

test("incomplete exports, invalid storage metadata and dangling references return zero candidates", () => {
  const changes = [
    ["incomplete_registry_snapshot", (snapshot) => { snapshot.complete.artifacts = false; }],
    ["incomplete_registry_snapshot", (snapshot) => { delete snapshot.local_inventory; }],
    ["incomplete_registry_snapshot", (snapshot) => { snapshot.visibility = "tenant_only"; }],
    ["invalid_snapshot_timestamp", (snapshot) => { snapshot.captured_at = "2027-02-31T00:00:00Z"; }],
    ["registry_age_uncertain", (snapshot) => { snapshot.artifacts[0].updated_at = "2027-02-01T00:00:00Z"; }],
    ["registry_path_uncertain", (snapshot) => { snapshot.artifacts[0].metadata.storage_path = "different/bundle.zip"; }],
    ["reference_artifact_mismatch", (snapshot) => { snapshot.heads.push(ref(snapshot.releases[0], 501, { artifact_id: id(600) })); }],
    ["promotion_release_mismatch", (snapshot) => {
      snapshot.promotions.push({ id: id(502), tenant_id: tenant, product_id: product, from_release_id: snapshot.releases[0].id, to_release_id: id(600) });
    }],
    ["invalid_deploy_request", (snapshot) => { snapshot.deploy_requests.push(ref(snapshot.releases[0], 503, { status: "unexpected" })); }],
  ];
  for (const [code, change] of changes) {
    const snapshot = blankSnapshot();
    addBundle(snapshot, 20);
    change(snapshot);
    const result = plan(snapshot);
    assert.equal(result.status, "blocked");
    assert.equal(result.blockers[0].code, code);
    assert.deepEqual(result.candidates, []);
  }
});

test("truncated exports with a retained whole-project row count yield no candidates", () => {
  const snapshot = blankSnapshot();
  addBundle(snapshot, 20);
  const exported = withCounts(snapshot);
  exported.row_counts.artifacts += 1;
  const result = planArtifactRetention(exported, policy());
  assert.equal(result.status, "blocked");
  assert.equal(result.blockers[0].code, "incomplete_registry_snapshot");
  assert.deepEqual(result.candidates, []);
});

test("CLI produces dry-run JSON and exits nonzero when the snapshot cannot be trusted", () => {
  const directory = mkdtempSync(join(tmpdir(), "referidos-retention-test-"));
  const cli = fileURLToPath(new URL("./plan-artifact-retention.mjs", import.meta.url));
  const snapshotPath = join(directory, "snapshot.json");
  const policyPath = join(directory, "policy.json");
  const snapshot = blankSnapshot();
  addBundle(snapshot, 20);
  const input = withCounts(snapshot);

  try {
    writeFileSync(snapshotPath, JSON.stringify(input));
    writeFileSync(policyPath, JSON.stringify(policy()));
    const args = [cli, "--snapshot", snapshotPath, "--policy", policyPath];
    const success = spawnSync(process.execPath, args, { encoding: "utf8" });
    assert.equal(success.status, 0, success.stderr);
    assert.equal(JSON.parse(success.stdout).candidates.length, 1);

    input.row_counts.heads += 1;
    writeFileSync(snapshotPath, JSON.stringify(input));
    const blocked = spawnSync(process.execPath, args, { encoding: "utf8" });
    assert.equal(blocked.status, 1);
    assert.deepEqual(JSON.parse(blocked.stdout).candidates, []);
  } finally {
    unlinkSync(snapshotPath);
    unlinkSync(policyPath);
    rmdirSync(directory);
  }
});

test("the minimum age and explicit recovery-pin section are required; an unresolved pin blocks the plan", () => {
  const snapshot = blankSnapshot();
  addBundle(snapshot, 20);
  for (const overrides of [{ minimum_age_days: 0 }, { recovery_pins: undefined }]) {
    const result = plan(snapshot, policy(overrides));
    assert.equal(result.blockers[0].code, "invalid_retention_policy");
    assert.deepEqual(result.candidates, []);
  }
  const result = plan(snapshot, policy({ recovery_pins: [{ artifact_id: id(999) }] }));
  assert.equal(result.blockers[0].code, "recovery_artifact_unknown");
  assert.deepEqual(result.candidates, []);
});
