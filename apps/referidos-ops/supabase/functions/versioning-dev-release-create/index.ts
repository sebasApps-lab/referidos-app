import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { getGithubAuthConfig } from "../_shared/github-auth.ts";

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function isValidProductKey(value: string) {
  return ["referidos_app", "prelaunch_web", "android_app"].includes(value);
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get("x-versioning-proxy-token"));
  return Boolean(received) && received === expected;
}

async function fetchGithubJson(
  url: string,
  tokenGithub: string
): Promise<{ ok: boolean; status: number; data: Record<string, unknown>; detail: string }> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenGithub}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
  });

  const raw = await response.text();
  let parsed: Record<string, unknown> = {};
  try {
    parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    parsed = { raw };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      data: parsed,
      detail: asString(parsed.message, asString(parsed.raw, "github_request_failed")),
    };
  }

  return {
    ok: true,
    status: response.status,
    data: parsed,
    detail: "ok",
  };
}

function normalizeWorkflowState({
  status,
  conclusion,
}: {
  status: string;
  conclusion: string;
}): "success" | "running" | "error" | "pending" {
  const normalizedStatus = asString(status).toLowerCase();
  const normalizedConclusion = asString(conclusion).toLowerCase();

  if (normalizedConclusion === "success" || normalizedConclusion === "neutral" || normalizedConclusion === "skipped") {
    return "success";
  }
  if (
    ["failure", "cancelled", "timed_out", "action_required", "startup_failure", "stale"].includes(
      normalizedConclusion
    )
  ) {
    return "error";
  }
  if (normalizedStatus === "completed" && !normalizedConclusion) {
    return "success";
  }
  if (["in_progress", "queued", "waiting", "requested", "pending"].includes(normalizedStatus)) {
    return "running";
  }
  return "pending";
}

async function resolveWorkflowRunAndJobs({
  owner,
  repo,
  workflowId,
  tokenGithub,
  ref,
  runId,
  dispatchStartedAt,
}: {
  owner: string;
  repo: string;
  workflowId: string;
  tokenGithub: string;
  ref: string;
  runId: number;
  dispatchStartedAt: string;
}) {
  let runData: Record<string, unknown> | null = null;

  if (runId > 0) {
    const runResponse = await fetchGithubJson(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
      tokenGithub
    );
    if (runResponse.ok) {
      runData = runResponse.data;
    } else {
      return {
        ok: false,
        error: "github_get_run_failed",
        detail: runResponse.detail,
        status: runResponse.status,
      };
    }
  } else {
    const listResponse = await fetchGithubJson(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?event=workflow_dispatch&branch=${encodeURIComponent(
        ref
      )}&per_page=25`,
      tokenGithub
    );
    if (!listResponse.ok) {
      return {
        ok: false,
        error: "github_list_runs_failed",
        detail: listResponse.detail,
        status: listResponse.status,
      };
    }

    const workflowRuns = Array.isArray(listResponse.data.workflow_runs)
      ? (listResponse.data.workflow_runs as Record<string, unknown>[])
      : [];
    const dispatchMs = Date.parse(dispatchStartedAt || "");
    const dispatchThresholdMs = Number.isFinite(dispatchMs) ? dispatchMs - 120000 : 0;

    const candidateRun = workflowRuns.find((run) => {
      const runBranch = asString(run.head_branch).toLowerCase();
      if (runBranch && runBranch !== ref.toLowerCase()) return false;
      if (!dispatchThresholdMs) return true;
      const createdMs = Date.parse(asString(run.created_at));
      if (!Number.isFinite(createdMs)) return false;
      return createdMs >= dispatchThresholdMs;
    });

    runData = candidateRun || null;
  }

  if (!runData) {
    return {
      ok: true,
      run: null,
      jobs: [],
      summary: {
        total: 0,
        success: 0,
        error: 0,
        running: 0,
        pending: 0,
      },
      detail: "run_not_found_yet",
    };
  }

  const resolvedRunId = asNumber(runData.id, 0);
  if (!resolvedRunId) {
    return {
      ok: false,
      error: "invalid_run_id",
      detail: "No se pudo resolver run id del workflow.",
      status: 500,
    };
  }

  const jobsResponse = await fetchGithubJson(
    `https://api.github.com/repos/${owner}/${repo}/actions/runs/${resolvedRunId}/jobs?per_page=100`,
    tokenGithub
  );
  if (!jobsResponse.ok) {
    return {
      ok: false,
      error: "github_get_jobs_failed",
      detail: jobsResponse.detail,
      status: jobsResponse.status,
    };
  }

  const jobsRaw = Array.isArray(jobsResponse.data.jobs)
    ? (jobsResponse.data.jobs as Record<string, unknown>[])
    : [];

  const jobs = jobsRaw.map((job) => {
    const jobStatus = asString(job.status);
    const jobConclusion = asString(job.conclusion);
    const stepsRaw = Array.isArray(job.steps) ? (job.steps as Record<string, unknown>[]) : [];
    const steps = stepsRaw.map((step) => {
      const stepStatus = asString(step.status);
      const stepConclusion = asString(step.conclusion);
      return {
        number: asNumber(step.number, 0),
        name: asString(step.name, "-"),
        status: stepStatus,
        conclusion: stepConclusion || null,
        state: normalizeWorkflowState({
          status: stepStatus,
          conclusion: stepConclusion,
        }),
        started_at: asString(step.started_at) || null,
        completed_at: asString(step.completed_at) || null,
      };
    });
    return {
      id: asNumber(job.id, 0),
      name: asString(job.name, "-"),
      status: jobStatus,
      conclusion: jobConclusion || null,
      state: normalizeWorkflowState({
        status: jobStatus,
        conclusion: jobConclusion,
      }),
      started_at: asString(job.started_at) || null,
      completed_at: asString(job.completed_at) || null,
      html_url: asString(job.html_url) || null,
      steps,
    };
  });

  const summary = jobs.reduce(
    (acc, job) => {
      acc.total += 1;
      if (job.state === "success") acc.success += 1;
      if (job.state === "error") acc.error += 1;
      if (job.state === "running") acc.running += 1;
      if (job.state === "pending") acc.pending += 1;
      return acc;
    },
    { total: 0, success: 0, error: 0, running: 0, pending: 0 }
  );

  const runStatus = asString(runData.status);
  const runConclusion = asString(runData.conclusion);
  const run = {
    id: resolvedRunId,
    name: asString(runData.name) || asString(runData.display_title) || workflowId,
    status: runStatus,
    conclusion: runConclusion || null,
    state: normalizeWorkflowState({
      status: runStatus,
      conclusion: runConclusion,
    }),
    html_url: asString(runData.html_url) || null,
    run_number: asNumber(runData.run_number, 0),
    event: asString(runData.event),
    head_branch: asString(runData.head_branch),
    head_sha: asString(runData.head_sha),
    created_at: asString(runData.created_at) || null,
    updated_at: asString(runData.updated_at) || null,
  };

  return {
    ok: true,
    run,
    jobs,
    summary,
    detail: "ok",
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const body = await req.json().catch(() => ({}));
  const internalProxyCall = isInternalProxyAuthorized(req);

  let actor = "admin:proxy";
  let tenantIdFromUser = "";
  if (!internalProxyCall) {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);
    }

    const { user, error: authErr } = await requireAuthUser(token);
    if (authErr || !user) {
      return jsonResponse({ ok: false, error: "unauthorized" }, 401, cors);
    }

    const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
    if (profileErr || !usuario) {
      return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
    }
    if (usuario.role !== "admin") {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }

    actor = `admin:${asString(usuario.id) || asString(user.id)}`;
    tenantIdFromUser = asString(usuario?.tenant_id);
  } else {
    actor = asString(body.actor, "admin:proxy");
    tenantIdFromUser = asString(body.tenant_id);
  }

  const requestedProductKey = asString(body.product_key).toLowerCase();
  const requestedRef = asString(body.ref);
  const overrideSemver = asString(body.override_semver);
  const releaseNotes = asString(body.release_notes);
  const operation = asString(body.operation, "dispatch").toLowerCase();
  const mode = asString(body.mode, "release").toLowerCase();
  const releaseId = asString(body.release_id || body.releaseId);
  const requestedSourceCommitSha = asString(body.source_commit_sha || body.sourceCommitSha);

  if (requestedProductKey && !isValidProductKey(requestedProductKey)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_product_key",
        detail: "Valores permitidos: referidos_app | prelaunch_web | android_app",
      },
      400,
        cors
    );
  }
  if (!["release", "backfill_artifact"].includes(mode)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_mode",
        detail: "mode permitido: release | backfill_artifact",
      },
      400,
      cors
    );
  }
  if (!["dispatch", "status"].includes(operation)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_operation",
        detail: "operation permitido: dispatch | status",
      },
      400,
      cors
    );
  }

  const githubAuth = await getGithubAuthConfig();
  if (!githubAuth.ok) {
    return jsonResponse(
      {
        ok: false,
        error: githubAuth.data.error,
        detail: githubAuth.data.detail,
      },
      500,
      cors
    );
  }
  const owner = githubAuth.data.owner;
  const repo = githubAuth.data.repo;
  const tokenGithub = githubAuth.data.token;
  const workflowId = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_WORKFLOW"),
    "versioning-release-dev.yml"
  );
  const defaultDevRef = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_REF"),
    asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev")
  );

  const allowRefsRaw = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_ALLOWED_REFS"),
    `${defaultDevRef},develop`
  );
  const allowRefs = new Set(
    allowRefsRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );
  const ref = requestedRef || defaultDevRef;

  if (operation === "status") {
    const runId = asNumber(body.run_id, 0);
    const dispatchStartedAt = asString(body.dispatch_started_at || body.started_at);
    const resolved = await resolveWorkflowRunAndJobs({
      owner,
      repo,
      workflowId,
      tokenGithub,
      ref,
      runId,
      dispatchStartedAt,
    });

    if (!resolved.ok) {
      return jsonResponse(
        {
          ok: false,
          error: resolved.error || "workflow_status_failed",
          detail: resolved.detail || "No se pudo consultar estado del workflow.",
          status: resolved.status || 500,
        },
        502,
        cors
      );
    }

    return jsonResponse(
      {
        ok: true,
        operation: "status",
        mode,
        workflow: workflowId,
        ref,
        run: resolved.run,
        jobs: resolved.jobs,
        summary: resolved.summary,
        detail: resolved.detail,
      },
      200,
      cors
    );
  }

  let productKey = requestedProductKey;
  let releaseBaseRef = "";
  let workflowRef = ref;
  let sourceCommitSha = requestedSourceCommitSha;
  const trimmedReleaseId = asString(releaseId);

  if (mode === "release") {
    if (!allowRefs.has(workflowRef)) {
      return jsonResponse(
        {
          ok: false,
          error: "invalid_ref",
          detail: `Ref no permitida. permitidas=${Array.from(allowRefs).join(", ")}`,
        },
        400,
        cors
      );
    }

    if (productKey) {
      const { data: latestRows, error: latestError } = await supabaseAdmin
        .from("version_releases_labeled")
        .select("source_commit_sha")
        .eq("product_key", productKey)
        .eq("env_key", "dev")
        .order("semver_major", { ascending: false })
        .order("semver_minor", { ascending: false })
        .order("semver_patch", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(1);
      if (latestError) {
        return jsonResponse(
          {
            ok: false,
            error: "load_latest_release_failed",
            detail: latestError.message,
          },
          500,
          cors
        );
      }
      releaseBaseRef = asString(latestRows?.[0]?.source_commit_sha);
    }
  } else {
    if (!trimmedReleaseId) {
      return jsonResponse(
        {
          ok: false,
          error: "missing_release_id",
          detail: "release_id es requerido para mode=backfill_artifact",
        },
        400,
        cors
      );
    }

    const { data: releaseRow, error: releaseError } = await supabaseAdmin
      .from("version_releases_labeled")
      .select("id, tenant_id, product_key, env_key, version_label, source_commit_sha")
      .eq("id", trimmedReleaseId)
      .limit(1)
      .maybeSingle();

    if (releaseError || !releaseRow?.id) {
      return jsonResponse(
        {
          ok: false,
          error: "release_not_found",
          detail: releaseError?.message || "No se encontro release para backfill.",
        },
        404,
        cors
      );
    }

    if (tenantIdFromUser && asString(releaseRow.tenant_id) && asString(releaseRow.tenant_id) !== tenantIdFromUser) {
      return jsonResponse(
        {
          ok: false,
          error: "release_tenant_mismatch",
          detail: "La release no pertenece al tenant actual.",
        },
        403,
        cors
      );
    }

    if (productKey && productKey !== asString(releaseRow.product_key).toLowerCase()) {
      return jsonResponse(
        {
          ok: false,
          error: "product_release_mismatch",
          detail: "release_id no coincide con product_key.",
        },
        400,
        cors
      );
    }

    productKey = asString(releaseRow.product_key).toLowerCase();
    sourceCommitSha = asString(releaseRow.source_commit_sha);
    workflowRef = defaultDevRef;
    releaseBaseRef = "";
  }

  const payload = {
    ref: workflowRef,
    inputs: {
      mode,
      release_id: mode === "backfill_artifact" ? trimmedReleaseId : "",
      source_commit_sha: mode === "backfill_artifact" ? sourceCommitSha || "" : "",
      base_ref: releaseBaseRef || "",
      product_filter: productKey || "",
      override_semver: overrideSemver || "",
      release_notes: releaseNotes || "",
    },
  };

  const dispatchResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenGithub}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!dispatchResponse.ok) {
    const raw = await dispatchResponse.text();
    let parsed: Record<string, unknown> = {};
    try {
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      parsed = { raw };
    }
    return jsonResponse(
      {
        ok: false,
        error: "github_workflow_dispatch_failed",
        status: dispatchResponse.status,
        detail: parsed.message || parsed.raw || "dispatch_failed",
      },
      502,
      cors
    );
  }

  let tenantId: string | null = tenantIdFromUser || null;
  if (!tenantId) {
    const { data: tenantRow } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    tenantId = tenantRow?.id || null;
  }

  if (tenantId) {
    await supabaseAdmin.from("version_audit_log").insert({
      tenant_id: tenantId,
      actor,
      action: "dispatch_dev_release",
      entity_type: "workflow",
      entity_id: workflowId,
      payload: {
        ref: workflowRef,
        base_ref: releaseBaseRef || null,
        product_key: productKey || null,
        mode,
        release_id: mode === "backfill_artifact" ? trimmedReleaseId : null,
        source_commit_sha: mode === "backfill_artifact" ? sourceCommitSha || null : null,
        override_semver: overrideSemver || null,
        release_notes: releaseNotes || null,
      },
    });
  }

  return jsonResponse(
    {
      ok: true,
      operation: "dispatch",
      mode,
      workflow: workflowId,
      ref: workflowRef,
      base_ref: releaseBaseRef || null,
      product_key: productKey || null,
      release_id: mode === "backfill_artifact" ? trimmedReleaseId : null,
      source_commit_sha: mode === "backfill_artifact" ? sourceCommitSha || null : null,
      override_semver: overrideSemver || null,
      dispatch_started_at: new Date().toISOString(),
      detail: "Workflow de release dev disparado correctamente.",
    },
    200,
    cors
  );
});
