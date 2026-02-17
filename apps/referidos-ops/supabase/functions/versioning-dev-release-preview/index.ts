import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;
type BumpLevel = "none" | "patch" | "minor" | "major";
type ChangedFile = { path: string; status: "A" | "M" | "D" };

const EMPTY_COMPONENT_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const BUMP_RANK: Record<BumpLevel, number> = {
  none: 0,
  patch: 1,
  minor: 2,
  major: 3,
};

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function toPosixPath(value: string) {
  return String(value || "").replace(/\\/g, "/").replace(/^\.\//, "");
}

function normalizeGlob(glob: string) {
  return toPosixPath(glob).replace(/\/+$/, "");
}

function globToRegExp(glob: string) {
  let pattern = normalizeGlob(glob).replace(/[.+^${}()|[\]\\]/g, "\\$&");
  pattern = pattern.replace(/\*\*/g, "__DOUBLE_STAR__");
  pattern = pattern.replace(/\*/g, "[^/]*");
  pattern = pattern.replace(/__DOUBLE_STAR__/g, ".*");
  return new RegExp(`^${pattern}$`);
}

function matchesGlob(filePath: string, glob: string) {
  return globToRegExp(glob).test(toPosixPath(filePath));
}

function matchesAnyGlob(filePath: string, globs: string[] = []) {
  return (globs || []).some((glob) => matchesGlob(filePath, glob));
}

function rootContainsFile(root: string, filePath: string) {
  const normalizedRoot = normalizeGlob(root);
  const normalizedFile = toPosixPath(filePath);
  if (!normalizedRoot) return false;
  if (normalizedRoot === normalizedFile) return true;
  return normalizedFile.startsWith(`${normalizedRoot}/`);
}

function highestBump(...levels: BumpLevel[]) {
  let winner: BumpLevel = "none";
  for (const level of levels) {
    if (!level || !(level in BUMP_RANK)) continue;
    if (BUMP_RANK[level] > BUMP_RANK[winner]) winner = level;
  }
  return winner;
}

function deriveBumpFromCommits(messages: string[]) {
  let bump: BumpLevel = "none";
  for (const rawMessage of messages || []) {
    const line = String(rawMessage || "").toLowerCase();
    if (!line) continue;
    if (line.includes("breaking change") || /[a-z]+!:\s*/.test(line)) {
      bump = highestBump(bump, "major");
      continue;
    }
    if (line.startsWith("feat:")) {
      bump = highestBump(bump, "minor");
      continue;
    }
    if (
      line.startsWith("fix:") ||
      line.startsWith("perf:") ||
      line.startsWith("refactor:")
    ) {
      bump = highestBump(bump, "patch");
    }
  }
  return bump;
}

function parseSemver(value: string) {
  const match = String(value || "").trim().match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function semverToString(semver: { major: number; minor: number; patch: number }) {
  return `${semver.major}.${semver.minor}.${semver.patch}`;
}

function bumpSemver(currentSemver: string, bumpLevel: BumpLevel) {
  const parsed = parseSemver(currentSemver);
  if (!parsed) return currentSemver;
  if (bumpLevel === "major") return semverToString({ major: parsed.major + 1, minor: 0, patch: 0 });
  if (bumpLevel === "minor") return semverToString({ major: parsed.major, minor: parsed.minor + 1, patch: 0 });
  if (bumpLevel === "patch") return semverToString({ major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1 });
  return semverToString(parsed);
}

function normalizeStatus(status: string): "A" | "M" | "D" {
  const value = String(status || "").toLowerCase();
  if (value === "added") return "A";
  if (value === "removed") return "D";
  if (value === "renamed") return "M";
  if (value === "copied") return "A";
  return "M";
}

function dedupeChangedFiles(rows: ChangedFile[]) {
  const rank: Record<string, number> = { D: 3, A: 2, M: 1 };
  const map = new Map<string, ChangedFile>();
  for (const row of rows) {
    const prev = map.get(row.path);
    if (!prev) {
      map.set(row.path, row);
      continue;
    }
    if ((rank[row.status] || 0) >= (rank[prev.status] || 0)) {
      map.set(row.path, row);
    }
  }
  return [...map.values()];
}

function filterByRoots(files: ChangedFile[], roots: string[]) {
  return files.filter((row) => (roots || []).some((root) => rootContainsFile(root, row.path)));
}

function computeBumpForProduct({
  changedFiles,
  commitMessages,
  docOnlyGlobs,
  contractGlobs,
  minorGlobs,
}: {
  changedFiles: ChangedFile[];
  commitMessages: string[];
  docOnlyGlobs: string[];
  contractGlobs: string[];
  minorGlobs: string[];
}) {
  const changedPaths = changedFiles.map((item) => item.path);
  const commitBump = deriveBumpFromCommits(commitMessages);
  const allDocOnly =
    changedPaths.length > 0 &&
    changedPaths.every((file) => matchesAnyGlob(file, docOnlyGlobs || []));

  const contractHits = changedPaths.filter((file) => matchesAnyGlob(file, contractGlobs || []));
  if (contractHits.length > 0) {
    const isMajorByCommit = commitBump === "major";
    return {
      bumpLevel: "major" as BumpLevel,
      source: isMajorByCommit ? "commit" : "contract",
      requiresMajorAck: !isMajorByCommit,
      contractHits,
      minorHits: [] as string[],
      docOnly: false,
    };
  }

  if (allDocOnly) {
    return {
      bumpLevel: "none" as BumpLevel,
      source: "doc-only",
      requiresMajorAck: false,
      contractHits: [] as string[],
      minorHits: [] as string[],
      docOnly: true,
    };
  }

  const minorHits = changedPaths.filter((file) => matchesAnyGlob(file, minorGlobs || []));
  if (minorHits.length > 0) {
    return {
      bumpLevel: highestBump("minor", commitBump),
      source: "minor-area",
      requiresMajorAck: false,
      contractHits: [] as string[],
      minorHits,
      docOnly: false,
    };
  }

  return {
    bumpLevel: highestBump("patch", commitBump),
    source: commitBump === "none" ? "default-patch" : "commit",
    requiresMajorAck: false,
    contractHits: [] as string[],
    minorHits: [] as string[],
    docOnly: false,
  };
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

async function githubJson(url: string, token: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "referidos-versioning-preview",
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
    const detail = asString(parsed.message, asString(parsed.raw, "github_request_failed"));
    throw new Error(`github_error_${response.status}: ${detail}`);
  }
  return parsed;
}

async function loadComponentMapFromGithub({
  owner,
  repo,
  ref,
  token,
}: {
  owner: string;
  repo: string;
  ref: string;
  token: string;
}) {
  const url =
    `https://api.github.com/repos/${owner}/${repo}/contents/versioning/component-map.json?ref=${encodeURIComponent(ref)}`;
  const json = await githubJson(url, token);
  const content = asString(json.content);
  const encoding = asString(json.encoding);
  if (encoding !== "base64" || !content) {
    throw new Error("component_map_not_available");
  }
  const decoded = atob(content.replace(/\n/g, ""));
  const map = JSON.parse(decoded);
  if (!Array.isArray(map?.products)) {
    throw new Error("invalid_component_map");
  }
  return map as {
    baselineVersion?: string;
    globalIgnore?: string[];
    docOnlyGlobs?: string[];
    products: Array<{
      productKey: string;
      roots?: string[];
      contractGlobs?: string[];
      minorGlobs?: string[];
    }>;
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

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const internalProxyCall = isInternalProxyAuthorized(req);

  if (!internalProxyCall) {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);

    const { user, error: authErr } = await requireAuthUser(token);
    if (authErr || !user) return jsonResponse({ ok: false, error: "unauthorized" }, 401, cors);

    const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
    if (profileErr || !usuario) {
      return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
    }
    if (usuario.role !== "admin") {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }
  }

  const productKey = asString(body.product_key).toLowerCase();
  if (!productKey || !isValidProductKey(productKey)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_product_key",
        detail: "product_key requerido: referidos_app | prelaunch_web | android_app",
      },
      400,
      cors
    );
  }

  const owner = asString(Deno.env.get("GITHUB_DEPLOY_OWNER"));
  const repo = asString(Deno.env.get("GITHUB_DEPLOY_REPO"));
  const tokenGithub = asString(Deno.env.get("GITHUB_DEPLOY_TOKEN"));
  const defaultDevRef = asString(
    Deno.env.get("VERSIONING_DEV_RELEASE_REF"),
    asString(Deno.env.get("DEPLOY_BRANCH_DEV"), "dev")
  );
  const requestedRef = asString(body.ref, defaultDevRef);

  if (!owner || !repo || !tokenGithub) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_github_env",
        detail: "Missing GITHUB_DEPLOY_OWNER/GITHUB_DEPLOY_REPO/GITHUB_DEPLOY_TOKEN",
      },
      500,
      cors
    );
  }

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
  if (!allowRefs.has(ref)) {
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

  try {
    const commitsResponse = await githubJson(
      `https://api.github.com/repos/${owner}/${repo}/commits?sha=${encodeURIComponent(ref)}&per_page=6`,
      tokenGithub
    );
    const commits = Array.isArray(commitsResponse) ? commitsResponse as JsonObject[] : [];
    if (commits.length < 2) {
      throw new Error("not_enough_commits_on_ref");
    }

    const headSha = asString(commits[0]?.sha);
    const baseSha = asString(commits[1]?.sha);
    if (!headSha || !baseSha) throw new Error("unable_to_resolve_commit_range");

    const compare = await githubJson(
      `https://api.github.com/repos/${owner}/${repo}/compare/${baseSha}...${headSha}`,
      tokenGithub
    );

    const compareFiles = Array.isArray(compare.files) ? compare.files as JsonObject[] : [];
    const changedFilesRaw: ChangedFile[] = [];
    for (const file of compareFiles) {
      const status = normalizeStatus(asString(file.status));
      const filename = toPosixPath(asString(file.filename));
      const previousFilename = toPosixPath(asString(file.previous_filename));

      if (asString(file.status) === "renamed" && previousFilename && filename) {
        changedFilesRaw.push({ path: previousFilename, status: "D" });
        changedFilesRaw.push({ path: filename, status: "A" });
      } else if (filename) {
        changedFilesRaw.push({ path: filename, status });
      }
    }
    const changedFiles = dedupeChangedFiles(changedFilesRaw);

    const map = await loadComponentMapFromGithub({
      owner,
      repo,
      ref: headSha,
      token: tokenGithub,
    });

    const productMap = (map.products || []).find((item) => item.productKey === productKey);
    if (!productMap) {
      throw new Error(`product_not_in_component_map:${productKey}`);
    }

    const globalIgnore = map.globalIgnore || [];
    const filtered = changedFiles.filter((row) => !matchesAnyGlob(row.path, globalIgnore));
    const inProduct = filterByRoots(filtered, productMap.roots || []);

    const compareCommits = Array.isArray(compare.commits) ? compare.commits as JsonObject[] : [];
    const commitMessages = compareCommits
      .map((item) => asString((item.commit as JsonObject)?.message))
      .filter(Boolean);

    const bumpInfo = computeBumpForProduct({
      changedFiles: inProduct,
      commitMessages,
      docOnlyGlobs: map.docOnlyGlobs || [],
      contractGlobs: productMap.contractGlobs || [],
      minorGlobs: productMap.minorGlobs || [],
    });

    const { data: latestRows, error: latestError } = await supabaseAdmin
      .from("version_releases_labeled")
      .select("semver_major, semver_minor, semver_patch, version_label")
      .eq("product_key", productKey)
      .eq("env_key", "dev")
      .order("semver_major", { ascending: false })
      .order("semver_minor", { ascending: false })
      .order("semver_patch", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1);
    if (latestError) throw new Error(latestError.message);

    const latestRow = latestRows?.[0] || null;
    const baseline = asString(map.baselineVersion, "0.5.0");
    const isInitialRelease = !latestRow;
    const currentSemver = latestRow
      ? `${latestRow.semver_major}.${latestRow.semver_minor}.${latestRow.semver_patch}`
      : baseline;
    const suggestedSemver = isInitialRelease
      ? baseline
      : bumpSemver(currentSemver, bumpInfo.bumpLevel);

    const hasChanges = inProduct.length > 0;
    const shouldCreateRelease =
      isInitialRelease ||
      (hasChanges &&
        (bumpInfo.bumpLevel !== "none" ||
          currentSemver !== suggestedSemver));

    return jsonResponse(
      {
        ok: true,
        product_key: productKey,
        ref,
        compare_base_sha: baseSha,
        compare_head_sha: headSha,
        current_semver: currentSemver,
        suggested_semver: suggestedSemver,
        suggested_bump: isInitialRelease ? "none" : bumpInfo.bumpLevel,
        suggestion_source: isInitialRelease ? "initial-baseline" : bumpInfo.source,
        requires_major_ack: isInitialRelease ? false : bumpInfo.requiresMajorAck,
        should_create_release: shouldCreateRelease,
        initial_release_pending: isInitialRelease,
        changed_files_count: inProduct.length,
        changed_files: inProduct.slice(0, 60),
        contract_hits: bumpInfo.contractHits.slice(0, 20),
        minor_hits: bumpInfo.minorHits.slice(0, 20),
        doc_only: bumpInfo.docOnly,
        commit_messages: commitMessages.slice(0, 10),
        hints: {
          empty_hash_for_deleted_components: EMPTY_COMPONENT_HASH,
        },
      },
      200,
      cors
    );
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: "dev_release_preview_failed",
        detail: error instanceof Error ? error.message : "preview_failed",
      },
      500,
      cors
    );
  }
});
