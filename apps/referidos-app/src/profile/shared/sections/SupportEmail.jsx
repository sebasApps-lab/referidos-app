import React from "react";
import { ChevronLeft, Mail } from "lucide-react";

const SUPPORT_EMAIL = "soporte@referidosapp.ec";

export default function SupportEmail({ onBack }) {
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
            Soporte por correo
          </h3>
          <p className="text-xs text-slate-500">
            Comparte tu caso por email y adjunta capturas si es necesario.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 space-y-4">
        <div className="text-xs text-slate-500">
          Escribe a:
        </div>
        <div className="text-sm font-semibold text-[#2F1A55]">
          {SUPPORT_EMAIL}
        </div>
        <button
          type="button"
          onClick={() => {
            window.location.href = `mailto:${SUPPORT_EMAIL}`;
          }}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white"
        >
          <Mail size={16} />
          Enviar correo
        </button>
      </div>
    </div>
  );
}
