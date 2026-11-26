import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { type Row, selectFixture } from "./edge-fixture.ts";
import "../../../apps/referidos-ops/supabase/functions/versioning-deploy-callback/index.ts";

const requestId = "11111111-1111-4111-8111-111111111111";
const executionId = "gha-1795661244000-11111111";
const netlifyId = "2fc300000000000000000003";
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
  github_run_attempt: 1,
  github_repository: "fixtures/referidos-app",
  netlify_site_id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
};

const started = {
  status: "started",
  deployment_id: executionId,
  deploy_execution_id: executionId,
  metadata: identity,
};
const configPayload = {
  releaseId: identity.release_id,
  artifactId: identity.artifact_id,
  sourceCommitSha: identity.source_commit_sha,
  appEnv: identity.env_key,
};

function runtimeConfig(payload: Row | null = configPayload) {
  return {
    config_key: "app-config.js",
    config_format: "json",
    config_hash_sha256: createHash("sha256").update(JSON.stringify(payload)).digest("hex"),
    payload,
  };
}

const published = {
  ...started,
  status: "success",
  deployment_id: netlifyId,
  publication_status: "published",
  metadata: { ...identity, runtime_config: runtimeConfig() },
};
const beforePublication = { ...started, status: "failed", publication_status: "not_published" };
const unconfirmed = { ...beforePublication, publication_status: "not_confirmed" };

Deno.env.set("VERSIONING_DEPLOY_CALLBACK_TOKEN", "fixture-token");
Deno.env.set("OBS_RELEASE_SYNC_TOKEN", "fixture-obs-token");
Deno.env.set("OBS_RELEASE_SYNC_URL_STAGING", "https://runtime.example.test");
Deno.env.set("OBS_RELEASE_SYNC_TENANT_HINT", "Fixture Tenant");
globalThis.fetch = () => Promise.resolve(Response.json({ ok: true }));

function fixture({ headFails = false, origin = "exact" } = {}) {
  let version = 0;
  let available = true;
  const changes: Array<{ operation: string; values: Row }> = [];
  const row = {
    id: requestId,
    ...identity,
    status: "executed",
    deployment_status: "started",
    deployment_id: executionId,
    version_label: identity.semver,
    product_id: "fixture-product-id",
    env_id: "fixture-env-id",
    updated_at: "0",
    metadata: {
      deploy_execution_id: executionId,
      deploy_mode: "github_artifact_exact",
      source_commit_sha: identity.source_commit_sha,
      workflow: { repository: identity.github_repository },
    } as Row,
  };
  const artifact = {
    id: identity.artifact_id,
    release_id: "ffffffff-ffff-4fff-8fff-ffffffffffff",
    tenant_id: row.tenant_id,
    product_id: row.product_id,
    product_key: row.product_key,
    commit_sha: row.source_commit_sha,
    semver: row.semver,
    version_label: row.version_label,
    checksum_sha256: row.artifact_checksum_sha256,
    artifact_provider: "github_actions",
    metadata: {},
  };
  const release = {
    id: row.release_id,
    product_id: row.product_id,
    tenant_id: row.tenant_id,
    env_id: row.env_id,
    source_commit_sha: row.source_commit_sha,
  };
  const owner = { ...release, id: artifact.release_id, env_key: "dev", product_key: row.product_key, version_label: row.version_label };
  const promotion = { from_release_id: owner.id, tenant_id: owner.tenant_id, product_id: owner.product_id };

  function applyUpdates(values: Row) {
    Object.assign(row, structuredClone(values));
    row.updated_at = String(++version);
  }

  const handler = selectFixture({
    from(table) {
      let updates: Row | undefined;
      const filters: Array<[string, unknown]> = [];
      return {
        select() { return this; },
        update(values: Row) { updates = values; return this; },
        eq(field: string, value: unknown) { filters.push([field, value]); return this; },
        limit() {
          assert.equal(table, "version_promotions");
          assert.deepEqual(filters, [["to_release_id", row.release_id]]);
          const data = origin === "exact" ? [promotion] : origin === "ambiguous"
            ? [promotion, { ...promotion, from_release_id: "11111111-1111-4111-8111-111111111112" }] : [];
          return { data, count: data.length };
        },
        maybeSingle() {
          if (table === "version_deploy_requests_labeled") return { data: structuredClone(row) };
          if (table === "version_releases") return { data: release };
          if (table === "version_releases_labeled") {
            assert.deepEqual(filters, [["id", owner.id]]);
            return { data: owner };
          }
          if (table === "version_release_artifacts_labeled") {
            const [key, value] = filters[0];
            assert.ok(key === "id" || key === "release_id");
            return { data: available && (key === "id" ? value === artifact.id : value === owner.id) ? artifact : null };
          }
          assert.equal(table, "version_deploy_requests");
          assert.ok(updates);
          const values: Row = {
            ...row,
            "metadata->ops_reconciliation->>status": (row.metadata.ops_reconciliation as Row)?.status,
          };
          if (filters.some(([field, expected]) => values[field] !== expected)) return { data: null };
          applyUpdates(updates);
          changes.push({ operation: "update_request", values: updates });
          return { data: { id: requestId } };
        },
        upsert(values: Row) {
          assert.equal(table, "version_artifact_env_heads");
          changes.push({ operation: "upsert_artifact_head", values });
          return { error: headFails ? { code: "fixture_head_error" } : null };
        },
        insert(values: Row) {
          assert.equal(table, "version_audit_log");
          changes.push({ operation: "record_audit", values });
          return { error: null };
        },
      };
    },
    rpc(name, args) {
      changes.push({ operation: name, values: args });
      if (name === "versioning_finalize_deploy_request") {
        assert.equal(args.p_deployment_id, executionId);
        applyUpdates({ deployment_status: args.p_status, metadata: args.p_metadata });
      }
      return { data: "fixture-row", error: null };
    },
  });

  return {
    row,
    changes,
    removeArtifact() { available = false; },
    post(body: Row) {
      return handler(new Request("https://ops.example.test", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-versioning-callback-token": "fixture-token" },
        body: JSON.stringify({ ...body, request_id: requestId }),
      }));
    },
  };
}

Deno.test("an explicit artifact ID still requires a unique promotional provenance", async () => {
  for (const origin of ["missing", "ambiguous"]) {
    const test = fixture({ origin });
    const response = await test.post(started);
    assert.equal(response.status, 409);
    assert.equal((await response.json()).error, "callback_artifact_lineage_mismatch");
    assert.equal(test.changes.length, 0);
  }
});

Deno.test("a bound deployment keeps provider evidence and finalizes the original OPS row", async () => {
  const example = fixture();
  const ack = await (await example.post(started)).json();
  assert.equal(ack.duplicate, false);
  assert.equal(ack.reconciliation.github_run_id, identity.github_run_id);
  const confirmation = await (await example.post(published)).json();
  assert.equal(confirmation.publication.netlify_deploy_id, netlifyId);
  assert.equal(confirmation.reconciliation.status, "complete");
  assert.equal(example.row.deployment_status, "success");
  assert.equal(example.row.deployment_id, executionId);
  assert.ok(example.changes.some(({ operation, values }) => operation === "upsert_artifact_head" && values.artifact_id === identity.artifact_id));

  const changesBeforeRetry = example.changes.length;
  for (const payload of [started, published]) assert.equal((await (await example.post(payload)).json()).duplicate, true);
  assert.equal((await example.post(beforePublication)).status, 409);
  assert.equal(example.changes.length, changesBeforeRetry);
});

Deno.test("published evidence survives an OPS artifact head failure", async () => {
  const example = fixture({ headFails: true });
  assert.equal((await example.post(started)).status, 200);
  const confirmation = await (await example.post(published)).json();
  assert.equal(confirmation.publication.status, "published");
  assert.equal(confirmation.reconciliation.status, "incomplete");
  assert.equal(confirmation.reconciliation.reason, "mark_env_artifact_head_failed");
});

Deno.test("two concurrent callbacks authorize at most one start and finalize once", async () => {
  const example = fixture();
  const starts = await Promise.all([example.post(started), example.post(started)]);
  const acknowledgements = await Promise.all(starts.filter((result) => result.ok).map((result) => result.json()));
  assert.equal(acknowledgements.filter(({ duplicate }) => duplicate === false).length, 1);

  const ends = await Promise.all([example.post(published), example.post(beforePublication)]);
  assert.deepEqual(ends.map(({ status }) => status).sort(), [200, 409]);
  const finalizations = example.changes.filter(({ operation }) => operation === "versioning_finalize_deploy_request");
  assert.equal(finalizations.length, 1);
});

Deno.test("publication may be known when registry evidence no longer validates", async () => {
  const example = fixture();
  assert.equal((await example.post(started)).status, 200);
  example.removeArtifact();
  const confirmation = await (await example.post(published)).json();
  assert.equal(confirmation.publication.status, "published");
  assert.equal(confirmation.reconciliation.reason, "artifact_not_found");
  assert.equal(example.row.deployment_status, "started");
  assert.ok(!example.changes.some(({ operation }) => operation === "upsert_artifact_head"));
});

Deno.test("publication is preserved when runtime config is absent, mismatched, or has the wrong hash", async () => {
  const invalid = [
    null,
    runtimeConfig(null),
    { ...runtimeConfig(), config_hash_sha256: null },
    { ...runtimeConfig(), config_hash_sha256: "0".repeat(64) },
    runtimeConfig({ ...configPayload, releaseId: "other-release" }),
    runtimeConfig({ ...configPayload, artifactId: "other-artifact" }),
    runtimeConfig({ ...configPayload, sourceCommitSha: "f".repeat(40) }),
    runtimeConfig({ ...configPayload, appEnv: "prod" }),
  ];
  for (const config of invalid) {
    const example = fixture();
    assert.equal((await example.post(started)).status, 200);
    const confirmation = await (await example.post({
      ...published,
      metadata: { ...identity, runtime_config: config },
    })).json();
    assert.equal(confirmation.publication.status, "published");
    assert.equal(confirmation.reconciliation.reason, "runtime_config_unverified");
    assert.equal(example.row.metadata.runtime_config, null);
    assert.ok(!example.changes.some(({ operation }) => operation === "versioning_register_env_config_version"));
  }
});

Deno.test("an unconfirmed Netlify result retains the registered attempt", async () => {
  const example = fixture();
  assert.equal((await example.post(started)).status, 200);
  const confirmation = await (await example.post(unconfirmed)).json();
  assert.equal(confirmation.publication.status, "not_confirmed");
  assert.equal(confirmation.reconciliation.status, "incomplete");
  assert.equal(example.row.deployment_status, "started");
  assert.ok(!example.changes.some(({ operation }) => operation === "versioning_finalize_deploy_request"));
});

Deno.test("a no-publication failure closes only a previously bound attempt", async () => {
  const example = fixture();
  assert.equal((await example.post(beforePublication)).status, 409);
  assert.equal(example.changes.length, 0);
  assert.equal((await example.post(started)).status, 200);
  const confirmation = await (await example.post(beforePublication)).json();
  assert.equal(confirmation.publication.status, "not_published");
  assert.equal(confirmation.reconciliation.status, "complete");
  assert.equal(example.row.deployment_status, "failed");
});
