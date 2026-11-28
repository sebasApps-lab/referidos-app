const REPOSITORY = /^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;
const WORKFLOW = /^(?:[1-9]\d*|[A-Za-z0-9_-][A-Za-z0-9_.-]*\.ya?ml)$/;
const REJECTED = new Set([400, 401, 403, 404, 405, 422]);

export async function dispatchReservedDeployAttempt({ supabase, executionId, token, repository, fetchImpl = fetch }) {
  if (typeof token !== "string" || !token.trim() || typeof repository !== "string" || !REPOSITORY.test(repository)) {
    throw new Error("github_dispatch_configuration_invalid");
  }

  const begin = await supabase.rpc("versioning_begin_deploy_dispatch", { p_execution_id: executionId });
  if (begin.error || begin.data?.ok !== true) throw new Error("deploy_dispatch_claim_failed");
  if (begin.data.duplicate === true) return { state: begin.data.attempt?.dispatch_state, duplicate: true };

  const spec = begin.data.dispatch_spec;
  const workflow = spec?.workflow;
  const inputs = spec?.dispatch_inputs;
  let state = "rejected";
  let httpStatus = null;
  if (workflow?.repository?.toLowerCase() === repository.toLowerCase() && WORKFLOW.test(workflow.id ?? "") &&
      typeof workflow.ref === "string" && workflow.ref && inputs?.deploy_execution_id === executionId) {
    // An ambiguous response may hide an accepted dispatch. Only the GET reconciler may resolve it.
    state = "unknown";
    try {
      const response = await fetchImpl(
        "https://api.github.com/repos/" + repository + "/actions/workflows/" + encodeURIComponent(workflow.id) + "/dispatches",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
            "User-Agent": "referidos-versioning-edge",
          },
          redirect: "error",
          signal: AbortSignal.timeout(15_000),
          body: JSON.stringify({ ref: workflow.ref, inputs }),
        },
      );
      httpStatus = response.status;
      if (response.ok) state = "dispatched";
      else if (REJECTED.has(httpStatus)) state = "rejected";
    } catch {
      // The claim remains recoverable even if no HTTP response arrived.
    }
  }

  const result = await supabase.rpc("versioning_record_deploy_dispatch", {
    p_execution_id: executionId,
    p_state: state,
    p_metadata: { http_status: httpStatus },
  });
  if (result.error || result.data?.ok !== true) return { state: "unknown", accepted: false, httpStatus };
  return { state: result.data.attempt?.dispatch_state ?? state, accepted: state === "dispatched", httpStatus };
}
