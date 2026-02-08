import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import EmailVerificationBlock from "../blocks/EmailVerificationBlock";

export default function VerifyEmailStep({
  innerRef,
  emailConfirmed,
  onContinue,
  onSkip,
}) {
  const [emailValue, setEmailValue] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [acceptsUpdates, setAcceptsUpdates] = useState(false);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  useEffect(() => {
    let active = true;
    if (emailValue) return () => {
      active = false;
    };
    (async () => {
      const { data } = await supabase.auth.getUser();
      const authEmail = data?.user?.email || "";
      if (active && authEmail) {
        setEmailValue(authEmail);
      }
    })();
    return () => {
      active = false;
    };
  }, [emailValue]);

  const handleContinue = async () => {
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const { data, error: authErr } = await supabase.auth.getUser();
      if (authErr) {
        setError("No se pudo verificar el correo.");
        return;
      }
      if (!data?.user?.email_confirmed_at) {
        setError("Tu correo aún no ha sido confirmado.");
        return;
      }
      await bootstrapAuth({ force: true });
      onContinue?.();
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
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
        .update({ verification_status: "skipped" })
        .eq("id_auth", userId);
      if (updErr) {
        setError(updErr.message || "No se pudo actualizar el estado.");
        return;
      }
      await bootstrapAuth({ force: true });
      onSkip?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="flex-1 space-y-4">
        <div className="text-lg font-semibold text-gray-900 text-center">
          Confirma tu correo electrónico
        </div>
        <p className="text-sm text-gray-600 text-center">
          Usaremos tu correo solo para verificar tu cuenta.
        </p>
        <EmailVerificationBlock
          email={emailValue}
          showActions={true}
          emailConfirmed={emailConfirmed}
        />

        <label className="flex items-start gap-3 text-xs text-gray-600">
          <input
            type="checkbox"
            checked={acceptsUpdates}
            onChange={(event) => setAcceptsUpdates(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5E30A5] focus:ring-[#5E30A5]/30"
          />
          <span>
            Acepto recibir noticias, novedades y notificaciones a esta dirección
            de correo electrónico
          </span>
        </label>

        {error && <div className="text-center text-xs text-red-500">{error}</div>}
      </div>
      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={handleContinue}
          disabled={saving}
          className="w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold disabled:opacity-50"
        >
          Continuar
        </button>
        <button
          type="button"
          onClick={handleSkip}
          disabled={saving}
          className="w-full text-sm font-semibold text-gray-500"
        >
          Verificar más tarde
        </button>
      </div>
    </div>
  );
}
