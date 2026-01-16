// supabase/functions/onboarding/index.ts
//
// Health-check de onboarding que se ejecuta al entrar a la app (bootstrap inicial).
// Valida el usuario autenticado (token Bearer), sincroniza datos técnicos críticos
// del perfil con Auth (ej. email), y verifica la consistencia y completitud del perfil
// según el rol del usuario.
//
// Esta función NO implementa un flujo de registro.
// Su responsabilidad es únicamente:
// - Determinar si el usuario puede acceder a la app (`allowAccess`)
// - Reportar razones técnicas o de negocio por las que no puede acceder (`reasons[]`)
//
// El acceso final depende de:
// - `account_status` (solo `active` permite acceso)
// - Que no existan inconsistencias o datos obligatorios faltantes
//
// Notas importantes:
// - No se crean perfiles nuevos si no existen.
// - No se modifican estados de cuenta (`account_status`).
// - No se toman decisiones temporales (ej. expiración por tiempo).
// - No se persiste estado derivado de onboarding.
// - El frontend solo OBSERVA la respuesta; no es fuente de verdad.
//
// Limitaciones conocidas:
// - Supabase Edge no expone si el usuario tiene contraseña.
//   El provider de Auth se usa como mejor señal disponible.


import { serve } from "https://deno.land/std@0.193.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("URL");
const publishableKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("PUBLISHABLE_KEY");
const secretKey = Deno.env.get("SUPABASE_SECRET_KEY") ?? Deno.env.get("SECRET_KEY");

if(!supabaseUrl || !publishableKey || !secretKey) {
    throw new Error("Missing Supabase env vars: SUPABASE_URL, PUBLISHABLE_KEY, SECRET_KEY");
}

//Cliente público: valida el token del usuario.
const supabasePublic = createClient(supabaseUrl, publishableKey);
//Cliente service-role: lectura/escritura controlada.
const supabaseAdmin = createClient(supabaseUrl, secretKey);

type AccountStatus =
    | "active"
    | "pending"
    | "expired"
    | "blocked"
    | "suspended"
    | "deleted";

type OnboardingResult = {
    ok: boolean;
    allowAccess: boolean;
    reasons: string[]; //motivos por los cuales no se da acceso
    usuario: Record<string, unknown> | null;
    negocio: Record<string, unknown> | null;
    email_confirmed?: boolean;
    phone?: string | null;
    provider: string | null;
};

type UsuarioProfile = {
    id: string;
    id_auth: string;
    email: string;
    role: string | null;
    nombre: string | null;
    apellido: string | null;
    telefono: string | null;
    emailConfirmado: boolean | null;
    fecha_nacimiento: string | null;
    genero: string | null;
    account_status: AccountStatus | null;
};

type NegocioProfile = {
    id: string;
    usuarioid: string;
    nombre: string | null;
    categoria: string | null;
};

type SucursalProfile = {
    id: string;
    negocioid: string;
    direccion_id: string | null;
    horarios: unknown;
    tipo: string | null;
    fechacreacion: string | null;
};

type DireccionProfile = {
    id: string;
    calles: string | null;
    sector: string | null;
    referencia: string | null;
    ciudad: string | null;
    provincia_id: string | null;
    canton_id: string | null;
    parroquia_id: string | null;
    parroquia: string | null;
    lat: number | null;
    lng: number | null;
};

const OWNER_FIELDS: (keyof UsuarioProfile) [] = ["nombre", "apellido", "fecha_nacimiento", "genero"];
const BUSINESS_REQUIRED_IN_NEGOCIO: (keyof NegocioProfile)[] = ["nombre", "categoria"];

serve (async (req) => {
    const origin = req.headers.get("origin") || "*";
    const corsHeaders = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
    };

    if (req.method === "OPTIONS") return new Response("ok", {headers: corsHeaders });
    if (req.method !== "POST") {
        return json(
            {
                ok: false,
                allowAccess: false,
                reasons: ["method_not_allowed"],
                usuario: null,
                negocio: null,
                provider: null,
            },
            405,
            corsHeaders
        );
    }

    //1) Validar token y obtener usuario Auth
    const authHeader =req.headers.get("authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
        return json(
            {
                ok: false,
                allowAccess: false,
                reasons: ["missing_token"],
                usuario: null,
                negocio: null,
                provider: null,
            },
            401,
            corsHeaders
        );
    }

    const {
        data: { user },
        error: userErr,
    } = await supabasePublic.auth.getUser(token);

    if (userErr || !user) {
        return json(
            {
                ok: false,
                allowAccess: false,
                reasons: ["unauthorized"],
                usuario: null,
                negocio: null,
                provider: null,
            },
            401,
            corsHeaders
        );
    }

    const authEmail = user.email ?? "";
    const provider = user.app_metadata?.provider ?? "email";
    const baseName = authEmail ? authEmail.split("@")[0] : null;

    //2) Obtener perfil de public.usuarios
    const { data: profile, error: profileErr } = await supabaseAdmin
        .from("usuarios")
        .select("*")
        .eq("id_auth", user.id)
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle<UsuarioProfile>();
    
    if (profileErr) {
        return json(
            {
                ok: false,
                allowAccess: false,
                reasons: ["profile_query_error"],
                usuario: null,
                negocio: null,
                provider,
            },
            500,
            corsHeaders
        );
    }

    //Si no hay perfil, no creamos aquí (solo reportamos).
    if (!profile) {
        return json(
            {
                ok: true,
                allowAccess: false,
                reasons: ["missing_profile"],
                usuario: null,
                negocio: null,
                provider,             
            },
            200,
            corsHeaders
        );
    }

    const reasons: string[] = [];
    const patch: Record<string, unknown> = {};

    //3) Estado de cuenta(HARD GATE)
    const accountStatus = profile.account_status as AccountStatus | null;

    if (!accountStatus) {
        reasons.push("missing_account_status");
    } else if (accountStatus !== "active") {
        reasons.push(`account_status:${accountStatus}`);
    }
    
    //4) Sincronizar email Auth → perfil (no bloquea acceso)
    if (authEmail && profile.email !== authEmail) {
        patch.email = authEmail;
    }

    const role = profile.role;
    if (!role) {
        reasons.push("missing_role");
    }

    let negocioRow: Record<string, unknown> | null = null;

    //5) Validaciones por rol
    if (role === "cliente") {
        if(!profile.nombre && baseName) {
            patch.nombre = baseName;
        }
    }

    if (role === "negocio") {
        const missingOwner = OWNER_FIELDS.filter((f) => !profile[f]);
        if (missingOwner.length) {
            reasons.push(`missing_owner_fields:${missingOwner.join(",")}`);
        }

        const { data: negData, error: negErr } = await supabaseAdmin
            .from("negocios")
            .select("*")
            .eq("usuarioid", profile.id)
            .order("id", { ascending: false })
            .limit(1)
            .maybeSingle<NegocioProfile>();

        if (negErr) {
            reasons.push("business_query_error");
        } else if (!negData) {
            reasons.push("missing_business_row");
        } else {
            negocioRow = negData;
            const missingBusiness = BUSINESS_REQUIRED_IN_NEGOCIO.filter(
                (f) => !negData[f]
            );
            if (missingBusiness.length) {
                reasons.push(
                    `missing_business_fields:${missingBusiness.join(",")}`
                );
            }

            const { data: sucData, error: sucErr } = await supabaseAdmin
                .from("sucursales")
                .select("id, negocioid, direccion_id, horarios, tipo, fechacreacion")
                .eq("negocioid", negData.id);

            if (sucErr) {
                reasons.push("business_query_error");
            } else if (!sucData || sucData.length === 0) {
                reasons.push("missing_sucursales_row");
            } else {
                const sorted = [...sucData].sort((a, b) => {
                    const aTime = a.fechacreacion ? Date.parse(a.fechacreacion) : 0;
                    const bTime = b.fechacreacion ? Date.parse(b.fechacreacion) : 0;
                    return bTime - aTime;
                });
                const principal =
                    sorted.find((row) => row.tipo === "principal") || sorted[0];

                const hasHorarios = (value: unknown) => {
                    if (!value) return false;
                    if (Array.isArray(value)) return value.length > 0;
                    if (typeof value === "object") return Object.keys(value as object).length > 0;
                    return true;
                };

                if (!principal.direccion_id || !principal.tipo || !hasHorarios(principal.horarios)) {
                    reasons.push("missing_sucursales_fields");
                }

                let addressRow: DireccionProfile | null = null;
                if (principal.direccion_id) {
                    const { data: dirData, error: dirErr } = await supabaseAdmin
                        .from("direcciones")
                        .select("id, calles, sector, referencia, ciudad, provincia_id, canton_id, parroquia_id, parroquia, lat, lng, owner_id, is_user_provided")
                        .eq("id", principal.direccion_id)
                        .eq("is_user_provided", true)
                        .maybeSingle<DireccionProfile & { owner_id?: string; is_user_provided?: boolean }>();

                    if (dirErr) {
                        reasons.push("business_address_query_error");
                    } else if (dirData?.owner_id === profile.id) {
                        addressRow = dirData as DireccionProfile;
                    }
                }

                if (!addressRow) {
                    const { data: fallbackDir, error: fallbackErr } = await supabaseAdmin
                        .from("direcciones")
                        .select("id, calles, sector, referencia, ciudad, provincia_id, canton_id, parroquia_id, parroquia, lat, lng")
                        .eq("owner_id", profile.id)
                        .eq("is_user_provided", true)
                        .order("updated_at", { ascending: false })
                        .order("created_at", { ascending: false })
                        .limit(1)
                        .maybeSingle<DireccionProfile>();

                    if (fallbackErr) {
                        reasons.push("business_address_query_error");
                    } else {
                        addressRow = fallbackDir;
                    }
                }

                if (!addressRow) {
                    reasons.push("missing_address_row");
                } else {
                    const hasUbicacion =
                        Boolean(addressRow.ciudad) ||
                        Boolean(addressRow.parroquia_id) ||
                        Boolean(addressRow.parroquia);
                    const missingFields =
                        !addressRow.calles ||
                        !hasUbicacion ||
                        !addressRow.sector ||
                        !addressRow.provincia_id ||
                        !addressRow.canton_id ||
                        addressRow.lat === null ||
                        addressRow.lng === null;
                    if (missingFields) {
                        reasons.push("missing_address_fields");
                    }
                }
            }
        }
    }

    //6) Aplicar parches técnicos (email/nombre)
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
                    reasons: ["profile_update_error"],
                    usuario: profile,
                    negocio: negocioRow,
                    provider,
                },
                500,
                corsHeaders
            );
        }

        updatedProfile = upd ?? profile;
    }

    //7) Resultado FINAL
    const allowAccess =
        accountStatus === "active" && reasons.length === 0;

    return json(
        {
            ok: true,
            allowAccess,
            reasons,
            usuario: updatedProfile,
            negocio: negocioRow,
            email_confirmed: Boolean(profile.emailConfirmado),
            phone: profile.telefono ?? null,
            provider,
        } satisfies OnboardingResult,
        200,
        corsHeaders
    );
});

function json(
    body: unknown,
    status = 200,
    headers: Record<string, string> = {}
)   {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json", ...headers },
    });
}
