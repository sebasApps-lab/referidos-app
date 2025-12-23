// src/admin/sistema/FeatureFlags.jsx
import React, { useState } from "react";
import { Shield, ToggleLeft } from "lucide-react";

const FLAGS = [
  {
    key: "disable_qr",
    title: "Deshabilitar generacion de QR",
    desc: "Bloquea generacion de nuevos QR en toda la app.",
  },
  {
    key: "maintenance",
    title: "Modo mantenimiento",
    desc: "Muestra aviso general y pausa flujos criticos.",
  },
  {
    key: "freeze_registro",
    title: "Bloquear registros",
    desc: "Evita nuevas altas de usuarios y negocios.",
  },
];

export default function FeatureFlags() {
  const [state, setState] = useState({
    disable_qr: false,
    maintenance: false,
    freeze_registro: false,
  });

  const toggleFlag = (key) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-lg font-semibold text-[#2F1A55]">
          Feature flags
        </div>
        <div className="text-xs text-slate-500">
          Controla funciones globales sin tocar codigo.
        </div>
      </div>

      <div className="grid gap-3">
        {FLAGS.map((flag) => {
          const enabled = state[flag.key];
          return (
            <div
              key={flag.key}
              className="flex items-center justify-between rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F4FF] text-[#5E30A5]">
                  <Shield size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2F1A55]">
                    {flag.title}
                  </div>
                  <div className="text-xs text-slate-500">{flag.desc}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFlag(flag.key)}
                className={`relative h-6 w-11 rounded-full transition ${
                  enabled ? "bg-[#5E30A5]" : "bg-slate-200"
                }`}
                aria-pressed={enabled}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                    enabled ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-[#F9F7FF] p-4 text-xs text-slate-500">
        <div className="flex items-center gap-2 font-semibold text-[#2F1A55]">
          <ToggleLeft size={14} />
          Cambios pendientes
        </div>
        <p className="mt-2">
          Las flags se aplicaran en cuanto la capa de servicios admin este
          conectada.
        </p>
      </div>
    </div>
  );
}
