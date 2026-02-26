import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { getGithubAuthConfig } from "../_shared/github-auth.ts";

type BranchCheckResult = {
  ok: boolean;
  inBranch: boolean;
  statusCode: number;
  statusText: string;
  mergeBaseSha: string;
  detail: string;
  payload?: Record<string, unknown>;
};

type PullRequestSummary = {
  number: number;
  state: string;
  draft: boolean;
  mergeable: boolean | null;
  merge_state_status: string;
  head_sha: string;
  head_ref: string;
  base_ref: string;
  html_url: string;
};

type CheckItem = {
  name: string;
  state: "success" | "pending" | "failed";
  url: string;
  source: "check_run" | "status";
};

type ChecksSummary = {
  required_green: boolean;
  summary_state: "success" | "pending" | "failed";
  lint: "success" | "pending" | "failed" | "missing";
  test: "success" | "pending" | "failed" | "missing";
  build: "success" | "pending" | "failed" | "missing";
  items: CheckItem[];
};

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
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

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
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

function mapPrSummary(raw: Record<string, unknown>): PullRequestSummary {
  return {
    number: asNumber(raw.number),
    state: asString(raw.state),
    draft: Boolean(raw.draft),
    mergeable: typeof raw.mergeable === "boolean" ? raw.mergeable : null,
    merge_state_status: asString(raw.mergeable_state),
    head_sha: getNestedString(raw, ["head", "sha"]),
    head_ref: getNestedString(raw, ["head", "ref"]),
    base_ref: getNestedString(raw, ["base", "ref"]),
    html_url: asString(raw.html_url),
  };
}

async function fetchOpenPullRequest({
  owner,
  repo,
  token,
  headBranch,
  baseBranch,
}: {
  owner: string;
  repo: string;
  token: string;
  headBranch: string;
  baseBranch: string;
}) {
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/pulls`);
  url.searchParams.set("state", "open");
  url.searchParams.set("head", `${owner}:${headBranch}`);
  url.searchParams.set("base", baseBranch);
  url.searchParams.set("per_page", "20");

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
  });

  const text = await response.text();
  let parsed: unknown = [];
  try {
    parsed = text ? JSON.parse(text) : [];
  } catch {
    parsed = [];
  }
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      detail: "No se pudo consultar PRs abiertos.",
      payload: parsed,
      pr: null as PullRequestSummary | null,
    };
  }

  const rows = Array.isArray(parsed) ? parsed : [];
  const first = rows[0] && typeof rows[0] === "object" ? (rows[0] as Record<string, unknown>) : null;
  return {
    ok: true,
    status: response.status,
    detail: first ? "pr_open_found" : "pr_open_not_found",
    payload: rows,
    pr: first ? mapPrSummary(first) : null,
  };
}

async function createPullRequest({
  owner,
  repo,
  token,
  title,
  body,
  headBranch,
  baseBranch,
}: {
  owner: string;
  repo: string;
  token: string;
  title: string;
  body: string;
  headBranch: string;
  baseBranch: string;
}) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
    body: JSON.stringify({
      title,
      body,
      head: headBranch,
      base: baseBranch,
      maintainer_can_modify: true,
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
      detail: asString(parsed.message, "github_create_pr_failed"),
      payload: parsed,
      pr: null as PullRequestSummary | null,
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "pr_created",
    payload: parsed,
    pr: mapPrSummary(parsed),
  };
}

async function getPullRequestByNumber({
  owner,
  repo,
  token,
  pullNumber,
}: {
  owner: string;
  repo: string;
  token: string;
  pullNumber: number;
}) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
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
      detail: asString(parsed.message, "github_get_pr_failed"),
      payload: parsed,
      pr: null as PullRequestSummary | null,
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "pr_loaded",
    payload: parsed,
    pr: mapPrSummary(parsed),
  };
}

async function waitPullMergeable({
  owner,
  repo,
  token,
  pullNumber,
  retries = 6,
  delayMs = 1000,
}: {
  owner: string;
  repo: string;
  token: string;
  pullNumber: number;
  retries?: number;
  delayMs?: number;
}) {
  let last: PullRequestSummary | null = null;
  for (let i = 0; i < retries; i += 1) {
    const loaded = await getPullRequestByNumber({ owner, repo, token, pullNumber });
    if (!loaded.ok || !loaded.pr) return loaded;
    last = loaded.pr;
    if (loaded.pr.mergeable !== null) return loaded;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return {
    ok: true,
    status: 200,
    detail: "pr_mergeable_timeout",
    payload: {},
    pr: last,
  };
}

function normalizeCheckState(raw: string): "success" | "pending" | "failed" {
  const value = String(raw || "").toLowerCase();
  if (["success", "neutral", "skipped"].includes(value)) return "success";
  if (["queued", "in_progress", "pending", ""].includes(value)) return "pending";
  return "failed";
}

function inferGateState(items: CheckItem[], keywords: string[]): "success" | "pending" | "failed" | "missing" {
  const matches = items.filter((item) =>
    keywords.some((keyword) => item.name.toLowerCase().includes(keyword))
  );
  if (!matches.length) return "missing";
  if (matches.some((item) => item.state === "failed")) return "failed";
  if (matches.every((item) => item.state === "success")) return "success";
  return "pending";
}

async function fetchChecksSummary({
  owner,
  repo,
  token,
  headSha,
}: {
  owner: string;
  repo: string;
  token: string;
  headSha: string;
}) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "referidos-versioning-edge",
  };

  const [checkRunsRes, statusRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${encodeURIComponent(headSha)}/check-runs?per_page=100`, {
      method: "GET",
      headers,
    }),
    fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${encodeURIComponent(headSha)}/status`, {
      method: "GET",
      headers,
    }),
  ]);

  const checkRunsRaw = await checkRunsRes.text();
  const statusRaw = await statusRes.text();

  let checkRunsParsed: Record<string, unknown> = {};
  let statusParsed: Record<string, unknown> = {};
  try {
    checkRunsParsed = checkRunsRaw ? JSON.parse(checkRunsRaw) : {};
  } catch {
    checkRunsParsed = {};
  }
  try {
    statusParsed = statusRaw ? JSON.parse(statusRaw) : {};
  } catch {
    statusParsed = {};
  }

  const items: CheckItem[] = [];

  const checkRuns = Array.isArray(checkRunsParsed.check_runs) ? checkRunsParsed.check_runs : [];
  for (const run of checkRuns) {
    if (!run || typeof run !== "object") continue;
    const row = run as Record<string, unknown>;
    const name = asString(row.name);
    if (!name) continue;
    const status = asString(row.status);
    const conclusion = asString(row.conclusion);
    const state = status === "completed" ? normalizeCheckState(conclusion) : normalizeCheckState(status);
    items.push({
      name,
      state,
      url: asString(row.details_url),
      source: "check_run",
    });
  }

  const statuses = Array.isArray(statusParsed.statuses) ? statusParsed.statuses : [];
  for (const statusRow of statuses) {
    if (!statusRow || typeof statusRow !== "object") continue;
    const row = statusRow as Record<string, unknown>;
    const name = asString(row.context);
    if (!name) continue;
    items.push({
      name,
      state: normalizeCheckState(asString(row.state)),
      url: asString(row.target_url),
      source: "status",
    });
  }

  const lint = inferGateState(items, ["lint", "eslint"]);
  const test = inferGateState(items, ["test", "jest", "vitest"]);
  const build = inferGateState(items, ["build", "compile", "typecheck"]);

  const gateStates = [lint, test, build];
  const requiredGreen = gateStates.every((state) => state === "success");
  const summaryState = gateStates.includes("failed")
    ? "failed"
    : requiredGreen
      ? "success"
      : "pending";

  const summary: ChecksSummary = {
    required_green: requiredGreen,
    summary_state: summaryState,
    lint,
    test,
    build,
    items,
  };

  return summary;
}

async function mergePullRequest({
  owner,
  repo,
  token,
  pullNumber,
  expectedHeadSha,
}: {
  owner: string;
  repo: string;
  token: string;
  pullNumber: number;
  expectedHeadSha: string;
}) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/merge`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
    body: JSON.stringify({
      merge_method: "merge",
      sha: expectedHeadSha || undefined,
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
      detail: asString(parsed.message, "github_merge_pr_failed"),
      payload: parsed,
    };
  }

  const merged = Boolean(parsed.merged);
  return {
    ok: merged,
    status: response.status,
    detail: merged ? "pr_merged" : asString(parsed.message, "pr_not_merged"),
    payload: parsed,
  };
}

async function closePullRequest({
  owner,
  repo,
  token,
  pullNumber,
}: {
  owner: string;
  repo: string;
  token: string;
  pullNumber: number;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
      body: JSON.stringify({
        state: "closed",
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
      detail: asString(parsed.message, "github_close_pr_failed"),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "pr_closed",
    pr: mapPrSummary(parsed),
    payload: parsed,
  };
}

async function commentOnPullRequest({
  owner,
  repo,
  token,
  pullNumber,
  body,
}: {
  owner: string;
  repo: string;
  token: string;
  pullNumber: number;
  body: string;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues/${pullNumber}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
      body: JSON.stringify({
        body,
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
      detail: asString(parsed.message, "github_pr_comment_failed"),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "pr_commented",
    comment_id: asNumber(parsed.id, 0),
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

  const operation = asString(body.operation, "sync").toLowerCase();
  const pullNumber = asNumber(body.pull_number, 0);
  const commentBody = asString(body.comment_body);
  const hasCreatePrOverride =
    body && typeof body === "object" && Object.prototype.hasOwnProperty.call(body, "create_pr");

  const productKey = asString(body.product_key).toLowerCase();
  const fromEnvKeyInput = asString(body.from_env).toLowerCase();
  const toEnvKey = asString(body.to_env).toLowerCase();
  const semver = asString(body.semver);
  const sourceBranchInput = asString(body.source_branch);
  const targetBranchInput = asString(body.target_branch);
  let checkOnly = asBoolean(body.check_only, false);
  let autoMerge = asBoolean(body.auto_merge, !checkOnly);
  let createPr = asBoolean(body.create_pr, true);

  if (operation === "refresh_pr") {
    checkOnly = true;
    autoMerge = false;
    if (!hasCreatePrOverride) createPr = false;
  }

  if (operation === "merge_pr") {
    checkOnly = false;
    autoMerge = true;
    if (!hasCreatePrOverride) createPr = false;
  }

  if (!["sync", "refresh_pr", "merge_pr", "close_pr", "comment_pr"].includes(operation)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_operation",
        detail: "operation permitido: sync|refresh_pr|merge_pr|close_pr|comment_pr",
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
  const githubOwner = githubAuth.data.owner;
  const githubRepo = githubAuth.data.repo;
  const githubToken = githubAuth.data.token;
  const githubAuthMode = githubAuth.data.authMode;

  if (operation === "close_pr" || operation === "comment_pr") {
    if (pullNumber < 1) {
      return jsonResponse(
        {
          ok: false,
          error: "missing_pull_number",
          detail: "pull_number es requerido para close_pr/comment_pr.",
        },
        400,
        cors
      );
    }

    const loadedPr = await getPullRequestByNumber({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      pullNumber,
    });
    if (!loadedPr.ok || !loadedPr.pr) {
      return jsonResponse(
        {
          ok: false,
          error: "github_get_pr_failed",
          detail: loadedPr.detail,
          pull_number: pullNumber,
          github_auth_mode: githubAuthMode,
        },
        502,
        cors
      );
    }

    if (operation === "comment_pr") {
      if (!commentBody) {
        return jsonResponse(
          {
            ok: false,
            error: "missing_comment_body",
            detail: "comment_body es requerido para comment_pr.",
          },
          400,
          cors
        );
      }

      const commented = await commentOnPullRequest({
        owner: githubOwner,
        repo: githubRepo,
        token: githubToken,
        pullNumber,
        body: commentBody,
      });
      if (!commented.ok) {
        return jsonResponse(
          {
            ok: false,
            error: "github_pr_comment_failed",
            detail: commented.detail,
            pr: loadedPr.pr,
            pull_number: pullNumber,
            github_auth_mode: githubAuthMode,
          },
          502,
          cors
        );
      }

      return jsonResponse(
        {
          ok: true,
          operation,
          pr: loadedPr.pr,
          pull_number: pullNumber,
          comment_id: commented.comment_id,
          github_auth_mode: githubAuthMode,
        },
        200,
        cors
      );
    }

    if (loadedPr.pr.state === "closed") {
      return jsonResponse(
        {
          ok: true,
          operation,
          already_closed: true,
          pr: loadedPr.pr,
          pull_number: pullNumber,
          github_auth_mode: githubAuthMode,
        },
        200,
        cors
      );
    }

    const closed = await closePullRequest({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      pullNumber,
    });

    if (!closed.ok) {
      return jsonResponse(
        {
          ok: false,
          error: "github_close_pr_failed",
          detail: closed.detail,
          pr: loadedPr.pr,
          pull_number: pullNumber,
          github_auth_mode: githubAuthMode,
        },
        502,
        cors
      );
    }

    return jsonResponse(
      {
        ok: true,
        operation,
        closed: true,
        pr: closed.pr,
        pull_number: pullNumber,
        github_auth_mode: githubAuthMode,
      },
      200,
      cors
    );
  }

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

  const { data: releaseRow, error: releaseErr } = await supabaseAdmin
    .from("version_releases_labeled")
    .select("id, tenant_id, product_key, env_key, version_label, source_commit_sha, release_notes_auto")
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
      release_notes_auto: string | null;
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

  const responseBase: Record<string, unknown> = {
    operation,
    source_commit_sha: sourceCommitSha,
    branches: {
      source: sourceBranch,
      target: targetBranch,
    },
    branch_check_before: branchCheckBefore,
    github_auth_mode: githubAuthMode,
  };

  if (branchCheckBefore.inBranch) {
    return jsonResponse(
      {
        ok: true,
        release_synced: true,
        already_synced: true,
        check_only: checkOnly,
        ...responseBase,
      },
      200,
      cors
    );
  }

  const openPrLookup = await fetchOpenPullRequest({
    owner: githubOwner,
    repo: githubRepo,
    token: githubToken,
    headBranch: sourceBranch,
    baseBranch: targetBranch,
  });
  if (!openPrLookup.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "github_fetch_pr_failed",
        detail: openPrLookup.detail,
        ...responseBase,
      },
      502,
      cors
    );
  }

  let pr = openPrLookup.pr;
  let prCreated = false;
  let prNotesCommented = false;
  let prNotesCommentError = "";

  if (!pr && createPr) {
    const created = await createPullRequest({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      title: `[versioning-sync] ${productKey} ${semver}: ${sourceBranch} -> ${targetBranch}`,
      body: [
        `Release: ${semver}`,
        `Product: ${productKey}`,
        `Target env: ${toEnvKey}`,
        `Source commit: ${sourceCommitSha}`,
        "",
        `Triggered by: ${actor}`,
      ].join("\n"),
      headBranch: sourceBranch,
      baseBranch: targetBranch,
    });
    if (!created.ok || !created.pr) {
      return jsonResponse(
        {
          ok: false,
          error: "github_create_pr_failed",
          detail: created.detail,
          ...responseBase,
        },
        502,
        cors
      );
    }
    pr = created.pr;
    prCreated = true;

    const releaseNotes = asString(releaseRow.release_notes_auto);
    if (releaseNotes) {
      const notesComment = await commentOnPullRequest({
        owner: githubOwner,
        repo: githubRepo,
        token: githubToken,
        pullNumber: pr.number,
        body: `### Release notes auto\n\n${releaseNotes}`,
      });
      prNotesCommented = notesComment.ok;
      prNotesCommentError = notesComment.ok ? "" : notesComment.detail;
    }
  }

  if (!pr) {
    return jsonResponse(
      {
        ok: false,
        error: "pr_not_found",
        detail: "No existe PR abierto para sincronizar y create_pr=false.",
        ...responseBase,
      },
      409,
      cors
    );
  }

  const prWithMergeable = await waitPullMergeable({
    owner: githubOwner,
    repo: githubRepo,
    token: githubToken,
    pullNumber: pr.number,
  });
  if (!prWithMergeable.ok || !prWithMergeable.pr) {
    return jsonResponse(
      {
        ok: false,
        error: "github_get_pr_failed",
        detail: prWithMergeable.detail,
        pr,
        ...responseBase,
      },
      502,
      cors
    );
  }
  pr = prWithMergeable.pr;

  const checks = await fetchChecksSummary({
    owner: githubOwner,
    repo: githubRepo,
    token: githubToken,
    headSha: pr.head_sha,
  });

  if (checkOnly || !autoMerge) {
    return jsonResponse(
      {
        ok: true,
        release_synced: false,
        already_synced: false,
        pr_created: prCreated,
        pr_notes_commented: prNotesCommented,
        pr_notes_comment_error: prNotesCommentError || null,
        check_only: checkOnly,
        auto_merge: autoMerge,
        pr,
        checks,
        ...responseBase,
      },
      200,
      cors
    );
  }

  if (pr.mergeable === false) {
    return jsonResponse(
      {
        ok: false,
        error: "pr_has_conflicts",
        detail: "El PR tiene conflictos y no se puede mergear automaticamente.",
        pr,
        checks,
        ...responseBase,
      },
      409,
      cors
    );
  }

  if (!checks.required_green) {
    return jsonResponse(
      {
        ok: false,
        error: "pr_checks_not_green",
        detail: "Checks obligatorios (lint/test/build) aun no estan en verde.",
        pr,
        checks,
        ...responseBase,
      },
      409,
      cors
    );
  }

  const merged = await mergePullRequest({
    owner: githubOwner,
    repo: githubRepo,
    token: githubToken,
    pullNumber: pr.number,
    expectedHeadSha: pr.head_sha,
  });
  if (!merged.ok) {
    return jsonResponse(
      {
        ok: false,
        error: "pr_merge_failed",
        detail: merged.detail,
        pr,
        checks,
        merge: merged.payload,
        ...responseBase,
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

  if (!branchCheckAfter.ok || !branchCheckAfter.inBranch) {
    return jsonResponse(
      {
        ok: false,
        error: "release_sync_failed",
        detail: "El PR se mergeo, pero no se pudo verificar la release en la rama destino.",
        pr,
        checks,
        branch_check_after: branchCheckAfter,
        ...responseBase,
      },
      409,
      cors
    );
  }

  await supabaseAdmin.from("version_audit_log").insert({
    tenant_id: releaseRow.tenant_id,
    actor,
    action:
      operation === "merge_pr"
        ? "sync_release_merge_pr"
        : operation === "refresh_pr"
          ? "sync_release_refresh_pr"
          : "sync_release_branch",
    entity_type: "version_releases",
    entity_id: releaseRow.id,
    payload: {
      operation,
      product_key: productKey,
      semver,
      from_env: sourceEnvKey || null,
      to_env: toEnvKey,
      source_commit_sha: sourceCommitSha,
      branches: {
        source: sourceBranch,
        target: targetBranch,
      },
      pr,
      checks,
      branch_check_before: branchCheckBefore,
      branch_check_after: branchCheckAfter,
      github_auth_mode: githubAuthMode,
    },
  });

  return jsonResponse(
    {
      ok: true,
      release_synced: true,
      already_synced: false,
      pr_created: prCreated,
      pr_notes_commented: prNotesCommented,
      pr_notes_comment_error: prNotesCommentError || null,
      pr,
      checks,
      branch_check_after: branchCheckAfter,
      ...responseBase,
    },
    200,
    cors
  );
});
