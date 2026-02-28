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

async function waitForRequiredChecksGreen({
  owner,
  repo,
  token,
  headSha,
  retries = 20,
  delayMs = 3000,
}: {
  owner: string;
  repo: string;
  token: string;
  headSha: string;
  retries?: number;
  delayMs?: number;
}) {
  let checks = await fetchChecksSummary({ owner, repo, token, headSha });
  if (checks.required_green || checks.summary_state === "failed") {
    return {
      checks,
      attempts: 1,
      timed_out: false,
    };
  }

  for (let attempt = 2; attempt <= retries; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    checks = await fetchChecksSummary({ owner, repo, token, headSha });
    if (checks.required_green || checks.summary_state === "failed") {
      return {
        checks,
        attempts: attempt,
        timed_out: false,
      };
    }
  }

  return {
    checks,
    attempts: retries,
    timed_out: !checks.required_green,
  };
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

const WORKFLOW_PACK_PATHS = [
  ".github/workflows/ci-pr.yml",
  ".github/workflows/versioning-apply-migrations.yml",
  ".github/workflows/versioning-deploy-artifact.yml",
  ".github/workflows/versioning-detect-dev.yml",
  ".github/workflows/versioning-detect-pr.yml",
  ".github/workflows/versioning-local-artifact-sync.yml",
  ".github/workflows/versioning-promote.yml",
  ".github/workflows/versioning-record-deployment.yml",
  ".github/workflows/versioning-release-dev.yml",
  "tooling/versioning/apply-changeset.mjs",
  "tooling/versioning/detect-changes.mjs",
  "tooling/versioning/promote-release.mjs",
  "tooling/versioning/record-deployment.mjs",
  "tooling/observability/upload-sourcemaps.mjs",
];

type WorkflowPackFile = {
  path: string;
  content: string;
  sha: string;
};

type WorkflowPackSnapshot = {
  ref: string;
  head_sha: string;
  pack_hash: string;
  file_count: number;
  missing_files: string[];
};

function encodeGithubPath(path: string) {
  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function normalizeBase64(value: string) {
  return String(value || "").replace(/\s+/g, "");
}

async function sha256Hex(input: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function computeWorkflowPackHash(files: WorkflowPackFile[]) {
  const seed = [...files]
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((file) => `${file.path}\n${normalizeBase64(file.content)}`)
    .join("\n---\n");
  return sha256Hex(seed);
}

async function fetchBranchHeadSha({
  owner,
  repo,
  token,
  branch,
}: {
  owner: string;
  repo: string;
  token: string;
  branch: string;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(branch)}`,
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

  const object = parsed.object as Record<string, unknown> | undefined;
  const sha = asString(object?.sha);
  if (!response.ok || !sha) {
    return {
      ok: false,
      status: response.status,
      detail: asString(parsed.message, `No se pudo resolver HEAD para ${branch}.`),
      payload: parsed,
      sha: "",
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "branch_head_loaded",
    payload: parsed,
    sha,
  };
}

async function fetchFileAtRef({
  owner,
  repo,
  token,
  ref,
  filePath,
}: {
  owner: string;
  repo: string;
  token: string;
  ref: string;
  filePath: string;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGithubPath(
      filePath
    )}?ref=${encodeURIComponent(ref)}`,
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

  if (response.status === 404) {
    return {
      ok: false,
      missing: true,
      status: response.status,
      detail: `${filePath} no existe en ${ref}.`,
      payload: parsed,
      file: null as WorkflowPackFile | null,
    };
  }

  const type = asString(parsed.type);
  const content = asString(parsed.content);
  const sha = asString(parsed.sha);
  if (!response.ok || type !== "file" || !content || !sha) {
    return {
      ok: false,
      missing: false,
      status: response.status,
      detail: asString(parsed.message, `No se pudo leer ${filePath} en ${ref}.`),
      payload: parsed,
      file: null as WorkflowPackFile | null,
    };
  }

  return {
    ok: true,
    missing: false,
    status: response.status,
    detail: "file_loaded",
    payload: parsed,
    file: {
      path: filePath,
      content: normalizeBase64(content),
      sha,
    },
  };
}

async function createBranchRef({
  owner,
  repo,
  token,
  branchName,
  headSha,
}: {
  owner: string;
  repo: string;
  token: string;
  branchName: string;
  headSha: string;
}) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "referidos-versioning-edge",
    },
    body: JSON.stringify({
      ref: `refs/heads/${branchName}`,
      sha: headSha,
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
      detail: asString(parsed.message, "No se pudo crear rama temporal."),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "branch_created",
    payload: parsed,
  };
}

async function deleteBranchRef({
  owner,
  repo,
  token,
  branchName,
}: {
  owner: string;
  repo: string;
  token: string;
  branchName: string;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branchName)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
    }
  );

  if (response.status === 404) {
    return { ok: true, status: 404, detail: "branch_not_found" };
  }
  if (response.status === 204) {
    return { ok: true, status: 204, detail: "branch_deleted" };
  }

  const text = await response.text();
  let parsed: Record<string, unknown> = {};
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { raw: text };
  }

  return {
    ok: false,
    status: response.status,
    detail: asString(parsed.message, "No se pudo eliminar rama temporal."),
    payload: parsed,
  };
}

async function upsertFileContent({
  owner,
  repo,
  token,
  branchName,
  path,
  contentBase64,
  previousSha,
  commitMessage,
}: {
  owner: string;
  repo: string;
  token: string;
  branchName: string;
  path: string;
  contentBase64: string;
  previousSha?: string;
  commitMessage: string;
}) {
  const body: Record<string, unknown> = {
    message: commitMessage,
    branch: branchName,
    content: normalizeBase64(contentBase64),
  };
  if (previousSha) {
    body.sha = previousSha;
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGithubPath(path)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "referidos-versioning-edge",
      },
      body: JSON.stringify(body),
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
      detail: asString(parsed.message, `No se pudo actualizar ${path}.`),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    detail: "file_upserted",
    payload: parsed,
  };
}

async function loadWorkflowPackSnapshot({
  owner,
  repo,
  token,
  ref,
  requireAll,
}: {
  owner: string;
  repo: string;
  token: string;
  ref: string;
  requireAll: boolean;
}) {
  const head = await fetchBranchHeadSha({
    owner,
    repo,
    token,
    branch: ref,
  });
  if (!head.ok) {
    return {
      ok: false,
      error: "workflow_pack_branch_head_failed",
      detail: head.detail,
      payload: head.payload,
    };
  }

  const files = new Map<string, WorkflowPackFile>();
  const missingFiles: string[] = [];

  for (const filePath of WORKFLOW_PACK_PATHS) {
    const loaded = await fetchFileAtRef({
      owner,
      repo,
      token,
      ref,
      filePath,
    });
    if (loaded.ok && loaded.file) {
      files.set(filePath, loaded.file);
      continue;
    }
    if (loaded.missing) {
      missingFiles.push(filePath);
      continue;
    }
    return {
      ok: false,
      error: "workflow_pack_file_read_failed",
      detail: loaded.detail,
      payload: {
        ref,
        path: filePath,
        github: loaded.payload,
      },
    };
  }

  if (requireAll && missingFiles.length > 0) {
    return {
      ok: false,
      error: "workflow_pack_source_incomplete",
      detail: `Faltan archivos workflow pack en ${ref}.`,
      payload: {
        ref,
        missing_files: missingFiles,
      },
    };
  }

  const presentFiles = Array.from(files.values());
  const packHash =
    missingFiles.length > 0 || presentFiles.length === 0
      ? ""
      : await computeWorkflowPackHash(presentFiles);

  return {
    ok: true,
    snapshot: {
      ref,
      head_sha: head.sha,
      pack_hash: packHash,
      file_count: presentFiles.length,
      missing_files: missingFiles,
    } as WorkflowPackSnapshot,
    files,
  };
}

async function computeWorkflowPackStatus({
  owner,
  repo,
  token,
  sourceRef,
  stagingBranch,
  productionBranch,
}: {
  owner: string;
  repo: string;
  token: string;
  sourceRef: string;
  stagingBranch: string;
  productionBranch: string;
}) {
  const source = await loadWorkflowPackSnapshot({
    owner,
    repo,
    token,
    ref: sourceRef,
    requireAll: true,
  });
  if (!source.ok || !("snapshot" in source)) return source;

  const staging = await loadWorkflowPackSnapshot({
    owner,
    repo,
    token,
    ref: stagingBranch,
    requireAll: false,
  });
  if (!staging.ok || !("snapshot" in staging)) return staging;

  const production = await loadWorkflowPackSnapshot({
    owner,
    repo,
    token,
    ref: productionBranch,
    requireAll: false,
  });
  if (!production.ok || !("snapshot" in production)) return production;

  const sourceHash = source.snapshot.pack_hash;
  const stagingMatches =
    Boolean(staging.snapshot.pack_hash) &&
    staging.snapshot.missing_files.length === 0 &&
    staging.snapshot.pack_hash === sourceHash;
  const productionMatches =
    Boolean(production.snapshot.pack_hash) &&
    production.snapshot.missing_files.length === 0 &&
    production.snapshot.pack_hash === sourceHash;

  return {
    ok: true,
    data: {
      source: {
        ...source.snapshot,
        matches_source: true,
      },
      staging: {
        ...staging.snapshot,
        matches_source: stagingMatches,
      },
      production: {
        ...production.snapshot,
        matches_source: productionMatches,
      },
      paths: WORKFLOW_PACK_PATHS,
      source_ref: sourceRef,
      staging_ref: stagingBranch,
      production_ref: productionBranch,
    },
    sourceFiles: source.files,
  };
}

async function syncWorkflowPackTarget({
  owner,
  repo,
  token,
  sourceRef,
  sourceFiles,
  targetBranch,
}: {
  owner: string;
  repo: string;
  token: string;
  sourceRef: string;
  sourceFiles: Map<string, WorkflowPackFile>;
  targetBranch: string;
}) {
  const checksRetries = 30;
  const checksDelayMs = 3000;

  const targetSnapshot = await loadWorkflowPackSnapshot({
    owner,
    repo,
    token,
    ref: targetBranch,
    requireAll: false,
  });
  if (!targetSnapshot.ok || !("snapshot" in targetSnapshot)) return targetSnapshot;

  const changedFiles = WORKFLOW_PACK_PATHS.filter((path) => {
    const sourceFile = sourceFiles.get(path);
    const targetFile = targetSnapshot.files.get(path);
    if (!sourceFile) return false;
    if (!targetFile) return true;
    return normalizeBase64(sourceFile.content) !== normalizeBase64(targetFile.content);
  });

  if (changedFiles.length === 0) {
    return {
      ok: true,
      data: {
        target_branch: targetBranch,
        status: "up_to_date",
        changed_files: [],
        pr: null,
        checks: null,
      },
    };
  }

  const head = await fetchBranchHeadSha({
    owner,
    repo,
    token,
    branch: targetBranch,
  });
  if (!head.ok) {
    return {
      ok: false,
      error: "workflow_pack_branch_head_failed",
      detail: head.detail,
      payload: {
        target_branch: targetBranch,
        github: head.payload,
      },
    };
  }

  let tempBranch = "";
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    tempBranch = `versioning-workflow-pack/${targetBranch}-${Date.now()}-${Math.floor(
      Math.random() * 1_000_000
    )}`;
    const created = await createBranchRef({
      owner,
      repo,
      token,
      branchName: tempBranch,
      headSha: head.sha,
    });
    if (created.ok) break;
    if (created.status !== 422 || attempt === 3) {
      return {
        ok: false,
        error: "workflow_pack_temp_branch_create_failed",
        detail: created.detail,
        payload: {
          target_branch: targetBranch,
          github: created.payload,
        },
      };
    }
  }

  try {
    for (const path of changedFiles) {
      const sourceFile = sourceFiles.get(path);
      const targetFile = targetSnapshot.files.get(path);
      if (!sourceFile) continue;
      const updated = await upsertFileContent({
        owner,
        repo,
        token,
        branchName: tempBranch,
        path,
        contentBase64: sourceFile.content,
        previousSha: targetFile?.sha || undefined,
        commitMessage: `[versioning-workflow-pack] sync ${path} from ${sourceRef}`,
      });
      if (!updated.ok) {
        return {
          ok: false,
          error: "workflow_pack_file_upsert_failed",
          detail: updated.detail,
          payload: {
            target_branch: targetBranch,
            temp_branch: tempBranch,
            path,
            github: updated.payload,
          },
        };
      }
    }

    const createdPr = await createPullRequest({
      owner,
      repo,
      token,
      title: `[workflow-pack] sync ${sourceRef} -> ${targetBranch}`,
      body: [
        `Source ref: ${sourceRef}`,
        `Target branch: ${targetBranch}`,
        "",
        `Changed files (${changedFiles.length}):`,
        ...changedFiles.map((filePath) => `- ${filePath}`),
      ].join("\n"),
      headBranch: tempBranch,
      baseBranch: targetBranch,
    });

    if (!createdPr.ok || !createdPr.pr) {
      return {
        ok: false,
        error: "workflow_pack_pr_create_failed",
        detail: createdPr.detail,
        payload: {
          target_branch: targetBranch,
          temp_branch: tempBranch,
          github: createdPr.payload,
        },
      };
    }

    const prLoaded = await waitPullMergeable({
      owner,
      repo,
      token,
      pullNumber: createdPr.pr.number,
    });
    if (!prLoaded.ok || !prLoaded.pr) {
      return {
        ok: false,
        error: "workflow_pack_pr_load_failed",
        detail: prLoaded.detail,
        payload: {
          target_branch: targetBranch,
          temp_branch: tempBranch,
          pr: createdPr.pr,
        },
      };
    }

    const initialChecks = await fetchChecksSummary({
      owner,
      repo,
      token,
      headSha: prLoaded.pr.head_sha,
    });

    if (prLoaded.pr.mergeable === false) {
      return {
        ok: false,
        error: "workflow_pack_pr_conflicts",
        detail: "El PR de workflow pack tiene conflictos.",
        payload: {
          target_branch: targetBranch,
          temp_branch: tempBranch,
          pr: prLoaded.pr,
          checks: initialChecks,
        },
      };
    }

    const checksWait = await waitForRequiredChecksGreen({
      owner,
      repo,
      token,
      headSha: prLoaded.pr.head_sha,
      retries: checksRetries,
      delayMs: checksDelayMs,
    });
    const checks = checksWait.checks;

    if (!checks.required_green) {
      return {
        ok: false,
        error: "workflow_pack_checks_not_green",
        detail: checksWait.timed_out
          ? "Checks obligatorios (lint/test/build) no quedaron en verde antes del timeout para workflow pack."
          : "Checks obligatorios (lint/test/build) no estan en verde para workflow pack.",
        payload: {
          target_branch: targetBranch,
          temp_branch: tempBranch,
          pr: prLoaded.pr,
          checks,
          checks_wait: {
            attempts: checksWait.attempts,
            timed_out: checksWait.timed_out,
            timeout_seconds: Math.floor((checksRetries * checksDelayMs) / 1000),
          },
        },
      };
    }

    const merged = await mergePullRequest({
      owner,
      repo,
      token,
      pullNumber: prLoaded.pr.number,
      expectedHeadSha: prLoaded.pr.head_sha,
    });
    if (!merged.ok) {
      return {
        ok: false,
        error: "workflow_pack_pr_merge_failed",
        detail: merged.detail,
        payload: {
          target_branch: targetBranch,
          temp_branch: tempBranch,
          pr: prLoaded.pr,
          checks,
          merge: merged.payload,
        },
      };
    }

    return {
      ok: true,
      data: {
        target_branch: targetBranch,
        status: "updated",
        changed_files: changedFiles,
        pr: prLoaded.pr,
        checks,
      },
    };
  } finally {
    if (tempBranch) {
      await deleteBranchRef({
        owner,
        repo,
        token,
        branchName: tempBranch,
      });
    }
  }
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
  const sourceRef = asString(
    body.source_ref,
    asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev")
  );
  const syncStaging = asBoolean(body.sync_staging, true);
  const syncProduction = asBoolean(body.sync_prod, true);
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

  if (
    ![
      "sync",
      "refresh_pr",
      "merge_pr",
      "close_pr",
      "comment_pr",
      "workflow_pack_status",
      "workflow_pack_sync",
    ].includes(operation)
  ) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_operation",
        detail:
          "operation permitido: sync|refresh_pr|merge_pr|close_pr|comment_pr|workflow_pack_status|workflow_pack_sync",
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

  const stagingBranchRef = asString(Deno.env.get("DEPLOY_BRANCH_STAGING"), "staging");
  const productionBranchRef = asString(Deno.env.get("DEPLOY_BRANCH_PROD"), "main");

  if (operation === "workflow_pack_status") {
    const status = await computeWorkflowPackStatus({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      sourceRef,
      stagingBranch: stagingBranchRef,
      productionBranch: productionBranchRef,
    });

    if (!status.ok || !("data" in status)) {
      return jsonResponse(
        {
          ok: false,
          error:
            "error" in status && status.error
              ? status.error
              : "workflow_pack_status_failed",
          detail:
            "detail" in status && status.detail
              ? status.detail
              : "No se pudo cargar estado de workflow pack.",
          payload: "payload" in status ? status.payload : null,
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
        ...status.data,
        github_auth_mode: githubAuthMode,
      },
      200,
      cors
    );
  }

  if (operation === "workflow_pack_sync") {
    if (!syncStaging && !syncProduction) {
      return jsonResponse(
        {
          ok: false,
          error: "workflow_pack_no_targets",
          detail: "Debes habilitar al menos un target (staging/prod).",
        },
        400,
        cors
      );
    }

    const baseStatus = await computeWorkflowPackStatus({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      sourceRef,
      stagingBranch: stagingBranchRef,
      productionBranch: productionBranchRef,
    });

    if (!baseStatus.ok || !("data" in baseStatus) || !("sourceFiles" in baseStatus)) {
      return jsonResponse(
        {
          ok: false,
          error:
            "error" in baseStatus && baseStatus.error
              ? baseStatus.error
              : "workflow_pack_status_failed",
          detail:
            "detail" in baseStatus && baseStatus.detail
              ? baseStatus.detail
              : "No se pudo resolver estado base para sync de workflow pack.",
          payload: "payload" in baseStatus ? baseStatus.payload : null,
          github_auth_mode: githubAuthMode,
        },
        502,
        cors
      );
    }

    const targetResults: Record<string, unknown> = {};

    if (syncStaging) {
      const stagingResult = await syncWorkflowPackTarget({
        owner: githubOwner,
        repo: githubRepo,
        token: githubToken,
        sourceRef,
        sourceFiles: baseStatus.sourceFiles,
        targetBranch: stagingBranchRef,
      });

      if (!stagingResult.ok || !("data" in stagingResult)) {
        return jsonResponse(
          {
            ok: false,
            error:
              "error" in stagingResult && stagingResult.error
                ? stagingResult.error
                : "workflow_pack_sync_staging_failed",
            detail:
              "detail" in stagingResult && stagingResult.detail
                ? stagingResult.detail
                : "No se pudo sincronizar workflow pack a staging.",
            payload: {
              targets: {
                staging: "payload" in stagingResult ? stagingResult.payload : null,
              },
            },
            github_auth_mode: githubAuthMode,
          },
          409,
          cors
        );
      }

      targetResults.staging = stagingResult.data;
    }

    if (syncProduction) {
      const productionResult = await syncWorkflowPackTarget({
        owner: githubOwner,
        repo: githubRepo,
        token: githubToken,
        sourceRef,
        sourceFiles: baseStatus.sourceFiles,
        targetBranch: productionBranchRef,
      });

      if (!productionResult.ok || !("data" in productionResult)) {
        return jsonResponse(
          {
            ok: false,
            error:
              "error" in productionResult && productionResult.error
                ? productionResult.error
                : "workflow_pack_sync_production_failed",
            detail:
              "detail" in productionResult && productionResult.detail
                ? productionResult.detail
                : "No se pudo sincronizar workflow pack a production.",
            payload: {
              targets: {
                ...targetResults,
                production:
                  "payload" in productionResult ? productionResult.payload : null,
              },
            },
            github_auth_mode: githubAuthMode,
          },
          409,
          cors
        );
      }

      targetResults.production = productionResult.data;
    }

    const finalStatus = await computeWorkflowPackStatus({
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
      sourceRef,
      stagingBranch: stagingBranchRef,
      productionBranch: productionBranchRef,
    });

    if (!finalStatus.ok || !("data" in finalStatus)) {
      return jsonResponse(
        {
          ok: false,
          error:
            "error" in finalStatus && finalStatus.error
              ? finalStatus.error
              : "workflow_pack_status_failed",
          detail:
            "detail" in finalStatus && finalStatus.detail
              ? finalStatus.detail
              : "No se pudo verificar estado final de workflow pack.",
          payload: {
            targets: targetResults,
            status:
              "payload" in finalStatus
                ? finalStatus.payload
                : null,
          },
          github_auth_mode: githubAuthMode,
        },
        409,
        cors
      );
    }

    return jsonResponse(
      {
        ok: true,
        operation,
        source_ref: sourceRef,
        targets: targetResults,
        status: finalStatus.data,
        github_auth_mode: githubAuthMode,
      },
      200,
      cors
    );
  }

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
