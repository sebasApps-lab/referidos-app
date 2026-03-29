import DesktopLandingModalFrame from "./DesktopLandingModalFrame";
import { LANDING_MODAL_ASSETS } from "./desktopLandingModalAssets";

const TEAM_VALUES = [
  "Enfoque centrado en el usuario, sea negocio o cliente.",
  "Transparencia e integridad.",
  "Colaboración y mejora continua.",
];

export default function DesktopWhoWeAreModal({ isOpen, onClose }) {
  return (
    <DesktopLandingModalFrame
      isOpen={isOpen}
      onClose={onClose}
      designWidth={1075}
      designHeight={756}
      dialogLabel="Quiénes somos"
    >
      <button
        type="button"
        className="figma-prototype__landing-modal-close figma-prototype__landing-modal-close--wide"
        aria-label="Cerrar modal de quiénes somos"
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className="figma-prototype__landing-modal-stage figma-prototype__landing-modal-stage--wide">
        <img
          className="figma-prototype__landing-modal-heroIcon"
          src={LANDING_MODAL_ASSETS.teamIcon}
          alt=""
          aria-hidden="true"
        />

        <div className="figma-prototype__landing-modal-main figma-prototype__landing-modal-main--wide">
          <div className="figma-prototype__landing-modal-header figma-prototype__landing-modal-header--wide">
            <h2>Quiénes somos</h2>
            <p>
              Somos un equipo con una meta clara: ayudar a negocios y clientes a
              conectar de manera eficaz a través de promociones y recompensas.
              <br />
              <br />
              Con amplia experiencia en tecnología y marketing digital, desarrollamos
              soluciones que permiten a los negocios aumentar su alcance y a los
              clientes acceder a beneficios exclusivos de forma simple y segura.
            </p>
          </div>

          <div className="figma-prototype__landing-modal-bullets">
            {TEAM_VALUES.map((value) => (
              <div key={value} className="figma-prototype__landing-modal-bullet">
                <img
                  src={LANDING_MODAL_ASSETS.checkBullet}
                  alt=""
                  aria-hidden="true"
                  className="figma-prototype__landing-modal-bulletIcon"
                />
                <p>{value}</p>
              </div>
            ))}
          </div>

          <div className="figma-prototype__landing-modal-footerNote">
            <p>
              Nos esforzamos por ofrecer una plataforma confiable y beneficios para
              todos.
            </p>
          </div>
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
