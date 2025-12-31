import React, { useState } from "react";
import { Asterisk, Check, Fingerprint, KeyRound, Lock, Minus, Pencil, Plus } from "lucide-react";

export default function Access() {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);
  const hasPassword = true;

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
          <div className="flex items-center gap-2 -ml-0.5">
            <span className="flex items-center text-[#5E30A5]">
              <Asterisk size={10} />
              <span className="-ml-1">
                <Asterisk size={10} />
              </span>
              <span className="-ml-1">
                <Asterisk size={10} />
              </span>
            </span>
            <span className="text-xs font-semibold text-[#2F1A55] -ml-1">
              Contrasena
            </span>
            {hasPassword ? (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
                <Check size={12} />
              </span>
            ) : null}
          </div>
          {hasPassword ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                aria-label="Quitar contrasena"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
                aria-label="Editar contrasena"
              >
                <Pencil size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-emerald-300 text-emerald-500 flex items-center justify-center"
              aria-label="Agregar contrasena"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint size={18} className="text-[#5E30A5]" />
            <span className="text-xs font-semibold text-[#2F1A55]">
              Huella
            </span>
            {fingerprintEnabled ? (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
                <Check size={12} />
              </span>
            ) : null}
          </div>
          {fingerprintEnabled ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFingerprintEnabled(false)}
                className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                aria-label="Quitar huella"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
                aria-label="Editar huella"
              >
                <Pencil size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFingerprintEnabled(true)}
              className="h-8 w-8 rounded-full border border-emerald-300 text-emerald-500 flex items-center justify-center"
              aria-label="Agregar huella"
            >
              <Plus size={14} />
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#5E30A5]" />
            <span className="text-xs font-semibold text-[#2F1A55]">
              PIN
            </span>
            {pinEnabled ? (
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
                <Check size={12} />
              </span>
            ) : null}
          </div>
          {pinEnabled ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPinEnabled(false)}
                className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
                aria-label="Quitar PIN"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-400 bg-white text-slate-700 flex items-center justify-center"
                aria-label="Editar PIN"
              >
                <Pencil size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPinEnabled(true)}
              className="h-8 w-8 rounded-full border border-emerald-300 text-emerald-500 flex items-center justify-center"
              aria-label="Agregar PIN"
            >
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
        <KeyRound size={16} className="text-[#5E30A5]" />
        Cambios sensibles requieren verificacion antes de guardarse.
      </div>

    </section>
  );
}
