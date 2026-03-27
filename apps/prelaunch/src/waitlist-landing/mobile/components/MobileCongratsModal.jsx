import { useState } from "react";
import MobileLandingModalFrame from "./MobileLandingModalFrame";
import { LANDING_MODAL_ASSETS } from "./MobileLandingModalAssets";

const INVITE_LINK = "qrew.es/invite/ABC123XYZ";

export default function MobileCongratsModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(INVITE_LINK);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <MobileLandingModalFrame
      isOpen={isOpen}
      onClose={onClose}
      designWidth={650}
      designHeight={405}
      dialogLabel="Felicitaciones, ya estás en la lista"
      lockHeight
      rootClassName="mobile-landing__modal-root--congrats"
    >
      <button
        type="button"
        className="figma-prototype__landing-modal-close"
        aria-label="Cerrar modal de felicitaciones"
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className="figma-prototype__landing-modal-stage figma-prototype__landing-modal-stage--congrats">
        <img
          className="figma-prototype__landing-modal-heroIcon"
          src={LANDING_MODAL_ASSETS.congratsIcon}
          alt=""
          aria-hidden="true"
        />

        <div className="figma-prototype__landing-modal-main">
          <div className="figma-prototype__landing-modal-header figma-prototype__landing-modal-header--congrats">
            <h2>¡Felicitaciones, ya estás en la lista!</h2>
            <p>Consigue más beneficios invitando a tus amigos.</p>
          </div>

          <div className="figma-prototype__landing-modal-copyRow">
            <div className="figma-prototype__landing-modal-copyField">
              <span>{INVITE_LINK}</span>
            </div>

            <button
              type="button"
              className="figma-prototype__landing-modal-copyButton"
              aria-label="Copiar enlace"
              onClick={handleCopy}
            >
              <img
                src={LANDING_MODAL_ASSETS.copyIcon}
                alt=""
                aria-hidden="true"
                className="figma-prototype__landing-modal-copyButtonIcon"
              />
            </button>
          </div>

          <div className="figma-prototype__landing-modal-copyRow figma-prototype__landing-modal-copyRow--social">
            <div className="figma-prototype__landing-modal-shareList" aria-label="Compartir enlace">
              <button
                type="button"
                className="figma-prototype__landing-modal-shareButton"
                aria-label="Compartir por WhatsApp"
              >
                <img
                  src={LANDING_MODAL_ASSETS.whatsappIcon}
                  alt=""
                  aria-hidden="true"
                  className="figma-prototype__landing-modal-shareIcon figma-prototype__landing-modal-shareIcon--large"
                />
              </button>

              <button
                type="button"
                className="figma-prototype__landing-modal-shareButton"
                aria-label="Compartir por Facebook"
              >
                <img
                  src={LANDING_MODAL_ASSETS.facebookIcon}
                  alt=""
                  aria-hidden="true"
                  className="figma-prototype__landing-modal-shareIcon figma-prototype__landing-modal-shareIcon--large"
                />
              </button>

              <button
                type="button"
                className="figma-prototype__landing-modal-shareButton"
                aria-label="Compartir por Instagram"
              >
                <img
                  src={LANDING_MODAL_ASSETS.instagramIcon}
                  alt=""
                  aria-hidden="true"
                  className="figma-prototype__landing-modal-shareIcon"
                />
              </button>

              <button
                type="button"
                className="figma-prototype__landing-modal-shareButton"
                aria-label="Compartir por X"
              >
                <img
                  src={LANDING_MODAL_ASSETS.twitterXIcon}
                  alt=""
                  aria-hidden="true"
                  className="figma-prototype__landing-modal-shareIcon"
                />
              </button>
            </div>
          </div>

          {copied ? (
            <p className="figma-prototype__landing-modal-copyFeedback">Enlace copiado.</p>
          ) : null}

          <div className="figma-prototype__landing-modal-divider" aria-hidden="true" />

          <p className="figma-prototype__landing-modal-footerCopy">
            Tus beneficios aumentarán por cada persona que entre desde tu enlace y, al
            recibir la invitación al acceso anticipado, descargue la app y complete su
            registro.
          </p>
        </div>
      </div>
    </MobileLandingModalFrame>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
