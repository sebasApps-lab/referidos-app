import React, { useEffect, useMemo, useState } from "react";
import {
  fetchSupportChatTickets,
  requestSupportChatRetake,
} from "../services/supportChatClient";
import { logCatalogBreadcrumb } from "../../../services/loggingClient";
import { useAppStore } from "../../../store/appStore";
import { supabase } from "../../../lib/supabaseClient";
import {
  createNotificationPolicy,
  useRoleNotifications,
} from "@referidos/notifications-sdk";

export default function SupportChatTicketsBlock({ onBackToHub }) {
  const usuario = useAppStore((s) => s.usuario);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retakeTarget, setRetakeTarget] = useState(null);
  const [retakeLoading, setRetakeLoading] = useState(false);
  const [retakeError, setRetakeError] = useState("");
  const notificationsPolicy = useMemo(
    () =>
      createNotificationPolicy(usuario?.role || "cliente", {
        mode: "mount",
        realtime: false,
        pollIntervalMs: 0,
        visibilityAware: false,
      }),
    [usuario?.role],
  );
  const { unreadCount } = useRoleNotifications({
    supabase,
    role: usuario?.role || "cliente",
    policy: notificationsPolicy,
    enabled: Boolean(usuario?.id),
    scope: "support",
    unreadOnly: true,
    limit: 20,
  });

  useEffect(() => {
    let active = true;
    const loadTickets = async () => {
      setLoading(true);
      const result = await fetchSupportChatTickets();
      if (!active) return;
      if (result.ok) {
        setTickets(result.data);
      }
      setLoading(false);
    };
    loadTickets();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-[#2F1A55]">Mis tickets</div>
        <button
          type="button"
          onClick={() => {
            logCatalogBreadcrumb("support.flow.step", {
              step: "tickets_back_to_hub",
            });
            onBackToHub?.();
          }}
          className="text-xs font-semibold text-[#5E30A5]"
        >
          Crear nuevo ticket
        </button>
      </div>

      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
        {unreadCount > 0 ? (
          <div className="rounded-xl border border-[#E9E2F7] bg-[#F6F0FF] px-3 py-2 text-xs text-[#4A2B7A]">
            Tienes {unreadCount} notificacion{unreadCount === 1 ? "" : "es"} reciente
            {unreadCount === 1 ? "" : "s"} de soporte.
          </div>
        ) : null}
        {loading ? (
          <div className="text-sm text-slate-500">Cargando tickets...</div>
        ) : tickets.length === 0 ? (
          <div className="text-sm text-slate-500">
            Aun no tienes tickets registrados.
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.public_id}
                className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{ticket.category}</span>
                  <span>{ticket.status}</span>
                </div>
                <div className="text-sm font-semibold text-[#2F1A55] mt-1">
                  {ticket.summary || `Ticket ${ticket.public_id}`}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {new Date(ticket.created_at).toLocaleString()}
                </div>
                {ticket.resolution ? (
                  <div className="text-xs text-slate-500 mt-2">
                    Resolucion: {ticket.resolution}
                  </div>
                ) : null}
                {ticket.status !== "closed" && ticket.status !== "cancelled" ? (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const phone = (ticket.assigned_agent_phone || "").replace(
                          /\D/g,
                          ""
                        );
                        const message = ticket.wa_message_text || "";
                        const waLink = phone && message
                          ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
                          : ticket.wa_link;
                        if (waLink) {
                          logCatalogBreadcrumb("support.ticket.whatsapp.open", {
                            source: "ticket_list",
                            thread_public_id: ticket.public_id || null,
                            status: ticket.status || null,
                          });
                          window.open(waLink, "_blank", "noopener");
                        }
                      }}
                      className="text-xs font-semibold text-[#5E30A5]"
                    >
                      Abrir WhatsApp
                    </button>
                    {ticket.status === "queued" && ticket.personal_queue === false ? (
                      <>
                        <span className="text-[11px] text-amber-700">
                          El ticket excedio tiempo maximo de respuesta y fue puesto en espera.
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setRetakeError("");
                            setRetakeTarget(ticket);
                          }}
                          disabled={Boolean(ticket.retake_requested_at)}
                          className="rounded-full border border-[#E9E2F7] px-3 py-1 text-[11px] font-semibold text-[#5E30A5] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {ticket.retake_requested_at ? "Retomar solicitado" : "Retomar ticket"}
                        </button>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {retakeTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-2xl">
            <div className="text-sm font-semibold text-[#2F1A55]">
              Retomar ticket {retakeTarget.public_id}
            </div>
            <div className="mt-2 text-xs text-slate-600">
              Al confirmar, el ticket vuelve a cola general de reasignacion. Tiempo aproximado para encontrar asesor: 5-10 minutos.
            </div>
            {retakeError ? (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                {retakeError}
              </div>
            ) : null}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setRetakeTarget(null)}
                className="flex-1 rounded-xl border border-[#E9E2F7] px-3 py-2 text-xs font-semibold text-slate-600"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={retakeLoading}
                onClick={async () => {
                  setRetakeLoading(true);
                  setRetakeError("");
                  const result = await requestSupportChatRetake({
                    thread_public_id: retakeTarget.public_id,
                  });
                  setRetakeLoading(false);
                  if (!result.ok || !result.data?.ok) {
                    setRetakeError(result.error || result.data?.error || "No se pudo retomar el ticket.");
                    return;
                  }
                  setTickets((prev) =>
                    prev.map((ticket) =>
                      ticket.public_id === retakeTarget.public_id
                        ? {
                            ...ticket,
                            retake_requested_at:
                              result.data.retake_requested_at || new Date().toISOString(),
                          }
                        : ticket
                    )
                  );
                  setRetakeTarget(null);
                }}
                className="flex-1 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white disabled:bg-[#C9B6E8]"
              >
                {retakeLoading ? "Enviando..." : "Confirmar retomar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
