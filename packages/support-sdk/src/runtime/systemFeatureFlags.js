const STORAGE_KEY = "referidos_admin_feature_flags_v1";
const CHANGE_EVENT = "referidos:feature-flags:changed";

const DEFAULT_FLAGS = Object.freeze({
  disable_qr: false,
  maintenance: false,
  freeze_registro: false,
  support_live_updates: false,
});

function hasWindow() {
  return typeof window !== "undefined";
}

function normalizeFlags(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ...DEFAULT_FLAGS };
  }

  const merged = { ...DEFAULT_FLAGS };
  Object.keys(DEFAULT_FLAGS).forEach((key) => {
    if (key in raw) merged[key] = Boolean(raw[key]);
  });
  return merged;
}

export function getSystemFeatureFlags() {
  if (!hasWindow()) return { ...DEFAULT_FLAGS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_FLAGS };
    return normalizeFlags(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_FLAGS };
  }
}

export function setSystemFeatureFlags(nextState) {
  const normalized = normalizeFlags(nextState);
  if (!hasWindow()) return normalized;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent(CHANGE_EVENT, {
        detail: normalized,
      })
    );
  } catch {
    // Ignore storage failures; caller still gets normalized snapshot.
  }
  return normalized;
}

export function setSystemFeatureFlag(flagKey, enabled) {
  const current = getSystemFeatureFlags();
  return setSystemFeatureFlags({
    ...current,
    [flagKey]: Boolean(enabled),
  });
}

export function isSupportLiveUpdatesEnabled() {
  return Boolean(getSystemFeatureFlags().support_live_updates);
}

export function subscribeSystemFeatureFlags(onChange) {
  if (!hasWindow() || typeof onChange !== "function") {
    return () => {};
  }

  const onCustomChange = (event) => {
    const nextFlags = normalizeFlags(event?.detail);
    onChange(nextFlags);
  };

  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY) return;
    onChange(getSystemFeatureFlags());
  };

  window.addEventListener(CHANGE_EVENT, onCustomChange);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustomChange);
    window.removeEventListener("storage", onStorage);
  };
}

