const UUID = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i;
const SHA = /^[a-f0-9]{40}$/i;
const CHECKSUM = /^[a-f0-9]{64}$/i;
const DEPLOY_ID = /^[A-Za-z0-9_-]{1,128}$/;
const IDENTITY_FIELDS = [
  "tenant_id", "release_id", "product_key", "env_key", "semver", "source_commit_sha",
  "artifact_checksum_sha256", "github_run_id", "github_run_attempt", "github_repository", "netlify_site_id",
];

function record(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

/** @returns {{ kind: "reject", error: string }} */
function failure(error) {
  return { kind: "reject", error };
}

function callbackIdentity(metadata) {
  return {
    tenant_id: text(metadata.tenant_id).toLowerCase(),
    release_id: text(metadata.release_id).toLowerCase(),
    product_key: text(metadata.product_key),
    env_key: text(metadata.env_key),
    semver: text(metadata.semver),
    source_commit_sha: text(metadata.source_commit_sha).toLowerCase(),
    artifact_id: text(metadata.artifact_id).toLowerCase(),
    artifact_checksum_sha256: text(metadata.artifact_checksum_sha256).toLowerCase(),
    github_run_id: String(metadata.github_run_id ?? ""),
    github_run_attempt: String(metadata.github_run_attempt ?? ""),
    github_repository: text(metadata.github_repository).toLowerCase(),
    netlify_site_id: text(metadata.netlify_site_id).toLowerCase(),
  };
}

function sameIdentity(existing, incoming) {
  return IDENTITY_FIELDS.every((key) => existing[key] === incoming[key]) &&
    (existing.artifact_id === incoming.artifact_id || (existing.direct_artifact === true && !incoming.artifact_id));
}

function readFinalPublication(body, identity, executionId) {
  const deploymentId = text(body.deployment_id);
  const status = text(body.publication_status);
  if (status === "published" && body.status === "success" && deploymentId !== executionId && DEPLOY_ID.test(deploymentId)) {
    return { status, netlify_deploy_id: deploymentId, netlify_site_id: identity.netlify_site_id };
  }
  if (["not_published", "not_confirmed"].includes(status) && body.status === "failed" && deploymentId === executionId) {
    return { status, netlify_site_id: identity.netlify_site_id };
  }
  return null;
}

/**
 * @returns {{ kind: "reject", error: string } | { kind: "duplicate" } |
 *   { kind: "bind", identity: ReturnType<typeof callbackIdentity>, executionId: string } |
 *   { kind: "finalize", identity: ReturnType<typeof callbackIdentity>, executionId: string,
 *     publication: NonNullable<ReturnType<typeof readFinalPublication>> }}
 */
export function classifyDeployCallback(request, body) {
  const registered = record(request.metadata);
  const executionId = text(body.deploy_execution_id);
  if (!/^gha-[0-9]+-[a-f0-9]{8}$/.test(executionId) || executionId !== registered.deploy_execution_id ||
      executionId !== request.deployment_id || registered.deploy_mode !== "github_artifact_exact") {
    return failure("deploy_execution_mismatch");
  }

  const incoming = record(body.metadata);
  const identity = callbackIdentity(incoming);
  if (!UUID.test(identity.tenant_id) || identity.tenant_id !== request.tenant_id ||
      !UUID.test(identity.release_id) || identity.release_id !== request.release_id ||
      identity.product_key !== request.product_key || identity.env_key !== request.env_key ||
      identity.semver !== request.version_label || !SHA.test(identity.source_commit_sha) ||
      identity.source_commit_sha !== text(registered.source_commit_sha).toLowerCase() ||
      !CHECKSUM.test(identity.artifact_checksum_sha256) || !UUID.test(identity.netlify_site_id) ||
      !/^[1-9][0-9]*$/.test(identity.github_run_id) || identity.github_run_attempt !== "1" ||
      !identity.github_repository || identity.github_repository !== text(record(registered.workflow).repository).toLowerCase() ||
      (incoming.artifact_id != null && incoming.artifact_id !== "" && !UUID.test(identity.artifact_id))) {
    return failure("deploy_callback_identity_mismatch");
  }

  const bound = record(registered.callback_attempt);
  if (bound.github_run_id && !sameIdentity(bound, identity)) {
    return failure("deploy_callback_run_mismatch");
  }
  const active = request.status === "executed" && request.deployment_status === "started";

  if (body.status === "started") {
    if (text(body.deployment_id) !== executionId) return failure("deploy_execution_mismatch");
    if (bound.github_run_id) return { kind: "duplicate" };
    if (!active) return failure("deploy_attempt_not_active");
    return { kind: "bind", identity, executionId };
  }

  if (!bound.github_run_id) return failure("deploy_attempt_not_bound");
  const publication = readFinalPublication(body, identity, executionId);
  if (!publication) return failure("invalid_publication_evidence");
  const existingPublication = record(registered.publication);
  if (existingPublication.status) {
    return existingPublication.status === publication.status &&
      existingPublication.netlify_deploy_id === publication.netlify_deploy_id
      ? { kind: "duplicate" } : failure("deploy_callback_outcome_conflict");
  }
  if (!active) return failure("deploy_attempt_not_active");
  return { kind: "finalize", identity: bound, executionId, publication };
}

export function readDeployReconciliation(metadata, deploymentId) {
  const stored = record(metadata);
  const attempt = record(stored.callback_attempt);
  const publication = record(stored.publication);
  const reconciliation = record(stored.ops_reconciliation);
  if (!attempt.github_run_id || !deploymentId || stored.deploy_execution_id !== deploymentId ||
      stored.deploy_mode !== "github_artifact_exact") {
    return { publication: null, reconciliation: null };
  }

  return {
    publication: ["published", "not_published", "not_confirmed"].includes(publication.status) ? {
      status: publication.status,
      netlify_site_id: publication.netlify_site_id ?? null,
      netlify_deploy_id: publication.netlify_deploy_id ?? null,
      reported_at: publication.reported_at ?? null,
    } : null,
    reconciliation: {
      status: ["complete", "incomplete"].includes(reconciliation.status) ? reconciliation.status : "pending",
      reason: reconciliation.reason ?? null,
      updated_at: reconciliation.updated_at ?? null,
      deploy_execution_id: stored.deploy_execution_id,
      github_run_id: attempt.github_run_id,
      github_run_attempt: attempt.github_run_attempt,
    },
  };
}
