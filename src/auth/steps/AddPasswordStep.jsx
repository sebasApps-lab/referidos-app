import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAppStore } from "../../store/appStore";
import EmailVerificationBlock from "../blocks/EmailVerificationBlock";
import PasswordSetupBlock from "../blocks/PasswordSetupBlock";

export default function AddPasswordStep({
  innerRef,
  emailConfirmed,
  provider,
  providers,
  hasPassword = false,
  hasMfa = false,
}) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordSave, setPasswordSave] = useState(null);
  const [finalizeError, setFinalizeError] = useState("");
  const [skipError, setSkipError] = useState("");
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  const providerList =
    Array.isArray(providers) && providers.length
      ? providers
      : provider
        ? [provider]
        : [];
  const isOauthPrimary =
    provider && provider !== "email" && provider !== "password";
  const hasPasswordValue =
    Boolean(hasPassword) ||
    providerList.includes("email") ||
    providerList.includes("password");
  const passwordProvider = isOauthPrimary ? "oauth" : provider;

  const showEmailBlock = !isOauthPrimary;
  const showPasswordSetup = isOauthPrimary && !hasPasswordValue;
  const showPasswordSaved = isOauthPrimary && hasPasswordValue;
  const passwordSaved = showPasswordSetup ? Boolean(passwordSave?.saved) : true;
  const canFinalize =
    !isOauthPrimary || hasPasswordValue || passwordSave?.saved || hasMfa;

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

  const handleFinalize = async () => {
    setFinalizeError("");
    setSkipError("");
    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      setFinalizeError("No se pudo obtener sesión.");
      return;
    }
    if (!isOauthPrimary) {
      const { data, error: authErr } = await supabase.auth.getUser();
      if (authErr) {
        setFinalizeError("No se pudo verificar el correo.");
        return;
      }
      if (!data?.user?.email_confirmed_at) {
        setFinalizeError("Tu correo aún no ha sido confirmado.");
        return;
      }
    } else if (!canFinalize) {
      setFinalizeError("Agrega una contraseña para continuar.");
      return;
    }
    const { error: updErr } = await supabase
      .from("usuarios")
      .update({ verification_status: "verified" })
      .eq("id_auth", userId);
    if (updErr) {
      setFinalizeError("No se pudo actualizar el estado.");
      return;
    }
    await bootstrapAuth({ force: true });
  };

  const handleSkipVerification = async () => {
    setSkipError("");
    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      setSkipError("No se pudo obtener sesión.");
      return;
    }
    const { error: updErr } = await supabase
      .from("usuarios")
      .update({ verification_status: "skipped" })
      .eq("id_auth", userId);
    if (updErr) {
      setSkipError("No se pudo actualizar el estado.");
      return;
    }
    await bootstrapAuth({ force: true });
    window.location.href = "/app";
  };

  return (
    <div className="flex h-full flex-col pb-4" ref={innerRef}>
      <div className="flex-1 space-y-4">
        <div className="text-lg font-semibold text-gray-900 text-center">
          Elige tu contraseña
        </div>
        {showEmailBlock ? (
          <EmailVerificationBlock
            email={emailValue}
            showActions={true}
            emailConfirmed={emailConfirmed}
          />
        ) : null}
        {showPasswordSaved ? (
          <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-emerald-600">
            <span>Contraseña guardada</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        ) : null}
        {showPasswordSetup && (
          <PasswordSetupBlock
            provider={passwordProvider}
            onSaveChange={setPasswordSave}
          />
        )}
        {finalizeError && (
          <div className="text-center text-xs text-red-500">
            {finalizeError}
          </div>
        )}
        {skipError && (
          <div className="text-center text-xs text-red-500">{skipError}</div>
        )}
      </div>
      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={handleFinalize}
          disabled={!passwordSaved && !hasMfa}
          className="w-full rounded-lg bg-[#5E30A5] py-2.5 text-white font-semibold disabled:opacity-50"
        >
          Finalizar
        </button>
        <button
          type="button"
          onClick={handleSkipVerification}
          className="w-full text-sm font-semibold text-gray-500"
        >
          Verificar más tarde
        </button>
      </div>
    </div>
  );
}
