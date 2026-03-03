import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
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
    dismissNotice,
  } = useSupportWorkQueueNotifications({
    supabase,
    user: usuario,
    policy: notificationPolicy,
    enabled: true,
  });

  if (!currentTicket && queueCount === 0 && notices.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[45] space-y-2">
      {notices.map((notice) => (
        <div
          key={notice.id}
          className="flex max-w-sm items-start gap-2 rounded-xl border border-[#E8DDF8] bg-white px-3 py-2 text-xs text-[#2F1A55] shadow-md"
        >
          <div className="flex-1">{notice.message}</div>
          <button
            type="button"
            onClick={() => dismissNotice(notice.id)}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Cerrar aviso"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      {currentTicket || queueCount > 0 ? (
        <div className="flex min-w-[280px] items-center gap-3 rounded-2xl border border-[#E2D7F5] bg-white px-3 py-2 shadow-lg">
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[#6A43A7]/70">
              Operacion actual
            </div>
            <div className="text-sm font-semibold text-[#2F1A55]">
              {currentTicket
                ? `Ticket ${currentTicket.public_id}: ${
                    currentTicket.status === "starting" ? "Starting" : "En progreso"
                  }`
                : "Sin ticket en curso"}
            </div>
            <div className="text-xs text-slate-500">En cola: {queueCount}</div>
          </div>
          {currentTicket ? (
            <button
              type="button"
              onClick={() => navigate(`/soporte/ticket/${currentTicket.public_id}`)}
              className="inline-flex items-center gap-1 rounded-full bg-[#5E30A5] px-3 py-1 text-xs font-semibold text-white"
            >
              Ir
              <ArrowRight size={12} />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
