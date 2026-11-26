import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  assertBoundDeployAttempt,
  assertReleaseArtifactWritable,
  assertStorageArtifactWritable,
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
  created_at: "2026-11-27T00:00:00Z",
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
  attempts = [],
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
      version_deploy_requests: attempts,
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

test("blocks historical releases omitted from the approved registry and unverifiable release dates", async () => {
  for (const [created_at, reason] of [
    ["2026-11-26T05:24:14Z", "historical_release_ineligible"],
    [null, "historical_release_date_unverified"],
  ]) {
    const client = registry({
      releases: [release(prodId, "prod", { created_at })],
      artifacts: [artifact(prodId, "prod")],
    });
    await assert.rejects(resolveReleaseForDeploy(client, input), code(reason));
  }
});

test("rejects historical re-builds and overwrites of protected physical Storage objects", () => {
  const pins = JSON.parse(readFileSync(new URL("./historical-release-registry.json", import.meta.url), "utf8"));
  for (const pin of pins.artifacts) {
    assert.throws(() => assertStorageArtifactWritable(pin.bucket, pin.path), code("historical_storage_write_forbidden"));
  }
  assert.throws(() => assertReleaseArtifactWritable(release(devId, "dev", { created_at: null })), code("historical_artifact_write_forbidden"));
  assert.throws(() => assertReleaseArtifactWritable(release(devId, "dev", {
    created_at: "2026-01-01T00:00:00Z",
  })), code("historical_artifact_write_forbidden"));
  assert.doesNotThrow(() => assertReleaseArtifactWritable(release(devId, "dev")));
});

test("does not allow a new promotion to reuse a blocked historical origin", async () => {
  const client = registry({
    releases: [release(prodId, "prod"), release(devId, "dev", { created_at: "2026-01-01T00:00:00Z" })],
    artifacts: [artifact(devId, "dev")],
    promotions: [promotion(devId, prodId)],
  });
  const bound = await resolveReleaseForDeploy(client, input);
  await assert.rejects(resolveArtifactMetadata(client, bound), code("historical_release_ineligible"));
});

test("pins the artifact locator and entire recorded lineage of a verified historical release", async () => {
  const pins = JSON.parse(readFileSync(new URL("./historical-release-registry.json", import.meta.url), "utf8"));
  const target = pins.releases.find((record) => record.product === "prelaunch_web" && record.env === "prod");
  const pin = pins.artifacts.find((record) => record.id === target.artifact_id);
  const lineage = pins.releases.filter((record) => record.artifact_id === pin.id);
  const oldReleases = lineage.map((record) => release(record.id, record.env, {
    product_key: record.product, version_label: record.semver, source_commit_sha: pin.source_commit_sha,
    created_at: "2026-01-01T00:00:00Z",
  }));
  const promotions = lineage.filter((record) => record.predecessor_id)
    .map((record) => promotion(record.predecessor_id, record.id));
  const zip = artifact(pin.owner_release_id, "dev", {
    id: pin.id, product_key: target.product, version_label: target.semver, commit_sha: pin.source_commit_sha,
    metadata: { storage_bucket: pin.bucket }, checksum_sha256: pin.sha256, size_bytes: pin.size_bytes,
    artifact_name: pin.path.split("/").at(-1), artifact_path: pin.path,
  });
  const supplied = { ...input, productKey: target.product, semver: target.semver, sourceCommitSha: pin.source_commit_sha };
  for (const [records, ancestry, reason] of [
    [[zip], promotions, null],
    [[{ ...zip, size_bytes: pin.size_bytes + 1 }], promotions, "historical_artifact_mismatch"],
    [[{ ...zip, metadata: { storage_bucket: "another" } }], promotions, "historical_artifact_mismatch"],
    [[{ ...zip, id: competingId }], promotions, "historical_artifact_mismatch"],
    [[zip], [promotion(pin.owner_release_id, target.id)], "historical_lineage_mismatch"],
  ]) {
    const client = registry({
      requestRows: [request({ release_id: target.id, product_key: target.product, version_label: target.semver })],
      releases: oldReleases, artifacts: records, promotions: ancestry,
    });
    const bound = await resolveReleaseForDeploy(client, supplied);
    if (reason) await assert.rejects(resolveArtifactMetadata(client, bound), code(reason));
    else assert.equal((await resolveArtifactMetadata(client, bound)).id, pin.id);
  }
});

test("requires the same GitHub run and exact registered site, tenant, and artifact before publication", async () => {
  const githubRunId = "127";
  const netlifySiteId = "aaaaaaaa-0000-4000-8000-000000000012";
  const identity = {
    github_run_id: githubRunId, github_run_attempt: "1", netlify_site_id: netlifySiteId, tenant_id: tenantId,
    release_id: prodId, artifact_id: artifactId, artifact_checksum_sha256: checksum, source_commit_sha: sourceCommitSha,
    env_key: "prod", semver, product_key: productKey,
  };
  for (const delta of [
    {}, { github_run_id: "129" }, { netlify_site_id: competingId }, { tenant_id: competingId },
    { artifact_id: competingId }, { artifact_checksum_sha256: "0".repeat(64) },
  ]) {
    const client = registry({
      attempts: [request({ metadata: { callback_attempt: { ...identity, ...delta } } })],
    });
    const bound = await resolveReleaseForDeploy(client, input);
    const checked = assertBoundDeployAttempt(client, bound, artifactId, checksum, { githubRunId, netlifySiteId });
    if (Object.keys(delta).length) await assert.rejects(checked, code("deploy_attempt_mismatch"));
    else await checked;
  }
});

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
