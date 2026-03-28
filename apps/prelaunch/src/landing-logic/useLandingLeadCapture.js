import { useState } from "react";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import { submitWaitlistSignup } from "../waitlist/waitlistApi";

function getWaitlistErrorMessage(errorCode) {
  if (errorCode === "invalid_email") {
    return "Ingresa un correo electrónico válido.";
  }

  if (errorCode === "rate_limited") {
    return "Hemos recibido demasiados intentos. Inténtalo nuevamente en unos minutos.";
  }

  return "No pudimos registrar tu correo en este momento. Inténtalo nuevamente en unos minutos.";
}

export default function useLandingLeadCapture({
  role = "cliente",
  source = "landing_waitlist",
  consentVersion = "privacy_v1",
  path = "/",
  surface = "waitlist_form",
  tree = "desktop",
  page = "waitlist_landing",
} = {}) {
  const [email, setEmailState] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function setEmail(nextValue) {
    setEmailState(nextValue);
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  function resetStatus() {
    setStatus("idle");
    setErrorMessage("");
  }

  async function submit() {
    if (status === "loading") {
      return { ok: false, error: "busy" };
    }

    const normalizedEmail = String(email || "").trim();
    if (!normalizedEmail) {
      setStatus("error");
      setErrorMessage(getWaitlistErrorMessage("invalid_email"));
      void ingestPrelaunchEvent("waitlist_submit_error", {
        path,
        props: {
          page,
          tree,
          surface,
          role_intent: role,
          source,
          error: "invalid_email",
        },
      });
      return { ok: false, error: "invalid_email" };
    }

    setStatus("loading");
    setErrorMessage("");

    const response = await submitWaitlistSignup({
      email: normalizedEmail,
      role,
      source,
      consentVersion,
      honeypot,
    });

    if (!response?.ok) {
      const error = response?.error || "request_failed";
      setStatus("error");
      setErrorMessage(getWaitlistErrorMessage(error));
      void ingestPrelaunchEvent("waitlist_submit_error", {
        path,
        props: {
          page,
          tree,
          surface,
          role_intent: role,
          source,
          error,
        },
      });
      return { ok: false, error };
    }

    const already = Boolean(response.already);
    setStatus(already ? "already" : "success");
    void ingestPrelaunchEvent("waitlist_submit", {
      path,
      props: {
        page,
        tree,
        surface,
        role_intent: role,
        source,
        already,
      },
    });
    return { ok: true, already, data: response };
  }

  return {
    email,
    setEmail,
    honeypot,
    setHoneypot,
    status,
    errorMessage,
    submit,
    resetStatus,
  };
}
