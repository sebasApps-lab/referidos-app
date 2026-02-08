import { supabase } from "../lib/supabaseClient";

const toErrorMessage = (error, fallback) =>
  error?.message || error?.error_description || fallback;

export const getMfaAssuranceLevel = async () => {
  const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error) {
    return { ok: false, error: toErrorMessage(error, "No se pudo validar MFA") };
  }
  return { ok: true, data };
};

export const listMfaFactors = async () => {
  const { data, error } = await supabase.auth.mfa.listFactors();
  const isValidPayload =
    Array.isArray(data) || Array.isArray(data?.totp) || Array.isArray(data?.all);
  if (!error && isValidPayload) {
    return { ok: true, data };
  }

  const session = (await supabase.auth.getSession())?.data?.session;
  const accessToken = session?.access_token;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!accessToken || !supabaseUrl || !anonKey) {
    return { ok: false, error: toErrorMessage(error, "No se pudieron obtener factores") };
  }
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/factors`, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return {
        ok: false,
        error:
          body?.message ||
          toErrorMessage(error, "No se pudieron obtener factores"),
      };
    }
    const payload = await response.json();
    const payloadOk =
      Array.isArray(payload) ||
      Array.isArray(payload?.totp) ||
      Array.isArray(payload?.all);
    if (!payloadOk) {
      return { ok: false, error: "No se pudieron obtener factores" };
    }
    return { ok: true, data: payload };
  } catch (err) {
    return { ok: false, error: toErrorMessage(err, "No se pudieron obtener factores") };
  }
};

export const enrollTotp = async ({
  friendlyName = "App autenticadora",
  issuer = "Referidos",
} = {}) => {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    issuer,
    friendlyName,
  });
  if (error) {
    return {
      ok: false,
      error: toErrorMessage(error, "No se pudo iniciar MFA"),
      errorCode: error?.code || error?.error_code || null,
    };
  }
  return { ok: true, data };
};

export const challengeTotp = async (factorId) => {
  const { data, error } = await supabase.auth.mfa.challenge({
    factorId,
  });
  if (error) {
    return { ok: false, error: toErrorMessage(error, "No se pudo iniciar el reto") };
  }
  return { ok: true, data };
};

export const verifyTotp = async ({ factorId, challengeId, code }) => {
  const { data, error } = await supabase.auth.mfa.verify({
    factorId,
    challengeId,
    code,
  });
  if (error) {
    return { ok: false, error: toErrorMessage(error, "Codigo invalido") };
  }
  return { ok: true, data };
};

export const challengeAndVerifyTotp = async ({ factorId, code }) => {
  if (typeof supabase.auth.mfa.challengeAndVerify === "function") {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code,
    });
    if (error) {
      return { ok: false, error: toErrorMessage(error, "Codigo invalido") };
    }
    return { ok: true, data };
  }

  const challenge = await challengeTotp(factorId);
  if (!challenge.ok) return challenge;
  return verifyTotp({
    factorId,
    challengeId: challenge.data?.id,
    code,
  });
};

export const unenrollFactor = async (factorId) => {
  const { data, error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) {
    return { ok: false, error: toErrorMessage(error, "No se pudo desactivar MFA") };
  }
  return { ok: true, data };
};

export const syncTotpFlags = async ({ enabled }) => {
  const { data: sessionData } = await supabase.auth.getSession();
  const authId = sessionData?.session?.user?.id;
  if (!authId) return { ok: false, error: "Sesion no valida" };
  const payload = {
    mfa_totp_enabled: Boolean(enabled),
    mfa_method: enabled ? "totp" : null,
    mfa_primary_method: enabled ? "totp" : null,
    mfa_enrolled_at: enabled ? new Date().toISOString() : null,
  };
  const { error } = await supabase
    .from("usuarios")
    .update(payload)
    .eq("id_auth", authId);
  if (error) {
    return { ok: false, error: toErrorMessage(error, "No se pudo actualizar MFA") };
  }
  return { ok: true };
};

export const pickActiveTotpFactor = (factors = []) =>
  factors.find((factor) =>
    ["verified", "active"].includes(String(factor?.status || "").toLowerCase())
  ) || factors[0] || null;
