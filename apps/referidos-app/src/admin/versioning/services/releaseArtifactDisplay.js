function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

function commitSha(value) {
  const sha = text(value).toLowerCase();
  return /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(sha) ? sha : "";
}

function hasArtifactLocation(artifact) {
  if (!text(artifact.id) || !text(artifact.artifact_name)) return false;
  if (artifact.artifact_provider === "supabase_storage") {
    return Boolean(text(artifact.artifact_path));
  }
  if (artifact.artifact_provider === "github_actions") {
    return /^[1-9]\d*$/.test(String(artifact.github_run_id ?? ""));
  }
  return false;
}

function metadataMatches(artifact, productKey, versionLabel) {
  const metadata = artifact.metadata;
  const product = text(metadata?.product_key);
  const version = text(metadata?.version_label);
  const ownerEnv = text(artifact.env_key);
  const metadataEnv = text(metadata?.env_key);
  const storagePath = text(metadata?.storage_path);

  return (!product || product === productKey) &&
    (!version || version === versionLabel) &&
    (!metadataEnv || !ownerEnv || metadataEnv === ownerEnv) &&
    (!storagePath || artifact.artifact_provider !== "supabase_storage" ||
      storagePath === text(artifact.artifact_path));
}

/**
 * Resolves registry evidence for a release. A match identifies a registered copy.
 * Registry rows alone cannot establish that an object still exists or was deployed.
 * Among exact candidates, prefer the release's own row, then the environment head.
 * Multiple qualifying rows at the same priority are ambiguous.
 */
export function resolveReleaseArtifact(release, artifacts = []) {
  const releaseId = text(release?.id);
  const tenantId = text(release?.tenant_id);
  const productKey = text(release?.product_key);
  const versionLabel = text(release?.version_label);
  const sha = commitSha(release?.source_commit_sha);
  const envKey = text(release?.env_key);
  const directMatches = [];
  const envHeadMatches = [];
  const matches = [];
  let hasUnverifiedCandidate = false;

  for (const artifact of artifacts ?? []) {
    const isDirect = Boolean(releaseId && text(artifact?.release_id) === releaseId);
    const belongsToTenant = !tenantId || text(artifact?.tenant_id) === tenantId;
    const artifactVersion = text(artifact?.version_label) || text(artifact?.semver);
    const isSameVersion = Boolean(productKey && versionLabel && belongsToTenant &&
      text(artifact?.product_key) === productKey && artifactVersion === versionLabel);

    if (!isDirect && !isSameVersion) continue;
    if (artifact.artifact_provider === "supabase_storage" && artifact.metadata?.storage_deleted_at) continue;

    const storedSemver = text(artifact.semver);
    if (!isSameVersion || !sha || commitSha(artifact.commit_sha) !== sha ||
      (storedSemver && storedSemver !== versionLabel) ||
      !metadataMatches(artifact, productKey, versionLabel) || !hasArtifactLocation(artifact)) {
      hasUnverifiedCandidate = true;
      continue;
    }

    if (isDirect) {
      directMatches.push(artifact);
    } else if (envKey && Array.isArray(artifact.env_heads) && artifact.env_heads.includes(envKey)) {
      envHeadMatches.push(artifact);
    } else {
      matches.push(artifact);
    }
  }

  const preferred = [directMatches, envHeadMatches, matches].find((candidates) => candidates.length > 0);
  if (!preferred) return { artifact: null, state: hasUnverifiedCandidate ? "unverified" : "missing" };
  if (preferred.length > 1) return { artifact: null, state: "ambiguous" };
  return { artifact: preferred[0], state: "matched" };
}
