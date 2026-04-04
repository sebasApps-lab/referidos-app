import DesktopSignupProviderButton from "./DesktopSignupProviderButton";
import heroRegisterCardLine from "../../../assets/landing/hero/hero-register-card-line.png";
import signUpCardBg from "../../../assets/landing/hero/sign-up-card-BG.svg";
import signUpCardGlow from "../../../assets/landing/hero/sign-up-card-glow.svg";
import googleIcon from "../../../assets/shared/material-icon-theme-google.svg";
import supportMailIcon from "../../../assets/support/fluent-color-mail-16.svg";

export default function DesktopSignupCard() {
  return (
    <div className="business-landing__signup-card-wrap">
      <aside className="business-landing__signup-card">
        <img className="business-landing__signup-card-blur" src={signUpCardGlow} alt="" aria-hidden="true" />
        <div className="business-landing__signup-card-bg" aria-hidden="true">
          <SignupCardSvg />
        </div>

        <h2>Crea tu cuenta gratis</h2>

        <div className="business-landing__signup-body-line">
          <div className="business-landing__signup-body">
            <div className="business-landing__signup-actions">
              <DesktopSignupProviderButton
                className="business-landing__signup-button business-landing__signup-button--google"
                Icon={GoogleMark}
                label="Continuar con Google"
              />

              <DesktopSignupProviderButton
                className="business-landing__signup-button business-landing__signup-button--mail"
                Icon={MailMark}
                label="Continuar con correo"
              />
            </div>

            <div className="business-landing__signup-bottom-text">
              <p className="business-landing__signup-note">
                Si ya tienes una cuenta, ten paciencia
                <br />
                recibirás tu invitación pronto.
              </p>
            </div>
          </div>

          <img className="business-landing__signup-line" src={heroRegisterCardLine} alt="" aria-hidden="true" />
        </div>
      </aside>
    </div>
  );
}

function SignupCardSvg() {
  return <img src={signUpCardBg} alt="" />;
}

function GoogleMark() {
  return <img src={googleIcon} alt="" />;
}

function MailMark() {
  return <img src={supportMailIcon} alt="" />;
}

