import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

class HttpError extends Error {
  status: number;
  code: string;

  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "HttpError";
    this.code = code;
    this.status = status;
  }
}

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

function canonicalToken(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeAliases(value: unknown, appCode: string) {
  const source = Array.isArray(value) ? value : [];
  const normalized = Array.from(
    new Set(
      source
        .map((item) => canonicalToken(asString(item)))
        .filter(Boolean),
    ),
  );
  if (appCode) normalized.push(appCode);
  return Array.from(new Set(normalized)).sort();
}

function normalizeAppKey(value: unknown) {
  const appKey = canonicalToken(asString(value));
  if (!appKey) throw new HttpError("invalid_input", "app_key es requerido.");
  if (!/^[a-z0-9_]+$/.test(appKey)) {
    throw new HttpError("invalid_input", "app_key solo permite a-z, 0-9 y underscore (_).");
  }
  return appKey;
}

function normalizeAppCode(value: unknown) {
  const appCode = canonicalToken(asString(value));
  if (!appCode) throw new HttpError("invalid_input", "app_code es requerido.");
  if (!/^[a-z0-9][a-z0-9_-]*$/.test(appCode)) {
    throw new HttpError("invalid_input", "app_code invalido.");
  }
  return appCode;
}

function normalizeOriginSource(value: unknown, fallback = "user") {
  const origin = canonicalToken(asString(value, fallback));
  if (!origin) return "user";
  if (!["user", "admin_support"].includes(origin)) {
    throw new HttpError("invalid_input", "origin_source_default invalido.");
  }
  return origin;
}

function isInternalProxyAuthorized(req: Request) {
  const expected = asString(Deno.env.get("SUPPORT_OPS_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get("x-support-ops-token"));
  return Boolean(received) && received === expected;
}

async function resolveTenantId({
  requestedTenantId,
  fallbackTenantName = "ReferidosAPP",
}: {
  requestedTenantId: string;
  fallbackTenantName?: string;
}) {
  if (requestedTenantId) {
    const { data: tenantById, error: tenantByIdError } = await supabaseAdmin
      .from("tenants")
      .select("id")
      .eq("id", requestedTenantId)
      .limit(1)
      .maybeSingle();
    if (tenantByIdError) throw new HttpError("tenant_lookup_failed", tenantByIdError.message, 500);
    if (tenantById?.id) return asString(tenantById.id);
  }

  const { data: tenantByName, error: tenantByNameError } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .ilike("name", fallbackTenantName)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (tenantByNameError) throw new HttpError("tenant_lookup_failed", tenantByNameError.message, 500);
  if (tenantByName?.id) return asString(tenantByName.id);

  const { data: anyTenant, error: anyTenantError } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (anyTenantError) throw new HttpError("tenant_lookup_failed", anyTenantError.message, 500);
  if (anyTenant?.id) return asString(anyTenant.id);

  throw new HttpError("tenant_not_found", "No existe tenant disponible.", 404);
}

async function pruneSupportApps(tenantId: string) {
  const { data, error } = await supabaseAdmin.rpc("support_apps_prune_expired", {
    p_tenant_id: tenantId,
  });
  if (error) throw new HttpError("prune_support_apps_failed", error.message, 500);
  return Number.isFinite(Number(data)) ? Number(data) : 0;
}

async function listSupportApps(tenantId: string, payload: JsonObject) {
  const includeInactive = asBoolean(payload.include_inactive, true);
  const includeExpiredInactive = asBoolean(payload.include_expired_inactive, false);
  const prunedCount = await pruneSupportApps(tenantId);

  const { data, error } = await supabaseAdmin
    .from("support_apps")
    .select(
      "id, tenant_id, app_key, app_code, display_name, origin_source_default, aliases, is_active, soft_deleted_at, purge_after, metadata, created_by, updated_by, created_at, updated_at",
    )
    .eq("tenant_id", tenantId)
    .order("is_active", { ascending: false })
    .order("display_name", { ascending: true });
  if (error) throw new HttpError("list_support_apps_failed", error.message, 500);

  const nowIso = new Date().toISOString();
  const rows = (data || []).filter((row) => {
    if (!includeInactive && row.is_active === false) return false;
    if (!includeExpiredInactive && row.is_active === false && row.purge_after && row.purge_after <= nowIso) {
      return false;
    }
    return true;
  });

  return {
    tenant_id: tenantId,
    pruned_count: prunedCount,
    apps: rows,
  };
}

async function createSupportApp(tenantId: string, actor: string, payload: JsonObject) {
  const appKey = normalizeAppKey(payload.app_key);
  const appCode = normalizeAppCode(payload.app_code);
  const displayName = asString(payload.display_name);
  if (!displayName) throw new HttpError("invalid_input", "display_name es requerido.");
  const originSourceDefault = normalizeOriginSource(payload.origin_source_default, "user");
  const aliases = normalizeAliases(payload.aliases, appCode);
  const metadata = asObject(payload.metadata);

  const { data, error } = await supabaseAdmin
    .from("support_apps")
    .insert({
      tenant_id: tenantId,
      app_key: appKey,
      app_code: appCode,
      display_name: displayName,
      origin_source_default: originSourceDefault,
      aliases,
      is_active: true,
      metadata,
      created_by: actor,
      updated_by: actor,
    })
    .select(
      "id, tenant_id, app_key, app_code, display_name, origin_source_default, aliases, is_active, soft_deleted_at, purge_after, metadata, created_by, updated_by, created_at, updated_at",
    )
    .single();

  if (error) throw new HttpError("create_support_app_failed", error.message, 500);
  return data;
}

async function updateSupportApp(tenantId: string, actor: string, payload: JsonObject) {
  const appId = asString(payload.app_id || payload.id);
  if (!appId) throw new HttpError("invalid_input", "app_id es requerido.");

  const { data: current, error: currentError } = await supabaseAdmin
    .from("support_apps")
    .select("id, app_code, metadata")
    .eq("tenant_id", tenantId)
    .eq("id", appId)
    .limit(1)
    .maybeSingle();
  if (currentError) throw new HttpError("support_app_lookup_failed", currentError.message, 500);
  if (!current?.id) throw new HttpError("support_app_not_found", "App no encontrada para este tenant.", 404);

  const patch: JsonObject = {
    updated_by: actor,
  };

  if (payload.app_code !== undefined) {
    patch.app_code = normalizeAppCode(payload.app_code);
  }
  if (payload.display_name !== undefined) {
    const displayName = asString(payload.display_name);
    if (!displayName) throw new HttpError("invalid_input", "display_name invalido.");
    patch.display_name = displayName;
  }
  if (payload.origin_source_default !== undefined) {
    patch.origin_source_default = normalizeOriginSource(payload.origin_source_default, "user");
  }

  const currentCode = normalizeAppCode(patch.app_code ?? current.app_code);
  if (payload.aliases !== undefined || payload.app_code !== undefined) {
    patch.aliases = normalizeAliases(payload.aliases ?? [], currentCode);
  }

  if (payload.metadata !== undefined) {
    patch.metadata = asObject(payload.metadata);
  }

  const { data, error } = await supabaseAdmin
    .from("support_apps")
    .update(patch)
    .eq("tenant_id", tenantId)
    .eq("id", appId)
    .select(
      "id, tenant_id, app_key, app_code, display_name, origin_source_default, aliases, is_active, soft_deleted_at, purge_after, metadata, created_by, updated_by, created_at, updated_at",
    )
    .single();

  if (error) throw new HttpError("update_support_app_failed", error.message, 500);
  return data;
}

async function setSupportAppActive(tenantId: string, actor: string, payload: JsonObject) {
  const appId = asString(payload.app_id || payload.id);
  if (!appId) throw new HttpError("invalid_input", "app_id es requerido.");
  const isActive = asBoolean(payload.is_active, true);

  const { data, error } = await supabaseAdmin
    .from("support_apps")
    .update({
      is_active: isActive,
      updated_by: actor,
    })
    .eq("tenant_id", tenantId)
    .eq("id", appId)
    .select(
      "id, tenant_id, app_key, app_code, display_name, origin_source_default, aliases, is_active, soft_deleted_at, purge_after, metadata, created_by, updated_by, created_at, updated_at",
    )
    .single();

  if (error) throw new HttpError("set_support_app_active_failed", error.message, 500);
  return data;
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

  const body = asObject(await req.json().catch(() => ({})));
  const payload = asObject(body.payload);
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

    actor = `admin:${asString(usuario.id) || asString(user.id)}`;
    tenantIdFromUser = asString(usuario.tenant_id);
  }

  const action = asString(body.action);
  if (!action) {
    return jsonResponse({ ok: false, error: "missing_action" }, 400, cors);
  }

  try {
    const tenantId = await resolveTenantId({
      requestedTenantId: asString(payload.tenant_id, tenantIdFromUser),
      fallbackTenantName: asString(payload.tenant_name, "ReferidosAPP"),
    });

    let result: unknown = null;
    switch (action) {
      case "list_support_apps":
        result = await listSupportApps(tenantId, payload);
        break;
      case "create_support_app":
        result = await createSupportApp(tenantId, actor, payload);
        break;
      case "update_support_app":
        result = await updateSupportApp(tenantId, actor, payload);
        break;
      case "set_support_app_active":
        result = await setSupportAppActive(tenantId, actor, payload);
        break;
      case "prune_support_apps":
        result = {
          tenant_id: tenantId,
          pruned_count: await pruneSupportApps(tenantId),
        };
        break;
      default:
        throw new HttpError("unsupported_action", `Accion no soportada: ${action}`);
    }

    return jsonResponse(
      {
        ok: true,
        action,
        data: result,
      },
      200,
      cors,
    );
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    const code = error instanceof HttpError ? error.code : "unexpected_error";
    const detail = error instanceof Error ? error.message : "unexpected_error";
    return jsonResponse(
      {
        ok: false,
        action,
        error: code,
        detail,
      },
      status,
      cors,
    );
  }
});
