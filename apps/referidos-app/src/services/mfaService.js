import { supabase } from "../lib/supabaseClient.js";

const FRIENDLY_NAME = "App autenticadora";
const SESSION_ERROR = "La sesión cambió. Vuelve a iniciar sesión.";
const INVALID_CODE = "Ingresa un código de 6 dígitos.";

const ok = (data) => ({ ok: true, data });
const failure = (error, fallback) => ({
  ok: false,
  error: error?.message || error?.error_description || fallback,
  errorCode: error?.code || error?.error_code || null,
});

const callSupabase = async (request, fallback) => {
  try {
    const { data, error } = await request();
    return error ? failure(error, fallback) : ok(data);
  } catch (error) {
    return failure(error, fallback);
  }
};

export const sanitizeTotpCode = (value) => value.replace(/\D/g, "").slice(0, 6);
export const isTotpCode = (value) => /^[0-9]{6}$/.test(value);

const getAuthUserId = async (expectedAuthUserId) => {
  const result = await callSupabase(() => supabase.auth.getSession(), SESSION_ERROR);
  if (!result.ok) return result;
  const authUserId = result.data?.session?.user?.id;
  if (!authUserId || (expectedAuthUserId && authUserId !== expectedAuthUserId)) {
    return failure(null, SESSION_ERROR);
  }
  return ok(authUserId);
};

export const getMfaAssuranceLevel = async (expectedAuthUserId) => {
  const identity = await getAuthUserId(expectedAuthUserId);
  if (!identity.ok) return identity;
  const fallback = "No se pudo comprobar la seguridad de tu sesión.";
  const result = await callSupabase(
    () => supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    fallback,
  );
  if (!result.ok) return result;
  const { currentLevel, nextLevel } = result.data || {};
  const allowed = [null, "aal1", "aal2"];
  if (!allowed.includes(currentLevel) || !allowed.includes(nextLevel)) {
    return failure(null, fallback);
  }
  const currentIdentity = await getAuthUserId(identity.data);
  if (!currentIdentity.ok) return currentIdentity;
  // A valid older session may omit the AAL claim. It still needs the live factor check.
  return ok({
    ...result.data,
    currentLevel: currentLevel ?? "aal1",
    nextLevel: nextLevel ?? currentLevel ?? "aal1",
    authUserId: identity.data,
  });
};

export const isVerifiedFactor = (factor) =>
  Boolean(factor?.id) && factor.status === "verified";

export const pickActiveTotpFactor = (factors = []) =>
  factors.find(isVerifiedFactor) || null;

export const listMfaFactors = async (expectedAuthUserId) => {
  const identity = await getAuthUserId(expectedAuthUserId);
  if (!identity.ok) return identity;
  const fallback = "No se pudieron obtener los métodos de verificación.";
  const result = await callSupabase(() => supabase.auth.mfa.listFactors(), fallback);
  if (!result.ok) return result;

  // The SDK's typed lists contain verified factors only. Its `all` list also has pending factors.
  const { all, totp } = result.data || {};
  if (!Array.isArray(all) || !Array.isArray(totp)) return failure(null, fallback);
  if (all.some((factor) => !factor?.id || !factor.factor_type || !["verified", "unverified"].includes(factor.status))) {
    return failure(null, fallback);
  }
  const currentIdentity = await getAuthUserId(identity.data);
  if (!currentIdentity.ok) return currentIdentity;
  return ok({
    ...result.data,
    totp: all.filter((factor) => factor?.factor_type === "totp"),
  });
};

export const resolveMfaAccess = async (expectedAuthUserId) => {
  const assurance = await getMfaAssuranceLevel(expectedAuthUserId);
  if (!assurance.ok) return assurance;
  const { authUserId, currentLevel } = assurance.data;
  if (currentLevel === "aal2") return ok({ authUserId, required: false });

  // The SDK derives the next AAL from the cached session user. Read the current
  // factors before admitting AAL1; another session may have activated 2FA.
  const factors = await listMfaFactors(authUserId);
  return factors.ok
    ? ok({ authUserId, required: factors.data.all.some(isVerifiedFactor) })
    : factors;
};

const unenrollFactor = (factorId) => callSupabase(
  () => supabase.auth.mfa.unenroll({ factorId }),
  "No se pudo eliminar el método de verificación.",
);

export const prepareTotpEnrollment = async () => {
  const identity = await getAuthUserId();
  if (!identity.ok) return identity;
  const authUserId = identity.data;
  const list = await listMfaFactors(authUserId);
  if (!list.ok) return list;

  const existing = pickActiveTotpFactor(list.data.totp);
  if (existing) return ok({ authUserId, factorId: existing.id, mode: "existing" });

  // GoTrue rejects duplicate names. Only replace a pending enrollment for this app.
  const pending = list.data.totp.filter((factor) =>
    factor?.id && factor.friendly_name === FRIENDLY_NAME && factor.status === "unverified");
  for (const factor of pending) {
    const current = await listMfaFactors(authUserId);
    if (!current.ok) return current;
    const active = pickActiveTotpFactor(current.data.totp);
    if (active) return ok({ authUserId, factorId: active.id, mode: "existing" });
    if (!current.data.totp.some((item) => item.id === factor.id && item.status === "unverified")) continue;
    const removed = await unenrollFactor(factor.id);
    if (!removed.ok) return removed;
  }

  const current = await getAuthUserId(authUserId);
  if (!current.ok) return current;
  const fallback = "No se pudo iniciar la configuración del autenticador.";
  const enrolled = await callSupabase(() => supabase.auth.mfa.enroll({
    factorType: "totp",
    issuer: "Referidos",
    friendlyName: FRIENDLY_NAME,
  }), fallback);
  if (!enrolled.ok) return enrolled;

  const { id, totp } = enrolled.data || {};
  const qrUri = typeof totp?.uri === "string" && totp.uri.startsWith("otpauth://totp/") ? totp.uri : "";
  const secret = typeof totp?.secret === "string" ? totp.secret : "";
  if (!id || (!qrUri && !secret)) return failure(null, fallback);
  const currentIdentity = await getAuthUserId(authUserId);
  if (!currentIdentity.ok) return currentIdentity;
  return ok({ authUserId, factorId: id, mode: "enroll", qrUri, secret });
};

export const challengeAndVerifyTotp = async ({ factorId, code, authUserId }) => {
  if (!factorId || !isTotpCode(code)) return failure(null, INVALID_CODE);
  const identity = await getAuthUserId(authUserId);
  if (!identity.ok) return identity;
  const result = await callSupabase(
    () => supabase.auth.mfa.challengeAndVerify({ factorId, code }),
    "No se pudo verificar el código. Usa un código reciente e inténtalo otra vez.",
  );
  if (!result.ok) return result;
  return ok({ authUserId: identity.data });
};

export const verifyMfaSession = async (expectedAuthUserId) => {
  const assurance = await getMfaAssuranceLevel(expectedAuthUserId);
  if (!assurance.ok) return assurance;
  return assurance.data.currentLevel === "aal2"
    ? assurance
    : failure(null, "No se confirmó la verificación en dos pasos de tu sesión.");
};

export const removeVerifiedTotp = async ({ factorId, authUserId }) => {
  const assurance = await verifyMfaSession(authUserId);
  if (!assurance.ok) return assurance;
  const list = await listMfaFactors(authUserId);
  if (!list.ok) return list;
  const factor = list.data.totp.find((item) => item.id === factorId);
  if (!factor) return ok(null);
  if (!isVerifiedFactor(factor)) {
    return failure(null, "El método seleccionado ya no está verificado.");
  }
  return unenrollFactor(factorId);
};

export const syncTotpFlags = async ({ authUserId, expectedFactorId } = {}) => {
  const identity = await getAuthUserId(authUserId);
  if (!identity.ok) return identity;
  const list = await listMfaFactors(identity.data);
  if (!list.ok) return list;
  const factors = list.data.totp.filter(isVerifiedFactor);
  if (expectedFactorId && !factors.some((factor) => factor.id === expectedFactorId)) {
    return failure(null, "El autenticador todavía no aparece como verificado.");
  }
  const enabled = factors.length > 0;
  const fallback = "No se pudo guardar el estado del autenticador en tu perfil.";
  const profile = await callSupabase(() => supabase
    .from("usuarios")
    .select("mfa_enrolled_at")
    .eq("id_auth", identity.data)
    .maybeSingle(), fallback);
  if (!profile.ok) return profile;
  if (!profile.data) return failure(null, fallback);

  const payload = {
    mfa_totp_enabled: enabled,
    mfa_method: enabled ? "totp" : null,
    mfa_primary_method: enabled ? "totp" : null,
    mfa_enrolled_at: enabled ? profile.data.mfa_enrolled_at || new Date().toISOString() : null,
  };
  const update = await callSupabase(() => supabase
    .from("usuarios")
    .update(payload)
    .eq("id_auth", identity.data)
    .select("id_auth")
    .maybeSingle(), fallback);
  if (!update.ok) return update;
  return update.data ? ok({ enabled }) : failure(null, fallback);
};

export const refreshMfaSession = async (expectedAuthUserId) => {
  const identity = await getAuthUserId(expectedAuthUserId);
  if (!identity.ok) return identity;
  return callSupabase(
    () => supabase.auth.refreshSession(),
    "No se pudo actualizar la sesión después de cambiar tu autenticador.",
  );
};
