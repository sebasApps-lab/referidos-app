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
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-[#1D1B1A]">
          Sesiones y dispositivos
        </h3>
        <p className="text-xs text-black/50">
          Controla los accesos activos en tu cuenta.
        </p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => {
          const Icon = DEVICE_ICON[session.device] || Laptop;
          return (
            <div
              key={session.id}
              className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-black/70">
                    {session.device}
                  </p>
                  <p className="text-[11px] text-black/45">
                    {session.location} - {session.lastActive}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleClose(session.id)}
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-[11px] font-semibold text-black/60"
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
        className="rounded-2xl bg-[#1D1B1A] px-4 py-2 text-xs font-semibold text-white"
      >
        Cerrar todas
      </button>
    </section>
  );
}
