import React, { useState } from "react";
import { Laptop, Smartphone, Tablet, LogOut } from "lucide-react";
import { getSessionListFallback } from "../../../cliente/services/clienteUI";

const DEVICE_ICON = {
  Movil: Smartphone,
  Laptop,
  Tablet,
};

export default function Sessions() {
  const [sessions, setSessions] = useState(getSessionListFallback());

  const handleClose = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCloseAll = () => {
    setSessions((prev) => prev.filter((s) => s.current));
  };

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-5">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Sesiones y dispositivos
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Controla los accesos activos en tu cuenta.
        </p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => {
          const Icon = DEVICE_ICON[session.device] || Laptop;
          return (
            <div
              key={session.id}
              className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#2F1A55]">
                    {session.device}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {session.location} - {session.lastActive}
                  </p>
                </div>
              </div>
              <div className="h-9 w-9" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleCloseAll}
        className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-xs font-semibold text-red-600 transition hover:bg-red-100"
      >
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <LogOut size={16} />
          </span>
          <div>
            <div>Cerrar todas</div>
            <div className="mt-1 text-[11px] font-normal text-red-500">
              Esto cerra sesion en el resto de dispositivos, menos en el actual.
            </div>
          </div>
        </div>
      </button>
    </section>
  );
}
