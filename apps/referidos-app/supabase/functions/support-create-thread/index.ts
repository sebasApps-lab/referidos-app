import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  CATEGORY_LABELS,
  buildSupportMessage,
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

const SUPPORT_PHONE = "593995705833";

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

  const body = await req.json().catch(() => ({}));
  const category = body.category ?? "sugerencia";
  const severity = body.severity ?? "s2";
  const summary = safeTrim(body.summary, 240);
  const clientRequestId = safeTrim(body.client_request_id, 64) || null;
  const context = typeof body.context === "object" && body.context
    ? body.context
    : {};

  if (!summary) {
    return jsonResponse({ ok: false, error: "missing_summary" }, 400, cors);
  }

  const { usuario, error: profileErr } = await getUsuarioByAuthId(user.id);
  if (profileErr || !usuario) {
    return jsonResponse({ ok: false, error: "profile_not_found" }, 404, cors);
  }

  const activeQuery = await supabaseAdmin
    .from("support_threads")
    .select("id, public_id, wa_link, wa_message_text, status")
    .eq("user_id", usuario.id)
    .in("status", ["new", "assigned", "in_progress", "waiting_user", "queued"])
    .order("created_at", { ascending: false })
    .limit(1);

  if (activeQuery.data && activeQuery.data.length > 0) {
    const activeThread = activeQuery.data[0];
    return jsonResponse(
      {
        ok: true,
        thread_public_id: activeThread.public_id,
        user_public_id: usuario.public_id,
        wa_link: activeThread.wa_link,
        wa_message_text: activeThread.wa_message_text,
        reused: true,
      },
      200,
      cors
    );
  }

  const recentSince = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { count: recentCount } = await supabaseAdmin
    .from("support_threads")
    .select("id", { count: "exact", head: true })
    .eq("user_id", usuario.id)
    .gte("created_at", recentSince);
  if ((recentCount ?? 0) >= 1) {
    return jsonResponse(
      { ok: false, error: "rate_limited" },
      429,
      cors
    );
  }

  if (clientRequestId) {
    const existing = await supabaseAdmin
      .from("support_threads")
      .select("id, public_id, wa_link, wa_message_text, status")
      .eq("user_id", usuario.id)
      .eq("client_request_id", clientRequestId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (existing.data && existing.data.length > 0) {
      const existingThread = existing.data[0];
      return jsonResponse(
        {
          ok: true,
          thread_public_id: existingThread.public_id,
          user_public_id: usuario.public_id,
          wa_link: existingThread.wa_link,
          wa_message_text: existingThread.wa_message_text,
          reused: true,
        },
        200,
        cors
      );
    }
  }

  const categoryLabel = CATEGORY_LABELS[category] ?? "Soporte";

  const insertResponse = await supabaseAdmin
    .from("support_threads")
    .insert({
      user_id: usuario.id,
      user_public_id: usuario.public_id,
      category,
      severity,
      status: "new",
      summary,
      context,
      created_by_user_id: usuario.id,
      client_request_id: clientRequestId,
      suggested_contact_name: usuario.public_id,
      suggested_tags: [category, severity, "new"],
    })
    .select(
      "id, public_id, user_id, user_public_id, category, severity, status"
    )
    .single();

  if (insertResponse.error || !insertResponse.data) {
    return jsonResponse(
      { ok: false, error: "thread_create_failed" },
      500,
      cors
    );
  }

  const thread = insertResponse.data;
  const messageText = buildSupportMessage({
    userPublicId: usuario.public_id,
    threadPublicId: thread.public_id,
    categoryLabel,
    summary,
    context,
  });
  const waLink =
    "https://wa.me/" +
    SUPPORT_PHONE +
    "?text=" +
    encodeURIComponent(messageText);

  await supabaseAdmin
    .from("support_threads")
    .update({
      wa_message_text: messageText,
      wa_link: waLink,
    })
    .eq("id", thread.id);

  await supabaseAdmin.from("support_thread_events").insert({
    thread_id: thread.id,
    event_type: "created",
    actor_role: usuario.role,
    actor_id: usuario.id,
    details: {
      category,
      severity,
      wa_link: waLink,
      wa_message_text: messageText,
    },
  });

  return jsonResponse(
    {
      ok: true,
      thread_public_id: thread.public_id,
      user_public_id: usuario.public_id,
      wa_link: waLink,
      wa_message_text: messageText,
      suggested_contact_name: usuario.public_id,
      suggested_tags: [categoryLabel, severity, "new"],
    },
    200,
    cors
  );
});
