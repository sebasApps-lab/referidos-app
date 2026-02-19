import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { corsHeaders, jsonResponse, supabaseAdmin } from "../_shared/support.ts";

const CALLBACK_HEADER = "x-versioning-callback-token";

function asString(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim();
  return normalized || fallback;
}

function corsWithCallbackHeader(origin: string | null) {
  const base = corsHeaders(origin);
  const current = base["Access-Control-Allow-Headers"] || "";
  return {
    ...base,
    "Access-Control-Allow-Headers": `${current}, ${CALLBACK_HEADER}`,
  };
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsWithCallbackHeader(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
  }

  const expectedToken = asString(Deno.env.get("VERSIONING_DEPLOY_CALLBACK_TOKEN"));
  if (!expectedToken) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_callback_token_config",
        detail: "Define VERSIONING_DEPLOY_CALLBACK_TOKEN en Edge secrets.",
      },
      500,
      cors
    );
  }

  const receivedToken = asString(req.headers.get(CALLBACK_HEADER));
  if (!receivedToken || receivedToken !== expectedToken) {
    return jsonResponse({ ok: false, error: "invalid_callback_token" }, 401, cors);
  }

  const body = await req.json().catch(() => ({}));
  const requestId = asString(body.request_id);
  const actor = asString(body.actor, "github-actions");
  const deploymentId = asString(body.deployment_id);
  const logsUrl = asString(body.logs_url);
  const status = asString(body.status).toLowerCase();
  const metadata = typeof body.metadata === "object" && body.metadata ? body.metadata : {};

  if (!requestId) {
    return jsonResponse({ ok: false, error: "missing_request_id" }, 400, cors);
  }
  if (!["success", "failed"].includes(status)) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_status",
        detail: "status permitido: success | failed",
      },
      400,
      cors
    );
  }

  const { data, error } = await supabaseAdmin.rpc("versioning_finalize_deploy_request", {
    p_request_id: requestId,
    p_actor: actor,
    p_status: status,
    p_deployment_id: deploymentId || null,
    p_logs_url: logsUrl || null,
    p_metadata: metadata || {},
  });

  if (error) {
    return jsonResponse(
      {
        ok: false,
        error: "finalize_deploy_failed",
        detail: error.message,
      },
      500,
      cors
    );
  }

  return jsonResponse(
    {
      ok: true,
      request_id: requestId,
      deployment_row_id: data || null,
      status,
    },
    200,
    cors
  );
});

