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
  const noteBody = safeTrim(body.body, 1500);

  if (!threadPublicId || !noteBody) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, assigned_agent_id")
    .eq("public_id", threadPublicId)
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  if (usuario.role === "soporte" && thread.assigned_agent_id !== usuario.id) {
    return jsonResponse({ ok: false, error: "not_assigned" }, 403, cors);
  }

  const insertResponse = await supabaseAdmin
    .from("support_thread_notes")
    .insert({
      thread_id: thread.id,
      author_id: usuario.id,
      body: noteBody,
    })
    .select("id, thread_id, body, created_at")
    .single();

  if (insertResponse.error) {
    return jsonResponse({ ok: false, error: "note_insert_failed" }, 500, cors);
  }

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "note_added",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: { note_id: insertResponse.data.id },
  });

  return jsonResponse({ ok: true, note: insertResponse.data }, 200, cors);
});

