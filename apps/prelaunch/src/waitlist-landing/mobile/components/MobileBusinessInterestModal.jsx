import { useEffect, useMemo, useState } from "react";
import { submitWaitlistSignup } from "../../../waitlist/waitlistApi";

const EARLY_ACCESS_DATE = "1 de abril de 2026";

function getErrorMessage(errorCode) {
  if (errorCode === "invalid_email") {
    return "Ingresa un correo electrónico válido para recibir la notificación.";
  }

  return "No pudimos registrar tu correo en este momento. Inténtalo nuevamente en unos minutos.";
}

export default function MobileBusinessInterestModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const successMessage = useMemo(
    () =>
      `Perfecto. Te escribiremos a este correo cuando el acceso anticipado del panel de promociones comience el ${EARLY_ACCESS_DATE}.`,
    [],
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setEmail("");
    setStatus("idle");
    setErrorMessage("");
  }, [isOpen]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const response = await submitWaitlistSignup({
      email,
      role: "negocio_interest",
      source: "landing_business_modal_mobile",
      consentVersion: "business_panel_notify_v1",
    });

    if (!response?.ok) {
      setStatus("idle");
      setErrorMessage(getErrorMessage(response?.error));
      return;
    }

    setStatus("success");
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="mobile-landing__business-modal-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="mobile-landing__business-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-business-interest-title"
      >
        <button
          type="button"
          className="mobile-landing__business-modal-close"
          aria-label="Cerrar mensaje para negocios"
          onClick={onClose}
        >
          <span />
          <span />
        </button>

        <div className="mobile-landing__business-modal-kicker">PARA NEGOCIOS</div>
        <h2 id="mobile-business-interest-title" className="mobile-landing__business-modal-title">
          El acceso anticipado al panel de promociones comenzará el{" "}
          <span>{EARLY_ACCESS_DATE}</span>
        </h2>
        <p className="mobile-landing__business-modal-copy">
          Deja tu correo para que te avisemos apenas inicie el acceso anticipado del panel.
        </p>

        <form className="mobile-landing__business-modal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="email"
            className="mobile-landing__business-modal-input"
            placeholder="tu@empresa.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "loading" || status === "success"}
          />

          <button
            type="submit"
            className="mobile-landing__business-modal-submit"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading"
              ? "Enviando..."
              : status === "success"
                ? "Correo registrado"
                : "Notificarme cuando esté disponible"}
          </button>
        </form>

        <p className="mobile-landing__business-modal-consent">
          Al enviar tu correo, aceptas recibir una notificación cuando el acceso anticipado
          comience.
        </p>

        {errorMessage ? (
          <p className="mobile-landing__business-modal-feedback mobile-landing__business-modal-feedback--error">
            {errorMessage}
          </p>
        ) : null}

        {status === "success" ? (
          <p className="mobile-landing__business-modal-feedback mobile-landing__business-modal-feedback--success">
            {successMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
