import React, { useState } from "react";
import "./figmaPrototype.css";

const navigationLinks = [
  "Cómo funciona",
  "Recibir invitación",
  "Para negocios",
];

const benefitCards = [
  {
    key: "correo",
    title: (
      <>
        <span className="figma-prototype__benefit-title-bold">Anade</span>
        <span className="figma-prototype__benefit-title-medium">
          {" "}tu correo
          <br />a la lista
        </span>
      </>
    ),
    description: (
      <>
        Espera y recibe la invitacion
        Espera y recibe la invitación
        <br />
        para descargar la app.
      </>
    ),
  },
  {
    key: "recompensas",
    title: (
      <>
        <span className="figma-prototype__benefit-title-bold">Descarga</span>
        <span className="figma-prototype__benefit-title-regular">
          {" "}y recibe
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
  },
  {
    key: "puntos",
    title: (
      <>
        <span className="figma-prototype__benefit-title-bold">Gana puntos </span>
        <span className="figma-prototype__benefit-title-regular">
          <br />
        </span>
        <span className="figma-prototype__benefit-title-medium">y recompensas</span>
      </>
    ),
    description: (
      <>
        Canjea promociones, suma puntos
        <br />y obten mas beneficios.
      </>
    ),
  },
];

const promoCards = [
  {
    key: "descuentos",
    badge: "- 30%",
    title: "DESCUENTOS",
    description:
      "En compras de locales de comida y locales de diferentes productos y servicios.",
    until: "01 Abril",
    shadowSrc: "/assets/bottom-card-shadow.svg",
    bgSrc: "/assets/card-bg.svg",
    dividerSrc: "/assets/bottom-card-dotted-line.svg",
    qrSrc: "/assets/icons/qr-code.svg",
  },
  {
    key: "regalos",
    badge: "Gratis",
    title: "REGALOS POR COMPRAR",
    description:
      "Regalos por realizar compras de ciertos productos o por superar cierto valor de compra.",
    until: "16 de Sept.",
    shadowSrc: "/assets/card-shadow.svg",
    bgSrc: "/assets/card-bg.svg",
    dividerSrc: "/assets/Line%206.svg",
    qrSrc: "/assets/icons/qr-code.svg",
  },
  {
    key: "dos-por-uno",
    badge: "2 x 1",
    title: "2 X 1",
    description:
      "Cada local o negocio oferta sus productos con promociones del tipo 2 x 1, 3 x 1 y mas.",
    until: "22 de Abril",
    shadowSrc: "/assets/card-shadow.svg",
    bgSrc: "/assets/card-bg.svg",
    dividerSrc: "/assets/Line%206.svg",
    qrSrc: "/assets/icons/qr-code.svg",
  },
];

const footerColumns = [
  {
    title: "INFORMACION",
    links: ["Plataforma", "Quienes somos"],
  },
  {
    title: "LEGAL",
    links: ["Privacidad", "Terminos y Condiciones", "Borrar mis datos"],
  },
  {
    title: "CONTACTO",
    links: ["Chat de soporte", "Soporte por correo", "Comentarios y sugerencias"],
  },
];

export default function FigmaPrototypePage() {
  return (
    <main className="figma-prototype" aria-label="Figma prototype v2">
      <div className="figma-prototype__shell">
        <section className="figma-prototype__hero-band">
          <NavigationHeaderSection />
          <HeroPromoSection />
        </section>
        <BenefitsOverviewSection />
        <section className="figma-prototype__bottom-band">
          <WaitlistSignupSection />
          <FooterLinksSection />
        </section>
      </div>
    </main>
  );
}

function NavigationHeaderSection() {
  return (
    <header className="figma-prototype__nav">
      <div className="figma-prototype__nav-brand">
        <span className="figma-prototype__nav-brand-main">REFERIDOS</span>
        <span className="figma-prototype__nav-brand-accent">APP</span>
        <span className="figma-prototype__nav-brand-tag">Acceso anticipado</span>
      </div>

      <nav className="figma-prototype__nav-links" aria-label="Principal">
        {navigationLinks.map((link) => (
          <a key={link} href="#!" onClick={(event) => event.preventDefault()}>
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}

function HeroPromoSection() {
  return (
    <section className="figma-prototype__hero">
      <div className="figma-prototype__hero-shadow-group" aria-hidden="true">
        <img className="figma-prototype__hero-shadow-pink-glow" src="/assets/shadow-pink-glow.svg" alt="" />
        <img className="figma-prototype__hero-shadow-pink-base" src="/assets/shadow-pink-base.svg" alt="" />
        <img className="figma-prototype__hero-shadow-purple-glow" src="/assets/shadow-purple-glow.svg" alt="" />
        <img className="figma-prototype__hero-shadow-purple-base" src="/assets/shadow-purple-base.svg" alt="" />
      </div>

      <div className="figma-prototype__hero-bg" aria-hidden="true">
        <img src="/assets/bg-mask-group.svg" alt="" />
      </div>

      <div className="figma-prototype__hero-content">
        <div className="figma-prototype__hero-copy">
          <div className="figma-prototype__hero-copy-stack">
            <div className="figma-prototype__hero-copy-body">
              <p className="figma-prototype__hero-title">
                Descubre y comparte
                <br />
                ofertas, gana
                <br />
                recompensas fácilmente
              </p>

              <p className="figma-prototype__hero-subtitle">
                <span>Participa en el </span>
                <strong>acceso anticipado</strong>
                <span>
                  {" "}de la app y recibe
                  <br />
                  beneficios extra, solo por usar la aplicación.
                </span>
              </p>
            </div>

            <button className="figma-prototype__hero-button" type="button">
              <span>Entrar a la lista de espera</span>
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>

          <div className="figma-prototype__hero-visual">
            <div className="figma-prototype__hero-phone">
              <img
                className="figma-prototype__hero-phone-glow"
                src="/assets/phone-glow.svg"
                alt=""
                aria-hidden="true"
              />
              <img
                className="figma-prototype__hero-phone-device"
                src="/assets/Nothing%20Phone%202a%202.png"
                alt="Mockup del telefono Nothing Phone 2a mostrando la app Referidos"
                loading="eager"
              />
            </div>

            <img className="figma-prototype__hero-phone-back-shadow" src="/assets/phone-back-shadow.svg" alt="" aria-hidden="true" />

            <div className="figma-prototype__signup-card-wrap">
              <aside className="figma-prototype__signup-card">
              <img className="figma-prototype__signup-card-blur" src="/assets/sign-up-card-glow.svg" alt="" aria-hidden="true" />
              <div className="figma-prototype__signup-card-bg" aria-hidden="true">
                <SignupCardSvg />
              </div>

              <h2>Crea tu cuenta gratis</h2>

              <div className="figma-prototype__signup-body-line">
                <div className="figma-prototype__signup-body">
                  <div className="figma-prototype__signup-actions">
                    <button className="figma-prototype__signup-button figma-prototype__signup-button--google" type="button">
                      <GoogleMark />
                      <span>Continuar con Google</span>
                    </button>

                    <button className="figma-prototype__signup-button figma-prototype__signup-button--mail" type="button">
                      <MailMark />
                      <span>Continuar con correo</span>
                    </button>
                  </div>

                  <div className="figma-prototype__signup-bottom-text">
                    <p className="figma-prototype__signup-note">
                      Si ya tienes una cuenta, ten paciencia
                      <br />
                      recibirás tu invitación pronto.
                    </p>
                  </div>
                </div>

                <img className="figma-prototype__signup-line" src="/assets/hero-register-card-line.png" alt="" aria-hidden="true" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsOverviewSection() {
  return (
    <section className="figma-prototype__benefits">
      <div className="figma-prototype__benefits-inner">
        <div className="figma-prototype__benefits-heading">
          <div className="figma-prototype__benefits-title">
            <span>Asi de</span>
            <strong>rapido y simple</strong>
          </div>

          <p>
            <span>
              Entra en la lista de espera para recibir tu invitación, descarga la app una vez este disponible y{" "}
            </span>
            <span className="figma-prototype__benefits-heading-regular">recibe beneficios</span>
            <span className="figma-prototype__benefits-heading-strong">!</span>
          </p>
        </div>

        <div className="figma-prototype__benefit-grid">
          {benefitCards.map((card) => (
            <article key={card.key} className={`figma-prototype__benefit-card figma-prototype__benefit-card--${card.key}`}>
              <div className="figma-prototype__benefit-shadow" aria-hidden="true" />

              <div className="figma-prototype__benefit-surface">
                <h3 className="figma-prototype__benefit-title-content">{card.title}</h3>
                <p className="figma-prototype__benefit-description">{card.description}</p>
              </div>

              <div className="figma-prototype__benefit-gloss" aria-hidden="true" />
              <BenefitIcon type={card.key} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ type }) {
  const srcMap = {
    correo: "/assets/icons/icon-mail-blue.png",
    recompensas: "/assets/icons/icon-gift.png",
    puntos: "/assets/icons/icon-coins.png",
  };
  const shadowMap = {
    correo: "/assets/mid-card-icon-shadow-1.svg",
    recompensas: "/assets/mid-card-icon-shadow-2.svg",
    puntos: "/assets/mid-card-icon-shadow-3.svg",
  };

  return (
    <div className={`figma-prototype__benefit-icon figma-prototype__benefit-icon--${type}`} aria-hidden="true">
      <img className="figma-prototype__benefit-icon-shadow" src={shadowMap[type]} alt="" />
      <img src={srcMap[type]} alt="" loading="lazy" />
    </div>
  );
}

function WaitlistSignupSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="figma-prototype__waitlist">
      <div className="figma-prototype__waitlist-bg" aria-hidden="true" />
      <div className="figma-prototype__waitlist-glow" aria-hidden="true">
        <img src="/assets/glow-bottom-section.svg" alt="" />
      </div>

      <div className="figma-prototype__waitlist-content">
        <div className="figma-prototype__waitlist-copy">
          <p className="figma-prototype__waitlist-title">
            No te quedes sin un puesto
            <br />
            para participar
          </p>

          <div className="figma-prototype__waitlist-copy-stack">
            <p className="figma-prototype__waitlist-subtitle">
              Los puestos son limitados, entra en la lista de espera
            </p>

            <div className="figma-prototype__waitlist-form">
              <div className="figma-prototype__waitlist-inputRow">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Tu correo electronico"
                />

                <div className="figma-prototype__waitlist-buttonWrap">
                  <button type="button">Anadir correo</button>
                  <span className="figma-prototype__waitlist-buttonGlow" aria-hidden="true" />
                </div>
              </div>

              <p className="figma-prototype__waitlist-legal">
                <span>Al suscribirte, aceptas los </span>
                <span className="figma-prototype__waitlist-legal-link">terminos y condiciones</span>
                <span>, ademas de las </span>
                <span className="figma-prototype__waitlist-legal-link">Politicas de Privacidad</span>
              </p>
            </div>
          </div>
        </div>

        <div className="figma-prototype__promo-stack">
          <img className="figma-prototype__promo-stack-blur" src="/assets/card-carousel-glow.png" alt="" aria-hidden="true" />
          <img className="figma-prototype__promo-stack-glass" src="/assets/card-carousle-glass.svg" alt="" aria-hidden="true" />

          <div className="figma-prototype__promo-cards">
            {promoCards.map((card) => (
              <PromoCard key={card.key} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PromoCard({ badge, title, description, until, shadowSrc, bgSrc, dividerSrc, qrSrc }) {
  return (
    <article className="figma-prototype__promo-card">
      <img className="figma-prototype__promo-card-shadow" src={shadowSrc} alt="" aria-hidden="true" />

      <div className="figma-prototype__promo-card-surface">
        <img className="figma-prototype__promo-card-bg" src={bgSrc} alt="" aria-hidden="true" />

        <div className="figma-prototype__promo-content">
          <div className="figma-prototype__promo-thumb">
            <span>{badge}</span>
          </div>

          <img className="figma-prototype__promo-divider" src={dividerSrc} alt="" aria-hidden="true" />

          <div className="figma-prototype__promo-copy">
            <div className="figma-prototype__promo-copy-top">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>

            <div className="figma-prototype__promo-copy-bottom">
              <div className="figma-prototype__promo-until">
                <span>Hasta</span>
                <span>{until}</span>
              </div>
              <img className="figma-prototype__qr" src={qrSrc} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FooterLinksSection() {
  return (
    <footer className="figma-prototype__footerSection">
      <div className="figma-prototype__footerBrand">
        <div className="figma-prototype__footerBrandTop">
          <h3>REFERIDOS APP</h3>
          <p>
            Catalogo de promociones y
            <br />
            sistema de recompensas por
            <br />
            canjearlas y referir.
          </p>
        </div>

        <p className="figma-prototype__footerBrandBottom">&copy; 2026 ReferidosApp - BETA v0.1.2</p>
      </div>

      <div className="figma-prototype__footerColumns">
        {footerColumns.map((column) => (
          <div key={column.title} className="figma-prototype__footerColumn">
            <h4>{column.title}</h4>
            <div className="figma-prototype__footerLinks">
              {column.links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

function SignupCardSvg() {
  return <img src="/assets/sign-up-card-BG.svg" alt="" />;
}

function GoogleMark() {
  return <img src="/assets/material-icon-theme-google.svg" alt="" />;
}

function MailMark() {
  return <img src="/assets/fluent-color-mail-16.svg" alt="" />;
}
