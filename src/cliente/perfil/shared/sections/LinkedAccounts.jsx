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
    <section className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#2F1A55]">Cuentas vinculadas</h3>
        <p className="text-xs text-slate-500">
          Conecta y administra tus cuentas externas.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-[#2F1A55]">Cuentas vinculadas</p>
          <button
            type="button"
            onClick={() => setVerified(true)}
            className="rounded-xl bg-[#5E30A5] px-3 py-1 text-[11px] font-semibold text-white"
          >
            Verificar
          </button>
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
      </div>

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
