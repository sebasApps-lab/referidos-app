import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import {
  corsHeaders,
  getUsuarioByAuthId,
  jsonResponse,
  requireAuthUser,
  safeTrim,
  supabaseAdmin,
} from "../_shared/support.ts";

const MAX_PER_MINUTE = 40;
const PERFORMANCE_SAMPLE_RATE = 0.2;

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

  const body = await req.json().catch(() => ({}));
  const level = body.level ?? "info";
  const category = body.category ?? "ui_flow";
  const message = safeTrim(body.message, 500);
  const requestId = safeTrim(body.request_id, 64);
  const context =
    typeof body.context === "object" && body.context ? body.context : {};

  if (!message) {
    return jsonResponse({ ok: false, error: "missing_message" }, 400, cors);
  }

  if (category === "performance" && Math.random() > PERFORMANCE_SAMPLE_RATE) {
    return jsonResponse({ ok: true, skipped: true }, 200, cors);
  }

  const since = new Date(Date.now() - 60 * 1000).toISOString();
  const { count, error: countErr } = await supabaseAdmin
    .from("support_user_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", usuario.id)
    .gte("created_at", since);

  if (countErr) {
    return jsonResponse({ ok: false, error: "rate_check_failed" }, 500, cors);
  }
  if ((count ?? 0) >= MAX_PER_MINUTE) {
    return jsonResponse({ ok: true, skipped: true }, 200, cors);
  }

  const insertResponse = await supabaseAdmin
    .from("support_user_logs")
    .insert({
      user_id: usuario.id,
      role: usuario.role,
      level,
      category,
      request_id: requestId || null,
      message,
      context,
    })
    .select("id")
    .single();

  if (insertResponse.error) {
    return jsonResponse({ ok: false, error: "log_insert_failed" }, 500, cors);
  }

  return jsonResponse({ ok: true }, 200, cors);
});
