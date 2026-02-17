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

export async function fetchPromotionHistory({ productId = "", limit = 50 } = {}) {
  let query = supabase
    .from("version_promotions")
    .select("id, product_id, from_release_id, to_release_id, promoted_by, notes, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (productId) query = query.eq("product_id", productId);

  const { data: promotions, error: promotionsError } = await query;
  if (promotionsError) throw new Error(promotionsError.message);

  const rows = promotions || [];
  const releaseIds = Array.from(
    new Set(
      rows
        .flatMap((row) => [row.from_release_id, row.to_release_id])
        .filter(Boolean)
    )
  );

  const releasesById = new Map();
  if (releaseIds.length > 0) {
    const { data: releases, error: releasesError } = await supabase
      .from("version_releases_labeled")
      .select("id, product_key, env_key, version_label")
      .in("id", releaseIds);
    if (releasesError) throw new Error(releasesError.message);
    for (const release of releases || []) {
      releasesById.set(release.id, release);
    }
  }

  return rows.map((row) => {
    const fromRelease = releasesById.get(row.from_release_id) || null;
    const toRelease = releasesById.get(row.to_release_id) || null;
    return {
      ...row,
      product_key: toRelease?.product_key || fromRelease?.product_key || null,
      from_env_key: fromRelease?.env_key || null,
      from_version_label: fromRelease?.version_label || null,
      to_env_key: toRelease?.env_key || null,
      to_version_label: toRelease?.version_label || null,
    };
  });
}

export async function fetchDeployRequests({ envKey = "", status = "", productKey = "" } = {}) {
  let query = supabase
    .from("version_deploy_requests_labeled")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (envKey) query = query.eq("env_key", envKey);
  if (status) query = query.eq("status", status);
  if (productKey) query = query.eq("product_key", productKey);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function requestDeploy({
  productKey,
  envKey,
  semver,
  actor = "admin-ui",
  notes = "",
  metadata = {},
}) {
  const normalizedEnv = String(envKey || "").trim().toLowerCase();
  if (!["staging", "prod"].includes(normalizedEnv)) {
    throw new Error("Deploy solo permitido en staging o prod.");
  }

  const { data, error } = await supabase.rpc("versioning_request_deploy", {
    p_product_key: productKey,
    p_env_key: normalizedEnv,
    p_semver: semver,
    p_actor: actor,
    p_notes: notes || null,
    p_metadata: metadata || {},
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function approveDeployRequest({
  requestId,
  actor = "admin-ui",
  forceAdminOverride = false,
  notes = "",
}) {
  const { data, error } = await supabase.rpc("versioning_approve_deploy_request", {
    p_request_id: requestId,
    p_actor: actor,
    p_force_admin_override: forceAdminOverride,
    p_notes: notes || null,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function rejectDeployRequest({
  requestId,
  actor = "admin-ui",
  reason = "",
}) {
  const { data, error } = await supabase.rpc("versioning_reject_deploy_request", {
    p_request_id: requestId,
    p_actor: actor,
    p_reason: reason || null,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function executeDeployRequest({
  requestId,
  actor = "admin-ui",
  status = "success",
  deploymentId = "",
  logsUrl = "",
  metadata = {},
}) {
  const { data, error } = await supabase.rpc("versioning_execute_deploy_request", {
    p_request_id: requestId,
    p_actor: actor,
    p_status: status,
    p_deployment_id: deploymentId || null,
    p_logs_url: logsUrl || null,
    p_metadata: metadata || {},
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function triggerDeployPipeline({
  requestId,
  forceAdminOverride = false,
  skipMerge = false,
  syncRelease = false,
  syncOnly = false,
  sourceBranch = "",
  targetBranch = "",
}) {
  const { data, error } = await supabase.functions.invoke("versioning-deploy-execute", {
    body: {
      request_id: requestId,
      force_admin_override: forceAdminOverride,
      skip_merge: skipMerge,
      sync_release: syncRelease,
      sync_only: syncOnly,
      source_branch: sourceBranch || null,
      target_branch: targetBranch || null,
    },
  });

  if (error) throw new Error(error.message || "No se pudo ejecutar deploy pipeline.");
  if (!data?.ok) {
    const pipelineError = new Error(
      data?.detail || data?.error || "No se pudo ejecutar deploy pipeline."
    );
    pipelineError.code = data?.error || "deploy_pipeline_failed";
    pipelineError.payload = data;
    throw pipelineError;
  }
  return data;
}

export async function createDevRelease({
  productKey = "",
  ref = "dev",
}) {
  const normalizedProduct = String(productKey || "").trim();
  const normalizedRef = String(ref || "dev").trim() || "dev";

  const { data, error } = await supabase.functions.invoke("versioning-dev-release-create", {
    body: {
      product_key: normalizedProduct || null,
      ref: normalizedRef,
    },
  });

  if (error) throw new Error(error.message || "No se pudo crear release de development.");
  if (!data?.ok) {
    throw new Error(data?.detail || data?.error || "No se pudo crear release de development.");
  }
  return data;
}
