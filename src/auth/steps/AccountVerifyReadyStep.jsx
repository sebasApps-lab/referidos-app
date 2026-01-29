import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";

export default function AccountVerifyReadyStep({
  innerRef,
  isVerified,
  termsAccepted = false,
  privacyAccepted = false,
  onBackToVerify,
}) {
  const [acceptTerms, setAcceptTerms] = useState(Boolean(termsAccepted));
  const [acceptPrivacy, setAcceptPrivacy] = useState(Boolean(privacyAccepted));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  const canEnter = acceptTerms && acceptPrivacy && !saving;
  const badgeColor = isVerified
    ? "bg-emerald-50 text-emerald-500"
    : "bg-orange-50 text-orange-500";

  const handleEnter = async () => {
    if (!canEnter) return;
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
        .update({
          terms_accepted: true,
          privacy_accepted: true,
        })
        .eq("id_auth", userId);
      if (updErr) {
        setError("No se pudo guardar la aceptación.");
        return;
      }
      await bootstrapAuth({ force: true });
      window.location.href = "/app";
    } finally {
      setSaving(false);
    }
  };

  const handleBackToVerify = async () => {
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
        .update({ verification_status: "in_progress" })
        .eq("id_auth", userId);
      if (updErr) {
        setError("No se pudo actualizar el estado.");
        return;
      }
      await bootstrapAuth({ force: true });
      onBackToVerify?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full flex-col pb-4 text-gray-700" ref={innerRef}>
      <div className="flex-1 space-y-4">
        <div className={`mx-auto h-16 w-16 rounded-xl ${badgeColor} flex items-center justify-center`}>
          <BadgeCheck size={48} />
        </div>
        <div className="text-center space-y-1">
          <div className="text-lg font-semibold text-gray-900">
            {isVerified ? "Tu cuenta ha sido verificada" : "Tu cuenta aún no fue verificada"}
          </div>
          <p className="text-sm text-gray-600">
            {isVerified
              ? "Ahora podrás acceder a más beneficios, y probar nuevas funciones primero."
              : "Accederás a varios beneficios al verificar tu cuenta."}
          </p>
        </div>

        {!isVerified ? (
          <button
            type="button"
            onClick={handleBackToVerify}
            disabled={saving}
            className="text-sm font-semibold text-orange-500"
          >
            Volver y Verificar
          </button>
        ) : null}

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(event) => setAcceptTerms(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5E30A5] focus:ring-[#5E30A5]/30"
            />
            <span>
              Acepto que he leído y entiendo los términos y condiciones
            </span>
          </label>
          <label className="flex items-start gap-3 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(event) => setAcceptPrivacy(event.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5E30A5] focus:ring-[#5E30A5]/30"
            />
            <span>
              Acepto que mis datos serán recolectados y procesados según las
              Políticas de Privacidad
            </span>
          </label>
          <p className="text-[11px] text-gray-500">
            Al continuar acepto que los datos los datos proporcionados son correctos.
          </p>
        </div>
        {error && <div className="text-center text-xs text-red-500">{error}</div>}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleEnter}
          disabled={!canEnter}
          className="w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold disabled:opacity-50"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
