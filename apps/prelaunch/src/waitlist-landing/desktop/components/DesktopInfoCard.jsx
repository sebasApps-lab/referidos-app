import { asset } from "../desktopWaitlistLandingAssets";
import DesktopSignupProviderButton from "./DesktopSignupProviderButton";

export default function DesktopInfoCard({ onInviteClick }) {
  return (
    <div className="figma-prototype__info-card-wrap">
      <aside className="figma-prototype__info-card figma-prototype__info-card--notify">
        <img
          className="figma-prototype__info-card-blur"
          src={asset("sign-up-card-glow.svg")}
          alt=""
          aria-hidden="true"
        />

        <div className="figma-prototype__info-card-bg" aria-hidden="true">
          <img src={asset("sign-up-card-BG.svg")} alt="" />
        </div>

        <div className="figma-prototype__info-content">
          <div className="figma-prototype__info-clock-wrap">
            <img
              className="figma-prototype__info-clock"
              src={asset("clock-yellow-icon.png")}
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="figma-prototype__info-copy-block">
            <p className="figma-prototype__info-heading">
              {"El acceso anticipado a la aplicación llegará "}
              <span>muy pronto</span>
            </p>

            <img
              className="figma-prototype__info-line"
              src={asset("hero-register-card-line.png")}
              alt=""
              aria-hidden="true"
            />

            <p className="figma-prototype__info-copy">
              {"Deja tu correo en la lista para recibir tu invitación, recibe "}
              <span>beneficios extra</span> por participar.
            </p>
          </div>

          <DesktopSignupProviderButton
            className="figma-prototype__info-button figma-prototype__info-button--notify"
            Icon={NotifyBellIcon}
            onClick={onInviteClick}
            label={"Recibir invitación"}
          />
        </div>
      </aside>
    </div>
  );
}

function NotifyBellIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 31 31"
      width="19"
      height="19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.125 24.5418V25.8335H3.875V24.5418L6.45833 21.9585V14.2085C6.45833 10.2043 9.08042 6.67808 12.9167 5.54141V5.16683C12.9167 4.48169 13.1888 3.82461 13.6733 3.34014C14.1578 2.85567 14.8149 2.5835 15.5 2.5835C16.1851 2.5835 16.8422 2.85567 17.3267 3.34014C17.8112 3.82461 18.0833 4.48169 18.0833 5.16683V5.54141C21.9196 6.67808 24.5417 10.2043 24.5417 14.2085V21.9585L27.125 24.5418ZM18.0833 27.1252C18.0833 27.8103 17.8112 28.4674 17.3267 28.9519C16.8422 29.4363 16.1851 29.7085 15.5 29.7085C14.8149 29.7085 14.1578 29.4363 13.6733 28.9519C13.1888 28.4674 12.9167 27.8103 12.9167 27.1252"
        fill="#FFFFFF"
      />
    </svg>
  );
}
