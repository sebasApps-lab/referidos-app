type JsonObject = Record<string, unknown>;

const DEFAULT_TENANT_HINT = "ReferidosAPP";

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function mapProductToAppId(productKey: string) {
  switch (productKey) {
    case "referidos_app":
      return "referidos-app";
    case "prelaunch_web":
      return "prelaunch";
    case "android_app":
      return "android-app";
    default:
      return productKey || "referidos-app";
  }
}

function resolveObsReleaseSyncUrl(envKey: string) {
  const envToken = envVarKey(envKey);
  const explicit = asString(Deno.env.get(`OBS_RELEASE_SYNC_URL_${envToken}`));
  if (explicit) return explicit;
  const legacy = asString(Deno.env.get(`VERSIONING_RUNTIME_URL_${envToken}`));
  if (legacy) return legacy;
  return "";
}

export async function runObsReleaseSync({
  requestId,
  releaseId,
  productKey,
  envKey,
  versionLabel,
  deploymentId,
  executionId,
  artifactId,
  actor,
}: {
  requestId: string;
  releaseId: string;
  productKey: string;
  envKey: string;
  versionLabel: string;
  deploymentId: string;
  executionId?: string;
  artifactId?: string;
  actor: string;
}) {
  const syncToken = asString(Deno.env.get("OBS_RELEASE_SYNC_TOKEN"));
  if (!syncToken) {
    return {
      ok: false,
      skipped: true,
      reason: "missing_obs_release_sync_token",
      detail: "Define OBS_RELEASE_SYNC_TOKEN en referidos-ops.",
    };
  }

  const runtimeUrl = resolveObsReleaseSyncUrl(envKey);
  if (!runtimeUrl) {
    return {
      ok: false,
      skipped: true,
      reason: "missing_obs_release_sync_url",
      detail: `Define OBS_RELEASE_SYNC_URL_${envVarKey(envKey)} en referidos-ops.`,
    };
  }

  const endpoint = `${runtimeUrl.replace(/\/+$/, "")}/functions/v1/obs-release-sync`;
  const tenantHint = asString(Deno.env.get("OBS_RELEASE_SYNC_TENANT_HINT"), DEFAULT_TENANT_HINT);
  const appId = mapProductToAppId(productKey);

  const response = await fetch(endpoint, {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
    headers: {
      "Content-Type": "application/json",
      "x-obs-release-sync-token": syncToken,
    },
    body: JSON.stringify({
      tenant_hint: tenantHint,
      app_id: appId,
      product_key: productKey,
      env_key: envKey,
      semver: versionLabel,
      release_id: releaseId,
      ...(executionId ? { execution_id: executionId, artifact_id: artifactId } : {}),
      actor,
      metadata: {
        trigger: "versioning-deploy-callback",
        request_id: requestId,
        deployment_id: deploymentId || null,
      },
    }),
  });

  const raw = await response.text();
  let payload: JsonObject = {};
  try {
    payload = raw ? (JSON.parse(raw) as JsonObject) : {};
  } catch {
    payload = { raw };
  }

  const exactAcknowledgement = !executionId ||
    (payload.execution_id === executionId && payload.artifact_id === artifactId &&
      payload.version_release_id === releaseId);
  return {
    ok: response.ok && payload.ok === true && exactAcknowledgement,
    skipped: false,
    status: response.status,
    url: endpoint,
    detail: !exactAcknowledgement ? "obs_release_sync_identity_unconfirmed"
      : asString(payload.detail, response.ok ? "ok" : "obs_release_sync_failed"),
    payload,
  };
}
