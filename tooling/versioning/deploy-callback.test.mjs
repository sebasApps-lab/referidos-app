import assert from "node:assert/strict";
import { test } from "node:test";
import { deployCallbackPayload, postDeployCallback, resolveDeployCallbackUrl } from "./deploy-callback.mjs";

const OPS_URL = "https://ops.example.test";
const ENDPOINT = `${OPS_URL}/functions/v1/versioning-deploy-callback`;
const TOKEN = "callback-test-token";

test("keeps release and artifact identity bound across callback phases", () => {
  const env = {
    REQUEST_ID: "request", DEPLOY_EXECUTION_ID: "gha-100-request1", RELEASE_ID_RAW: "promoted-release",
    ARTIFACT_ID_RAW: "original-artifact", ARTIFACT_SHA256_RAW: "checksum", GITHUB_RUN_ID: "123",
    WORKFLOW_OUTCOME: "failure",
  };
  const started = deployCallbackPayload(env, { start: true });
  const confirmed = deployCallbackPayload(env, { deployInvoked: true, deploymentId: "netlify-deploy" });
  assert.equal(started.status, "started");
  assert.equal(started.deployment_id, env.DEPLOY_EXECUTION_ID);
  assert.equal(confirmed.status, "success");
  assert.equal(confirmed.publication_status, "published");
  assert.equal(confirmed.deployment_id, "netlify-deploy");
  assert.equal(confirmed.deploy_execution_id, started.deploy_execution_id);
  assert.equal(confirmed.metadata.workflow_outcome, "failure");
  assert.equal(confirmed.metadata.artifact_id, started.metadata.artifact_id);
  assert.equal(confirmed.metadata.release_id, started.metadata.release_id);
});

test("reports an uncertain Netlify attempt separately from an error before invoking it", () => {
  const env = { DEPLOY_EXECUTION_ID: "gha-100-request1", WORKFLOW_OUTCOME: "failure" };
  const beforeDeploy = deployCallbackPayload(env);
  const ambiguous = deployCallbackPayload(env, { deployInvoked: true });
  assert.equal(beforeDeploy.publication_status, "not_published");
  assert.equal(ambiguous.publication_status, "not_confirmed");
  assert.equal(ambiguous.deployment_id, env.DEPLOY_EXECUTION_ID);
  assert.equal(ambiguous.status, "failed");
});

test("derives the fixed callback endpoint from the configured OPS origin", () => {
  assert.equal(resolveDeployCallbackUrl(`${OPS_URL}/`), ENDPOINT);
  assert.equal(resolveDeployCallbackUrl(OPS_URL, ENDPOINT), ENDPOINT);
});

test("rejects missing, insecure, and non-origin OPS configuration", () => {
  const invalidOrigins = [
    undefined,
    "http://ops.example.test",
    "https://user@ops.example.test",
    `${OPS_URL}/dashboard`,
    `${OPS_URL}?mode=test`,
    `${OPS_URL}#section`,
  ];
  for (const origin of invalidOrigins) {
    assert.throws(() => resolveDeployCallbackUrl(origin), /requires a valid OPS HTTPS origin/);
  }
});

test("the legacy input must match the complete endpoint before any network call", async () => {
  const invalidDestinations = [
    "",
    ENDPOINT.replace("ops.example.test", "other.example.test"),
    ENDPOINT.replace("https:", "http:"),
    `${OPS_URL}/functions/v1/other`,
    `${ENDPOINT}/`,
    `${ENDPOINT}?mode=test`,
    `${ENDPOINT}#section`,
  ];
  for (const requestedUrl of invalidDestinations) {
    await assert.rejects(
      postDeployCallback({
        opsUrl: OPS_URL,
        requestedUrl,
        token: TOKEN,
        fetchImpl: () => assert.fail("Unexpected HTTP request"),
      }),
      /does not match the configured OPS endpoint/
    );
  }
});

test("requires the callback token before attempting the request", async () => {
  await assert.rejects(
    postDeployCallback({
      opsUrl: OPS_URL,
      requestedUrl: ENDPOINT,
      token: " ",
      fetchImpl: () => assert.fail("Unexpected HTTP request"),
    }),
    /Missing VERSIONING_DEPLOY_CALLBACK_TOKEN/
  );
});

test("sends callback states to the fixed endpoint with redirects disabled", async () => {
  const calls = [];
  const fetchImpl = (url, options) => {
    assert.equal(url, ENDPOINT);
    assert.equal(options.method, "POST");
    assert.equal(options.headers["x-versioning-callback-token"], TOKEN);
    assert.equal(options.headers["Content-Type"], "application/json");
    assert.equal(options.redirect, "error");
    assert.ok(options.signal instanceof AbortSignal);
    calls.push(JSON.parse(options.body));
    return Response.json({ ok: true });
  };
  const payloads = ["started", "success", "failed"].map((status) => ({
    request_id: "test-request",
    metadata: { source: "test" },
    status,
  }));

  for (const payload of payloads) {
    await postDeployCallback({ opsUrl: OPS_URL, requestedUrl: ENDPOINT, token: TOKEN, payload, fetchImpl });
  }
  assert.deepEqual(calls, payloads);
});

test("reports transport failures without exposing the request details", async () => {
  await assert.rejects(
    postDeployCallback({
      opsUrl: OPS_URL,
      requestedUrl: ENDPOINT,
      token: TOKEN,
      fetchImpl: () => { throw new Error(`${ENDPOINT} ${TOKEN}`); },
    }),
    { message: "Deploy callback request failed before receiving an HTTP response." }
  );
});

test("reports the HTTP status and omits the remote error body", async () => {
  await assert.rejects(
    postDeployCallback({
      opsUrl: OPS_URL,
      requestedUrl: ENDPOINT,
      token: TOKEN,
      fetchImpl: () => Response.json({ ok: false, detail: TOKEN }, { status: 403 }),
    }),
    { message: "Deploy callback failed with HTTP 403." }
  );
});

test("requires an explicit JSON confirmation from OPS", async () => {
  const responses = [Response.json({ ok: false }), new Response("non-JSON response")];
  for (const response of responses) {
    await assert.rejects(
      postDeployCallback({ opsUrl: OPS_URL, token: TOKEN, fetchImpl: () => response }),
      { message: "Deploy callback response did not confirm the update." }
    );
  }
});
