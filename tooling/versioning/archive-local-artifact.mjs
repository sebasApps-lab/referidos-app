#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT, parseSemver, toPosixPath } from "./shared.mjs";

function parseArgs(argv) {
  const out = {
    action: "archive",
    product: "",
    semver: "",
    sha: "",
    sourceDir: "",
    env: "",
    status: "",
    notes: "",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--action") out.action = String(argv[i + 1] || "").trim().toLowerCase();
    if (token === "--product") out.product = String(argv[i + 1] || "").trim();
    if (token === "--semver") out.semver = String(argv[i + 1] || "").trim();
    if (token === "--sha") out.sha = String(argv[i + 1] || "").trim();
    if (token === "--source-dir") out.sourceDir = String(argv[i + 1] || "").trim();
    if (token === "--env") out.env = String(argv[i + 1] || "").trim().toLowerCase();
    if (token === "--status") out.status = String(argv[i + 1] || "").trim().toLowerCase();
    if (token === "--notes") out.notes = String(argv[i + 1] || "").trim();
  }

  return out;
}

function ensureValidArgs(args) {
  if (!args.product) throw new Error("Missing --product");
  if (!args.semver) throw new Error("Missing --semver");
  if (!args.sha) throw new Error("Missing --sha");

  parseSemver(args.semver);

  if (args.env && !["dev", "staging", "prod"].includes(args.env)) {
    throw new Error("Invalid --env (allowed: dev|staging|prod)");
  }

  if (args.action === "archive" && !args.sourceDir) {
    throw new Error("Missing --source-dir for action=archive");
  }

  if (!["archive", "mark"].includes(args.action)) {
    throw new Error("Invalid --action (allowed: archive|mark)");
  }
}

function sanitizePathSegment(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "na";
}

function readRegistry(registryPath) {
  if (!fs.existsSync(registryPath)) {
    return { schema_version: 1, items: [] };
  }
  const parsed = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.items)) {
    return { schema_version: 1, items: [] };
  }
  return parsed;
}

function writeRegistry(registryPath, payload) {
  fs.mkdirSync(path.dirname(registryPath), { recursive: true });
  fs.writeFileSync(registryPath, `${JSON.stringify(payload, null, 2)}\n`);
}

function countFilesRecursive(absDir) {
  let files = 0;
  const walk = (current) => {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const next = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(next);
      } else if (entry.isFile()) {
        files += 1;
      }
    }
  };
  walk(absDir);
  return files;
}

function upsertRecord({ registry, key, payload }) {
  const idx = registry.items.findIndex((row) => row.key === key);
  if (idx >= 0) {
    registry.items[idx] = {
      ...registry.items[idx],
      ...payload,
      updated_at: new Date().toISOString(),
    };
    return registry.items[idx];
  }

  const created = {
    key,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    environments: {},
    ...payload,
  };
  registry.items.push(created);
  return created;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  ensureValidArgs(args);

  const artifactKey = `${sanitizePathSegment(args.product)}@${args.semver}+${args.sha.slice(0, 12)}`;
  const artifactsRoot = path.resolve(REPO_ROOT, "versioning/local-artifacts");
  const registryPath = path.join(artifactsRoot, "registry.json");
  const registry = readRegistry(registryPath);

  const basePayload = {
    product: args.product,
    semver: args.semver,
    source_commit_sha: args.sha,
    notes: args.notes || undefined,
  };

  const record = upsertRecord({
    registry,
    key: artifactKey,
    payload: basePayload,
  });

  if (args.action === "archive") {
    const sourceDirAbs = path.resolve(REPO_ROOT, args.sourceDir);
    if (!fs.existsSync(sourceDirAbs) || !fs.statSync(sourceDirAbs).isDirectory()) {
      throw new Error(`Invalid --source-dir: ${toPosixPath(path.relative(REPO_ROOT, sourceDirAbs))}`);
    }

    const targetDir = path.join(artifactsRoot, sanitizePathSegment(args.product), artifactKey, "bundle");
    fs.rmSync(targetDir, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(targetDir), { recursive: true });
    fs.cpSync(sourceDirAbs, targetDir, { recursive: true });

    record.bundle_path = toPosixPath(path.relative(REPO_ROOT, targetDir));
    record.file_count = countFilesRecursive(targetDir);
  }

  if (args.env) {
    if (!record.environments || typeof record.environments !== "object") {
      record.environments = {};
    }
    record.environments[args.env] = {
      status: args.status || (args.action === "archive" ? "archived" : "updated"),
      updated_at: new Date().toISOString(),
    };
  }

  writeRegistry(registryPath, registry);

  console.log(
    `LOCAL_ARTIFACT_${args.action.toUpperCase()} key=${artifactKey} registry=${toPosixPath(path.relative(REPO_ROOT, registryPath))}`
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});

