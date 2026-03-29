import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createNotificationPolicy,
  canPollByPolicy,
  canRealtimeByPolicy,
  normalizeNotificationRole,
} from "./policies.js";
import {
  fetchAppNotifications,
  markAllAppNotificationsRead,
  markAppNotificationsRead,
} from "./appNotificationsSource.js";

function withVisibleGuard(policy, force = false) {
  if (force) return true;
  if (!policy?.visibilityAware) return true;
  if (typeof document === "undefined") return true;
  return document.visibilityState === "visible";
}

export function useRoleNotifications({
  supabase,
  role,
  policy: policyInput = null,
  enabled = true,
  limit = 30,
  scope = null,
  unreadOnly = false,
} = {}) {
  const normalizedRole = normalizeNotificationRole(role);
  const policy = useMemo(
    () => policyInput || createNotificationPolicy(normalizedRole),
    [normalizedRole, policyInput],
  );
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  const refresh = useCallback(
    async (force = false) => {
      if (!enabled) return;
      if (!supabase) return;
      if (!withVisibleGuard(policy, force)) return;
      setLoading(true);
      const result = await fetchAppNotifications({
        supabase,
        limit,
        unreadOnly,
        scope,
      });
      if (!result.ok) {
        setError(result.error || "notifications_fetch_failed");
      } else {
        setRows(result.data || []);
        setError("");
      }
      setLoading(false);
    },
    [enabled, limit, policy, scope, supabase, unreadOnly],
  );

  const markRead = useCallback(
    async (ids = []) => {
      if (!enabled || !supabase) return { ok: false, error: "notifications_disabled" };
      const result = await markAppNotificationsRead({ supabase, ids });
      if (result.ok) {
        const selected = new Set((ids || []).map((value) => String(value)));
        setRows((prev) =>
          prev.map((row) =>
            selected.has(String(row.id))
              ? { ...row, is_read: true, read_at: row.read_at || new Date().toISOString() }
              : row,
          ),
        );
      }
      return result;
    },
    [enabled, supabase],
  );

  const markAllRead = useCallback(async () => {
    if (!enabled || !supabase) return { ok: false, error: "notifications_disabled" };
    const result = await markAllAppNotificationsRead({ supabase, scope });
    if (result.ok) {
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          is_read: true,
          read_at: row.read_at || new Date().toISOString(),
        })),
      );
    }
    return result;
  }, [enabled, scope, supabase]);

  useEffect(() => {
    let disposed = false;
    if (!enabled || !supabase) {
      setRows([]);
      setLoading(false);
      setError("");
      return undefined;
    }

    const run = async () => {
      if (disposed) return;
      await refresh(true);
    };
    void run();

    return () => {
      disposed = true;
    };
  }, [enabled, refresh, supabase]);

  useEffect(() => {
    if (!enabled || !supabase || !canPollByPolicy(policy)) return undefined;
    const intervalMs = Math.max(1000, Number(policy.pollIntervalMs) || 0);
    if (!intervalMs) return undefined;
    const timer = globalThis.setInterval(() => {
      void refresh(false);
    }, intervalMs);
    return () => {
      globalThis.clearInterval(timer);
    };
  }, [enabled, policy, refresh, supabase]);

  useEffect(() => {
    if (!enabled || !supabase || !canRealtimeByPolicy(policy)) return undefined;

    const channel = supabase
      .channel(`app-notifications-${normalizedRole}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "app_notifications",
        },
        () => {
          void refresh(true);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, normalizedRole, policy, refresh, supabase]);

  const unreadCount = useMemo(
    () => rows.filter((row) => !row.is_read).length,
    [rows],
  );

  return {
    rows,
    loading,
    error,
    unreadCount,
    refresh,
    markRead,
    markAllRead,
    policy,
    role: normalizedRole,
  };
}
