import React, { useState } from "react";
import { Laptop, Smartphone, Tablet, LogOut } from "lucide-react";
import { getSessionListFallback } from "../../../services/clienteUI";

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
    <section className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#2F1A55]">
          Sesiones y dispositivos
        </h3>
        <p className="text-xs text-slate-500">
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
              <button
                type="button"
                onClick={() => handleClose(session.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-[11px] font-semibold text-slate-500 hover:text-[#5E30A5]"
              >
                <LogOut size={14} />
                Cerrar sesion
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleCloseAll}
        className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
      >
        Cerrar todas
      </button>
    </section>
  );
}
