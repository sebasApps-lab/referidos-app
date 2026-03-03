import { useEffect, useMemo, useRef, useState } from "react";
import { createNotificationPolicy } from "./policies.js";
import { useRoleNotifications } from "./useRoleNotifications.js";

const ACTIVE_STATUSES = ["starting", "in_progress", "waiting_user", "queued"];

function statusPriority(status) {
  if (status === "starting") return 0;
  if (status === "in_progress") return 1;
  if (status === "waiting_user") return 2;
  return 3;
}

function formatSupportNotice(row) {
  const eventType = String(row?.event_type || "").trim().toLowerCase();
  const payload = row?.payload && typeof row.payload === "object" ? row.payload : {};
  const threadCode =
    String(payload.thread_public_id || payload.public_id || payload.thread_code || "").trim();
  if (eventType === "support.ticket.assigned") {
    return threadCode ? `Ticket asignado: ${threadCode}` : row.body || row.title || "Ticket asignado";
  }
  if (eventType === "support.ticket.personal_queue_timeout") {
    return threadCode
      ? `Ticket ${threadCode} paso a cola personal`
      : row.body || row.title || "Ticket paso a cola personal";
  }
  return row.body || row.title || "Notificacion de soporte";
}

export function useSupportWorkQueueNotifications({
  supabase,
  user,
  policy: policyInput = null,
  enabled = true,
} = {}) {
  const role = String(user?.role || "").trim().toLowerCase();
  const isSupportRole = role === "soporte" || role === "admin";
  const policy = useMemo(
    () => policyInput || createNotificationPolicy(role || "soporte"),
    [policyInput, role],
  );
  const [rows, setRows] = useState([]);
  const [notices, setNotices] = useState([]);
  const timersRef = useRef(new Map());
  const consumedRef = useRef(new Set());

  const notifications = useRoleNotifications({
    supabase,
    role,
    policy,
    enabled: Boolean(enabled && isSupportRole),
    scope: "support",
    unreadOnly: true,
    limit: 30,
  });

  const clearNoticeTimer = (id) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      globalThis.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  };

  const dismissNotice = (id) => {
    clearNoticeTimer(id);
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
  };

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => globalThis.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  useEffect(() => {
    if (!enabled || !isSupportRole || !supabase || !user?.id) {
      setRows([]);
      return undefined;
    }
    let disposed = false;

    const fetchRows = async () => {
      const { data } = await supabase
        .from("support_threads")
        .select("public_id, status, personal_queue, assigned_agent_id, updated_at")
        .eq("assigned_agent_id", user.id)
        .in("status", ACTIVE_STATUSES)
        .order("updated_at", { ascending: false });

      if (disposed) return;
      setRows(data || []);
    };

    void fetchRows();

    let timer = null;
    if (["poll", "hybrid"].includes(String(policy.mode || ""))) {
      const pollMs = Math.max(1000, Number(policy.pollIntervalMs) || 5000);
      timer = globalThis.setInterval(() => {
        if (
          policy.visibilityAware &&
          typeof document !== "undefined" &&
          document.visibilityState !== "visible"
        ) {
          return;
        }
        void fetchRows();
      }, pollMs);
    }

    let channel = null;
    if (policy.realtime) {
      channel = supabase
        .channel(`support-work-queue-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "support_threads",
            filter: `assigned_agent_id=eq.${user.id}`,
          },
          () => {
            void fetchRows();
          },
        )
        .subscribe();
    }

    return () => {
      disposed = true;
      if (timer) globalThis.clearInterval(timer);
      if (channel) supabase.removeChannel(channel);
    };
  }, [enabled, isSupportRole, policy.mode, policy.pollIntervalMs, policy.realtime, policy.visibilityAware, supabase, user?.id]);

  useEffect(() => {
    const unreadRows = (notifications.rows || []).filter((row) => !row.is_read);
    const nextRows = unreadRows.filter((row) => !consumedRef.current.has(String(row.id)));
    if (!nextRows.length) return;

    nextRows.forEach((row) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const message = formatSupportNotice(row);
      setNotices((prev) => [...prev, { id, message }]);
      const timer = globalThis.setTimeout(() => {
        dismissNotice(id);
      }, 2000);
      timersRef.current.set(id, timer);
      consumedRef.current.add(String(row.id));
      void notifications.markRead([row.id]);
    });
  }, [notifications.rows]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentTicket = useMemo(
    () =>
      rows
        .filter((row) => ["starting", "in_progress", "waiting_user"].includes(row.status))
        .sort((a, b) => {
          const priorityDiff = statusPriority(a.status) - statusPriority(b.status);
          if (priorityDiff !== 0) return priorityDiff;
          return Date.parse(b.updated_at || "") - Date.parse(a.updated_at || "");
        })[0] || null,
    [rows],
  );

  const queueCount = useMemo(
    () => rows.filter((row) => row.status === "queued" && row.personal_queue === true).length,
    [rows],
  );

  return {
    currentTicket,
    queueCount,
    notices,
    dismissNotice,
    loading: notifications.loading,
    refresh: notifications.refresh,
  };
}
