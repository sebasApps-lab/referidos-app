import { supabase } from "../../../lib/supabaseClient";

const bySemverDesc = (a, b) => {
  const aMajor = Number(a.semver_major || 0);
  const bMajor = Number(b.semver_major || 0);
  if (aMajor !== bMajor) return bMajor - aMajor;
  const aMinor = Number(a.semver_minor || 0);
  const bMinor = Number(b.semver_minor || 0);
  if (aMinor !== bMinor) return bMinor - aMinor;
  const aPatch = Number(a.semver_patch || 0);
  const bPatch = Number(b.semver_patch || 0);
  if (aPatch !== bPatch) return bPatch - aPatch;
  return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
};

export function formatVersionLabel(row) {
  const base = `${row.semver_major}.${row.semver_minor}.${row.semver_patch}`;
  if (!row.prerelease_tag) return base;
  return `${base}-${row.prerelease_tag}.${row.prerelease_no}`;
}

export async function fetchVersioningCatalog() {
  const [{ data: products, error: productsError }, { data: envs, error: envsError }] =
    await Promise.all([
      supabase
        .from("version_products")
        .select("id, product_key, name, active, created_at")
        .order("name", { ascending: true }),
      supabase
        .from("version_environments")
        .select("id, env_key, name, active, created_at")
        .order("env_key", { ascending: true }),
    ]);

  if (productsError) throw new Error(productsError.message);
  if (envsError) throw new Error(envsError.message);

  return {
    products: products || [],
    environments: envs || [],
  };
}

export async function fetchLatestReleases(envKey = "") {
  let query = supabase
    .from("version_latest_releases")
    .select("*")
    .order("product_name", { ascending: true });

  if (envKey) {
    query = query.eq("env_key", envKey);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function fetchReleasesByProductEnv(productKey, envKey) {
  let query = supabase
    .from("version_releases_labeled")
    .select("*")
    .eq("product_key", productKey)
    .order("semver_major", { ascending: false })
    .order("semver_minor", { ascending: false })
    .order("semver_patch", { ascending: false })
    .order("created_at", { ascending: false });

  if (envKey) query = query.eq("env_key", envKey);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data || []).sort(bySemverDesc);
}

export async function fetchReleaseComponents(releaseId) {
  const { data, error } = await supabase
    .from("version_release_components_labeled")
    .select("*")
    .eq("release_id", releaseId)
    .order("component_key", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function fetchComponentHistory(componentId, limit = 50) {
  const { data, error } = await supabase
    .from("version_component_revisions")
    .select("id, revision_no, content_hash, source_commit_sha, source_branch, bump_level, created_at")
    .eq("component_id", componentId)
    .order("revision_no", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function fetchDrift(productKey, envA = "staging", envB = "prod") {
  const { data, error } = await supabase.rpc("versioning_get_drift", {
    p_product_key: productKey,
    p_env_a: envA,
    p_env_b: envB,
  });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function promoteRelease({
  productKey,
  fromEnv,
  toEnv,
  semver,
  actor = "admin-ui",
  notes = "",
}) {
  const { data, error } = await supabase.rpc("versioning_promote_release", {
    p_product_key: productKey,
    p_from_env: fromEnv,
    p_to_env: toEnv,
    p_semver: semver,
    p_actor: actor,
    p_notes: notes || null,
  });
  if (error) throw new Error(error.message);
  return data;
}
