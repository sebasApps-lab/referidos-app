import React, { useState } from "react";
import { ShieldCheck, X } from "lucide-react";

const Toggle = ({ active, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-12 h-7 rounded-full border transition flex items-center ${
      active ? "bg-[#5E30A5] border-[#5E30A5] justify-end" : "bg-slate-200 border-slate-300 justify-start"
    }`}
  >
    <span className="h-5 w-5 rounded-full bg-white shadow-sm mx-1" />
  </button>
);

export default function TwoFA() {
  const [verified, setVerified] = useState(false);
  const [totp, setTotp] = useState(false);
  const [sms, setSms] = useState(false);
  const [backup, setBackup] = useState(true);
  const [dismissedInfo, setDismissedInfo] = useState(false);

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Autenticacion en dos pasos
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Refuerza tu seguridad con factores adicionales.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#2F1A55]">App autenticadora</p>
          <p className="text-[11px] text-slate-400">TOTP para accesos seguros.</p>
        </div>
        <Toggle active={totp} onChange={() => verified && setTotp((prev) => !prev)} />
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#2F1A55]">SMS</p>
          <p className="text-[11px] text-slate-400">Codigo enviado al telefono.</p>
        </div>
        <Toggle active={sms} onChange={() => verified && setSms((prev) => !prev)} />
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-[#2F1A55]">Codigos de respaldo</p>
          <p className="text-[11px] text-slate-400">Imprime o guarda los codigos.</p>
        </div>
        <Toggle
          active={backup}
          onChange={() => verified && setBackup((prev) => !prev)}
        />
      </div>

      {!dismissedInfo ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
          <ShieldCheck size={16} className="text-[#5E30A5]" />
          Mantener 2FA activo reduce riesgos de acceso no autorizado.
          <button
            type="button"
            onClick={() => setDismissedInfo(true)}
            className="ml-auto text-slate-400 hover:text-slate-500"
            aria-label="Cerrar aviso"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
