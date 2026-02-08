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
  const reporteId = body.reporte_id;
  const estado = body.estado;

  if (!reporteId) {
    return jsonResponse({ ok: false, error: "missing_reporte_id" }, 400, cors);
  }
  if (typeof estado !== "string") {
    return jsonResponse({ ok: false, error: "missing_estado" }, 400, cors);
  }

  const { data, error } = await supabaseAdmin
    .from("reportes")
    .update({ estado })
    .eq("id", reporteId)
    .select("id, reporterid, targetid, targettype, estado")
    .single();

  if (error || !data) {
    return jsonResponse({ ok: false, error: "update_failed" }, 500, cors);
  }

  return jsonResponse({ ok: true, reporte: data }, 200, cors);
});
