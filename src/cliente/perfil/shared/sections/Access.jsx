import React, { useState } from "react";
import { Asterisk, Fingerprint, KeyRound, Lock } from "lucide-react";

export default function Access() {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Metodos de acceso
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Gestiona metodos de acceso y cuentas vinculadas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 -ml-1.5">
            <span className="flex items-center text-[#5E30A5]">
              <Asterisk size={12} />
              <span className="-ml-1">
                <Asterisk size={12} />
              </span>
              <span className="-ml-1">
                <Asterisk size={12} />
              </span>
            </span>
            <span className="text-xs font-semibold text-[#2F1A55] -ml-1">
              Contrasena
            </span>
          </div>
          <button
            type="button"
            className="h-8 w-8 rounded-full border bg-slate-200 border-slate-300"
            aria-label="Cambiar contrasena"
          />
        </div>
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
