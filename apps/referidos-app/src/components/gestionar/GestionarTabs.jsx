// src/components/gestionar/GestionarTabs.jsx
import React from "react";
import { motion } from "framer-motion";

export default function GestionarTabs({ tabs, activeId, onChange }) {
  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-1 shadow-sm">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const active = tab.id === activeId;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-[11px] font-semibold transition ${
                active
                  ? "text-[#5E30A5]"
                  : "text-slate-500 hover:text-[#5E30A5]"
              }`}
              aria-pressed={active}
            >
              {active && (
                <motion.span
                  layoutId="gestionarTab"
                  className="absolute inset-0 rounded-xl bg-[#5E30A5]/10"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                />
              )}
              <motion.span
                className="relative z-10"
                animate={{ scale: active ? 1.12 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <tab.Icon size={18} />
              </motion.span>
              <span className="relative z-10 leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
