import assert from "node:assert/strict";
import { test } from "node:test";
import { readExactDeployWorkflow } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-github-proof.mjs";

const repository = "test/repo";
const execution_id = "gha-1795661244000-11111111";
const time = "2026-11-26T16:00:00Z";
const attempt = { execution_id, created_at: time, dispatch_spec: {
  workflow: { repository, ref: "fix/example", id: "versioning-deploy-artifact.yml" },
} };
const run = { id: 918, display_title: "OPS " + execution_id, event: "workflow_dispatch", head_branch: "fix/example",
  path: ".github/workflows/versioning-deploy-artifact.yml", repository: { full_name: repository }, run_attempt: 1,
  status: "completed", conclusion: "failure", created_at: time };
const api = (fetchImpl) => ({ repository, token: "fixture", fetchImpl });
const list = (...rows) => Response.json({ total_count: rows.length, workflow_runs: rows });

test("recovers a uniquely correlated completed run using only GET", async () => {
  const result = await readExactDeployWorkflow(attempt, api((url, init) => {
    assert.equal(init.method, "GET");
    assert.equal(init.redirect, "error");
    assert.equal(new URL(url).searchParams.get("branch"), "fix/example");
    return list(run, { ...run, id: 917, display_title: "Unrelated deploy" });
  }));
  assert.equal(result.status, "completed");
  assert.equal(result.evidence.run_id, "918");
  assert.equal(result.evidence.workflow_ref, "fix/example");
});

test("reads a bound ID directly and keeps a nonterminal workflow pending", async () => {
  const result = await readExactDeployWorkflow({ ...attempt, callback_binding: { github_run_id: "918" } }, api((url) => {
    assert.equal(url, "https://api.github.com/repos/test/repo/actions/runs/918");
    return Response.json({ ...run, status: "in_progress", conclusion: null });
  }));
  assert.deepEqual(result, { status: "running", runId: "918" });
});

test("missing, ambiguous, truncated, and rerun results never prove a completed attempt", async () => {
  for (const [response, reason] of [
    [list(), "github_run_not_observed"],
    [list(run, { ...run, id: 920 }), "github_run_ambiguous"],
    [Response.json({ total_count: 101, workflow_runs: [run] }), "github_run_inventory_incomplete"],
    [list({ ...run, run_attempt: 2 }), "github_run_not_observed"],
    [list({ ...run, repository: { full_name: "other/repo" } }), "github_run_not_observed"],
    [new Response(null, { status: 503 }), "github_run_lookup_unavailable"],
  ]) {
    assert.deepEqual(await readExactDeployWorkflow(attempt, api(() => response)), { status: "unknown", reason });
  }
});
