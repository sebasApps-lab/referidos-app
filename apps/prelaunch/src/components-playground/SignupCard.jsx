import "./signupCard.css";

const ASSETS = {
  blur: "/assets/sign-up-card-glow.svg",
  bg: "/assets/sign-up-card-BG.svg",
  google: "/assets/material-icon-theme-google.svg",
  mail: "/assets/fluent-color-mail-16.svg",
  line: "/assets/hero-register-card-line.png",
};

function SignupCardButton({ className, iconSrc, label }) {
  return (
    <button type="button" className={className}>
      <img src={iconSrc} alt="" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export default function SignupCard() {
  return (
    <div className="components-playground__signup-wrap">
      <aside className="components-playground__signup-card" aria-label="Replica del sign up card">
        <img
          className="components-playground__signup-card-blur"
          src={ASSETS.blur}
          alt=""
          aria-hidden="true"
        />

        <div className="components-playground__signup-card-bg" aria-hidden="true">
          <img src={ASSETS.bg} alt="" />
        </div>

        <h2>Crea tu cuenta gratis</h2>

        <div className="components-playground__signup-body-line">
          <div className="components-playground__signup-body">
            <div className="components-playground__signup-actions">
              <SignupCardButton
                className="components-playground__signup-button components-playground__signup-button--google"
                iconSrc={ASSETS.google}
                label="Continuar con Google"
              />

              <SignupCardButton
                className="components-playground__signup-button components-playground__signup-button--mail"
                iconSrc={ASSETS.mail}
                label="Continuar con correo"
              />
            </div>

            <div className="components-playground__signup-bottom-text">
              <p className="components-playground__signup-note">
                Si ya tienes una cuenta, ten paciencia
                <br />
                recibir\u00e1s tu invitaci\u00f3n pronto.
              </p>
            </div>
          </div>

          <img
            className="components-playground__signup-line"
            src={ASSETS.line}
            alt=""
            aria-hidden="true"
          />
        </div>
      </aside>
    </div>
  );
}
