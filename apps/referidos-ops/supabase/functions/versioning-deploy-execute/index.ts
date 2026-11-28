import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  resolveUsuarioProfileFailure,
  supabaseAdmin,
} from "../_shared/support.ts";
import { getGithubAuthConfig } from "../_shared/github-auth.ts";
import { resolveDeployCallbackUrl } from "../_shared/deploy-callback-url.mjs";
import { readDeployReconciliation } from "../_shared/deploy-attempt.mjs";
import { dispatchReservedDeployAttempt } from "../_shared/deploy-dispatch.mjs";

type JsonObject = Record<string, unknown>;

type DeployRequestRow = {
  id: string;
  tenant_id: string;
  release_id: string;
  product_key: string;
  env_key: string;
  version_label: string;
  status: string;
  requested_by: string | null;
  admin_override: boolean | null;
  deployment_id?: string | null;
  deployment_status?: string | null;
  logs_url?: string | null;
  metadata?: JsonObject | null;
};

type BranchCheckResult = {
  ok: boolean;
  inBranch: boolean;
  statusCode: number;
  statusText: string;
  mergeBaseSha: string;
  detail: string;
  payload?: Record<string, unknown>;
};

type MigrationGateResult = {
  ok: boolean;
  status: number;
  error: string;
  detail: string;
  payload: Record<string, unknown>;
};

const INTERNAL_PROXY_HEADER = "x-versioning-proxy-token";
const NETLIFY_TARGETS = {
  referidos_app: { staging: "referidosapp-staging", prod: "referidosapp" },
  prelaunch_web: { staging: "testing-goplip", prod: "join-goplip" },
} as const;
const UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get(INTERNAL_PROXY_HEADER));
  return Boolean(received) && received === expected;
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function resolveOpsBaseUrl() {
  return asString(Deno.env.get("SUPABASE_URL") ?? Deno.env.get("URL"));
}

function resolveBranchForEnv({
  productKey,
  envKey,
  kind,
}: {
  productKey: string;
  envKey: string;
  kind: "source" | "target";
}) {
  const productToken = envVarKey(productKey);
  const envToken = envVarKey(envKey);
  const specific = asString(Deno.env.get(`DEPLOY_${kind.toUpperCase()}_BRANCH_${productToken}_${envToken}`));
  if (specific) return specific;

  const devBranch = Deno.env.get("DEPLOY_BRANCH_DEV")?.trim() || "dev";
  const stagingBranch = Deno.env.get("DEPLOY_BRANCH_STAGING")?.trim() || "staging";
  const prodBranch = Deno.env.get("DEPLOY_BRANCH_PROD")?.trim() || "main";

  if (envKey === "prod") return prodBranch;
  if (envKey === "staging") return stagingBranch;
  return devBranch;
}

function resolveBranches({
  productKey,
  targetEnvKey,
  sourceEnvKey,
  sourceBranchInput,
  targetBranchInput,
}: {
  productKey: string;
  targetEnvKey: string;
  sourceEnvKey: string;
  sourceBranchInput: string;
  targetBranchInput: string;
}) {
  const targetBranch =
    targetBranchInput ||
    resolveBranchForEnv({
      productKey,
      envKey: targetEnvKey,
      kind: "target",
    });

  const fallbackSourceEnv = targetEnvKey === "prod" ? "staging" : "dev";
  const sourceEnv = sourceEnvKey || fallbackSourceEnv;
  const sourceBranch =
    sourceBranchInput ||
    resolveBranchForEnv({
      productKey,
      envKey: sourceEnv,
      kind: "source",
    });

  return { sourceBranch, targetBranch };
}

function getNestedString(input: Record<string, unknown>, path: string[]): string {
  let current: unknown = input;
  for (const key of path) {
    if (!current || typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[key];
  }
  return asString(current);
}

function asNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

async function readOperationalState(request: DeployRequestRow) {
  const legacy = readDeployReconciliation(request.metadata, request.deployment_id);
  if (request.metadata?.deploy_attempt_protocol !== "durable_v1") {
    return { ...legacy, official_close: { status: "unverified" }, rollback_reference: null };
  }

  const { data: attempt, error } = await supabaseAdmin.from("version_deploy_attempts")
    .select("execution_id, release_id, source_commit_sha, netlify_site_id, dispatch_state, callback_binding, publish_authorized, publication, reconciliation_status, reconciliation_reason, observability_status, retry_count, next_check_at, closed_at")
    .eq("request_id", request.id).eq("execution_id", request.deployment_id).maybeSingle();
  if (error || !attempt) throw new Error("deploy_reconciliation_lookup_failed");

  const official = Boolean(attempt.closed_at) && attempt.reconciliation_status === "complete";
  const publication = attempt.publication;
  const binding = attempt.callback_binding;
  const rollbackReference = official && publication?.status === "published" && publication.netlify_deploy_id
    ? {
      execution_id: attempt.execution_id,
      release_id: attempt.release_id,
      source_commit_sha: attempt.source_commit_sha,
      artifact_id: binding?.artifact_id ?? null,
      netlify_site_id: attempt.netlify_site_id,
      netlify_deploy_id: publication.netlify_deploy_id,
    }
    : null;
  return {
    publication,
    reconciliation: {
      status: official ? "complete" : attempt.reconciliation_status === "complete" ? "incomplete" : attempt.reconciliation_status,
      reason: attempt.reconciliation_reason,
      deploy_execution_id: attempt.execution_id,
      github_run_id: binding?.github_run_id ?? null,
      github_run_attempt: binding?.github_run_attempt ?? null,
    },
    official_close: { status: official ? "complete" : "pending", closed_at: attempt.closed_at },
    dispatch_state: attempt.dispatch_state,
    publish_authorized: attempt.publish_authorized,
    observability: { status: attempt.observability_status },
    retry: { count: attempt.retry_count, next_check_at: attempt.next_check_at },
    rollback_reference: rollbackReference,
  };
}

async function fetchGithubJson(
  url: string,
  token: string
): Promise<{ ok: boolean; status: number; data: JsonObject; detail: string }> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
  });

  const raw = await response.text();
  let parsed: JsonObject = {};
  try {
    parsed = raw ? (JSON.parse(raw) as JsonObject) : {};
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

  if (["success", "neutral", "skipped"].includes(normalizedConclusion)) {
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
  token,
  ref,
  runId,
  dispatchStartedAt,
}: {
  owner: string;
  repo: string;
  workflowId: string;
  token: string;
  ref: string;
  runId: number;
  dispatchStartedAt: string;
}) {
  let runData: JsonObject | null = null;

  if (runId > 0) {
    const runResponse = await fetchGithubJson(
      `https://api.github.com/repos/${owner}/${repo}/actions/runs/${runId}`,
      token
    );
    if (!runResponse.ok) {
      return {
        ok: false,
        error: "github_get_run_failed",
        detail: runResponse.detail,
        status: runResponse.status,
      };
    }
    runData = runResponse.data;
  } else {
    const listResponse = await fetchGithubJson(
      `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?event=workflow_dispatch&branch=${encodeURIComponent(
        ref
      )}&per_page=30`,
      token
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
      ? (listResponse.data.workflow_runs as JsonObject[])
      : [];
    const dispatchMs = Date.parse(dispatchStartedAt || "");
    const dispatchThresholdMs = Number.isFinite(dispatchMs) ? dispatchMs - 120000 : 0;

    const candidates = workflowRuns.filter((run) => {
      const runBranch = asString(run.head_branch).toLowerCase();
      if (runBranch && runBranch !== ref.toLowerCase()) return false;
      if (!dispatchThresholdMs) return true;
      const createdMs = Date.parse(asString(run.created_at));
      return Number.isFinite(createdMs) && createdMs >= dispatchThresholdMs;
    });

    runData = candidates[0] || null;
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
    token
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
    ? (jobsResponse.data.jobs as JsonObject[])
    : [];

  const jobs = jobsRaw.map((job) => {
    const jobStatus = asString(job.status);
    const jobConclusion = asString(job.conclusion);
    const stepsRaw = Array.isArray(job.steps) ? (job.steps as JsonObject[]) : [];
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

async function checkCommitInBranch({
  owner,
  repo,
  token,
  commitSha,
  branch,
}: {
  owner: string;
  repo: string;
  token: string;
  commitSha: string;
  branch: string;
}): Promise<BranchCheckResult> {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/compare/${encodeURIComponent(commitSha)}...${encodeURIComponent(branch)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
    }
  );

  const text = await response.text();
  let parsed: Record<string, unknown> = {};
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { raw: text };
  }

  if (!response.ok) {
    return {
      ok: false,
      inBranch: false,
      statusCode: response.status,
      statusText: asString(parsed.message, "github_compare_failed"),
      mergeBaseSha: "",
      detail: asString(parsed.message, "No se pudo verificar commit en rama destino."),
      payload: parsed,
    };
  }

  const compareStatus = asString(parsed.status, "").toLowerCase();
  const mergeBaseSha = getNestedString(parsed, ["merge_base_commit", "sha"]);
  const inBranch = mergeBaseSha === commitSha;

  return {
    ok: true,
    inBranch,
    statusCode: response.status,
    statusText: asString(parsed.status, "ok"),
    mergeBaseSha,
    detail: inBranch
      ? `commit ${commitSha} encontrado en ${branch}`
      : `commit ${commitSha} no esta en ${branch}`,
    payload: {
      status: parsed.status,
      compare_status: compareStatus,
      ahead_by: asNumber(parsed.ahead_by),
      behind_by: asNumber(parsed.behind_by),
      merge_base_sha: mergeBaseSha,
    },
  };
}

async function checkReleaseMigrationGate({
  productKey,
  envKey,
  semver,
  actor,
}: {
  productKey: string;
  envKey: string;
  semver: string;
  actor: string;
}): Promise<MigrationGateResult> {
  const baseUrl = resolveOpsBaseUrl();
  const sharedToken = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!baseUrl) {
    return {
      ok: false,
      status: 500,
      error: "missing_ops_base_url",
      detail: "Missing SUPABASE_URL/URL for internal release gate call.",
      payload: {},
    };
  }
  if (!sharedToken) {
    return {
      ok: false,
      status: 500,
      error: "missing_proxy_shared_token",
      detail: "Missing VERSIONING_PROXY_SHARED_TOKEN for internal release gate call.",
      payload: {},
    };
  }

  const endpoint = `${baseUrl.replace(/\/+$/, "")}/functions/v1/versioning-release-gate`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [INTERNAL_PROXY_HEADER]: sharedToken,
    },
    body: JSON.stringify({
      operation: "check_release_migrations",
      product_key: productKey,
      to_env: envKey,
      semver,
      actor,
    }),
  });

  const raw = await response.text();
  let parsed: Record<string, unknown> = {};
  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    parsed = { raw };
  }

  if (!response.ok || parsed.ok === false) {
    return {
      ok: false,
      status: response.status,
      error: asString(parsed.error, "migration_gate_failed"),
      detail: asString(parsed.detail, "Migration gate call failed."),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    error: "",
    detail: "ok",
    payload: parsed,
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
  const operation = asString(body.operation, "dispatch").toLowerCase();

  let actor = asString(body.actor, "admin:proxy");
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

    const { usuario, error: profileErr, errorCode: profileErrCode } = await getUsuarioByAuthId(user.id);
    const profileFailure = resolveUsuarioProfileFailure({
      usuario,
      error: profileErr,
      errorCode: profileErrCode,
    });
    if (profileFailure) {
      return jsonResponse(profileFailure.body, profileFailure.status, cors);
    }
    if (usuario.role !== "admin") {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }
    actor = `admin:${asString(usuario.id) || asString(user.id)}`;
  }

  if (!["dispatch", "status", "reconciliation"].includes(operation)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_operation",
        detail: "operation permitido: dispatch | status | reconciliation",
      },
      400,
      cors
    );
  }

  const requestId = asString(body.request_id);
  const forceAdminOverride = asBoolean(body.force_admin_override, false);
  const syncRelease = asBoolean(body.sync_release, false);
  const syncOnly = asBoolean(body.sync_only, false);
  const sourceBranchInput = asString(body.source_branch);
  const targetBranchInput = asString(body.target_branch);

  if (!requestId) {
    return jsonResponse({ ok: false, error: "missing_request_id" }, 400, cors);
  }

  const { data: requestRow, error: requestErr } = await supabaseAdmin
    .from("version_deploy_requests_labeled")
    .select("id, tenant_id, release_id, product_key, env_key, version_label, status, requested_by, admin_override, deployment_id, deployment_status, logs_url, metadata")
    .eq("id", requestId)
    .limit(1)
    .maybeSingle<DeployRequestRow>();

  if (requestErr || !requestRow) {
    return jsonResponse({ ok: false, error: "deploy_request_not_found" }, 404, cors);
  }

  let operationalState = null;
  if (operation === "status" || operation === "reconciliation") {
    try {
      operationalState = await readOperationalState(requestRow);
    } catch {
      return jsonResponse({ ok: false, error: "deploy_reconciliation_lookup_failed" }, 503, cors);
    }
  }
  if (operation === "reconciliation") {
    return jsonResponse({
      ok: true,
      operation,
      request_id: requestId,
      request_status: requestRow.status,
      deployment_status: requestRow.deployment_status,
      ...operationalState,
    }, 200, cors);
  }

  if (!["staging", "prod"].includes(requestRow.env_key)) {
    return jsonResponse(
      {
        ok: false,
        error: "deploy_env_not_allowed",
        detail: `Deploy solo permitido en staging/prod. env_key=${requestRow.env_key}`,
      },
      409,
      cors
    );
  }

  if (!["referidos_app", "prelaunch_web"].includes(requestRow.product_key)) {
    return jsonResponse(
      {
        ok: false,
        error: "deploy_product_not_supported",
        detail:
          "Deploy exacto por artifact soportado solo para referidos_app y prelaunch_web.",
      },
      409,
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
  const githubOwner = githubAuth.data.owner;
  const githubRepo = githubAuth.data.repo;
  const githubToken = githubAuth.data.token;
  const githubAuthMode = githubAuth.data.authMode;
  const workflowId = asString(
    Deno.env.get("VERSIONING_DEPLOY_WORKFLOW"),
    "versioning-deploy-artifact.yml"
  );
  const defaultWorkflowRef = asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev");
  const workflowRef = asString(
    Deno.env.get("VERSIONING_DEPLOY_WORKFLOW_REF"),
    defaultWorkflowRef
  );

  if (operation === "status") {
    const runIdFromBody = asNumber(body.run_id, 0);
    const requestMetadata =
      requestRow.metadata && typeof requestRow.metadata === "object" ? requestRow.metadata : {};
    const reconciliation = operationalState;
    const boundRunId = asNumber(reconciliation?.reconciliation?.github_run_id, 0);
    if (requestRow.deployment_id && requestMetadata.deploy_execution_id === requestRow.deployment_id && !boundRunId) {
      return jsonResponse({
        ok: true,
        operation,
        request_id: requestId,
        run: null,
        jobs: [],
        detail: "El intento aún no ha confirmado un run de GitHub Actions.",
        ...reconciliation,
      }, 200, cors);
    }
    const runId = boundRunId || runIdFromBody || asNumber(requestMetadata.github_run_id, 0);
    const dispatchStartedAt =
      asString(body.dispatch_started_at) ||
      getNestedString(requestMetadata as Record<string, unknown>, ["workflow", "dispatched_at"]);

    const resolved = await resolveWorkflowRunAndJobs({
      owner: githubOwner,
      repo: githubRepo,
      workflowId,
      token: githubToken,
      ref: workflowRef,
      runId,
      dispatchStartedAt,
    });

    if (!resolved.ok) {
      return jsonResponse(
        {
          ok: false,
          error: resolved.error || "workflow_status_failed",
          detail: resolved.detail || "No se pudo consultar estado del workflow de deploy.",
          status: resolved.status || 500,
          ...reconciliation,
        },
        502,
        cors
      );
    }

    return jsonResponse(
      {
        ok: true,
        operation: "status",
        request_id: requestId,
        workflow: workflowId,
        ref: workflowRef,
        run: resolved.run,
        jobs: resolved.jobs,
        summary: resolved.summary,
        detail: resolved.detail,
        ...reconciliation,
      },
      200,
      cors
    );
  }

  if (!["pending", "approved"].includes(requestRow.status)) {
    return jsonResponse(
      { ok: false, error: "deploy_request_invalid_status", status: requestRow.status },
      409,
      cors
    );
  }

  if (requestRow.status === "pending" && !forceAdminOverride) {
    return jsonResponse(
      {
        ok: false,
        error: "deploy_request_requires_approval",
        detail: "Request pending: approve first or execute with admin override.",
      },
      409,
      cors
    );
  }

  const { data: releaseRow, error: releaseErr } = await supabaseAdmin
    .from("version_releases")
    .select("id, source_commit_sha")
    .eq("id", requestRow.release_id)
    .limit(1)
    .maybeSingle<{ id: string; source_commit_sha: string | null }>();

  if (releaseErr || !releaseRow) {
    return jsonResponse(
      { ok: false, error: "release_not_found", detail: "No se encontro release para la solicitud de deploy." },
      404,
      cors
    );
  }

  const sourceCommitSha = asString(releaseRow.source_commit_sha);
  if (!sourceCommitSha) {
    return jsonResponse(
      { ok: false, error: "release_missing_source_commit", detail: "La release no tiene source_commit_sha." },
      409,
      cors
    );
  }

  const migrationGate = await checkReleaseMigrationGate({
    productKey: requestRow.product_key,
    envKey: requestRow.env_key,
    semver: requestRow.version_label,
    actor,
  });

  if (!migrationGate.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "migration_gate_check_failed",
        detail: migrationGate.detail,
        gate_error: migrationGate.error,
        gate_status: migrationGate.status,
        gate_payload: migrationGate.payload,
      },
      migrationGate.status >= 400 ? migrationGate.status : 502,
      cors
    );
  }

  const gatePassed = asBoolean(migrationGate.payload.gate_passed, false);
  if (!gatePassed) {
    return jsonResponse(
      {
        ok: false,
        error: "release_migration_gate_failed",
        detail:
          "Faltan migraciones requeridas en entorno destino. Ejecuta apply migrations antes del deploy.",
        request_id: requestId,
        product_key: requestRow.product_key,
        env_key: requestRow.env_key,
        semver: requestRow.version_label,
        gate: migrationGate.payload,
      },
      409,
      cors
    );
  }

  const { data: promotionRow } = await supabaseAdmin
    .from("version_promotions")
    .select("from_release_id, created_at")
    .eq("to_release_id", requestRow.release_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ from_release_id: string }>();

  let sourceEnvKey = "";
  if (promotionRow?.from_release_id) {
    const { data: sourceRelease } = await supabaseAdmin
      .from("version_releases_labeled")
      .select("env_key")
      .eq("id", promotionRow.from_release_id)
      .limit(1)
      .maybeSingle<{ env_key: string }>();
    sourceEnvKey = asString(sourceRelease?.env_key);
  }

  const { sourceBranch, targetBranch } = resolveBranches({
    productKey: requestRow.product_key,
    targetEnvKey: requestRow.env_key,
    sourceEnvKey,
    sourceBranchInput,
    targetBranchInput,
  });

  const branchCheckBefore = await checkCommitInBranch({
    owner: githubOwner,
    repo: githubRepo,
    token: githubToken,
    commitSha: sourceCommitSha,
    branch: targetBranch,
  });

  if (!branchCheckBefore.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "github_branch_check_failed",
        detail: branchCheckBefore.detail,
        branch_check: branchCheckBefore,
      },
      502,
      cors
    );
  }

  const mergeSummary: Record<string, unknown> = {
    source_branch: sourceBranch,
    target_branch: targetBranch,
    source_env_key: sourceEnvKey || null,
    source_commit_sha: sourceCommitSha,
    sync_requested: syncRelease,
    sync_only: syncOnly,
    migration_gate: migrationGate.payload,
    branch_check_before: branchCheckBefore,
  };

  if (!branchCheckBefore.inBranch) {
    return jsonResponse(
      {
        ok: false,
        error: "release_sync_required",
        detail:
          `La release ${requestRow.version_label} aun no esta subida a la rama destino (${targetBranch}). ` +
          "Debes sincronizar release por PR (versioning-release-sync) antes de desplegar.",
        request_id: requestId,
        source_commit_sha: sourceCommitSha,
        branches: {
          source: sourceBranch,
          target: targetBranch,
        },
        sync_requested: syncRelease,
        sync_only: syncOnly,
        branch_check: branchCheckBefore,
      },
      409,
      cors
    );
  }

  if (syncOnly) {
    return jsonResponse(
      {
        ok: true,
        request_id: requestId,
        release_synced: true,
        already_synced: true,
        sync_only: true,
        source_commit_sha: sourceCommitSha,
        branches: {
          source: sourceBranch,
          target: targetBranch,
        },
        merge: mergeSummary,
      },
      200,
      cors
    );
  }

  const targetRequests = () => supabaseAdmin.from("version_deploy_requests_labeled")
    .select("id")
    .eq("tenant_id", requestRow.tenant_id)
    .eq("product_key", requestRow.product_key)
    .eq("env_key", requestRow.env_key)
    .neq("id", requestId)
    .limit(1);
  const [startedRequests, unfinishedRequests] = await Promise.all([
    targetRequests().eq("deployment_status", "started"),
    targetRequests().in("status", ["executed", "failed"])
      .in("metadata->ops_reconciliation->>status", ["pending", "incomplete"]),
  ]);
  if (startedRequests.error || unfinishedRequests.error) {
    return jsonResponse({ ok: false, error: "deploy_inflight_check_failed" }, 503, cors);
  }
  const unresolvedRequest = startedRequests.data?.[0] || unfinishedRequests.data?.[0];
  if (unresolvedRequest) {
    return jsonResponse({
      ok: false,
      error: "deploy_reconciliation_required",
      detail: "El destino tiene un intento sin cierre verificable. Revisa la conciliación antes de publicar.",
      active_request_id: unresolvedRequest.id,
    }, 409, cors);
  }

  const callbackBaseUrl = resolveOpsBaseUrl();
  if (!callbackBaseUrl) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_callback_url",
        detail: "Configura SUPABASE_URL/URL con el origen HTTPS del proyecto OPS.",
      },
      500,
      cors
    );
  }
  let callbackUrl: string;
  try {
    const configuredCallbackUrl = asString(Deno.env.get("VERSIONING_DEPLOY_CALLBACK_URL"));
    callbackUrl = resolveDeployCallbackUrl(callbackBaseUrl, configuredCallbackUrl || undefined);
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_callback_destination",
        detail:
          "El callback debe usar el origen HTTPS de OPS y su ruta fija. Revisa SUPABASE_URL y VERSIONING_DEPLOY_CALLBACK_URL.",
      },
      500,
      cors
    );
  }

  const callbackToken = asString(Deno.env.get("VERSIONING_DEPLOY_CALLBACK_TOKEN"));
  if (!callbackToken) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_callback_token",
        detail: "Define VERSIONING_DEPLOY_CALLBACK_TOKEN en secrets de Edge.",
      },
      500,
      cors
    );
  }

  const productKey = requestRow.product_key as keyof typeof NETLIFY_TARGETS;
  const envKey = requestRow.env_key as "staging" | "prod";
  const siteKey = `NETLIFY_SITE_ID_${envVarKey(productKey)}_${envVarKey(envKey)}`;
  const siteId = asString(Deno.env.get(siteKey)).toLowerCase();
  const siteName = NETLIFY_TARGETS[productKey][envKey];
  if (!UUID.test(siteId)) {
    return jsonResponse({ ok: false, error: "deploy_site_not_configured", detail: `Configura ${siteKey} en OPS.` }, 503, cors);
  }
  const deployExecutionId = `gha-${Date.now()}-${requestRow.id.slice(0, 8)}`;
  const repository = `${githubOwner}/${githubRepo}`;
  const workflowLogsUrl = `https://github.com/${githubOwner}/${githubRepo}/actions/workflows/${workflowId}`;
  const startedAt = new Date().toISOString();
  const { data: reservation, error: deployErr } = await supabaseAdmin.rpc(
    "versioning_reserve_deploy_attempt",
    {
      p_request_id: requestId,
      p_execution_id: deployExecutionId,
      p_actor: actor,
      p_metadata: {
        trigger: "admin_panel_pipeline",
        force_admin_override: forceAdminOverride,
        source_commit_sha: sourceCommitSha,
        netlify_site_id: siteId,
        netlify_site_name: siteName,
        logs_url: workflowLogsUrl,
        merge: mergeSummary,
        workflow: {
          id: workflowId,
          ref: workflowRef,
          repository,
          dispatched_at: startedAt,
        },
        dispatch_inputs: {
          request_id: requestRow.id,
          product_key: productKey,
          env_key: envKey,
          semver: requestRow.version_label,
          source_commit_sha: sourceCommitSha,
          source_branch: sourceBranch,
          target_branch: targetBranch,
          callback_url: callbackUrl,
          deploy_execution_id: deployExecutionId,
          actor,
        },
        github_auth_mode: githubAuthMode,
      },
    }
  );

  if (deployErr || reservation?.ok !== true || !reservation.attempt?.execution_id) {
    return jsonResponse(
      {
        ok: false,
        error: asString(reservation?.error, "deploy_reservation_failed"),
        detail: "OPS no pudo reservar un intento exclusivo. Consulta la solicitud antes de volver a intentar.",
      },
      deployErr ? 503 : 409,
      cors
    );
  }

  const executionId = reservation.attempt.execution_id;
  const dispatch = await dispatchReservedDeployAttempt({
    supabase: supabaseAdmin, executionId, token: githubToken, repository,
  }).catch(() => ({ state: "unknown", accepted: false }));
  if (dispatch.state === "rejected") {
    return jsonResponse({
      ok: false, error: "github_workflow_dispatch_rejected", request_id: requestId, deployment_id: executionId,
      detail: "GitHub rechazó el despacho. Consulta el intento registrado antes de solicitar otro.",
    }, 409, cors);
  }
  return jsonResponse(
    {
      ok: true,
      request_id: requestId,
      deployment_row_id: reservation.deployment_row_id ?? reservation.attempt.deployment_row_id,
      deployment_id: executionId,
      dispatch_state: dispatch.state || "unknown",
      logs_url: workflowLogsUrl,
      dispatch_started_at: startedAt,
      merge: mergeSummary,
      workflow: {
        id: workflowId,
        ref: workflowRef,
        dispatch_started_at: startedAt,
      },
      branches: {
        source: sourceBranch,
        target: targetBranch,
      },
    },
    200,
    cors
  );
});
