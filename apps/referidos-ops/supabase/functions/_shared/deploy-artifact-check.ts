import { supabaseAdmin } from "./support.ts";
import { callbackArtifactLookup, verifyCallbackArtifact } from "./deploy-callback-artifact.mjs";

type JsonObject = Record<string, unknown>;

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asUuid(value: unknown): string | null {
  const text = asString(value);
  if (!text) return null;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text)
    ? text
    : null;
}

export type DeployRequest = {
  id: string;
  tenant_id: string;
  product_id: string;
  product_key: string;
  release_id: string;
  env_id: string;
  env_key: string;
  version_label: string;
  status: string;
  deployment_status: string;
  deployment_id: string;
  updated_at: string;
  metadata: JsonObject | null;
};

export async function verifyArtifactForRequest(request: DeployRequest, metadata: JsonObject) {
  const lookup = callbackArtifactLookup(metadata, request.release_id);
  if (!lookup) return { ok: false, reason: "invalid_callback_artifact_id" } as const;

  const [releaseLookup, artifactLookup] = await Promise.all([
    supabaseAdmin.from("version_releases")
      .select("id, tenant_id, product_id, env_id, source_commit_sha")
      .eq("id", request.release_id)
      .maybeSingle(),
    supabaseAdmin.from("version_release_artifacts_labeled")
      .select("id, tenant_id, product_id, product_key, release_id, version_label, semver, commit_sha, checksum_sha256, artifact_provider, metadata")
      .eq(lookup.column, lookup.value)
      .maybeSingle(),
  ]);
  if (releaseLookup.error || artifactLookup.error) return { ok: false, reason: "callback_artifact_lookup_failed" } as const;

  const verified = verifyCallbackArtifact({
    request,
    release: releaseLookup.data,
    artifact: artifactLookup.data,
    lookup,
    metadata,
  });
  if (!verified.ok) return verified;
  if (lookup.column === "release_id") {
    const { data: promotions, error } = await supabaseAdmin.from("version_promotions")
      .select("from_release_id").eq("to_release_id", request.release_id).limit(1);
    return !error && promotions?.length === 0
      ? verified
      : { ok: false, reason: "promoted_callback_requires_artifact_id" } as const;
  }

  // Recheck ownership in OPS itself. An explicit ID identifies an artifact, not its promotional ancestry.
  const environments = ["dev", "staging", "prod"];
  let currentId = request.release_id;
  let rank = environments.indexOf(request.env_key);
  while (rank >= 0) {
    const direct = await supabaseAdmin.from("version_release_artifacts_labeled")
      .select("id").eq("release_id", currentId).maybeSingle();
    if (direct.error) return { ok: false, reason: "callback_artifact_lookup_failed" } as const;
    if (direct.data?.id === verified.artifactId && currentId === artifactLookup.data?.release_id) return verified;
    if (direct.data || rank === 0) break;

    const { data: promotions, count, error } = await supabaseAdmin.from("version_promotions")
      .select("from_release_id, tenant_id, product_id", { count: "exact" })
      .eq("to_release_id", currentId).limit(500);
    if (error || !promotions || count !== promotions.length || promotions.length >= 500 ||
        promotions.some((row) => row.tenant_id !== request.tenant_id || row.product_id !== request.product_id)) break;
    const sources = new Set(promotions.map((row) => asUuid(row.from_release_id)));
    const [sourceId] = sources;
    if (sources.size !== 1 || !sourceId) break;

    const source = await supabaseAdmin.from("version_releases_labeled")
      .select("id, tenant_id, env_key, product_key, version_label, source_commit_sha").eq("id", sourceId).maybeSingle();
    const row = source.data;
    if (source.error || !row || row.id !== sourceId || row.tenant_id !== request.tenant_id ||
        row.product_key !== request.product_key || row.version_label !== request.version_label ||
        asString(row.source_commit_sha).toLowerCase() !== verified.sourceCommitSha) break;
    const sourceRank = environments.indexOf(row.env_key);
    if (sourceRank < 0 || sourceRank >= rank) break;
    currentId = sourceId;
    rank = sourceRank;
  }
  return { ok: false, reason: "callback_artifact_lineage_mismatch" } as const;
}
