const namespace = (userId, key) => `sec:${userId}:${key}`;

function safeJsonParse(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getItem(key) {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(key);
}

function setItem(key, value) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, value);
}

function removeItem(key) {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(key);
}

async function getJson(key) {
  return safeJsonParse(getItem(key));
}

async function setJson(key, value) {
  setItem(key, JSON.stringify(value));
}

export async function saveBiometricToken(userId, token) {
  await setJson(namespace(userId, "biometric_token"), token);
  return { ok: true };
}

export async function loadBiometricToken(userId) {
  return getJson(namespace(userId, "biometric_token"));
}

export async function deleteBiometricToken(userId) {
  removeItem(namespace(userId, "biometric_token"));
}

export async function savePinHash(userId, payload) {
  await setJson(namespace(userId, "pin_hash"), payload);
  return { ok: true };
}

export async function loadPinHash(userId) {
  return getJson(namespace(userId, "pin_hash"));
}

export async function deletePinHash(userId) {
  removeItem(namespace(userId, "pin_hash"));
}

export async function clearUserSecurityMaterial(userId) {
  await deleteBiometricToken(userId);
  await deletePinHash(userId);
}
