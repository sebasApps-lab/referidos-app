import {
  AUTHORITATIVE_LOGOUT_CODES,
  OBS_ERROR_CODES,
  TRANSIENT_CODES,
  normalizeErrorCode,
} from "../schema/errorCodes.js";

const RETRY_BUDGET_WINDOW_MS = 60_000;
const RETRY_BUDGET_MAX = 2;
const MODAL_ONCE_WINDOW_MS = 60_000;
const LOGOUT_COOLDOWN_MS = 60_000;

function keyFor(input = {}) {
  return `${input.errorCode || ""}|${input.fingerprint || ""}|${input.route || ""}`;
}

function nowMs() {
  return Date.now();
}

export function createPolicyRuntime() {
  const retryBudget = new Map();
  const modalOnce = new Map();
  const logoutCooldown = new Map();
  const singleFlight = new Map();

  function consumeBudget(map, key, windowMs, max) {
    const now = nowMs();
    const current = map.get(key);
    if (!current || now - current.startedAt > windowMs) {
      map.set(key, { startedAt: now, count: 1 });
      return { allowed: true, count: 1 };
    }
    if (current.count >= max) {
      return { allowed: false, count: current.count };
    }
    current.count += 1;
    map.set(key, current);
    return { allowed: true, count: current.count };
  }

  function onceEvery(map, key, windowMs) {
    const now = nowMs();
    const last = map.get(key) || 0;
    if (now - last < windowMs) return false;
    map.set(key, now);
    return true;
  }

  function beginFlight(actionKey) {
    if (!actionKey) return true;
    if (singleFlight.get(actionKey)) return false;
    singleFlight.set(actionKey, true);
    return true;
  }

  function endFlight(actionKey) {
    if (!actionKey) return;
    singleFlight.delete(actionKey);
  }

  function decideLocal(input = {}) {
    const errorCode = normalizeErrorCode(input.errorCode);
    const k = keyFor({ ...input, errorCode });

    if (AUTHORITATIVE_LOGOUT_CODES.has(errorCode)) {
      const allowLogout = onceEvery(logoutCooldown, `logout:${errorCode}`, LOGOUT_COOLDOWN_MS);
      return {
        ui: {
          type: "modal",
          severity: "error",
          message_key: errorCode,
          show: onceEvery(modalOnce, `modal:${k}`, MODAL_ONCE_WINDOW_MS),
        },
        auth: {
          signOut: allowLogout ? "local" : "none",
          authoritative: true,
        },
        retry: { allowed: false, backoff_ms: 0 },
        uam: { degrade_to: null, sensitive_only: true },
      };
    }

    if (TRANSIENT_CODES.has(errorCode) || errorCode === OBS_ERROR_CODES.UNKNOWN) {
      const budget = consumeBudget(
        retryBudget,
        `retry:${k}`,
        RETRY_BUDGET_WINDOW_MS,
        RETRY_BUDGET_MAX,
      );
      return {
        ui: {
          type: "modal",
          severity: "warning",
          message_key: errorCode,
          show: onceEvery(modalOnce, `modal:${k}`, MODAL_ONCE_WINDOW_MS),
        },
        auth: { signOut: "none", authoritative: false },
        retry: {
          allowed: budget.allowed,
          backoff_ms: budget.allowed ? budget.count * 800 : 0,
        },
        uam: {
          degrade_to: budget.allowed ? null : "reauth_sensitive",
          sensitive_only: true,
        },
      };
    }

    return {
      ui: { type: "none", severity: "info", message_key: null, show: false },
      auth: { signOut: "none", authoritative: false },
      retry: { allowed: false, backoff_ms: 0 },
      uam: { degrade_to: null, sensitive_only: true },
    };
  }

  return {
    decideLocal,
    beginFlight,
    endFlight,
  };
}
