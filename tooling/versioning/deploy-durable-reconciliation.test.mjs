import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { test } from "node:test";
import { handleDurableDeployCallback } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-durable-callback.mjs";
import { netlifyDeployTitle, readNetlifyCurrentDeploy, readNetlifyPublication } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-netlify-proof.mjs";
import { reconcileDeployAttempt, runDeployReconciliation } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-reconciliation.mjs";

const requestId = "63884cdf-4c41-4bd0-87f1-44d5209bc82d";
const executionId = "gha-20261126124511-63884cdf";
const siteId = "63884cdf-4c41-4bd0-87f1-44d5209bc82e";
const siteName = "testing-goplip";
const deployId = "63123456789abcdef0123456";
const binding = {
  tenant_id: "3737fa1b-240a-484f-8c14-4c643962694c", release_id: "4796c420-c302-473e-bc7e-3cd29bb442b1",
  product_key: "referidos_app", env_key: "staging", semver: "1.2.3", source_commit_sha: "a".repeat(40),
  artifact_id: "180a3a20-9ae9-410b-872f-353885809491", artifact_checksum_sha256: "b".repeat(64),
  github_run_id: "90", github_run_attempt: "1", github_repository: "example/test", netlify_site_id: siteId,
};
const title = netlifyDeployTitle(binding, executionId);
const spec = { netlify_site_id: siteId, netlify_site_name: siteName, workflow: {
  repository: binding.github_repository, id: "versioning-deploy-artifact.yml", ref: "dev",
} };
const request = {
  id: requestId, tenant_id: binding.tenant_id, release_id: binding.release_id, product_key: binding.product_key,
  env_key: binding.env_key, version_label: binding.semver, deployment_id: executionId,
  metadata: { deploy_execution_id: executionId, deploy_mode: "github_artifact_exact", deploy_attempt_protocol: "durable_v1",
    source_commit_sha: binding.source_commit_sha },
};

function attempt(overrides = {}) {
  return { execution_id: executionId, request_id: requestId, callback_binding: binding, dispatch_spec: spec,
    dispatch_state: "accepted", prepared_metadata: { netlify_deploy_title: title }, publish_authorized: true,
    publication_status: "not_confirmed", reconciliation_status: "pending", lease_token: "lease", retry_count: 0, ...overrides };
}

function callbackBody(status, extra = {}) {
  return { deploy_execution_id: executionId, deployment_id: executionId, status, metadata: { ...binding }, ...extra };
}

function runtime(overrides = {}) {
  const payload = {
    releaseId: binding.release_id, artifactId: binding.artifact_id, sourceCommitSha: binding.source_commit_sha,
    appEnv: "staging", appVersion: "1.2.3", appId: "referidos-app", buildNumber: "17", releaseChannel: "staging", ...overrides,
  };
  const payload_json = JSON.stringify(payload);
  return { config_key: "app-config.js", config_format: "json", payload, payload_json,
    config_hash_sha256: createHash("sha256").update(payload_json).digest("hex") };
}

function fixture(row, fakeRpc = () => ({})) {
  const calls = [];
  const database = {
    from(table) {
      assert.equal(table, "version_deploy_attempts");
      return { select() { return this; }, eq() { return this; }, maybeSingle: async () => ({ data: row }) };
    },
    async rpc(name, args) {
      calls.push({ name, args });
      const result = fakeRpc(name, args);
      return result.error ? result : { data: { ok: true, attempt: row, ...result } };
    },
  };
  async function callback(body) {
    return await handleDurableDeployCallback({ database, request, body,
      verifyArtifact: async () => ({ ok: true, artifactId: binding.artifact_id }) });
  }
  return { database, calls, callback };
}

test("durable started callback claims the actual OPS run and exact artifact", async () => {
  const env = fixture(attempt({ callback_binding: null, publish_authorized: false, publication_status: null }));
  const result = await env.callback(callbackBody("started"));
  assert.equal(result.body.reconciliation.deploy_execution_id, executionId);
  assert.equal(result.body.reconciliation.github_run_id, binding.github_run_id);
  assert.deepEqual(env.calls, [{ name: "versioning_claim_deploy_attempt", args: { p_execution_id: executionId, p_binding: binding } }]);
});

test("prepared callback stores the original config bytes before returning one publication grant", async () => {
  let calls = 0;
  const env = fixture(attempt(), () => (++calls === 1 ? { publish_authorized: true } : { publish_authorized: true, duplicate: true }));
  const config = runtime();
  const body = callbackBody("prepared", { metadata: { ...binding, runtime_config: config, netlify_deploy_title: title,
    build_number: 17, channel: "staging" } });
  const first = await env.callback(body);
  assert.equal(first.body.publish_authorized, true);
  assert.equal(first.body.reconciliation.github_run_id, binding.github_run_id);
  assert.equal(env.calls[0].name, "versioning_prepare_deploy_attempt");
  assert.deepEqual(env.calls[0].args.p_metadata.runtime_config, config);
  assert.equal((await env.callback(body)).body.publish_authorized, false);
});

test("prepared callback rejects config hashes, payload scope and spoofed deploy markers", async () => {
  const env = fixture(attempt());
  for (const invalid of [
    { runtime_config: { ...runtime(), config_hash_sha256: "f".repeat(64) } },
    { runtime_config: runtime({ releaseId: requestId }) },
    { netlify_deploy_title: "forged" },
    { netlify_site_id: requestId },
    { github_run_id: "91" },
  ]) {
    const result = await env.callback(callbackBody("prepared", { metadata: { ...binding, runtime_config: runtime(),
      netlify_deploy_title: title, channel: "staging", build_number: 17, ...invalid } }));
    assert.equal(result.status, 409);
  }
  assert.deepEqual(env.calls, []);
});

test("workflow publication report persists as pending with exact ID before a provider read", async () => {
  const env = fixture(attempt());
  const result = await env.callback(callbackBody("success", { deployment_id: deployId, publication_status: "published" }));
  assert.equal(result.status, 200);
  assert.equal(result.body.reconciliation.status, "pending");
  assert.deepEqual(env.calls[0].args.p_publication, { status: "not_confirmed", netlify_site_id: siteId, reported_deploy_id: deployId });
});

test("a workflow retry acknowledges existing exact provider evidence without overwriting it", async () => {
  const env = fixture(attempt({ publication_status: "published", reconciliation_status: "complete",
    publication: { status: "published", netlify_site_id: siteId, netlify_deploy_id: deployId } }));
  const result = await env.callback(callbackBody("success", { deployment_id: deployId, publication_status: "published" }));
  assert.equal(result.status, 200);
  assert.equal(result.body.duplicate, true);
  assert.equal(result.body.reconciliation.status, "complete");
  assert.deepEqual(env.calls, []);
});

test("a failure after publication was authorized leaves Netlify's state unknown", async () => {
  const env = fixture(attempt());
  await env.callback(callbackBody("failed", { publication_status: "not_published" }));
  assert.equal(env.calls[0].args.p_publication.status, "not_confirmed");
  const before = fixture(attempt({ publish_authorized: false }));
  await before.callback(callbackBody("failed", { publication_status: "not_published" }));
  assert.equal(before.calls[0].args.p_publication.status, "not_published");
});

function netlifyResponse({ sites = [], rows = [], deploy = {} } = {}) {
  const calls = [];
  const known = { id: deployId, site_id: siteId, title, state: "ready", draft: false, context: "production",
    published_at: "2026-11-26T18:00:00Z", ...deploy };
  const fetchImpl = async (url, init) => {
    const { origin, pathname, search } = new URL(url);
    assert.equal(origin, "https://api.netlify.com");
    assert.equal(init.method, "GET");
    assert.equal(init.redirect, "error");
    assert.equal(init.headers["Cache-Control"], "no-cache");
    calls.push(pathname + search);
    if (pathname.endsWith(`/deploys/${deployId}`)) return Response.json(known);
    if (pathname.endsWith("/deploys")) return Response.json(rows);
    return Response.json({ id: siteId, name: siteName, published_deploy: { id: deployId, title }, ...sites.shift() });
  };
  return {
    calls,
    observe: (reportedId) => readNetlifyPublication({ siteId, siteName, title, token: "mock", reportedId, fetchImpl }),
    observeCurrent: () => readNetlifyCurrentDeploy({ siteId, siteName, token: "mock", fetchImpl }),
  };
}

test("provider proof requires exact project, marker, exact deploy record, and latest live ID", async () => {
  const netlify = netlifyResponse();
  const proof = await netlify.observe(deployId);
  assert.equal(proof.status, "published");
  assert.equal(proof.evidence.netlify_current_deploy_id, deployId);
  assert.equal(netlify.calls.length, 3);
  for (const deploy of [{ title: "wrong" }, { draft: true }, { published_at: null }, { context: "deploy-preview" }]) {
    assert.equal((await netlifyResponse({ deploy }).observe(deployId)).status, "not_confirmed");
  }
  assert.equal((await netlifyResponse({ sites: [{ name: "main" }] }).observe(deployId)).reason, "netlify_site_unverified");
});

test("Netlify may omit draft on an exact production publication", async () => {
  assert.equal((await netlifyResponse({ deploy: { draft: undefined } }).observe(deployId)).status, "published");
  for (const deploy of [
    { draft: null }, { draft: undefined, context: undefined },
    { draft: undefined, context: "deploy-preview" }, { draft: undefined, published_at: null },
  ]) {
    assert.equal((await netlifyResponse({ deploy }).observe(deployId)).status, "not_confirmed");
  }
});

test("provider discovery finds the narrowly exact marker and blocks stale head updates", async () => {
  const otherSiteState = { published_deploy: { id: "different", title: "newer" } };
  const netlify = netlifyResponse({ sites: [otherSiteState, otherSiteState], rows: [{ site_id: siteId, id: deployId, title }] });
  const proof = await netlify.observe(null);
  assert.equal(proof.status, "published");
  assert.equal(proof.evidence.reconciliation_block, "netlify_deploy_superseded");
  assert.ok(netlify.calls.some((path) => path.includes("/deploys?production=true")));
  const ambiguous = netlifyResponse({ sites: [otherSiteState], rows: [deployId, "another"].map((id) => ({ site_id: siteId, id, title })) });
  assert.equal((await ambiguous.observe(null)).reason, "netlify_deploy_ambiguous");
});

function worker(row = attempt(), options = {}) {
  const env = fixture(row, options.rpc);
  const order = [];
  const dependencies = { database: env.database, netlifyToken: "mock", ...options.overrides,
    async observeNetlify(input) {
      order.push("read_provider");
      if (options.observe) return options.observe(input);
      return await netlifyResponse().observe(input.reportedId);
    },
    async verifyArtifact() { order.push("verify_artifact"); return { ok: true }; },
    async observeCurrentDeploy(input) {
      order.push("read_current_deploy");
      assert.deepEqual(input, { siteId, siteName, token: "mock" });
      return await (options.current ? options.current(input) : netlifyResponse().observeCurrent());
    },
    async syncObservability() { order.push("sync_obs"); return { ok: options.obs !== false }; },
  };
  return { ...env, order, dependencies, run: () => reconcileDeployAttempt(row, dependencies) };
}

test("worker first records verified publication, finalizes once and isolates OBS failure", async () => {
  const env = worker(attempt(), { obs: false });
  assert.deepEqual(await env.run(), { status: "complete", observability: "failed" });
  assert.deepEqual(env.order, ["read_provider", "verify_artifact", "read_current_deploy", "sync_obs"]);
  assert.deepEqual(env.calls.map(({ name }) => name), ["versioning_record_deploy_publication", "versioning_finalize_deploy_attempt",
    "versioning_record_deploy_observability"]);
  assert.ok(env.calls.every(({ args }) => args.p_lease_token === "lease"));
});

test("a change after the artifact check preserves publication evidence and prevents official closure", async () => {
  const netlify = netlifyResponse({ sites: [{ published_deploy: { id: "different", title: "newer" } }] });
  const env = worker(attempt(), { current: netlify.observeCurrent });
  assert.deepEqual(await env.run(), { status: "incomplete", reason: "netlify_deploy_superseded" });
  assert.deepEqual(env.order, ["read_provider", "verify_artifact", "read_current_deploy"]);
  assert.deepEqual(netlify.calls, [`/api/v1/sites/${siteId}`]);
  assert.deepEqual(env.calls.map(({ name }) => name), ["versioning_record_deploy_publication", "versioning_record_deploy_publication"]);
  const [initial, updated] = env.calls.map(({ args }) => args.p_publication);
  assert.equal(initial.netlify_deploy_id, deployId);
  assert.equal(updated.netlify_deploy_id, deployId);
  assert.equal(updated.published_at, initial.published_at);
  assert.equal(updated.netlify_current_deploy_id, "different");
  assert.equal(updated.reconciliation_block, "netlify_deploy_superseded");
});

test("failure to verify the last active deploy defers closure and leaves published evidence in OPS", async () => {
  const netlify = netlifyResponse({ sites: [{ id: requestId }] });
  const env = worker(attempt(), { current: netlify.observeCurrent });
  assert.deepEqual(await env.run(), { status: "deferred", reason: "netlify_current_publication_unverified" });
  assert.deepEqual(env.calls.map(({ name }) => name), ["versioning_record_deploy_publication", "versioning_release_deploy_reconciliation"]);
  assert.equal(env.calls[0].args.p_publication.netlify_deploy_id, deployId);
  assert.equal(env.calls[1].args.p_retry_after_seconds, 30);
});

test("worker never finalizes without verified current publication and retries with bounded backoff", async () => {
  const unconfirmed = worker(attempt({ retry_count: 99 }), { observe: () => ({ status: "not_confirmed", reason: "unverified" }) });
  assert.deepEqual(await unconfirmed.run(), { status: "deferred", reason: "unverified" });
  assert.deepEqual(unconfirmed.calls.map(({ name }) => name), ["versioning_release_deploy_reconciliation"]);
  assert.equal(unconfirmed.calls[0].args.p_retry_after_seconds, 1800);
  const superseded = worker(attempt(), { observe: () => ({ status: "published", reason: "netlify_deploy_superseded",
    evidence: { status: "published", netlify_deploy_id: deployId, reconciliation_block: "netlify_deploy_superseded" } }) });
  assert.equal((await superseded.run()).status, "incomplete");
  assert.deepEqual(superseded.calls.map(({ name }) => name), ["versioning_record_deploy_publication"]);
});

test("worker gives OBS-only recovery a separate path and leases bounded batches", async () => {
  const row = attempt({ reconciliation_status: "complete", publication_status: "published",
    publication: { status: "published", netlify_site_id: siteId, netlify_deploy_id: deployId } });
  const env = worker(row, { rpc: (name) => name === "versioning_claim_deploy_reconciliation" ? { attempts: [row] } : {} });
  const result = await runDeployReconciliation(env.dependencies);
  assert.equal(result.processed, 1);
  assert.deepEqual(env.order, ["sync_obs"]);
  assert.equal(env.calls[0].args.p_limit, 3);
  assert.deepEqual(env.calls.map(({ name }) => name), ["versioning_claim_deploy_reconciliation", "versioning_record_deploy_observability"]);
});

test("GitHub's exact terminal pre-publication run can close an unbound attempt; absence cannot", async () => {
  const row = attempt({ dispatch_state: "unknown", callback_binding: null, publish_authorized: false,
    publication_status: "none", prepared_metadata: null });
  const githubRun = { execution_id: executionId, repository: binding.github_repository, workflow_id: spec.workflow.id,
    workflow_ref: "dev", event: "workflow_dispatch", run_id: "17", run_attempt: 1, status: "completed", conclusion: "cancelled" };
  const env = worker(row, { overrides: { observeGithub: async () => ({ status: "completed", evidence: githubRun }) } });
  assert.deepEqual(await env.run(), { status: "complete", observability: "not_required" });
  assert.deepEqual(env.calls.map(({ name }) => name), ["versioning_record_unpublished_deploy_attempt", "versioning_finalize_deploy_attempt"]);
  assert.deepEqual(env.calls[0].args.p_github_run, githubRun);
  assert.deepEqual(env.order, []);

  const unknown = worker(row, { overrides: { observeGithub: async () => ({ status: "unknown" }) } });
  assert.equal((await unknown.run()).status, "deferred");
  assert.deepEqual(unknown.calls.map(({ name }) => name), ["versioning_release_deploy_reconciliation"]);
});
