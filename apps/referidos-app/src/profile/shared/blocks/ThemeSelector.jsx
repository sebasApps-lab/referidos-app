import React from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSelector({ value, onChange }) {
  const theme = value;

  return (
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
                onClick={() => onChange?.(item.key)}
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
  );
}
