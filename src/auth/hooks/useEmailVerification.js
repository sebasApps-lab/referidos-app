import { useCallback, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function useEmailVerification({ initialEmail = "" } = {}) {
  const [emailValue, setEmailValue] = useState(initialEmail);
  const [editingEmail, setEditingEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = useCallback(async () => {
    setError("");
    setMessage("");
    if (!emailValue) {
      setError("Ingresa un email valido");
      return;
    }
    setSending(true);
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: emailValue,
      });
      if (resendError) throw resendError;
      setMessage("Te enviamos un correo de verificacion.");
      setEmailSent(true);
    } catch (err) {
      setError(err?.message || "No se pudo enviar el codigo");
    } finally {
      setSending(false);
    }
  }, [emailValue]);

  return {
    emailValue,
    setEmailValue,
    editingEmail,
    setEditingEmail,
    message,
    error,
    sending,
    emailSent,
    handleSendEmail,
  };
}
