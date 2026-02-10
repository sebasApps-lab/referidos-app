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
  if (usuario.role !== "admin") {
    return jsonResponse({ ok: false, error: "forbidden" }, 403, cors);
  }

  const body = await req.json().catch(() => ({}));
  const threadPublicId = safeTrim(body.thread_public_id, 32);
  const userPublicId = safeTrim(body.user_public_id, 32);
  const userId = safeTrim(body.user_id, 64);

  if (!threadPublicId || (!userPublicId && !userId)) {
    return jsonResponse({ ok: false, error: "missing_params" }, 400, cors);
  }

  const { data: thread, error: threadErr } = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, request_origin, anon_profile_id")
    .eq("public_id", threadPublicId)
    .eq("request_origin", "anonymous")
    .maybeSingle();

  if (threadErr || !thread) {
    return jsonResponse({ ok: false, error: "thread_not_found" }, 404, cors);
  }

  let userLookupQuery = supabaseAdmin
    .from("usuarios")
    .select("id, public_id")
    .limit(1);
  if (userPublicId) {
    userLookupQuery = userLookupQuery.eq("public_id", userPublicId);
  } else {
    userLookupQuery = userLookupQuery.eq("id", userId);
  }

  const { data: targetUser, error: userErr } = await userLookupQuery.maybeSingle();
  if (userErr || !targetUser) {
    return jsonResponse({ ok: false, error: "user_not_found" }, 404, cors);
  }

  const { error: updateErr } = await supabaseAdmin
    .from("support_threads")
    .update({
      user_id: targetUser.id,
      user_public_id: targetUser.public_id,
      request_origin: "registered",
      is_anonymous: false,
      anon_tracking_token_hash: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", thread.id);

  if (updateErr) {
    return jsonResponse({ ok: false, error: "link_failed" }, 500, cors);
  }

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "linked_to_user",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: {
      linked_user_id: targetUser.id,
      linked_user_public_id: targetUser.public_id,
      anon_profile_id: thread.anon_profile_id,
    },
  });

  return jsonResponse(
    {
      ok: true,
      thread_public_id: thread.public_id,
      user_id: targetUser.id,
      user_public_id: targetUser.public_id,
    },
    200,
    cors,
  );
});
