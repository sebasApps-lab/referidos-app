const TERMINAL = new Set(["success", "failure", "cancelled", "skipped", "timed_out", "action_required",
  "neutral", "stale", "startup_failure"]);
const WORKFLOW = /^(?:[1-9]\d*|[A-Za-z0-9_-][A-Za-z0-9_.-]*\.ya?ml)$/;
const EXECUTION = /^gha-[0-9]+-[a-f0-9]{8}$/;
const REPOSITORY = /^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;

export async function readExactDeployWorkflow(attempt, { repository, token, fetchImpl = fetch }) {
  const workflow = attempt.dispatch_spec?.workflow;
  const ref = typeof workflow?.ref === "string" ? workflow.ref.replace(/^refs\/(heads|tags)\//, "") : "";
  const id = attempt.execution_id;
  const boundRunId = attempt.callback_binding?.github_run_id ?? null;
  if (!REPOSITORY.test(repository ?? "") || typeof workflow?.repository !== "string" ||
      workflow.repository.toLowerCase() !== repository.toLowerCase() ||
      !WORKFLOW.test(workflow.id ?? "") || !ref || !EXECUTION.test(id ?? "") || !token ||
      (boundRunId != null && !/^[1-9]\d*$/.test(boundRunId))) {
    return { status: "unknown", reason: "github_run_target_unverified" };
  }

  const root = "https://api.github.com/repos/" + repository + "/actions/";
  const createdAt = Date.parse(attempt.created_at);
  if (!Number.isFinite(createdAt)) return { status: "unknown", reason: "github_run_target_unverified" };
  const query = new URLSearchParams({
    event: "workflow_dispatch", branch: ref, per_page: "100",
    created: ">=" + new Date(createdAt - 120_000).toISOString(),
  });
  const target = boundRunId != null
    ? root + "runs/" + boundRunId
    : root + "workflows/" + encodeURIComponent(workflow.id) + "/runs?" + query;
  let data;
  try {
    const response = await fetchImpl(target, {
      method: "GET",
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "User-Agent": "referidos-versioning-edge" },
      redirect: "error", signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return { status: "unknown", reason: "github_run_lookup_unavailable" };
    data = await response.json();
  } catch {
    return { status: "unknown", reason: "github_run_lookup_unavailable" };
  }

  const matches = (run) => {
    const fileMatches = /^\d+$/.test(workflow.id) ? String(run?.workflow_id) === workflow.id
      : run?.path?.split("@")[0] === ".github/workflows/" + workflow.id;
    return /^[1-9]\d*$/.test(String(run?.id)) && (boundRunId == null || String(run.id) === boundRunId) &&
      run.display_title === "OPS " + id && run.event === "workflow_dispatch" &&
      run.head_branch === ref && run.repository?.full_name?.toLowerCase() === repository.toLowerCase() &&
      fileMatches && run.run_attempt === 1 && Date.parse(run.created_at) >= createdAt - 120_000;
  };
  if (boundRunId == null && (!Array.isArray(data?.workflow_runs) || data.total_count !== data.workflow_runs.length)) {
    return { status: "unknown", reason: "github_run_inventory_incomplete" };
  }
  const candidates = (boundRunId == null ? data.workflow_runs : [data]).filter(matches);
  if (candidates.length !== 1) {
    return { status: "unknown", reason: candidates.length ? "github_run_ambiguous" : "github_run_not_observed" };
  }
  const run = candidates[0];
  if (run.status !== "completed" || !TERMINAL.has(run.conclusion)) {
    return { status: "running", runId: String(run.id) };
  }
  return { status: "completed", runId: String(run.id), conclusion: run.conclusion, evidence: {
    execution_id: id, run_id: String(run.id), run_attempt: 1, repository: repository.toLowerCase(),
    workflow_id: workflow.id, workflow_ref: workflow.ref, status: "completed", event: "workflow_dispatch",
    conclusion: run.conclusion,
  } };
}
