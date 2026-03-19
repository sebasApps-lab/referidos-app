import { useId, useState } from "react";
import "./mobileWaitlistLanding.css";

const asset = (name) => `/assets/mobile/${encodeURIComponent(name)}`;
const sharedAsset = (name) => `/assets/icons/${encodeURIComponent(name)}`;
const HERO_MASK_PATH =
  "M345.06 883.145C418.6 877.273 467.016 870.173 526 863.263C584.984 856.352 1076 775.5 1076 775.5V0H-529V869C-529 869 -228.5 895 -123 897C-17.5 899 50.02 899.641 146.682 894.391C255.173 888.498 236.691 891.797 345.06 883.145Z";
const HERO_MASK_SCALE_X = 627 / 430;
const HERO_MASK_SCALE_Y = 902 / 906;

const steps = [
  {
    id: "mail",
    title: (
      <>
        <span className="mobile-landing__step-title-strong">{"A\u00f1ade"}</span>{" "}
        <span className="mobile-landing__step-title-light">
          tu correo
          <br />
          a la lista
        </span>
      </>
    ),
    description: (
      <>
        {"Espera y recibe la invitaci\u00f3n"}
        <br />
        para descargar la app.
      </>
    ),
    iconShadowSrc: asset("mail-icon-shadow.png"),
    iconSrc: asset("mail-icon.png"),
    iconShadowClassName:
      "mobile-landing__step-icon-shadow mobile-landing__step-icon-shadow--mail",
    iconClassName: "mobile-landing__step-icon-image mobile-landing__step-icon-image--mail",
    wrapClassName: "mobile-landing__step-card mobile-landing__step-card--mail",
  },
  {
    id: "gift",
    title: (
      <>
        <span className="mobile-landing__step-title-strong">Descarga</span>{" "}
        <span className="mobile-landing__step-title-light">
          y recibe
          <br />
          tu recompensas
        </span>
      </>
    ),
    description: (
      <>
        Recibe tus beneficios extra por
        <br />
        participar en el acceso anticipado.
      </>
    ),
    iconSrc: sharedAsset("icon-gift.png"),
    iconShadowClassName: "mobile-landing__step-gift-shadow",
    iconClassName: "mobile-landing__step-icon-image mobile-landing__step-icon-image--gift",
    wrapClassName: "mobile-landing__step-card mobile-landing__step-card--gift",
  },
  {
    id: "coins",
    title: (
      <>
        <span className="mobile-landing__step-title-strong">Gana puntos</span>
        <br />
        <span className="mobile-landing__step-title-light">y recompensas</span>
      </>
    ),
    description: (
      <>
        Canjea promociones, suma puntos
        <br />
        {"y obt\u00e9n m\u00e1s beneficios."}
      </>
    ),
    iconShadowClassName: "mobile-landing__step-gift-shadow",
    iconSrc: sharedAsset("icon-coins.png"),
    iconClassName: "mobile-landing__step-icon-image mobile-landing__step-icon-image--coins",
    wrapClassName: "mobile-landing__step-card mobile-landing__step-card--coins",
  },
];

const promoCards = [
  {
    id: "discounts",
    badge: "20%",
    title: "DESCUENTOS",
    description:
      "En compras de locales de comida y locales de diferentes productos y servicios.",
    until: "01 Abril",
    background: asset("promo-card-bg.svg"),
    dottedLine: asset("promo-card-dotted-line.svg"),
    qr: asset("vaadin_qrcode.svg"),
    thumbClassName: "mobile-landing__promo-thumb mobile-landing__promo-thumb--discount",
    thumbBgClassName: "mobile-landing__promo-thumb-bg",
    iconClassName: "mobile-landing__promo-icon mobile-landing__promo-icon--discount",
    iconSrc: asset("discount-bomb.png"),
  },
  {
    id: "gifts",
    badge: "Gratis",
    title: "REGALOS POR COMPRAR",
    description:
      "Regalos por realizar compras de ciertos productos o por superar cierto valor de compra.",
    until: "16 de Sept.",
    background: asset("promo-card-bg.svg"),
    dottedLine: asset("promo-card-dotted-line.svg"),
    qr: asset("vaadin_qrcode.svg"),
    thumbClassName: "mobile-landing__promo-thumb mobile-landing__promo-thumb--gift",
    thumbBgClassName: "mobile-landing__promo-thumb-bg",
    iconClassName: "mobile-landing__promo-icon mobile-landing__promo-icon--gift",
    iconSrc: asset("gift-icon-black 1.png"),
  },
  {
    id: "twoxone",
    badge: "2 x 1",
    title: "2 X 1",
    description:
      "Cada local o negocio oferta sus productos con promociones del tipo 2 x 1, 3 x 1 y m\u00e1s.",
    until: "22 de Abril",
    background: asset("promo-card-bg.svg"),
    dottedLine: asset("promo-card-dotted-line.svg"),
    qr: asset("vaadin_qrcode.svg"),
    thumbClassName: "mobile-landing__promo-thumb mobile-landing__promo-thumb--twoxone",
    thumbBgClassName: "mobile-landing__promo-thumb-bg",
    iconClassName: "mobile-landing__promo-icon mobile-landing__promo-icon--twoxone",
    iconSrc: asset("2x1-icon 2.png"),
  },
];

const footerPanels = [
  "Ayuda",
  "Para negocios",
  "\u00bfQui\u00e9nes somos?",
  "Borrar datos",
];

export default function MobileWaitlistLandingPage() {
  const heroClipId = useId().replace(/:/g, "");
  const heroFilterId = useId().replace(/:/g, "");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <main className="mobile-landing" aria-label="Mobile waitlist landing">
      <div className="mobile-landing__hero-bg-wrap" aria-hidden="true">
        <svg
          className="mobile-landing__hero-bg-svg"
          viewBox="0 0 627 918"
          preserveAspectRatio="xMidYMin meet"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <defs>
            <clipPath id={heroClipId} clipPathUnits="userSpaceOnUse">
              <path
                d={HERO_MASK_PATH}
                transform={`scale(${HERO_MASK_SCALE_X} ${HERO_MASK_SCALE_Y})`}
              />
            </clipPath>
            <filter
              id={heroFilterId}
              x="-780"
              y="-6"
              width="2380"
              height="930"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2.11467" />
              <feGaussianBlur stdDeviation="2.2204" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.51 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
          <path
            d={HERO_MASK_PATH}
            transform={`scale(${HERO_MASK_SCALE_X} ${HERO_MASK_SCALE_Y})`}
            fill="#ffffff"
            filter={`url(#${heroFilterId})`}
          />
          <image
            className="mobile-landing__hero-bg-image"
            href={asset("hero-header-bg-image.png")}
            x="-3"
            y="0"
            width="627"
            height="918"
            preserveAspectRatio="xMidYMin slice"
            clipPath={`url(#${heroClipId})`}
          />
        </svg>
      </div>

      <section className="mobile-landing__top-page">
        <div className="mobile-landing__top-section">
          <header className="mobile-landing__header">
            <div className="mobile-landing__brand">
              <div className="mobile-landing__brand-row">
                <span className="mobile-landing__brand-referidos">REFERIDOS</span>
                <span className="mobile-landing__brand-app">APP</span>
              </div>
              <div className="mobile-landing__brand-subtitle">Acceso anticipado</div>
            </div>

            <button
              type="button"
              className="mobile-landing__menu-button"
              aria-label={"Abrir men\u00fa"}
            >
              <span className="mobile-landing__menu-line" />
              <span className="mobile-landing__menu-line" />
              <span className="mobile-landing__menu-line" />
            </button>
          </header>

          <section className="mobile-landing__hero-section">
            <div className="mobile-landing__hero-text">
              <h1 className="mobile-landing__hero-title">
                {"Descubre y comparte ofertas, gana recompensas f\u00e1cilmente"}
              </h1>
              <p className="mobile-landing__hero-copy">
                Participa en el <strong>acceso anticipado</strong> de la app y recibe
                beneficios extra, solo por usar la {"aplicaci\u00f3n"}.
              </p>
            </div>

            <div className="mobile-landing__hero-actions">
              <button type="button" className="mobile-landing__hero-primary-button">
                <span>Entrar a la lista de espera</span>
                <span>&gt;</span>
              </button>

              <button type="button" className="mobile-landing__hero-link-button">
                {"\u00bfC\u00f3mo funciona?"}
              </button>
            </div>
          </section>
        </div>

        <div className="mobile-landing__second-section">
          <section className="mobile-landing__phone-section">
            <img
              className="mobile-landing__phone-back-shadow"
              src={asset("phone-back-shadow-container.png")}
              alt=""
            />
            <img className="mobile-landing__phone-glow" src={asset("phone-glow.png")} alt="" />
            <img
              className="mobile-landing__phone-image"
              src={asset("Nothing Phone 2a 2.png")}
              alt={"Aplicaci\u00f3n Referidos App en un tel\u00e9fono"}
            />
          </section>

          <section className="mobile-landing__signup-about">
            <section className="mobile-landing__signup-card">
              <img
                className="mobile-landing__signup-card-bg"
                src={asset("sign-up-card-bg.png")}
                alt=""
              />

              <h2 className="mobile-landing__signup-title">Crea tu cuenta gratis</h2>

              <div className="mobile-landing__signup-body">
                <div className="mobile-landing__signup-buttons">
                  <button
                    type="button"
                    className="mobile-landing__signup-button mobile-landing__signup-button--google"
                  >
                    <img src={asset("material-icon-theme_google.svg")} alt="" />
                    <span>Continuar con Google</span>
                  </button>

                  <button
                    type="button"
                    className="mobile-landing__signup-button mobile-landing__signup-button--mail"
                  >
                    <img src={asset("fluent-color_mail-16.svg")} alt="" />
                    <span>Continuar con correo</span>
                  </button>
                </div>

                <p className="mobile-landing__signup-note">
                  {"Si ya tienes una cuenta, ten paciencia recibir\u00e1s tu invitaci\u00f3n pronto."}
                </p>

                <div className="mobile-landing__signup-divider" />
              </div>
            </section>

            <section className="mobile-landing__about-block">
              <div className="mobile-landing__about-heading">
                <h2 className="mobile-landing__about-title">
                  <span>{"As\u00ed de "}</span>
                  <strong>{"r\u00e1pido y simple"}</strong>
                </h2>
                <p className="mobile-landing__about-copy">
                  {"Entra en la lista de espera para recibir tu invitaci\u00f3n."}
                  <br />
                  {"Descarga la app una vez est\u00e9 disponible y recibe beneficios."}
                </p>
              </div>

              <div className="mobile-landing__steps">
                {steps.map((step) => (
                  <article key={step.id} className={step.wrapClassName}>
                    <img
                      className="mobile-landing__step-card-volume"
                      src={asset("card-volume.png")}
                      alt=""
                    />
                    <div className="mobile-landing__step-card-surface">
                      <p className="mobile-landing__step-title">{step.title}</p>
                      <p className="mobile-landing__step-description">{step.description}</p>
                    </div>
                    <img
                      className="mobile-landing__step-card-glow"
                      src={asset("card-glow.svg")}
                      alt=""
                    />
                    {step.iconShadowSrc ? (
                      <img className={step.iconShadowClassName} src={step.iconShadowSrc} alt="" />
                    ) : (
                      <div className={step.iconShadowClassName} />
                    )}
                    <img className={step.iconClassName} src={step.iconSrc} alt="" />
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </section>

      <section className="mobile-landing__features-contact">
        <div className="mobile-landing__bottom-mask-wrap" aria-hidden="true">
          <img className="mobile-landing__bottom-mask" src={asset("bottom-bg-mask.png")} alt="" />
          <img className="mobile-landing__bottom-glow" src={asset("bottom-glow.png")} alt="" />
        </div>

        <div className="mobile-landing__features-contact-inner">
          <section className="mobile-landing__waitlist">
            <div className="mobile-landing__waitlist-heading">
              <h2 className="mobile-landing__waitlist-title">No te quedes sin tu invitación</h2>
              <div className="mobile-landing__waitlist-form-block">
                <p className="mobile-landing__waitlist-copy">
                  Los puestos son limitados, entra en la lista de espera
                </p>

                <div className="mobile-landing__waitlist-form">
                  <div className="mobile-landing__waitlist-email-wrap">
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(event) => setWaitlistEmail(event.target.value)}
                      placeholder={"Tu correo electr\u00f3nico..."}
                      className="mobile-landing__waitlist-email-input"
                    />
                  </div>

                  <div className="mobile-landing__green-button-wrap">
                    <img
                      className="mobile-landing__green-button-glow"
                      src={asset("green-button-glow.png")}
                      alt=""
                    />
                    <button type="button" className="mobile-landing__green-button">
                      <span>{"A\u00f1adir correo a la lista"}</span>
                    </button>
                  </div>

                  <p className="mobile-landing__legal-copy">
                    {"Al suscribirte, aceptas los "}
                    <span>{"t\u00e9rminos y condiciones,"}</span>
                    {" adem\u00e1s de las "}
                    <span>{"Pol\u00edticas de Privacidad"}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mobile-landing__promo-section">
              <h2 className="mobile-landing__promo-heading">
                {"\u00a1Encuentra esto y m\u00e1s!"}
              </h2>

              <div className="mobile-landing__promo-list">
                {promoCards.map((card) => (
                  <article key={card.id} className="mobile-landing__promo-card">
                    <img className="mobile-landing__promo-card-bg" src={card.background} alt="" />
                    <div className="mobile-landing__promo-card-content">
                      <div className={card.thumbClassName}>
                        <div className={card.thumbBgClassName} />
                        <img className={card.iconClassName} src={card.iconSrc} alt="" />
                        <div className="mobile-landing__promo-badge">{card.badge}</div>
                      </div>

                      <img
                        className="mobile-landing__promo-dotted-line"
                        src={card.dottedLine}
                        alt=""
                      />

                      <div className="mobile-landing__promo-body">
                        <div className="mobile-landing__promo-description">
                          <div className="mobile-landing__promo-title">{card.title}</div>
                          <p className="mobile-landing__promo-copy">{card.description}</p>
                        </div>

                        <div className="mobile-landing__promo-meta">
                          <div className="mobile-landing__promo-date">
                            <span>Hasta</span>
                            <span>{card.until}</span>
                          </div>

                          <img className="mobile-landing__promo-qr" src={card.qr} alt="" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mobile-landing__contact-section">
            <h2 className="mobile-landing__contact-title">{"D\u00e9janos un mensaje"}</h2>

            <div className="mobile-landing__contact-form">
              <div className="mobile-landing__contact-copy-block">
                <p className="mobile-landing__contact-copy">
                  Tus ideas y opiniones son muy valiosas para nosotros, no dudes en
                  escribirnos.
                </p>
                <p className="mobile-landing__contact-copy">
                  Si necesitas ayuda, usa el siguiente <span>enlace</span>.
                </p>
              </div>

              <div className="mobile-landing__contact-fields">
                <div className="mobile-landing__contact-input-wrap">
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nombre..."
                    className="mobile-landing__contact-input"
                  />
                </div>

                <div className="mobile-landing__contact-input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={"Correo electr\u00f3nico"}
                    className="mobile-landing__contact-input"
                  />
                </div>

                <div className="mobile-landing__contact-textarea-wrap">
                  <textarea
                    value={message}
                    onChange={(event) => {
                      if (event.target.value.length <= 200) {
                        setMessage(event.target.value);
                      }
                    }}
                    placeholder="Mensaje..."
                    className="mobile-landing__contact-textarea"
                    maxLength={200}
                  />
                  <div className="mobile-landing__contact-counter">{message.length} / 200</div>
                </div>
              </div>

              <div className="mobile-landing__purple-button-wrap">
                <img
                  className="mobile-landing__purple-button-glow"
                  src={asset("purple-button-glow.png")}
                  alt=""
                />
                <button type="button" className="mobile-landing__purple-button">
                  <span>Enviar mensaje</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className="mobile-landing__footer">
          <div className="mobile-landing__footer-panels">
            {footerPanels.map((panel) => (
              <button key={panel} type="button" className="mobile-landing__footer-panel">
                <span>{panel}</span>
              </button>
            ))}
          </div>

          <div className="mobile-landing__footer-info">
            <div className="mobile-landing__footer-about">
              <div className="mobile-landing__footer-brand">REFERIDOS APP</div>
              <p className="mobile-landing__footer-about-copy">
                {"Cat\u00e1logo de promociones y sistema de recompensas por canjearlas y referir."}
              </p>
            </div>

            <div className="mobile-landing__footer-legal">
              <div className="mobile-landing__footer-legal-links">
                <button type="button">{"T\u00e9rminos"}</button>
                <span>-</span>
                <button type="button">Privacidad</button>
              </div>
              <div className="mobile-landing__footer-copyright">
                {"\u00a9 2026 Referidos App. Todos los derechos reservados."}
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
