import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import SupportChatHubBlock from "../blocks/SupportChatHubBlock";
import SupportChatTicketsBlock from "../blocks/SupportChatTicketsBlock";

export default function SupportChat({ role, onBack }) {
  const [view, setView] = useState("hub");

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="mt-0.5 h-9 w-9 rounded-full border border-[#E9E2F7] bg-white text-[#5E30A5] flex items-center justify-center transition hover:bg-[#F4EEFF]"
            aria-label="Volver"
          >
            <ChevronLeft size={18} />
          </button>
        ) : null}
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">
            Chatear con un asesor
          </h3>
          <p className="text-xs text-slate-500">
            Crea un ticket y abre WhatsApp con el mensaje listo.
          </p>
        </div>
      </div>

      {view === "tickets" ? (
        <SupportChatTicketsBlock onBackToHub={() => setView("hub")} />
      ) : (
        <SupportChatHubBlock
          role={role}
          onShowTickets={() => setView("tickets")}
        />
      )}
    </div>
  );
}
