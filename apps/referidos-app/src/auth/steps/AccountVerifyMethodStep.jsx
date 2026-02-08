import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";

export default function AccountVerifyMethodStep({
  innerRef,
  hasPassword = false,
  hasMfa = false,
  onGoAddPassword,
  onGoAddMfa,
  onContinue,
  onSkip,
}) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);
  const canContinue = hasPassword || hasMfa;

  const updateStatus = async (nextStatus) => {
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId) {
        setError("No se pudo obtener sesión.");
        return;
      }
      const { error: updErr } = await supabase
        .from("usuarios")
        .update({ verification_status: nextStatus })
        .eq("id_auth", userId);
      if (updErr) {
        setError(updErr.message || "No se pudo actualizar el estado.");
        return;
      }
      await bootstrapAuth({ force: true });
      if (nextStatus === "verified") {
        onContinue?.();
      } else if (onSkip) {
        onSkip();
      } else {
        window.location.href = "/app";
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="flex-1 flex flex-col">
        <div className="text-lg font-semibold text-gray-900 text-center">
          Elige un método
        </div>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Puedes usar cualquiera de esos métodos para asegurar tu cuenta.
        </p>
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-3">
            <button
              type="button"
              onClick={onGoAddPassword}
              className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                hasPassword
                  ? "border-[#5E30A5] bg-[#F7F3FF] text-[#2F1A55]"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    hasPassword
                      ? "bg-[#E6DBFA] text-[#5E30A5]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Lock size={16} />
                </span>
                <div className="font-semibold">Usar contraseña</div>
              </div>
            </button>
            <button
              type="button"
              onClick={onGoAddMfa}
              className={`relative w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                hasMfa
                  ? "border-[#5E30A5] bg-[#F7F3FF] text-[#2F1A55]"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              <span className="absolute right-3 top-3 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Recomendado
              </span>
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    hasMfa
                      ? "bg-[#E6DBFA] text-[#5E30A5]"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <ShieldCheck size={16} />
                </span>
                <div className="font-semibold">Verificación de 2 pasos</div>
              </div>
            </button>
          </div>
        </div>
        {error && <div className="text-center text-xs text-red-500 mt-3">{error}</div>}
      </div>
      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={() => updateStatus("verified")}
          disabled={!canContinue || saving}
          className="w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold disabled:opacity-50"
        >
          Continuar
        </button>
        <button
          type="button"
          onClick={() => updateStatus("skipped")}
          disabled={saving}
          className="w-full text-sm font-semibold text-gray-500"
        >
          Verificar más tarde
        </button>
      </div>
    </div>
  );
}
