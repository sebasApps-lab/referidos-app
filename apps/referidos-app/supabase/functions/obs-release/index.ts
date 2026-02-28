import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getOptionalAuthedUser,
  getUsuarioByAuthId,
  jsonResponse,
  resolveTenantIdByHint,
  resolveTenantIdByOrigin,
  scrubUnknown,
  supabaseAdmin,
} from "../_shared/observability.ts";

function safeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function safeObject(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function safeInteger(value: unknown): number | null {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  const intVal = Math.trunc(num);
  if (intVal < 1) return null;
  return intVal;
}

function mergeMeta(
  base: Record<string, unknown>,
  next: Record<string, unknown>,
) {
  const merged: Record<string, unknown> = { ...base, ...next };

  const baseSourcemaps = safeObject(base.sourcemaps);
  const nextSourcemaps = safeObject(next.sourcemaps);
  if (Object.keys(baseSourcemaps).length || Object.keys(nextSourcemaps).length) {
    merged.sourcemaps = { ...baseSourcemaps, ...nextSourcemaps };
  }

  return merged;
}

serve(async (req) => {
  const cors = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse(
      { ok: false, code: "method_not_allowed", message: "Method not allowed" },
      405,
      cors,
    );
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const appId = safeString(body.app_id);
  const appVersion = safeString(body.app_version);
  if (!appId || !appVersion) {
    return jsonResponse(
      {
        ok: false,
        code: "invalid_release_payload",
        message: "app_id and app_version are required",
      },
      400,
      cors,
    );
  }

  const auth = await getOptionalAuthedUser(req);

  let tenantId: string | null = null;
  if (auth.authUser?.id) {
    const profile = await getUsuarioByAuthId(auth.authUser.id);
    if (!profile.error && profile.usuario) {
      const tenantFromProfile = String(
        (profile.usuario as Record<string, unknown>).tenant_id || "",
      );
      if (tenantFromProfile) {
        tenantId = tenantFromProfile;
      }
    }
  }

  if (!tenantId) tenantId = await resolveTenantIdByOrigin(req);
  if (!tenantId) tenantId = await resolveTenantIdByHint(safeString(body.tenant_hint));
  if (!tenantId) {
    return jsonResponse(
      {
        ok: false,
        code: "tenant_resolution_failed",
        message: "Could not resolve tenant by origin or tenant_hint",
      },
      400,
      cors,
    );
  }

  const buildId = safeString(body.build_id) || "";
  const env = safeString(body.env) || "";
  const incomingMeta = scrubUnknown(body.meta || {});
  const safeIncomingMeta = safeObject(incomingMeta);
  const buildNumber =
    safeInteger(body.build_number) ??
    safeInteger(safeObject(safeIncomingMeta.versioning).build_number);
  const versionReleaseId =
    safeString(body.version_release_id) ||
    safeString(safeObject(safeIncomingMeta.versioning).release_id) ||
    null;
  const artifactId =
    safeString(body.artifact_id) ||
    safeString(safeObject(safeIncomingMeta.versioning).artifact_id) ||
    null;

  const { data: existingRelease } = await supabaseAdmin
    .from("obs_releases")
    .select("id, meta")
    .eq("tenant_id", tenantId)
    .eq("app_id", appId)
    .eq("app_version", appVersion)
    .eq("build_id", buildId)
    .eq("env", env)
    .limit(1)
    .maybeSingle();

  const mergedMeta = mergeMeta(
    safeObject(existingRelease?.meta),
    safeIncomingMeta,
  );

  const { data, error } = await supabaseAdmin
    .from("obs_releases")
    .upsert(
      {
        tenant_id: tenantId,
        app_id: appId,
        app_version: appVersion,
        build_id: buildId,
        build_number: buildNumber,
        version_release_id: versionReleaseId,
        artifact_id: artifactId,
        env,
        meta: mergedMeta,
      },
      {
        onConflict: "tenant_id,app_id,app_version,build_id,env",
      },
    )
    .select(
      "id, tenant_id, app_id, app_version, build_id, build_number, version_release_id, artifact_id, env, created_at"
    )
    .single();

  if (error) {
    return jsonResponse(
      { ok: false, code: "release_upsert_failed", message: "Could not register release" },
      500,
      cors,
    );
  }

  return jsonResponse(
    {
      ok: true,
      release: data,
    },
    200,
    cors,
  );
});
