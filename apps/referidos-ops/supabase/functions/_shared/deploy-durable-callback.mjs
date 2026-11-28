import { classifyDeployCallback } from "./deploy-attempt.mjs";
import { netlifyDeployTitle } from "./deploy-netlify-proof.mjs";

const ID = /^[A-Za-z0-9_-]{1,128}$/;
const SHA256 = /^[a-f0-9]{64}$/;
const APP_IDS = { referidos_app: "referidos-app", prelaunch_web: "prelaunch" };

function record(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function failure(error, status = 409) {
  return { status, body: { ok: false, error } };
}

function acknowledge(request, body, attempt, duplicate, binding, authorization) {
  return { status: 200, body: {
    ok: true, request_id: request.id, status: body.status, duplicate,
    ...(body.status === "prepared" ? { publish_authorized: authorization === true && !duplicate } : {}),
    ...durableDeploySummary(attempt, binding),
  } };
}

/** Stable public attempt status. Secret dispatch configuration and runtime payloads stay in OPS. */
export function durableDeploySummary(attempt, binding = attempt.callback_binding) {
  const publication = record(attempt.publication);
  const status = attempt.publication_status;
  return {
    publication: ["published", "not_published", "not_confirmed"].includes(status) ? {
      status,
      netlify_site_id: publication.netlify_site_id ?? null,
      netlify_deploy_id: publication.netlify_deploy_id ?? null,
      reported_at: publication.reported_at ?? null,
    } : null,
    reconciliation: {
      status: ["complete", "incomplete"].includes(attempt.reconciliation_status) ? attempt.reconciliation_status : "pending",
      reason: attempt.reconciliation_reason ?? null,
      updated_at: attempt.updated_at ?? null,
      deploy_execution_id: attempt.execution_id,
      github_run_id: binding?.github_run_id ?? null,
      github_run_attempt: binding?.github_run_attempt ?? null,
    },
    observability: { status: attempt.observability_status ?? "pending" },
  };
}

export async function verifyPreparedRuntime(incoming, binding) {
  const runtime = record(incoming.runtime_config);
  const payload = record(runtime.payload);
  const compact = runtime.payload_json;
  const hash = runtime.config_hash_sha256;
  const build = incoming.build_number == null ? null : Number(incoming.build_number);
  const validBuild = build === null ? payload.buildNumber === null :
    Number.isSafeInteger(build) && build > 0 && String(payload.buildNumber) === String(build);
  const channel = incoming.channel;
  if (runtime.config_key !== "app-config.js" || runtime.config_format !== "json" || typeof compact !== "string" ||
      compact.length > 32_768 || JSON.stringify(payload) !== compact || typeof hash !== "string" || !SHA256.test(hash) ||
      payload.releaseId !== binding.release_id || payload.artifactId !== binding.artifact_id ||
      payload.sourceCommitSha !== binding.source_commit_sha || payload.appEnv !== binding.env_key ||
      payload.appVersion !== binding.semver || payload.appId !== APP_IDS[binding.product_key] ||
      !validBuild ||
      channel !== binding.env_key || payload.releaseChannel !== channel) return null;

  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(compact));
  const actual = Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
  if (actual !== hash) return null;
  return { build_number: build, channel, runtime_config: {
    config_key: "app-config.js", config_format: "json", config_hash_sha256: hash, payload, payload_json: compact,
  } };
}

function safeReleaseMetadata(incoming) {
  const selected = {};
  for (const key of ["workflow_outcome", "sourcemap_outcome", "github_run_url", "source_branch", "target_branch", "tag_name",
    "release_notes_auto", "release_notes_final", "artifact_name", "artifact_run_id", "artifact_repository", "logs_url"]) {
    if (typeof incoming[key] === "string" && incoming[key].length <= 8192) selected[key] = incoming[key];
  }
  if (typeof incoming.tag_created === "boolean") selected.tag_created = incoming.tag_created;
  for (const key of ["github_run_number", "pr_number"]) {
    if (Number.isSafeInteger(Number(incoming[key])) && Number(incoming[key]) > 0) selected[key] = Number(incoming[key]);
  }
  return selected;
}

export async function handleDurableDeployCallback({ database, request, body, verifyArtifact }) {
  const registered = record(request.metadata);
  const executionId = registered.deploy_execution_id;
  const lookupAttempt = () => database.from("version_deploy_attempts").select("*")
    .eq("execution_id", executionId).eq("request_id", request.id).maybeSingle();
  const lookup = await lookupAttempt();
  if (lookup.error) return failure("deploy_attempt_lookup_failed", 500);
  const attempt = lookup.data;
  if (!attempt || attempt.execution_id !== executionId || attempt.request_id !== request.id || request.deployment_id !== executionId) {
    return failure("deploy_attempt_not_registered");
  }
  const spec = record(attempt.dispatch_spec);
  const incoming = record(body.metadata);
  if (!spec.netlify_site_id || !spec.netlify_site_name || spec.netlify_site_id !== incoming.netlify_site_id) {
    return failure("deploy_callback_site_mismatch");
  }

  // The classifier verifies the registered execution and callback identity. SQL owns durable state transitions.
  const classifyRequest = { ...request, status: "executed", deployment_status: "started", metadata: {
    ...registered, workflow: spec.workflow, publication: null, callback_attempt: attempt.callback_binding,
  } };
  const prepared = body.status === "prepared";
  const decision = classifyDeployCallback(classifyRequest, prepared ? { ...body, status: "started" } : body);
  if (decision.kind === "reject") return failure(decision.error);

  let rpc;
  let args;
  let binding = attempt.callback_binding;
  let canAcknowledgePublished;
  if (body.status === "started" && decision.kind === "duplicate") {
    return acknowledge(request, body, attempt, true, binding);
  }
  if (decision.kind === "bind" && body.status === "started") {
    if (!decision.identity.artifact_id) return failure("durable_deploy_requires_exact_artifact_id");
    const verified = await verifyArtifact(request, decision.identity);
    if (!verified.ok) return failure(verified.reason);
    binding = { ...decision.identity, artifact_id: verified.artifactId };
    rpc = "versioning_claim_deploy_attempt";
    args = { p_execution_id: executionId, p_binding: binding };
  } else if (prepared && decision.kind === "duplicate") {
    if (incoming.netlify_deploy_title !== netlifyDeployTitle(binding, executionId)) return failure("invalid_netlify_deploy_title");
    const verified = await verifyPreparedRuntime(incoming, binding);
    if (!verified) return failure("runtime_config_unverified");
    rpc = "versioning_prepare_deploy_attempt";
    args = { p_execution_id: executionId, p_binding: binding, p_metadata: {
      ...safeReleaseMetadata({ ...incoming, logs_url: body.logs_url }), ...verified,
      netlify_deploy_title: incoming.netlify_deploy_title,
    } };
  } else if (decision.kind === "finalize") {
    const publication = decision.publication;
    const reportedId = incoming.reported_netlify_deploy_id ?? publication.netlify_deploy_id ?? null;
    if (reportedId != null && (typeof reportedId !== "string" || !ID.test(reportedId) || reportedId === executionId ||
      (publication.netlify_deploy_id && publication.netlify_deploy_id !== reportedId))) {
      return failure("invalid_reported_netlify_deploy_id");
    }
    if (publication.status === "published" && !attempt.publish_authorized) return failure("deploy_publication_not_authorized");
    if (publication.status === "not_published" && reportedId) return failure("deploy_callback_outcome_conflict");
    canAcknowledgePublished = (stored) => publication.status !== "not_published" &&
      stored?.publication_status === "published" && stored.publication?.netlify_site_id === spec.netlify_site_id &&
      (!reportedId || reportedId === stored.publication.netlify_deploy_id);
    if (canAcknowledgePublished(attempt)) return acknowledge(request, body, attempt, true, binding);
    const status = publication.status === "not_published" && !attempt.publish_authorized ? "not_published" : "not_confirmed";
    rpc = "versioning_record_deploy_publication";
    args = { p_execution_id: executionId, p_binding: binding, p_publication: {
      status, netlify_site_id: spec.netlify_site_id, ...(reportedId ? { reported_deploy_id: reportedId } : {}),
    }, p_metadata: safeReleaseMetadata({ ...incoming, logs_url: body.logs_url }) };
  } else {
    return failure("deploy_attempt_not_bound");
  }

  const result = await database.rpc(rpc, args);
  if (result.error) return failure("deploy_attempt_write_failed", 500);
  if (canAcknowledgePublished && result.data?.error === "deploy_publication_conflict") {
    const current = await lookupAttempt();
    if (!current.error && canAcknowledgePublished(current.data)) return acknowledge(request, body, current.data, true, binding);
  }
  if (!result.data?.ok) return failure(result.data?.error ?? "deploy_attempt_write_rejected");
  if (result.data.attempt?.execution_id !== executionId || result.data.attempt?.request_id !== request.id) {
    return failure("deploy_attempt_write_unverified", 500);
  }
  return acknowledge(request, body, result.data.attempt, result.data.duplicate === true, binding, result.data.publish_authorized);
}
