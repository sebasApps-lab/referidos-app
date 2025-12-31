import React, { useState } from "react";
import { KeyRound, Minus, Plus, X } from "lucide-react";

const PROVIDERS = [
  "Google",
  "Facebook",
  "Apple",
  "Instagram",
  "Discord",
];

export default function LinkedAccounts() {
  const [linked, setLinked] = useState({});
  const [verified, setVerified] = useState(false);
  const [dismissedInfo, setDismissedInfo] = useState(false);

  const toggleProvider = (provider) => {
    setLinked((prev) => ({ ...prev, [provider]: !prev[provider] }));
  };

  return (
    <section className="relative rounded-[30px] border border-[#E9E2F7] bg-white px-6 pb-6 pt-6 space-y-6">
      <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          Cuentas vinculadas
        </span>
      </div>
      <div className="mt-1">
        <p className="text-xs text-slate-500 text-center">
          Conecta y administra tus cuentas externas.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[#2F1A55]">Gestionar cuentas</p>
      </div>
      <div className="grid gap-2">
        {PROVIDERS.map((provider) => {
          const isLinked = linked[provider];
          return (
            <div
              key={provider}
              className="flex items-center justify-between rounded-xl border border-[#E9E2F7] bg-white px-3 py-2"
            >
              <span className="text-xs text-slate-500">{provider}</span>
              <button
                type="button"
                onClick={() => verified && toggleProvider(provider)}
                className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                  isLinked ? "border-red-300 text-red-500" : "border-emerald-300 text-emerald-500"
                }`}
                aria-label={isLinked ? "Desvincular" : "Vincular"}
              >
                {isLinked ? <Minus size={14} /> : <Plus size={14} />}
              </button>
            </div>
          );
        })}
      </div>
      {!verified && (
        <p className="text-[11px] text-slate-400">
          Verifica para activar cambios en cuentas vinculadas.
        </p>
      )}

      {!dismissedInfo ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
          <KeyRound size={16} className="text-[#5E30A5]" />
          Cambios sensibles requieren verificacion antes de guardarse.
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
