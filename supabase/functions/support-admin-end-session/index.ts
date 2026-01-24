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
  const rawReason = body.reason ?? "admin_revoke";
  const allowedReasons = new Set(["logout", "timeout", "admin_revoke", "manual_end"]);
  const reason = allowedReasons.has(rawReason) ? rawReason : "admin_revoke";
  const agentId = body.agent_id;
  if (!agentId) {
    return jsonResponse({ ok: false, error: "missing_agent_id" }, 400, cors);
  }

  const { data: endedSessions, error: endErr } = await supabaseAdmin
    .from("support_agent_sessions")
    .update({
      end_at: new Date().toISOString(),
      end_reason: reason,
      last_seen_at: new Date().toISOString(),
    })
    .eq("agent_id", agentId)
    .is("end_at", null)
    .select("id");

  if (endErr) {
    return jsonResponse(
      { ok: false, error: "session_end_failed", details: endErr.message },
      500,
      cors
    );
  }

  if (!endedSessions || endedSessions.length === 0) {
    return jsonResponse(
      { ok: false, error: "no_open_session", agent_id: agentId },
      404,
      cors
    );
  }


  const { data: activeThreads } = await supabaseAdmin
    .from("support_threads")
    .select("id")
    .eq("assigned_agent_id", agentId)
    .in("status", ["assigned", "in_progress", "waiting_user", "queued"]);

  if (activeThreads && activeThreads.length > 0) {
    for (const thread of activeThreads) {
      await supabaseAdmin
        .from("support_threads")
        .update({
          status: "queued",
          assigned_agent_id: null,
          personal_queue: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", thread.id);

      await supabaseAdmin.from("support_thread_events").insert({
        thread_id: thread.id,
        event_type: "agent_manual_release",
        actor_role: "admin",
        actor_id: usuario.id,
        details: { reason: "admin_session_end" },
      });
    }
  }

  await supabaseAdmin.from("support_agent_events").insert({
    agent_id: agentId,
    event_type: "agent_logout",
    actor_id: usuario.id,
    details: { reason, actor_role: "admin" },
  });

  return jsonResponse({ ok: true, ended: endedSessions.length }, 200, cors);
});
