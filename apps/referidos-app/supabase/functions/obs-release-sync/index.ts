import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  corsHeaders,
  jsonResponse,
  resolveTenantIdByHint,
  sha256Hex,
  supabaseAdmin,
} from "../_shared/observability.ts";

type JsonObject = Record<string, unknown>;

const SYNC_HEADER = "x-obs-release-sync-token";
const DEFAULT_TENANT_HINT = "ReferidosAPP";

function asString(value: unknown, fallback = ""): string {
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

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  return [];
}

function parseInteger(value: unknown): number | null {
  const next = Number(value);
  if (!Number.isFinite(next)) return null;
  const normalized = Math.trunc(next);
  if (normalized < 1) return null;
  return normalized;
}

function parseBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
}

function asJsonObject(value: unknown): JsonObject {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as JsonObject;
}

function mergeMeta(base: JsonObject, next: JsonObject): JsonObject {
  const merged: JsonObject = { ...base, ...next };
  const baseVersioning = asJsonObject(base.versioning);
  const nextVersioning = asJsonObject(next.versioning);
  if (Object.keys(baseVersioning).length || Object.keys(nextVersioning).length) {
    merged.versioning = { ...baseVersioning, ...nextVersioning };
  }
  return merged;
}

const opsUrl = asString(Deno.env.get("VERSIONING_OPS_URL"));
const opsSecretKey = asString(Deno.env.get("VERSIONING_OPS_SECRET_KEY"));
const expectedSyncToken = asString(Deno.env.get("OBS_RELEASE_SYNC_TOKEN"));

const opsAdmin = createClient(opsUrl || "https://invalid.local", opsSecretKey || "invalid", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

function ensureRuntimeEnv() {
  if (!opsUrl || !opsSecretKey || !expectedSyncToken) {
    return {
      ok: false,
      error: "missing_runtime_env",
      detail:
        "Missing VERSIONING_OPS_URL / VERSIONING_OPS_SECRET_KEY / OBS_RELEASE_SYNC_TOKEN",
    };
  }
  return { ok: true };
}

async function resolveTenantId(tenantHint: string): Promise<string | null> {
  const hintResolved = await resolveTenantIdByHint(tenantHint);
  if (hintResolved) return hintResolved;
  const { data } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return asString(data?.id) || null;
}

async function fetchReleaseSnapshotFromOps({
  productKey,
  envKey,
  semver,
  releaseId,
}: {
  productKey: string;
  envKey: string;
  semver: string;
  releaseId: string;
}) {
  let releaseQuery = opsAdmin
    .from("version_releases_labeled")
    .select(
      [
        "id",
        "tenant_id",
        "product_key",
        "product_name",
        "env_key",
        "env_name",
        "semver_major",
        "semver_minor",
        "semver_patch",
        "prerelease_tag",
        "prerelease_no",
        "version_label",
        "status",
        "source_commit_sha",
        "build_number",
        "channel",
        "created_at",
        "updated_at",
      ].join(", ")
    );

  if (releaseId) {
    releaseQuery = releaseQuery.eq("id", releaseId);
  } else {
    if (!productKey || !envKey) {
      throw new Error("product_key y env_key son requeridos cuando no se envia release_id");
    }
    releaseQuery = releaseQuery.eq("product_key", productKey).eq("env_key", envKey);
    if (semver) {
      releaseQuery = releaseQuery.eq("version_label", semver);
    } else {
      releaseQuery = releaseQuery
        .order("semver_major", { ascending: false })
        .order("semver_minor", { ascending: false })
        .order("semver_patch", { ascending: false })
        .order("prerelease_no", { ascending: false })
        .order("created_at", { ascending: false });
    }
  }

  const { data: releaseRows, error: releaseError } = await releaseQuery.limit(1);
  if (releaseError) throw new Error(`release_query_failed: ${releaseError.message}`);
  const release = Array.isArray(releaseRows) ? releaseRows[0] : null;
  if (!release) throw new Error("release_not_found");

  const releaseIdResolved = asString((release as JsonObject).id);
  const { data: componentRows, error: componentsError } = await opsAdmin
    .from("version_release_components_labeled")
    .select(
      [
        "release_id",
        "component_id",
        "component_key",
        "component_type",
        "component_name",
        "revision_id",
        "revision_no",
        "bump_level",
        "content_hash",
        "source_commit_sha",
        "source_branch",
        "revision_created_at",
      ].join(", ")
    )
    .eq("release_id", releaseIdResolved)
    .order("component_key", { ascending: true });
  if (componentsError) {
    throw new Error(`release_components_query_failed: ${componentsError.message}`);
  }

  const components = (componentRows || []) as JsonObject[];
  const componentIds = Array.from(
    new Set(
      components
        .map((row) => asString(row.component_id))
        .filter(Boolean)
    )
  );

  const pathsByComponent = new Map<string, string[]>();
  if (componentIds.length) {
    const { data: pathRows, error: pathError } = await opsAdmin
      .from("version_component_paths")
      .select("component_id, path_glob, include")
      .in("component_id", componentIds)
      .eq("include", true);

    if (pathError) throw new Error(`component_paths_query_failed: ${pathError.message}`);
    for (const item of (pathRows || []) as JsonObject[]) {
      const componentId = asString(item.component_id);
      const pathGlob = asString(item.path_glob);
      if (!componentId || !pathGlob) continue;
      const current = pathsByComponent.get(componentId) || [];
      current.push(pathGlob);
      pathsByComponent.set(componentId, current);
    }
  }

  let artifactId = "";
  const { data: artifactRow, error: artifactError } = await opsAdmin
    .from("version_release_artifacts_labeled")
    .select("id")
    .eq("release_id", releaseIdResolved)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (artifactError) {
    throw new Error(`release_artifact_query_failed: ${artifactError.message}`);
  }
  artifactId = asString((artifactRow as JsonObject | null)?.id);

  return {
    release: release as JsonObject,
    artifact_id: artifactId || null,
    components: components.map((component) => {
      const componentId = asString(component.component_id);
      return {
        ...component,
        path_globs: pathsByComponent.get(componentId) || [],
      };
    }),
  };
}

async function buildSnapshotHash(releaseId: string, components: JsonObject[]) {
  const rows = components
    .map((component) => {
      const key = asString(component.component_key);
      const revisionId = asString(component.revision_id);
      const revisionNo = parseInteger(component.revision_no);
      const pathGlobs = asArray(component.path_globs).map((entry) => asString(entry)).filter(Boolean).sort();
      return `${key}|${revisionId}|${revisionNo ?? ""}|${pathGlobs.join(",")}`;
    })
    .sort();
  const seed = `${releaseId}::${rows.join("||")}`;
  return await sha256Hex(seed);
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const envCheck = ensureRuntimeEnv();
  if (!envCheck.ok) {
    return jsonResponse(envCheck, 500, cors);
  }

  const receivedToken = asString(req.headers.get(SYNC_HEADER));
  if (!receivedToken || receivedToken !== expectedSyncToken) {
    return jsonResponse({ ok: false, error: "invalid_sync_token" }, 401, cors);
  }

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const tenantHint = asString(body.tenant_hint, DEFAULT_TENANT_HINT);
  const appId = asString(body.app_id);
  const productKey = asString(body.product_key).toLowerCase();
  const envKey = asString(body.env_key).toLowerCase();
  const semver = asString(body.semver || body.version_label);
  const releaseId = asString(body.release_id);
  const actor = asString(body.actor, "system:deploy-callback");
  const force = parseBoolean(body.force, false);
  const syncMetadata = asObject(body.metadata);

  if (!appId) {
    return jsonResponse({ ok: false, error: "missing_app_id" }, 400, cors);
  }
  if (!releaseId && (!productKey || !envKey)) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_release_selector",
        detail: "release_id o (product_key + env_key) son requeridos.",
      },
      400,
      cors
    );
  }

  const tenantId = await resolveTenantId(tenantHint);
  if (!tenantId) {
    return jsonResponse(
      {
        ok: false,
        error: "tenant_resolution_failed",
        detail: "No se pudo resolver tenant para snapshot sync.",
      },
      400,
      cors
    );
  }

  try {
    const snapshot = await fetchReleaseSnapshotFromOps({
      productKey,
      envKey,
      semver,
      releaseId,
    });

    const release = snapshot.release;
    const releaseIdResolved = asString(release.id);
    const envKeyResolved = asString(release.env_key).toLowerCase();
    const versionLabel = asString(release.version_label);
    const sourceCommitSha = asString(release.source_commit_sha);
    const buildNumber = parseInteger(release.build_number);
    const channel = asString(release.channel || envKeyResolved || "unknown").toLowerCase();
    const artifactId = asString(snapshot.artifact_id);
    const productKeyResolved = asString(release.product_key).toLowerCase();

    if (!releaseIdResolved || !envKeyResolved || !versionLabel || !productKeyResolved) {
      throw new Error("release_snapshot_invalid_shape");
    }

    const snapshotHash = await buildSnapshotHash(releaseIdResolved, snapshot.components);

    const { data: existingSnapshot } = await supabaseAdmin
      .from("obs_release_snapshots")
      .select("id, snapshot_hash, metadata")
      .eq("tenant_id", tenantId)
      .eq("app_id", appId)
      .eq("env_key", envKeyResolved)
      .eq("version_label", versionLabel)
      .limit(1)
      .maybeSingle();

    const shouldSkipByHash =
      Boolean(existingSnapshot?.id) &&
      asString(existingSnapshot.snapshot_hash) === snapshotHash &&
      !force;

    let snapshotId = asString(existingSnapshot?.id);
    if (!shouldSkipByHash) {
      const snapshotMetadata = {
        release: {
          product_key: productKeyResolved,
          env_key: envKeyResolved,
          status: asString(release.status),
          source_commit_sha: sourceCommitSha || null,
          semver_major: parseInteger(release.semver_major),
          semver_minor: parseInteger(release.semver_minor),
          semver_patch: parseInteger(release.semver_patch),
          prerelease_tag: asString(release.prerelease_tag) || null,
          prerelease_no: parseInteger(release.prerelease_no),
          build_number: buildNumber,
          channel: channel || null,
          artifact_id: artifactId || null,
          created_at: asString(release.created_at) || null,
          updated_at: asString(release.updated_at) || null,
        },
        sync: {
          actor,
          force,
          synchronized_at: new Date().toISOString(),
          component_count: snapshot.components.length,
          ...syncMetadata,
        },
      };

      const { data: upsertedSnapshot, error: snapshotError } = await supabaseAdmin
        .from("obs_release_snapshots")
        .upsert(
          {
            tenant_id: tenantId,
            app_id: appId,
            product_key: productKeyResolved,
            env_key: envKeyResolved,
            version_label: versionLabel,
            version_release_id: releaseIdResolved,
            source_commit_sha: sourceCommitSha || null,
            snapshot_hash: snapshotHash,
            metadata: mergeMeta(asObject(existingSnapshot?.metadata), snapshotMetadata),
          },
          {
            onConflict: "tenant_id,app_id,env_key,version_label",
          }
        )
        .select("id")
        .single();

      if (snapshotError || !upsertedSnapshot?.id) {
        throw new Error(`snapshot_upsert_failed: ${snapshotError?.message || "unknown"}`);
      }
      snapshotId = asString(upsertedSnapshot.id);

      await supabaseAdmin
        .from("obs_release_snapshot_components")
        .delete()
        .eq("snapshot_id", snapshotId);

      if (snapshot.components.length > 0) {
        const componentRows = snapshot.components.map((component) => ({
          tenant_id: tenantId,
          snapshot_id: snapshotId,
          component_key: asString(component.component_key),
          component_type: asString(component.component_type) || null,
          component_name: asString(component.component_name) || null,
          revision_id: asString(component.revision_id) || null,
          revision_no: parseInteger(component.revision_no),
          revision_bump_level: asString(component.bump_level) || null,
          revision_source_commit_sha: asString(component.source_commit_sha) || null,
          revision_source_branch: asString(component.source_branch) || null,
          path_globs: asArray(component.path_globs)
            .map((entry) => asString(entry))
            .filter(Boolean),
          metadata: {
            component_id: asString(component.component_id) || null,
            content_hash: asString(component.content_hash) || null,
            revision_created_at: asString(component.revision_created_at) || null,
          },
        }));
        const { error: componentInsertError } = await supabaseAdmin
          .from("obs_release_snapshot_components")
          .insert(componentRows);
        if (componentInsertError) {
          throw new Error(`snapshot_components_insert_failed: ${componentInsertError.message}`);
        }
      }
    }

    const buildId = buildNumber ? String(buildNumber) : sourceCommitSha || "";
    const { data: existingRelease } = await supabaseAdmin
      .from("obs_releases")
      .select("id, meta")
      .eq("tenant_id", tenantId)
      .eq("app_id", appId)
      .eq("app_version", versionLabel)
      .eq("build_id", buildId)
      .eq("env", envKeyResolved)
      .limit(1)
      .maybeSingle();

    const versioningMeta = {
      versioning: {
        release_id: releaseIdResolved,
        product_key: productKeyResolved,
        env_key: envKeyResolved,
        version_label: versionLabel,
        source_commit_sha: sourceCommitSha || null,
        build_number: buildNumber,
        channel: channel || null,
        artifact_id: artifactId || null,
        snapshot_hash: snapshotHash,
        snapshot_id: snapshotId || null,
      },
    };

    await supabaseAdmin.from("obs_releases").upsert(
      {
        tenant_id: tenantId,
        app_id: appId,
        app_version: versionLabel,
        build_id: buildId,
        build_number: buildNumber,
        version_release_id: releaseIdResolved,
        artifact_id: artifactId || null,
        env: envKeyResolved,
        meta: mergeMeta(asObject(existingRelease?.meta), versioningMeta),
      },
      {
        onConflict: "tenant_id,app_id,app_version,build_id,env",
      }
    );

    return jsonResponse(
      {
        ok: true,
        tenant_id: tenantId,
        app_id: appId,
        product_key: productKeyResolved,
        env_key: envKeyResolved,
        version_label: versionLabel,
        version_release_id: releaseIdResolved,
        snapshot_id: snapshotId || null,
        snapshot_hash: snapshotHash,
        component_count: snapshot.components.length,
        skipped_by_hash: shouldSkipByHash,
      },
      200,
      cors
    );
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: "snapshot_sync_failed",
        detail: error instanceof Error ? error.message : "unknown_error",
      },
      500,
      cors
    );
  }
});
