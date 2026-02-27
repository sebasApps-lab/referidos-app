import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  loadSupportRuntimeFlags,
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

  await supabaseAdmin
    .from("support_agent_profiles")
    .upsert({ user_id: usuario.id }, { onConflict: "user_id" });

  const { data: agentProfile, error: agentErr } = await supabaseAdmin
    .from("support_agent_profiles")
    .select(
      "user_id, authorized_for_work, authorized_until, blocked, session_request_status"
    )
    .eq("user_id", usuario.id)
    .maybeSingle();

  if (agentErr || !agentProfile) {
    return jsonResponse({ ok: false, error: "agent_not_found" }, 404, cors);
  }
  if (agentProfile.blocked) {
    return jsonResponse({ ok: false, error: "not_authorized" }, 403, cors);
  }

  const { data: openSession } = await supabaseAdmin
    .from("support_agent_sessions")
    .select("id")
    .eq("agent_id", usuario.id)
    .is("end_at", null)
    .maybeSingle();

  if (openSession?.id) {
    return jsonResponse({ ok: true, session_id: openSession.id }, 200, cors);
  }

  const runtimeFlags = await loadSupportRuntimeFlags();
  const requireJornadaAuthorization = runtimeFlags.require_jornada_authorization;
  const requireSessionAuthorization = runtimeFlags.require_session_authorization;

  const authorizationExpiresAt = agentProfile.authorized_until
    ? new Date(agentProfile.authorized_until).getTime()
    : null;
  const authorizationStillValid = authorizationExpiresAt === null ||
    Number.isNaN(authorizationExpiresAt) ||
    authorizationExpiresAt >= Date.now();
  const isAuthorizedForWork = Boolean(agentProfile.authorized_for_work) &&
    authorizationStillValid;

  if (!requireJornadaAuthorization && !agentProfile.authorized_for_work) {
    const nowIso = new Date().toISOString();
    await supabaseAdmin
      .from("support_agent_profiles")
      .update({
        authorized_for_work: true,
        blocked: false,
        authorized_from: agentProfile.authorized_from ?? nowIso,
        authorized_until: agentProfile.authorized_until,
      })
      .eq("user_id", usuario.id);
  }

  if (isAuthorizedForWork || !requireJornadaAuthorization) {
    if (requireSessionAuthorization) {
      if (agentProfile.session_request_status === "pending") {
        return jsonResponse(
          {
            ok: true,
            pending: true,
            pending_reason: "session_authorization_required",
          },
          200,
          cors
        );
      }

      const { error: requestErr } = await supabaseAdmin
        .from("support_agent_profiles")
        .update({
          session_request_status: "pending",
          session_request_at: new Date().toISOString(),
        })
        .eq("user_id", usuario.id);

      if (requestErr) {
        return jsonResponse({ ok: false, error: "session_request_failed" }, 500, cors);
      }

      return jsonResponse(
        {
          ok: true,
          pending: true,
          pending_reason: "session_authorization_required",
        },
        200,
        cors
      );
    }

    const { data: session, error: sessionErr } = await supabaseAdmin
      .from("support_agent_sessions")
      .insert({
        agent_id: usuario.id,
        authorized_by: usuario.id,
      })
      .select("id, start_at")
      .single();

    if (sessionErr || !session?.id) {
      const { data: raceSession } = await supabaseAdmin
        .from("support_agent_sessions")
        .select("id")
        .eq("agent_id", usuario.id)
        .is("end_at", null)
        .order("start_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!raceSession?.id) {
        return jsonResponse({ ok: false, error: "session_start_failed" }, 500, cors);
      }

      return jsonResponse({ ok: true, session_id: raceSession.id }, 200, cors);
    }

    await supabaseAdmin.from("support_agent_events").insert({
      agent_id: usuario.id,
      event_type: "agent_login",
      actor_id: usuario.id,
      details: { session_id: session.id, actor_role: "soporte" },
    });

    await supabaseAdmin
      .from("support_agent_profiles")
      .update({
        session_request_status: null,
        session_request_at: null,
      })
      .eq("user_id", usuario.id);

    return jsonResponse({ ok: true, session_id: session.id }, 200, cors);
  }

  if (agentProfile.session_request_status === "pending") {
    return jsonResponse(
      {
        ok: true,
        pending: true,
        pending_reason: "jornada_authorization_required",
      },
      200,
      cors
    );
  }

  const { error: requestErr } = await supabaseAdmin
    .from("support_agent_profiles")
    .update({
      session_request_status: "pending",
      session_request_at: new Date().toISOString(),
    })
    .eq("user_id", usuario.id);

  if (requestErr) {
    return jsonResponse({ ok: false, error: "session_request_failed" }, 500, cors);
  }

  return jsonResponse(
    {
      ok: true,
      pending: true,
      pending_reason: "jornada_authorization_required",
    },
    200,
    cors
  );
});
