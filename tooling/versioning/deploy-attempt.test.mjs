import assert from "node:assert/strict";
import { test } from "node:test";
import { classifyDeployCallback, readDeployReconciliation } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-attempt.mjs";

const executionId = "gha-1795661244000-deadbeef";
const netlifyId = "628b00000000000000000003";
const identity = {
  tenant_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  release_id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  product_key: "referidos_app",
  env_key: "staging",
  semver: "1.2.3",
  source_commit_sha: "a".repeat(40),
  artifact_id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
  artifact_checksum_sha256: "b".repeat(64),
  github_run_id: "1234",
  github_run_attempt: "1",
  github_repository: "fixtures/referidos-app",
  netlify_site_id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
};
const registered = {
  ...identity,
  version_label: identity.semver,
  status: "executed",
  deployment_status: "started",
  deployment_id: executionId,
  metadata: {
    deploy_execution_id: executionId,
    deploy_mode: "github_artifact_exact",
    source_commit_sha: identity.source_commit_sha,
    workflow: { repository: identity.github_repository },
  },
};
const bound = { ...registered, metadata: { ...registered.metadata, callback_attempt: identity } };
const started = { status: "started", deployment_id: executionId, deploy_execution_id: executionId, metadata: identity };
const published = { ...started, status: "success", deployment_id: netlifyId, publication_status: "published" };

test("binds an exact, registered active attempt", () => {
  assert.deepEqual(classifyDeployCallback(registered, started), { kind: "bind", identity, executionId });
  for (const status of ["pending", "approved", "failed", "rejected"]) {
    assert.equal(classifyDeployCallback({ ...registered, status }, started).error, "deploy_attempt_not_active");
  }
});

test("rejects callback attempts with a different execution or scope", () => {
  assert.equal(classifyDeployCallback(registered, { ...started, deploy_execution_id: "gha-1795661244000-abadcafe" }).error, "deploy_execution_mismatch");
  for (const field of ["tenant_id", "release_id", "product_key", "env_key", "semver", "source_commit_sha", "github_repository"]) {
    const unbound = { ...started, metadata: { ...identity, [field]: "different" } };
    assert.equal(classifyDeployCallback(registered, unbound).error, "deploy_callback_identity_mismatch");
  }
});

test("refuses final callbacks without a matching previously bound run", () => {
  assert.equal(classifyDeployCallback(registered, published).error, "deploy_attempt_not_bound");
  const changedRun = { ...published, metadata: { ...identity, github_run_id: "1235" } };
  assert.equal(classifyDeployCallback(bound, changedRun).error, "deploy_callback_run_mismatch");
  const rerun = { ...published, metadata: { ...identity, github_run_attempt: 2 } };
  assert.equal(classifyDeployCallback(bound, rerun).error, "deploy_callback_identity_mismatch");
});

test("does not accept alternate artifact bytes or Netlify site after binding", () => {
  for (const [field, different] of [["artifact_checksum_sha256", "c".repeat(64)], ["artifact_id", identity.tenant_id], ["netlify_site_id", identity.release_id]]) {
    assert.equal(classifyDeployCallback(bound, { ...published, metadata: { ...identity, [field]: different } }).error,
      "deploy_callback_run_mismatch");
  }
});

test("reports publication only with the outer Netlify deployment ID", () => {
  const result = classifyDeployCallback(bound, published);
  assert.deepEqual(result.publication, {
    status: "published", netlify_site_id: identity.netlify_site_id, netlify_deploy_id: netlifyId,
  });
  assert.equal(classifyDeployCallback(bound, { ...published, deployment_id: executionId }).error, "invalid_publication_evidence");
});

test("differentiates verified pre-publish failure from an unconfirmed publication", () => {
  for (const publicationStatus of ["not_published", "not_confirmed"]) {
    const failed = { ...started, status: "failed", publication_status: publicationStatus };
    assert.equal(classifyDeployCallback(bound, failed).publication.status, publicationStatus);
    assert.equal(classifyDeployCallback(bound, { ...failed, deployment_id: netlifyId }).error, "invalid_publication_evidence");
  }
});

test("keeps terminal outcomes idempotent without reopening completed attempts", () => {
  const complete = {
    ...bound,
    deployment_status: "success",
    metadata: {
      ...bound.metadata,
      publication: { status: "published", netlify_deploy_id: netlifyId, netlify_site_id: identity.netlify_site_id },
      ops_reconciliation: { status: "incomplete", reason: "mark_env_artifact_head_failed" },
    },
  };
  assert.equal(classifyDeployCallback(complete, published).kind, "duplicate");
  assert.equal(classifyDeployCallback(complete, started).kind, "duplicate");
  assert.equal(classifyDeployCallback(complete, { ...published, deployment_id: "another-netlify-id" }).error,
    "deploy_callback_outcome_conflict");
  const state = readDeployReconciliation(complete.metadata, executionId);
  assert.equal(state.publication.status, "published");
  assert.equal(state.reconciliation.status, "incomplete");
  assert.equal(state.reconciliation.reason, "mark_env_artifact_head_failed");
  assert.deepEqual(readDeployReconciliation(complete.metadata, "manual-reconciliation"), { publication: null, reconciliation: null });
});

test("permits omitted legacy artifact ID only with an established direct binding", () => {
  const noArtifact = { ...published, metadata: { ...identity, artifact_id: null } };
  assert.equal(classifyDeployCallback(bound, noArtifact).error, "deploy_callback_run_mismatch");
  const boundDirect = {
    ...bound,
    metadata: { ...bound.metadata, callback_attempt: { ...identity, direct_artifact: true } },
  };
  assert.equal(classifyDeployCallback(boundDirect, noArtifact).identity.artifact_id, identity.artifact_id);
});
