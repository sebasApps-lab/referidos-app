import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
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
  if (!["soporte", "admin"].includes(usuario.role)) {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const body = await req.json().catch(() => ({}));
  const threadPublicId = body.thread_public_id;
  const resolution = safeTrim(body.resolution, 1000);
  const rootCause = safeTrim(body.root_cause, 1000);

  if (!threadPublicId) {
    return jsonResponse({ ok: false, error: "missing_thread" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, assigned_agent_id, status, closed_at, resolution, root_cause")
    .eq("public_id", threadPublicId)
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  if (usuario.role === "soporte" && thread.assigned_agent_id !== usuario.id) {
    return jsonResponse({ ok: false, error: "not_assigned" }, 403, cors);
  }

  if (thread.status === "closed") {
    return jsonResponse(
      {
        ok: true,
        thread: {
          public_id: thread.public_id,
          status: thread.status,
          closed_at: thread.closed_at,
          resolution: thread.resolution,
          root_cause: thread.root_cause,
        },
      },
      200,
      cors,
    );
  }

  const updateResponse = await supabaseAdmin
    .from("support_threads")
    .update({
      status: "closed",
      resolution,
      root_cause: rootCause,
      closed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", thread.id)
    .neq("status", "closed")
    .select("public_id, status, closed_at, resolution, root_cause")
    .maybeSingle();

  if (updateResponse.error) {
    return jsonResponse({ ok: false, error: "close_failed" }, 500, cors);
  }

  if (!updateResponse.data) {
    const { data: currentThread, error: currentThreadErr } = await supabaseAdmin
      .from("support_threads")
      .select("public_id, status, closed_at, resolution, root_cause")
      .eq("id", thread.id)
      .maybeSingle();

    if (currentThreadErr || !currentThread) {
      return jsonResponse({ ok: false, error: "close_failed" }, 500, cors);
    }

    return jsonResponse({ ok: true, thread: currentThread }, 200, cors);
  }

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "closed",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: { resolution, root_cause: rootCause },
  });

  return jsonResponse({ ok: true, thread: updateResponse.data }, 200, cors);
});

