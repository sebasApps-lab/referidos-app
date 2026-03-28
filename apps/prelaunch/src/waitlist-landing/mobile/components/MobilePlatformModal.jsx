import MobileLandingModalFrame from "./MobileLandingModalFrame";
import { LANDING_MODAL_ASSETS } from "./MobileLandingModalAssets";

const PLATFORM_FEATURES = [
  "Explora, guarda y canjea promociones a tu conveniencia.",
  "Algunas funciones, descuentos o cupones pueden ajustarse durante esta etapa.",
  "Tu participación nos ayuda a mejorar la plataforma antes de su lanzamiento a todo público.",
];

export default function MobilePlatformModal({ isOpen, onClose }) {
  return (
    <MobileLandingModalFrame
      isOpen={isOpen}
      onClose={onClose}
      designWidth={1075}
      designHeight={729}
      dialogLabel="Sobre nuestra plataforma"
      rootClassName="mobile-landing__modal-root--wide mobile-landing__modal-root--platform"
    >
      <button
        type="button"
        className="figma-prototype__landing-modal-close figma-prototype__landing-modal-close--wide"
        aria-label="Cerrar modal de plataforma"
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className="figma-prototype__landing-modal-stage figma-prototype__landing-modal-stage--wide">
        <img
          className="figma-prototype__landing-modal-heroIcon"
          src={LANDING_MODAL_ASSETS.platformIcon}
          alt=""
          aria-hidden="true"
        />

        <div className="figma-prototype__landing-modal-main figma-prototype__landing-modal-main--wide">
          <div className="figma-prototype__landing-modal-header figma-prototype__landing-modal-header--wide">
            <h2>Sobre nuestra plataforma</h2>
            <p>
              Nuestra plataforma ha sido diseñada para que puedas descubrir, guardar y
              canjear promociones de manera sencilla y eficiente. El acceso anticipado
              corresponde a una versión beta funcional, creada para explorar la
              experiencia de recompensa antes del lanzamiento general.
            </p>
          </div>

          <div className="figma-prototype__landing-modal-bullets">
            {PLATFORM_FEATURES.map((feature) => (
              <div key={feature} className="figma-prototype__landing-modal-bullet">
                <img
                  src={LANDING_MODAL_ASSETS.checkBullet}
                  alt=""
                  aria-hidden="true"
                  className="figma-prototype__landing-modal-bulletIcon"
                />
                <p>{feature}</p>
              </div>
            ))}
          </div>

          <div className="figma-prototype__landing-modal-footerNote">
            <p>
              Nuestro objetivo es ofrecer una app más sólida, clara y optimizada para que
              aproveches tus recompensas al máximo.
            </p>
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
