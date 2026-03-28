import MobileLandingModalFrame from "./MobileLandingModalFrame";
import { LANDING_MODAL_ASSETS } from "./MobileLandingModalAssets";

export default function MobileInvitationModal({ isOpen, onClose, onPrimaryAction }) {
  return (
    <MobileLandingModalFrame
      isOpen={isOpen}
      onClose={onClose}
      designWidth={1075}
      designHeight={729}
      dialogLabel="Recibir invitación"
      rootClassName="mobile-landing__modal-root--invitation mobile-landing__modal-root--wide"
    >
      <button
        type="button"
        className="figma-prototype__landing-modal-close figma-prototype__landing-modal-close--wide"
        aria-label="Cerrar modal de invitación"
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className="figma-prototype__landing-modal-stage figma-prototype__landing-modal-stage--wide">
        <img
          className="figma-prototype__landing-modal-heroIcon"
          src={LANDING_MODAL_ASSETS.invitationClockIcon}
          alt=""
          aria-hidden="true"
        />

        <div className="figma-prototype__landing-modal-main figma-prototype__landing-modal-main--wide">
          <div className="figma-prototype__landing-modal-header figma-prototype__landing-modal-header--wide">
            <h2>
              <span className="mobile-landing__invitation-title-regular">
                El acceso anticipado a la aplicación llegará{" "}
              </span>
              <span className="mobile-landing__invitation-title-accent">muy pronto</span>
            </h2>
            <img
              src="/assets/line-5.png"
              alt=""
              aria-hidden="true"
              className="mobile-landing__invitation-divider"
            />
            <p className="mobile-landing__invitation-copy">
              Deja tu correo en la lista para recibir tu invitación,{" "}
              <span className="mobile-landing__invitation-copy-accent">
                recibe beneficios extra
              </span>{" "}
              por participar.
            </p>
          </div>

          <div className="mobile-landing__invitation-cta-wrap">
            <button
              type="button"
              className="mobile-landing__invitation-submit"
              onClick={onPrimaryAction}
            >
              <img
                src={LANDING_MODAL_ASSETS.notifyBellIcon}
                alt=""
                aria-hidden="true"
                className="mobile-landing__invitation-submit-icon"
              />
              <span>Recibir invitación</span>
            </button>
          </div>
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
