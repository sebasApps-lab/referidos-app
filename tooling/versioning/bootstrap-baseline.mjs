#!/usr/bin/env node
import {
  hashFiles,
  listFilesFromRoots,
  loadComponentMap,
  matchesAnyGlob,
  parseSemver,
} from "./shared.mjs";
import { getSupabaseAdminClient, mustData, mustSingle } from "./supabase-client.mjs";

function parseArgs(argv) {
  const out = {
    map: process.env.VERSIONING_COMPONENT_MAP || "versioning/component-map.json",
    baseline: process.env.VERSIONING_BASELINE_VERSION || "0.5.0",
    envs: String(process.env.VERSIONING_ENVS || "dev,staging,prod")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    forceSnapshot: process.env.VERSIONING_FORCE_SNAPSHOT === "1",
  };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--map") out.map = argv[i + 1];
    if (token === "--baseline") out.baseline = argv[i + 1];
    if (token === "--envs") {
      out.envs = String(argv[i + 1] || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    if (token === "--force-snapshot") out.forceSnapshot = true;
  }
  return out;
}

function buildFileComponents(productKey, files) {
  return files.map((file) => ({
    componentKey: `${productKey}.file.${file}`,
    componentType: "file",
    displayName: file,
    componentFiles: [file],
  }));
}

function buildLogicalComponents(product, files) {
  const components = [];
  for (const logical of product.logicalComponents || []) {
    const matched = files.filter((file) => matchesAnyGlob(file, logical.globs || []));
    components.push({
      componentKey: logical.componentKey,
      componentType: logical.componentType || "system",
      displayName: logical.displayName || logical.componentKey,
      componentFiles: matched,
    });
  }
  return components;
}

async function ensureRelease({
  supabase,
  tenantId,
  productId,
  envId,
  baseline,
}) {
  const semver = parseSemver(baseline);
  const existing = await mustData(
    supabase
      .from("version_releases")
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("product_id", productId)
      .eq("env_id", envId)
      .eq("semver_major", semver.major)
      .eq("semver_minor", semver.minor)
      .eq("semver_patch", semver.patch)
      .is("prerelease_tag", null)
      .limit(1),
    "ensure release select"
  );

  if (existing[0]) return existing[0].id;

  const created = await mustSingle(
    supabase
      .from("version_releases")
      .insert({
        tenant_id: tenantId,
        product_id: productId,
        env_id: envId,
        semver_major: semver.major,
        semver_minor: semver.minor,
        semver_patch: semver.patch,
        status: "deployed",
        source_commit_sha: "baseline-0.5.0",
        created_by: "bootstrap",
      })
      .select("id")
      .single(),
    "ensure release insert"
  );
  return created.id;
}

async function upsertComponentAndRevision({
  supabase,
  tenantId,
  productId,
  component,
}) {
  const componentRow = await mustSingle(
    supabase
      .from("version_components")
      .upsert(
        {
          tenant_id: tenantId,
          product_id: productId,
          component_key: component.componentKey,
          component_type: component.componentType,
          display_name: component.displayName,
          active: true,
          criticality: "normal",
          metadata: { source: "bootstrap-baseline" },
        },
        { onConflict: "tenant_id,product_id,component_key" }
      )
      .select("id")
      .single(),
    `upsert component ${component.componentKey}`
  );

  const latestRevisionRows = await mustData(
    supabase
      .from("version_component_revisions")
      .select("id, revision_no, content_hash")
      .eq("tenant_id", tenantId)
      .eq("component_id", componentRow.id)
      .order("revision_no", { ascending: false })
      .limit(1),
    `select latest revision ${component.componentKey}`
  );

  const latest = latestRevisionRows[0] || null;
  const nextHash = hashFiles(component.componentFiles || []);
  if (latest && latest.content_hash === nextHash) {
    return { componentId: componentRow.id, revisionId: latest.id };
  }

  const createdRevision = await mustSingle(
    supabase
      .from("version_component_revisions")
      .insert({
        tenant_id: tenantId,
        component_id: componentRow.id,
        revision_no: (latest?.revision_no || 0) + 1,
        content_hash: nextHash,
        source_commit_sha: "baseline-0.5.0",
        source_branch: "bootstrap",
        bump_level: "patch",
        change_summary: "Baseline import",
        created_by: "bootstrap",
      })
      .select("id")
      .single(),
    `insert revision ${component.componentKey}`
  );

  return { componentId: componentRow.id, revisionId: createdRevision.id };
}

async function replaceSnapshot({
  supabase,
  tenantId,
  releaseId,
  revisionMap,
}) {
  await mustData(
    supabase
      .from("version_release_components")
      .delete()
      .eq("tenant_id", tenantId)
      .eq("release_id", releaseId),
    "delete previous snapshot"
  );

  const rows = [];
  for (const [componentId, revisionId] of revisionMap.entries()) {
    rows.push({
      tenant_id: tenantId,
      release_id: releaseId,
      component_id: componentId,
      component_revision_id: revisionId,
    });
  }

  const chunkSize = 500;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    await mustData(
      supabase.from("version_release_components").insert(chunk),
      `insert snapshot chunk ${i / chunkSize + 1}`
    );
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const map = loadComponentMap(args.map);
  const supabase = getSupabaseAdminClient();

  const envRows = await mustData(
    supabase
      .from("version_environments")
      .select("id, tenant_id, env_key")
      .in("env_key", args.envs),
    "load environments"
  );
  if (envRows.length === 0) {
    throw new Error("No environments found for bootstrap");
  }

  for (const product of map.products) {
    const productRow = await mustSingle(
      supabase
        .from("version_products")
        .select("id, tenant_id, product_key")
        .eq("product_key", product.productKey)
        .eq("tenant_id", envRows[0].tenant_id)
        .single(),
      `load product ${product.productKey}`
    );

    const inventory = listFilesFromRoots(product.roots || [], [
      ...(map.globalIgnore || []),
      ...(product.ignoreGlobs || []),
    ]);
    const fileComponents = buildFileComponents(product.productKey, inventory);
    const logicalComponents = buildLogicalComponents(product, inventory);
    const allComponents = [...fileComponents, ...logicalComponents].filter(
      (component) => component.componentFiles.length > 0
    );

    const revisionMap = new Map();
    for (const component of allComponents) {
      const { componentId, revisionId } = await upsertComponentAndRevision({
        supabase,
        tenantId: productRow.tenant_id,
        productId: productRow.id,
        component,
      });
      revisionMap.set(componentId, revisionId);
    }

    for (const envRow of envRows) {
      const releaseId = await ensureRelease({
        supabase,
        tenantId: productRow.tenant_id,
        productId: productRow.id,
        envId: envRow.id,
        baseline: args.baseline,
      });

      const existingSnapshotRows = await mustData(
        supabase
          .from("version_release_components")
          .select("id")
          .eq("tenant_id", productRow.tenant_id)
          .eq("release_id", releaseId),
        "snapshot rows"
      );
      const needsSnapshot =
        args.forceSnapshot || existingSnapshotRows.length === 0;

      if (needsSnapshot) {
        await replaceSnapshot({
          supabase,
          tenantId: productRow.tenant_id,
          releaseId,
          revisionMap,
        });
      }
    }

    console.log(
      `VERSIONING_BASELINE_BOOTSTRAPPED product=${product.productKey} components=${allComponents.length}`
    );
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
