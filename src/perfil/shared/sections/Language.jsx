import React, { useState } from "react";
import { Languages } from "lucide-react";

export default function Language() {
  const [language, setLanguage] = useState("es");

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Idioma
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Ajusta el idioma de la app.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#2F1A55] flex items-center gap-2">
          <Languages size={14} />
          Idioma
        </p>
        <div className="grid gap-2">
          {[
            { key: "es", label: "Espanol", flag: "ES" },
            { key: "en", label: "Ingles", flag: "EN" },
            { key: "fr", label: "Frances", flag: "FR" },
          ].map((item) => {
            const active = language === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setLanguage(item.key)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "border-[#5E30A5] bg-[#F3EEFF] text-[#5E30A5]"
                    : "border-[#E9E2F7] bg-white text-slate-600"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
                      active ? "bg-[#5E30A5] text-white" : "bg-[#F3EEFF] text-[#5E30A5]"
                    }`}
                  >
                    {item.flag}
                  </span>
                  {item.label}
                </span>
                {active ? (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                    Actual
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
