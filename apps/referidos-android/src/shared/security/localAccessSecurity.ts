import {
  PIN_MAX_ATTEMPTS,
  isValidPin,
  getRequiredLevelForAction,
} from "@referidos/security-core";
import {
  clearPinAttemptState,
  deleteBiometricToken,
  deletePinHash,
  generatePinSalt,
  getPinAttemptState,
  hashPin,
  loadBiometricToken,
  loadPinHash,
  recordPinAttempt,
  saveBiometricToken,
  savePinHash,
  isBiometricAvailable,
  promptBiometric,
} from "@referidos/platform-rn";
import { supabase } from "@shared/services/mobileApi";
import {
  SecurityRequirementResult,
  useSecurityStore,
} from "@shared/store/securityStore";

export type AccessMethods = {
  fingerprint: boolean;
  pin: boolean;
  password: boolean;
};

type MutationResult = {
  ok: boolean;
  error?: string;
};

const PIN_HASH_ITERATIONS = 160000;

function normalizeUserIds(params: {
  authUserId?: string | null;
  userRowId?: string | null;
}) {
  const authUserId = String(params.authUserId || "").trim();
  const userRowId = String(params.userRowId || "").trim();
  return { authUserId, userRowId };
}

export function buildAccessMethodsFromUser(user: any): AccessMethods {
  const provider = String(user?.provider || "").toLowerCase();
  return {
    fingerprint: Boolean(user?.has_biometrics),
    pin: Boolean(user?.has_pin),
    password: Boolean(user?.has_password || provider === "email"),
  };
}

export function requireSecurityForAction(action: string): SecurityRequirementResult {
  return useSecurityStore.getState().requireAction(action);
}

async function updateUserAccessFlags(
  userRowId: string,
  updates: { has_pin?: boolean; has_biometrics?: boolean },
): Promise<MutationResult> {
  if (!userRowId || !Object.keys(updates).length) return { ok: true };
  const { error } = await supabase
    .from("usuarios")
    .update(updates)
    .eq("id", userRowId);
  if (error) {
    return { ok: false, error: error.message || "No se pudo actualizar accesos." };
  }
  return { ok: true };
}

export async function configurePinAccess(params: {
  authUserId?: string | null;
  userRowId?: string | null;
  pin: string;
}) {
  const { authUserId, userRowId } = normalizeUserIds(params);
  const pin = String(params.pin || "").trim();
  if (!authUserId || !userRowId) {
    return { ok: false, error: "Sesion invalida para configurar PIN." };
  }
  if (!isValidPin(pin)) {
    return { ok: false, error: "PIN invalido. Debe tener exactamente 4 digitos." };
  }

  const attempts = await getPinAttemptState(authUserId);
  if (attempts?.lockedUntil && Date.now() < Number(attempts.lockedUntil)) {
    return {
      ok: false,
      error: "PIN bloqueado temporalmente por demasiados intentos.",
      lockedUntil: attempts.lockedUntil,
    };
  }

  const salt = generatePinSalt();
  const hash = await hashPin(pin, salt, PIN_HASH_ITERATIONS);
  const saveResult = await savePinHash(authUserId, {
    hash,
    salt,
    iterations: PIN_HASH_ITERATIONS,
    updatedAt: new Date().toISOString(),
  });
  if (!saveResult?.ok) {
    const saveError = (saveResult as any)?.error;
    return { ok: false, error: saveError || "No se pudo guardar PIN local." };
  }

  await recordPinAttempt(authUserId, true, PIN_MAX_ATTEMPTS);
  const userUpdate = await updateUserAccessFlags(userRowId, { has_pin: true });
  if (!userUpdate.ok) return userUpdate;

  return { ok: true };
}

export async function verifyPinAndUnlock(params: {
  authUserId?: string | null;
  pin: string;
}) {
  const authUserId = String(params.authUserId || "").trim();
  const pin = String(params.pin || "").trim();
  if (!authUserId) return { ok: false, error: "Sesion invalida para validar PIN." };
  if (!isValidPin(pin)) return { ok: false, error: "PIN invalido." };

  const attempts = await getPinAttemptState(authUserId);
  if (attempts?.lockedUntil && Date.now() < Number(attempts.lockedUntil)) {
    return {
      ok: false,
      error: "Demasiados intentos. Intenta de nuevo mas tarde.",
      lockedUntil: attempts.lockedUntil,
    };
  }

  const stored = await loadPinHash(authUserId);
  if (!stored?.hash || !stored?.salt) {
    return { ok: false, error: "No hay PIN configurado en este dispositivo." };
  }

  const computed = await hashPin(
    pin,
    String(stored.salt),
    Number(stored.iterations || PIN_HASH_ITERATIONS),
  );
  const success = computed === String(stored.hash);
  const attemptResult = await recordPinAttempt(authUserId, success, PIN_MAX_ATTEMPTS);
  if (!success) {
    return {
      ok: false,
      error: attemptResult?.lockedUntil
        ? "PIN bloqueado temporalmente por demasiados intentos."
        : "PIN incorrecto.",
      lockedUntil: attemptResult?.lockedUntil || null,
    };
  }

  useSecurityStore.getState().unlockWithPin();
  return { ok: true };
}

export async function disablePinAccess(params: {
  authUserId?: string | null;
  userRowId?: string | null;
}) {
  const { authUserId, userRowId } = normalizeUserIds(params);
  if (!authUserId || !userRowId) {
    return { ok: false, error: "Sesion invalida para desactivar PIN." };
  }
  await deletePinHash(authUserId);
  await clearPinAttemptState(authUserId);
  const userUpdate = await updateUserAccessFlags(userRowId, { has_pin: false });
  if (!userUpdate.ok) return userUpdate;
  return { ok: true };
}

export async function enrollBiometricAccess(params: {
  authUserId?: string | null;
  userRowId?: string | null;
}) {
  const { authUserId, userRowId } = normalizeUserIds(params);
  if (!authUserId || !userRowId) {
    return { ok: false, error: "Sesion invalida para biometria." };
  }

  const availability = await isBiometricAvailable();
  if (!availability?.ok || !availability?.available) {
    return {
      ok: false,
      error: availability?.reason || "Biometria no disponible en este dispositivo.",
    };
  }

  const prompt = await promptBiometric();
  if (!prompt?.ok || !prompt?.verified) {
    return { ok: false, error: prompt?.error || "No se pudo verificar biometria." };
  }

  const saveResult = await saveBiometricToken(authUserId, {
    enrolledAt: new Date().toISOString(),
    method: "native_biometric_prompt",
  });
  if (!saveResult?.ok) {
    const saveError = (saveResult as any)?.error;
    return { ok: false, error: saveError || "No se pudo guardar token biometrico." };
  }

  const userUpdate = await updateUserAccessFlags(userRowId, { has_biometrics: true });
  if (!userUpdate.ok) return userUpdate;
  return { ok: true };
}

export async function unlockWithBiometricAccess(params: { authUserId?: string | null }) {
  const authUserId = String(params.authUserId || "").trim();
  if (!authUserId) {
    return { ok: false, error: "Sesion invalida para desbloqueo biometrico." };
  }

  const token = await loadBiometricToken(authUserId);
  if (!token) {
    return { ok: false, error: "No hay biometria configurada en este dispositivo." };
  }

  const availability = await isBiometricAvailable();
  if (!availability?.ok || !availability?.available) {
    return {
      ok: false,
      error: availability?.reason || "Biometria no disponible.",
    };
  }

  const prompt = await promptBiometric();
  if (!prompt?.ok || !prompt?.verified) {
    return { ok: false, error: prompt?.error || "No se pudo validar biometria." };
  }

  useSecurityStore.getState().unlockWithBiometrics();
  return { ok: true };
}

export async function disableBiometricAccess(params: {
  authUserId?: string | null;
  userRowId?: string | null;
}) {
  const { authUserId, userRowId } = normalizeUserIds(params);
  if (!authUserId || !userRowId) {
    return { ok: false, error: "Sesion invalida para desactivar biometria." };
  }
  await deleteBiometricToken(authUserId);
  const userUpdate = await updateUserAccessFlags(userRowId, { has_biometrics: false });
  if (!userUpdate.ok) return userUpdate;
  return { ok: true };
}

export async function sendSensitiveReauthEmail(email: string) {
  const normalized = String(email || "").trim();
  if (!normalized || !normalized.includes("@")) {
    return { ok: false, error: "Correo invalido para reautenticacion." };
  }

  if (typeof (supabase.auth as any).reauthenticate === "function") {
    const { error } = await (supabase.auth as any).reauthenticate();
    if (error) {
      return { ok: false, error: error.message || "No se pudo enviar correo de reautenticacion." };
    }
    return { ok: true };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: normalized,
    options: { shouldCreateUser: false },
  });
  if (error) {
    return { ok: false, error: error.message || "No se pudo enviar correo de reautenticacion." };
  }
  return { ok: true };
}

export function confirmSensitiveReauth() {
  useSecurityStore.getState().unlockWithPassword();
  return { ok: true };
}

export function requiredLevelForAction(action: string) {
  return getRequiredLevelForAction(action);
}
