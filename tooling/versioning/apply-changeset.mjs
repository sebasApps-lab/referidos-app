#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  REPO_ROOT,
  bumpSemver,
  parseSemver,
  toPosixPath,
} from "./shared.mjs";
import { getSupabaseAdminClient, mustData, mustSingle } from "./supabase-client.mjs";

const EMPTY_COMPONENT_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

function parseArgs(argv) {
  const out = {
    input: process.env.VERSIONING_INPUT || "versioning/out/changeset.json",
    env: process.env.VERSIONING_TARGET_ENV || "dev",
    baseline: process.env.VERSIONING_BASELINE_VERSION || "0.1.0",
    createRelease: process.env.VERSIONING_CREATE_RELEASE !== "0",
    releaseStatus: process.env.VERSIONING_RELEASE_STATUS || "validated",
    productFilter: (process.env.VERSIONING_PRODUCT_FILTER || "").trim(),
    overrideSemver: (process.env.VERSIONING_OVERRIDE_SEMVER || "").trim(),
    releaseNotes: (process.env.VERSIONING_RELEASE_NOTES || "").trim(),
  };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--input") out.input = argv[i + 1];
    if (token === "--env") out.env = argv[i + 1];
    if (token === "--baseline") out.baseline = argv[i + 1];
    if (token === "--no-release") out.createRelease = false;
    if (token === "--release-status") out.releaseStatus = argv[i + 1];
    if (token === "--product") out.productFilter = (argv[i + 1] || "").trim();
    if (token === "--override-semver") out.overrideSemver = (argv[i + 1] || "").trim();
    if (token === "--release-notes") out.releaseNotes = (argv[i + 1] || "").trim();
  }
  return out;
}

function semverLabel(major, minor, patch) {
  return `${major}.${minor}.${patch}`;
}

function compareSemver(a, b) {
  const aParsed = parseSemver(a);
  const bParsed = parseSemver(b);
  if (aParsed.major !== bParsed.major) return aParsed.major - bParsed.major;
  if (aParsed.minor !== bParsed.minor) return aParsed.minor - bParsed.minor;
  return aParsed.patch - bParsed.patch;
}

async function getLatestRelease(supabase, tenantId, productId, envId) {
  const rows = await mustData(
    supabase
      .from("version_releases")
      .select("id, semver_major, semver_minor, semver_patch, created_at")
      .eq("tenant_id", tenantId)
      .eq("product_id", productId)
      .eq("env_id", envId)
      .is("prerelease_tag", null)
      .order("semver_major", { ascending: false })
      .order("semver_minor", { ascending: false })
      .order("semver_patch", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1),
    "get latest release"
  );
  return rows[0] || null;
}

async function upsertComponent({
  supabase,
  tenantId,
  productId,
  component,
}) {
  const rows = await mustData(
    supabase
      .from("version_components")
      .upsert(
        {
          tenant_id: tenantId,
          product_id: productId,
          component_key: component.componentKey,
          component_type: component.componentType,
          display_name: component.displayName,
          criticality: "normal",
          active: true,
          metadata: {
            source: "versioning-script",
          },
        },
        { onConflict: "tenant_id,product_id,component_key" }
      )
      .select("id, component_key, component_type, display_name")
      .limit(1),
    `upsert component ${component.componentKey}`
  );
  return rows[0];
}

async function getLatestComponentRevision(supabase, tenantId, componentId) {
  const rows = await mustData(
    supabase
      .from("version_component_revisions")
      .select("id, revision_no, content_hash")
      .eq("tenant_id", tenantId)
      .eq("component_id", componentId)
      .order("revision_no", { ascending: false })
      .limit(1),
    `get latest revision ${componentId}`
  );
  return rows[0] || null;
}

async function createComponentRevision({
  supabase,
  tenantId,
  componentId,
  latestRevision,
  component,
  branch,
  commitSha,
}) {
  const normalizedChangeKind = String(component.changeKind || "modified").toLowerCase();
  const lifecycleAction = !latestRevision
    ? "created"
    : normalizedChangeKind === "deleted" || component.contentHash === EMPTY_COMPONENT_HASH
      ? "deleted"
      : normalizedChangeKind === "added"
        ? "created"
        : "updated";
  const nextRevisionNo = (latestRevision?.revision_no || 0) + 1;
  const rows = await mustData(
    supabase
      .from("version_component_revisions")
      .insert({
        tenant_id: tenantId,
        component_id: componentId,
        revision_no: nextRevisionNo,
        content_hash: component.contentHash,
        source_commit_sha: commitSha,
        source_branch: branch,
        bump_level: component.bumpLevel || "patch",
        change_summary: `Auto ${lifecycleAction} from ${branch}`,
        metadata: {
          lifecycle_action: lifecycleAction,
          change_kind: normalizedChangeKind,
          changed_paths: component.changedPaths || [],
        },
        created_by: "ci",
      })
      .select("id, revision_no, content_hash")
      .limit(1),
    `create revision ${component.componentKey}`
  );
  return rows[0];
}

async function createReleaseSnapshot({
  supabase,
  tenantId,
  releaseId,
  previousReleaseId,
  productId,
  changedRevisionMap,
}) {
  const snapshotMap = new Map();

  if (previousReleaseId) {
    const previousRows = await mustData(
      supabase
        .from("version_release_components")
        .select("component_id, component_revision_id")
        .eq("tenant_id", tenantId)
        .eq("release_id", previousReleaseId),
      "load previous snapshot"
    );
    previousRows.forEach((row) => {
      snapshotMap.set(row.component_id, row.component_revision_id);
    });
  } else {
    const latestRows = await mustData(
      supabase
        .from("version_component_latest_revisions")
        .select("component_id, revision_id")
        .eq("tenant_id", tenantId)
        .eq("product_id", productId),
      "load latest component revisions"
    );
    latestRows.forEach((row) => {
      snapshotMap.set(row.component_id, row.revision_id);
    });
  }

  for (const [componentId, revisionId] of changedRevisionMap.entries()) {
    snapshotMap.set(componentId, revisionId);
  }

  const inserts = [];
  for (const [componentId, revisionId] of snapshotMap.entries()) {
    inserts.push({
      tenant_id: tenantId,
      release_id: releaseId,
      component_id: componentId,
      component_revision_id: revisionId,
    });
  }

  if (inserts.length === 0) return 0;

  await mustData(
    supabase
      .from("version_release_components")
      .insert(inserts),
    "insert release snapshot"
  );
  return inserts.length;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputAbs = path.resolve(REPO_ROOT, args.input);
  if (!fs.existsSync(inputAbs)) {
    throw new Error(`Changeset input not found: ${toPosixPath(path.relative(REPO_ROOT, inputAbs))}`);
  }

  const changeset = JSON.parse(fs.readFileSync(inputAbs, "utf8"));
  const supabase = getSupabaseAdminClient();

  const targetEnv = await mustSingle(
    supabase
      .from("version_environments")
      .select("id, tenant_id, env_key")
      .eq("env_key", args.env)
      .limit(1)
      .single(),
      `find environment ${args.env}`
  );

  let processedProducts = 0;

  for (const productChange of changeset.products || []) {
    if (args.productFilter && productChange.productKey !== args.productFilter) {
      continue;
    }

    processedProducts += 1;

    const product = await mustSingle(
      supabase
        .from("version_products")
        .select("id, tenant_id, product_key")
        .eq("product_key", productChange.productKey)
        .eq("tenant_id", targetEnv.tenant_id)
        .limit(1)
        .single(),
      `find product ${productChange.productKey}`
    );

    const createdChangeset = await mustSingle(
      supabase
        .from("version_changesets")
        .insert({
          tenant_id: product.tenant_id,
          product_id: product.id,
          env_id: targetEnv.id,
          branch: changeset.branch || "unknown",
          commit_sha: changeset.commitSha || "unknown",
          pr_number: null,
          status: "detected",
          bump_level: productChange.bumpLevel || "patch",
          notes: `auto detect source=${productChange.bumpSource || "unknown"}`,
          created_by: "ci",
        })
        .select("id")
        .single(),
      `create changeset ${productChange.productKey}`
    );

    const changedRevisionMap = new Map();

    for (const component of productChange.componentCandidates || []) {
      const componentRow = await upsertComponent({
        supabase,
        tenantId: product.tenant_id,
        productId: product.id,
        component,
      });

      const latestRevision = await getLatestComponentRevision(
        supabase,
        product.tenant_id,
        componentRow.id
      );

      let nextRevision = latestRevision;
      if (!latestRevision || latestRevision.content_hash !== component.contentHash) {
        nextRevision = await createComponentRevision({
          supabase,
          tenantId: product.tenant_id,
          componentId: componentRow.id,
          latestRevision,
          component,
          branch: changeset.branch || "unknown",
          commitSha: changeset.commitSha || "unknown",
        });
      }

      if (nextRevision) {
        changedRevisionMap.set(componentRow.id, nextRevision.id);
      }

      await mustData(
        supabase
          .from("version_changeset_items")
          .upsert(
            {
              tenant_id: product.tenant_id,
              changeset_id: createdChangeset.id,
              component_id: componentRow.id,
              previous_revision_id: latestRevision?.id || null,
              next_revision_id: nextRevision?.id || latestRevision?.id,
              changed_paths: component.changedPaths || [],
              metadata: {
                component_type: component.componentType,
              },
            },
            { onConflict: "changeset_id,component_id" }
          ),
        `upsert changeset item ${component.componentKey}`
      );
    }

    let createdReleaseId = null;
    let createdReleaseVersion = null;

    if (args.createRelease) {
      const latestRelease = await getLatestRelease(
        supabase,
        product.tenant_id,
        product.id,
        targetEnv.id
      );

      const isInitialRelease = !latestRelease;
      const currentSemver = latestRelease
        ? semverLabel(
            latestRelease.semver_major,
            latestRelease.semver_minor,
            latestRelease.semver_patch
          )
        : args.baseline;
      const suggestedSemver = isInitialRelease
        ? currentSemver
        : bumpSemver(currentSemver, productChange.bumpLevel || "patch");
      let nextSemver = suggestedSemver;
      if (args.overrideSemver) {
        parseSemver(args.overrideSemver);
        if (latestRelease && compareSemver(args.overrideSemver, currentSemver) <= 0) {
          throw new Error(
            `Invalid override semver ${args.overrideSemver} for ${product.product_key}: must be greater than ${currentSemver}`
          );
        }
        nextSemver = args.overrideSemver;
      }
      const nextParts = parseSemver(nextSemver);

      const shouldCreate =
        isInitialRelease ||
        (
          changedRevisionMap.size > 0 &&
          (
            productChange.bumpLevel !== "none" ||
            currentSemver !== nextSemver
          )
        );

      if (shouldCreate) {
        const createdRelease = await mustSingle(
          supabase
            .from("version_releases")
            .insert({
              tenant_id: product.tenant_id,
              product_id: product.id,
              env_id: targetEnv.id,
              semver_major: nextParts.major,
              semver_minor: nextParts.minor,
              semver_patch: nextParts.patch,
              prerelease_tag: null,
              prerelease_no: null,
              status: args.releaseStatus,
              source_changeset_id: createdChangeset.id,
              source_commit_sha: changeset.commitSha || "unknown",
              metadata: {
                bump_source: productChange.bumpSource || "unknown",
                detected_bump_level: productChange.bumpLevel || "patch",
                suggested_semver: suggestedSemver,
                applied_semver: nextSemver,
                override_semver: args.overrideSemver || null,
                release_notes: args.releaseNotes || null,
              },
              created_by: "ci",
            })
            .select("id, semver_major, semver_minor, semver_patch")
            .single(),
          `create release ${product.product_key}`
        );

        createdReleaseId = createdRelease.id;
        createdReleaseVersion = semverLabel(
          createdRelease.semver_major,
          createdRelease.semver_minor,
          createdRelease.semver_patch
        );

        await createReleaseSnapshot({
          supabase,
          tenantId: product.tenant_id,
          releaseId: createdRelease.id,
          previousReleaseId: latestRelease?.id || null,
          productId: product.id,
          changedRevisionMap,
        });
      }
    }

    await mustData(
      supabase
        .from("version_changesets")
        .update({
          status: createdReleaseId ? "applied" : "validated",
          notes: createdReleaseId
            ? `release=${createdReleaseVersion} id=${createdReleaseId} override=${args.overrideSemver || "-"} notes=${args.releaseNotes || "-"}`
            : "validated without release creation",
        })
        .eq("id", createdChangeset.id),
      `update changeset status ${createdChangeset.id}`
    );

    console.log(
      `VERSIONING_APPLIED product=${product.product_key} components=${changedRevisionMap.size} release=${createdReleaseVersion || "-"}`
    );
  }

  if (processedProducts === 0) {
    const filterLabel = args.productFilter || "none";
    console.log(`VERSIONING_APPLY_NO_PRODUCTS filter=${filterLabel}`);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
