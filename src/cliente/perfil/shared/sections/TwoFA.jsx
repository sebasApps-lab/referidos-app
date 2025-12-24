import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

const Toggle = ({ active, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-12 h-7 rounded-full border transition flex items-center ${
      active ? "bg-[#10B981] border-[#10B981] justify-end" : "bg-gray-200 border-gray-300 justify-start"
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
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#1D1B1A]">
          Autenticacion en dos pasos
        </h3>
        <p className="text-xs text-black/50">
          Refuerza tu seguridad con factores adicionales.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-black/70">App autenticadora</p>
          <p className="text-[11px] text-black/45">TOTP para accesos seguros.</p>
        </div>
        <Toggle active={totp} onChange={() => verified && setTotp((prev) => !prev)} />
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-black/70">SMS</p>
          <p className="text-[11px] text-black/45">Codigo enviado al telefono.</p>
        </div>
        <Toggle active={sms} onChange={() => verified && setSms((prev) => !prev)} />
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-black/70">Codigos de respaldo</p>
          <p className="text-[11px] text-black/45">Imprime o guarda los codigos.</p>
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
          className="rounded-2xl bg-[#1D1B1A] px-4 py-2 text-xs font-semibold text-white"
        >
          Verificar para cambios
        </button>
        <span className="text-xs text-black/50">
          {verified ? "Verificacion lista." : "Requerido para activar o desactivar."}
        </span>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center gap-3 text-xs text-black/55">
        <ShieldCheck size={16} className="text-[#10B981]" />
        Mantener 2FA activo reduce riesgos de acceso no autorizado.
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className={`rounded-2xl px-4 py-2 text-xs font-semibold shadow ${
            verified
              ? "bg-[#1D1B1A] text-white"
              : "bg-black/10 text-black/40 cursor-not-allowed"
          }`}
        >
          Guardar cambios
        </button>
        <span className="text-xs text-black/50">{status}</span>
      </div>
    </section>
  );
}
