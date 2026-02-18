#!/usr/bin/env node
import {
  hashFiles,
  listFilesFromRoots,
  loadComponentMap,
  matchesAnyGlob,
} from "./shared.mjs";
import { getSupabaseAdminClient, mustData, mustSingle } from "./supabase-client.mjs";

function parseArgs(argv) {
  const out = {
    map: process.env.VERSIONING_COMPONENT_MAP || "versioning/component-map.json",
    baseline: process.env.VERSIONING_BASELINE_VERSION || "0.1.0",
    envs: String(process.env.VERSIONING_ENVS || "dev,staging,prod")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    forceSnapshot: process.env.VERSIONING_FORCE_SNAPSHOT === "1",
    products: String(
      process.env.VERSIONING_BOOTSTRAP_PRODUCTS || process.env.VERSIONING_PRODUCT_FILTER || ""
    )
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
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
    if (token === "--products") {
      out.products = String(argv[i + 1] || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    if (token === "--product") {
      const next = String(argv[i + 1] || "").trim();
      if (next) out.products.push(next);
    }
  }
  out.products = [...new Set(out.products)];
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

async function upsertComponentAndRevision({
  supabase,
  tenantId,
  productId,
  component,
  baseline,
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
        source_commit_sha: `baseline-${baseline}`,
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const map = loadComponentMap(args.map);
  const supabase = getSupabaseAdminClient();
  const selectedProductKeys = new Set(args.products || []);

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

  const targetProducts = map.products.filter(
    (product) => selectedProductKeys.size === 0 || selectedProductKeys.has(product.productKey)
  );

  if (targetProducts.length === 0) {
    throw new Error(
      `No products matched for bootstrap. requested=${args.products.join(",") || "none"}`
    );
  }

  for (const product of targetProducts) {
    const productRow = await mustSingle(
      supabase
        .from("version_products")
        .select("id, tenant_id, product_key, metadata")
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

    for (const component of allComponents) {
      const { componentId, revisionId } = await upsertComponentAndRevision({
        supabase,
        tenantId: productRow.tenant_id,
        productId: productRow.id,
        component,
        baseline: args.baseline,
      });
      if (!componentId || !revisionId) {
        throw new Error(`invalid revision state for component ${component.componentKey}`);
      }
    }

    const currentMetadata =
      productRow.metadata && typeof productRow.metadata === "object" && !Array.isArray(productRow.metadata)
        ? productRow.metadata
        : {};
    const currentVersioning =
      currentMetadata.versioning && typeof currentMetadata.versioning === "object" && !Array.isArray(currentMetadata.versioning)
        ? currentMetadata.versioning
        : {};

    await mustData(
      supabase
        .from("version_products")
        .update({
          metadata: {
            ...currentMetadata,
            versioning: {
              ...currentVersioning,
              initialized: true,
              initial_baseline_semver: args.baseline,
              initialized_at: new Date().toISOString(),
              bootstrap_source: "bootstrap-baseline",
            },
          },
        })
        .eq("tenant_id", productRow.tenant_id)
        .eq("id", productRow.id),
      `mark product initialized ${product.productKey}`
    );

    console.log(
      `VERSIONING_BASELINE_BOOTSTRAPPED product=${product.productKey} components=${allComponents.length}`
    );
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
