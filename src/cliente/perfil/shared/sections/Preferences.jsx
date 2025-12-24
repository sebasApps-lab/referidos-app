import React, { useState } from "react";
import { Languages, Moon, Sun, Type } from "lucide-react";

export default function Preferences() {
  const [theme, setTheme] = useState("claro");
  const [font, setFont] = useState("actual");
  const [language, setLanguage] = useState("es");
  const [status, setStatus] = useState("");

  const handleSave = () => {
    setStatus("Cambios guardados");
    alert("Datos guardados");
  };

  return (
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#1D1B1A]">
          Preferencias
        </h3>
        <p className="text-xs text-black/50">
          Ajusta la apariencia y el idioma.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 space-y-3">
        <p className="text-xs font-semibold text-black/70 flex items-center gap-2">
          <MoonStar size={14} />
          Tema
        </p>
        <div className="flex gap-2">
          {[
          { key: "claro", label: "Claro", icon: Sun },
          { key: "oscuro", label: "Oscuro", icon: Moon },
          ].map((item) => {
            const Icon = item.icon;
            const active = theme === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTheme(item.key)}
                className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold ${
                  active
                    ? "border-black/10 bg-[#1D1B1A] text-white"
                    : "border-black/10 bg-white text-black/60"
                }`}
              >
                <Icon size={14} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 space-y-3">
        <p className="text-xs font-semibold text-black/70 flex items-center gap-2">
          <Type size={14} />
          Fuente de texto
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { key: "actual", label: "Actual" },
            { key: "serif", label: "Serif" },
            { key: "mono", label: "Mono" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFont(item.key)}
              className={`rounded-2xl border px-3 py-2 text-xs font-semibold ${
                font === item.key
                  ? "border-black/10 bg-[#1D1B1A] text-white"
                  : "border-black/10 bg-white text-black/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 space-y-3">
        <p className="text-xs font-semibold text-black/70 flex items-center gap-2">
          <Languages size={14} />
          Idioma
        </p>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-black/70"
        >
          <option value="es">Espanol</option>
          <option value="en">Ingles</option>
          <option value="fr">Frances</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-2xl bg-[#1D1B1A] px-4 py-2 text-xs font-semibold text-white shadow"
        >
          Guardar cambios
        </button>
        <span className="text-xs text-black/50">{status}</span>
      </div>
    </section>
  );
}
