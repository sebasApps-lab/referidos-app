import React from "react";
import { CalendarClock, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

const MOCK_CARDS = [
  {
    id: "inbox",
    title: "Inbox operativo",
    body: "Gestiona tickets disponibles, asignados y resueltos desde una sola bandeja.",
    Icon: MessageSquare,
  },
  {
    id: "jornadas",
    title: "Jornadas y sesiones",
    body: "Revisa tu historial y estado actual para confirmar autorizacion y actividad.",
    Icon: CalendarClock,
  },
  {
    id: "quality",
    title: "Calidad de atencion",
    body: "Pronto veras indicadores consolidados para priorizar tiempos de respuesta.",
    Icon: ShieldCheck,
  },
];

export default function SupportInicio() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#F0EBFF] px-3 py-1 text-xs font-semibold text-[#5E30A5]">
          <Sparkles size={14} />
          Mockup operativo
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-[#2F1A55]">
          Bienvenido al panel de soporte
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Esta pantalla es un mockup inicial del home de soporte y sirve como punto de entrada
          rapido al flujo operativo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_CARDS.map((card) => (
          <div
            key={card.id}
            className="rounded-3xl border border-[#E9E2F7] bg-white p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F0EBFF] text-[#5E30A5]">
              <card.Icon size={18} />
            </div>
            <div className="mt-3 text-base font-semibold text-[#2F1A55]">
              {card.title}
            </div>
            <p className="mt-2 text-sm text-slate-500">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

