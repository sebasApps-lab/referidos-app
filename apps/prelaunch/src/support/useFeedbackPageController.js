import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { submitPublicFeedback } from "../feedback/feedbackApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";

const MESSAGE_MAX = 200;

function normalizeOriginRole(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "negocio") return "negocio";
  return "cliente";
}

function normalizeEmail(value) {
  const normalized = (value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return null;
  }
  return normalized;
}

function bucketMessageLength(length) {
  if (!Number.isFinite(length) || length <= 0) return "0";
  if (length <= 49) return "1_49";
  if (length <= 99) return "50_99";
  if (length <= 199) return "100_199";
  return "200_plus";
}

function getCurrentTree() {
  if (typeof document === "undefined") return null;
  return (
    document.documentElement.dataset.prelaunchRootEntry ||
    document.body?.dataset?.prelaunchRootEntry ||
    null
  );
}

function getFeedbackErrorMessage(errorCode) {
  if (errorCode === "invalid_email") {
    return "Ingresa un correo electrónico válido.";
  }
  if (errorCode === "invalid_message") {
    return "Escribe un mensaje válido.";
  }
  if (errorCode === "rate_limited") {
    return "Hemos recibido demasiados mensajes. Inténtalo nuevamente en unos minutos.";
  }
  return "No se pudo enviar tu mensaje en este momento.";
}

function readPrefillFromLocationState(locationState) {
  if (!locationState || typeof locationState !== "object") return {};

  return {
    name: String(locationState.name || "").slice(0, 80),
    email: String(locationState.email || "").slice(0, 120),
    message: String(locationState.message || "").slice(0, MESSAGE_MAX),
    sourceSurface: String(locationState.sourceSurface || "").slice(0, 120),
  };
}

export function useFeedbackPageController() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const originRole = normalizeOriginRole(searchParams.get("origin"));
  const backTo = originRole === "negocio" ? "/ayuda-negocios/es" : "/ayuda/es";
  const prefill = useMemo(() => readPrefillFromLocationState(location.state), [location.state]);

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

  const [name, setName] = useState(prefill.name || "");
  const [email, setEmail] = useState(prefill.email || "");
  const [message, setMessage] = useState(prefill.message || "");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const normalizedEmail = useMemo(() => normalizeEmail(email), [email]);
  const trimmedMessage = useMemo(() => message.trim(), [message]);
  const tree = useMemo(() => getCurrentTree(), []);
  const sourceSurface = prefill.sourceSurface || "feedback_page";
  const canSubmit = Boolean(normalizedEmail && trimmedMessage && !submitting);

  useEffect(() => {
    void ingestPrelaunchEvent("page_view", {
      path: "/feedback",
      props: {
        page: "feedback_page",
        tree,
        origin_role: originRole,
        source_surface: sourceSurface,
      },
    });
    void ingestPrelaunchEvent("feedback_open", {
      path: "/feedback",
      props: {
        page: "feedback_page",
        tree,
        origin_role: originRole,
        surface: sourceSurface,
      },
    });
  }, [originRole, sourceSurface, tree]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) {
      const validationError = !normalizedEmail ? "invalid_email" : "invalid_message";
      setSuccess("");
      setError(getFeedbackErrorMessage(validationError));
      void ingestPrelaunchEvent("feedback_submit_validation_error", {
        path: "/feedback",
        props: {
          page: "feedback_page",
          tree,
          origin_role: originRole,
          source_surface: sourceSurface,
          error: validationError,
          has_name: Boolean(name.trim()),
          has_email: Boolean(normalizedEmail),
          message_length_bucket: bucketMessageLength(trimmedMessage.length),
        },
      });
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    const commonProps = {
      page: "feedback_page",
      tree,
      origin_role: originRole,
      source_surface: sourceSurface,
      has_name: Boolean(name.trim()),
      has_email: Boolean(normalizedEmail),
      message_length_bucket: bucketMessageLength(trimmedMessage.length),
    };

    try {
      void ingestPrelaunchEvent("feedback_submit_attempt", {
        path: "/feedback",
        props: commonProps,
      });

      const response = await submitPublicFeedback({
        name: name.trim(),
        email: normalizedEmail,
        message: trimmedMessage,
        originRole,
        originSource: "prelaunch",
        sourceRoute: "/feedback",
        sourceSurface,
        honeypot,
        context: {
          page: "feedback_page",
          tree,
          source_surface: sourceSurface,
        },
      });

      if (!response?.ok) {
        const errorCode = response?.error || "submit_failed";
        setError(getFeedbackErrorMessage(errorCode));

        const eventType =
          errorCode === "rate_limited" ? "feedback_submit_rate_limited" : "feedback_submit_error";

        void ingestPrelaunchEvent(eventType, {
          path: "/feedback",
          props: {
            ...commonProps,
            error: errorCode,
          },
        });
        return;
      }

      if (response.status === "duplicate") {
        setSuccess("Ya recibimos este mensaje. Gracias por insistir y ayudarnos a mejorar.");
        setMessage("");
        setHoneypot("");
        void ingestPrelaunchEvent("feedback_submit_duplicate", {
          path: "/feedback",
          props: commonProps,
        });
        return;
      }

      if (response.status === "blocked") {
        setSuccess("Gracias. Tu mensaje fue recibido.");
        setMessage("");
        setHoneypot("");
        void ingestPrelaunchEvent("feedback_submit_blocked", {
          path: "/feedback",
          props: commonProps,
        });
        return;
      }

      setSuccess("Gracias. Tu mensaje fue recibido correctamente.");
      setMessage("");
      setHoneypot("");
      void ingestPrelaunchEvent("feedback_submit_success", {
        path: "/feedback",
        props: commonProps,
      });
    } catch {
      setError("No se pudo enviar tu mensaje en este momento.");
      void ingestPrelaunchEvent("feedback_submit_error", {
        path: "/feedback",
        props: {
          ...commonProps,
          error: "unexpected_error",
        },
      });
    } finally {
      setSubmitting(false);
    }
  }

  return {
    backTo,
    desktopHeaderActions,
    mobileHeaderActions,
    mobileDrawerItems,
    sourceSurface,
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    honeypot,
    setHoneypot,
    messageMax: MESSAGE_MAX,
    submitting,
    canSubmit,
    error,
    success,
    handleSubmit,
  };
}
