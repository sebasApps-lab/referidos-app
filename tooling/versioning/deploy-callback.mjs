import { resolveDeployCallbackUrl } from "../../apps/referidos-ops/supabase/functions/_shared/deploy-callback-url.mjs";

export { resolveDeployCallbackUrl };

const CALLBACK_TIMEOUT_MS = 30_000;

export function deployCallbackPayload(env, { start = false, deployInvoked = false, deploymentId = null } = {}) {
  const publicationStatus = deploymentId ? "published" : deployInvoked ? "not_confirmed" : "not_published";
  const payload = {
    request_id: env.REQUEST_ID,
    deploy_execution_id: env.DEPLOY_EXECUTION_ID,
    status: start ? "started" : publicationStatus === "published" ? "success" : "failed",
    deployment_id: deploymentId ?? env.DEPLOY_EXECUTION_ID,
    logs_url: env.GITHUB_RUN_URL,
    actor: env.WORKFLOW_ACTOR || "github-actions",
    metadata: {
      trigger: "github_workflow_artifact_exact",
      product_key: env.PRODUCT_KEY,
      env_key: env.ENV_KEY,
      semver: env.SEMVER,
      source_commit_sha: env.SOURCE_COMMIT_SHA,
      source_branch: env.SOURCE_BRANCH || null,
      target_branch: env.TARGET_BRANCH || null,
      tenant_id: env.RELEASE_TENANT_ID,
      release_id: env.RELEASE_ID_RAW,
      artifact_id: env.ARTIFACT_ID_RAW,
      artifact_checksum_sha256: env.ARTIFACT_SHA256_RAW,
      github_run_id: env.GITHUB_RUN_ID,
      github_run_attempt: env.GITHUB_RUN_ATTEMPT,
      github_run_number: env.GITHUB_RUN_NUMBER,
      github_run_url: env.GITHUB_RUN_URL,
      github_repository: env.GITHUB_REPOSITORY,
      workflow_id: "versioning-deploy-artifact.yml",
      netlify_site_id: env.NETLIFY_SITE_ID,
    },
  };

  if (start) return payload;
  payload.publication_status = publicationStatus;
  const buildNumber = Number(env.BUILD_NUMBER_RAW || 0);
  let runtimeConfig = null;
  if (env.RUNTIME_CONFIG_PAYLOAD_RAW) {
    try {
      runtimeConfig = JSON.parse(env.RUNTIME_CONFIG_PAYLOAD_RAW);
    } catch {
      // Preserve publication evidence even if OPS cannot reconcile the runtime metadata.
    }
  }
  Object.assign(payload.metadata, {
    workflow_outcome: env.WORKFLOW_OUTCOME,
    build_number: Number.isSafeInteger(buildNumber) && buildNumber > 0 ? buildNumber : null,
    channel: env.CHANNEL_RAW || env.ENV_KEY,
    artifact_name: env.ARTIFACT_NAME_RAW,
    artifact_run_id: env.ARTIFACT_RUN_ID_RAW || null,
    artifact_repository: env.ARTIFACT_REPOSITORY_RAW || null,
    tag_name: env.TAG_NAME_RAW || null,
    tag_created: env.TAG_CREATED_RAW || null,
    runtime_config: {
      config_key: env.RUNTIME_CONFIG_KEY_RAW || "app-config.js",
      config_format: "json",
      config_hash_sha256: env.RUNTIME_CONFIG_SHA256_RAW || null,
      payload: runtimeConfig,
    },
  });
  return payload;
}

export async function postDeployCallback({ opsUrl, requestedUrl, token, payload, fetchImpl = fetch }) {
  const endpoint = resolveDeployCallbackUrl(opsUrl, requestedUrl);
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Missing VERSIONING_DEPLOY_CALLBACK_TOKEN.");
  }

  let response;
  try {
    response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-versioning-callback-token": token.trim(),
      },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: AbortSignal.timeout(CALLBACK_TIMEOUT_MS),
    });
  } catch {
    throw new Error("Deploy callback request failed before receiving an HTTP response.");
  }

  if (!response.ok) {
    throw new Error(`Deploy callback failed with HTTP ${response.status}.`);
  }

  const confirmation = await response.json().catch(() => null);
  if (confirmation?.ok !== true) {
    throw new Error("Deploy callback response did not confirm the update.");
  }
  return confirmation;
}
