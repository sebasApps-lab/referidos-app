import React, { useState } from "react";
import { Fingerprint, KeyRound, Lock, Plus, Minus } from "lucide-react";

const PROVIDERS = [
  "Google",
  "Facebook",
  "Apple",
  "Instagram",
  "Discord",
];

export default function Security() {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [linked, setLinked] = useState({});
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("");

  const toggleProvider = (provider) => {
    setLinked((prev) => ({ ...prev, [provider]: !prev[provider] }));
  };

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
        <h3 className="text-sm font-semibold text-[#1D1B1A]">Seguridad</h3>
        <p className="text-xs text-black/50">
          Gestiona metodos de acceso y cuentas vinculadas.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 space-y-3">
        <p className="text-xs font-semibold text-black/70">Contrasena</p>
        <input
          type="password"
          placeholder="Contrasena actual"
          className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-black/70 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Nueva contrasena"
          className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-black/70 focus:outline-none"
        />
        <button
          type="button"
          className="rounded-2xl bg-[#1D1B1A] px-4 py-2 text-xs font-semibold text-white"
        >
          Cambiar contrasena
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint size={18} className="text-[#2D6A6E]" />
            <span className="text-xs font-semibold text-black/70">
              Huella
            </span>
          </div>
          <button
            type="button"
            onClick={() => verified && setFingerprintEnabled((prev) => !prev)}
            className={`h-8 w-8 rounded-full border ${
              fingerprintEnabled ? "bg-[#10B981] border-[#10B981]" : "bg-gray-200 border-gray-300"
            }`}
            aria-label="Toggle huella"
          />
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#C2410C]" />
            <span className="text-xs font-semibold text-black/70">
              PIN
            </span>
          </div>
          <button
            type="button"
            onClick={() => verified && setPinEnabled((prev) => !prev)}
            className={`h-8 w-8 rounded-full border ${
              pinEnabled ? "bg-[#10B981] border-[#10B981]" : "bg-gray-200 border-gray-300"
            }`}
            aria-label="Toggle pin"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-black/70">Cuentas vinculadas</p>
          <button
            type="button"
            onClick={() => setVerified(true)}
            className="rounded-2xl bg-[#1D1B1A] px-3 py-1 text-[11px] font-semibold text-white"
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
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-3 py-2"
              >
                <span className="text-xs text-black/60">{provider}</span>
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
          <p className="text-[11px] text-black/45">
            Verifica para activar cambios en huella, PIN y cuentas vinculadas.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-4 flex items-center gap-3 text-xs text-black/55">
        <KeyRound size={16} className="text-[#3D5A80]" />
        Cambios sensibles requieren verificacion antes de guardarse.
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
