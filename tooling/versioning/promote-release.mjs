#!/usr/bin/env node
import { getSupabaseAdminClient, mustSingle } from "./supabase-client.mjs";

function parseArgs(argv) {
  const out = {
    product: process.env.VERSIONING_PRODUCT || "",
    fromEnv: process.env.VERSIONING_FROM_ENV || "dev",
    toEnv: process.env.VERSIONING_TO_ENV || "staging",
    semver: process.env.VERSIONING_SEMVER || "",
    actor: process.env.VERSIONING_ACTOR || "ci",
    notes: process.env.VERSIONING_NOTES || null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--product") out.product = argv[i + 1];
    if (token === "--from") out.fromEnv = argv[i + 1];
    if (token === "--to") out.toEnv = argv[i + 1];
    if (token === "--semver") out.semver = argv[i + 1];
    if (token === "--actor") out.actor = argv[i + 1];
    if (token === "--notes") out.notes = argv[i + 1];
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.product) throw new Error("Missing --product (or VERSIONING_PRODUCT)");
  if (!args.semver) throw new Error("Missing --semver (or VERSIONING_SEMVER)");

  const supabase = getSupabaseAdminClient();
  const releaseId = await mustSingle(
    supabase.rpc("versioning_promote_release", {
      p_product_key: args.product,
      p_from_env: args.fromEnv,
      p_to_env: args.toEnv,
      p_semver: args.semver,
      p_actor: args.actor,
      p_notes: args.notes,
    }),
    "promote release"
  );

  console.log(
    `VERSIONING_PROMOTED product=${args.product} from=${args.fromEnv} to=${args.toEnv} semver=${args.semver} release_id=${releaseId}`
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
