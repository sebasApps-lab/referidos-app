import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

type OpsAppRow = {
  tenant_id: string;
  app_key: string;
  app_code: string;
  display_name: string;
  origin_source_default: string;
  aliases: string[] | null;
  is_active: boolean;
  soft_deleted_at: string | null;
  purge_after: string | null;
};

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function asObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function normalizeAliases(value: unknown, appCode: string) {
  const source = Array.isArray(value) ? value : [];
  const normalized = Array.from(
    new Set(
      source
        .map((item) => asString(item).toLowerCase())
        .filter(Boolean),
    ),
  );
  if (appCode) normalized.push(appCode);
  return Array.from(new Set(normalized)).sort();
}

const opsUrl = asString(Deno.env.get("SUPPORT_OPS_URL"));
const opsSecretKey = asString(Deno.env.get("SUPPORT_OPS_SECRET_KEY"));
const sharedToken = asString(Deno.env.get("SUPPORT_OPS_SHARED_TOKEN"));
const explicitProjectRef = asString(Deno.env.get("SUPPORT_APPS_SOURCE_PROJECT_REF"));
const sourceEnvKey = asString(Deno.env.get("SUPPORT_APPS_SOURCE_ENV_KEY"), "dev").toLowerCase();

function inferProjectRefFromUrl() {
  const supabaseUrl = asString(Deno.env.get("SUPABASE_URL") ?? Deno.env.get("URL"));
  if (!supabaseUrl) return "";
  try {
    const url = new URL(supabaseUrl);
    const host = url.hostname || "";
    return host.split(".")[0] || "";
  } catch {
    return "";
  }
}

const sourceProjectRef = explicitProjectRef || inferProjectRefFromUrl();

function ensureEnv() {
  if (!opsUrl || !opsSecretKey || !sharedToken || !sourceProjectRef || !sourceEnvKey) {
    return {
      ok: false,
      error: "missing_env",
      detail:
        "Missing SUPPORT_OPS_URL/SUPPORT_OPS_SECRET_KEY/SUPPORT_OPS_SHARED_TOKEN/SUPPORT_APPS_SOURCE_PROJECT_REF/SUPPORT_APPS_SOURCE_ENV_KEY",
    };
  }
  return { ok: true };
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("SUPPORT_OPS_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get("x-support-ops-token"));
  return Boolean(received) && received === expected;
}

async function resolveTenantIdForActor(actorTenantId: string) {
  if (actorTenantId) {
    const { data, error } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .eq("id", actorTenantId)
      .limit(1)
      .maybeSingle();
    if (!error && data?.id) return asString(data.id);
  }

  const { data: byName, error: byNameError } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .ilike("name", "ReferidosAPP")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!byNameError && byName?.id) return asString(byName.id);

  const { data: anyTenant, error: anyTenantError } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (anyTenantError) throw new Error(anyTenantError.message);
  if (!anyTenant?.id) throw new Error("tenant_not_found");

  return asString(anyTenant.id);
}

async function invokeOpsAppsAdmin(payload: JsonObject) {
  const url = `${opsUrl.replace(/\/+$/, "")}/functions/v1/ops-support-apps-admin`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: opsSecretKey,
      Authorization: `Bearer ${opsSecretKey}`,
      "x-support-ops-token": sharedToken,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let parsed: JsonObject = {};
  try {
    parsed = text ? (JSON.parse(text) as JsonObject) : {};
  } catch {
    parsed = { raw: text };
  }

  if (!response.ok || parsed.ok === false) {
    return {
      ok: false,
      status: response.status,
      detail: asString(parsed.detail, asString(parsed.error, "ops_support_apps_failed")),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    payload: parsed,
  };
}

async function upsertSyncState(
  tenantId: string,
  {
    syncedCount,
    errorMessage,
    success,
  }: {
    syncedCount: number;
    errorMessage: string;
    success: boolean;
  },
) {
  const nowIso = new Date().toISOString();
  const patch = {
    tenant_id: tenantId,
    source_project_ref: sourceProjectRef,
    source_env_key: sourceEnvKey,
    synced_count: Math.max(0, Math.trunc(syncedCount)),
    last_synced_at: nowIso,
    last_success_at: success ? nowIso : null,
    last_error: errorMessage || null,
  };

  const { error } = await supabaseAdmin
    .from("support_app_sync_state")
    .upsert(patch, { onConflict: "tenant_id" });
  if (error) throw new Error(error.message);
}

async function applySupportAppsSnapshot(tenantId: string, sourceRows: OpsAppRow[]) {
  if (!sourceRows.length) {
    throw new Error("runtime_cache_empty_after_sync");
  }

  const rows = sourceRows
    .map((row) => {
      const appKey = asString(row.app_key).toLowerCase();
      const appCode = asString(row.app_code).toLowerCase();
      const displayName = asString(row.display_name);
      const originSourceDefault = asString(row.origin_source_default, "app").toLowerCase();
      if (!appKey || !appCode || !displayName) return null;
      return {
        tenant_id: tenantId,
        app_key: appKey,
        app_code: appCode,
        display_name: displayName,
        origin_source_default: originSourceDefault,
        aliases: normalizeAliases(row.aliases, appCode),
        is_active: row.is_active !== false,
        soft_deleted_at: row.soft_deleted_at || null,
        purge_after: row.purge_after || null,
      };
    })
    .filter(Boolean) as Array<Record<string, unknown>>;

  if (!rows.length) {
    throw new Error("runtime_cache_empty_after_sync");
  }

  const { error: upsertError } = await supabaseAdmin
    .from("support_apps")
    .upsert(rows, { onConflict: "tenant_id,app_key" });
  if (upsertError) throw new Error(upsertError.message);

  const incomingKeys = new Set(rows.map((row) => asString(row.app_key)));
  const { data: existingRows, error: existingError } = await supabaseAdmin
    .from("support_apps")
    .select("id, app_key")
    .eq("tenant_id", tenantId);
  if (existingError) throw new Error(existingError.message);

  const staleIds = (existingRows || [])
    .filter((row) => !incomingKeys.has(asString(row.app_key)))
    .map((row) => asString(row.id))
    .filter(Boolean);

  if (staleIds.length) {
    const { error: deleteError } = await supabaseAdmin
      .from("support_apps")
      .delete()
      .eq("tenant_id", tenantId)
      .in("id", staleIds);
    if (deleteError) throw new Error(deleteError.message);
  }

  return {
    upserted_count: rows.length,
    deleted_count: staleIds.length,
    app_keys: Array.from(incomingKeys),
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const envCheck = ensureEnv();
  if (!envCheck.ok) {
    return jsonResponse(envCheck, 500, cors);
  }

  const body = asObject(await req.json().catch(() => ({})));
  const internalProxyCall = isInternalProxyAuthorized(req);

  let actor = asString(body.actor, "admin:proxy");
  let tenantIdFromUser = asString(body.tenant_id);
  if (!internalProxyCall) {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return jsonResponse({ ok: false, error: "missing_token" }, 401, cors);
    }

    const { user, error: authErr } = await requireAuthUser(token);
    if (authErr || !user) {
      return jsonResponse({ ok: false, error: "unauthorized" }, 401, cors);
    }

    const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
    if (profileErr || !usuario) {
      return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
    }
    if (usuario.role !== "admin") {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }

    actor = `admin:${asString(usuario.id, asString(user.id))}`;
    tenantIdFromUser = asString(usuario.tenant_id);
  }

  let tenantId = "";
  try {
    tenantId = await resolveTenantIdForActor(asString(body.tenant_id, tenantIdFromUser));
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: "tenant_not_found",
        detail: error instanceof Error ? error.message : "tenant_not_found",
      },
      404,
      cors,
    );
  }

  const mode = asString(body.mode, "hot").toLowerCase();
  const forceFull = asBoolean(body.force_full, true);
  const trigger = asString(body.trigger, "manual");

  const opsResponse = await invokeOpsAppsAdmin({
    action: "list_support_apps",
    payload: {
      tenant_id: tenantId,
      include_inactive: true,
      include_expired_inactive: false,
    },
    actor,
    tenant_id: tenantId,
  });

  if (!opsResponse.ok) {
    await upsertSyncState(tenantId, {
      syncedCount: 0,
      errorMessage: opsResponse.detail,
      success: false,
    }).catch(() => undefined);

    return jsonResponse(
      {
        ok: false,
        error: "ops_support_apps_fetch_failed",
        detail: opsResponse.detail,
        payload: opsResponse.payload || null,
      },
      502,
      cors,
    );
  }

  const payload = asObject(opsResponse.payload);
  const data = asObject(payload.data);
  const sourceRows = asArray<OpsAppRow>(data.apps);

  try {
    const applyResult = await applySupportAppsSnapshot(tenantId, sourceRows);
    await upsertSyncState(tenantId, {
      syncedCount: applyResult.upserted_count,
      errorMessage: "",
      success: true,
    });

    return jsonResponse(
      {
        ok: true,
        actor,
        tenant_id: tenantId,
        source_project_ref: sourceProjectRef,
        source_env_key: sourceEnvKey,
        mode,
        force_full: forceFull,
        trigger,
        source_count: sourceRows.length,
        ...applyResult,
      },
      200,
      cors,
    );
  } catch (error) {
    const detail = error instanceof Error ? error.message : "apply_support_apps_snapshot_failed";
    await upsertSyncState(tenantId, {
      syncedCount: 0,
      errorMessage: detail,
      success: false,
    }).catch(() => undefined);

    return jsonResponse(
      {
        ok: false,
        error: "apply_support_apps_snapshot_failed",
        detail,
        source_count: sourceRows.length,
      },
      500,
      cors,
    );
  }
});
