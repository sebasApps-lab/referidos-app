import { configureObsFixture } from "./obs-runtime-fixture.ts";
import { runObsReleaseSync } from "../../../apps/referidos-ops/supabase/functions/_shared/deploy-obs-sync.ts";

Deno.env.set("VERSIONING_OPS_URL", "https://ops.example.test");
Deno.env.set("VERSIONING_OPS_SECRET_KEY", "fixture");
Deno.env.set("OBS_RELEASE_SYNC_TOKEN", "fixture");
await import("../../../apps/referidos-app/supabase/functions/obs-release-sync/index.ts");

type Row = Record<string, unknown>;
type Operation = "lookup" | "upsert" | "update" | "delete";

const execution = "gha-123456-12345678";
const artifactId = "12345678-aaaa-bbbb-cccc-123456789012";
const releaseId = "12345678-cccc-aaaa-bbbb-123456789012";
const commit = "c".repeat(40);
const tenantId = "verified-runtime-tenant";
const tenantName = "Exact fixture tenant";
const projectId = "netlify-fixture-id";
const requestId = "original-request";
const componentKey = "site";
const input = {
  execution_id: execution,
  artifact_id: artifactId,
  release_id: releaseId,
  product_key: "prelaunch_web",
  app_id: "prelaunch",
  env_key: "staging",
  semver: "0.3.4",
  tenant_hint: "Legacy hint is ignored",
  metadata: { deployment_id: projectId, request_id: requestId },
};

function assertEquals(actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

function makeFixture({ attemptStatus = "complete", activeTenant = true, legacy = false } = {}) {
  const releases = [{ id: releaseId, product_key: "prelaunch_web", source_commit_sha: commit,
    env_key: "staging", version_label: "0.3.4", build_number: 2 }];
  const official = {
    execution_id: execution, request_id: requestId, release_id: releaseId, product_key: "prelaunch_web",
    env_key: "staging", version_label: "0.3.4", source_commit_sha: commit,
    publication_status: "published", publication: { netlify_deploy_id: projectId }, reconciliation_status: attemptStatus,
    closed_at: "2026-11-26T00:00:00Z", callback_binding: { artifact_id: artifactId },
    prepared_metadata: { runtime_config: { payload: {
      artifactId, releaseId, sourceCommitSha: commit, appId: "prelaunch", defaultTenantId: tenantName,
      buildId: "3", buildNumber: "3",
    } } },
  };
  const opsRows: Record<string, Row[]> = {
    version_deploy_attempts: [official],
    version_releases_labeled: releases,
    version_release_components_labeled: [{ release_id: releaseId, component_id: "fixture-component", component_key: componentKey,
      component_type: "web", revision_id: "revision-one", revision_no: 2 }],
    version_component_paths: [{ component_id: "fixture-component", path_glob: "fixture/**", include: true }],
    ...(legacy ? { version_release_artifacts_labeled: [{ id: artifactId, release_id: releaseId }] } : {}),
  };
  const runtimeRows: Record<string, Row[]> = {
    tenants: [{ id: tenantId, name: tenantName, status: activeTenant ? "active" : "inactive" }],
    obs_release_snapshots: [],
    obs_release_snapshot_components: [],
    obs_releases: [],
  };
  const calls: Array<{ table: string; operation: Operation }> = [];
  let failure: string | null = null;

  function query(table: string, allRows: Row[]) {
    if (!allRows) throw new Error(`Unexpected fixture table ${table}`);
    let operation: Operation = "lookup";
    let writes: Row[] = [];
    let keys: string[] = [];
    const filters: Array<(row: Row) => boolean> = [];
    const execute = (single: boolean) => {
      calls.push({ table, operation });
      if (failure === `${table}:${operation}`) return { data: null, error: { message: "fixture write failure" } };
      const matched = allRows.filter((row) => filters.every((filter) => filter(row)));
      if (operation === "delete") {
        for (const row of matched) allRows.splice(allRows.indexOf(row), 1);
      }
      if (operation === "update") {
        for (const row of matched) Object.assign(row, structuredClone(writes[0]));
      }
      if (operation === "upsert") {
        for (const row of writes) {
          const existing = allRows.find((entry) => keys.every((key) => entry[key] === row[key]));
          if (existing) Object.assign(existing, structuredClone(row));
          else allRows.push({ id: `${table}-${allRows.length + 1}`, ...structuredClone(row) });
        }
      }
      const data = operation === "upsert"
        ? allRows.filter((entry) => writes.some((row) => keys.every((key) => entry[key] === row[key])))
        : matched;
      return { data: single ? data[0] ?? null : data, error: null };
    };
    return {
      select() { return this; },
      order() { return this; },
      limit() { return this; },
      eq(key: string, value: unknown) { filters.push((row) => row[key] === value); return this; },
      in(key: string, values: unknown[]) { filters.push((row) => values.includes(row[key])); return this; },
      upsert(rows: Row | Row[], { onConflict }: { onConflict: string }) {
        operation = "upsert";
        writes = Array.isArray(rows) ? rows : [rows];
        keys = onConflict.split(",");
        return this;
      },
      update(row: Row) { operation = "update"; writes = [row]; return this; },
      delete() { operation = "delete"; return this; },
      maybeSingle() { return Promise.resolve(execute(true)); },
      single() { return Promise.resolve(execute(true)); },
      then(resolve: (value: ReturnType<typeof execute>) => unknown, reject: (error: unknown) => unknown) {
        return Promise.resolve().then(() => execute(false)).then(resolve, reject);
      },
    };
  }
  const handler = configureObsFixture({
    ops: (table) => query(table, opsRows[table]),
    runtime: (table) => query(table, runtimeRows[table]),
    legacy: legacy ? tenantId : undefined,
  });
  return {
    calls,
    runtimeRows,
    fail(operation: string | null) { failure = operation; },
    async sync(body: Row = input) {
      const response = await handler(new Request("https://runtime.example.test", {
        method: "POST",
        headers: { "x-obs-release-sync-token": "fixture" },
        body: JSON.stringify(body),
      }));
      return { status: response.status, body: await response.json() };
    },
  };
}

Deno.test("OBS uses the exact officially closed attempt, tenant and promoted artifact", async () => {
  const f = makeFixture();
  const result = await f.sync();
  assertEquals(result.status, 200);
  assertEquals(result.body.execution_id, execution);
  assertEquals(result.body.artifact_id, artifactId);
  assertEquals(f.runtimeRows.obs_releases[0].artifact_id, artifactId);
  assertEquals(f.runtimeRows.obs_releases[0].tenant_id, tenantId);
  assertEquals(f.runtimeRows.obs_releases[0].build_id, "3");
  assertEquals(f.runtimeRows.obs_release_snapshot_components.length, 1);
  assertEquals(f.calls.some(({ table }) => table === "version_release_artifacts_labeled"), false);
});

Deno.test("OBS makes no mutations for an incomplete publication, wrong deploy or inactive tenant", async () => {
  const incomplete = makeFixture({ attemptStatus: "incomplete" });
  assertEquals((await incomplete.sync()).status, 409);
  const wrongDeploy = makeFixture();
  assertEquals((await wrongDeploy.sync({ ...input, metadata: { ...input.metadata, deployment_id: "another-id" } })).status, 409);
  const inactive = makeFixture({ activeTenant: false });
  assertEquals((await inactive.sync()).status, 400);
  for (const f of [incomplete, wrongDeploy, inactive]) {
    assertEquals(f.calls.some(({ operation }) => operation !== "lookup"), false);
  }
});

Deno.test("OBS retries partial components and does not acknowledge failed release writes", async () => {
  const f = makeFixture();
  f.fail("obs_release_snapshot_components:upsert");
  const first = await f.sync();
  assertEquals(first.status, 500);
  assertEquals(first.body.detail, "snapshot_components_upsert_failed");
  assertEquals(f.runtimeRows.obs_release_snapshot_components.length, 0);

  f.fail("obs_releases:upsert");
  const second = await f.sync();
  assertEquals(second.status, 500);
  assertEquals(second.body.detail, "obs_release_upsert_failed");
  assertEquals(f.runtimeRows.obs_release_snapshot_components.length, 1);

  f.fail(null);
  const last = await f.sync();
  assertEquals(last.status, 200);
  assertEquals(last.body.skipped_by_hash, true);
  assertEquals(f.runtimeRows.obs_releases.length, 1);
  assertEquals(f.calls.filter(({ table, operation }) => table === "obs_release_snapshot_components" && operation === "upsert").length, 2);
});

Deno.test("legacy OBS requests keep their direct artifact lookup", async () => {
  const f = makeFixture({ legacy: true });
  const { execution_id: _execution, artifact_id: _artifact, ...legacyInput } = input;
  assertEquals((await f.sync(legacyInput)).status, 200);
  assertEquals(f.runtimeRows.obs_releases[0].artifact_id, artifactId);
  assertEquals(f.calls.some(({ table }) => table === "version_deploy_attempts"), false);
});

Deno.test("OPS records durable OBS success only from the exact new runtime acknowledgement", async () => {
  Deno.env.set("OBS_RELEASE_SYNC_URL_STAGING", "https://runtime.example.test");
  const args = {
    requestId, releaseId, productKey: input.product_key, envKey: input.env_key, versionLabel: input.semver,
    deploymentId: projectId, actor: "system:deploy-reconcile",
  };
  const fetch = globalThis.fetch;
  try {
    globalThis.fetch = () => Promise.resolve(Response.json({ ok: true }));
    assertEquals((await runObsReleaseSync(args)).ok, true);
    assertEquals((await runObsReleaseSync({ ...args, executionId: execution, artifactId })).ok, false);
    globalThis.fetch = (_url, init) => {
      const body = JSON.parse(String(init?.body));
      assertEquals(body.execution_id, execution);
      assertEquals(body.artifact_id, artifactId);
      return Promise.resolve(Response.json({
        ok: true, execution_id: execution, artifact_id: artifactId, version_release_id: releaseId,
      }));
    };
    assertEquals((await runObsReleaseSync({ ...args, executionId: execution, artifactId })).ok, true);
  } finally {
    globalThis.fetch = fetch;
  }
});
