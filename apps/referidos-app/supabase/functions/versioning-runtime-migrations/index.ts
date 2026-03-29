import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse, supabaseAdmin } from "../_shared/support.ts";

type JsonObject = Record<string, unknown>;

const INTERNAL_HEADER = "x-versioning-proxy-token";

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function corsWithInternalHeader(origin: string | null) {
  const base = corsHeaders(origin);
  const current = base["Access-Control-Allow-Headers"] || "";
  return {
    ...base,
    "Access-Control-Allow-Headers": `${current}, ${INTERNAL_HEADER}`,
  };
}

function resolveProjectRefFromUrl() {
  const url = asString(Deno.env.get("SUPABASE_URL") ?? Deno.env.get("URL"));
  if (!url) return "";
  try {
    const hostname = new URL(url).hostname;
    return asString(hostname.split(".")[0]);
  } catch {
    return "";
  }
}

function isAuthorized(req: Request) {
  const expected = asString(Deno.env.get("VERSIONING_PROXY_SHARED_TOKEN"));
  if (!expected) return false;
  const received = asString(req.headers.get(INTERNAL_HEADER));
  return Boolean(received) && received === expected;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsWithInternalHeader(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  if (!isAuthorized(req)) {
    return jsonResponse({ ok: false, error: "unauthorized_internal_call" }, 401, cors);
  }

  const body = (await req.json().catch(() => ({}))) as JsonObject;
  const operation = asString(body.operation, "list_applied_migrations").toLowerCase();

  if (!["list_applied_migrations", "check_versions", "health"].includes(operation)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_operation",
        detail: "operation permitido: list_applied_migrations | check_versions | health",
      },
      400,
      cors
    );
  }

  if (operation === "health") {
    const requiredEnvKeys = [
      "VERSIONING_OPS_URL",
      "VERSIONING_OPS_SECRET_KEY",
      "VERSIONING_PROXY_SHARED_TOKEN",
    ];
    const statusByKey: Record<string, boolean> = {};
    for (const key of requiredEnvKeys) {
      statusByKey[key] = Boolean(asString(Deno.env.get(key)));
    }
    const missing = requiredEnvKeys.filter((key) => !statusByKey[key]);
    return jsonResponse(
      {
        ok: true,
        operation,
        project_ref: resolveProjectRefFromUrl(),
        runtime_required_env: requiredEnvKeys,
        runtime_status_by_key: statusByKey,
        runtime_missing_env: missing,
        runtime_ok: missing.length === 0,
      },
      200,
      cors
    );
  }

  const { data: rows, error } = await supabaseAdmin.rpc("versioning_list_applied_migrations");
  if (error) {
    return jsonResponse(
      {
        ok: false,
        error: "list_applied_migrations_failed",
        detail: error.message,
      },
      500,
      cors
    );
  }

  const normalizedRows = asArray(rows)
    .map((row) => {
      const typed = row as JsonObject;
      return {
        version: asString(typed.version),
        name: asString(typed.name),
        statements: asString(typed.statements),
      };
    })
    .filter((row) => row.version);

  const appliedVersions = Array.from(
    new Set(normalizedRows.map((row) => row.version))
  ).sort((a, b) => String(a).localeCompare(String(b)));

  if (operation === "list_applied_migrations") {
    return jsonResponse(
      {
        ok: true,
        operation,
        project_ref: resolveProjectRefFromUrl(),
        applied_versions: appliedVersions,
        rows: normalizedRows,
      },
      200,
      cors
    );
  }

  const requiredVersions = Array.from(
    new Set(
      asArray(body.required_versions)
        .map((value) => asString(value))
        .filter(Boolean)
    )
  );
  const appliedSet = new Set(appliedVersions);
  const missingVersions = requiredVersions.filter((version) => !appliedSet.has(version));

  return jsonResponse(
    {
      ok: true,
      operation,
      project_ref: resolveProjectRefFromUrl(),
      required_versions: requiredVersions,
      applied_versions: appliedVersions,
      missing_versions: missingVersions,
      gate_passed: missingVersions.length === 0,
    },
    200,
    cors
  );
});

