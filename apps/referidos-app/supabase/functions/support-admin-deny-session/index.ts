import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, cors);
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

  const body = await req.json().catch(() => ({}));
  const agentId = body.agent_id;

  if (!agentId) {
    return jsonResponse({ ok: false, error: "missing_agent_id" }, 400, cors);
  }

  const { error } = await supabaseAdmin
    .from("support_agent_profiles")
    .update({
      session_request_status: "denied",
      session_request_at: null,
    })
    .eq("user_id", agentId);

  if (error) {
    return jsonResponse({ ok: false, error: "deny_failed" }, 500, cors);
  }

  await supabaseAdmin.from("support_agent_events").insert({
    agent_id: agentId,
    event_type: "agent_revoked",
    actor_id: usuario.id,
    details: { reason: "session_denied" },
  });

  return jsonResponse({ ok: true }, 200, cors);
});
