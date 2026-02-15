#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  REPO_ROOT,
  computeBumpForProduct,
  ensureDir,
  getChangedFiles,
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
    strictUnmapped: process.env.VERSIONING_STRICT_UNMAPPED !== "0",
    strictMajorAck: process.env.VERSIONING_STRICT_MAJOR_ACK !== "0",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--base") out.base = argv[i + 1];
    if (token === "--head") out.head = argv[i + 1];
    if (token === "--output") out.output = argv[i + 1];
    if (token === "--map") out.map = argv[i + 1];
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

function main() {
  const args = parseArgs(process.argv.slice(2));
  const map = loadComponentMap(args.map);
  const labels = String(process.env.PR_LABELS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const changedFromGit = getChangedFiles(args.base, args.head);
  const changedFiles = changedFromGit.filter((file) => !matchesAnyGlob(file, map.globalIgnore || []));
  const commitMessages = getCommitMessages(args.base, args.head);
  const branch = runGitCommand("rev-parse --abbrev-ref HEAD", "unknown");
  const commitSha = runGitCommand("rev-parse HEAD", "unknown");

  const productResults = [];
  const mappedFiles = new Set();

  for (const product of map.products) {
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
      componentCandidates.push(buildFileComponent(product.productKey, file));
    }

    for (const logical of product.logicalComponents || []) {
      const logicalFiles = productInventory.filter((file) =>
        matchesAnyGlob(file, logical.globs || [])
      );
      const touched = productChangedFiles.some((file) => matchesAnyGlob(file, logical.globs || []));
      if (!touched) continue;
      componentCandidates.push(componentFromLogical(logical, logicalFiles));
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

  const unmappedFiles = changedFiles.filter((file) => {
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
  console.log(`changed_files=${changedFiles.length}`);
  console.log(`unmapped_files=${unmappedFiles.length}`);
}

main();
