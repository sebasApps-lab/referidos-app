import React, { useEffect, useState } from "react";
import { fetchSupportChatTickets } from "../services/supportChatClient";

export default function SupportChatTicketsBlock({ onBackToHub }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

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
          onClick={onBackToHub}
          className="text-xs font-semibold text-[#5E30A5]"
        >
          Crear nuevo ticket
        </button>
      </div>

      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
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
                        window.open(waLink, "_blank", "noopener");
                      }
                    }}
                    className="mt-3 text-xs font-semibold text-[#5E30A5]"
                  >
                    Abrir WhatsApp
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
