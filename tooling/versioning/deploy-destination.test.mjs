import assert from "node:assert/strict";
import { test } from "node:test";
import { getVersioningTarget } from "../../apps/referidos-app/src/admin/versioning/services/versioningTargets.js";
import { readNetlifyDeployId, validateSupabaseDestinations, verifyNetlifyDestination } from "./deploy-destination.mjs";

const siteId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const deploymentId = "abcdef0123456789abcdef00";
const site = {
  id: siteId, name: "testing-goplip",
  published_deploy: { id: deploymentId, site_id: siteId, state: "ready", draft: false },
};
const env = { productKey: "prelaunch_web", envKey: "staging", siteId, token: "fixture", wait: async () => {} };
const runtimeUrl = "https://iegjfeaadayfvqockwov.supabase.co";
const runtime = { ...env, runtimeUrl, obsUrl: runtimeUrl, runtimeKey: "sb_publishable_fixture" };
const jsonFetch = (value) => () => Response.json(value);

test("checks all authorized destinations against the OPS UI mapping", async () => {
  for (const productKey of ["referidos_app", "prelaunch_web"]) {
    for (const envKey of ["staging", "prod"]) {
      const expected = getVersioningTarget(productKey, envKey);
      const url = "https://" + expected.projectRef + ".supabase.co";
      assert.doesNotThrow(() => validateSupabaseDestinations({ ...runtime, productKey, envKey, runtimeUrl: url, obsUrl: url }));
      const verified = await verifyNetlifyDestination({
        ...env, productKey, envKey, fetchImpl: jsonFetch({ id: siteId, name: expected.netlify }),
      });
      assert.equal(verified.siteName, expected.netlify);
    }
  }
});

test("rejects the wrong runtime or observability project and privileged runtime keys", () => {
  const jwt = (role, ref) => "header." + Buffer.from(JSON.stringify({ role, ref })).toString("base64url") + ".signature";
  for (const mismatch of [
    { runtimeUrl: "https://ztcsrfwvjgqnmhnlpeye.supabase.co" },
    { runtimeUrl: runtimeUrl + "/rest/v1" },
    { obsUrl: "https://unapproved.example.com" },
    { obsUrl: "https://ztcsrfwvjgqnmhnlpeye.supabase.co" },
    { runtimeKey: "sb_secret_fixture" },
    { runtimeKey: jwt("service_role", "iegjfeaadayfvqockwov") },
    { runtimeKey: jwt("anon", "ztcsrfwvjgqnmhnlpeye") },
  ]) assert.throws(() => validateSupabaseDestinations({ ...runtime, ...mismatch }));
  assert.doesNotThrow(() => validateSupabaseDestinations({ ...runtime, runtimeKey: jwt("anon", "iegjfeaadayfvqockwov") }));
  assert.doesNotThrow(() => validateSupabaseDestinations({
    ...runtime, obsUrl: "https://aaaaaaaaaaaaaaaaaaaa.supabase.co", obsProjectRef: "aaaaaaaaaaaaaaaaaaaa",
  }));
});

test("queries only the fixed Netlify HTTPS endpoint and rejects a mismatched site immediately", async () => {
  let calls = 0;
  await assert.rejects(verifyNetlifyDestination({
    ...env,
    fetchImpl: (url, options) => {
      calls++;
      assert.equal(url, "https://api.netlify.com/api/v1/sites/" + siteId);
      assert.equal(options.method, "GET");
      assert.equal(options.redirect, "error");
      return Response.json({ ...site, name: "join-goplip" });
    },
  }), /no coincide/);
  assert.equal(calls, 1);
});

test("retries only reads and confirms only the exact active ready deployment", async () => {
  let calls = 0;
  let waits = 0;
  const result = await verifyNetlifyDestination({
    ...env, expectedDeployId: deploymentId,
    fetchImpl: () => [
      new Response(null, { status: 503 }), Response.json({ ...site, published_deploy: null }), Response.json(site),
    ][calls++],
    wait: async () => { waits++; },
  });
  assert.deepEqual(result, { siteId, siteName: site.name, deploymentId });
  assert.equal(calls, 3);
  assert.equal(waits, 2);
});

test("an inactive, draft, unfinished, or cross-site deploy is never confirmed", async () => {
  for (const metadata of [
    { id: "other" }, { draft: true }, { state: "error" }, { site_id: "other" },
  ]) {
    await assert.rejects(verifyNetlifyDestination({
      ...env, attempts: 1, expectedDeployId: deploymentId,
      fetchImpl: jsonFetch({ ...site, published_deploy: { ...site.published_deploy, ...metadata } }),
    }), /no confirmó el despliegue/);
  }
  await assert.rejects(verifyNetlifyDestination({
    ...env, fetchImpl: () => new Response(null, { status: 401 }),
  }), /HTTP 401/);
});

test("requires a consistent ID in the output of the Netlify command", () => {
  assert.equal(readNetlifyDeployId({ deploy_id: deploymentId }), deploymentId);
  for (const value of [{}, { id: deploymentId, deploy_id: "other" }, { id: "a\nx=y" }]) {
    assert.throws(() => readNetlifyDeployId(value), /no identifica una publicación única/);
  }
});
