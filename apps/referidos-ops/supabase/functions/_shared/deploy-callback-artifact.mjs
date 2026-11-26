const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
const COMMIT_SHA = /^[a-f0-9]{40}$/i;
const SHA256 = /^[a-f0-9]{64}$/i;

function matches(value, pattern) {
  return typeof value === "string" && pattern.test(value);
}

export function callbackArtifactLookup(metadata, releaseId) {
  const artifactId = metadata.artifact_id;
  if (artifactId == null || artifactId === "") {
    return matches(releaseId, UUID) ? { column: "release_id", value: releaseId } : null;
  }
  return matches(artifactId, UUID) ? { column: "id", value: artifactId.toLowerCase() } : null;
}

/** @returns {{ ok: true, artifactId: string, sourceCommitSha: string } | { ok: false, reason: string }} */
export function verifyCallbackArtifact({ request, release, artifact, lookup, metadata }) {
  if (!release || release.id !== request.release_id ||
      release.tenant_id !== request.tenant_id || release.product_id !== request.product_id ||
      release.env_id !== request.env_id || !matches(release.source_commit_sha, COMMIT_SHA)) {
    return { ok: false, reason: "release_identity_mismatch" };
  }

  if (!artifact) return { ok: false, reason: "artifact_not_found" };
  if (!matches(artifact.id, UUID) || artifact[lookup.column] !== lookup.value ||
      artifact.tenant_id !== release.tenant_id || artifact.product_id !== release.product_id ||
      artifact.product_key !== request.product_key || artifact.version_label !== request.version_label ||
      artifact.semver !== request.version_label) {
    return { ok: false, reason: "artifact_identity_mismatch" };
  }

  const sourceCommitSha = release.source_commit_sha.toLowerCase();
  const sourceCommitClaim = metadata.source_commit_sha;
  if (!matches(artifact.commit_sha, COMMIT_SHA) || artifact.commit_sha.toLowerCase() !== sourceCommitSha ||
      (sourceCommitClaim != null && (!matches(sourceCommitClaim, COMMIT_SHA) ||
        sourceCommitClaim.toLowerCase() !== sourceCommitSha))) {
    return { ok: false, reason: "artifact_commit_mismatch" };
  }

  if (!["supabase_storage", "github_actions"].includes(artifact.artifact_provider)) {
    return { ok: false, reason: "artifact_provider_unsupported" };
  }
  if (artifact.artifact_provider === "supabase_storage" && artifact.metadata?.storage_deleted_at != null) {
    return { ok: false, reason: "artifact_storage_deleted" };
  }

  const checksum = metadata.artifact_checksum_sha256;
  if (checksum != null && (!matches(checksum, SHA256) || !matches(artifact.checksum_sha256, SHA256) ||
      checksum.toLowerCase() !== artifact.checksum_sha256.toLowerCase())) {
    return { ok: false, reason: "artifact_checksum_mismatch" };
  }

  return { ok: true, artifactId: artifact.id, sourceCommitSha };
}
