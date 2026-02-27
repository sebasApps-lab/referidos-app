// src/components/gestionar/sections/Seguridad.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, Lock, ShieldCheck, Smartphone } from "lucide-react";

export default function Seguridad() {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  const [settings, setSettings] = useState({
    twoFactor: true,
    loginAlerts: true,
    deviceLock: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const rows = [
    {
      key: "twoFactor",
      title: "Autenticacion en dos pasos",
      desc: "Protege accesos sensibles con verificacion extra.",
      Icon: ShieldCheck,
    },
    {
      key: "loginAlerts",
      title: "Alertas de inicio de sesion",
      desc: "Recibe notificaciones ante accesos nuevos.",
      Icon: Smartphone,
    },
    {
      key: "deviceLock",
      title: "Bloqueo de dispositivos",
      desc: "Solicita PIN en terminales del negocio.",
      Icon: Lock,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-[#2F1A55]">
            Seguridad y accesos
          </div>
          <div className="text-xs text-slate-500">
            Ajusta permisos y monitorea actividad en tiempo real.
          </div>
        </div>
        <button
          type="button"
          className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] shadow-sm"
        >
          Revisar permisos
        </button>
      </div>

      <div className="grid gap-3">
        {rows.map((row) => {
          const enabled = settings[row.key];
          return (
            <TEMP_MOTION_SPLASH_TAG
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
              key={row.key}
              whileHover={{ y: -2 }}
              className="flex items-center justify-between rounded-xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F5FF] text-[#5E30A5]">
                  <row.Icon size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2F1A55]">
                    {row.title}
                  </div>
                  <div className="text-xs text-slate-500">{row.desc}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggle(row.key)}
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
            </TEMP_MOTION_SPLASH_TAG>
          );
        })}
      </div>

      <div className="rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
          <KeyRound size={16} />
          Accesos recientes
        </div>
        <div className="mt-3 space-y-3 text-xs text-slate-500">
          <div className="flex items-center justify-between rounded-lg border border-[#E9E2F7] bg-white px-3 py-2">
            <span>Panel web - Quito, EC</span>
            <span>Hace 3 min</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#E9E2F7] bg-white px-3 py-2">
            <span>Tablet cocina - Guayaquil</span>
            <span>Hace 2 horas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
