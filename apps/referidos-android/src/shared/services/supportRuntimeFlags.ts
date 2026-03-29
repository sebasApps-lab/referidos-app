import { supabase } from "@shared/services/mobileApi";

export type SupportRuntimeFlags = {
  require_session_authorization: boolean;
  require_jornada_authorization: boolean;
  auto_assign_enabled: boolean;
  max_assigned_tickets: number;
  max_processing_tickets: number;
  wait_user_to_personal_queue_minutes: number;
  personal_queue_release_minutes: number;
  personal_queue_release_overload_minutes: number;
  personal_queue_overload_threshold: number;
  retake_reassignment_window_mode: "2d" | "7d" | "15d" | "manual";
  retake_reassignment_window_hours: number;
  retake_reassignment_multiplier: number;
};

export const DEFAULT_SUPPORT_RUNTIME_FLAGS: SupportRuntimeFlags = Object.freeze({
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

const listeners = new Set<(flags: SupportRuntimeFlags) => void>();
let cachedFlags: SupportRuntimeFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
let hasFetchedFlags = false;

function asInt(value: any, fallback: number, min = 1, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, Math.trunc(parsed)));
}

function asNumber(value: any, fallback: number, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(min, Math.min(max, parsed));
}

function normalizeSupportRuntimeFlags(raw: any): SupportRuntimeFlags {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
  }
  const mode = String(raw.retake_reassignment_window_mode || "7d")
    .trim()
    .toLowerCase();
  const normalized: SupportRuntimeFlags = {
    require_session_authorization: Boolean(raw.require_session_authorization),
    require_jornada_authorization: Boolean(raw.require_jornada_authorization),
    auto_assign_enabled: Boolean(
      raw.auto_assign_enabled ?? DEFAULT_SUPPORT_RUNTIME_FLAGS.auto_assign_enabled,
    ),
    max_assigned_tickets: asInt(
      raw.max_assigned_tickets,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.max_assigned_tickets,
      1,
      50,
    ),
    max_processing_tickets: asInt(
      raw.max_processing_tickets,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.max_processing_tickets,
      1,
      10,
    ),
    wait_user_to_personal_queue_minutes: asInt(
      raw.wait_user_to_personal_queue_minutes,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.wait_user_to_personal_queue_minutes,
      1,
      1440,
    ),
    personal_queue_release_minutes: asInt(
      raw.personal_queue_release_minutes,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.personal_queue_release_minutes,
      1,
      1440,
    ),
    personal_queue_release_overload_minutes: asInt(
      raw.personal_queue_release_overload_minutes,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.personal_queue_release_overload_minutes,
      1,
      1440,
    ),
    personal_queue_overload_threshold: asInt(
      raw.personal_queue_overload_threshold,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.personal_queue_overload_threshold,
      1,
      200,
    ),
    retake_reassignment_window_mode: (["2d", "7d", "15d", "manual"].includes(mode)
      ? mode
      : DEFAULT_SUPPORT_RUNTIME_FLAGS.retake_reassignment_window_mode) as SupportRuntimeFlags["retake_reassignment_window_mode"],
    retake_reassignment_window_hours: asInt(
      raw.retake_reassignment_window_hours,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.retake_reassignment_window_hours,
      1,
      1440,
    ),
    retake_reassignment_multiplier: asNumber(
      raw.retake_reassignment_multiplier,
      DEFAULT_SUPPORT_RUNTIME_FLAGS.retake_reassignment_multiplier,
      1,
      5,
    ),
  };
  if (normalized.max_processing_tickets > normalized.max_assigned_tickets) {
    normalized.max_processing_tickets = normalized.max_assigned_tickets;
  }
  return normalized;
}

function emitFlagsChange(nextFlags: SupportRuntimeFlags) {
  listeners.forEach((listener) => {
    try {
      listener({ ...nextFlags });
    } catch {
      // no-op
    }
  });
}

export function getCachedSupportRuntimeFlags() {
  return { ...cachedFlags };
}

export async function fetchSupportRuntimeFlags({ force = false } = {}) {
  if (!force && hasFetchedFlags) {
    return { ...cachedFlags };
  }

  try {
    const { data, error } = await supabase
      .from("support_runtime_flags")
      .select(
        "require_session_authorization, require_jornada_authorization, auto_assign_enabled, max_assigned_tickets, max_processing_tickets, wait_user_to_personal_queue_minutes, personal_queue_release_minutes, personal_queue_release_overload_minutes, personal_queue_overload_threshold, retake_reassignment_window_mode, retake_reassignment_window_hours, retake_reassignment_multiplier",
      )
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
      hasFetchedFlags = true;
      return { ...cachedFlags };
    }

    cachedFlags = normalizeSupportRuntimeFlags(data);
    hasFetchedFlags = true;
    return { ...cachedFlags };
  } catch {
    cachedFlags = { ...DEFAULT_SUPPORT_RUNTIME_FLAGS };
    hasFetchedFlags = true;
    return { ...cachedFlags };
  }
}

export async function updateSupportRuntimeFlags(
  patch: Partial<SupportRuntimeFlags> = {},
  { updatedBy = null }: { updatedBy?: string | null } = {},
) {
  const current = await fetchSupportRuntimeFlags();
  const nextPayload = normalizeSupportRuntimeFlags({
    ...current,
    ...patch,
  });

  const upsertPayload: Record<string, any> = {
    id: 1,
    ...nextPayload,
  };
  if (updatedBy) upsertPayload.updated_by = updatedBy;

  const { data, error } = await supabase
    .from("support_runtime_flags")
    .upsert(upsertPayload, { onConflict: "id" })
    .select(
      "require_session_authorization, require_jornada_authorization, auto_assign_enabled, max_assigned_tickets, max_processing_tickets, wait_user_to_personal_queue_minutes, personal_queue_release_minutes, personal_queue_release_overload_minutes, personal_queue_overload_threshold, retake_reassignment_window_mode, retake_reassignment_window_hours, retake_reassignment_multiplier",
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
  hasFetchedFlags = true;
  emitFlagsChange(cachedFlags);
  return { ok: true, flags: { ...cachedFlags } };
}

export async function setSupportRuntimeFlag(
  flagKey: keyof SupportRuntimeFlags,
  enabled: boolean,
  { updatedBy = null }: { updatedBy?: string | null } = {},
) {
  return updateSupportRuntimeFlags(
    {
      [flagKey]: Boolean(enabled),
    } as Partial<SupportRuntimeFlags>,
    { updatedBy },
  );
}

export function subscribeSupportRuntimeFlags(onChange: (flags: SupportRuntimeFlags) => void) {
  if (typeof onChange !== "function") return () => {};
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}
