import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

const ALLOWED_ACTIONS = new Set([
  "fetch_dlq_purge_preview",
  "fetch_dlq_purge_events",
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

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeLimit(value: unknown, fallback = 50, min = 1, max = 200) {
  return Math.min(Math.max(asNumber(value, fallback), min), max);
}

function normalizeOffset(value: unknown, fallback = 0) {
  return Math.max(asNumber(value, fallback), 0);
}

const opsUrl = asString(Deno.env.get("SUPPORT_OPS_URL"));
const opsSecretKey = asString(Deno.env.get("SUPPORT_OPS_SECRET_KEY"));

function ensureEnv() {
  if (!opsUrl || !opsSecretKey) {
    return {
      ok: false,
      error: "missing_ops_env",
      detail: "Missing SUPPORT_OPS_URL/SUPPORT_OPS_SECRET_KEY in runtime project.",
    };
  }
  return { ok: true };
}

const opsAdmin = createClient(opsUrl || "https://invalid.local", opsSecretKey || "invalid", {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function handleAction(action: string, payload: JsonObject) {
  switch (action) {
    case "fetch_dlq_purge_preview": {
      const limit = normalizeLimit(payload.limit, 50);

      const [
        { data: summaryRows, error: summaryError },
        { data: groupRows, error: groupsError },
      ] = await Promise.all([
        opsAdmin.rpc("ops_telemetry_ingest_dlq_summary_for_next_purge"),
        opsAdmin.rpc("ops_telemetry_ingest_dlq_groups_for_next_purge", {
          p_limit: limit,
        }),
      ]);

      if (summaryError) throw new Error(summaryError.message);
      if (groupsError) throw new Error(groupsError.message);

      const summary = Array.isArray(summaryRows) && summaryRows.length > 0
        ? summaryRows[0]
        : {
            next_purge_at: null,
            total_events: 0,
            total_groups: 0,
            approx_raw_event_bytes: 0,
            first_expires_at: null,
            last_expires_at: null,
          };

      return {
        summary,
        groups: Array.isArray(groupRows) ? groupRows : [],
      };
    }

    case "fetch_dlq_purge_events": {
      const groupKey = asString(payload.groupKey);
      const limit = normalizeLimit(payload.limit, 100);
      const offset = normalizeOffset(payload.offset, 0);

      const { data, error } = await opsAdmin.rpc("ops_telemetry_ingest_dlq_events_for_next_purge", {
        p_group_key: groupKey || null,
        p_limit: limit,
        p_offset: offset,
      });

      if (error) throw new Error(error.message);

      const rows = Array.isArray(data) ? data : [];
      const totalCount = rows.length > 0 ? asNumber(rows[0]?.total_count, 0) : 0;
      const nextPurgeAt = rows.length > 0 ? asString(rows[0]?.next_purge_at) : "";

      return {
        total_count: totalCount,
        next_purge_at: nextPurgeAt,
        events: rows.map((row) => {
          const event = asObject(row);
          delete event.total_count;
          return event;
        }),
      };
    }

    default:
      throw new Error(`Accion no soportada: ${action}`);
  }
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
        detail: `Accion no soportada: ${action || "<empty>"}`,
      },
      400,
      cors,
    );
  }

  try {
    const data = await handleAction(action, payload);
    return jsonResponse(
      {
        ok: true,
        action,
        data,
      },
      200,
      cors,
    );
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        action,
        error: "proxy_action_failed",
        detail: error instanceof Error ? error.message : "proxy_action_failed",
      },
      500,
      cors,
    );
  }
});
