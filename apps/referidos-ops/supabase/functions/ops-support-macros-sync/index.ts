import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampLimit(value: unknown, fallback: number) {
  const raw = Math.trunc(asNumber(value, fallback));
  return Math.min(2000, Math.max(1, raw));
}

function asObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
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
    if (tenantByIdError) throw new Error(tenantByIdError.message);
    if (tenantById?.id) return asString(tenantById.id);
  }

  const { data: tenantByName, error: tenantByNameError } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .ilike("name", fallbackTenantName)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (tenantByNameError) throw new Error(tenantByNameError.message);
  if (tenantByName?.id) return asString(tenantByName.id);

  const { data: anyTenant, error: anyTenantError } = await supabaseAdmin
    .from("tenants")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (anyTenantError) throw new Error(anyTenantError.message);
  if (anyTenant?.id) return asString(anyTenant.id);

  throw new Error("tenant_not_found");
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
  const internalProxyCall = isInternalProxyAuthorized(req);

  let actor = asString(body.actor, "system:proxy");
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
    if (!["admin", "soporte"].includes(asString(usuario.role))) {
      return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
    }

    actor = `${asString(usuario.role)}:${asString(usuario.id, asString(user.id))}`;
    tenantIdFromUser = asString(usuario.tenant_id);
  }

  const afterSeq = Math.max(0, Math.trunc(asNumber(body.after_seq, 0)));
  const limit = clampLimit(body.limit, 500);

  let tenantId = "";
  try {
    tenantId = await resolveTenantId({
      requestedTenantId: asString(body.tenant_id, tenantIdFromUser),
      fallbackTenantName: asString(body.tenant_name, "ReferidosAPP"),
    });
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

  const { data, error } = await supabaseAdmin
    .from("support_macro_change_log")
    .select("seq, tenant_id, entity_type, entity_id, op, payload, created_at")
    .eq("tenant_id", tenantId)
    .gt("seq", afterSeq)
    .order("seq", { ascending: true })
    .limit(limit);

  if (error) {
    return jsonResponse(
      {
        ok: false,
        error: "load_changes_failed",
        detail: error.message,
      },
      500,
      cors,
    );
  }

  const changes = data || [];
  const lastSeq = changes.length
    ? Math.max(...changes.map((row) => Math.trunc(asNumber((row as JsonObject).seq, 0))))
    : afterSeq;

  return jsonResponse(
    {
      ok: true,
      actor,
      tenant_id: tenantId,
      after_seq: afterSeq,
      last_seq: lastSeq,
      returned: changes.length,
      changes,
    },
    200,
    cors,
  );
});
