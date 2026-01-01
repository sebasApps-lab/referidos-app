import React, { useState } from "react";
import { Moon, Sun, Type } from "lucide-react";

export default function AppAppearance() {
  const [theme, setTheme] = useState("claro");
  const [font, setFont] = useState("actual");

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Apariencia
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Ajusta la apariencia de la app.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#2F1A55] flex items-center gap-2">
          <Moon size={14} />
          Tema
        </p>
        <div className="flex justify-center">
          <div className="relative inline-flex rounded-full border border-[#E9E2F7] bg-white p-1">
            <span
              className={`absolute top-1 bottom-1 rounded-full bg-[#5E30A5] transition-all duration-200 ${
                theme === "claro" ? "left-1 right-1/2" : "left-1/2 right-1"
              }`}
            />
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
                  className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    active ? "text-white" : "text-slate-500"
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#2F1A55] flex items-center gap-2">
          <Type size={14} />
          Fuente de texto
        </p>
        <div className="flex justify-center">
          <div className="inline-flex overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white">
            {[
              { key: "actual", label: "Actual" },
              { key: "serif", label: "Serif" },
              { key: "mono", label: "Mono" },
            ].map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFont(item.key)}
                className={`border-r border-[#E9E2F7] px-4 py-2 text-xs font-semibold transition ${
                  font === item.key
                    ? "bg-[#5E30A5] text-white"
                    : "bg-white text-slate-500"
                } ${index === 0 ? "rounded-l-2xl" : ""} ${
                  index === 2 ? "rounded-r-2xl border-r-0" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
