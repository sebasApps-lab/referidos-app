import React from "react";

export default function SupportHelp() {
  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Ayuda
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Encuentra respuestas rapidas y soporte de la app.
        </p>
      </div>
      <div className="space-y-3">
        {[
          "Preguntas frecuentes",
          "Recibir soporte por correo",
          "Chatear con un asesor",
        ].map((item) => (
          <button
            key={item}
            type="button"
            className="w-full rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3 text-left text-sm font-semibold text-[#2F1A55]"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
