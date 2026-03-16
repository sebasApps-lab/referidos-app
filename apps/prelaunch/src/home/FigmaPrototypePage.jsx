import React, { useEffect, useState } from "react";
import "./figmaPrototype.css";

const navigationLinks = [
  "Como funciona",
  "Recibir invitaci\u00f3n",
  "Para negocios",
];

const benefitCards = [
  {
    key: "correo",
    title: (
      <>
        <span className="figma-prototype__benefit-title-bold">A\u00f1ade</span>
        <span className="figma-prototype__benefit-title-light"> tu correo</span>
        <br />
        <span className="figma-prototype__benefit-title-light">a la lista</span>
      </>
    ),
    body: (
      <>
        Espera y recibe la invitaci\u00f3n
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
        <span className="figma-prototype__benefit-title-light"> y recibe</span>
        <br />
        <span className="figma-prototype__benefit-title-light">tu recompensas</span>
      </>
    ),
    body: (
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
        <span className="figma-prototype__benefit-title-bold">Gana puntos</span>
        <br />
        <span className="figma-prototype__benefit-title-medium">y recompensas</span>
      </>
    ),
    body: (
      <>
        Canjea promociones, suma puntos
        <br />
        y obt\u00e9n m\u00e1s beneficios.
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
    thumb: "/editorial/v4-shop-owners.jpg",
  },
  {
    key: "regalos",
    badge: "Gratis",
    title: "REGALOS POR COMPRAR",
    description:
      "Regalos por realizar compras de ciertos productos o por superar cierto valor de compra.",
    until: "16 de Sept.",
    thumb: "/editorial/v5-cafe-customer.jpg",
  },
  {
    key: "dos-por-uno",
    badge: "2 x 1",
    title: "2 X 1",
    description:
      "Cada local o negocio oferta sus productos con promociones del tipo 2 x 1, 3 x 1 y mas.",
    until: "22 de Abril",
    thumb: "/editorial/v4-qr-checkout.jpg",
  },
];

const footerColumns = [
  {
    title: "INFORMACI\u00d3N",
    links: ["Plataforma", "Qui\u00e9nes somos"],
  },
  {
    title: "LEGAL",
    links: ["Privacidad", "T\u00e9rminos y Condiciones", "Borrar mis datos"],
  },
  {
    title: "CONTACTO",
    links: ["Chat de soporte", "Soporte por correo", "Comentarios y sugerencias"],
  },
];

export default function FigmaPrototypePage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflowX;
    const previousBodyOverflow = body.style.overflowX;
    const previousBodyBackground = body.style.background;

    html.style.overflowX = "auto";
    body.style.overflowX = "auto";
    body.style.background = "#ffffff";

    return () => {
      html.style.overflowX = previousHtmlOverflow;
      body.style.overflowX = previousBodyOverflow;
      body.style.background = previousBodyBackground;
    };
  }, []);

  return (
    <main className="figma-prototype" aria-label="Figma prototype v2">
      <div className="figma-prototype__shell">
        <section className="figma-prototype__hero-band">
          <NavigationHeaderSection />
          <HeroPromoSection />
        </section>
        <BenefitsOverviewSection />
        <WaitlistCallToActionSection />
        <FooterLinksSection />
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
      <div className="figma-prototype__hero-bg" aria-hidden="true">
        <img src="/assets/bg-mask.svg" alt="" />
      </div>

      <div className="figma-prototype__hero-shadow-stack" aria-hidden="true">
        <img src="/assets/bottom-shadow.svg" alt="" />
      </div>

      <div className="figma-prototype__hero-content">
        <div className="figma-prototype__hero-copy">
          <p className="figma-prototype__hero-title">
            Descubre y comparte
            <br />
            ofertas, gana
            <br />
            recompensas f&aacute;cilmente
          </p>

          <p className="figma-prototype__hero-subtitle">
            <span>Participa en el </span>
            <strong>acceso anticipado</strong>
            <span>
              {" "}
              de la app y recibe
              <br />
              beneficios extra, solo por usar la aplicaci&oacute;n.
            </span>
          </p>

          <button className="figma-prototype__hero-button" type="button">
            <span>Entrar a la lista de espera</span>
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>

        <div className="figma-prototype__hero-visual">
          <div className="figma-prototype__hero-phone">
            <img className="figma-prototype__hero-phone-glow" src="/assets/phone-glow.svg" alt="" aria-hidden="true" />
            <img
              src="/assets/Nothing%20Phone%202a%202.png"
              alt="Mockup del telefono Nothing Phone 2a mostrando la app Referidos"
              loading="eager"
            />
          </div>

          <img className="figma-prototype__hero-card-rail" src="/assets/phone-shadow.svg" alt="" aria-hidden="true" />

          <aside className="figma-prototype__signup-card">
            <img className="figma-prototype__signup-card-blur" src="/assets/sign-up-card-glow.svg" alt="" aria-hidden="true" />
            <div className="figma-prototype__signup-card-bg" aria-hidden="true">
              <SignupCardSvg />
            </div>

            <h2>Crea tu cuenta gratis</h2>

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

            <p className="figma-prototype__signup-note">
              Si ya tienes una cuenta, ten paciencia
              <br />
              recibir&aacute;s tu invitaci&oacute;n pronto.
            </p>

            <div className="figma-prototype__signup-line" aria-hidden="true" />
          </aside>
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
            <span>As&iacute; de</span>
            <strong>r&aacute;pido y simple</strong>
          </div>

          <p>
            <span>
              Entra en la lista de espera para recibir tu invitaci&oacute;n, descarga la app una vez este disponible y{" "}
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
                <BenefitIcon type={card.key} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
              <div className="figma-prototype__benefit-gloss" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ type }) {
  const srcMap = {
    correo: "/assets/icons/icon-mail-blue-shadow-2.png",
    recompensas: "/assets/icons/icon2.1.png",
    puntos: "/assets/icons/icon3.png",
  };

  const altMap = {
    correo: "Icono de correo",
    recompensas: "Icono de descarga y recompensas",
    puntos: "Icono de puntos",
  };

  return (
    <div className={`figma-prototype__benefit-icon figma-prototype__benefit-icon--${type}`} aria-hidden="true">
      <span className="figma-prototype__benefit-icon-shadow" />
      <img src={srcMap[type]} alt={altMap[type]} loading="lazy" />
    </div>
  );
}

function WaitlistCallToActionSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="figma-prototype__waitlist">
      <div className="figma-prototype__waitlist-bg" aria-hidden="true" />
      <div className="figma-prototype__waitlist-glow" aria-hidden="true" />

      <div className="figma-prototype__waitlist-content">
        <div className="figma-prototype__waitlist-copy">
          <h2>
            No te quedes sin un puesto
            <br />
            para participar
          </h2>

          <p className="figma-prototype__waitlist-subtitle">
            Los puestos son limitados, entra en la lista de espera
          </p>

          <div className="figma-prototype__waitlist-form">
            <div className="figma-prototype__waitlist-inputRow">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Tu correo electr\u00f3nico"
              />

              <div className="figma-prototype__waitlist-buttonWrap">
                <button type="button">A\u00f1adir correo</button>
                <span className="figma-prototype__waitlist-buttonGlow" aria-hidden="true" />
              </div>
            </div>

            <p className="figma-prototype__waitlist-legal">
              <span>Al suscribirte, aceptas los </span>
              <span className="figma-prototype__waitlist-legal-link">t&eacute;rminos y condiciones</span>
              <span>, adem&aacute;s de las </span>
              <span className="figma-prototype__waitlist-legal-link">Pol&iacute;ticas de Privacidad</span>
            </p>
          </div>
        </div>

        <div className="figma-prototype__promo-stack">
          <img className="figma-prototype__promo-stack-blur" src="/assets/card-carousel-glow.svg" alt="" aria-hidden="true" />
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

function PromoCard({ badge, title, description, until, thumb }) {
  return (
    <article className="figma-prototype__promo-card">
      <img className="figma-prototype__promo-card-shadow" src="/assets/card-shadow.svg" alt="" aria-hidden="true" />

      <div className="figma-prototype__promo-card-surface">
        <img className="figma-prototype__promo-card-bg" src="/assets/card-bg.svg" alt="" aria-hidden="true" />

        <div className="figma-prototype__promo-thumb">
          <img src={thumb} alt={title} loading="lazy" />
          <span>{badge}</span>
        </div>

        <img className="figma-prototype__promo-divider" src="/assets/Line%206.svg" alt="" aria-hidden="true" />

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
            <QrMini />
          </div>
        </div>
      </div>
    </article>
  );
}

function QrMini() {
  return <img className="figma-prototype__qr" src="/assets/icons/qr-code.svg" alt="" aria-hidden="true" />;
}

function FooterLinksSection() {
  return (
    <footer className="figma-prototype__footerSection">
      <div className="figma-prototype__footerBrand">
        <div className="figma-prototype__footerBrandTop">
          <h3>REFERIDOS APP</h3>
          <p>
            Cat&aacute;logo de promociones y
            <br />
            sistema de recompensas por
            <br />
            canjearlas y referir.
          </p>
        </div>

        <p className="figma-prototype__footerBrandBottom">&copy; 2026 ReferidosApp</p>
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
