import assert from "node:assert/strict";
import test from "node:test";
import {
  metadataOutputs,
  releaseOutputs,
  resolveArtifactMetadata,
  resolveReleaseForDeploy,
  validateGitHubArtifact,
} from "./release-artifact-integrity.mjs";

const requestId = "aabbccdd-0000-4000-8000-000000000001";
const tenantId = "aaaaaaaa-0000-4000-8000-000000000002";
const productId = "aaaaaaaa-0000-4000-8000-000000000003";
const prodId = "aaaaaaaa-0000-4000-8000-000000000004";
const stagingId = "aaaaaaaa-0000-4000-8000-000000000005";
const devId = "aaaaaaaa-0000-4000-8000-000000000006";
const envId = "aaaaaaaa-0000-4000-8000-000000000009";
const envIds = { prod: envId, staging: "aaaaaaaa-0000-4000-8000-000000000010", dev: "aaaaaaaa-0000-4000-8000-000000000011" };
const artifactId = "aaaaaaaa-0000-4000-8000-000000000007";
const competingId = "aaaaaaaa-0000-4000-8000-000000000008";
const sourceCommitSha = "abcde01234".repeat(4);
const checksum = "1234abcd".repeat(8);
const productKey = "referidos_app";
const semver = "1.2.3";
const deployExecutionId = "gha-1785771200123-aabbccdd";
const artifactName = "release-referidos_app-1.2.3-abcde01234ab.zip";
const repo = "team/example";
const input = {
  requestId,
  productKey,
  envKey: "prod",
  semver,
  sourceCommitSha,
  deployExecutionId,
};

const request = (overrides = {}) => ({
  id: requestId,
  tenant_id: tenantId,
  env_id: envId,
  product_id: productId,
  release_id: prodId,
  product_key: productKey,
  env_key: "prod",
  version_label: semver,
  status: "executed",
  deployment_id: deployExecutionId,
  deployment_status: "started",
  ...overrides,
});

const release = (id, env, overrides = {}) => ({
  id,
  tenant_id: tenantId,
  product_key: productKey,
  product_id: productId,
  env_id: envIds[env],
  env_key: env,
  version_label: semver,
  build_number: 12,
  channel: env,
  source_commit_sha: sourceCommitSha,
  ...overrides,
});

const artifact = (id, env, overrides = {}) => ({
  id: artifactId,
  tenant_id: tenantId,
  product_id: productId,
  product_key: productKey,
  release_id: id,
  version_label: semver,
  env_key: env,
  commit_sha: sourceCommitSha,
  artifact_provider: "supabase_storage",
  artifact_name: artifactName,
  artifact_path: [productKey, semver, sourceCommitSha.slice(0, 12), artifactName].join("/"),
  size_bytes: 310,
  checksum_sha256: checksum,
  ...overrides,
});

const promotion = (from, to) => ({
  tenant_id: tenantId,
  product_id: productId,
  from_release_id: from,
  to_release_id: to,
});

function registry({
  requestRows = [request()],
  releases = [release(prodId, "prod"), release(stagingId, "staging"), release(devId, "dev")],
  artifacts = [],
  promotions = [],
} = {}) {
  let observations = 0;
  const queries = [];
  const results = (table, column, value) => {
    queries.push([table, column, value]);
    const tables = {
      version_deploy_requests_labeled: requestRows.slice(Math.min(observations, requestRows.length - 1)),
      version_releases_labeled: releases,
      version_releases: releases,
      version_release_artifacts_labeled: artifacts,
      version_promotions: promotions,
    };
    if (table === "version_deploy_requests_labeled") {
      observations++;
      return tables[table].slice(0, 1).filter((row) => row[column] === value);
    }
    return tables[table].filter((row) => row[column] === value);
  };
  return {
    queries,
    from: (table) => ({
      select: () => ({
        eq: (column, value) => ({
          maybeSingle: async () => {
            const rows = results(table, column, value);
            return rows.length < 2 ? { data: rows[0] ?? null } : { error: { message: "multiple results" } };
          },
          limit: async (limit) => {
            const rows = results(table, column, value);
            return { data: rows.slice(0, limit), count: rows.length };
          },
        }),
      }),
    }),
  };
}

const code = (expected) => (error) => error.code === expected;

test("binds this execution to the exact destination release and exposes safe outputs", async () => {
  const client = registry({ artifacts: [artifact(prodId, "prod")] });
  const bound = await resolveReleaseForDeploy(client, input);
  assert.deepEqual(releaseOutputs(bound), {
    release_id: prodId,
    release_build_number: "12",
    release_channel: "prod",
    release_version_label: semver,
    release_source_commit_sha: sourceCommitSha,
    tenant_id: tenantId,
  });
  const resolved = await resolveArtifactMetadata(client, bound);
  assert.equal(resolved.release_id, prodId);
  assert.equal(metadataOutputs(resolved).artifact_sha256, checksum);
  assert.equal(metadataOutputs(resolved).artifact_size_bytes, "310");
  assert.equal(metadataOutputs(resolved).artifact_bucket, "versioning-artifacts");
  assert.equal(metadataOutputs(resolved, { defaultBucket: "" }).artifact_bucket, "versioning-artifacts");
  assert.ok(client.queries.every(([table]) => table !== "version_promotions"));
});

test("waits for OPS to register the execution when dispatch wins the race", async () => {
  const beforeDispatch = request({ status: "approved", deployment_id: null, deployment_status: null });
  const client = registry({ requestRows: [beforeDispatch, request()] });
  const delays = [];
  const bound = await resolveReleaseForDeploy(client, input, {
    attempts: 2,
    delayMs: 20,
    wait: async (ms) => { delays.push(ms); },
  });
  assert.equal(bound.request.deployment_id, deployExecutionId);
  assert.deepEqual(delays, [20]);
});

test("rejects an unregistered, an old, or a finished execution", async () => {
  const unregistered = request({ status: "approved", deployment_id: null, deployment_status: null });
  const old = request({ deployment_id: "gha-1785770100000-aabbccdd" });
  const finished = request({ deployment_status: "success" });
  await assert.rejects(
    resolveReleaseForDeploy(registry({ requestRows: [unregistered] }), input, { attempts: 1 }),
    code("deploy_execution_not_registered"),
  );
  for (const row of [old, finished]) {
    await assert.rejects(
      resolveReleaseForDeploy(registry({ requestRows: [row] }), input),
      code("deploy_execution_mismatch"),
    );
  }
});

test("rejects mismatched request scope and mismatched destination SHA", async () => {
  const client = registry({ requestRows: [request({ env_key: "staging" })] });
  await assert.rejects(resolveReleaseForDeploy(client, input), code("deploy_request_mismatch"));
  await assert.rejects(
    resolveReleaseForDeploy(registry({ releases: [release(prodId, "prod", { source_commit_sha: "f".repeat(40) })] }), input),
    code("deploy_release_mismatch"),
  );
});

test("resolves a Dev ZIP through recorded Prod and Staging lineage including duplicate events", async () => {
  const client = registry({
    artifacts: [artifact(devId, "dev")],
    promotions: [
      promotion(stagingId, prodId),
      promotion(stagingId, prodId),
      promotion(devId, stagingId),
    ],
  });
  const bound = await resolveReleaseForDeploy(client, input);
  const resolved = await resolveArtifactMetadata(client, bound);
  assert.equal(resolved.release_id, devId);
  assert.equal(releaseOutputs(bound).release_id, prodId);
});

test("a matching commit without a recorded promotion does not establish artifact provenance", async () => {
  const client = registry({ artifacts: [artifact(devId, "dev")] });
  const bound = await resolveReleaseForDeploy(client, input);
  await assert.rejects(resolveArtifactMetadata(client, bound), code("artifact_backfill_required"));
});

test("rejects more than one promotion origin and releases with different source commits", async () => {
  const competing = registry({
    promotions: [promotion(stagingId, prodId), promotion(competingId, prodId)],
  });
  await assert.rejects(
    resolveArtifactMetadata(competing, await resolveReleaseForDeploy(competing, input)),
    code("artifact_lineage_ambiguous"),
  );
  const differentSha = registry({
    releases: [release(prodId, "prod"), release(stagingId, "staging", { source_commit_sha: "b".repeat(40) })],
    promotions: [promotion(stagingId, prodId)],
  });
  await assert.rejects(
    resolveArtifactMetadata(differentSha, await resolveReleaseForDeploy(differentSha, input)),
    code("artifact_lineage_commit_mismatch"),
  );
});

test("rejects conflicting direct metadata instead of bypassing it via a valid predecessor", async () => {
  const client = registry({
    artifacts: [
      artifact(prodId, "prod", { commit_sha: "b".repeat(40) }),
      artifact(devId, "dev"),
    ],
    promotions: [promotion(devId, prodId)],
  });
  const bound = await resolveReleaseForDeploy(client, input);
  await assert.rejects(resolveArtifactMetadata(client, bound), code("artifact_provenance_mismatch"));
});

test("rejects incomplete checksums and ZIP paths outside the registered identity", async () => {
  const incomplete = registry({ artifacts: [artifact(prodId, "prod", { checksum_sha256: null })] });
  await assert.rejects(
    resolveArtifactMetadata(incomplete, await resolveReleaseForDeploy(incomplete, input)),
    code("artifact_backfill_required"),
  );
  const wrongPath = registry({ artifacts: [artifact(prodId, "prod", { artifact_path: "other/file.zip" })] });
  const resolved = await resolveArtifactMetadata(wrongPath, await resolveReleaseForDeploy(wrongPath, input));
  assert.throws(() => metadataOutputs(resolved), code("artifact_backfill_required"));
});

test("requires the exact GitHub repository, run, and artifact ID for a registered GitHub ZIP", async () => {
  const client = registry({ artifacts: [artifact(prodId, "prod", {
    artifact_provider: "github_actions",
    artifact_name: "registered-release",
    github_repository: repo,
    github_run_id: 120,
    github_artifact_id: 48,
  })] });
  const resolved = await resolveArtifactMetadata(client, await resolveReleaseForDeploy(client, input));
  const outputs = metadataOutputs(resolved, { githubRepository: repo });
  assert.equal(outputs.github_artifact_id, "48");
  assert.equal(outputs.github_artifact_name, "registered-release");
  assert.equal(outputs.artifact_run_id, "120");
  assert.throws(() => metadataOutputs(resolved, { githubRepository: "other/example" }), code("artifact_backfill_required"));
});

test("checks the exact live GitHub record and refuses expired or mismatched records", () => {
  const expected = { artifactId: "48", artifactName: "registered-release", runId: "120" };
  const record = { id: 48, name: "registered-release", expired: false, workflow_run: { id: 120 } };
  assert.doesNotThrow(() => validateGitHubArtifact(record, expected));
  for (const changed of [{ id: 49 }, { name: "other" }, { workflow_run: { id: 121 } }]) {
    assert.throws(
      () => validateGitHubArtifact({ ...record, ...changed }, expected),
      code("github_artifact_provenance_mismatch"),
    );
  }
  assert.throws(() => validateGitHubArtifact({ ...record, expired: true }, expected), code("artifact_backfill_required"));
});

test("rejects a release whose raw product or environment identity differs from the request", async () => {
  for (const identity of [
    { product_id: "bbbbbbbb-0000-4000-8000-000000000003" },
    { env_id: "bbbbbbbb-0000-4000-8000-000000000004" },
  ]) {
    const client = registry({ releases: [release(prodId, "prod", identity)] });
    await assert.rejects(resolveReleaseForDeploy(client, input), code("deploy_release_mismatch"));
  }
});

test("reports that a tombstoned Storage ZIP needs a new artifact", async () => {
  const client = registry({ artifacts: [artifact(prodId, "prod", {
    metadata: { storage_deleted_at: "2026-11-26T18:00:00.000Z" },
  })] });
  const bound = await resolveReleaseForDeploy(client, input);
  await assert.rejects(resolveArtifactMetadata(client, bound), code("artifact_backfill_required"));
});

test("retains GitHub source information as provenance for Storage without exposing a GitHub provider", async () => {
  const client = registry({ artifacts: [artifact(prodId, "prod", {
    github_repository: repo,
    github_run_id: 120,
    github_artifact_id: 48,
  })] });
  const resolved = await resolveArtifactMetadata(client, await resolveReleaseForDeploy(client, input));
  const outputs = metadataOutputs(resolved, { githubRepository: repo });
  assert.equal(outputs.artifact_provider, "supabase_storage");
  assert.equal(outputs.artifact_repo, repo);
  assert.equal(outputs.artifact_run_id, "120");
  assert.equal(outputs.github_artifact_id, "");
  assert.equal(outputs.github_artifact_name, "");
});
