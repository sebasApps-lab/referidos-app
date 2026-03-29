import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@shared/services/mobileApi";
import {
  canPollByPolicy,
  canRealtimeByPolicy,
  createNotificationPolicy,
  fetchAppNotifications,
  markAllAppNotificationsRead,
  markAppNotificationsRead,
  normalizeNotificationRole,
} from "@shared/services/appNotifications";

type UseRoleNotificationsOptions = {
  role?: string | null;
  policy?: any;
  enabled?: boolean;
  limit?: number;
  scope?: string | null;
  unreadOnly?: boolean;
};

export function useRoleNotifications({
  role,
  policy: policyInput = null,
  enabled = true,
  limit = 30,
  scope = null,
  unreadOnly = false,
}: UseRoleNotificationsOptions = {}) {
  const normalizedRole = normalizeNotificationRole(role);
  const policy = useMemo(
    () => policyInput || createNotificationPolicy(normalizedRole),
    [normalizedRole, policyInput],
  );
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");

  const refresh = useCallback(
    async (force = false) => {
      if (!enabled) return;
      if (!force && !canPollByPolicy(policy) && rows.length > 0) return;
      setLoading(true);
      const result = await fetchAppNotifications({
        limit,
        unreadOnly,
      } as any);
      if (!result.ok) {
        setError(result.error || "notifications_fetch_failed");
      } else {
        setRows(result.data || []);
        setError("");
      }
      setLoading(false);
    },
    [enabled, limit, policy, rows.length, scope, unreadOnly],
  );

  const markRead = useCallback(async (ids: string[] = []) => {
    if (!enabled) return { ok: false, error: "notifications_disabled" };
    const result = await markAppNotificationsRead(ids);
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
  }, [enabled]);

  const markAllRead = useCallback(async () => {
    if (!enabled) return { ok: false, error: "notifications_disabled" };
    const result = await markAllAppNotificationsRead(scope ? String(scope) : null);
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
  }, [enabled, scope]);

  useEffect(() => {
    let disposed = false;
    if (!enabled) {
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
  }, [enabled, refresh]);

  useEffect(() => {
    if (!enabled || !canPollByPolicy(policy)) return undefined;
    const intervalMs = Math.max(1000, Number(policy.pollIntervalMs) || 0);
    if (!intervalMs) return undefined;
    const timer = globalThis.setInterval(() => {
      void refresh(true);
    }, intervalMs);
    return () => {
      globalThis.clearInterval(timer);
    };
  }, [enabled, policy, refresh]);

  useEffect(() => {
    if (!enabled || !canRealtimeByPolicy(policy)) return undefined;

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
  }, [enabled, normalizedRole, policy, refresh]);

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
