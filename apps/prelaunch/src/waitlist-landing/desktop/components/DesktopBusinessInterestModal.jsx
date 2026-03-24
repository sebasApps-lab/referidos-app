import { useEffect, useMemo, useState } from "react";
import { submitWaitlistSignup } from "../../../waitlist/waitlistApi";

const EARLY_ACCESS_DATE = "1 de abril de 2026";

function getErrorMessage(errorCode) {
  if (errorCode === "invalid_email") {
    return "Ingresa un correo electr\u00f3nico v\u00e1lido para recibir la notificaci\u00f3n.";
  }

  return "No pudimos registrar tu correo en este momento. Int\u00e9ntalo nuevamente en unos minutos.";
}

export default function DesktopBusinessInterestModal({ isOpen, onClose }) {
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

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
      source: "landing_business_modal",
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
      className="figma-prototype__business-modal-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="figma-prototype__business-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="business-interest-modal-title"
      >
        <button
          type="button"
          className="figma-prototype__business-modal-close"
          aria-label="Cerrar mensaje para negocios"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="figma-prototype__business-modal-scroll">
          <div className="figma-prototype__business-modal-header">
            <p className="figma-prototype__business-modal-eyebrow">Para negocios</p>
            <h2 id="business-interest-modal-title">
              {"El acceso anticipado al panel de promociones comenzar\u00e1 el "}
              {EARLY_ACCESS_DATE}
              {"."}
            </h2>
            <p className="figma-prototype__business-modal-copy">
              {"Estamos preparando una experiencia dise\u00f1ada para que los negocios puedan crear, publicar y gestionar promociones de forma profesional desde cualquier dispositivo. Si quieres recibir la notificaci\u00f3n apenas se habilite el acceso anticipado, d\u00e9janos tu correo."}
            </p>
          </div>

          <form className="figma-prototype__business-modal-form" onSubmit={handleSubmit}>
            <label
              className="figma-prototype__business-modal-label"
              htmlFor="business-interest-email"
            >
              {"Correo electr\u00f3nico"}
            </label>

            <input
              id="business-interest-email"
              className="figma-prototype__business-modal-input"
              type="email"
              autoComplete="email"
              placeholder="tu@empresa.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading" || status === "success"}
            />

            <button
              type="submit"
              className="figma-prototype__business-modal-submit"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading"
                ? "Enviando..."
                : status === "success"
                  ? "Correo registrado"
                  : "Quiero ser notificado"}
            </button>

            <p className="figma-prototype__business-modal-consent">
              {"Al enviar tu correo, aceptas recibir una notificaci\u00f3n por email cuando comience el acceso anticipado del panel de promociones."}
            </p>

            {errorMessage ? (
              <p className="figma-prototype__business-modal-feedback figma-prototype__business-modal-feedback--error">
                {errorMessage}
              </p>
            ) : null}

            {status === "success" ? (
              <p className="figma-prototype__business-modal-feedback figma-prototype__business-modal-feedback--success">
                {successMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
