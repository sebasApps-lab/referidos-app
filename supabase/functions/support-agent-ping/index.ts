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
  if (usuario.role !== "soporte") {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const staleSince = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { data: staleSessions } = await supabaseAdmin
    .from("support_agent_sessions")
    .select("id, agent_id")
    .is("end_at", null)
    .lt("last_seen_at", staleSince);

  if (staleSessions && staleSessions.length > 0) {
    for (const session of staleSessions) {
      await supabaseAdmin
        .from("support_agent_sessions")
        .update({
          end_at: new Date().toISOString(),
          end_reason: "timeout",
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", session.id);

      const { data: assignedThreads } = await supabaseAdmin
        .from("support_threads")
        .select("id")
        .eq("assigned_agent_id", session.agent_id)
        .in("status", ["assigned", "in_progress", "waiting_user", "queued"]);

      if (assignedThreads && assignedThreads.length > 0) {
        for (const thread of assignedThreads) {
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
            event_type: "agent_timeout_release",
            actor_role: "system",
            actor_id: session.agent_id,
            details: { reason: "inactive_session" },
          });
        }
      }

      await supabaseAdmin.from("support_agent_events").insert({
        agent_id: session.agent_id,
        event_type: "agent_logout",
        actor_id: session.agent_id,
        details: { reason: "timeout" },
      });
    }
  }

  const { data: session } = await supabaseAdmin
    .from("support_agent_sessions")
    .select("id")
    .eq("agent_id", usuario.id)
    .is("end_at", null)
    .order("start_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (session?.id) {
    await supabaseAdmin
      .from("support_agent_sessions")
      .update({ last_seen_at: new Date().toISOString() })
      .eq("id", session.id);
  }

  return jsonResponse({ ok: true }, 200, cors);
});
