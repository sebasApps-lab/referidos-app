import React from "react";
import { Languages } from "lucide-react";

const DEFAULT_LANGUAGES = [
  { key: "es", label: "Espanol", flag: "ES" },
  { key: "en", label: "Ingles", flag: "EN" },
  { key: "fr", label: "Frances", flag: "FR" },
];

export default function LanguageSelector({
  value,
  onChange,
  options = DEFAULT_LANGUAGES,
}) {
  const language = value;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-[#2F1A55] flex items-center gap-2">
        <Languages size={14} />
        Idioma
      </p>
      <div className="grid gap-2">
        {options.map((item) => {
          const active = language === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange?.(item.key)}
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
  );
}
