// supabase/functions/validate-registration/index.ts
// Validates minimum registration data and activates account when eligible.

import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("URL") ?? Deno.env.get("SUPABASE_URL");
const publishableKey =
  Deno.env.get("PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
const secretKey =
  Deno.env.get("SECRET_KEY") ?? Deno.env.get("SUPABASE_SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY",
  );
}

const supabasePublic = createClient(supabaseUrl, publishableKey);
const supabaseAdmin = createClient(supabaseUrl, secretKey);

type UsuarioRow = {
  id: string;
  id_auth: string;
  role: string | null;
  nombre: string | null;
  apellido: string | null;
  fecha_nacimiento: string | null;
  genero: string | null;
  account_status: string | null;
};

type NegocioRow = {
  id: string;
  nombre: string | null;
  categoria: string | null;
};

type SucursalRow = {
  id: string;
  status: string | null;
  direccion_id: string | null;
  horarios: unknown;
  tipo: string | null;
  fechacreacion: string | null;
};

serve(async (req) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, message: "Method not allowed" }, 405, corsHeaders);
  }

  const auth = await getAuthUser(req, corsHeaders);
  if (auth instanceof Response) return auth;

  const { data: usuario, error: usuarioErr } = await supabaseAdmin
    .from("usuarios")
    .select("id, id_auth, role, nombre, apellido, fecha_nacimiento, genero, account_status")
    .eq("id_auth", auth.id)
    .maybeSingle<UsuarioRow>();

  if (usuarioErr || !usuario) {
    return json(
      { ok: false, message: "Usuario no encontrado" },
      404,
      corsHeaders,
    );
  }

  const role = (usuario.role || "").toLowerCase();
  if (role === "cliente") {
    const { error: statusErr } = await supabaseAdmin
      .from("usuarios")
      .update({ account_status: "active" })
      .eq("id", usuario.id);
    if (statusErr) {
      return json(
        { ok: false, message: "No se pudo activar la cuenta" },
        500,
        corsHeaders,
      );
    }
    return json({ ok: true, valid: true }, 200, corsHeaders);
  }

  if (!hasValue(usuario.role)) {
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  if (role !== "negocio") {
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  if (
    !hasValue(usuario.nombre) ||
    !hasValue(usuario.apellido) ||
    !hasValue(usuario.fecha_nacimiento) ||
    !hasValue(usuario.genero)
  ) {
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  const { data: negocio, error: negocioErr } = await supabaseAdmin
    .from("negocios")
    .select("id, nombre, categoria")
    .eq("usuarioid", usuario.id)
    .maybeSingle<NegocioRow>();

  if (negocioErr || !negocio) {
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  if (!hasValue(negocio.nombre) || !hasValue(negocio.categoria)) {
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  const { data: sucursales, error: sucErr } = await supabaseAdmin
    .from("sucursales")
    .select("id, status, direccion_id, horarios, tipo, fechacreacion")
    .eq("negocioid", negocio.id);

  if (sucErr) {
    return json(
      { ok: false, message: "No se pudo leer sucursales" },
      500,
      corsHeaders,
    );
  }

  const sucursalRows: SucursalRow[] = sucursales || [];
  if (sucursalRows.length === 0) {
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  const direccionIds = Array.from(
    new Set(
      sucursalRows
        .map((s) => s.direccion_id)
        .filter((id): id is string => Boolean(id)),
    ),
  );

  const direccionMap = new Map<
    string,
    {
      id: string;
      calle_1: string | null;
      calle_2: string | null;
      referencia: string | null;
      ciudad: string | null;
      sector: string | null;
      lat: number | null;
      lng: number | null;
    }
  >();
  if (direccionIds.length > 0) {
    const { data: direcciones, error: dirErr } = await supabaseAdmin
      .from("direcciones")
      .select("id, calle_1, calle_2, referencia, ciudad, sector, lat, lng")
      .in("id", direccionIds);
    if (dirErr) {
      return json(
        { ok: false, message: "No se pudo leer direcciones" },
        500,
        corsHeaders,
      );
    }
    (direcciones || []).forEach((dir) => {
      direccionMap.set(dir.id, {
        id: dir.id,
        calle_1: dir.calle_1 ?? null,
        calle_2: dir.calle_2 ?? null,
        referencia: dir.referencia ?? null,
        ciudad: dir.ciudad ?? null,
        sector: dir.sector ?? null,
        lat: dir.lat ?? null,
        lng: dir.lng ?? null,
      });
    });
  }

  const normalizeStatus = (value: string | null) =>
    (value || "draft").toLowerCase();

  const hasDireccion = (direccionId: string | null) => {
    if (!direccionId) return false;
    const dir = direccionMap.get(direccionId);
    if (!dir) return false;
    return (
      hasValue(dir.calle_1) &&
      hasValue(dir.ciudad) &&
      hasValue(dir.sector) &&
      dir.lat != null &&
      dir.lng != null
    );
  };

  const hasHorarios = (value: unknown) => {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value as object).length > 0;
    return true;
  };

  const isSucursalValida = (sucursal: SucursalRow) =>
    hasDireccion(sucursal.direccion_id) &&
    hasHorarios(sucursal.horarios) &&
    hasValue(sucursal.tipo);

  const sortByFecha = (rows: SucursalRow[]) =>
    rows.sort((a, b) => {
      const aTime = a.fechacreacion ? Date.parse(a.fechacreacion) : 0;
      const bTime = b.fechacreacion ? Date.parse(b.fechacreacion) : 0;
      return bTime - aTime;
    });

  const activeRows = sucursalRows.filter(
    (s) => normalizeStatus(s.status) === "active",
  );
  const draftRows = sucursalRows.filter(
    (s) => normalizeStatus(s.status) === "draft",
  );

  let chosen: SucursalRow | null = null;

  const validActive = sortByFecha(activeRows.filter(isSucursalValida))[0];
  if (validActive) {
    chosen = validActive;
  } else {
    const validDraft = sortByFecha(draftRows.filter(isSucursalValida))[0];
    if (validDraft) {
      const { error: promoteErr } = await supabaseAdmin
        .from("sucursales")
        .update({ status: "active" })
        .eq("id", validDraft.id);
      if (promoteErr) {
        return json(
          { ok: false, message: "No se pudo activar sucursal" },
          500,
          corsHeaders,
        );
      }
      chosen = { ...validDraft, status: "active" };
    }
  }

  if (!chosen) {
    const { error: cleanupErr } = await supabaseAdmin
      .from("sucursales")
      .delete()
      .eq("negocioid", negocio.id);
    if (cleanupErr) {
      return json(
        { ok: false, message: "No se pudo limpiar sucursales" },
        500,
        corsHeaders,
      );
    }
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  const { error: pruneErr } = await supabaseAdmin
    .from("sucursales")
    .delete()
    .eq("negocioid", negocio.id)
    .neq("id", chosen.id);
  if (pruneErr) {
    return json(
      { ok: false, message: "No se pudo limpiar sucursales" },
      500,
      corsHeaders,
    );
  }

  const { error: statusErr } = await supabaseAdmin
    .from("usuarios")
    .update({ account_status: "active" })
    .eq("id", usuario.id);
  if (statusErr) {
    return json(
      { ok: false, message: "No se pudo activar la cuenta" },
      500,
      corsHeaders,
    );
  }

  const { data: verifRow } = await supabaseAdmin
    .from("verificacion_negocio")
    .select("ruc")
    .eq("negocio_id", negocio.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const rucValue = String(verifRow?.ruc || "").trim();
  if (rucValue) {
    const { error: negUpdateErr } = await supabaseAdmin
      .from("negocios")
      .update({
        verificacion_estado: "pending",
        puede_publicar: false,
        puede_aparecer_publico: false,
      })
      .eq("id", negocio.id);
    if (negUpdateErr) {
      return json(
        { ok: false, message: "No se pudo actualizar verificacion" },
        500,
        corsHeaders,
      );
    }
  }

  return json({ ok: true, valid: true }, 200, corsHeaders);
});

async function getAuthUser(
  req: Request,
  corsHeaders: Record<string, string>,
) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) {
    return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);
  }

  const {
    data: { user },
    error,
  } = await supabasePublic.auth.getUser(token);

  if (error || !user) {
    return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);
  }

  return user;
}

function hasValue(value: string | null) {
  return Boolean((value || "").trim());
}

function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
