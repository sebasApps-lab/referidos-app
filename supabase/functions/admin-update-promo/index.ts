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
  const promoId = body.promo_id;
  const promoPublicId = body.public_id;

  if (!promoId && !promoPublicId) {
    return jsonResponse({ ok: false, error: "missing_promo_id" }, 400, cors);
  }

  const updates: Record<string, unknown> = {};
  if (typeof body.estado === "string") {
    updates.estado = body.estado;
  }
  if (typeof body.titulo === "string") {
    updates.titulo = body.titulo;
  }
  if (typeof body.descripcion === "string") {
    updates.descripcion = body.descripcion;
  }
  if (typeof body.inicio === "string") {
    updates.inicio = body.inicio;
  }
  if (typeof body.fin === "string") {
    updates.fin = body.fin;
  }
  if (typeof body.imagen === "string") {
    updates.imagen = body.imagen;
  }

  if (Object.keys(updates).length === 0) {
    return jsonResponse({ ok: false, error: "no_updates" }, 400, cors);
  }

  let query = supabaseAdmin.from("promos").update(updates);
  if (promoId) {
    query = query.eq("id", promoId);
  } else {
    query = query.eq("public_id", promoPublicId);
  }

  const { data, error } = await query
    .select("id, public_id, titulo, estado, inicio, fin, negocioid")
    .single();

  if (error || !data) {
    return jsonResponse({ ok: false, error: "update_failed" }, 500, cors);
  }

  return jsonResponse({ ok: true, promo: data }, 200, cors);
});
