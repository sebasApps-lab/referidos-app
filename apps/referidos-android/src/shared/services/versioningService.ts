import { supabase } from "@shared/services/mobileApi";

const bySemverDesc = (a: any, b: any) => {
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

export function formatVersionLabel(row: any) {
  const base = `${row.semver_major}.${row.semver_minor}.${row.semver_patch}`;
  if (!row.prerelease_tag) return base;
  return `${base}-${row.prerelease_tag}.${row.prerelease_no}`;
}

async function invokeVersioningOps(action: string, payload: Record<string, any> = {}) {
  const { data, error } = await supabase.functions.invoke("versioning-ops-proxy", {
    body: {
      action,
      payload,
    },
  });

  if (error) {
    let errorData = data && typeof data === "object" ? data : null;
    const context: any = error?.context || null;
    if (!errorData && context) {
      try {
        if (typeof context.clone === "function" && typeof context.clone().json === "function") {
          errorData = await context.clone().json();
        } else if (typeof context.json === "function") {
          errorData = await context.json();
        }
      } catch {
        errorData = null;
      }
    }

    const proxyError: any = new Error(
      errorData?.detail ||
        errorData?.error ||
        error.message ||
        "No se pudo contactar versioning-ops-proxy.",
    );
    proxyError.code = errorData?.error || "versioning_proxy_failed";
    proxyError.payload = errorData?.payload || errorData || null;
    throw proxyError;
  }
  if (!data?.ok) {
    const proxyError: any = new Error(
      data?.detail || data?.error || "versioning-ops-proxy failed",
    );
    proxyError.code = data?.error || "versioning_proxy_failed";
    proxyError.payload = data?.payload || null;
    throw proxyError;
  }

  return data.data;
}

export async function fetchVersioningCatalog() {
  return invokeVersioningOps("fetch_versioning_catalog");
}

export async function fetchLatestReleases(envKey = "") {
  return invokeVersioningOps("fetch_latest_releases", {
    envKey,
  });
}

export async function fetchReleasesByProductEnv(productKey: string, envKey = "") {
  const data = await invokeVersioningOps("fetch_releases_by_product_env", {
    productKey,
    envKey,
  });
  return (data || []).sort(bySemverDesc);
}

export async function fetchReleaseComponents(releaseId: string) {
  return invokeVersioningOps("fetch_release_components", {
    releaseId,
  });
}

export async function fetchReleaseSnapshot({
  releaseId = "",
  productKey = "",
  envKey = "",
  semver = "",
} = {}) {
  return invokeVersioningOps("fetch_release_snapshot", {
    releaseId,
    productKey,
    envKey,
    semver,
  });
}

export async function fetchComponentHistory(componentId: string, limit = 50) {
  return invokeVersioningOps("fetch_component_history", {
    componentId,
    limit,
  });
}

export async function fetchComponentCatalog(productKey: string) {
  return invokeVersioningOps("fetch_component_catalog", {
    productKey,
  });
}

export async function fetchDrift(productKey: string, envA = "staging", envB = "prod") {
  return invokeVersioningOps("fetch_drift", {
    productKey,
    envA,
    envB,
  });
}

export async function fetchDeployRequests({
  envKey = "",
  status = "",
  productKey = "",
} = {}) {
  return invokeVersioningOps("fetch_deploy_requests", {
    envKey,
    status,
    productKey,
  });
}

export async function fetchPromotionHistory({ productId = "", limit = 50 } = {}) {
  return invokeVersioningOps("fetch_promotion_history", {
    productId,
    limit,
  });
}

export async function fetchBuildTimeline({
  productKey = "",
  envKey = "",
  semver = "",
  releaseId = "",
  eventType = "",
  status = "",
  limit = 120,
} = {}) {
  return invokeVersioningOps("fetch_build_timeline", {
    productKey,
    envKey,
    semver,
    releaseId,
    eventType,
    status,
    limit,
  });
}

export async function fetchReleaseArtifacts({
  productKey = "",
  limit = 120,
} = {}) {
  return invokeVersioningOps("fetch_release_artifacts", {
    productKey,
    limit,
  });
}

export async function fetchLocalArtifactNodes({
  onlyActive = false,
  limit = 200,
} = {}) {
  return invokeVersioningOps("fetch_local_artifact_nodes", {
    onlyActive,
    limit,
  });
}

export async function upsertLocalArtifactNode({
  nodeKey,
  displayName,
  runnerLabel,
  osName = "",
  active = true,
  metadata = {},
}: {
  nodeKey: string;
  displayName: string;
  runnerLabel: string;
  osName?: string;
  active?: boolean;
  metadata?: Record<string, any>;
}) {
  return invokeVersioningOps("upsert_local_artifact_node", {
    nodeKey,
    displayName,
    runnerLabel,
    osName,
    active,
    metadata,
  });
}

export async function fetchLocalArtifactSyncRequests({
  productKey = "",
  envKey = "",
  status = "",
  nodeKey = "",
  limit = 120,
} = {}) {
  return invokeVersioningOps("fetch_local_artifact_sync_requests", {
    productKey,
    envKey,
    status,
    nodeKey,
    limit,
  });
}

export async function requestLocalArtifactSync({
  releaseId = "",
  productKey = "",
  envKey = "",
  semver = "",
  nodeKey,
  notes = "",
  metadata = {},
}: {
  releaseId?: string;
  productKey?: string;
  envKey?: string;
  semver?: string;
  nodeKey: string;
  notes?: string;
  metadata?: Record<string, any>;
}) {
  return invokeVersioningOps("request_local_artifact_sync", {
    releaseId,
    productKey,
    envKey,
    semver,
    nodeKey,
    notes,
    metadata,
  });
}

export async function previewDevRelease({
  productKey = "",
  ref = "dev",
} = {}) {
  return invokeVersioningOps("preview_dev_release", {
    productKey,
    ref,
  });
}

export async function createDevRelease({
  productKey = "",
  ref = "dev",
  overrideSemver = "",
  releaseNotes = "",
} = {}) {
  return invokeVersioningOps("create_dev_release", {
    productKey,
    ref,
    overrideSemver,
    releaseNotes,
  });
}

export async function backfillReleaseArtifact({
  releaseId = "",
  productKey = "",
  ref = "dev",
  sourceCommitSha = "",
  releaseNotes = "",
} = {}) {
  return invokeVersioningOps("backfill_release_artifact", {
    releaseId,
    productKey,
    ref,
    sourceCommitSha,
    releaseNotes,
  });
}

export async function fetchWorkflowPackStatus({
  sourceRef = "dev",
} = {}) {
  return invokeVersioningOps("fetch_workflow_pack_status", {
    sourceRef,
  });
}

export async function syncWorkflowPack({
  sourceRef = "dev",
  syncStaging = true,
  syncProd = true,
} = {}) {
  return invokeVersioningOps("sync_workflow_pack", {
    sourceRef,
    syncStaging,
    syncProd,
  });
}

export async function validateEnvironmentContract({
  productKey,
  envKey,
}: {
  productKey: string;
  envKey: string;
}) {
  return invokeVersioningOps("validate_environment", {
    productKey,
    envKey,
  });
}

export async function checkReleaseMigrations({
  productKey,
  envKey,
  semver,
}: {
  productKey: string;
  envKey: string;
  semver: string;
}) {
  return invokeVersioningOps("check_release_migrations", {
    productKey,
    envKey,
    semver,
  });
}

export async function applyReleaseMigrations({
  productKey,
  envKey,
  semver,
  sourceBranch = "",
  targetBranch = "",
}: {
  productKey: string;
  envKey: string;
  semver: string;
  sourceBranch?: string;
  targetBranch?: string;
}) {
  return invokeVersioningOps("apply_release_migrations", {
    productKey,
    envKey,
    semver,
    sourceBranch,
    targetBranch,
  });
}

export async function promoteRelease({
  productKey,
  fromEnv,
  toEnv,
  semver,
  actor = "android-admin",
  notes = "",
}: {
  productKey: string;
  fromEnv: string;
  toEnv: string;
  semver: string;
  actor?: string;
  notes?: string;
}) {
  return invokeVersioningOps("promote_release", {
    productKey,
    fromEnv,
    toEnv,
    semver,
    actor,
    notes,
  });
}

export async function requestDeploy({
  productKey,
  envKey,
  semver,
  actor = "android-admin",
  notes = "",
  metadata = {},
}: {
  productKey: string;
  envKey: string;
  semver: string;
  actor?: string;
  notes?: string;
  metadata?: Record<string, any>;
}) {
  return invokeVersioningOps("request_deploy", {
    productKey,
    envKey,
    semver,
    actor,
    notes,
    metadata,
  });
}

export async function approveDeployRequest({
  requestId,
  actor = "android-admin",
  forceAdminOverride = false,
  notes = "",
}: {
  requestId: string;
  actor?: string;
  forceAdminOverride?: boolean;
  notes?: string;
}) {
  return invokeVersioningOps("approve_deploy_request", {
    requestId,
    actor,
    forceAdminOverride,
    notes,
  });
}

export async function executeDeployRequest({
  requestId,
  actor = "android-admin",
  status = "success",
  deploymentId = "",
  logsUrl = "",
  metadata = {},
}: {
  requestId: string;
  actor?: string;
  status?: string;
  deploymentId?: string;
  logsUrl?: string;
  metadata?: Record<string, any>;
}) {
  return invokeVersioningOps("execute_deploy_request", {
    requestId,
    actor,
    status,
    deploymentId,
    logsUrl,
    metadata,
  });
}

export async function rejectDeployRequest({
  requestId,
  actor = "android-admin",
  reason = "",
}: {
  requestId: string;
  actor?: string;
  reason?: string;
}) {
  return invokeVersioningOps("reject_deploy_request", {
    requestId,
    actor,
    reason,
  });
}

export async function triggerDeployPipeline({
  requestId,
  forceAdminOverride = false,
  skipMerge = false,
  syncRelease = false,
  syncOnly = false,
  sourceBranch = "",
  targetBranch = "",
}: {
  requestId: string;
  forceAdminOverride?: boolean;
  skipMerge?: boolean;
  syncRelease?: boolean;
  syncOnly?: boolean;
  sourceBranch?: string;
  targetBranch?: string;
}) {
  return invokeVersioningOps("trigger_deploy_pipeline", {
    requestId,
    forceAdminOverride,
    skipMerge,
    syncRelease,
    syncOnly,
    sourceBranch,
    targetBranch,
  });
}

export async function syncReleaseBranch({
  productKey,
  fromEnv = "",
  toEnv,
  semver,
  checkOnly = false,
  autoMerge = !checkOnly,
  createPr = true,
  sourceBranch = "",
  targetBranch = "",
  operation = "sync",
  pullNumber = 0,
  commentBody = "",
}: {
  productKey: string;
  fromEnv?: string;
  toEnv: string;
  semver: string;
  checkOnly?: boolean;
  autoMerge?: boolean;
  createPr?: boolean;
  sourceBranch?: string;
  targetBranch?: string;
  operation?: string;
  pullNumber?: number;
  commentBody?: string;
}) {
  return invokeVersioningOps("sync_release_branch", {
    productKey,
    fromEnv,
    toEnv,
    semver,
    checkOnly,
    autoMerge,
    createPr,
    sourceBranch,
    targetBranch,
    operation,
    pullNumber,
    commentBody,
  });
}

export async function fetchEnvConfigVersions({
  productKey = "",
  envKey = "",
  semver = "",
  releaseId = "",
  configKey = "",
  limit = 80,
} = {}) {
  return invokeVersioningOps("fetch_env_config_versions", {
    productKey,
    envKey,
    semver,
    releaseId,
    configKey,
    limit,
  });
}

export async function cancelLocalArtifactSyncRequest({
  requestId,
  errorDetail = "cancelled_by_user",
  metadata = {},
}: {
  requestId: string;
  errorDetail?: string;
  metadata?: Record<string, any>;
}) {
  return invokeVersioningOps("cancel_local_artifact_sync", {
    requestId,
    errorDetail,
    metadata,
  });
}
