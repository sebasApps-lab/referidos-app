import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse, supabaseAdmin } from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

type IngestResultRow = {
  source_event_key: string;
  status: string;
  detail: string | null;
  event_id: string | null;
};

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function parseAllowedRefs(raw: string) {
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

const sharedToken = asString(Deno.env.get("OPS_TELEMETRY_SHARED_TOKEN"));
const allowedSourceRefs = parseAllowedRefs(
  asString(Deno.env.get("OPS_TELEMETRY_ALLOWED_SOURCE_REFS")),
);
const maxBatchSize = Number.parseInt(
  asString(Deno.env.get("OPS_TELEMETRY_MAX_BATCH_SIZE"), "2000"),
  10,
);

function ensureEnv() {
  if (!sharedToken) {
    return {
      ok: false,
      error: "missing_env",
      detail: "Missing OPS_TELEMETRY_SHARED_TOKEN in ops runtime.",
    };
  }
  return { ok: true };
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

  const token = asString(req.headers.get("x-ops-telemetry-token"));
  if (!token || token !== sharedToken) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const sourceProjectRef = asString(body.source_project_ref);
  const sourceEnvKey = asString(body.source_env_key, "unknown").toLowerCase();
  const actor = asString(body.actor, "system:ops-ingest");
  const panelKey = asString(body.panel_key, "unknown");
  const mode = asString(body.mode, "hot");
  const batch = asArray(body.batch);

  if (!sourceProjectRef) {
    return jsonResponse(
      { ok: false, error: "missing_source_project_ref" },
      400,
      cors,
    );
  }

  if (allowedSourceRefs.length > 0 && !allowedSourceRefs.includes(sourceProjectRef)) {
    return jsonResponse(
      {
        ok: false,
        error: "source_project_not_allowed",
        detail: `source_project_ref ${sourceProjectRef} is not in allowlist`,
      },
      403,
      cors,
    );
  }

  if (!batch.length) {
    return jsonResponse(
      {
        ok: true,
        accepted_source_event_keys: [],
        accepted_count: 0,
        duplicate_count: 0,
        rejected_count: 0,
      },
      200,
      cors,
    );
  }

  if (batch.length > Math.max(1, Number.isFinite(maxBatchSize) ? maxBatchSize : 2000)) {
    return jsonResponse(
      {
        ok: false,
        error: "batch_too_large",
        detail: `Maximum batch size is ${maxBatchSize}`,
      },
      400,
      cors,
    );
  }

  const { data, error } = await supabaseAdmin.rpc("ops_telemetry_ingest_batch", {
    p_source_project_ref: sourceProjectRef,
    p_source_env_key: sourceEnvKey,
    p_actor: actor,
    p_panel_key: panelKey,
    p_mode: mode,
    p_batch: batch,
  });

  if (error) {
    return jsonResponse(
      {
        ok: false,
        error: "ingest_batch_failed",
        detail: error.message,
      },
      500,
      cors,
    );
  }

  const rows = (data || []) as IngestResultRow[];
  const acceptedRows = rows.filter((row) => ["accepted", "duplicate"].includes(asString(row.status)));
  const duplicateRows = rows.filter((row) => asString(row.status) === "duplicate");
  const rejectedRows = rows.filter((row) => asString(row.status) === "rejected");

  const acceptedSourceEventKeys = acceptedRows
    .map((row) => asString(row.source_event_key))
    .filter(Boolean);

  return jsonResponse(
    {
      ok: true,
      source_project_ref: sourceProjectRef,
      source_env_key: sourceEnvKey,
      total_received: batch.length,
      processed_rows: rows.length,
      accepted_count: acceptedRows.length,
      duplicate_count: duplicateRows.length,
      rejected_count: rejectedRows.length,
      accepted_source_event_keys: acceptedSourceEventKeys,
      rejected: rejectedRows.map((row) => ({
        source_event_key: asString(row.source_event_key),
        detail: asString(row.detail, "rejected"),
      })),
    },
    200,
    cors,
  );
});
