import { asset } from "../desktopWaitlistLandingAssets";
import DesktopSignupProviderButton from "./DesktopSignupProviderButton";

export default function DesktopSignupCard() {
  return (
    <div className="figma-prototype__signup-card-wrap">
      <aside className="figma-prototype__signup-card">
        <img className="figma-prototype__signup-card-blur" src={asset("sign-up-card-glow.svg")} alt="" aria-hidden="true" />
        <div className="figma-prototype__signup-card-bg" aria-hidden="true">
          <SignupCardSvg />
        </div>

        <h2>Crea tu cuenta gratis</h2>

        <div className="figma-prototype__signup-body-line">
          <div className="figma-prototype__signup-body">
            <div className="figma-prototype__signup-actions">
              <DesktopSignupProviderButton
                className="figma-prototype__signup-button figma-prototype__signup-button--google"
                Icon={GoogleMark}
                label="Continuar con Google"
              />

              <DesktopSignupProviderButton
                className="figma-prototype__signup-button figma-prototype__signup-button--mail"
                Icon={MailMark}
                label="Continuar con correo"
              />
            </div>

            <div className="figma-prototype__signup-bottom-text">
              <p className="figma-prototype__signup-note">
                Si ya tienes una cuenta, ten paciencia
                <br />
                recibirás tu invitación pronto.
              </p>
            </div>
          </div>

          <img className="figma-prototype__signup-line" src={asset("hero-register-card-line.png")} alt="" aria-hidden="true" />
        </div>
      </aside>
    </div>
  );
}

function SignupCardSvg() {
  return <img src={asset("sign-up-card-BG.svg")} alt="" />;
}

function GoogleMark() {
  return <img src={asset("material-icon-theme-google.svg")} alt="" />;
}

function MailMark() {
  return <img src={asset("fluent-color-mail-16.svg")} alt="" />;
}
