import { netlifyDeployTitle, readNetlifyCurrentDeploy, readNetlifyPublication } from "./deploy-netlify-proof.mjs";

const ACTOR = "system:deploy-reconcile";
const BATCH_SIZE = 3;
const LEASE_SECONDS = 90;

function retryDelay(retryCount) {
  const count = Number.isSafeInteger(retryCount) ? Math.max(0, retryCount - 1) : 0;
  return Math.min(1800, 30 * 2 ** Math.min(count, 6));
}

async function call(database, name, args) {
  const { data, error } = await database.rpc(name, args);
  return error || !data?.ok ? null : data;
}

export async function reconcileDeployAttempt(attempt, { database, netlifyToken, dispatchReserved, observeGithub, verifyArtifact, syncObservability,
  observeNetlify = readNetlifyPublication, observeCurrentDeploy = readNetlifyCurrentDeploy }) {
  const lease = { p_execution_id: attempt.execution_id, p_lease_token: attempt.lease_token };
  const binding = attempt.callback_binding;
  const spec = attempt.dispatch_spec;

  async function retry(reason) {
    const saved = await call(database, "versioning_release_deploy_reconciliation", {
      ...lease, p_reason: reason, p_retry_after_seconds: retryDelay(attempt.retry_count),
    });
    return { status: saved ? "deferred" : "lease_lost", reason };
  }

  async function recordObservability(status, detail) {
    const saved = await call(database, "versioning_record_deploy_observability", {
      ...lease, p_status: status, p_detail: detail,
    });
    // The official release already exists even if recording OBS fails.
    return { status: "complete", observability: saved ? status : "pending" };
  }

  async function closeBeforePublication() {
    const result = await call(database, "versioning_finalize_deploy_attempt", { ...lease, p_actor: ACTOR });
    if (!result) return await retry("finalize_not_published_failed");
    return { status: "complete", observability: "not_required" };
  }

  try {
    if (attempt.dispatch_state === "reserved") {
      const dispatch = await dispatchReserved(attempt);
      return await retry(dispatch.accepted ? "awaiting_workflow_callback" : dispatch.reason ?? "dispatch_outcome_unconfirmed");
    }

    if (attempt.publication_status === "not_published") return await closeBeforePublication();

    if (!attempt.publish_authorized) {
      const proof = await observeGithub(attempt);
      if (proof.status !== "completed" || !proof.evidence) return await retry(proof.reason ?? "awaiting_workflow_callback");
      const recorded = await call(database, "versioning_record_unpublished_deploy_attempt", {
        ...lease, p_github_run: proof.evidence,
      });
      if (!recorded) return await retry("unpublished_workflow_proof_rejected");
      return await closeBeforePublication();
    }

    const title = attempt.prepared_metadata?.netlify_deploy_title;
    if (!binding?.github_run_id || title !== netlifyDeployTitle(binding, attempt.execution_id) ||
        spec?.netlify_site_id !== binding.netlify_site_id || !spec?.netlify_site_name) {
      return await retry("awaiting_prepared_publication");
    }

    // If OPS completed previously, only OBS is retried. It is scoped to this exact release.
    let publication = attempt.publication;
    if (attempt.reconciliation_status !== "complete") {
      const proof = await observeNetlify({ siteId: spec.netlify_site_id, siteName: spec.netlify_site_name, title,
        reportedId: publication?.netlify_deploy_id ?? publication?.reported_deploy_id ?? null, token: netlifyToken });
      if (proof.status !== "published") return await retry(proof.reason);
      const recorded = await call(database, "versioning_record_deploy_publication", {
        ...lease, p_binding: binding, p_publication: proof.evidence, p_metadata: {},
      });
      if (!recorded) return await retry("publication_record_failed");
      if (proof.reason) return { status: "incomplete", reason: proof.reason };
      publication = proof.evidence;

      const verification = await verifyArtifact(attempt);
      if (!verification.ok) return await retry(verification.reason ?? "callback_artifact_unverified");

      // Narrow the cross-service race after persisting evidence and checking the artifact.
      const current = await observeCurrentDeploy({ siteId: spec.netlify_site_id, siteName: spec.netlify_site_name, token: netlifyToken });
      if (!current.ok) return await retry(current.reason);
      if (current.deployId !== publication.netlify_deploy_id) {
        const reason = "netlify_deploy_superseded";
        const superseded = await call(database, "versioning_record_deploy_publication", {
          ...lease, p_binding: binding, p_metadata: {}, p_publication: {
            ...publication, netlify_current_deploy_id: current.deployId,
            observed_at: current.observedAt, reconciliation_block: reason,
          },
        });
        return superseded ? { status: "incomplete", reason } : await retry("publication_record_failed");
      }
      const finalized = await call(database, "versioning_finalize_deploy_attempt", { ...lease, p_actor: ACTOR });
      if (!finalized) return await retry("finalize_deploy_failed");
    }

    if (publication?.status !== "published" || !publication.netlify_deploy_id || publication.netlify_site_id !== spec.netlify_site_id) {
      return await recordObservability("failed", "observability_publication_unverified");
    }
    let synced = false;
    try {
      synced = (await syncObservability({ requestId: attempt.request_id, releaseId: binding.release_id,
        productKey: binding.product_key, envKey: binding.env_key, versionLabel: binding.semver,
        executionId: attempt.execution_id, artifactId: binding.artifact_id,
        deploymentId: publication.netlify_deploy_id, actor: ACTOR })).ok === true;
    } catch {
      // OBS availability does not change official deployment evidence.
    }
    return await recordObservability(synced ? "synced" : "failed", synced ? null : "obs_release_sync_failed");
  } catch {
    try {
      return await retry("reconciliation_unexpected_failure");
    } catch {
      // The lease expires automatically if OPS is unavailable during status writes.
      return { status: "lease_lost", reason: "reconciliation_status_unavailable" };
    }
  }
}

export async function runDeployReconciliation(dependencies) {
  const claimed = await call(dependencies.database, "versioning_claim_deploy_reconciliation", {
    p_worker_id: crypto.randomUUID(), p_limit: BATCH_SIZE, p_lease_seconds: LEASE_SECONDS,
    p_env_key: dependencies.envKey ?? "staging",
  });
  if (!Array.isArray(claimed?.attempts) || claimed.attempts.length > BATCH_SIZE) return { ok: false, error: "reconciliation_claim_failed" };
  const results = await Promise.all(claimed.attempts.map((attempt) => reconcileDeployAttempt(attempt, dependencies)));
  return { ok: true, processed: results.length, results };
}
