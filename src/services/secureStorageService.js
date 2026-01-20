const DB_NAME = "referidos_secure_storage";
const DB_VERSION = 1;
const STORE_NAME = "secure_items";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const toBase64 = (buffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)));
const fromBase64 = (value) =>
  Uint8Array.from(atob(value), (c) => c.charCodeAt(0)).buffer;

const openDb = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const withStore = async (mode, handler) => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode);
    const store = tx.objectStore(STORE_NAME);
    handler(store, resolve, reject);
  });
};

const getItem = (key) =>
  withStore("readonly", (store, resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result?.value ?? null);
    request.onerror = () => reject(request.error);
  });

const setItem = (key, value) =>
  withStore("readwrite", (store, resolve, reject) => {
    const request = store.put({ key, value });
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });

const deleteItem = (key) =>
  withStore("readwrite", (store, resolve, reject) => {
    const request = store.delete(key);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });

export const getSecureStorageMode = async () => {
  if (!window.PublicKeyCredential || !navigator.credentials) {
    return { mode: "blocked", webauthn: false, prf: false };
  }
  const uvpa = await window.PublicKeyCredential
    .isUserVerifyingPlatformAuthenticatorAvailable?.()
    .catch(() => false);
  if (!uvpa) {
    return { mode: "blocked", webauthn: false, prf: false };
  }
  const prfSupported = Boolean(window.PublicKeyCredential?.isConditionalMediationAvailable);
  return {
    mode: prfSupported ? "webauthn_prf" : "webauthn_gate",
    webauthn: true,
    prf: prfSupported,
  };
};

const getOrCreateWrappingKey = async () => {
  const stored = await getItem("wrapping_key");
  if (stored?.jwk) {
    return window.crypto.subtle.importKey(
      "jwk",
      stored.jwk,
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"],
    );
  }
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const jwk = await window.crypto.subtle.exportKey("jwk", key);
  await setItem("wrapping_key", { jwk });
  return key;
};

const getOrCreateDeviceKey = async (userId) => {
  const keyId = `device_key_${userId}`;
  const stored = await getItem(keyId);
  if (stored?.data && stored?.iv) {
    const wrapKey = await getOrCreateWrappingKey();
    const raw = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(fromBase64(stored.iv)) },
      wrapKey,
      fromBase64(stored.data),
    );
    const jwk = JSON.parse(decoder.decode(raw));
    return window.crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"],
    );
  }
  const deviceKey = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const jwk = await window.crypto.subtle.exportKey("jwk", deviceKey);
  const wrapKey = await getOrCreateWrappingKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const payload = encoder.encode(JSON.stringify(jwk));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    wrapKey,
    payload,
  );
  await setItem(keyId, { iv: toBase64(iv), data: toBase64(encrypted) });
  return deviceKey;
};

const encryptForUser = async (userId, payload) => {
  const key = await getOrCreateDeviceKey(userId);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = encoder.encode(JSON.stringify(payload));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded,
  );
  return { iv: toBase64(iv), data: toBase64(encrypted) };
};

const decryptForUser = async (userId, payload) => {
  if (!payload?.iv || !payload?.data) return null;
  const key = await getOrCreateDeviceKey(userId);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(fromBase64(payload.iv)) },
    key,
    fromBase64(payload.data),
  );
  return JSON.parse(decoder.decode(decrypted));
};

export const generatePinSalt = () =>
  toBase64(window.crypto.getRandomValues(new Uint8Array(16)));

export const hashPin = async (pin, salt, iterations = 160000) => {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(pin),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new Uint8Array(fromBase64(salt)),
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return toBase64(bits);
};

export const saveBiometricToken = async (userId, token) => {
  const { mode } = await getSecureStorageMode();
  if (mode === "blocked") return { ok: false, error: "webauthn_not_available" };
  const encrypted = await encryptForUser(userId, token);
  await setItem(`biometric_token_${userId}`, encrypted);
  return { ok: true };
};

export const loadBiometricToken = async (userId) => {
  const { mode } = await getSecureStorageMode();
  if (mode === "blocked") return null;
  const encrypted = await getItem(`biometric_token_${userId}`);
  if (!encrypted) return null;
  return decryptForUser(userId, encrypted);
};

export const deleteBiometricToken = async (userId) => {
  await deleteItem(`biometric_token_${userId}`);
};

export const savePinHash = async (userId, payload) => {
  const { mode } = await getSecureStorageMode();
  if (mode === "blocked") return { ok: false, error: "webauthn_not_available" };
  const encrypted = await encryptForUser(userId, payload);
  await setItem(`pin_hash_${userId}`, encrypted);
  return { ok: true };
};

export const loadPinHash = async (userId) => {
  const { mode } = await getSecureStorageMode();
  if (mode === "blocked") return null;
  const encrypted = await getItem(`pin_hash_${userId}`);
  if (!encrypted) return null;
  return decryptForUser(userId, encrypted);
};

export const deletePinHash = async (userId) => {
  await deleteItem(`pin_hash_${userId}`);
};

export const saveDeviceSecret = async (userId, secret) => {
  const { mode } = await getSecureStorageMode();
  if (mode === "blocked") return { ok: false, error: "webauthn_not_available" };
  const encrypted = await encryptForUser(userId, secret);
  await setItem(`device_secret_${userId}`, encrypted);
  return { ok: true };
};

export const loadDeviceSecret = async (userId) => {
  const { mode } = await getSecureStorageMode();
  if (mode === "blocked") return null;
  const encrypted = await getItem(`device_secret_${userId}`);
  if (!encrypted) return null;
  return decryptForUser(userId, encrypted);
};

export const deleteDeviceSecret = async (userId) => {
  await deleteItem(`device_secret_${userId}`);
};

export const getPinAttemptState = async (userId) =>
  (await getItem(`pin_attempts_${userId}`)) ?? { count: 0, lockedUntil: null };

export const recordPinAttempt = async (userId, ok, maxAttempts = 10) => {
  const state = await getPinAttemptState(userId);
  if (ok) {
    await setItem(`pin_attempts_${userId}`, { count: 0, lockedUntil: null });
    return { ok: true };
  }
  const nextCount = (state.count || 0) + 1;
  const lockedUntil =
    nextCount >= maxAttempts ? Date.now() + 5 * 60 * 1000 : null;
  await setItem(`pin_attempts_${userId}`, { count: nextCount, lockedUntil });
  if (nextCount >= maxAttempts) {
    await deletePinHash(userId);
  }
  return { ok: false, lockedUntil };
};

export const clearUserSecurityMaterial = async (userId) => {
  await deleteBiometricToken(userId);
  await deletePinHash(userId);
  await deleteDeviceSecret(userId);
  await deleteItem(`pin_attempts_${userId}`);
};
