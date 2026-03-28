import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";

const MESSAGE_MAX = 200;

function normalizeEmail(value) {
  const normalized = (value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return null;
  }
  return normalized;
}

export function useFeedbackPageController() {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin") === "business" ? "business" : "consumer";
  const backTo = origin === "business" ? "/ayuda-negocios/es" : "/ayuda/es";

  const desktopHeaderActions = useMemo(
    () => [
      {
        key: "back",
        label: "\u2197 Volver al Centro de Ayuda",
        to: backTo,
        className:
          "help-center__header-link help-center__header-link--ghost support-open-ticket__header-link-back",
      },
    ],
    [backTo],
  );

  const mobileHeaderActions = useMemo(
    () => [
      {
        key: "back",
        label: "\u2197 Volver al Centro de Ayuda",
        to: backTo,
        variant: "ghost",
      },
    ],
    [backTo],
  );

  const mobileDrawerItems = useMemo(
    () => [
      {
        key: "back",
        title: "Volver al Centro de Ayuda",
        to: backTo,
      },
    ],
    [backTo],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);
  const trimmedMessage = useMemo(() => message.trim(), [message]);
  const canSubmit = Boolean(normalizedEmail && trimmedMessage && !submitting);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      setSuccess("");
      setError("Completa el correo y el mensaje con informaci\u00f3n v\u00e1lida.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await ingestPrelaunchEvent("feedback_submit", {
        path: "/feedback",
        props: {
          origin,
          has_name: Boolean(name.trim()),
          email_domain: normalizedEmail.split("@")[1],
          message_length: trimmedMessage.length,
        },
      });

      setSuccess("Gracias. Tu mensaje fue validado en frontend.");
      setMessage("");
    } catch {
      setError("No se pudo registrar tu mensaje en este momento.");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    backTo,
    desktopHeaderActions,
    mobileHeaderActions,
    mobileDrawerItems,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    messageMax: MESSAGE_MAX,
    submitting,
    canSubmit,
    error,
    success,
    handleSubmit,
  };
}
