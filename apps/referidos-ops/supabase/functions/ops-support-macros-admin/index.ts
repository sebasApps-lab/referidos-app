import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

const CATEGORY_STATUSES = new Set(["draft", "published", "archived"]);
const MACRO_STATUSES = new Set(["draft", "published", "archived"]);
const THREAD_STATUSES = new Set([
  "new",
  "assigned",
  "in_progress",
  "waiting_user",
  "queued",
  "closed",
  "cancelled",
]);
const APP_TARGETS = new Set(["all", "referidos_app", "prelaunch_web", "android_app"]);
const ENV_TARGETS = new Set(["all", "dev", "staging", "prod"]);
const AUDIENCE_ROLES = new Set(["cliente", "negocio", "soporte", "admin"]);

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

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
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

function normalizeCode(input: unknown, fieldName: string) {
  const code = asString(input).toLowerCase().replace(/\s+/g, "_");
  if (!code) {
    throw new HttpError("invalid_input", `${fieldName} es requerido.`);
  }
  if (!/^[a-z0-9_]+$/.test(code)) {
    throw new HttpError(
      "invalid_input",
      `${fieldName} solo permite a-z, 0-9 y underscore (_).`,
    );
  }
  return code;
}

function normalizeEnum(input: unknown, allowed: Set<string>, fieldName: string) {
  const value = asString(input).toLowerCase();
  if (!allowed.has(value)) {
    throw new HttpError("invalid_input", `${fieldName} invalido.`);
  }
  return value;
}

function normalizeOptionalEnum(
  input: unknown,
  allowed: Set<string>,
  fieldName: string,
) {
  const value = asString(input).toLowerCase();
  if (!value) return null;
  if (!allowed.has(value)) {
    throw new HttpError("invalid_input", `${fieldName} invalido.`);
  }
  return value;
}

function normalizeStringArray(
  input: unknown,
  allowed: Set<string>,
  fallback: string[],
  fieldName: string,
) {
  const source = Array.isArray(input) ? input : fallback;
  const normalized = Array.from(
    new Set(
      source
        .map((item) => asString(item).toLowerCase())
        .filter(Boolean),
    ),
  );

  if (!normalized.length) {
    throw new HttpError("invalid_input", `${fieldName} no puede estar vacio.`);
  }
  if (normalized.some((item) => !allowed.has(item))) {
    throw new HttpError("invalid_input", `${fieldName} contiene valores invalidos.`);
  }
  return normalized;
}

function optionalStringArray(
  input: unknown,
  allowed: Set<string>,
  fieldName: string,
) {
  if (input === undefined) return undefined;
  return normalizeStringArray(input, allowed, ["all"], fieldName);
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

async function loadCategory(tenantId: string, categoryId: string) {
  const { data, error } = await supabaseAdmin
    .from("support_macro_categories")
    .select("id, tenant_id, status")
    .eq("tenant_id", tenantId)
    .eq("id", categoryId)
    .limit(1)
    .maybeSingle();
  if (error) throw new HttpError("category_lookup_failed", error.message, 500);
  return data;
}

async function assertCategoryBelongsTenant(tenantId: string, categoryId: string) {
  const category = await loadCategory(tenantId, categoryId);
  if (!category?.id) {
    throw new HttpError("category_not_found", "Categoria no encontrada para este tenant.", 404);
  }
  return category;
}

async function assertCategoryPublishable(tenantId: string, categoryId: string | null) {
  if (!categoryId) return;
  const category = await assertCategoryBelongsTenant(tenantId, categoryId);
  if (asString(category.status) !== "published") {
    throw new HttpError(
      "category_not_published",
      "No puedes publicar macro en una categoria que no esta published.",
      409,
    );
  }
}

async function listCatalog(tenantId: string, payload: JsonObject) {
  const includeArchived = asBoolean(payload.include_archived, true);
  const includeDraft = asBoolean(payload.include_draft, true);

  let categoriesQuery = supabaseAdmin
    .from("support_macro_categories")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  let macrosQuery = supabaseAdmin
    .from("support_macros")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (!includeArchived) {
    categoriesQuery = categoriesQuery.neq("status", "archived");
    macrosQuery = macrosQuery.neq("status", "archived");
  }
  if (!includeDraft) {
    categoriesQuery = categoriesQuery.neq("status", "draft");
    macrosQuery = macrosQuery.neq("status", "draft");
  }

  const [{ data: categories, error: categoriesError }, { data: macros, error: macrosError }] =
    await Promise.all([categoriesQuery, macrosQuery]);

  if (categoriesError) throw new HttpError("list_categories_failed", categoriesError.message, 500);
  if (macrosError) throw new HttpError("list_macros_failed", macrosError.message, 500);

  return {
    tenant_id: tenantId,
    categories: categories || [],
    macros: macros || [],
  };
}

async function createCategory(tenantId: string, actor: string, payload: JsonObject) {
  const code = normalizeCode(payload.code, "code");
  const label = asString(payload.label);
  if (!label) throw new HttpError("invalid_input", "label es requerido.");

  const status = payload.status === undefined
    ? "draft"
    : normalizeEnum(payload.status, CATEGORY_STATUSES, "status");

  const appTargets = normalizeStringArray(
    payload.app_targets,
    APP_TARGETS,
    ["all"],
    "app_targets",
  );

  const metadata = asObject(payload.metadata);
  const sortOrder = Math.trunc(asNumber(payload.sort_order, 100));

  const { data, error } = await supabaseAdmin
    .from("support_macro_categories")
    .insert({
      tenant_id: tenantId,
      code,
      label,
      description: asString(payload.description) || null,
      app_targets: appTargets,
      sort_order: sortOrder,
      status,
      metadata,
      created_by: actor,
      updated_by: actor,
    })
    .select("*")
    .single();

  if (error) throw new HttpError("create_category_failed", error.message, 500);
  return data;
}

async function updateCategory(tenantId: string, actor: string, payload: JsonObject) {
  const categoryId = asString(payload.category_id || payload.id);
  if (!categoryId) throw new HttpError("invalid_input", "category_id es requerido.");

  await assertCategoryBelongsTenant(tenantId, categoryId);

  const patch: JsonObject = { updated_by: actor };

  if (payload.code !== undefined) patch.code = normalizeCode(payload.code, "code");
  if (payload.label !== undefined) {
    const label = asString(payload.label);
    if (!label) throw new HttpError("invalid_input", "label invalido.");
    patch.label = label;
  }
  if (payload.description !== undefined) {
    patch.description = asString(payload.description) || null;
  }
  if (payload.status !== undefined) {
    patch.status = normalizeEnum(payload.status, CATEGORY_STATUSES, "status");
  }
  if (payload.app_targets !== undefined) {
    patch.app_targets = normalizeStringArray(payload.app_targets, APP_TARGETS, ["all"], "app_targets");
  }
  if (payload.sort_order !== undefined) {
    patch.sort_order = Math.trunc(asNumber(payload.sort_order, 100));
  }
  if (payload.metadata !== undefined) {
    patch.metadata = asObject(payload.metadata);
  }

  const { data, error } = await supabaseAdmin
    .from("support_macro_categories")
    .update(patch)
    .eq("tenant_id", tenantId)
    .eq("id", categoryId)
    .select("*")
    .single();

  if (error) throw new HttpError("update_category_failed", error.message, 500);
  return data;
}

async function setCategoryStatus(tenantId: string, actor: string, payload: JsonObject) {
  const categoryId = asString(payload.category_id || payload.id);
  if (!categoryId) throw new HttpError("invalid_input", "category_id es requerido.");
  const status = normalizeEnum(payload.status, CATEGORY_STATUSES, "status");

  const { data, error } = await supabaseAdmin
    .from("support_macro_categories")
    .update({
      status,
      updated_by: actor,
    })
    .eq("tenant_id", tenantId)
    .eq("id", categoryId)
    .select("*")
    .single();

  if (error) throw new HttpError("set_category_status_failed", error.message, 500);
  return data;
}

async function createMacro(tenantId: string, actor: string, payload: JsonObject) {
  const code = normalizeCode(payload.code, "code");
  const title = asString(payload.title);
  const body = asString(payload.body);
  if (!title) throw new HttpError("invalid_input", "title es requerido.");
  if (!body) throw new HttpError("invalid_input", "body es requerido.");

  const categoryId = asString(payload.category_id) || null;
  if (categoryId) await assertCategoryBelongsTenant(tenantId, categoryId);

  const status = payload.status === undefined
    ? "draft"
    : normalizeEnum(payload.status, MACRO_STATUSES, "status");
  if (status === "published") {
    await assertCategoryPublishable(tenantId, categoryId);
  }

  const threadStatus = normalizeOptionalEnum(payload.thread_status, THREAD_STATUSES, "thread_status");
  const audienceRoles = normalizeStringArray(
    payload.audience_roles,
    AUDIENCE_ROLES,
    ["cliente", "negocio"],
    "audience_roles",
  );
  const appTargets = normalizeStringArray(payload.app_targets, APP_TARGETS, ["all"], "app_targets");
  const envTargets = normalizeStringArray(payload.env_targets, ENV_TARGETS, ["all"], "env_targets");

  const { data, error } = await supabaseAdmin
    .from("support_macros")
    .insert({
      tenant_id: tenantId,
      category_id: categoryId,
      code,
      title,
      body,
      thread_status: threadStatus,
      audience_roles: audienceRoles,
      app_targets: appTargets,
      env_targets: envTargets,
      sort_order: Math.trunc(asNumber(payload.sort_order, 100)),
      status,
      metadata: asObject(payload.metadata),
      created_by: actor,
      updated_by: actor,
    })
    .select("*")
    .single();

  if (error) throw new HttpError("create_macro_failed", error.message, 500);
  return data;
}

async function updateMacro(tenantId: string, actor: string, payload: JsonObject) {
  const macroId = asString(payload.macro_id || payload.id);
  if (!macroId) throw new HttpError("invalid_input", "macro_id es requerido.");

  const { data: current, error: currentError } = await supabaseAdmin
    .from("support_macros")
    .select("*")
    .eq("tenant_id", tenantId)
    .eq("id", macroId)
    .limit(1)
    .maybeSingle();
  if (currentError) throw new HttpError("macro_lookup_failed", currentError.message, 500);
  if (!current?.id) throw new HttpError("macro_not_found", "Macro no encontrado para este tenant.", 404);

  const patch: JsonObject = { updated_by: actor };
  let nextCategoryId = asString(current.category_id) || null;
  let nextStatus = asString(current.status, "draft");

  if (payload.code !== undefined) patch.code = normalizeCode(payload.code, "code");
  if (payload.title !== undefined) {
    const title = asString(payload.title);
    if (!title) throw new HttpError("invalid_input", "title invalido.");
    patch.title = title;
  }
  if (payload.body !== undefined) {
    const body = asString(payload.body);
    if (!body) throw new HttpError("invalid_input", "body invalido.");
    patch.body = body;
  }
  if (payload.category_id !== undefined) {
    nextCategoryId = asString(payload.category_id) || null;
    if (nextCategoryId) await assertCategoryBelongsTenant(tenantId, nextCategoryId);
    patch.category_id = nextCategoryId;
  }
  if (payload.thread_status !== undefined) {
    patch.thread_status = normalizeOptionalEnum(payload.thread_status, THREAD_STATUSES, "thread_status");
  }
  if (payload.audience_roles !== undefined) {
    patch.audience_roles = normalizeStringArray(payload.audience_roles, AUDIENCE_ROLES, ["cliente"], "audience_roles");
  }
  if (payload.app_targets !== undefined) {
    patch.app_targets = normalizeStringArray(payload.app_targets, APP_TARGETS, ["all"], "app_targets");
  }
  if (payload.env_targets !== undefined) {
    patch.env_targets = normalizeStringArray(payload.env_targets, ENV_TARGETS, ["all"], "env_targets");
  }
  if (payload.sort_order !== undefined) {
    patch.sort_order = Math.trunc(asNumber(payload.sort_order, 100));
  }
  if (payload.metadata !== undefined) {
    patch.metadata = asObject(payload.metadata);
  }
  if (payload.status !== undefined) {
    nextStatus = normalizeEnum(payload.status, MACRO_STATUSES, "status");
    patch.status = nextStatus;
  }

  if (nextStatus === "published") {
    await assertCategoryPublishable(tenantId, nextCategoryId);
  }

  const { data, error } = await supabaseAdmin
    .from("support_macros")
    .update(patch)
    .eq("tenant_id", tenantId)
    .eq("id", macroId)
    .select("*")
    .single();

  if (error) throw new HttpError("update_macro_failed", error.message, 500);
  return data;
}

async function setMacroStatus(tenantId: string, actor: string, payload: JsonObject) {
  const macroId = asString(payload.macro_id || payload.id);
  if (!macroId) throw new HttpError("invalid_input", "macro_id es requerido.");
  const status = normalizeEnum(payload.status, MACRO_STATUSES, "status");

  const { data: current, error: currentError } = await supabaseAdmin
    .from("support_macros")
    .select("id, category_id")
    .eq("tenant_id", tenantId)
    .eq("id", macroId)
    .limit(1)
    .maybeSingle();
  if (currentError) throw new HttpError("macro_lookup_failed", currentError.message, 500);
  if (!current?.id) throw new HttpError("macro_not_found", "Macro no encontrado para este tenant.", 404);

  if (status === "published") {
    await assertCategoryPublishable(tenantId, asString(current.category_id) || null);
  }

  const { data, error } = await supabaseAdmin
    .from("support_macros")
    .update({
      status,
      updated_by: actor,
    })
    .eq("tenant_id", tenantId)
    .eq("id", macroId)
    .select("*")
    .single();

  if (error) throw new HttpError("set_macro_status_failed", error.message, 500);
  return data;
}

async function deleteMacro(tenantId: string, payload: JsonObject) {
  const macroId = asString(payload.macro_id || payload.id);
  if (!macroId) throw new HttpError("invalid_input", "macro_id es requerido.");

  const { data, error } = await supabaseAdmin
    .from("support_macros")
    .delete()
    .eq("tenant_id", tenantId)
    .eq("id", macroId)
    .select("id")
    .maybeSingle();

  if (error) throw new HttpError("delete_macro_failed", error.message, 500);
  if (!data?.id) throw new HttpError("macro_not_found", "Macro no encontrado para este tenant.", 404);

  return {
    id: asString(data.id),
    deleted: true,
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
      case "list_catalog":
        result = await listCatalog(tenantId, payload);
        break;
      case "create_category":
        result = await createCategory(tenantId, actor, payload);
        break;
      case "update_category":
        result = await updateCategory(tenantId, actor, payload);
        break;
      case "set_category_status":
        result = await setCategoryStatus(tenantId, actor, payload);
        break;
      case "create_macro":
        result = await createMacro(tenantId, actor, payload);
        break;
      case "update_macro":
        result = await updateMacro(tenantId, actor, payload);
        break;
      case "set_macro_status":
        result = await setMacroStatus(tenantId, actor, payload);
        break;
      case "delete_macro":
        result = await deleteMacro(tenantId, payload);
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
