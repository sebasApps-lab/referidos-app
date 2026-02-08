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
  const negocioId = body.negocio_id;

  if (!negocioId) {
    return jsonResponse({ ok: false, error: "missing_negocio_id" }, 400, cors);
  }

  const updates: Record<string, unknown> = {};
  if (typeof body.verificacion_estado === "string") {
    updates.verificacion_estado = body.verificacion_estado;
  }
  if (typeof body.puede_publicar === "boolean") {
    updates.puede_publicar = body.puede_publicar;
  }
  if (typeof body.puede_aparecer_publico === "boolean") {
    updates.puede_aparecer_publico = body.puede_aparecer_publico;
  }
  if (typeof body.verificado === "boolean") {
    updates.verificado = body.verificado;
  }
  if (typeof body.logo === "string") {
    updates.logo = body.logo;
  }
  if (typeof body.categoria === "string") {
    updates.categoria = body.categoria;
  }
  if (typeof body.subcategoria === "string") {
    updates.subcategoria = body.subcategoria;
  }
  if (typeof body.nombre === "string") {
    updates.nombre = body.nombre;
  }

  if (Object.keys(updates).length === 0) {
    return jsonResponse({ ok: false, error: "no_updates" }, 400, cors);
  }

  const { data, error } = await supabaseAdmin
    .from("negocios")
    .update(updates)
    .eq("id", negocioId)
    .select(
      "id, nombre, verificacion_estado, puede_publicar, puede_aparecer_publico, verificado, categoria, subcategoria, logo"
    )
    .single();

  if (error || !data) {
    return jsonResponse({ ok: false, error: "update_failed" }, 500, cors);
  }

  return jsonResponse({ ok: true, negocio: data }, 200, cors);
});
