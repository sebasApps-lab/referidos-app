#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  REPO_ROOT,
  computeBumpForProduct,
  ensureDir,
  getChangedFilesWithStatus,
  getCommitMessages,
  hashFiles,
  loadComponentMap,
  matchesAnyGlob,
  runGitCommand,
  toPosixPath,
  unique,
  listFilesFromRoots,
} from "./shared.mjs";

function parseArgs(argv) {
  const out = {
    base: process.env.VERSIONING_BASE_REF || "origin/main",
    head: process.env.VERSIONING_HEAD_REF || "HEAD",
    output: process.env.VERSIONING_OUTPUT || "versioning/out/changeset.json",
    map: process.env.VERSIONING_COMPONENT_MAP || "versioning/component-map.json",
    productFilter: (process.env.VERSIONING_PRODUCT_FILTER || "").trim(),
    strictUnmapped: process.env.VERSIONING_STRICT_UNMAPPED !== "0",
    strictMajorAck: process.env.VERSIONING_STRICT_MAJOR_ACK !== "0",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--base") out.base = argv[i + 1];
    if (token === "--head") out.head = argv[i + 1];
    if (token === "--output") out.output = argv[i + 1];
    if (token === "--map") out.map = argv[i + 1];
    if (token === "--product") out.productFilter = (argv[i + 1] || "").trim();
    if (token === "--no-strict-unmapped") out.strictUnmapped = false;
    if (token === "--no-strict-major-ack") out.strictMajorAck = false;
  }

  return out;
}

function rootContainsFile(root, file) {
  const normalizedRoot = toPosixPath(root).replace(/\/+$/, "");
  const normalizedFile = toPosixPath(file);
  if (normalizedRoot === normalizedFile) return true;
  return normalizedFile.startsWith(`${normalizedRoot}/`);
}

function buildFileComponent(productKey, relFile) {
  return {
    componentKey: `${productKey}.file.${relFile}`,
    componentType: "file",
    displayName: relFile,
    componentFiles: [relFile],
  };
}

function componentFromLogical(logical, files) {
  return {
    componentKey: logical.componentKey,
    componentType: logical.componentType || "system",
    displayName: logical.displayName || logical.componentKey,
    componentFiles: files,
  };
}

function classifyFileChange(status) {
  if (status === "A") return "added";
  if (status === "D") return "deleted";
  return "modified";
}

function classifyLogicalChange(statuses = []) {
  if (!statuses.length) return "modified";
  const set = new Set(statuses);
  if (set.size === 1 && set.has("D")) return "deleted";
  if (set.size === 1 && set.has("A")) return "added";
  if (set.has("D") && !set.has("A")) return "deleted";
  if (set.has("A") && !set.has("D") && !set.has("M")) return "added";
  return "modified";
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const map = loadComponentMap(args.map);
  const labels = String(process.env.PR_LABELS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const changedFromGit = getChangedFilesWithStatus(args.base, args.head);
  const filteredChanges = changedFromGit.filter(
    (item) => !matchesAnyGlob(item.path, map.globalIgnore || [])
  );
  const changedFiles = filteredChanges.map((item) => item.path);
  const changedStatusByPath = new Map(
    filteredChanges.map((item) => [item.path, item.status])
  );
  const commitMessages = getCommitMessages(args.base, args.head);
  const branch = runGitCommand("rev-parse --abbrev-ref HEAD", "unknown");
  const commitSha = runGitCommand("rev-parse HEAD", "unknown");

  const productResults = [];
  const mappedFiles = new Set();
  const selectedProducts = args.productFilter
    ? (map.products || []).filter((product) => product.productKey === args.productFilter)
    : (map.products || []);

  if (args.productFilter && selectedProducts.length === 0) {
    throw new Error(`Invalid --product filter "${args.productFilter}" for component map`);
  }

  for (const product of selectedProducts) {
    const productRoots = product.roots || [];
    const productChangedFiles = changedFiles.filter((file) =>
      productRoots.some((root) => rootContainsFile(root, file))
    );
    if (productChangedFiles.length === 0) continue;

    const bump = computeBumpForProduct({
      changedFiles: productChangedFiles,
      labels,
      commitMessages,
      docOnlyGlobs: map.docOnlyGlobs || [],
      contractGlobs: product.contractGlobs || [],
      minorGlobs: product.minorGlobs || [],
    });

    const productInventory = listFilesFromRoots(productRoots, [
      ...(map.globalIgnore || []),
      ...(product.ignoreGlobs || []),
    ]);

    const componentCandidates = [];

    for (const file of productChangedFiles) {
      mappedFiles.add(file);
      componentCandidates.push({
        ...buildFileComponent(product.productKey, file),
        changeKind: classifyFileChange(changedStatusByPath.get(file)),
      });
    }

    for (const logical of product.logicalComponents || []) {
      const logicalFiles = productInventory.filter((file) =>
        matchesAnyGlob(file, logical.globs || [])
      );
      const touched = productChangedFiles.some((file) => matchesAnyGlob(file, logical.globs || []));
      if (!touched) continue;
      const touchedFiles = productChangedFiles.filter((file) =>
        matchesAnyGlob(file, logical.globs || [])
      );
      componentCandidates.push({
        ...componentFromLogical(logical, logicalFiles),
        changeKind: classifyLogicalChange(
          touchedFiles
            .map((file) => changedStatusByPath.get(file))
            .filter(Boolean)
        ),
      });
      logicalFiles.forEach((file) => mappedFiles.add(file));
    }

    const deduped = [];
    const seenKeys = new Set();
    for (const component of componentCandidates) {
      if (seenKeys.has(component.componentKey)) continue;
      seenKeys.add(component.componentKey);
      deduped.push({
        ...component,
        changedPaths: productChangedFiles.filter((file) =>
          component.componentKey.startsWith(`${product.productKey}.file.`)
            ? component.componentFiles.includes(file)
            : matchesAnyGlob(file, (product.logicalComponents || [])
              .find((item) => item.componentKey === component.componentKey)?.globs || [])
        ),
        changeKind: component.changeKind || "modified",
      });
    }

    const withHashes = deduped.map((component) => ({
      ...component,
      contentHash: hashFiles(component.componentFiles),
      bumpLevel: bump.bumpLevel,
    }));

    productResults.push({
      productKey: product.productKey,
      displayName: product.displayName || product.productKey,
      bumpLevel: bump.bumpLevel,
      bumpSource: bump.source,
      requiresMajorAck: bump.requiresMajorAck,
      changedFiles: productChangedFiles,
      componentCandidates: withHashes,
    });
  }

  const selectedRoots = unique(
    selectedProducts.flatMap((product) => product.roots || [])
  );
  const changedFilesForUnmapped = args.productFilter
    ? changedFiles.filter((file) => selectedRoots.some((root) => rootContainsFile(root, file)))
    : changedFiles;

  const unmappedFiles = changedFilesForUnmapped.filter((file) => {
    if (mappedFiles.has(file)) return false;
    if (matchesAnyGlob(file, map.docOnlyGlobs || [])) return false;
    return !matchesAnyGlob(file, map.globalIgnore || []);
  });

  if (args.strictUnmapped && unmappedFiles.length > 0) {
    console.error("VERSIONING_UNMAPPED_FILES");
    unmappedFiles.forEach((file) => console.error(` - ${file}`));
    process.exit(1);
  }

  if (args.strictMajorAck) {
    const missingMajorAck = productResults.filter(
      (result) => result.requiresMajorAck && !labels.includes("semver:major")
    );
    if (missingMajorAck.length > 0) {
      console.error("VERSIONING_MAJOR_ACK_REQUIRED");
      missingMajorAck.forEach((item) => {
        console.error(` - ${item.productKey}: contract/public changes require PR label semver:major`);
      });
      process.exit(1);
    }
  }

  const payload = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    baseRef: args.base,
    headRef: args.head,
    branch,
    commitSha,
    labels,
    productFilter: args.productFilter || null,
    changedFiles: unique(changedFiles),
    unmappedFiles,
    products: productResults,
  };

  const outAbs = path.resolve(REPO_ROOT, args.output);
  ensureDir(path.dirname(outAbs));
  fs.writeFileSync(outAbs, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log("VERSIONING_CHANGESET_WRITTEN");
  console.log(`output=${toPosixPath(path.relative(REPO_ROOT, outAbs))}`);
  console.log(`products=${productResults.length}`);
  console.log(`product_filter=${args.productFilter || "-"}`);
  console.log(`changed_files=${changedFiles.length}`);
  console.log(`unmapped_files=${unmappedFiles.length}`);
}

main();
