import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Permite variables con y sin prefijo SUPABASE_
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("URL");
const publishableKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("PUBLISHABLE_KEY");
const secretKey = Deno.env.get("SUPABASE_SECRET_KEY") ?? Deno.env.get("SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error("Missing Supabase env vars: SUPABASE_URL/URL, PUBLISHABLE_KEY, SECRET_KEY");
}

const supabasePublic = createClient(supabaseUrl, publishableKey);
const supabaseAdmin = createClient(supabaseUrl, secretKey);

type Payload = {
  role?: "cliente" | "negocio";
  nombre?: string;
  apellido?: string;
  telefono?: string;
  ruc?: string;
  nombreNegocio?: string;
  sectorNegocio?: string;
  calle1?: string;
  calle2?: string;
};

serve(async (req) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, message: "Invalid JSON body" }, 400, corsHeaders);
  }

  if (!payload.role || (payload.role !== "cliente" && payload.role !== "negocio")) {
    return json({ ok: false, message: "role requerido (cliente|negocio)" }, 400, corsHeaders);
  }

  // 1) Validar identidad
  const {
    data: { user },
    error: userErr,
  } = await supabasePublic.auth.getUser(token);
  if (userErr || !user) return json({ ok: false, message: "Unauthorized" }, 401, corsHeaders);

  const userId = user.id;
  const email = user.email ?? "";

  // 2) Upsert del usuario sin depender de trigger
  const baseUser = {
    id_auth: userId,
    email,
    telefono: payload.telefono ?? user.user_metadata?.telefono ?? user.phone ?? null,
    nombre: payload.nombre ?? user.user_metadata?.nombre ?? email.split("@")[0] ?? null,
    apellido: payload.apellido ?? null,
    role: payload.role,
    ruc: payload.ruc ?? null,
    registro_estado: "completo",
  };

  const { data: upsertUsuario, error: upsertErr } = await supabaseAdmin
    .from("usuarios")
    .upsert(baseUser, { onConflict: "id_auth" })
    .select()
    .maybeSingle();

  if (upsertErr) return json({ ok: false, message: upsertErr.message ?? "No se pudo guardar usuario" }, 500, corsHeaders);
  if (!upsertUsuario) return json({ ok: false, message: "No se pudo guardar usuario" }, 500, corsHeaders);

  let negocioResult = null;

  if (payload.role === "negocio") {
    // Obtener usuarioId para relacionar
    const usuarioId = upsertUsuario.id;
    // Crear o actualizar negocio vinculado
    const direccion = payload.calle1
      ? payload.calle2
        ? `${payload.calle1} ${payload.calle2}`.trim()
        : payload.calle1.trim()
      : null;

    const { data: existingNegocio } = await supabaseAdmin
      .from("negocios")
      .select("*")
      .eq("usuarioId", usuarioId)
      .maybeSingle();

    const negocioPayload = {
      usuarioId,
      nombre: payload.nombreNegocio ?? existingNegocio?.nombre ?? "Negocio",
      sector: payload.sectorNegocio ?? existingNegocio?.sector ?? null,
      direccion: direccion ?? existingNegocio?.direccion ?? null,
    };

    let negocioData = existingNegocio;
    if (existingNegocio) {
      const { data, error } = await supabaseAdmin
        .from("negocios")
        .update(negocioPayload)
        .eq("id", existingNegocio.id)
        .select()
        .maybeSingle();
      if (error) return json({ ok: false, message: error.message ?? "No se pudo actualizar negocio" }, 500, corsHeaders);
      negocioData = data;
    } else {
      const { data, error } = await supabaseAdmin.from("negocios").insert(negocioPayload).select().maybeSingle();
      if (error) return json({ ok: false, message: error.message ?? "No se pudo crear negocio" }, 500, corsHeaders);
      negocioData = data;
    }

    negocioResult = negocioData;
  }

  return json(
    {
      ok: true,
      usuario: upsertUsuario,
      negocio: negocioResult,
      message: "Onboarding completado",
    },
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
