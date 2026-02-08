import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useModal } from "../../modals/useModal";

const maskEmail = (value) => {
  if (!value || !value.includes("@")) return value || "";
  const [local, domainRaw] = value.split("@");
  if (!local) return value;
  const lastChar =
    local.length > 2 && /\d{2}$/.test(local)
      ? local.slice(-2)
      : local.slice(-1);
  const firstChar = local[0];
  const middleMask = "*".repeat(Math.max(local.length - (1 + lastChar.length), 0));
  const domainBase = (domainRaw || "").split(".")[0] || "correo";
  return `${firstChar}${middleMask}${lastChar}@${domainBase}.com`;
};

export default function ModalEmailReauth({ email, onConfirm }) {
  const { closeModal } = useModal();
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const maskedEmail = useMemo(() => maskEmail(email), [email]);

  const handleClose = () => {
    if (emailSent) {
      onConfirm?.();
    }
    closeModal();
  };

  const handleSendEmail = async () => {
    setError("");
    setMessage("");
    if (!email) {
      setError("Ingresa un email valido");
      return;
    }
    setSending(true);
    try {
      if (typeof supabase.auth.reauthenticate === "function") {
        const { error: reauthError } = await supabase.auth.reauthenticate();
        if (reauthError) throw reauthError;
      } else {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: false },
        });
        if (otpError) throw otpError;
      }
      setMessage("Te enviamos un correo de reautenticacion.");
      setEmailSent(true);
    } catch (err) {
      setError(err?.message || "No se pudo enviar el correo");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">
          Confirma tu acceso
        </span>
        <button
          type="button"
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>
      <div className="mt-4 space-y-4 text-sm text-gray-700">
        {!emailSent ? (
          <>
            <div className="space-y-1">
              <label className="block text-xs text-gray-500 ml-1">
                Correo electronico
              </label>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
                <span>{maskedEmail || "Sin correo"}</span>
              </div>
            </div>
            {error ? (
              <div className="text-center text-xs text-red-500">{error}</div>
            ) : null}
            <div className="text-center text-xs text-gray-500">
              Te enviaremos un enlace a este correo. Puedes cambiarlo si deseas.
            </div>
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={sending}
              className="w-full text-sm font-semibold text-[#5E30A5] disabled:opacity-60"
            >
              {sending ? "Enviando..." : "Enviar correo"}
            </button>
          </>
        ) : (
          <>
            {message ? (
              <div className="text-center text-xs text-emerald-500">
                {message}
              </div>
            ) : null}
            <div className="text-center text-xs text-gray-500">
              Revisa tu bandeja de entrada o spam. Y sigue las instrucciones del
              correo.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
