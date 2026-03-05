import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { supabase } from "../../lib/supabaseClient";
import {
  createNotificationPolicy,
  useSupportWorkQueueNotifications,
} from "@referidos/notifications-sdk";
import { isSupportLiveUpdatesEnabled } from "../runtime/systemFeatureFlags";

export default function SupportWorkQueueDock() {
  const usuario = useAppStore((s) => s.usuario);
  const navigate = useNavigate();
  const liveUpdatesEnabled = isSupportLiveUpdatesEnabled();
  const lastAssignedNoticeIdRef = useRef("");
  const notificationPolicy = useMemo(
    () =>
      createNotificationPolicy(usuario?.role || "soporte", {
        mode: "hybrid",
        pollIntervalMs: 5000,
        realtime: Boolean(liveUpdatesEnabled),
        visibilityAware: true,
      }),
    [liveUpdatesEnabled, usuario?.role],
  );
  const {
    currentTicket,
    queueCount,
    notices,
  } = useSupportWorkQueueNotifications({
    supabase,
    user: usuario,
    policy: notificationPolicy,
    enabled: true,
  });
  const assignedNotice = notices.find(
    (notice) => String(notice?.eventType || "").toLowerCase() === "support.ticket.assigned",
  );

  useEffect(() => {
    const noticeId = String(assignedNotice?.id || "");
    if (!noticeId) return;
    if (lastAssignedNoticeIdRef.current === noticeId) return;
    lastAssignedNoticeIdRef.current = noticeId;
    if (typeof window === "undefined" || typeof window.dispatchEvent !== "function") return;
    try {
      if (typeof CustomEvent === "function") {
        window.dispatchEvent(
          new CustomEvent("support:ticket-assigned", {
            detail: {
              threadCode: assignedNotice?.threadCode || null,
              at: Date.now(),
            },
          }),
        );
        return;
      }
      if (typeof document !== "undefined" && typeof document.createEvent === "function") {
        const fallbackEvent = document.createEvent("Event");
        fallbackEvent.initEvent("support:ticket-assigned", false, false);
        window.dispatchEvent(fallbackEvent);
      }
    } catch {
      // no-op
    }
  }, [assignedNotice?.id, assignedNotice?.threadCode]);

  if (!currentTicket && queueCount === 0 && notices.length === 0) {
    return null;
  }
  const ticketCode = assignedNotice?.threadCode || currentTicket?.public_id || null;
  const headline = ticketCode
    ? `Se te asigno el ticket ${ticketCode}`
    : "Operacion actual";

  return (
    <div className="fixed left-1/2 top-0 z-[200] -translate-x-1/2">
      <div className="flex max-w-[92vw] items-center gap-2 whitespace-nowrap rounded-b-2xl border-x border-b border-t-0 border-[#BCC5D1] bg-slate-100/92 px-3 py-2 text-sm font-semibold text-[#2F1A55] shadow-lg backdrop-blur">
        <span className="truncate">{headline}</span>
        <span className="mx-2 text-slate-400">|</span>
        <span className="text-slate-600">En cola: {queueCount}</span>
        {ticketCode ? (
          <button
            type="button"
            onClick={() => navigate(`/soporte/ticket/${ticketCode}`)}
            className="ml-3 rounded-xl bg-[#5E30A5] px-3 py-1 text-xs font-semibold text-white"
          >
            Ir -&gt;
          </button>
        ) : null}
      </div>
    </div>
  );
}
