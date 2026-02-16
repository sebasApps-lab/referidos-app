import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type DeployRequestRow = {
  id: string;
  product_key: string;
  env_key: string;
  version_label: string;
  status: string;
  requested_by: string | null;
  admin_override: boolean | null;
};

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function resolveNetlifyHook(productKey: string, envKey: string): string | null {
  const productToken = envVarKey(productKey);
  const envToken = envVarKey(envKey);
  const specific = Deno.env.get(`NETLIFY_BUILD_HOOK_${productToken}_${envToken}`);
  if (specific && specific.trim()) return specific.trim();
  const generic = Deno.env.get(`NETLIFY_BUILD_HOOK_${envToken}`);
  if (generic && generic.trim()) return generic.trim();
  return null;
}

function resolveBranches(envKey: string, sourceBranchInput: string, targetBranchInput: string) {
  const devBranch = Deno.env.get("DEPLOY_BRANCH_DEV")?.trim() || "dev";
  const stagingBranch = Deno.env.get("DEPLOY_BRANCH_STAGING")?.trim() || "staging";
  const prodBranch = Deno.env.get("DEPLOY_BRANCH_PROD")?.trim() || "main";

  const targetBranch = targetBranchInput || (
    envKey === "prod" ? prodBranch : envKey === "staging" ? stagingBranch : devBranch
  );
  const sourceBranch = sourceBranchInput || (
    targetBranch === prodBranch ? stagingBranch : targetBranch === stagingBranch ? devBranch : devBranch
  );

  return { sourceBranch, targetBranch };
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

async function triggerNetlifyHook({
  hookUrl,
  request,
  actor,
  sourceBranch,
  targetBranch,
}: {
  hookUrl: string;
  request: DeployRequestRow;
  actor: string;
  sourceBranch: string;
  targetBranch: string;
}) {
  const response = await fetch(hookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_id: request.id,
      product_key: request.product_key,
      env_key: request.env_key,
      version: request.version_label,
      actor,
      source_branch: sourceBranch,
      target_branch: targetBranch,
    }),
  });

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
      message: asString(parsed.message, "netlify_hook_failed"),
      payload: parsed,
    };
  }

  const deploymentId = asString(
    parsed.id ?? parsed.deploy_id ?? parsed.deployId,
    `netlify-${Date.now()}-${request.id.slice(0, 8)}`
  );
  const logsUrl = asString(
    parsed.deploy_ssl_url ?? parsed.deploy_url ?? parsed.url ?? parsed.logs_url,
    ""
  );

  return {
    ok: true,
    status: response.status,
    deploymentId,
    logsUrl,
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

  const body = await req.json().catch(() => ({}));
  const requestId = asString(body.request_id);
  const forceAdminOverride = asBoolean(body.force_admin_override, false);
  const skipMerge = asBoolean(body.skip_merge, false);
  const sourceBranchInput = asString(body.source_branch);
  const targetBranchInput = asString(body.target_branch);

  if (!requestId) {
    return jsonResponse({ ok: false, error: "missing_request_id" }, 400, cors);
  }

  const { data: requestRow, error: requestErr } = await supabaseAdmin
    .from("version_deploy_requests_labeled")
    .select("id, product_key, env_key, version_label, status, requested_by, admin_override")
    .eq("id", requestId)
    .limit(1)
    .maybeSingle<DeployRequestRow>();

  if (requestErr || !requestRow) {
    return jsonResponse({ ok: false, error: "deploy_request_not_found" }, 404, cors);
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

  const githubOwner = asString(Deno.env.get("GITHUB_DEPLOY_OWNER"));
  const githubRepo = asString(Deno.env.get("GITHUB_DEPLOY_REPO"));
  const githubToken = asString(Deno.env.get("GITHUB_DEPLOY_TOKEN"));
  const netlifyHookUrl = resolveNetlifyHook(requestRow.product_key, requestRow.env_key);

  if (!netlifyHookUrl) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_netlify_hook",
        detail: `Define NETLIFY_BUILD_HOOK_${envVarKey(requestRow.product_key)}_${envVarKey(requestRow.env_key)} o NETLIFY_BUILD_HOOK_${envVarKey(requestRow.env_key)}`,
      },
      500,
      cors
    );
  }

  const actor = `admin:${usuario.id}`;
  const { sourceBranch, targetBranch } = resolveBranches(
    requestRow.env_key,
    sourceBranchInput,
    targetBranchInput
  );

  let mergeSummary: Record<string, unknown> = {
    skipped: skipMerge,
    source_branch: sourceBranch,
    target_branch: targetBranch,
  };

  if (!skipMerge) {
    if (!githubOwner || !githubRepo || !githubToken) {
      return jsonResponse(
        { ok: false, error: "missing_github_deploy_env", detail: "Missing GITHUB_DEPLOY_OWNER/GITHUB_DEPLOY_REPO/GITHUB_DEPLOY_TOKEN" },
        500,
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
      ...mergeResult,
    };

    if (!mergeResult.ok) {
      return jsonResponse(
        {
          ok: false,
          error: "github_merge_failed",
          merge: mergeSummary,
        },
        409,
        cors
      );
    }
  }

  const netlifyResult = await triggerNetlifyHook({
    hookUrl: netlifyHookUrl,
    request: requestRow,
    actor,
    sourceBranch,
    targetBranch,
  });

  if (!netlifyResult.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "netlify_hook_failed",
        netlify: netlifyResult,
      },
      502,
      cors
    );
  }

  const { data: deploymentRowId, error: deployErr } = await supabaseAdmin.rpc(
    "versioning_execute_deploy_request",
    {
      p_request_id: requestId,
      p_actor: actor,
      p_status: "started",
      p_deployment_id: netlifyResult.deploymentId,
      p_logs_url: netlifyResult.logsUrl || null,
      p_metadata: {
        trigger: "admin_panel_pipeline",
        force_admin_override: forceAdminOverride,
        merge: mergeSummary,
        netlify: netlifyResult.payload,
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
        netlify: netlifyResult,
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
      deployment_id: netlifyResult.deploymentId,
      logs_url: netlifyResult.logsUrl || null,
      merge: mergeSummary,
      netlify: {
        status: netlifyResult.status,
        payload: netlifyResult.payload,
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
