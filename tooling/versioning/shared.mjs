import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export const REPO_ROOT = process.cwd();

const BUMP_RANK = {
  none: 0,
  patch: 1,
  minor: 2,
  major: 3,
};

export function loadComponentMap(mapPath = "versioning/component-map.json") {
  const abs = path.resolve(REPO_ROOT, mapPath);
  const raw = fs.readFileSync(abs, "utf8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data?.products) || data.products.length === 0) {
    throw new Error(`Invalid component map at ${mapPath}: products is required`);
  }
  return data;
}

export function toPosixPath(value) {
  return value.replace(/\\/g, "/").replace(/^\.\//, "");
}

export function unique(values) {
  return [...new Set(values)];
}

export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function hashText(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function hashFiles(files) {
  const hash = crypto.createHash("sha256");
  const sorted = [...files].sort();
  for (const rel of sorted) {
    const abs = path.resolve(REPO_ROOT, rel);
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) continue;
    hash.update(rel);
    hash.update("\0");
    hash.update(fs.readFileSync(abs));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function globToRegExp(glob) {
  let pattern = toPosixPath(glob).replace(/[.+^${}()|[\]\\]/g, "\\$&");
  pattern = pattern.replace(/\*\*/g, "__DOUBLE_STAR__");
  pattern = pattern.replace(/\*/g, "[^/]*");
  pattern = pattern.replace(/__DOUBLE_STAR__/g, ".*");
  return new RegExp(`^${pattern}$`);
}

export function matchesGlob(filePath, glob) {
  const file = toPosixPath(filePath);
  return globToRegExp(glob).test(file);
}

export function matchesAnyGlob(filePath, globs = []) {
  return globs.some((glob) => matchesGlob(filePath, glob));
}

export function listFilesFromRoots(roots, ignoreGlobs = []) {
  const results = [];

  const walk = (absPath) => {
    const rel = toPosixPath(path.relative(REPO_ROOT, absPath));
    if (!rel || rel.startsWith("..")) return;
    if (matchesAnyGlob(rel, ignoreGlobs)) return;

    const stat = fs.statSync(absPath);
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(absPath, { withFileTypes: true });
      for (const entry of entries) {
        walk(path.join(absPath, entry.name));
      }
      return;
    }
    if (stat.isFile()) {
      results.push(rel);
    }
  };

  for (const root of roots) {
    const abs = path.resolve(REPO_ROOT, root);
    if (!fs.existsSync(abs)) continue;
    walk(abs);
  }

  return unique(results).sort();
}

export function runGitCommand(args, fallback = "") {
  try {
    const cmd = `git ${args}`;
    const out = execSync(cmd, { cwd: REPO_ROOT, stdio: ["ignore", "pipe", "pipe"] })
      .toString("utf8")
      .trim();
    return out;
  } catch {
    return fallback;
  }
}

export function getChangedFilesWithStatus(baseRef, headRef) {
  const from = baseRef || "HEAD~1";
  const to = headRef || "HEAD";
  const raw = runGitCommand(`diff --name-status --find-renames ${from}...${to}`);
  if (!raw) return [];

  const rows = [];
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const parts = line.split(/\t+/).map((item) => item.trim());
    if (parts.length < 2) continue;

    const statusToken = String(parts[0] || "").toUpperCase();
    const statusCode = statusToken[0] || "M";

    if (statusCode === "R" && parts.length >= 3) {
      const oldPath = toPosixPath(parts[1]);
      const newPath = toPosixPath(parts[2]);
      if (oldPath) rows.push({ path: oldPath, status: "D" });
      if (newPath) rows.push({ path: newPath, status: "A" });
      continue;
    }

    if (statusCode === "C" && parts.length >= 3) {
      const copiedPath = toPosixPath(parts[2]);
      if (copiedPath) rows.push({ path: copiedPath, status: "A" });
      continue;
    }

    const filePath = toPosixPath(parts[1]);
    if (!filePath) continue;
    const normalizedStatus = ["A", "M", "D"].includes(statusCode) ? statusCode : "M";
    rows.push({ path: filePath, status: normalizedStatus });
  }

  const statusRank = {
    D: 3,
    A: 2,
    M: 1,
  };

  const dedup = new Map();
  for (const row of rows) {
    const prev = dedup.get(row.path);
    if (!prev) {
      dedup.set(row.path, row);
      continue;
    }
    const prevRank = statusRank[prev.status] || 0;
    const nextRank = statusRank[row.status] || 0;
    if (nextRank >= prevRank) dedup.set(row.path, row);
  }

  return [...dedup.values()];
}

export function getChangedFiles(baseRef, headRef) {
  return unique(getChangedFilesWithStatus(baseRef, headRef).map((item) => item.path));
}

export function getCommitMessages(baseRef, headRef) {
  const from = baseRef || "HEAD~1";
  const to = headRef || "HEAD";
  const out = runGitCommand(`log --format=%s%n%b ${from}...${to}`);
  if (!out) return [];
  return out
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function highestBump(...levels) {
  let winner = "none";
  for (const level of levels) {
    if (!level || !(level in BUMP_RANK)) continue;
    if (BUMP_RANK[level] > BUMP_RANK[winner]) winner = level;
  }
  return winner;
}

export function deriveBumpFromLabels(labels = []) {
  const norm = labels.map((item) => item.toLowerCase().trim());
  if (norm.includes("semver:major")) return "major";
  if (norm.includes("semver:minor")) return "minor";
  if (norm.includes("semver:patch")) return "patch";
  if (norm.includes("semver:none")) return "none";
  return null;
}

export function deriveBumpFromCommits(messages = []) {
  let bump = "none";
  for (const msg of messages) {
    const line = msg.toLowerCase();
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

export function computeBumpForProduct({
  changedFiles,
  labels,
  commitMessages,
  docOnlyGlobs,
  contractGlobs,
  minorGlobs,
}) {
  const labelBump = deriveBumpFromLabels(labels);
  const commitBump = deriveBumpFromCommits(commitMessages);
  const allDocOnly =
    changedFiles.length > 0 &&
    changedFiles.every((file) => matchesAnyGlob(file, docOnlyGlobs));

  if (labelBump) {
    return { bumpLevel: labelBump, source: "label", requiresMajorAck: false };
  }

  const hasContractChange = changedFiles.some((file) => matchesAnyGlob(file, contractGlobs));
  if (hasContractChange) {
    const isMajorByCommit = commitBump === "major";
    return {
      bumpLevel: "major",
      source: isMajorByCommit ? "commit" : "contract",
      requiresMajorAck: !isMajorByCommit,
    };
  }

  if (allDocOnly) {
    return { bumpLevel: "none", source: "doc-only", requiresMajorAck: false };
  }

  const hasMinorArea = changedFiles.some((file) => matchesAnyGlob(file, minorGlobs));
  if (hasMinorArea) {
    return {
      bumpLevel: highestBump("minor", commitBump),
      source: "minor-area",
      requiresMajorAck: false,
    };
  }

  return {
    bumpLevel: highestBump("patch", commitBump),
    source: commitBump === "none" ? "default-patch" : "commit",
    requiresMajorAck: false,
  };
}

export function parseSemver(value) {
  const match = String(value || "").trim().match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(`Invalid semver "${value}"`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

export function formatSemver({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`;
}

export function bumpSemver(currentSemver, bumpLevel) {
  const base = parseSemver(currentSemver);
  if (bumpLevel === "major") {
    // Pre-1.0 strategy: treat major as next minor (0.x -> 0.(x+1).0).
    if (base.major === 0) {
      return formatSemver({ major: 0, minor: base.minor + 1, patch: 0 });
    }
    return formatSemver({ major: base.major + 1, minor: 0, patch: 0 });
  }
  if (bumpLevel === "minor") {
    // Pre-1.0 strategy: treat minor as patch (0.x.y -> 0.x.(y+1)).
    if (base.major === 0) {
      return formatSemver({ major: 0, minor: base.minor, patch: base.patch + 1 });
    }
    return formatSemver({ major: base.major, minor: base.minor + 1, patch: 0 });
  }
  if (bumpLevel === "patch") {
    return formatSemver({ major: base.major, minor: base.minor, patch: base.patch + 1 });
  }
  return formatSemver(base);
}
