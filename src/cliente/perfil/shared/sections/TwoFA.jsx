import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

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
  const [status, setStatus] = useState("");

  const handleSave = () => {
    if (!verified) {
      setStatus("Verifica antes de guardar cambios.");
      return;
    }
    setStatus("Cambios guardados");
    alert("Datos guardados");
  };

  return (
    <section className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#2F1A55]">
          Autenticacion en dos pasos
        </h3>
        <p className="text-xs text-slate-500">
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

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setVerified(true)}
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
        >
          Verificar para cambios
        </button>
        <span className="text-xs text-slate-500">
          {verified ? "Verificacion lista." : "Requerido para activar o desactivar."}
        </span>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
        <ShieldCheck size={16} className="text-[#5E30A5]" />
        Mantener 2FA activo reduce riesgos de acceso no autorizado.
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className={`rounded-xl px-4 py-2 text-xs font-semibold shadow-sm ${
            verified
              ? "bg-[#5E30A5] text-white hover:bg-[#4B2488]"
              : "bg-[#E9E2F7] text-slate-400 cursor-not-allowed"
          }`}
        >
          Guardar cambios
        </button>
        <span className="text-xs text-slate-500">{status}</span>
      </div>
    </section>
  );
}
