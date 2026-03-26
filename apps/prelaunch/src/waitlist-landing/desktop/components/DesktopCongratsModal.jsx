import { useState } from "react";
import DesktopLandingModalFrame from "./DesktopLandingModalFrame";
import { LANDING_MODAL_ASSETS } from "./desktopLandingModalAssets";

const INVITE_LINK = "qrew.es/invite/ABC123XYZ";

export default function DesktopCongratsModal({ isOpen, onClose }) {
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
    <DesktopLandingModalFrame
      isOpen={isOpen}
      onClose={onClose}
      designWidth={924}
      designHeight={557}
      dialogLabel="Felicitaciones, ya estás en la lista"
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
    </DesktopLandingModalFrame>
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
