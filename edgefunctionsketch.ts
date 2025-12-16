// supabase/functions/onboarding/index.ts
//
// Health‑check de onboarding que se ejecuta al entrar a inicio/dashboard.
// Valida el usuario autenticado (token Bearer), sincroniza email del perfil con Auth
// (bloquea cambios de email hechos desde UI), revisa campos obligatorios por rol
// y marca registro_estado = "incompleto" si falta algo. Si todo está completo,
// deja registro_estado = "completo". Responde con flags para que el frontend
// decida si deja pasar o fuerza el flujo de registro.
//
// Notas:
// - No podemos validar “si tiene contraseña” desde Edge (Supabase no expone eso);
//   usamos el provider de Auth como mejor señal disponible.
// - No crea perfiles nuevos si no existen; solo informa que faltan (allowAccess = false).

import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("URL");
const anonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("PUBLISHABLE_KEY");
const serviceKey = Deno.env.get("SUPABASE_SECRET_KEY") ?? Deno.env.get("SECRET_KEY");

if (!supabaseUrl || !anonKey || !serviceKey) {
  throw new Error("Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY");
}

// Cliente público: valida el token del usuario.
const supabasePublic = createClient(supabaseUrl, anonKey);
// Cliente service-role: lee/actualiza perfiles ignorando RLS (solo para este chequeo controlado).
const supabaseAdmin = createClient(supabaseUrl, serviceKey);

type RegistroEstado = "completo" | "incompleto";
type OnboardingResult = {
  ok: boolean;
  allowAccess: boolean;
  registro_estado: RegistroEstado;
  reasons: string[]; // motivos por los cuales se marca incompleto
  usuario?: Record<string, unknown> | null;
  negocio?: Record<string, unknown> | null;
  provider?: string | null;
};

const OWNER_FIELDS: (keyof any)[] = ["nombre", "apellido", "telefono"];
const BUSINESS_REQUIRED_IN_USUARIOS: (keyof any)[] = ["ruc"];
const BUSINESS_REQUIRED_IN_NEGOCIO: (keyof any)[] = ["nombre", "sector", "direccion"];

serve(async (req) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, message: "Method not allowed" }, 405, corsHeaders);

  // 1) Validar token y obtener usuario Auth
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return json({ ok: false, allowAccess: false, reasons: ["missing_token"] }, 401, corsHeaders);

  const {
    data: { user },
    error: userErr,
  } = await supabasePublic.auth.getUser(token);
  if (userErr || !user) {
    return json({ ok: false, allowAccess: false, reasons: ["unauthorized"] }, 401, corsHeaders);
  }

  const authEmail = user.email ?? "";
  const authProvider = user.app_metadata?.provider ?? "email";

  // 2) Obtener perfil en public.usuarios
  const { data: profile, error: profileErr } = await supabaseAdmin
    .from("usuarios")
    .select("*")
    .eq("id_auth", user.id)
    .maybeSingle();

  if (profileErr) {
    return json(
      {
        ok: false,
        allowAccess: false,
        reasons: ["profile_query_error"],
        message: profileErr.message ?? "No se pudo leer perfil",
      },
      500,
      corsHeaders
    );
  }

  // Si no hay perfil, no creamos uno aquí (solo reportamos).
  if (!profile) {
    return json(
      {
        ok: true,
        allowAccess: false,
        registro_estado: "incompleto",
        reasons: ["missing_profile"],
        usuario: null,
        negocio: null,
        provider: authProvider,
      } satisfies OnboardingResult,
      200,
      corsHeaders
    );
  }

  // 3) Validaciones por rol y sincronización de email con Auth
  let registroEstado: RegistroEstado = "completo";
  const reasons: string[] = [];
  const patch: Record<string, unknown> = {}; // lo que forzaremos en usuarios (email/estado)

  const markIncomplete = (reason: string) => {
    reasons.push(reason);
    registroEstado = "incompleto";
  };

  // Forzar email del perfil = email de Auth (bloquea cambios desde UI).
  if (authEmail && profile.email !== authEmail) {
    patch.email = authEmail;
    markIncomplete("email_mismatch_profile_vs_auth");
  }

  const role = profile.role;
  if (!role) {
    markIncomplete("missing_role");
    // No forzamos role aquí para no pisar datos; frontend debe reenrutar al flujo de selección.
  }

  let negocioRow: Record<string, unknown> | null = null;

  if (role === "cliente") {
    if (!authEmail) markIncomplete("missing_auth_email");
    // No podemos saber si tiene contraseña; confiamos en que si inició sesión, tiene un método válido.
  } else if (role === "negocio") {
    // a) Datos del propietario en usuarios
    const missingOwner = OWNER_FIELDS.filter((f) => !profile[f]);
    if (missingOwner.length) markIncomplete(`missing_owner_fields:${missingOwner.join(",")}`);

    const missingBusinessInUser = BUSINESS_REQUIRED_IN_USUARIOS.filter((f) => !profile[f]);
    if (missingBusinessInUser.length) markIncomplete(`missing_business_fields_user:${missingBusinessInUser.join(",")}`);

    // b) Datos del negocio en tabla negocios
    const { data: negData, error: negErr } = await supabaseAdmin
      .from("negocios")
      .select("*")
      .eq("usuarioId", profile.id)
      .maybeSingle();

    if (negErr) {
      markIncomplete("business_query_error");
    } else if (!negData) {
      markIncomplete("missing_business_row");
    } else {
      negocioRow = negData;
      const missingBusiness = BUSINESS_REQUIRED_IN_NEGOCIO.filter((f) => !negData[f]);
      if (missingBusiness.length) markIncomplete(`missing_business_fields:${missingBusiness.join(",")}`);
    }
  }

  // 4) Actualizar registro_estado (y email si cambió) si es necesario
  if (registroEstado !== profile.registro_estado) {
    patch.registro_estado = registroEstado;
  }

  let updatedProfile = profile;
  if (Object.keys(patch).length > 0) {
    const { data: upd, error: updErr } = await supabaseAdmin
      .from("usuarios")
      .update(patch)
      .eq("id_auth", user.id)
      .select()
      .maybeSingle();

    if (updErr) {
      return json(
        {
          ok: false,
          allowAccess: false,
          registro_estado: profile.registro_estado ?? "incompleto",
          reasons: [...reasons, "profile_update_error"],
          message: updErr.message ?? "No se pudo actualizar perfil",
          provider: authProvider,
        },
        500,
        corsHeaders
      );
    }
    updatedProfile = upd ?? profile;
  }

  // 5) Responder al frontend
  return json(
    {
      ok: true,
      allowAccess: registroEstado === "completo" && reasons.length === 0,
      registro_estado: registroEstado,
      reasons,
      usuario: updatedProfile,
      negocio: negocioRow,
      provider: authProvider,
    } satisfies OnboardingResult,
    200,
    corsHeaders
  );
});

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}
