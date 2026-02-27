// src/components/gestionar/sections/Dispositivos.jsx
import React from "react";
import { motion } from "framer-motion";
import { Laptop, MonitorSmartphone, Smartphone, Wifi } from "lucide-react";

export default function Dispositivos() {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  const devices = [
    {
      name: "Terminal principal",
      detail: "POS - Mostrador",
      status: "Activo",
      lastSeen: "Hace 2 min",
      Icon: MonitorSmartphone,
    },
    {
      name: "Tablet cocina",
      detail: "Ordenes",
      status: "Activo",
      lastSeen: "Hace 12 min",
      Icon: Laptop,
    },
    {
      name: "Telefono gerente",
      detail: "Panel mobile",
      status: "En pausa",
      lastSeen: "Hace 1 hora",
      Icon: Smartphone,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-[#2F1A55]">
            Dispositivos vinculados
          </div>
          <div className="text-xs text-slate-500">
            Controla accesos y sesiones activas en tu negocio.
          </div>
        </div>
        <button
          type="button"
          className="rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] shadow-sm transition hover:border-[#5E30A5]/40"
        >
          Agregar dispositivo
        </button>
      </div>

      <div className="grid gap-3">
        {devices.map((device) => (
          <TEMP_MOTION_SPLASH_TAG
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
            key={device.name}
            whileHover={{ y: -2 }}
            className="flex flex-col gap-3 rounded-xl border border-[#E9E2F7] bg-[#F9F7FF] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#5E30A5] shadow-sm">
                <device.Icon size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2F1A55]">
                  {device.name}
                </div>
                <div className="text-xs text-slate-500">{device.detail}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="inline-flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    device.status === "Activo" ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                {device.status}
              </div>
              <div className="flex items-center gap-1">
                <Wifi size={14} />
                {device.lastSeen}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-[#E9E2F7] bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#5E30A5]"
              >
                Detalles
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#5E30A5] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
              >
                Cerrar sesion
              </button>
            </div>
          </TEMP_MOTION_SPLASH_TAG>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-[#E9E2F7] bg-white p-4">
        <div className="text-sm font-semibold text-[#2F1A55]">
          Recomendaciones de seguridad
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Revisa dispositivos sin uso reciente y elimina accesos innecesarios.
        </p>
      </div>
    </div>
  );
}
