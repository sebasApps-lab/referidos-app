import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { uploadSourcemaps, verifySourcemapTenant } from "./upload-sourcemaps.mjs";

const tenant = { id: "dfb1d762-d80f-4c87-a21b-404908a092ab", name: "Migo & Referidos", status: "active" };
const otherTenant = { id: "091a9c61-96d5-4b69-a94f-d5cf5f50f1c2", name: "Migo - Referidos", status: "active" };
const bucket = "obs-sourcemaps";
const conflictKey = "tenant_id,app_id,app_version,build_id,env";
const baseEnv = {
  SUPABASE_URL: "https://invalid.example",
  SUPABASE_SECRET_KEY: "test-key",
  BUILD_ID: "test-build",
  APP_ENV: "staging",
};
const currentRelease = {
  tenant_id: tenant.id,
  app_id: "referidos-app",
  app_version: "1.2.3",
  build_id: "test-build",
  env: "staging",
};
const pastDate = "2020-01-01T00:00:00Z";
let root;

before(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), "referidos-sourcemap-test-"));
  const app = path.join(root, "apps", "referidos-app");
  const assets = path.join(app, "dist", "assets");
  await fs.mkdir(assets, { recursive: true });
  await fs.writeFile(path.join(app, "package.json"), JSON.stringify({ version: "1.2.3" }));
  await fs.writeFile(path.join(assets, "main.js.map"), JSON.stringify({ sourcesContent: ["export {};"] }));
});

after(async () => {
  if (!root) return;
  const target = await fs.realpath(root);
  assert.equal(path.dirname(target), await fs.realpath(os.tmpdir()));
  assert.match(path.basename(target), /^referidos-sourcemap-test-/);
  await fs.rm(target, { recursive: true, force: true });
});

function matches(row, selector) {
  return Object.entries(selector).every(([key, value]) => row[key] === value);
}

function dataStore({ tenants = [tenant], releases = [], objects = new Map(), tenantError } = {}) {
  const calls = { tenants: [], releaseReads: [], upserts: [], uploads: [], downloads: [], removals: [], patches: [] };
  const supabase = {
    from(table) {
      if (table === "tenants") {
        return {
          select(fields) {
            assert.equal(fields, "id,name,status");
            return { eq: (key, value) => ({
              async maybeSingle() {
                calls.tenants.push({ key, value });
                const rows = tenants.filter((row) => row[key] === value);
                if (tenantError || rows.length > 1) return { error: tenantError || { code: "PGRST116" } };
                return { data: rows[0] || null };
              },
            }) };
          },
        };
      }

      assert.equal(table, "obs_releases");
      return {
        select() {
          const selector = {};
          const read = () => releases.filter((row) => matches(row, selector));
          const query = {
            eq(key, value) {
              selector[key] = value;
              return query;
            },
            match(value) {
              Object.assign(selector, value);
              return query;
            },
            async maybeSingle() {
              calls.releaseReads.push({ ...selector });
              return { data: read()[0] || null };
            },
            async order() {
              calls.releaseReads.push({ ...selector });
              return { data: read().sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)) };
            },
          };
          return query;
        },
        async upsert(row, { onConflict }) {
          assert.equal(onConflict, conflictKey);
          calls.upserts.push(row);
          const existing = releases.find((entry) => onConflict.split(",").every((key) => entry[key] === row[key]));
          if (existing) Object.assign(existing, row);
          else releases.push({ id: `release-${releases.length}`, created_at: new Date().toISOString(), ...row });
          return {};
        },
        update(payload) {
          return { eq: (key, value) => ({
            async match(selector) {
              calls.patches.push({ [key]: value, ...selector });
              for (const row of releases.filter((entry) => entry[key] === value && matches(entry, selector))) {
                Object.assign(row, payload);
              }
              return {};
            },
          }) };
        },
      };
    },
    storage: {
      from(bucketName) {
        assert.equal(bucketName, bucket);
        return {
          async upload(file, content, options) {
            calls.uploads.push({ file, options });
            objects.set(file, content.toString());
            return {};
          },
          async download(file) {
            calls.downloads.push(file);
            return { data: objects.has(file) ? new Blob([objects.get(file)]) : null };
          },
          async remove(files) {
            calls.removals.push(...files);
            for (const file of files) objects.delete(file);
            return {};
          },
        };
      },
    },
  };
  return { supabase, calls, releases, objects };
}

function run(store, env) {
  return uploadSourcemaps({
    argv: ["--app", "referidos-app"],
    root,
    env: { ...baseEnv, ...env },
    createSupabase: () => store.supabase,
  });
}

test("preflight checks the exact tenant independently of any sourcemap writes", async () => {
  const store = dataStore();
  const env = { ...baseEnv, OBS_TENANT_ID: tenant.id, OBS_TENANT_NAME: tenant.name };
  assert.deepEqual(await verifySourcemapTenant({ env, createSupabase: () => store.supabase }), { id: tenant.id, name: tenant.name });
  await assert.rejects(verifySourcemapTenant({
    env: { ...env, OBS_TENANT_NAME: "Other target" }, createSupabase: () => store.supabase,
  }), /do not match/);
  for (const [operation, recorded] of Object.entries(store.calls)) {
    if (operation !== "tenants") assert.equal(recorded.length, 0);
  }
});

function canonicalRelease(store, buildId, { tenantId = tenant.id, meta, date = pastDate } = {}) {
  const selector = { ...currentRelease, tenant_id: tenantId, build_id: buildId };
  const key = `referidos-app@1.2.3+${buildId}`;
  const releasePath = `tenants/${tenantId}/apps/referidos-app/envs/staging/releases/${key}`;
  const manifestPath = `${releasePath}/manifest.json`;
  const mapFile = "assets/main.js.map";
  const mapPath = `${releasePath}/maps/${mapFile}`;
  store.releases.push({
    id: buildId,
    ...selector,
    created_at: date,
    meta: { sourcemaps: {
      tenant_id: tenantId, bucket, release_key: key, release_path: releasePath, manifest_path: manifestPath,
      file_count: 1, available: true, ...meta,
    } },
  });
  store.objects.set(manifestPath, JSON.stringify({
    ...selector, release_key: key, maps: [{ map_file: mapFile, map_path: mapPath }],
  }));
  store.objects.set(mapPath, "{}");
  return { manifestPath, mapPath };
}

test("an explicit ID resolves once and writes canonical identity to Storage, DB and CI output", async () => {
  const store = dataStore({ tenants: [tenant, otherTenant] });
  const githubOutput = path.join(root, "github-output");
  await fs.writeFile(githubOutput, "previous=value\n");
  const result = await run(store, { OBS_TENANT_ID: tenant.id.toUpperCase(), GITHUB_OUTPUT: githubOutput });
  assert.deepEqual(store.calls.tenants, [{ key: "id", value: tenant.id }]);
  assert.deepEqual(store.calls.releaseReads[0], currentRelease);
  assert.equal(result.tenant_id, tenant.id);
  assert.match(result.manifest_path, new RegExp(`^tenants/${tenant.id}/apps/referidos-app/envs/staging/`));
  assert.equal(store.calls.upserts[0].tenant_id, tenant.id);
  assert.equal(store.calls.upserts[0].meta.sourcemaps.tenant_id, tenant.id);
  assert.equal(JSON.parse(store.objects.get(result.manifest_path)).tenant_id, tenant.id);
  assert.equal(await fs.readFile(githubOutput, "utf-8"), `previous=value\ntenant_name=${tenant.name}\ntenant_id=${tenant.id}\n`);
});

test("exact name-only resolution is compatible and similar labels keep separate object namespaces", async () => {
  const store = dataStore({ tenants: [tenant, otherTenant] });
  const first = await run(store, { OBS_TENANT_NAME: tenant.name });
  const second = await run(store, { OBS_TENANT_NAME: otherTenant.name });
  assert.deepEqual(store.calls.tenants, [
    { key: "name", value: tenant.name }, { key: "name", value: otherTenant.name },
  ]);
  assert.notEqual(first.manifest_path, second.manifest_path);
  assert.deepEqual(store.releases.map((row) => row.tenant_id), [tenant.id, otherTenant.id]);
});

test("missing identity or invalid explicit configuration stops before any DB or Storage operation", async () => {
  const store = dataStore();
  await assert.rejects(run(store, { VITE_DEFAULT_TENANT_ID: tenant.name }), /Set OBS_TENANT_ID or OBS_TENANT_NAME/);
  await assert.rejects(run(store, { OBS_TENANT_ID: "not-a-uuid", OBS_TENANT_NAME: tenant.name }), /must be a UUID/);
  await assert.rejects(run(store, { OBS_TENANT_NAME: "Name\nSecond line" }), /single-line/);
  assert.equal(Object.values(store.calls).flat().length, 0);
});

test("tenant lookup rejects wrong, ambiguous, inactive and inconsistent selectors without writes", async () => {
  for (const [fixture, env, message] of [
    [{}, { OBS_TENANT_NAME: tenant.name.toLowerCase() }, /not found/],
    [{}, { OBS_TENANT_ID: otherTenant.id, OBS_TENANT_NAME: tenant.name }, /not found/],
    [{}, { OBS_TENANT_ID: tenant.id, OBS_TENANT_NAME: otherTenant.name }, /do not match/],
    [{ tenants: [tenant, { ...otherTenant, name: tenant.name }] }, { OBS_TENANT_NAME: tenant.name }, /single result/],
    [{ tenants: [{ ...tenant, status: "inactive" }] }, { OBS_TENANT_ID: tenant.id }, /inactive/],
    [{ tenants: [{ ...tenant, name: "Name\r\nSecond line" }] }, { OBS_TENANT_ID: tenant.id }, /invalid identity/],
    [{ tenantError: { message: "sensitive backend detail" } }, { OBS_TENANT_ID: tenant.id }, /^Error: Tenant lookup did not return a single result$/],
  ]) {
    const store = dataStore(fixture);
    await assert.rejects(run(store, env), message);
    assert.equal(store.calls.tenants.length, 1);
    assert.deepEqual(store.calls.releaseReads, []);
    assert.deepEqual(store.calls.uploads, []);
    assert.deepEqual(store.calls.upserts, []);
  }
});

test("same-release reupload merges metadata and never prunes the current upload even if its row is old", async () => {
  const oldPath = "tenants/ReferidosAPP/apps/referidos-app/releases/old/manifest.json";
  const store = dataStore({ releases: [{ id: "existing", ...currentRelease, created_at: pastDate,
    meta: { artifact: "artifact-fixture", sourcemaps: { available: true, manifest_path: oldPath } },
  }] });
  store.objects.set(oldPath, "{}");
  const first = await run(store, { OBS_TENANT_ID: tenant.id, OBS_TENANT_NAME: tenant.name });
  const second = await run(store, { OBS_TENANT_ID: tenant.id });
  assert.equal(store.releases.length, 1);
  assert.equal(store.releases[0].id, "existing");
  assert.equal(store.releases[0].meta.artifact, "artifact-fixture");
  assert.equal(first.manifest_path, second.manifest_path);
  assert.equal(second.pruned_releases, 0);
  assert.deepEqual(store.calls.removals, []);
  assert.equal(store.objects.has(oldPath), true);
});

test("deploying the same build in another environment keeps a separate row and manifest", async () => {
  const store = dataStore();
  const first = await run(store, { OBS_TENANT_ID: tenant.id });
  const second = await run(store, { OBS_TENANT_ID: tenant.id, APP_ENV: "prod" });
  assert.notEqual(first.manifest_path, second.manifest_path);
  assert.deepEqual(store.releases.map((row) => row.env), ["staging", "prod"]);
  assert.deepEqual(store.calls.removals, []);
});

test("retention touches only provably owned canonical objects and marks the exact pruned release", async () => {
  const store = dataStore();
  const valid = canonicalRelease(store, "valid-old");
  const foreign = canonicalRelease(store, "other-tenant", { tenantId: otherTenant.id });
  const legacy = canonicalRelease(store, "legacy", { meta: { tenant_id: undefined } });
  const invalid = canonicalRelease(store, "invalid");
  const manifest = JSON.parse(store.objects.get(invalid.manifestPath));
  manifest.maps[0].map_path = foreign.mapPath;
  store.objects.set(invalid.manifestPath, JSON.stringify(manifest));
  const result = await run(store, { OBS_TENANT_ID: tenant.id });
  assert.equal(result.pruned_releases, 1);
  assert.deepEqual(store.calls.removals, [valid.mapPath, valid.manifestPath]);
  assert.deepEqual(store.calls.patches, [{ id: "valid-old", ...currentRelease, build_id: "valid-old" }]);
  assert.equal(store.releases.find((row) => row.id === "valid-old").meta.sourcemaps.available, false);
  for (const files of [foreign, legacy, invalid]) assert.equal(store.objects.has(files.manifestPath), true);
});

test("count retention preserves the newest available maps regardless of newer releases without maps", async () => {
  const store = dataStore({ releases: [{
    id: "no-maps", ...currentRelease, build_id: "no-maps", created_at: new Date().toISOString(), meta: {},
  }] });
  const old = canonicalRelease(store, "oldest", { date: new Date(Date.now() - 15_000).toISOString() });
  for (let index = 1; index <= 9; index += 1) {
    canonicalRelease(store, `recent-${index}`, { date: new Date(Date.now() - index * 1_000).toISOString() });
  }
  const result = await run(store, { OBS_TENANT_ID: tenant.id });
  assert.equal(result.pruned_releases, 1);
  assert.deepEqual(store.calls.removals, [old.mapPath, old.manifestPath]);
  assert.equal(store.releases.filter((row) => row.meta.sourcemaps?.available).length, 10);
});
