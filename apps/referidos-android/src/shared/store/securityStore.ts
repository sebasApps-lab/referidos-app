import { create } from "zustand";
import {
  getRequiredLevelForAction,
  isLevelSatisfied,
  UNLOCK_LEVELS,
} from "@referidos/security-core";

export type UnlockLevel = "LOCKED" | "UNLOCK_LOCAL" | "REAUTH_SENSITIVE";
export type UnlockMethod = "none" | "pin" | "biometric" | "password";
export type PendingMethod = "local" | "password" | null;

export type SecurityRequirementResult = {
  ok: boolean;
  action: string;
  requiredLevel: UnlockLevel;
  currentLevel: UnlockLevel;
  pendingMethod: PendingMethod;
};

const UNLOCK_LOCAL_TTL_MS = 10 * 60 * 1000;
const REAUTH_SENSITIVE_TTL_MS = 5 * 60 * 1000;

type SecurityState = {
  unlockLevel: UnlockLevel;
  unlockMethod: UnlockMethod;
  unlockedAt: number | null;
  unlockExpiresAt: number | null;
  pendingAction: string | null;
  pendingLevel: UnlockLevel | null;
  pendingMethod: PendingMethod;
  rules: Record<string, UnlockLevel>;
  require: (action: string, level?: UnlockLevel) => SecurityRequirementResult;
  requireAction: (action: string) => SecurityRequirementResult;
  setRule: (action: string, level: UnlockLevel) => void;
  setRules: (rules: Record<string, UnlockLevel>) => void;
  clearPending: () => void;
  getCurrentLevel: () => UnlockLevel;
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

function normalizeLevel(value: string | null | undefined): UnlockLevel {
  if (value === UNLOCK_LEVELS.REAUTH_SENSITIVE) return "REAUTH_SENSITIVE";
  if (value === UNLOCK_LEVELS.UNLOCK_LOCAL) return "UNLOCK_LOCAL";
  return "LOCKED";
}

function requiredMethod(level: UnlockLevel): PendingMethod {
  if (level === "REAUTH_SENSITIVE") return "password";
  if (level === "UNLOCK_LOCAL") return "local";
  return null;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  unlockLevel: "LOCKED",
  unlockMethod: "none",
  unlockedAt: null,
  unlockExpiresAt: null,
  pendingAction: null,
  pendingLevel: null,
  pendingMethod: null,
  rules: {},

  require: (action, level) => {
    const state = get();
    const resolvedLevel = normalizeLevel(
      level || state.rules[action] || getRequiredLevelForAction(action),
    );
    let currentLevel = state.unlockLevel;
    const unlocked = hasValidUnlock(state.unlockLevel, state.unlockExpiresAt);
    if (!unlocked) {
      currentLevel = "LOCKED";
      if (state.unlockLevel !== "LOCKED") {
        set({
          unlockLevel: "LOCKED",
          unlockMethod: "none",
          unlockedAt: null,
          unlockExpiresAt: null,
        });
      }
    }

    const allowed = isLevelSatisfied(currentLevel, resolvedLevel);
    if (allowed) {
      set({ pendingAction: null, pendingLevel: null, pendingMethod: null });
      return {
        ok: true,
        action,
        requiredLevel: resolvedLevel,
        currentLevel,
        pendingMethod: null,
      };
    }

    const pendingMethod = requiredMethod(resolvedLevel);
    set({
      pendingAction: action,
      pendingLevel: resolvedLevel,
      pendingMethod,
    });
    return {
      ok: false,
      action,
      requiredLevel: resolvedLevel,
      currentLevel,
      pendingMethod,
    };
  },

  requireAction: (action) => get().require(action),

  setRule: (action, level) => {
    set((state) => ({
      rules: {
        ...state.rules,
        [action]: normalizeLevel(level),
      },
    }));
  },

  setRules: (rules) => {
    const next: Record<string, UnlockLevel> = {};
    for (const [action, level] of Object.entries(rules || {})) {
      next[action] = normalizeLevel(level);
    }
    set({ rules: next });
  },

  clearPending: () => {
    set({ pendingAction: null, pendingLevel: null, pendingMethod: null });
  },

  getCurrentLevel: () => {
    const state = get();
    const unlocked = hasValidUnlock(state.unlockLevel, state.unlockExpiresAt);
    if (!unlocked) {
      if (state.unlockLevel !== "LOCKED") {
        set({
          unlockLevel: "LOCKED",
          unlockMethod: "none",
          unlockedAt: null,
          unlockExpiresAt: null,
        });
      }
      return "LOCKED";
    }
    return state.unlockLevel;
  },

  unlockWithPin: (ttlMs = UNLOCK_LOCAL_TTL_MS) => {
    const now = Date.now();
    set({
      unlockLevel: "UNLOCK_LOCAL",
      unlockMethod: "pin",
      unlockedAt: now,
      unlockExpiresAt: now + ttlMs,
      pendingAction: null,
      pendingLevel: null,
      pendingMethod: null,
    });
  },

  unlockWithBiometrics: (ttlMs = UNLOCK_LOCAL_TTL_MS) => {
    const now = Date.now();
    set({
      unlockLevel: "UNLOCK_LOCAL",
      unlockMethod: "biometric",
      unlockedAt: now,
      unlockExpiresAt: now + ttlMs,
      pendingAction: null,
      pendingLevel: null,
      pendingMethod: null,
    });
  },

  unlockWithPassword: (ttlMs = REAUTH_SENSITIVE_TTL_MS) => {
    const now = Date.now();
    set({
      unlockLevel: "REAUTH_SENSITIVE",
      unlockMethod: "password",
      unlockedAt: now,
      unlockExpiresAt: now + ttlMs,
      pendingAction: null,
      pendingLevel: null,
      pendingMethod: null,
    });
  },

  invalidate: () => {
    set({
      unlockLevel: "LOCKED",
      unlockMethod: "none",
      unlockedAt: null,
      unlockExpiresAt: null,
      pendingAction: null,
      pendingLevel: null,
      pendingMethod: null,
    });
  },

  reset: () => {
    set({
      unlockLevel: "LOCKED",
      unlockMethod: "none",
      unlockedAt: null,
      unlockExpiresAt: null,
      pendingAction: null,
      pendingLevel: null,
      pendingMethod: null,
      rules: {},
    });
  },
}));
