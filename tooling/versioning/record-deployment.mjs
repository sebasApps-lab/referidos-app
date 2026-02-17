#!/usr/bin/env node
import { getSupabaseAdminClient, mustData, mustSingle } from "./supabase-client.mjs";
import { parseSemver } from "./shared.mjs";

function parseArgs(argv) {
  const out = {
    product: process.env.VERSIONING_PRODUCT || "",
    env: process.env.VERSIONING_TARGET_ENV || "dev",
    semver: process.env.VERSIONING_SEMVER || "",
    deploymentId: process.env.VERSIONING_DEPLOYMENT_ID || "",
    status: process.env.VERSIONING_DEPLOYMENT_STATUS || "success",
    logsUrl: process.env.VERSIONING_DEPLOYMENT_LOGS_URL || null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--product") out.product = argv[i + 1];
    if (token === "--env") out.env = argv[i + 1];
    if (token === "--semver") out.semver = argv[i + 1];
    if (token === "--deployment-id") out.deploymentId = argv[i + 1];
    if (token === "--status") out.status = argv[i + 1];
    if (token === "--logs-url") out.logsUrl = argv[i + 1];
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.product) throw new Error("Missing --product");
  if (!args.semver) throw new Error("Missing --semver");
  if (!args.deploymentId) throw new Error("Missing --deployment-id");
  if (String(args.env || "").toLowerCase() === "dev") {
    throw new Error("record-deployment: env dev no admite estado deployed");
  }

  const semver = parseSemver(args.semver);
  const supabase = getSupabaseAdminClient();

  const env = await mustSingle(
    supabase
      .from("version_environments")
      .select("id, tenant_id")
      .eq("env_key", args.env)
      .single(),
    "load env"
  );
  const product = await mustSingle(
    supabase
      .from("version_products")
      .select("id")
      .eq("tenant_id", env.tenant_id)
      .eq("product_key", args.product)
      .single(),
    "load product"
  );

  const releaseRows = await mustData(
    supabase
      .from("version_releases")
      .select("id")
      .eq("tenant_id", env.tenant_id)
      .eq("product_id", product.id)
      .eq("env_id", env.id)
      .eq("semver_major", semver.major)
      .eq("semver_minor", semver.minor)
      .eq("semver_patch", semver.patch)
      .is("prerelease_tag", null)
      .order("created_at", { ascending: false })
      .limit(1),
    "load release"
  );
  if (!releaseRows[0]) {
    throw new Error(`Release ${args.semver} not found for ${args.product}/${args.env}`);
  }
  const releaseId = releaseRows[0].id;

  await mustData(
    supabase
      .from("version_deployments")
      .insert({
        tenant_id: env.tenant_id,
        release_id: releaseId,
        env_id: env.id,
        deployment_id: args.deploymentId,
        status: args.status,
        logs_url: args.logsUrl,
        finished_at: new Date().toISOString(),
      }),
    "insert deployment"
  );

  if (args.status === "success") {
    await mustData(
      supabase
        .from("version_releases")
        .update({ status: "deployed" })
        .eq("id", releaseId),
      "mark release deployed"
    );
  }

  console.log(
    `VERSIONING_DEPLOYMENT_RECORDED product=${args.product} env=${args.env} semver=${args.semver} status=${args.status}`
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
