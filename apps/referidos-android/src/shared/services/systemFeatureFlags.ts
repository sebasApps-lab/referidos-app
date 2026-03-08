import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "referidos_admin_feature_flags_v1";

export const DEFAULT_SYSTEM_FEATURE_FLAGS = Object.freeze({
  disable_qr: false,
  maintenance: false,
  freeze_registro: false,
  support_live_updates: false,
  oauth_apple_enabled: false,
});

type SystemFlags = typeof DEFAULT_SYSTEM_FEATURE_FLAGS;

const listeners = new Set<(flags: SystemFlags) => void>();
let cachedFlags: SystemFlags = { ...DEFAULT_SYSTEM_FEATURE_FLAGS };
let hasLoadedFlags = false;

function normalizeFlags(raw: any): SystemFlags {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ...DEFAULT_SYSTEM_FEATURE_FLAGS };
  }

  const merged: Record<string, boolean> = { ...DEFAULT_SYSTEM_FEATURE_FLAGS };
  Object.keys(DEFAULT_SYSTEM_FEATURE_FLAGS).forEach((key) => {
    if (key in raw) merged[key] = Boolean(raw[key]);
  });
  return merged as SystemFlags;
}

function emitFlags(nextFlags: SystemFlags) {
  listeners.forEach((listener) => {
    try {
      listener({ ...nextFlags });
    } catch {
      // no-op
    }
  });
}

export function getCachedSystemFeatureFlags() {
  return { ...cachedFlags };
}

export async function fetchSystemFeatureFlags({ force = false } = {}) {
  if (!force && hasLoadedFlags) return { ...cachedFlags };
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    cachedFlags = raw ? normalizeFlags(JSON.parse(raw)) : { ...DEFAULT_SYSTEM_FEATURE_FLAGS };
  } catch {
    cachedFlags = { ...DEFAULT_SYSTEM_FEATURE_FLAGS };
  }
  hasLoadedFlags = true;
  return { ...cachedFlags };
}

export async function setSystemFeatureFlags(nextState: Partial<SystemFlags>) {
  cachedFlags = normalizeFlags({
    ...cachedFlags,
    ...nextState,
  });
  hasLoadedFlags = true;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cachedFlags));
  } catch {
    // Ignore storage failures. Callers still receive the normalized snapshot.
  }
  emitFlags(cachedFlags);
  return { ...cachedFlags };
}

export async function setSystemFeatureFlag(
  flagKey: keyof SystemFlags,
  enabled: boolean,
) {
  return setSystemFeatureFlags({
    [flagKey]: Boolean(enabled),
  });
}

export function isSupportLiveUpdatesEnabled() {
  return Boolean(cachedFlags.support_live_updates);
}

export function isAppleOAuthEnabled() {
  return Boolean(cachedFlags.oauth_apple_enabled);
}

export function subscribeSystemFeatureFlags(onChange: (flags: SystemFlags) => void) {
  if (typeof onChange !== "function") return () => {};
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}
