import React from "react";
import { Type } from "lucide-react";

export default function FontSelector({ value, onChange }) {
  const font = value;

  return (
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
              onClick={() => onChange?.(item.key)}
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
  );
}
