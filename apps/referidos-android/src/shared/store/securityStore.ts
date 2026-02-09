import { create } from "zustand";

export type UnlockLevel = "LOCKED" | "UNLOCK_LOCAL" | "REAUTH_SENSITIVE";
export type UnlockMethod = "none" | "pin" | "biometric" | "password";

type SecurityState = {
  unlockLevel: UnlockLevel;
  unlockMethod: UnlockMethod;
  unlockedAt: number | null;
  unlockExpiresAt: number | null;
  pendingAction: string | null;
  require: (action: string, level: UnlockLevel) => boolean;
  unlockWithPin: (ttlMs?: number) => void;
  unlockWithBiometrics: (ttlMs?: number) => void;
  unlockWithPassword: (ttlMs?: number) => void;
  invalidate: () => void;
  reset: () => void;
};

function hasValidUnlock(level: UnlockLevel, expiresAt: number | null) {
  if (level === "LOCKED") return false;
  if (!expiresAt) return false;
  return Date.now() <= expiresAt;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  unlockLevel: "LOCKED",
  unlockMethod: "none",
  unlockedAt: null,
  unlockExpiresAt: null,
  pendingAction: null,

  require: (action, level) => {
    const state = get();
    const unlocked = hasValidUnlock(state.unlockLevel, state.unlockExpiresAt);
    if (!unlocked) {
      set({ pendingAction: action });
      return false;
    }
    if (level === "REAUTH_SENSITIVE" && state.unlockLevel !== "REAUTH_SENSITIVE") {
      set({ pendingAction: action });
      return false;
    }
    return true;
  },

  unlockWithPin: (ttlMs = 30 * 60 * 1000) => {
    const now = Date.now();
    set({
      unlockLevel: "UNLOCK_LOCAL",
      unlockMethod: "pin",
      unlockedAt: now,
      unlockExpiresAt: now + ttlMs,
      pendingAction: null,
    });
  },

  unlockWithBiometrics: (ttlMs = 30 * 60 * 1000) => {
    const now = Date.now();
    set({
      unlockLevel: "UNLOCK_LOCAL",
      unlockMethod: "biometric",
      unlockedAt: now,
      unlockExpiresAt: now + ttlMs,
      pendingAction: null,
    });
  },

  unlockWithPassword: (ttlMs = 10 * 60 * 1000) => {
    const now = Date.now();
    set({
      unlockLevel: "REAUTH_SENSITIVE",
      unlockMethod: "password",
      unlockedAt: now,
      unlockExpiresAt: now + ttlMs,
      pendingAction: null,
    });
  },

  invalidate: () => {
    set({
      unlockLevel: "LOCKED",
      unlockMethod: "none",
      unlockedAt: null,
      unlockExpiresAt: null,
    });
  },

  reset: () => {
    set({
      unlockLevel: "LOCKED",
      unlockMethod: "none",
      unlockedAt: null,
      unlockExpiresAt: null,
      pendingAction: null,
    });
  },
}));
