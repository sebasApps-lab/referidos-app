import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabaseUrl =
  Deno.env.get("SUPABASE_URL") ??
  Deno.env.get("URL");
export const publishableKey =
  Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ??
  Deno.env.get("SUPABASE_ANON_KEY") ??
  Deno.env.get("PUBLISHABLE_KEY");
export const secretKey =
  Deno.env.get("SUPABASE_SECRET_KEY") ??
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("SECRET_KEY");

if (!supabaseUrl || !publishableKey || !secretKey) {
  throw new Error(
    "Missing Supabase env vars: SUPABASE_URL/URL, SUPABASE_PUBLISHABLE_KEY/SUPABASE_ANON_KEY/PUBLISHABLE_KEY, SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY/SECRET_KEY"
  );
}

export const supabasePublic = createClient(supabaseUrl, publishableKey);
export const supabaseAdmin = createClient(supabaseUrl, secretKey);

export function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

export function jsonResponse(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {}
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export async function requireAuthUser(token: string) {
  const {
    data: { user },
    error,
  } = await supabasePublic.auth.getUser(token);
  if (error || !user) {
    return { user: null, error: "unauthorized" };
  }
  return { user, error: null };
}

export async function getUsuarioByAuthId(authId: string) {
  const { data, error } = await supabaseAdmin
    .from("usuarios")
    .select("*")
    .eq("id_auth", authId)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    return { usuario: null, error: error.message };
  }
  return { usuario: data, error: null };
}

export function safeTrim(value: string | null | undefined, limit = 500) {
  if (!value) return "";
  const trimmed = value.trim();
  if (trimmed.length <= limit) return trimmed;
  return trimmed.slice(0, limit);
}

export function buildSupportMessage({
  userPublicId,
  threadPublicId,
  categoryLabel,
  summary,
  context,
}: {
  userPublicId: string;
  threadPublicId: string;
  categoryLabel: string;
  summary: string;
  context: Record<string, unknown>;
}) {
  const contextParts: string[] = [];
  Object.entries(context || {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;
    const normalized =
      typeof value === "string" ? value : JSON.stringify(value);
    contextParts.push(`${key}: ${normalized}`);
  });
  const contextText = contextParts.length
    ? `Contexto: ${contextParts.join(" | ")}`
    : "Contexto: no disponible";
  return [
    "[Referidos Support]",
    `Usuario: ${userPublicId}`,
    `Ticket: ${threadPublicId}`,
    `Categoria: ${categoryLabel}`,
    `Descripcion: ${summary}`,
    contextText,
  ].join("\n");
}

export const CATEGORY_LABELS: Record<string, string> = {
  acceso: "Acceso / Cuenta",
  verificacion: "Verificacion",
  qr: "QR / Escaner",
  promos: "Promociones",
  negocios_sucursales: "Negocios / Sucursales",
  pagos_plan: "Pagos / Plan",
  reporte_abuso: "Reporte de abuso",
  bug_performance: "Bug / rendimiento",
  sugerencia: "Sugerencia",
  borrar_correo_waitlist: "Borrar correo de lista de espera",
  tier_beneficios: "Tier / beneficios",
};
