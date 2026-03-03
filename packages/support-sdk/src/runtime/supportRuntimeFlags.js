import { supabase } from "../../lib/supabaseClient";

const CHANGE_EVENT = "referidos:support-runtime-flags:changed";

export const DEFAULT_SUPPORT_RUNTIME_FLAGS = Object.freeze({
  require_session_authorization: false,
  require_jornada_authorization: true,
  auto_assign_enabled: true,
  max_assigned_tickets: 5,
  max_processing_tickets: 1,
  wait_user_to_personal_queue_minutes: 10,
  personal_queue_release_minutes: 5,
  personal_queue_release_overload_minutes: 1,
  personal_queue_overload_threshold: 5,
  retake_reassignment_window_mode: "7d",
  retake_reassignment_window_hours: 168,
  retake_reassignment_multiplier: 1.25,
});

let cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };

function hasWindow() {
  return typeof window !== "undefined";
}

function asInt(value, fallback, min = 1, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.trunc(parsed)));
}

function asNumber(value, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function normalizeSupportRuntimeFlags(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
  }
  const mode = String(raw.retake_reassignment_window_mode || "7d")
    .trim()
    .toLowerCase();
  const normalized = {
    require_session_authorization: Boolean(raw.require_session_authorization),
    require_jornada_authorization: Boolean(raw.require_jornada_authorization),
    auto_assign_enabled: Boolean(
      raw.auto_assign_enabled ?? DEFAULT_SUPPORT_RUNTIME_FLAGS.auto_assign_enabled
    ),
    max_assigned_tickets: asInt(
      raw.max_assigned_tickets,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.max_assigned_tickets,
      1,
      50
    ),
    max_processing_tickets: asInt(
      raw.max_processing_tickets,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.max_processing_tickets,
      1,
      10
    ),
    wait_user_to_personal_queue_minutes: asInt(
      raw.wait_user_to_personal_queue_minutes,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.wait_user_to_personal_queue_minutes,
      1,
      1440
    ),
    personal_queue_release_minutes: asInt(
      raw.personal_queue_release_minutes,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.personal_queue_release_minutes,
      1,
      1440
    ),
    personal_queue_release_overload_minutes: asInt(
      raw.personal_queue_release_overload_minutes,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.personal_queue_release_overload_minutes,
      1,
      1440
    ),
    personal_queue_overload_threshold: asInt(
      raw.personal_queue_overload_threshold,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.personal_queue_overload_threshold,
      1,
      200
    ),
    retake_reassignment_window_mode: ["2d", "7d", "15d", "manual"].includes(mode)
      ? mode
      : DEFAULT_SUPPORT_RUNTIME_FLAGS.retake_reassignment_window_mode,
    retake_reassignment_window_hours: asInt(
      raw.retake_reassignment_window_hours,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.retake_reassignment_window_hours,
      1,
      1440
    ),
    retake_reassignment_multiplier: asNumber(
      raw.retake_reassignment_multiplier,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.retake_reassignment_multiplier,
      1,
      5
    ),
  };
  if (normalized.max_processing_tickets > normalized.max_assigned_tickets) {
    normalized.max_processing_tickets = normalized.max_assigned_tickets;
  }
  return normalized;
}

function emitFlagsChange(nextFlags) {
  if (!hasWindow()) return;
  try {
    window.dispatchEvent(
      new CustomEvent(CHANGE_EVENT, {
        detail: nextFlags,
      })
    );
  } catch {
    // no-op
  }
}

export function getCachedSupportRuntimeFlags() {
  return { ...cachedFlags };
}

export async function fetchSupportRuntimeFlags({ force = false } = {}) {
  if (!force && cachedFlags) {
    return { ...cachedFlags };
  }

  try {
    const { data, error } = await supabase
      .from("support_runtime_flags")
      .select(
        "require_session_authorization, require_jornada_authorization, auto_assign_enabled, max_assigned_tickets, max_processing_tickets, wait_user_to_personal_queue_minutes, personal_queue_release_minutes, personal_queue_release_overload_minutes, personal_queue_overload_threshold, retake_reassignment_window_mode, retake_reassignment_window_hours, retake_reassignment_multiplier"
      )
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
      return { ...cachedFlags };
    }

    cachedFlags = normalizeSupportRuntimeFlags(data);
    return { ...cachedFlags };
  } catch {
    cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
    return { ...cachedFlags };
  }
}

export async function updateSupportRuntimeFlags(
  patch = {},
  { updatedBy = null } = {}
) {
  const current = await fetchSupportRuntimeFlags();
  const nextPayload = normalizeSupportRuntimeFlags({
    ...current,
    ...patch,
  });

  const upsertPayload = {
    id: 1,
    ...nextPayload,
  };
  if (updatedBy) upsertPayload.updated_by = updatedBy;

  const { data, error } = await supabase
    .from("support_runtime_flags")
    .upsert(upsertPayload, { onConflict: "id" })
    .select(
      "require_session_authorization, require_jornada_authorization, auto_assign_enabled, max_assigned_tickets, max_processing_tickets, wait_user_to_personal_queue_minutes, personal_queue_release_minutes, personal_queue_release_overload_minutes, personal_queue_overload_threshold, retake_reassignment_window_mode, retake_reassignment_window_hours, retake_reassignment_multiplier"
    )
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      error: error.message || "No se pudo actualizar support_runtime_flags",
      flags: { ...current },
    };
  }

  cachedFlags = normalizeSupportRuntimeFlags(data || nextPayload);
  emitFlagsChange(cachedFlags);
  return { ok: true, flags: { ...cachedFlags } };
}

export async function setSupportRuntimeFlag(
  flagKey,
  enabled,
  { updatedBy = null } = {}
) {
  return updateSupportRuntimeFlags(
    {
      [flagKey]: Boolean(enabled),
    },
    { updatedBy }
  );
}

export function subscribeSupportRuntimeFlags(onChange) {
  if (!hasWindow() || typeof onChange !== "function") {
    return () => {};
  }

  const onCustomChange = (event) => {
    const nextFlags = normalizeSupportRuntimeFlags(event?.detail);
    onChange(nextFlags);
  };

  window.addEventListener(CHANGE_EVENT, onCustomChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onCustomChange);
  };
}
