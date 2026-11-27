import assert from "node:assert/strict";
import { test } from "node:test";
import { dispatchReservedDeployAttempt } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-dispatch.mjs";

const executionId = "gha-1795661244000-11111111";
const repository = "test/repos";
const spec = {
  workflow: { repository, id: "versioning-deploy-artifact.yml", ref: "staging" },
  dispatch_inputs: { deploy_execution_id: executionId, request_id: "request-from-ops" },
};
const env = { executionId, token: "secret-fixture", repository };
function database({ dispatchSpec = spec, saveFails = false } = {}) {
  let state = "reserved";
  const calls = [];
  return {
    calls,
    async rpc(name, args) {
      calls.push([name, args]);
      if (name === "versioning_begin_deploy_dispatch") {
        if (state !== "reserved") return { data: { ok: true, duplicate: true, attempt: { dispatch_state: state } } };
        state = "dispatching";
        return { data: { ok: true, dispatch_spec: dispatchSpec } };
      }
      assert.equal(name, "versioning_record_deploy_dispatch");
      if (saveFails) return { error: { code: "fixture_failure" } };
      state = args.p_state;
      return { data: { ok: true, attempt: { dispatch_state: state } } };
    },
  };
}

test("only one process may dispatch a reserved OPS attempt", async () => {
  const supabase = database();
  let posts = 0;
  const dispatch = () => dispatchReservedDeployAttempt({
    ...env, supabase,
    fetchImpl: (url, init) => {
      posts++;
      assert.equal(url, "https://api.github.com/repos/test/repos/actions/workflows/versioning-deploy-artifact.yml/dispatches");
      assert.equal(init.redirect, "error");
      assert.equal(init.method, "POST");
      assert.deepEqual(JSON.parse(init.body), { ref: spec.workflow.ref, inputs: spec.dispatch_inputs });
      return new Response(null, { status: 204 });
    },
  });
  const results = await Promise.all([dispatch(), dispatch()]);
  assert.equal(posts, 1);
  assert.equal(results.filter((result) => result.duplicate).length, 1);
  assert.equal(results.find((result) => !result.duplicate).state, "dispatched");
});

test("never repeats a dispatch after timeout or partial loss of the result write", async () => {
  for (const [saveFails, fetchImpl] of [
    [false, () => { throw new Error("transport interrupted"); }],
    [true, () => new Response(null, { status: 204 })],
    [false, () => new Response(null, { status: 503 })],
  ]) {
    const supabase = database({ saveFails });
    let posts = 0;
    const dispatch = () => dispatchReservedDeployAttempt({
      ...env, supabase, fetchImpl: () => { posts++; return fetchImpl(); },
    });
    assert.equal((await dispatch()).state, "unknown");
    assert.equal((await dispatch()).duplicate, true);
    assert.equal(posts, 1);
  }
});

test("definitive GitHub rejections are distinguishable from an unknown dispatch", async () => {
  const result = await dispatchReservedDeployAttempt({
    ...env, supabase: database(), fetchImpl: () => new Response(null, { status: 422 }),
  });
  assert.deepEqual(result, { state: "rejected", accepted: false, httpStatus: 422 });
});

test("a stale or wrong repository never receives a dispatch", async () => {
  const result = await dispatchReservedDeployAttempt({
    ...env, supabase: database({ dispatchSpec: { ...spec, workflow: { ...spec.workflow, repository: "other/repo" } } }),
    fetchImpl: () => assert.fail("Unexpected network call"),
  });
  assert.equal(result.state, "rejected");
});
