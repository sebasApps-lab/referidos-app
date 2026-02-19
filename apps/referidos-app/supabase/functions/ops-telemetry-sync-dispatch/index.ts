import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

type OutboxRow = {
  id: string;
  tenant_id: string;
  domain: string;
  source_table: string;
  source_row_id: string;
  source_event_key: string;
  source_app_id: string;
  event_type: string;
  occurred_at: string;
  retention_tier: string;
  payload: JsonObject;
  attempts: number;
};

type RuntimeConfigRow = {
  cron_token: string;
  enabled: boolean;
};

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const next = value.trim();
  return next || fallback;
}

function asBoolean(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function asNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return parsed;
}

function clampLimit(value: unknown, fallback: number) {
  const raw = Math.trunc(asNumber(value, fallback));
  return Math.min(1000, Math.max(1, raw));
}

function backoffMinutes(attempts: number) {
  const exponent = Math.min(Math.max(attempts, 1), 8);
  return Math.min(180, Math.pow(2, exponent));
}

function nextRetryIso(attempts: number) {
  const minutes = backoffMinutes(attempts);
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}

function isObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

const ingestUrl = asString(Deno.env.get("OPS_TELEMETRY_INGEST_URL"));
const sharedToken = asString(Deno.env.get("OPS_TELEMETRY_SHARED_TOKEN"));
const sourceProjectRef = asString(Deno.env.get("OPS_TELEMETRY_SOURCE_PROJECT_REF"));
const sourceEnvKey = asString(Deno.env.get("OPS_TELEMETRY_SOURCE_ENV_KEY"), "dev").toLowerCase();
const cronToken = asString(Deno.env.get("OPS_TELEMETRY_CRON_TOKEN"));
const hotBatchLimitDefault = clampLimit(
  Deno.env.get("OPS_TELEMETRY_HOT_BATCH_LIMIT"),
  200,
);
const coldBatchLimitDefault = clampLimit(
  Deno.env.get("OPS_TELEMETRY_COLD_BATCH_LIMIT"),
  1000,
);

async function validateCronToken(token: string) {
  const normalized = asString(token);
  if (!normalized) return false;
  if (cronToken && normalized === cronToken) return true;

  const { data, error } = await supabaseAdmin
    .from("ops_sync_runtime_config")
    .select("cron_token, enabled")
    .eq("enabled", true)
    .limit(20);

  if (error) {
    return false;
  }

  const rows = (data || []) as RuntimeConfigRow[];
  return rows.some((row) => asString(row.cron_token) === normalized);
}

function ensureEnv() {
  if (!ingestUrl || !sharedToken || !sourceProjectRef || !sourceEnvKey) {
    return {
      ok: false,
      error: "missing_env",
      detail:
        "Missing OPS_TELEMETRY_INGEST_URL/OPS_TELEMETRY_SHARED_TOKEN/OPS_TELEMETRY_SOURCE_PROJECT_REF/OPS_TELEMETRY_SOURCE_ENV_KEY",
    };
  }
  return { ok: true };
}

async function claimRows(limit: number) {
  const { data, error } = await supabaseAdmin.rpc("ops_sync_claim_outbox", {
    p_limit: limit,
  });
  if (error) throw new Error(error.message);
  return ((data || []) as OutboxRow[]).map((row) => ({
    ...row,
    attempts: Number(row.attempts || 0),
    payload: isObject(row.payload) ? row.payload : {},
  }));
}

async function markRowsSent(rowIds: string[]) {
  if (!rowIds.length) return;
  const { error } = await supabaseAdmin
    .from("ops_sync_outbox")
    .update({
      status: "sent",
      sent_at: new Date().toISOString(),
      last_error: null,
      updated_at: new Date().toISOString(),
    })
    .in("id", rowIds);
  if (error) throw new Error(error.message);
}

async function markRowsFailed(rows: OutboxRow[], reason: string) {
  for (const row of rows) {
    const nextStatus = row.attempts >= 8 ? "dead" : "failed";
    const payload = {
      status: nextStatus,
      next_retry_at: nextStatus === "failed" ? nextRetryIso(row.attempts) : null,
      last_error: reason.slice(0, 1000),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabaseAdmin
      .from("ops_sync_outbox")
      .update(payload)
      .eq("id", row.id);
    if (error) {
      // Continue best effort. We avoid hard-failing the whole cycle.
      // eslint-disable-next-line no-console
      console.error("ops_sync_mark_failed_error", row.id, error.message);
    }
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
  if (!envCheck.ok) return jsonResponse(envCheck, 500, cors);

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const requestedMode = asString(body.mode, "").toLowerCase();
  const internalCronCall = await validateCronToken(
    asString(req.headers.get("x-ops-sync-cron-token")),
  );

  let actor = "system:cold-cron";
  if (!internalCronCall) {
    const authHeader = req.headers.get("authorization") || "";
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

    actor = `${asString(usuario.role)}:${asString(usuario.id, user.id)}`;
  }

  const mode = internalCronCall
    ? "cold"
    : requestedMode === "cold"
      ? "cold"
      : "hot";
  const defaultLimit = mode === "cold" ? coldBatchLimitDefault : hotBatchLimitDefault;
  const limit = clampLimit(body.limit, defaultLimit);
  const force = asBoolean(body.force, false);
  const panelKey = asString(body.panel_key, "unknown");

  let claimedRows: OutboxRow[] = [];
  try {
    claimedRows = await claimRows(limit);
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: "claim_failed",
        detail: error instanceof Error ? error.message : "claim_failed",
      },
      500,
      cors,
    );
  }

  if (!claimedRows.length) {
    return jsonResponse(
      {
        ok: true,
        mode,
        actor,
        panel_key: panelKey,
        force,
        claimed: 0,
        sent: 0,
        failed: 0,
      },
      200,
      cors,
    );
  }

  const payload = {
    source_project_ref: sourceProjectRef,
    source_env_key: sourceEnvKey,
    actor,
    panel_key: panelKey,
    mode,
    batch: claimedRows.map((row) => ({
      outbox_id: row.id,
      source_event_key: row.source_event_key,
      tenant_id: row.tenant_id,
      domain: row.domain,
      source_table: row.source_table,
      source_row_id: row.source_row_id,
      source_app_id: row.source_app_id,
      event_type: row.event_type,
      occurred_at: row.occurred_at,
      retention_tier: row.retention_tier,
      payload: row.payload,
    })),
  };

  let response: Response;
  let responseJson: JsonObject = {};
  try {
    response = await fetch(ingestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ops-telemetry-token": sharedToken,
      },
      body: JSON.stringify(payload),
    });
    responseJson = (await response.json().catch(() => ({}))) as JsonObject;
  } catch (error) {
    await markRowsFailed(
      claimedRows,
      `network_error:${error instanceof Error ? error.message : "fetch_failed"}`,
    );
    return jsonResponse(
      {
        ok: false,
        error: "ingest_unreachable",
        detail: error instanceof Error ? error.message : "fetch_failed",
        claimed: claimedRows.length,
      },
      502,
      cors,
    );
  }

  if (!response.ok || responseJson.ok === false) {
    await markRowsFailed(
      claimedRows,
      asString(responseJson.detail, asString(responseJson.error, "ingest_failed")),
    );
    return jsonResponse(
      {
        ok: false,
        error: "ingest_failed",
        detail: asString(responseJson.detail, asString(responseJson.error, "ingest_failed")),
        claimed: claimedRows.length,
      },
      502,
      cors,
    );
  }

  const acceptedKeys = new Set(
    (Array.isArray(responseJson.accepted_source_event_keys)
      ? responseJson.accepted_source_event_keys
      : []
    )
      .map((item) => asString(item))
      .filter(Boolean),
  );

  const rowsSent = claimedRows.filter((row) => acceptedKeys.has(row.source_event_key));
  const rowsFailed = claimedRows.filter((row) => !acceptedKeys.has(row.source_event_key));

  try {
    await markRowsSent(rowsSent.map((row) => row.id));
  } catch (error) {
    await markRowsFailed(
      rowsSent,
      `mark_sent_failed:${error instanceof Error ? error.message : "mark_sent_failed"}`,
    );
  }

  if (rowsFailed.length) {
    await markRowsFailed(rowsFailed, "not_acked_by_ops_ingest");
  }

  return jsonResponse(
    {
      ok: true,
      mode,
      actor,
      panel_key: panelKey,
      force,
      claimed: claimedRows.length,
      sent: rowsSent.length,
      failed: rowsFailed.length,
    },
    200,
    cors,
  );
});
