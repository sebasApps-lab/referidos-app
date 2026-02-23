import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

const ALLOWED_ACTIONS = new Set([
  "list_catalog",
  "create_category",
  "update_category",
  "set_category_status",
  "delete_category",
  "create_macro",
  "update_macro",
  "set_macro_status",
  "delete_macro",
]);

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asObject(value: unknown): JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonObject)
    : {};
}

const opsUrl = asString(Deno.env.get("SUPPORT_OPS_URL"));
const opsSecretKey = asString(Deno.env.get("SUPPORT_OPS_SECRET_KEY"));
const sharedToken = asString(Deno.env.get("SUPPORT_OPS_SHARED_TOKEN"));

function ensureEnv() {
  if (!opsUrl || !opsSecretKey || !sharedToken) {
    return {
      ok: false,
      error: "missing_ops_env",
      detail:
        "Missing SUPPORT_OPS_URL/SUPPORT_OPS_SECRET_KEY/SUPPORT_OPS_SHARED_TOKEN in runtime project.",
    };
  }
  return { ok: true };
}

async function invokeOpsFunction(functionName: string, payload: JsonObject) {
  const url = `${opsUrl.replace(/\/+$/, "")}/functions/v1/${functionName}`;
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
      detail: asString(parsed.detail, asString(parsed.error, "ops_function_failed")),
      payload: parsed,
    };
  }

  return {
    ok: true,
    status: response.status,
    payload: parsed,
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

  const body = asObject(await req.json().catch(() => ({})));
  const action = asString(body.action);
  const payload = asObject(body.payload);

  if (!action || !ALLOWED_ACTIONS.has(action)) {
    return jsonResponse(
      {
        ok: false,
        error: "unsupported_action",
        detail: `Action no soportada: ${action || "<empty>"}`,
      },
      400,
      cors,
    );
  }

  const actor = `admin:${asString(usuario.id, asString(user.id))}`;
  const tenantId = asString(usuario.tenant_id);

  const opsResponse = await invokeOpsFunction("ops-support-macros-admin", {
    action,
    payload: {
      ...payload,
      tenant_id: asString(payload.tenant_id, tenantId),
    },
    actor,
    tenant_id: tenantId,
  });

  if (!opsResponse.ok) {
    return jsonResponse(
      {
        ok: false,
        action,
        error: "proxy_action_failed",
        detail: opsResponse.detail,
        payload: opsResponse.payload || null,
      },
      500,
      cors,
    );
  }

  const resultPayload = asObject(opsResponse.payload);
  return jsonResponse(
    {
      ok: true,
      action,
      data: resultPayload.data ?? resultPayload.payload ?? resultPayload,
    },
    200,
    cors,
  );
});
