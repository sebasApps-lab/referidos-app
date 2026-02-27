import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

type ChangeRow = {
  seq: number;
  entity_type: "category" | "macro";
  op: "upsert" | "delete";
  payload: JsonObject;
};

type RuntimeConfigRow = {
  cron_token: string;
  enabled: boolean;
};

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

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function clampLimit(value: unknown, fallback: number) {
  const raw = Math.trunc(asNumber(value, fallback));
  return Math.min(2000, Math.max(1, raw));
}

const ALLOWED_APP_TARGETS = new Set(["all", "referidos_app", "prelaunch_web", "android_app"]);
const ALLOWED_ENV_TARGETS = new Set(["all", "dev", "staging", "prod"]);
const ALLOWED_AUDIENCE_ROLES = new Set(["cliente", "negocio", "anonimo"]);
const ALLOWED_THREAD_STATUSES = new Set([
  "new",
  "assigned",
  "in_progress",
  "waiting_user",
  "queued",
  "closed",
  "cancelled",
]);

function normalizeByAlias(value: string, aliases: Record<string, string>) {
  return aliases[value] || value;
}

function canonicalToken(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeStringList(value: unknown, fallback: string[]) {
  if (Array.isArray(value)) {
    return value.map((item) => asString(item).toLowerCase()).filter(Boolean);
  }
  const single = asString(value).toLowerCase();
  if (!single) return fallback;
  return [single];
}

function normalizeAllowedArray(
  value: unknown,
  {
    fallback,
    allowed,
    aliases = {},
  }: {
    fallback: string[];
    allowed: Set<string>;
    aliases?: Record<string, string>;
  },
) {
  const raw = normalizeStringList(value, fallback);
  const normalized = Array.from(
    new Set(
      raw
        .map((item) => canonicalToken(item))
        .map((item) => normalizeByAlias(item, aliases))
        .map((item) => item.trim())
        .filter((item) => allowed.has(item)),
    ),
  );
  if (normalized.includes("all") && allowed.has("all")) return ["all"];
  return normalized.length ? normalized : fallback;
}

function normalizeCategoryStatus(value: unknown) {
  const status = asString(value, "active").toLowerCase();
  if (status === "active" || status === "published") return "active";
  if (status === "inactive" || status === "archived" || status === "draft") return "inactive";
  return "active";
}

function normalizeMacroStatus(value: unknown) {
  const status = asString(value, "draft").toLowerCase();
  if (status === "published" || status === "active") return "published";
  if (status === "archived" || status === "inactive") return "archived";
  return "draft";
}

function normalizeThreadStatus(value: unknown) {
  const raw = asString(value, "new").toLowerCase();
  const aliases: Record<string, string> = {
    inprogress: "in_progress",
    "in-progress": "in_progress",
    waiting: "waiting_user",
    wait_user: "waiting_user",
    cancelled_by_user: "cancelled",
  };
  const normalized = normalizeByAlias(raw, aliases);
  return ALLOWED_THREAD_STATUSES.has(normalized) ? normalized : "new";
}

function normalizeAppTargets(value: unknown) {
  return normalizeAllowedArray(value, {
    fallback: ["all"],
    allowed: ALLOWED_APP_TARGETS,
    aliases: {
      "referidos-app": "referidos_app",
      referidosapp: "referidos_app",
      referidos: "referidos_app",
      "prelaunch-web": "prelaunch_web",
      prelaunch: "prelaunch_web",
      "android-app": "android_app",
      android: "android_app",
    },
  });
}

function normalizeEnvTargets(value: unknown) {
  return normalizeAllowedArray(value, {
    fallback: ["all"],
    allowed: ALLOWED_ENV_TARGETS,
    aliases: {
      production: "prod",
      stage: "staging",
    },
  });
}

function normalizeAudienceRoles(value: unknown) {
  return normalizeAllowedArray(value, {
    fallback: ["cliente", "negocio"],
    allowed: ALLOWED_AUDIENCE_ROLES,
    aliases: {
      anonymous: "anonimo",
      anon: "anonimo",
      anonim: "anonimo",
      support: "cliente",
      soporte: "cliente",
      admin: "cliente",
      customer: "cliente",
      business: "negocio",
    },
  });
}

const opsUrl = asString(Deno.env.get("SUPPORT_OPS_URL"));
const opsSecretKey = asString(Deno.env.get("SUPPORT_OPS_SECRET_KEY"));
const sharedToken = asString(Deno.env.get("SUPPORT_OPS_SHARED_TOKEN"));
const explicitProjectRef = asString(Deno.env.get("SUPPORT_MACROS_SOURCE_PROJECT_REF"));
const sourceEnvKey = asString(Deno.env.get("SUPPORT_MACROS_SOURCE_ENV_KEY"), "dev").toLowerCase();
const hotBatchLimitDefault = clampLimit(Deno.env.get("SUPPORT_MACROS_HOT_BATCH_LIMIT"), 400);
const coldBatchLimitDefault = clampLimit(Deno.env.get("SUPPORT_MACROS_COLD_BATCH_LIMIT"), 1000);
const cronToken = asString(Deno.env.get("SUPPORT_MACROS_CRON_TOKEN"));

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
        "Missing SUPPORT_OPS_URL/SUPPORT_OPS_SECRET_KEY/SUPPORT_OPS_SHARED_TOKEN/SUPPORT_MACROS_SOURCE_PROJECT_REF/SUPPORT_MACROS_SOURCE_ENV_KEY",
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

async function validateCronToken(token: string) {
  const normalized = asString(token);
  if (!normalized) return false;
  if (cronToken && normalized === cronToken) return true;

  const { data, error } = await supabaseAdmin
    .from("ops_sync_runtime_config")
    .select("cron_token, enabled")
    .eq("enabled", true)
    .limit(20);
  if (error) return false;

  const rows = (data || []) as RuntimeConfigRow[];
  return rows.some((row) => asString(row.cron_token) === normalized);
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

async function invokeOpsSync(payload: JsonObject) {
  const url = `${opsUrl.replace(/\/+$/, "")}/functions/v1/ops-support-macros-sync`;
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
      detail: asString(parsed.detail, asString(parsed.error, "ops_sync_failed")),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    payload: parsed,
  };
}

async function loadSyncState(tenantId: string) {
  const { data, error } = await supabaseAdmin
    .from("support_macro_sync_state")
    .select("tenant_id, last_seq")
    .eq("tenant_id", tenantId)
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

async function upsertSyncState(
  tenantId: string,
  {
    lastSeq,
    errorMessage,
    success,
  }: {
    lastSeq: number;
    errorMessage: string;
    success: boolean;
  },
) {
  const nowIso = new Date().toISOString();
  const patch = {
    tenant_id: tenantId,
    last_seq: Math.max(0, Math.trunc(lastSeq)),
    last_synced_at: nowIso,
    last_success_at: success ? nowIso : null,
    last_error: errorMessage || null,
  };

  const { error } = await supabaseAdmin
    .from("support_macro_sync_state")
    .upsert(patch, { onConflict: "tenant_id" });
  if (error) throw new Error(error.message);
}

async function applyChanges(tenantId: string, changes: ChangeRow[]) {
  type PendingChange = { seq: number; op: "upsert" | "delete"; row?: JsonObject };
  const categoryPending = new Map<string, PendingChange>();
  const macroPending = new Map<string, PendingChange>();

  for (const change of changes) {
    const payload = asObject(change.payload);

    const rowId = asString(payload.id);
    if (!rowId) continue;

    if (change.entity_type === "category") {
      if (change.op === "delete") {
        const current = categoryPending.get(rowId);
        if (!current || change.seq >= current.seq) {
          categoryPending.set(rowId, { seq: change.seq, op: "delete" });
        }
      } else {
        const row = {
          id: rowId,
          tenant_id: tenantId,
          code: asString(payload.code),
          label: asString(payload.label),
          description: asString(payload.description) || null,
          app_targets: normalizeAppTargets(payload.app_targets),
          sort_order: Math.trunc(asNumber(payload.sort_order, 100)),
          status: normalizeCategoryStatus(payload.status),
          metadata: asObject(payload.metadata),
          source_updated_at: asString(payload.updated_at) || null,
          source_seq: Math.max(0, Math.trunc(change.seq)),
        };
        const current = categoryPending.get(rowId);
        if (!current || change.seq >= current.seq) {
          categoryPending.set(rowId, { seq: change.seq, op: "upsert", row });
        }
      }
      continue;
    }

    if (change.entity_type === "macro") {
      if (change.op === "delete") {
        const current = macroPending.get(rowId);
        if (!current || change.seq >= current.seq) {
          macroPending.set(rowId, { seq: change.seq, op: "delete" });
        }
      } else {
        const row = {
          id: rowId,
          tenant_id: tenantId,
          category_id: asString(payload.category_id) || null,
          category_code: asString(payload.category_code) || null,
          code: asString(payload.code),
          title: asString(payload.title),
          body: asString(payload.body),
          thread_status: normalizeThreadStatus(payload.thread_status),
          audience_roles: normalizeAudienceRoles(payload.audience_roles),
          app_targets: normalizeAppTargets(payload.app_targets),
          env_targets: normalizeEnvTargets(payload.env_targets),
          sort_order: Math.trunc(asNumber(payload.sort_order, 100)),
          status: normalizeMacroStatus(payload.status),
          metadata: asObject(payload.metadata),
          source_updated_at: asString(payload.updated_at) || null,
          source_seq: Math.max(0, Math.trunc(change.seq)),
        };
        const current = macroPending.get(rowId);
        if (!current || change.seq >= current.seq) {
          macroPending.set(rowId, { seq: change.seq, op: "upsert", row });
        }
      }
    }
  }

  const categoryDeleteIds: string[] = [];
  const categoryUpserts: JsonObject[] = [];
  const macroDeleteIds: string[] = [];
  const macroUpserts: JsonObject[] = [];

  for (const [id, pending] of categoryPending.entries()) {
    if (pending.op === "delete") categoryDeleteIds.push(id);
    else if (pending.row) categoryUpserts.push(pending.row);
  }
  for (const [id, pending] of macroPending.entries()) {
    if (pending.op === "delete") macroDeleteIds.push(id);
    else if (pending.row) macroUpserts.push(pending.row);
  }

  if (macroDeleteIds.length > 0) {
    const { error } = await supabaseAdmin
      .from("support_macros_cache")
      .delete()
      .eq("tenant_id", tenantId)
      .in("id", Array.from(new Set(macroDeleteIds)));
    if (error) throw new Error(error.message);
  }

  if (categoryDeleteIds.length > 0) {
    const { error } = await supabaseAdmin
      .from("support_macro_categories_cache")
      .delete()
      .eq("tenant_id", tenantId)
      .in("id", Array.from(new Set(categoryDeleteIds)));
    if (error) throw new Error(error.message);
  }

  if (categoryUpserts.length > 0) {
    const { error } = await supabaseAdmin
      .from("support_macro_categories_cache")
      .upsert(categoryUpserts, { onConflict: "id" });
    if (error) throw new Error(error.message);
  }

  if (macroUpserts.length > 0) {
    const { error } = await supabaseAdmin
      .from("support_macros_cache")
      .upsert(macroUpserts, { onConflict: "id" });
    if (error) throw new Error(error.message);
  }

  return {
    categories_upserted: categoryUpserts.length,
    categories_deleted: categoryDeleteIds.length,
    macros_upserted: macroUpserts.length,
    macros_deleted: macroDeleteIds.length,
  };
}

async function isRuntimeCacheEmpty(tenantId: string) {
  const [{ count: categoriesCount, error: categoriesError }, { count: macrosCount, error: macrosError }] =
    await Promise.all([
      supabaseAdmin
        .from("support_macro_categories_cache")
        .select("id", { count: "exact", head: true })
        .eq("tenant_id", tenantId),
      supabaseAdmin
        .from("support_macros_cache")
        .select("id", { count: "exact", head: true })
        .eq("tenant_id", tenantId),
    ]);

  if (categoriesError) throw new Error(categoriesError.message);
  if (macrosError) throw new Error(macrosError.message);

  return (categoriesCount || 0) === 0 && (macrosCount || 0) === 0;
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
  const requestedMode = asString(body.mode, "").toLowerCase();
  const internalProxyCall = isInternalProxyAuthorized(req);
  const internalCronCall = await validateCronToken(
    asString(req.headers.get("x-ops-sync-cron-token")),
  );
  const internalAuthCall = internalCronCall || internalProxyCall;

  let actor = "system:cold-cron";
  let tenantIdFromUser = asString(body.tenant_id);
  if (!internalAuthCall) {
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
    if (!["admin", "soporte"].includes(asString(usuario.role))) {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }

    actor = `${asString(usuario.role)}:${asString(usuario.id, asString(user.id))}`;
    tenantIdFromUser = asString(usuario.tenant_id);
  }

  const mode = internalCronCall
    ? "cold"
    : requestedMode === "cold"
      ? "cold"
      : "hot";
  const defaultLimit = mode === "cold" ? coldBatchLimitDefault : hotBatchLimitDefault;
  const limit = clampLimit(body.limit, defaultLimit);
  const forceFull = asBoolean(body.force_full, false);
  const panelKey = asString(body.panel_key, "support_panel");

  let tenantId = "";
  try {
    tenantId = await resolveTenantIdForActor(tenantIdFromUser);
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

  let currentSeq = 0;
  try {
    const state = await loadSyncState(tenantId);
    currentSeq = Math.max(0, Math.trunc(asNumber(state?.last_seq, 0)));
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: "load_sync_state_failed",
        detail: error instanceof Error ? error.message : "load_sync_state_failed",
      },
      500,
      cors,
    );
  }

  let cacheEmpty = false;
  try {
    cacheEmpty = await isRuntimeCacheEmpty(tenantId);
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: "cache_probe_failed",
        detail: error instanceof Error ? error.message : "cache_probe_failed",
      },
      500,
      cors,
    );
  }

  const effectiveForceFull = forceFull || cacheEmpty;
  const afterSeq = effectiveForceFull ? 0 : currentSeq;

  const opsSyncResponse = await invokeOpsSync({
    tenant_id: tenantId,
    tenant_name: "ReferidosAPP",
    after_seq: afterSeq,
    limit,
    source_project_ref: sourceProjectRef,
    source_env_key: sourceEnvKey,
    mode,
    panel_key: panelKey,
    actor,
    force_full: effectiveForceFull,
  });

  if (!opsSyncResponse.ok) {
    try {
      await upsertSyncState(tenantId, {
        lastSeq: currentSeq,
        errorMessage: `ops_sync_failed:${opsSyncResponse.detail}`,
        success: false,
      });
    } catch {
      // Best effort.
    }
    return jsonResponse(
      {
        ok: false,
        error: "ops_sync_failed",
        detail: opsSyncResponse.detail,
        payload: opsSyncResponse.payload || null,
      },
      502,
      cors,
    );
  }

  const syncPayload = asObject(opsSyncResponse.payload);
  const rawChanges = asArray(syncPayload.changes);
  const changes: ChangeRow[] = rawChanges
    .map((item) => asObject(item))
    .map((row) => ({
      seq: Math.max(0, Math.trunc(asNumber(row.seq, 0))),
      entity_type: asString(row.entity_type) as ChangeRow["entity_type"],
      op: asString(row.op) as ChangeRow["op"],
      payload: asObject(row.payload),
    }))
    .filter((row) => (row.entity_type === "category" || row.entity_type === "macro")
      && (row.op === "upsert" || row.op === "delete"));

  const maxSeq = changes.length
    ? Math.max(...changes.map((row) => row.seq))
    : Math.max(afterSeq, Math.trunc(asNumber(syncPayload.last_seq, afterSeq)));

  let applySummary = {
    categories_upserted: 0,
    categories_deleted: 0,
    macros_upserted: 0,
    macros_deleted: 0,
  };

  try {
    applySummary = await applyChanges(tenantId, changes);
    await upsertSyncState(tenantId, {
      lastSeq: maxSeq,
      errorMessage: "",
      success: true,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "apply_changes_failed";
    try {
      await upsertSyncState(tenantId, {
        lastSeq: currentSeq,
        errorMessage: `apply_failed:${detail}`,
        success: false,
      });
    } catch {
      // Best effort.
    }
    return jsonResponse(
      {
        ok: false,
        error: "apply_changes_failed",
        detail,
        processed_changes: changes.length,
      },
      500,
      cors,
    );
  }

  return jsonResponse(
    {
      ok: true,
      mode,
      actor,
      panel_key: panelKey,
      tenant_id: tenantId,
      after_seq: afterSeq,
      force_full: effectiveForceFull,
      runtime_cache_empty: cacheEmpty,
      synced_seq: maxSeq,
      received_changes: changes.length,
      ...applySummary,
    },
    200,
    cors,
  );
});
