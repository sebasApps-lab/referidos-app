import React, { useState } from "react";
import { Fingerprint, KeyRound, Lock } from "lucide-react";

export default function Security() {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);

  return (
    <section className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#2F1A55]">Seguridad</h3>
        <p className="text-xs text-slate-500">
          Gestiona metodos de acceso y cuentas vinculadas.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 space-y-3">
        <p className="text-xs font-semibold text-[#2F1A55]">Contrasena</p>
        <input
          type="password"
          placeholder="Contrasena actual"
          className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Nueva contrasena"
          className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none"
        />
        <button
          type="button"
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
        >
          Cambiar contrasena
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint size={18} className="text-[#5E30A5]" />
            <span className="text-xs font-semibold text-[#2F1A55]">
              Huella
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFingerprintEnabled((prev) => !prev)}
            className={`h-8 w-8 rounded-full border ${
              fingerprintEnabled ? "bg-emerald-400 border-emerald-400" : "bg-slate-200 border-slate-300"
            }`}
            aria-label="Toggle huella"
          />
        </div>

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#5E30A5]" />
            <span className="text-xs font-semibold text-[#2F1A55]">
              PIN
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPinEnabled((prev) => !prev)}
            className={`h-8 w-8 rounded-full border ${
              pinEnabled ? "bg-emerald-400 border-emerald-400" : "bg-slate-200 border-slate-300"
            }`}
            aria-label="Toggle pin"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
        <KeyRound size={16} className="text-[#5E30A5]" />
        Cambios sensibles requieren verificacion antes de guardarse.
      </div>

    </section>
  );
}
