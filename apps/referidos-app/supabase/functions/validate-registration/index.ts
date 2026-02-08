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

  if (!hasValue(usuario.role) || role !== "negocio") {
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  let canActivate = true;

  if (
    !hasValue(usuario.nombre) ||
    !hasValue(usuario.apellido) ||
    !hasValue(usuario.fecha_nacimiento) ||
    !hasValue(usuario.genero)
  ) {
    canActivate = false;
  }

  const { data: negocio, error: negocioErr } = await supabaseAdmin
    .from("negocios")
    .select("id, nombre, categoria")
    .eq("usuarioid", usuario.id)
    .maybeSingle<NegocioRow>();

  if (negocioErr || !negocio) {
    canActivate = false;
  }

  if (negocio && (!hasValue(negocio.nombre) || !hasValue(negocio.categoria))) {
    canActivate = false;
  }

  const normalizeStatus = (value: string | null) =>
    (value || "draft").toLowerCase();

  const sortByDate = <T extends { created_at?: string | null; updated_at?: string | null }>(
    rows: T[],
  ) =>
    rows.sort((a, b) => {
      const aTime = a.updated_at || a.created_at;
      const bTime = b.updated_at || b.created_at;
      const aValue = aTime ? Date.parse(aTime) : 0;
      const bValue = bTime ? Date.parse(bTime) : 0;
      return bValue - aValue;
    });

  const { data: direcciones, error: dirErr } = await supabaseAdmin
    .from("direcciones")
    .select(
      "id, owner_id, status, is_user_provided, created_at, updated_at, calles, referencia, ciudad, sector, provincia_id, canton_id, parroquia_id, parroquia, lat, lng",
    )
    .eq("owner_id", usuario.id)
    .eq("is_user_provided", true);

  if (dirErr) {
    return json(
      { ok: false, message: "No se pudo leer direcciones" },
      500,
      corsHeaders,
    );
  }

  const userDirs = Array.isArray(direcciones) ? direcciones : [];
  const drafts = userDirs.filter(
    (dir) => normalizeStatus(dir.status ?? null) === "draft",
  );
  const actives = userDirs.filter(
    (dir) => normalizeStatus(dir.status ?? null) === "active",
  );

  let keptDireccion = null as typeof userDirs[number] | null;
  if (drafts.length > 0) {
    keptDireccion = sortByDate(drafts)[0] || null;
  } else if (actives.length > 0) {
    keptDireccion = sortByDate(actives)[0] || null;
  }

  const keptDireccionId = keptDireccion?.id ?? null;
  const direccionDeleteIds = userDirs
    .filter((dir) => dir.id && dir.id !== keptDireccionId)
    .map((dir) => dir.id);

  if (direccionDeleteIds.length > 0) {
    const { error: delDirErr } = await supabaseAdmin
      .from("direcciones")
      .delete()
      .in("id", direccionDeleteIds);
    if (delDirErr) {
      return json(
        { ok: false, message: "No se pudo limpiar direcciones" },
        500,
        corsHeaders,
      );
    }
  }

  if (!keptDireccion) {
    canActivate = false;
  }

  let sucursalRows: SucursalRow[] = [];
  let chosenSucursal: SucursalRow | null = null;

  if (negocio?.id) {
    const { data: sucursales, error: sucErr } = await supabaseAdmin
      .from("sucursales")
      .select(
        "id, status, direccion_id, horarios, tipo, fechacreacion",
      )
      .eq("negocioid", negocio.id);

    if (sucErr) {
      return json(
        { ok: false, message: "No se pudo leer sucursales" },
        500,
        corsHeaders,
      );
    }

    sucursalRows = Array.isArray(sucursales) ? sucursales : [];
    if (sucursalRows.length === 0) {
      canActivate = false;
    } else {
      const activeRows = sucursalRows.filter(
        (row) => normalizeStatus(row.status ?? null) === "active",
      );
      const draftRows = sucursalRows.filter(
        (row) => normalizeStatus(row.status ?? null) === "draft",
      );

      const sortByFecha = (rows: SucursalRow[]) =>
        rows.sort((a, b) => {
          const aTime = a.fechacreacion ? Date.parse(a.fechacreacion) : 0;
          const bTime = b.fechacreacion ? Date.parse(b.fechacreacion) : 0;
          return bTime - aTime;
        });

      if (activeRows.length > 0) {
        chosenSucursal = sortByFecha(activeRows)[0] || null;
      } else if (draftRows.length > 0) {
        chosenSucursal = sortByFecha(draftRows)[0] || null;
      } else {
        chosenSucursal = sortByFecha(sucursalRows)[0] || null;
      }

      const sucursalDeleteIds = sucursalRows
        .filter((row) => row.id && row.id !== chosenSucursal?.id)
        .map((row) => row.id);

      if (sucursalDeleteIds.length > 0) {
        const { error: pruneErr } = await supabaseAdmin
          .from("sucursales")
          .delete()
          .in("id", sucursalDeleteIds);
        if (pruneErr) {
          return json(
            { ok: false, message: "No se pudo limpiar sucursales" },
            500,
            corsHeaders,
          );
        }
      }
    }
  } else {
    canActivate = false;
  }

  if (keptDireccion && chosenSucursal) {
    if (chosenSucursal.direccion_id !== keptDireccion.id) {
      const { error: linkErr } = await supabaseAdmin
        .from("sucursales")
        .update({ direccion_id: keptDireccion.id })
        .eq("id", chosenSucursal.id);
      if (linkErr) {
        return json(
          { ok: false, message: "No se pudo asociar direccion" },
          500,
          corsHeaders,
        );
      }
      chosenSucursal = { ...chosenSucursal, direccion_id: keptDireccion.id };
    }
  }

  const hasDireccion = (dir: typeof keptDireccion | null) => {
    if (!dir) return false;
    const hasUbicacion =
      hasValue(dir.ciudad) ||
      hasValue(dir.parroquia_id) ||
      hasValue(dir.parroquia);
    return (
      hasValue(dir.calles) &&
      hasUbicacion &&
      hasValue(dir.sector) &&
      hasValue(dir.provincia_id) &&
      hasValue(dir.canton_id) &&
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

  if (!chosenSucursal) {
    canActivate = false;
  } else {
    if (!hasValue(chosenSucursal.direccion_id)) {
      canActivate = false;
    }
    if (!hasDireccion(keptDireccion)) {
      canActivate = false;
    }
    if (!hasHorarios(chosenSucursal.horarios)) {
      canActivate = false;
    }
    if (!hasValue(chosenSucursal.tipo)) {
      canActivate = false;
    }
  }

  if (!canActivate) {
    if (keptDireccion && normalizeStatus(keptDireccion.status ?? null) !== "draft") {
      await supabaseAdmin
        .from("direcciones")
        .update({ status: "draft" })
        .eq("id", keptDireccion.id)
        .eq("is_user_provided", true);
    }
    if (chosenSucursal && normalizeStatus(chosenSucursal.status ?? null) !== "draft") {
      await supabaseAdmin
        .from("sucursales")
        .update({ status: "draft" })
        .eq("id", chosenSucursal.id);
    }
    return json({ ok: true, valid: false, message: "no cumple" }, 200, corsHeaders);
  }

  if (chosenSucursal && normalizeStatus(chosenSucursal.status ?? null) !== "active") {
    const { error: promoteErr } = await supabaseAdmin
      .from("sucursales")
      .update({ status: "active" })
      .eq("id", chosenSucursal.id);
    if (promoteErr) {
      return json(
        { ok: false, message: "No se pudo activar sucursal" },
        500,
        corsHeaders,
      );
    }
  }

  if (keptDireccion && normalizeStatus(keptDireccion.status ?? null) !== "active") {
    const { error: dirStatusErr } = await supabaseAdmin
      .from("direcciones")
      .update({ status: "active" })
      .eq("id", keptDireccion.id)
      .eq("is_user_provided", true);
    if (dirStatusErr) {
      return json(
        { ok: false, message: "No se pudo activar direccion" },
        500,
        corsHeaders,
      );
    }
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
