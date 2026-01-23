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

  await supabaseAdmin
    .from("support_agent_profiles")
    .upsert({ user_id: usuario.id }, { onConflict: "user_id" });

  const { data: openSession } = await supabaseAdmin
    .from("support_agent_sessions")
    .select("id")
    .eq("agent_id", usuario.id)
    .is("end_at", null)
    .order("start_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (openSession?.id) {
    return jsonResponse({ ok: true, session_id: openSession.id }, 200, cors);
  }

  const { data: session, error: sessionErr } = await supabaseAdmin
    .from("support_agent_sessions")
    .insert({ agent_id: usuario.id, authorized_by: usuario.id })
    .select("id, start_at")
    .single();

  if (sessionErr || !session) {
    return jsonResponse({ ok: false, error: "session_start_failed" }, 500, cors);
  }

  await supabaseAdmin.from("support_agent_events").insert({
    agent_id: usuario.id,
    event_type: "agent_login",
    actor_id: usuario.id,
    details: { session_id: session.id, actor_role: "admin" },
  });

  return jsonResponse({ ok: true, session_id: session.id }, 200, cors);
});
