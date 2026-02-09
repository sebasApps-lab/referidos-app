import AsyncStorage from "@react-native-async-storage/async-storage";

const namespace = (userId, key) => `sec:${userId}:${key}`;

function safeJsonParse(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function getJson(key) {
  const raw = await AsyncStorage.getItem(key);
  return safeJsonParse(raw);
}

async function setJson(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getSecureStorageMode() {
  return { mode: "native_async_storage", webauthn: false, prf: false };
}

export async function saveBiometricToken(userId, token) {
  await setJson(namespace(userId, "biometric_token"), token);
  return { ok: true };
}

export async function loadBiometricToken(userId) {
  return getJson(namespace(userId, "biometric_token"));
}

export async function deleteBiometricToken(userId) {
  await AsyncStorage.removeItem(namespace(userId, "biometric_token"));
}

export async function savePinHash(userId, payload) {
  await setJson(namespace(userId, "pin_hash"), payload);
  return { ok: true };
}

export async function loadPinHash(userId) {
  return getJson(namespace(userId, "pin_hash"));
}

export async function deletePinHash(userId) {
  await AsyncStorage.removeItem(namespace(userId, "pin_hash"));
}

export async function saveDeviceSecret(userId, payload) {
  await setJson(namespace(userId, "device_secret"), payload);
  return { ok: true };
}

export async function loadDeviceSecret(userId) {
  return getJson(namespace(userId, "device_secret"));
}

export async function deleteDeviceSecret(userId) {
  await AsyncStorage.removeItem(namespace(userId, "device_secret"));
}

export async function getPinAttemptState(userId) {
  return (await getJson(namespace(userId, "pin_attempts"))) || {
    count: 0,
    lockedUntil: null,
  };
}

export async function recordPinAttempt(userId, ok, maxAttempts = 10) {
  const state = await getPinAttemptState(userId);
  if (ok) {
    await setJson(namespace(userId, "pin_attempts"), { count: 0, lockedUntil: null });
    return { ok: true };
  }

  const nextCount = (state.count || 0) + 1;
  const lockedUntil = nextCount >= maxAttempts ? Date.now() + 5 * 60 * 1000 : null;
  await setJson(namespace(userId, "pin_attempts"), { count: nextCount, lockedUntil });
  if (nextCount >= maxAttempts) {
    await deletePinHash(userId);
  }
  return { ok: false, lockedUntil };
}

export async function clearUserSecurityMaterial(userId) {
  await deleteBiometricToken(userId);
  await deletePinHash(userId);
  await deleteDeviceSecret(userId);
  await AsyncStorage.removeItem(namespace(userId, "pin_attempts"));
}

export function generatePinSalt() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export async function hashPin(pin, salt, iterations = 160000) {
  // Deterministic fallback hash for RN bootstrap phase.
  // This keeps the contract stable until PBKDF2/native crypto is plugged in.
  let hash = 2166136261;
  const input = `${pin}:${salt}:${iterations}`;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash +=
      (hash << 1) +
      (hash << 4) +
      (hash << 7) +
      (hash << 8) +
      (hash << 24);
  }
  return `fnv-${Math.abs(hash >>> 0).toString(16)}`;
}
