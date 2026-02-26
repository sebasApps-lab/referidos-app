import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse, supabaseAdmin } from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

const CALLBACK_HEADER = "x-versioning-callback-token";
const DEFAULT_TENANT_HINT = "ReferidosAPP";

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asObject(value: unknown): JsonObject {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as JsonObject;
  }
  return {};
}

function envVarKey(input: string): string {
  return input.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toUpperCase();
}

function corsWithCallbackHeader(origin: string | null) {
  const base = corsHeaders(origin);
  const current = base["Access-Control-Allow-Headers"] || "";
  return {
    ...base,
    "Access-Control-Allow-Headers": `${current}, ${CALLBACK_HEADER}`,
  };
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

async function runObsReleaseSync({
  requestId,
  releaseId,
  productKey,
  envKey,
  versionLabel,
  deploymentId,
  actor,
}: {
  requestId: string;
  releaseId: string;
  productKey: string;
  envKey: string;
  versionLabel: string;
  deploymentId: string;
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

  return {
    ok: response.ok && payload.ok !== false,
    skipped: false,
    status: response.status,
    url: endpoint,
    detail: asString(payload.detail, response.ok ? "ok" : "obs_release_sync_failed"),
    payload,
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsWithCallbackHeader(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const expectedToken = asString(Deno.env.get("VERSIONING_DEPLOY_CALLBACK_TOKEN"));
  if (!expectedToken) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_callback_token_config",
        detail: "Define VERSIONING_DEPLOY_CALLBACK_TOKEN en Edge secrets.",
      },
      500,
      cors
    );
  }

  const receivedToken = asString(req.headers.get(CALLBACK_HEADER));
  if (!receivedToken || receivedToken !== expectedToken) {
    return jsonResponse({ ok: false, error: "invalid_callback_token" }, 401, cors);
  }

  const body = await req.json().catch(() => ({}));
  const requestId = asString(body.request_id);
  const actor = asString(body.actor, "github-actions");
  const deploymentId = asString(body.deployment_id);
  const logsUrl = asString(body.logs_url);
  const status = asString(body.status).toLowerCase();
  const metadata = asObject(body.metadata);

  if (!requestId) {
    return jsonResponse({ ok: false, error: "missing_request_id" }, 400, cors);
  }
  if (!["success", "failed"].includes(status)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_status",
        detail: "status permitido: success | failed",
      },
      400,
      cors
    );
  }

  const { data: requestRow, error: requestLookupError } = await supabaseAdmin
    .from("version_deploy_requests_labeled")
    .select("id, release_id, product_key, env_key, version_label")
    .eq("id", requestId)
    .limit(1)
    .maybeSingle<{
      id: string;
      release_id: string;
      product_key: string;
      env_key: string;
      version_label: string;
    }>();

  if (requestLookupError || !requestRow) {
    return jsonResponse(
      {
        ok: false,
        error: "deploy_request_not_found",
        detail: requestLookupError?.message || "No se encontro request.",
      },
      404,
      cors
    );
  }

  let obsReleaseSyncResult: JsonObject | null = null;
  if (status === "success") {
    try {
      obsReleaseSyncResult = await runObsReleaseSync({
        requestId,
        releaseId: asString(requestRow.release_id),
        productKey: asString(requestRow.product_key),
        envKey: asString(requestRow.env_key),
        versionLabel: asString(requestRow.version_label),
        deploymentId,
        actor,
      });
    } catch (error) {
      obsReleaseSyncResult = {
        ok: false,
        skipped: false,
        reason: "obs_release_sync_exception",
        detail: error instanceof Error ? error.message : "unknown_error",
      };
    }
  }

  const finalizeMetadata: JsonObject = {
    ...metadata,
  };
  if (obsReleaseSyncResult) {
    finalizeMetadata.obs_release_sync = obsReleaseSyncResult;
  }

  const { data, error } = await supabaseAdmin.rpc("versioning_finalize_deploy_request", {
    p_request_id: requestId,
    p_actor: actor,
    p_status: status,
    p_deployment_id: deploymentId || null,
    p_logs_url: logsUrl || null,
    p_metadata: finalizeMetadata,
  });

  if (error) {
    return jsonResponse(
      {
        ok: false,
        error: "finalize_deploy_failed",
        detail: error.message,
        obs_release_sync: obsReleaseSyncResult,
      },
      500,
      cors
    );
  }

  let releaseMetadataResult: JsonObject | null = null;
  if (status === "success") {
    const prNumber = Number(
      metadata.pr_number ?? metadata.pull_number ?? metadata.pull_request_number ?? 0
    );
    const ciRunId = Number(metadata.github_run_id ?? metadata.ci_run_id ?? 0);
    const ciRunNumber = Number(metadata.github_run_number ?? metadata.ci_run_number ?? 0);
    const tagName = asString(metadata.tag_name);
    const releaseNotesAuto = asString(metadata.release_notes_auto);
    const releaseNotesFinal = asString(metadata.release_notes_final);

    const { data: releaseMetadataRows, error: releaseMetadataError } = await supabaseAdmin.rpc(
      "versioning_finalize_release_metadata",
      {
        p_request_id: requestId,
        p_actor: actor,
        p_pr_number: Number.isFinite(prNumber) && prNumber > 0 ? prNumber : null,
        p_tag_name: tagName || null,
        p_release_notes_auto: releaseNotesAuto || null,
        p_release_notes_final: releaseNotesFinal || null,
        p_ci_run_id: Number.isFinite(ciRunId) && ciRunId > 0 ? ciRunId : null,
        p_ci_run_number: Number.isFinite(ciRunNumber) && ciRunNumber > 0 ? ciRunNumber : null,
        p_metadata: metadata,
      }
    );

    if (releaseMetadataError) {
      return jsonResponse(
        {
          ok: false,
          error: "finalize_release_metadata_failed",
          detail: releaseMetadataError.message,
          deployment_row_id: data || null,
          obs_release_sync: obsReleaseSyncResult,
        },
        500,
        cors
      );
    }

    if (Array.isArray(releaseMetadataRows)) {
      releaseMetadataResult = (releaseMetadataRows[0] as JsonObject) || null;
    } else {
      releaseMetadataResult = (releaseMetadataRows as JsonObject) || null;
    }
  }

  return jsonResponse(
    {
      ok: true,
      request_id: requestId,
      deployment_row_id: data || null,
      status,
      obs_release_sync: obsReleaseSyncResult,
      release_metadata: releaseMetadataResult,
    },
    200,
    cors
  );
});
