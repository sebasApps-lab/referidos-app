import { useEffect, useMemo, useState } from "react";
import { submitWaitlistSignup } from "../../../waitlist/waitlistApi";

const EARLY_ACCESS_DATE = "1 de abril de 2026";

const MODAL_ASSETS = {
  briefcase: "/assets/gridicons_briefcase.svg",
  bellCircle: "/assets/bell-icon-circle.svg",
  clock: "/assets/clock-yellow-icon.png",
  check: "/assets/lets-icons_check-fill.svg",
  divider: "/assets/line-5.png",
  mail: "/assets/lucide_mail.svg",
  lock: "/assets/majesticons_lock.svg",
  notifyBell: "/assets/mdi_bell.svg",
};

function getErrorMessage(errorCode) {
  if (errorCode === "invalid_email") {
    return "Ingresa un correo electr\u00f3nico v\u00e1lido para recibir la notificaci\u00f3n.";
  }

  return "No pudimos registrar tu correo en este momento. Int\u00e9ntalo nuevamente en unos minutos.";
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
      className="mobile-landing__business-modal-v2-root figma-prototype__business-modal-backdrop"
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
        aria-labelledby="mobile-business-interest-modal-title"
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
          <div className="figma-prototype__business-modal-scale">
            <div className="figma-prototype__business-modal-stage">
              <div className="figma-prototype__business-modal-kicker">
                <img
                  src={MODAL_ASSETS.briefcase}
                  alt=""
                  aria-hidden="true"
                  className="figma-prototype__business-modal-kicker-icon"
                />
                <span>PARA NEGOCIOS</span>
              </div>

              <img
                src={MODAL_ASSETS.clock}
                alt=""
                aria-hidden="true"
                className="figma-prototype__business-modal-clock"
              />

              <div className="figma-prototype__business-modal-main">
                <div className="figma-prototype__business-modal-header">
                  <div className="figma-prototype__business-modal-header-copy">
                    <h2 id="mobile-business-interest-modal-title">
                      <span className="figma-prototype__business-modal-title-regular">
                        {"El acceso anticipado al panel de promociones para negocios llegar\u00e1 el "}
                      </span>
                      <span className="figma-prototype__business-modal-title-accent">
                        {EARLY_ACCESS_DATE}
                      </span>
                    </h2>

                    <p className="figma-prototype__business-modal-copy">
                      <span className="figma-prototype__business-modal-copy-regular">
                        Estamos preparando una plataforma profesional para que los negocios
                        puedan{" "}
                      </span>
                      <span className="figma-prototype__business-modal-copy-accent">
                        crear, publicar y gestionar
                      </span>
                      <span className="figma-prototype__business-modal-copy-regular"> </span>
                      <span className="figma-prototype__business-modal-copy-accent">
                        promociones
                      </span>
                      <span className="figma-prototype__business-modal-copy-regular">
                        {" "}
                        desde cualquier dispositivo.
                      </span>
                    </p>
                  </div>

                  <div className="figma-prototype__business-modal-notice">
                    <span className="figma-prototype__business-modal-notice-iconWrap">
                      <img
                        src={MODAL_ASSETS.notifyBell}
                        alt=""
                        aria-hidden="true"
                        className="figma-prototype__business-modal-notice-icon"
                      />
                    </span>
                    <p>Te avisaremos por email.</p>
                  </div>
                </div>

                <form className="figma-prototype__business-modal-form" onSubmit={handleSubmit}>
                  <label
                    className="figma-prototype__business-modal-field"
                    htmlFor="mobile-business-interest-email"
                  >
                    <img
                      src={MODAL_ASSETS.mail}
                      alt=""
                      aria-hidden="true"
                      className="figma-prototype__business-modal-field-icon"
                    />
                    <input
                      id="mobile-business-interest-email"
                      className="figma-prototype__business-modal-input"
                      type="email"
                      autoComplete="email"
                      placeholder="ejemplo@mail.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      disabled={status === "loading" || status === "success"}
                    />
                  </label>

                  <button
                    type="submit"
                    className="figma-prototype__business-modal-submit"
                    disabled={status === "loading" || status === "success"}
                  >
                    <img
                      src={MODAL_ASSETS.notifyBell}
                      alt=""
                      aria-hidden="true"
                      className="figma-prototype__business-modal-submit-icon"
                    />
                    <span>
                      {status === "loading"
                        ? "Enviando..."
                        : status === "success"
                          ? "Correo registrado"
                          : "Notificarme cuando est\u00e9 disponible"}
                    </span>
                  </button>
                </form>

                <div className="figma-prototype__business-modal-footer">
                  <div className="figma-prototype__business-modal-badges">
                    <div className="figma-prototype__business-modal-badge">
                      <img
                        src={MODAL_ASSETS.check}
                        alt=""
                        aria-hidden="true"
                        className="figma-prototype__business-modal-badge-icon"
                      />
                      <span>Sin spam.</span>
                    </div>

                    <div className="figma-prototype__business-modal-badge">
                      <img
                        src={MODAL_ASSETS.lock}
                        alt=""
                        aria-hidden="true"
                        className="figma-prototype__business-modal-badge-lock"
                      />
                      <span>{"Solo usaremos tu correo para esta notificaci\u00f3n."}</span>
                    </div>
                  </div>

                  <div className="figma-prototype__business-modal-consentBlock">
                    <img
                      src={MODAL_ASSETS.divider}
                      alt=""
                      aria-hidden="true"
                      className="figma-prototype__business-modal-divider"
                    />
                    <p className="figma-prototype__business-modal-consent">
                      {"Al enviar tu correo, aceptas recibir una notificaci\u00f3n cuando est\u00e9 listo el panel para negocios."}
                    </p>
                  </div>

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
