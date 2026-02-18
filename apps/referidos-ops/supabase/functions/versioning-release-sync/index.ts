import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

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

function resolveGithubOwnerRepo(ownerInput: string, repoInput: string) {
  const ownerRaw = asString(ownerInput);
  const repoRaw = asString(repoInput);

  if (!repoRaw) {
    return { owner: ownerRaw, repo: "" };
  }

  try {
    const parsed = new URL(repoRaw);
    if (parsed.hostname.includes("github.com")) {
      const parts = parsed.pathname
        .split("/")
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts.length >= 2) {
        return {
          owner: asString(parts[0]),
          repo: asString(parts[1]).replace(/\.git$/i, ""),
        };
      }
    }
  } catch {
    // Non-URL format.
  }

  const normalizedRepo = repoRaw.replace(/^\/+|\/+$/g, "").replace(/\.git$/i, "");
  const slashParts = normalizedRepo
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (slashParts.length >= 2) {
    return {
      owner: asString(slashParts[0]),
      repo: asString(slashParts[1]),
    };
  }

  return { owner: ownerRaw, repo: normalizedRepo };
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function asNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function getNestedString(input: Record<string, unknown>, path: string[]): string {
  let current: unknown = input;
  for (const key of path) {
    if (!current || typeof current !== "object") return "";
    current = (current as Record<string, unknown>)[key];
  }
  return asString(current);
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get("x-versioning-proxy-token"));
  return Boolean(received) && received === expected;
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

async function mergeBranches({
  owner,
  repo,
  token,
  base,
  head,
  actor,
}: {
  owner: string;
  repo: string;
  token: string;
  base: string;
  head: string;
  actor: string;
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
      commit_message: `[versioning-sync] merge ${head} -> ${base} by ${actor}`,
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

  let actor = "admin:proxy";
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
  } else {
    actor = asString(body.actor, "admin:proxy");
  }

  const productKey = asString(body.product_key).toLowerCase();
  const fromEnvKeyInput = asString(body.from_env).toLowerCase();
  const toEnvKey = asString(body.to_env).toLowerCase();
  const semver = asString(body.semver);
  const sourceBranchInput = asString(body.source_branch);
  const targetBranchInput = asString(body.target_branch);

  if (!productKey || !toEnvKey || !semver) {
    return jsonResponse(
      { ok: false, error: "missing_params", detail: "product_key, to_env y semver son requeridos." },
      400,
      cors
    );
  }

  if (!["staging", "prod"].includes(toEnvKey)) {
    return jsonResponse(
      { ok: false, error: "sync_env_not_allowed", detail: "Sync solo permitido hacia staging/prod." },
      409,
      cors
    );
  }

  if (!["referidos_app", "prelaunch_web"].includes(productKey)) {
    return jsonResponse(
      {
        ok: false,
        error: "sync_product_not_supported",
        detail: "Sync soportado solo para referidos_app y prelaunch_web.",
      },
      409,
      cors
    );
  }

  const githubConfig = resolveGithubOwnerRepo(
    asString(Deno.env.get("GITHUB_DEPLOY_OWNER")),
    asString(Deno.env.get("GITHUB_DEPLOY_REPO"))
  );
  const githubOwner = githubConfig.owner;
  const githubRepo = githubConfig.repo;
  const githubToken = asString(Deno.env.get("GITHUB_DEPLOY_TOKEN"));
  if (!githubOwner || !githubRepo || !githubToken) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_github_deploy_env",
        detail:
          "Missing GITHUB_DEPLOY_OWNER/GITHUB_DEPLOY_REPO/GITHUB_DEPLOY_TOKEN. GITHUB_DEPLOY_REPO accepts: repo, owner/repo, or full github URL.",
      },
      500,
      cors
    );
  }

  const { data: releaseRow, error: releaseErr } = await supabaseAdmin
    .from("version_releases_labeled")
    .select("id, tenant_id, product_key, env_key, version_label, source_commit_sha")
    .eq("product_key", productKey)
    .eq("env_key", toEnvKey)
    .eq("version_label", semver)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{
      id: string;
      tenant_id: string;
      product_key: string;
      env_key: string;
      version_label: string;
      source_commit_sha: string | null;
    }>();

  if (releaseErr || !releaseRow) {
    return jsonResponse(
      { ok: false, error: "release_not_found", detail: "No se encontro release destino para sync." },
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

  let sourceEnvKey = fromEnvKeyInput;
  if (!sourceEnvKey) {
    const { data: promotionRow } = await supabaseAdmin
      .from("version_promotions")
      .select("from_release_id, created_at")
      .eq("to_release_id", releaseRow.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<{ from_release_id: string }>();

    if (promotionRow?.from_release_id) {
      const { data: fromRelease } = await supabaseAdmin
        .from("version_releases_labeled")
        .select("env_key")
        .eq("id", promotionRow.from_release_id)
        .limit(1)
        .maybeSingle<{ env_key: string }>();
      sourceEnvKey = asString(fromRelease?.env_key).toLowerCase();
    }
  }

  const { sourceBranch, targetBranch } = resolveBranches({
    productKey,
    targetEnvKey: toEnvKey,
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
    branch_check_before: branchCheckBefore,
  };

  let alreadySynced = branchCheckBefore.inBranch;
  if (!branchCheckBefore.inBranch) {
    const mergeResult = await mergeBranches({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      base: targetBranch,
      head: sourceBranch,
      actor,
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
  }

  await supabaseAdmin.from("version_audit_log").insert({
    tenant_id: releaseRow.tenant_id,
    actor,
    action: "sync_release_branch",
    entity_type: "version_releases",
    entity_id: releaseRow.id,
    payload: {
      product_key: productKey,
      semver,
      from_env: sourceEnvKey || null,
      to_env: toEnvKey,
      source_commit_sha: sourceCommitSha,
      branches: {
        source: sourceBranch,
        target: targetBranch,
      },
      merge: mergeSummary,
    },
  });

  return jsonResponse(
    {
      ok: true,
      release_synced: true,
      already_synced: alreadySynced,
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
});
