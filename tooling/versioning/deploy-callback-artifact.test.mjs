import assert from "node:assert/strict";
import { test } from "node:test";
import {
  callbackArtifactLookup,
  verifyCallbackArtifact,
} from "../../apps/referidos-ops/supabase/functions/_shared/deploy-callback-artifact.mjs";

const releaseId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const sourceReleaseId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const artifactId = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const sha = "abcde12345".repeat(4);
const checksum = "0123456789abcdef".repeat(4);
const request = {
  release_id: releaseId,
  tenant_id: "tenant-1",
  product_id: "product-1",
  product_key: "referidos_app",
  env_id: "env-staging",
  version_label: "1.2.3",
};
const release = {
  id: releaseId,
  tenant_id: request.tenant_id,
  product_id: request.product_id,
  env_id: request.env_id,
  source_commit_sha: sha,
};
const artifact = {
  id: artifactId,
  release_id: sourceReleaseId,
  tenant_id: release.tenant_id,
  product_id: release.product_id,
  product_key: request.product_key,
  version_label: request.version_label,
  semver: request.version_label,
  commit_sha: sha,
  checksum_sha256: checksum,
  artifact_provider: "supabase_storage",
  metadata: {},
};
const metadata = { artifact_id: artifactId, artifact_checksum_sha256: checksum, source_commit_sha: sha };

function verify(overrides = {}) {
  const input = { request, release, artifact, metadata, ...overrides };
  return verifyCallbackArtifact({ ...input, lookup: callbackArtifactLookup(input.metadata, input.request.release_id) });
}

test("looks up an explicit artifact ID and rejects malformed IDs", () => {
  assert.deepEqual(callbackArtifactLookup({ artifact_id: artifactId.toUpperCase() }, releaseId), {
    column: "id", value: artifactId,
  });
  assert.equal(callbackArtifactLookup({ artifact_id: "unknown" }, releaseId), null);
});

test("uses the exact target release as the only lookup for legacy callbacks without an ID", () => {
  assert.deepEqual(callbackArtifactLookup({}, releaseId), { column: "release_id", value: releaseId });
  assert.deepEqual(verify({ metadata: {}, artifact: { ...artifact, release_id: releaseId, checksum_sha256: null } }), {
    ok: true, artifactId, sourceCommitSha: sha,
  });
  assert.equal(verify({ metadata: {} }).reason, "artifact_identity_mismatch");
  assert.equal(verify({ metadata: {}, artifact: null }).reason, "artifact_not_found");
});

test("accepts the exact, checksum-bound artifact from a different owner release", () => {
  assert.deepEqual(verify(), { ok: true, artifactId, sourceCommitSha: sha });
  assert.equal(verify({ artifact: { ...artifact, id: releaseId } }).reason, "artifact_identity_mismatch");
});

test("binds the target release to the request's tenant, product and environment", () => {
  for (const field of ["tenant_id", "product_id", "env_id"]) {
    assert.equal(verify({ release: { ...release, [field]: "mismatch" } }).reason, "release_identity_mismatch");
  }
});

test("checks registry identity and both version fields", () => {
  for (const field of ["tenant_id", "product_id", "product_key", "version_label", "semver"]) {
    assert.equal(verify({ artifact: { ...artifact, [field]: "mismatch" } }).reason, "artifact_identity_mismatch");
  }
});

test("requires the same full commit in release, registry and any callback claim", () => {
  assert.equal(verify({ release: { ...release, source_commit_sha: sha.slice(0, 12) } }).reason, "release_identity_mismatch");
  assert.equal(verify({ artifact: { ...artifact, commit_sha: sha.slice(0, 12) } }).reason, "artifact_commit_mismatch");
  assert.equal(verify({ artifact: { ...artifact, commit_sha: "a".repeat(40) } }).reason, "artifact_commit_mismatch");
  assert.equal(verify({ metadata: { ...metadata, source_commit_sha: "b".repeat(40) } }).reason, "artifact_commit_mismatch");
});

test("rejects an explicit checksum that is missing in the registry or differs", () => {
  assert.equal(verify({ artifact: { ...artifact, checksum_sha256: null } }).reason, "artifact_checksum_mismatch");
  assert.equal(verify({ metadata: { ...metadata, artifact_checksum_sha256: "0".repeat(64) } }).reason, "artifact_checksum_mismatch");
  assert.equal(verify({ metadata: { ...metadata, artifact_checksum_sha256: checksum.toUpperCase() } }).ok, true);
});

test("excludes removed storage artifacts and unsupported providers", () => {
  assert.equal(verify({ artifact: {
    ...artifact, metadata: { storage_deleted_at: "2026-11-26T00:00:00Z" },
  } }).reason, "artifact_storage_deleted");
  assert.equal(verify({ artifact: { ...artifact, artifact_provider: "local" } }).reason, "artifact_provider_unsupported");
});
