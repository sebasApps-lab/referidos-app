import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { getGithubAuthConfig } from "../_shared/github-auth.ts";

type DeployRequestRow = {
  id: string;
  release_id: string;
  product_key: string;
  env_key: string;
  version_label: string;
  status: string;
  requested_by: string | null;
  admin_override: boolean | null;
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
  const received = asString(req.headers.get("x-versioning-proxy-token"));
  return Boolean(received) && received === expected;
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function resolveWorkflowCallbackUrl() {
  const explicit = asString(Deno.env.get("VERSIONING_DEPLOY_CALLBACK_URL"));
  if (explicit) return explicit;

  const supabaseUrl = asString(Deno.env.get("SUPABASE_URL") ?? Deno.env.get("URL"));
  if (!supabaseUrl) return "";
  return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/versioning-deploy-callback`;
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

async function mergeBranches({
  owner,
  repo,
  token,
  base,
  head,
  actor,
  requestId,
}: {
  owner: string;
  repo: string;
  token: string;
  base: string;
  head: string;
  actor: string;
  requestId: string;
}) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/merges`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
    body: JSON.stringify({
      base,
      head,
      commit_message: `[deploy-gate] merge ${head} -> ${base} (request ${requestId}) by ${actor}`,
    }),
  });

  const text = await response.text();
  let parsed: Record<string, unknown> = {};
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { raw: text };
  }

  if (response.status === 201 || response.status === 204) {
    return {
      ok: true,
      status: response.status,
      mergedSha: asString(parsed.sha),
      message: asString(parsed.message, "merge_executed"),
      payload: parsed,
    };
  }

  return {
    ok: false,
    status: response.status,
    message: asString(parsed.message, "github_merge_failed"),
    payload: parsed,
  };
}

async function dispatchGithubWorkflow({
  owner,
  repo,
  token,
  workflowId,
  workflowRef,
  inputs,
}: {
  owner: string;
  repo: string;
  token: string;
  workflowId: string;
  workflowRef: string;
  inputs: Record<string, string>;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowId}/dispatches`,
    {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
    body: JSON.stringify({
      ref: workflowRef,
      inputs,
    }),
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
      status: response.status,
      message: asString(parsed.message, "github_workflow_dispatch_failed"),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    message: "workflow_dispatched",
    payload: parsed,
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

  const mergeBaseSha = getNestedString(parsed, ["merge_base_commit", "sha"]);
  const baseCommitSha = getNestedString(parsed, ["base_commit", "sha"]);
  const inBranch = mergeBaseSha === commitSha || baseCommitSha === commitSha;

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
      ahead_by: asNumber(parsed.ahead_by),
      behind_by: asNumber(parsed.behind_by),
      merge_base_sha: mergeBaseSha,
    },
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

    const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
    if (profileErr || !usuario) {
      return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
    }
    if (usuario.role !== "admin") {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }
    actor = `admin:${asString(usuario.id) || asString(user.id)}`;
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
    .select("id, release_id, product_key, env_key, version_label, status, requested_by, admin_override")
    .eq("id", requestId)
    .limit(1)
    .maybeSingle<DeployRequestRow>();

  if (requestErr || !requestRow) {
    return jsonResponse({ ok: false, error: "deploy_request_not_found" }, 404, cors);
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

  let mergeSummary: Record<string, unknown> = {
    source_branch: sourceBranch,
    target_branch: targetBranch,
    source_env_key: sourceEnvKey || null,
    source_commit_sha: sourceCommitSha,
    sync_requested: syncRelease,
    sync_only: syncOnly,
    branch_check_before: branchCheckBefore,
  };

  if (!branchCheckBefore.inBranch) {
    if (!syncRelease) {
      return jsonResponse(
        {
          ok: false,
          error: "release_sync_required",
          detail: `La release ${requestRow.version_label} aun no esta subida a la rama destino (${targetBranch}).`,
          request_id: requestId,
          source_commit_sha: sourceCommitSha,
          branches: {
            source: sourceBranch,
            target: targetBranch,
          },
          branch_check: branchCheckBefore,
        },
        409,
        cors
      );
    }

    const mergeResult = await mergeBranches({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      base: targetBranch,
      head: sourceBranch,
      actor,
      requestId,
    });

    mergeSummary = {
      ...mergeSummary,
      merge: mergeResult,
    };

    if (!mergeResult.ok) {
      return jsonResponse(
        {
          ok: false,
          error: "github_merge_failed",
          detail: mergeResult.message,
          merge: mergeSummary,
        },
        409,
        cors
      );
    }

    const branchCheckAfter = await checkCommitInBranch({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      commitSha: sourceCommitSha,
      branch: targetBranch,
    });

    mergeSummary = {
      ...mergeSummary,
      branch_check_after: branchCheckAfter,
    };

    if (!branchCheckAfter.ok || !branchCheckAfter.inBranch) {
      return jsonResponse(
        {
          ok: false,
          error: "release_sync_failed",
          detail: "No se pudo verificar la release en la rama destino despues del merge.",
          merge: mergeSummary,
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
  } else if (syncOnly) {
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

  const workflowId = asString(
    Deno.env.get("VERSIONING_DEPLOY_WORKFLOW"),
    "versioning-deploy-artifact.yml"
  );
  const defaultWorkflowRef = asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev");
  const workflowRef = asString(
    Deno.env.get("VERSIONING_DEPLOY_WORKFLOW_REF"),
    defaultWorkflowRef
  );
  const callbackUrl = resolveWorkflowCallbackUrl();
  if (!callbackUrl) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_callback_url",
        detail:
          "Define VERSIONING_DEPLOY_CALLBACK_URL o usa SUPABASE_URL/URL para construir el callback.",
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

  const deployExecutionId = `gha-${Date.now()}-${requestRow.id.slice(0, 8)}`;
  const dispatchResult = await dispatchGithubWorkflow({
    owner: githubOwner,
    repo: githubRepo,
    token: githubToken,
    workflowId,
    workflowRef,
    inputs: {
      request_id: requestRow.id,
      product_key: requestRow.product_key,
      env_key: requestRow.env_key,
      semver: requestRow.version_label,
      source_commit_sha: sourceCommitSha,
      source_branch: sourceBranch,
      target_branch: targetBranch,
      callback_url: callbackUrl,
      deploy_execution_id: deployExecutionId,
      actor,
    },
  });

  if (!dispatchResult.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "github_workflow_dispatch_failed",
        detail: dispatchResult.message,
        github_context: {
          owner: githubOwner,
          repo: githubRepo,
          workflow_id: workflowId,
          workflow_ref: workflowRef,
          auth_mode: githubAuthMode,
        },
        github: dispatchResult,
      },
      502,
      cors
    );
  }

  const workflowLogsUrl = `https://github.com/${githubOwner}/${githubRepo}/actions/workflows/${workflowId}`;

  const { data: deploymentRowId, error: deployErr } = await supabaseAdmin.rpc(
    "versioning_execute_deploy_request",
    {
      p_request_id: requestId,
      p_actor: actor,
      p_status: "started",
      p_deployment_id: deployExecutionId,
      p_logs_url: workflowLogsUrl,
      p_metadata: {
        trigger: "admin_panel_pipeline",
        deploy_mode: "github_artifact_exact",
        force_admin_override: forceAdminOverride,
        source_commit_sha: sourceCommitSha,
        merge: mergeSummary,
        workflow: {
          id: workflowId,
          ref: workflowRef,
          callback_url: callbackUrl,
          dispatched_at: new Date().toISOString(),
        },
        github_auth_mode: githubAuthMode,
        github: dispatchResult.payload,
      },
    }
  );

  if (deployErr) {
    return jsonResponse(
      {
        ok: false,
        error: "deploy_registration_failed",
        detail: deployErr.message,
        merge: mergeSummary,
        github: dispatchResult,
      },
      500,
      cors
    );
  }

  return jsonResponse(
    {
      ok: true,
      request_id: requestId,
      deployment_row_id: deploymentRowId,
      deployment_id: deployExecutionId,
      logs_url: workflowLogsUrl,
      merge: mergeSummary,
      workflow: {
        id: workflowId,
        ref: workflowRef,
        callback_url: callbackUrl,
        status: dispatchResult.status,
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
