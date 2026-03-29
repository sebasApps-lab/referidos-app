import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  supabaseAdmin,
} from "../_shared/support.ts";
import { runSupportAutoAssignCycle } from "../_shared/supportAutoAssign.ts";

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

  const body = await req.json().catch(() => ({}));
  const reason = body.reason ?? "logout";
  const abandonmentConfirmed = Boolean(body.abandonment_confirmed);
  const abandonmentMessageSent = Boolean(body.abandonment_message_sent);

  const { data: session } = await supabaseAdmin
    .from("support_agent_sessions")
    .select("id")
    .eq("agent_id", usuario.id)
    .is("end_at", null)
    .order("start_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: activeThreads } = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, status, summary")
    .eq("assigned_agent_id", usuario.id)
    .in("status", ["starting", "assigned", "in_progress", "waiting_user", "queued"]);

  const abandonmentCandidates = (activeThreads || []).filter((thread) => {
    const status = String(thread?.status || "").toLowerCase();
    return status === "in_progress";
  });

  const requiresAbandonmentConfirmation =
    (reason === "manual_end" || reason === "logout") &&
    abandonmentCandidates.length > 0 &&
    !abandonmentConfirmed;

  if (requiresAbandonmentConfirmation) {
    return jsonResponse(
      {
        ok: false,
        error: "abandonment_confirmation_required",
        requires_confirmation: true,
        threads: abandonmentCandidates.map((thread) => ({
          public_id: thread.public_id,
          status: thread.status,
          summary: thread.summary || null,
        })),
      },
      200,
      cors,
    );
  }

  const nowIso = new Date().toISOString();

  if (session?.id) {
    await supabaseAdmin
      .from("support_agent_sessions")
      .update({
        end_at: nowIso,
        end_reason: reason,
        last_seen_at: nowIso,
      })
      .eq("id", session.id);
  }

  if (reason === "logout") {
    await supabaseAdmin
      .from("support_agent_profiles")
      .update({ authorized_for_work: false })
      .eq("user_id", usuario.id);
  }

  const isAbandonmentRelease = abandonmentConfirmed && abandonmentMessageSent;

  if (activeThreads && activeThreads.length > 0) {
    for (const thread of activeThreads) {
      await supabaseAdmin
        .from("support_threads")
        .update({
          status: "queued",
          assigned_agent_id: null,
          personal_queue: false,
          assignment_source: "system",
          retake_requested_at: null,
          handoff_required: isAbandonmentRelease,
          handoff_reason: isAbandonmentRelease ? "agent_abandonment" : null,
          handoff_at: isAbandonmentRelease ? nowIso : null,
          handoff_by_agent_id: isAbandonmentRelease ? usuario.id : null,
          handoff_message_confirmed_at: isAbandonmentRelease ? nowIso : null,
          released_to_general_at: nowIso,
          general_queue_entered_at: nowIso,
          updated_at: nowIso,
        })
        .eq("id", thread.id);

      await supabaseAdmin.from("support_thread_events").insert({
        thread_id: thread.id,
        event_type: "agent_manual_release",
        actor_role: "soporte",
        actor_id: usuario.id,
        details: {
          reason: isAbandonmentRelease ? "agent_abandon_confirmed" : "agent_session_end",
          abandonment_message_sent: isAbandonmentRelease,
        },
      });
    }
  }

  await runSupportAutoAssignCycle({
    reason: "agent_session_end",
    tenantId: usuario.tenant_id || null,
    actorId: usuario.id,
    actorRole: usuario.role || "soporte",
  });

  await supabaseAdmin.from("support_agent_events").insert({
    agent_id: usuario.id,
    event_type: "agent_logout",
    actor_id: usuario.id,
    details: { reason },
  });

  return jsonResponse({ ok: true }, 200, cors);
});
