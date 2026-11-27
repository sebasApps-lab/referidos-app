import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse, supabaseAdmin } from "../_shared/support.ts";
import { type DeployRequest, verifyArtifactForRequest } from "../_shared/deploy-artifact-check.ts";
import { handleDurableDeployCallback } from "../_shared/deploy-durable-callback.mjs";
import { runObsReleaseSync } from "../_shared/deploy-obs-sync.ts";
import { classifyDeployCallback, readDeployReconciliation } from "../_shared/deploy-attempt.mjs";

type JsonObject = Record<string, unknown>;

const CALLBACK_HEADER = "x-versioning-callback-token";

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

function asUuid(value: unknown): string | null {
  const text = asString(value);
  if (!text) return null;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text)
    ? text
    : null;
}

function corsWithCallbackHeader(origin: string | null) {
  const base = corsHeaders(origin);
  const current = base["Access-Control-Allow-Headers"] || "";
  return {
    ...base,
    "Access-Control-Allow-Headers": `${current}, ${CALLBACK_HEADER}`,
  };
}

async function emitBuildEvent({
  tenantId,
  releaseId = "",
  deployRequestId = "",
  artifactId = "",
  eventKey,
  eventType,
  status,
  actor,
  detail = "",
  workflowName = "versioning-deploy-artifact.yml",
  workflowJob = "deploy-artifact",
  workflowRunId = null,
  workflowRunNumber = null,
  metadata = {},
}: {
  tenantId: string;
  releaseId?: string;
  deployRequestId?: string;
  artifactId?: string;
  eventKey: string;
  eventType: string;
  status: string;
  actor: string;
  detail?: string;
  workflowName?: string;
  workflowJob?: string;
  workflowRunId?: number | null;
  workflowRunNumber?: number | null;
  metadata?: JsonObject;
}) {
  const payload = {
    p_tenant_id: asUuid(tenantId),
    p_release_id: asUuid(releaseId),
    p_deploy_request_id: asUuid(deployRequestId),
    p_artifact_id: asUuid(artifactId),
    p_event_key: eventKey,
    p_event_type: eventType,
    p_status: status,
    p_actor: actor || "system",
    p_detail: detail || null,
    p_workflow_name: workflowName || null,
    p_workflow_job: workflowJob || null,
    p_workflow_run_id:
      Number.isFinite(Number(workflowRunId)) && Number(workflowRunId) > 0
        ? Number(workflowRunId)
        : null,
    p_workflow_run_number:
      Number.isFinite(Number(workflowRunNumber)) && Number(workflowRunNumber) > 0
        ? Number(workflowRunNumber)
        : null,
    p_metadata: metadata,
  };
  const { error } = await supabaseAdmin.rpc("versioning_emit_build_event", payload);
  if (error) {
    console.error("versioning_emit_build_event_failed", {
      event_key: eventKey,
      detail: error.message,
    });
  }
}

async function claimRequest(request: DeployRequest, metadata: JsonObject, logsUrl: string) {
  const { data, error } = await supabaseAdmin
    .from("version_deploy_requests")
    .update({ metadata, ...(logsUrl ? { logs_url: logsUrl } : {}) })
    .eq("id", request.id)
    .eq("updated_at", request.updated_at)
    .eq("status", request.status)
    .eq("deployment_status", request.deployment_status)
    .eq("deployment_id", request.deployment_id)
    .select("id")
    .maybeSingle();
  return { claimed: Boolean(data?.id), failed: Boolean(error) };
}

async function recordReconciliation(
  requestId: string,
  executionId: string,
  metadata: JsonObject,
  reason: string | null,
) {
  const reconciledMetadata = {
    ...metadata,
    ops_reconciliation: { status: reason ? "incomplete" : "complete", reason, updated_at: new Date().toISOString() },
  };
  const { data, error } = await supabaseAdmin.from("version_deploy_requests")
    .update({ metadata: reconciledMetadata })
    .eq("id", requestId)
    .eq("deployment_id", executionId)
    .eq("metadata->ops_reconciliation->>status", "pending")
    .select("id")
    .maybeSingle();
  if (error || !data?.id) {
    console.error("deploy_reconciliation_record_failed", { request_id: requestId });
    return metadata;
  }
  return reconciledMetadata;
}

async function verifyRuntimeConfig(config: JsonObject, request: DeployRequest, metadata: JsonObject) {
  const payload = asObject(config.payload);
  const hash = asString(config.config_hash_sha256).toLowerCase();
  if (config.config_key !== "app-config.js" || config.config_format !== "json" || !/^[a-f0-9]{64}$/.test(hash) ||
      asString(payload.releaseId).toLowerCase() !== request.release_id ||
      asString(payload.artifactId).toLowerCase() !== metadata.artifact_id ||
      asString(payload.sourceCommitSha).toLowerCase() !== metadata.source_commit_sha || payload.appEnv !== request.env_key) {
    return null;
  }

  // The workflow hashes the compact JSON payload, not the JavaScript wrapper written to disk.
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(payload)));
  const actualHash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  return actualHash === hash ? { payload, hash } : null;
}

async function reconcilePublishedRelease({
  request,
  requestId,
  actor,
  metadata,
  runtimeConfig,
  workflowRunId,
  workflowRunNumber,
  executionId,
  netlifyDeployId,
}: {
  request: DeployRequest;
  requestId: string;
  actor: string;
  metadata: JsonObject;
  runtimeConfig: JsonObject;
  workflowRunId: number;
  workflowRunNumber: number;
  executionId: string;
  netlifyDeployId: string;
}) {
  const verifiedConfig = await verifyRuntimeConfig(runtimeConfig, request, metadata);
  if (!verifiedConfig) return "runtime_config_unverified";
  metadata.runtime_config = {
    config_key: "app-config.js",
    config_format: "json",
    config_hash_sha256: verifiedConfig.hash,
    payload: verifiedConfig.payload,
  };

  const { data: releaseMetadataRows, error: releaseMetadataError } = await supabaseAdmin.rpc(
    "versioning_finalize_release_metadata",
    {
      p_request_id: requestId,
      p_actor: actor,
      p_pr_number: Number(metadata.pr_number) || null,
      p_tag_name: asString(metadata.tag_name) || null,
      p_release_notes_auto: asString(metadata.release_notes_auto) || null,
      p_release_notes_final: asString(metadata.release_notes_final) || null,
      p_ci_run_id: workflowRunId || null,
      p_ci_run_number: workflowRunNumber || null,
      p_metadata: metadata,
    },
  );
  if (releaseMetadataError) return "finalize_release_metadata_failed";

  const artifactId = asString(metadata.artifact_id);
  const eventContext = {
    tenantId: request.tenant_id,
    releaseId: request.release_id,
    deployRequestId: requestId,
    artifactId,
    actor,
    workflowRunId,
    workflowRunNumber,
  };

  await emitBuildEvent({
    ...eventContext,
    eventKey: "deploy-callback:" + executionId + ":release-metadata",
    eventType: "release.metadata_finalized",
    status: "success",
    detail: "Metadatos de release registrados.",
    metadata: { release_metadata: Array.isArray(releaseMetadataRows) ? releaseMetadataRows[0] : releaseMetadataRows },
  });

  const { error: artifactHeadError } = await supabaseAdmin.from("version_artifact_env_heads")
    .upsert({
      tenant_id: request.tenant_id,
      product_id: request.product_id,
      env_id: request.env_id,
      release_id: request.release_id,
      artifact_id: artifactId,
      updated_by: actor,
      updated_at: new Date().toISOString(),
    }, { onConflict: "tenant_id,product_id,env_id" });
  if (artifactHeadError) return "mark_env_artifact_head_failed";

  const { error: artifactAuditError } = await supabaseAdmin.from("version_audit_log").insert({
    tenant_id: request.tenant_id,
    actor,
    action: "mark_env_artifact_head",
    entity_type: "version_artifact_env_heads",
    entity_id: artifactId,
    payload: {
      release_id: request.release_id,
      env_id: request.env_id,
      semver: request.version_label,
      source_commit_sha: metadata.source_commit_sha,
      deploy_execution_id: executionId,
    },
  });
  if (artifactAuditError) {
    console.error("mark_env_artifact_head_audit_failed", { code: artifactAuditError.code, artifact_id: artifactId });
  }

  await emitBuildEvent({
    ...eventContext,
    eventKey: "deploy-callback:" + executionId + ":artifact-head",
    eventType: "artifact.head_marked",
    status: "success",
    detail: "Artefacto exacto registrado para el entorno.",
  });

  const { data: configVersionId, error: configVersionError } = await supabaseAdmin.rpc(
    "versioning_register_env_config_version",
    {
      p_release_id: request.release_id,
      p_actor: actor,
      p_config_key: "app-config.js",
      p_config_format: "json",
      p_config_payload: verifiedConfig.payload,
      p_config_hash_sha256: verifiedConfig.hash,
      p_source_commit_sha: asString(metadata.source_commit_sha),
      p_artifact_id: artifactId,
      p_metadata: { source: "versioning-deploy-artifact", request_id: requestId },
    },
  );
  if (configVersionError) return "register_env_config_version_failed";

  await emitBuildEvent({
    ...eventContext,
    eventKey: "deploy-callback:" + executionId + ":runtime-config-versioned",
    eventType: "config.versioned",
    status: "success",
    detail: "Configuración por entorno registrada.",
    metadata: { config_version_id: configVersionId },
  });

  try {
    const obsSync = await runObsReleaseSync({
      requestId,
      releaseId: request.release_id,
      productKey: request.product_key,
      envKey: request.env_key,
      versionLabel: request.version_label,
      deploymentId: netlifyDeployId,
      actor,
    });
    metadata.obs_release_sync = { ok: obsSync.ok, skipped: obsSync.skipped };
    if (!obsSync.ok) return "obs_release_sync_incomplete";
  } catch {
    return "obs_release_sync_incomplete";
  }

  return null;
}

serve(async (req) => {
  const cors = corsWithCallbackHeader(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);

  const expectedToken = asString(Deno.env.get("VERSIONING_DEPLOY_CALLBACK_TOKEN"));
  if (!expectedToken) return jsonResponse({ ok: false, error: "missing_callback_token_config" }, 500, cors);
  if (asString(req.headers.get(CALLBACK_HEADER)) !== expectedToken) {
    return jsonResponse({ ok: false, error: "invalid_callback_token" }, 401, cors);
  }

  const body = asObject(await req.json().catch(() => ({})));
  const requestId = asUuid(body.request_id);
  const status = asString(body.status);
  if (!requestId || !["started", "prepared", "success", "failed"].includes(status)) {
    return jsonResponse({ ok: false, error: "invalid_callback_request" }, 400, cors);
  }

  const { data: request, error: requestError } = await supabaseAdmin
    .from("version_deploy_requests_labeled")
    .select("id, tenant_id, product_id, product_key, release_id, env_id, env_key, version_label, status, deployment_status, deployment_id, updated_at, metadata")
    .eq("id", requestId)
    .maybeSingle<DeployRequest>();
  if (requestError) return jsonResponse({ ok: false, error: "deploy_request_lookup_failed" }, 500, cors);
  if (!request) return jsonResponse({ ok: false, error: "deploy_request_not_found" }, 404, cors);

  if (request.metadata?.deploy_attempt_protocol === "durable_v1") {
    const result = await handleDurableDeployCallback({ database: supabaseAdmin, request, body, verifyArtifact: verifyArtifactForRequest });
    return jsonResponse(result.body, result.status, cors);
  }
  if (status === "prepared") return jsonResponse({ ok: false, error: "durable_attempt_required" }, 409, cors);

  const decision = classifyDeployCallback(request, body);
  const requestMetadata = asObject(request.metadata);
  const response = (metadata: JsonObject, duplicate = false) => jsonResponse({
    ok: true,
    request_id: requestId,
    status,
    duplicate,
    ...readDeployReconciliation(metadata, request.deployment_id),
  }, 200, cors);
  if (decision.kind === "reject") return jsonResponse({ ok: false, error: decision.error }, 409, cors);
  if (decision.kind === "duplicate") return response(requestMetadata, true);

  const incomingMetadata = asObject(body.metadata);
  const logsUrl = asString(body.logs_url);
  const actor = "github-actions";
  const workflowRunId = Number(decision.identity.github_run_id);
  const workflowRunNumber = Number(incomingMetadata.github_run_number) || 0;
  const eventContext = {
    tenantId: request.tenant_id,
    releaseId: request.release_id,
    deployRequestId: requestId,
    actor,
    workflowRunId,
    workflowRunNumber,
  };

  if (decision.kind === "bind") {
    const verification = await verifyArtifactForRequest(request, decision.identity);
    if (!verification.ok) return jsonResponse({ ok: false, error: verification.reason }, 409, cors);

    const boundAttempt = {
      ...decision.identity,
      artifact_id: verification.artifactId,
      direct_artifact: !decision.identity.artifact_id,
    };
    const nextMetadata = { ...requestMetadata, github_run_id: boundAttempt.github_run_id, callback_attempt: boundAttempt };
    const claim = await claimRequest(request, nextMetadata, logsUrl);
    if (claim.failed) return jsonResponse({ ok: false, error: "deploy_attempt_bind_failed" }, 500, cors);
    if (!claim.claimed) return jsonResponse({ ok: false, error: "deploy_attempt_changed" }, 409, cors);

    await emitBuildEvent({
      ...eventContext,
      artifactId: verification.artifactId,
      eventKey: "deploy-callback:" + decision.executionId + ":started",
      eventType: "deploy.workflow_started",
      status: "running",
      detail: "Run y artefacto asociados al intento de publicación.",
    });
    return response(nextMetadata);
  }

  const { publication, executionId, identity } = decision;
  const now = new Date().toISOString();
  const reconciliation = publication.status === "not_confirmed"
    ? { status: "incomplete", reason: "publication_not_confirmed", updated_at: now }
    : { status: "pending", reason: null, updated_at: now };
  const nextMetadata: JsonObject = {
    ...requestMetadata,
    ...identity,
    workflow_outcome: asString(incomingMetadata.workflow_outcome),
    github_run_number: workflowRunNumber || null,
    github_run_url: asString(incomingMetadata.github_run_url) || null,
    source_branch: asString(incomingMetadata.source_branch) || null,
    target_branch: asString(incomingMetadata.target_branch) || null,
    tag_name: asString(incomingMetadata.tag_name) || null,
    tag_created: incomingMetadata.tag_created ?? null,
    pr_number: incomingMetadata.pr_number ?? null,
    release_notes_auto: asString(incomingMetadata.release_notes_auto) || null,
    release_notes_final: asString(incomingMetadata.release_notes_final) || null,
    artifact_name: asString(incomingMetadata.artifact_name) || null,
    artifact_run_id: asString(incomingMetadata.artifact_run_id) || null,
    artifact_repository: asString(incomingMetadata.artifact_repository) || null,
    build_number: Number(incomingMetadata.build_number) || null,
    channel: asString(incomingMetadata.channel) || null,
    runtime_config: null,
    publication: { ...publication, reported_at: now },
    ops_reconciliation: reconciliation,
  };
  const claim = await claimRequest(request, nextMetadata, logsUrl);
  if (claim.failed) return jsonResponse({ ok: false, error: "deploy_evidence_record_failed" }, 500, cors);
  if (!claim.claimed) return jsonResponse({ ok: false, error: "deploy_attempt_changed" }, 409, cors);
  if (publication.status === "not_confirmed") return response(nextMetadata);

  let reason: string | null = null;
  try {
    const published = publication.status === "published";
    if (published) {
      const verified = await verifyArtifactForRequest(request, identity);
      if (!verified.ok) {
        return response(await recordReconciliation(requestId, executionId, nextMetadata, verified.reason));
      }
    }

    const { error } = await supabaseAdmin.rpc("versioning_finalize_deploy_request", {
      p_request_id: requestId,
      p_actor: actor,
      p_status: published ? "success" : "failed",
      p_deployment_id: executionId,
      p_logs_url: logsUrl || null,
      p_metadata: nextMetadata,
    });
    if (error) return response(await recordReconciliation(requestId, executionId, nextMetadata, "finalize_deploy_failed"));

    await emitBuildEvent({
      ...eventContext,
      artifactId: identity.artifact_id,
      eventKey: "deploy-callback:" + executionId + ":finalize",
      eventType: "deploy.request_finalized",
      status: published ? "success" : "failed",
      detail: published ? "Publicación registrada." : "Intento cerrado antes de Netlify.",
    });

    if (published) {
      reason = await reconcilePublishedRelease({
        request,
        requestId,
        actor,
        metadata: nextMetadata,
        runtimeConfig: asObject(incomingMetadata.runtime_config),
        workflowRunId,
        workflowRunNumber,
        executionId,
        netlifyDeployId: publication.netlify_deploy_id || "",
      });
    }
  } catch (error) {
    console.error("deploy_reconciliation_failed", { request_id: requestId, type: error instanceof Error ? error.name : "unknown" });
    reason = "reconciliation_unexpected_failure";
  }

  return response(await recordReconciliation(requestId, executionId, nextMetadata, reason));
});
