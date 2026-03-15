import React from "react";
import QRCode from "react-qr-code";
import "./landingPrueba.css";

const featureCards = [
  {
    key: "explora",
    title: ["Explora promociones", "exclusivas"],
    highlight: "Explora",
    description:
      "Descubre descuentos, regalos y ofertas listas para usar en tus lugares favoritos.",
    iconClassName: "landing-prueba__feature-icon--gift",
    icon: <GiftIcon />,
  },
  {
    key: "puntos",
    title: ["Gana puntos", "y recompensas"],
    highlight: "Gana puntos",
    description:
      "Invita a tus amigos, participa más cerca de ti y suma beneficios en cada recomendación.",
    iconClassName: "landing-prueba__feature-icon--coins",
    icon: <CoinsIcon />,
  },
  {
    key: "progreso",
    title: ["Sigue tu progreso", "en tiempo real"],
    highlight: "",
    description:
      "Incluye métricas, niveles y seguimiento claro de tus recompensas desde una sola app.",
    iconClassName: "landing-prueba__feature-icon--chart",
    icon: <ChartIcon />,
  },
];

export default function LandingPruebaPage() {
  return (
    <main className="landing-prueba" aria-label="Landing de prueba de Referidos App">
      <section className="landing-prueba__hero">
        <div className="landing-prueba__shell landing-prueba__hero-shell">
          <div className="landing-prueba__hero-copy">
            <div className="landing-prueba__eyebrow">REFERIDOS APP</div>
            <h1 className="landing-prueba__hero-title">
              Descubre y comparte
              <br />
              ofertas, gana
              <br />
              recompensas fácilmente
            </h1>
            <p className="landing-prueba__hero-body">
              Aprovecha promociones exclusivas, invita a tus amigos y gana puntos por cada
              recomendación exitosa.
            </p>
            <button className="landing-prueba__download" type="button">
              <span>¡Descargar</span>
              <ChevronRightIcon />
            </button>
          </div>

          <div className="landing-prueba__hero-visual" aria-hidden="true">
            <PhoneMockup />
            <AccountCard />
          </div>
        </div>
      </section>

      <section className="landing-prueba__features">
        <div className="landing-prueba__shell landing-prueba__features-shell">
          <div className="landing-prueba__section-header">
            <h2>Así de fácil y divertido</h2>
            <p>
              Encuentra promociones exclusivas, gana puntos y haz un seguimiento de tus
              recompensas, ¡todo desde <span>una app</span>!
            </p>
          </div>

          <div className="landing-prueba__feature-grid">
            {featureCards.map((card) => (
              <article key={card.key} className="landing-prueba__feature-card">
                <div className={`landing-prueba__feature-icon ${card.iconClassName}`}>{card.icon}</div>
                <h3>
                  {card.highlight ? <strong>{card.highlight}</strong> : card.title[0]}
                  {card.highlight ? card.title[0].replace(card.highlight, "") : ""}
                  <br />
                  {card.title[1]}
                </h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-prueba__cta">
        <div className="landing-prueba__shell landing-prueba__cta-shell">
          <div className="landing-prueba__cta-copy">
            <h2>
              Promociones irresistibles,
              <br />
              al alcance de tu mano
            </h2>
            <p>Descubre a tus lugares favoritos, sin dejar pasar las mejores promos.</p>

            <div className="landing-prueba__signup-row">
              <input aria-label="Tu correo electrónico" placeholder="Tu correo electrónico" />
              <button type="button">Crear cuenta gratuita</button>
            </div>

            <p className="landing-prueba__legal-copy">
              Al registrarte, aceptas recibir noticias y comunicaciones.{" "}
              <span>Aviso de privacidad</span>
            </p>

            <div className="landing-prueba__qr-row">
              <div className="landing-prueba__qr-box">
                <QRCode value="https://referidos.app/landing-prueba" size={84} />
              </div>
              <div>
                <h3>Descarga la app</h3>
                <p>Escanea y entra primero a promociones, puntos y recompensas.</p>
              </div>
            </div>
          </div>

          <PromoStack />
        </div>
      </section>
    </main>
  );
}

function AccountCard() {
  return (
    <aside className="landing-prueba__account-card">
      <h3>Crea tu cuenta gratis</h3>
      <button className="landing-prueba__google-button" type="button">
        <GoogleIcon />
        <span>Continuar con Google</span>
      </button>
      <button className="landing-prueba__primary-cta" type="button">
        <SparkIcon />
        <span>Crear cuenta gratuita</span>
      </button>
      <p>
        ¿Ya tienes cuenta? <span>Inicia sesión</span>
      </p>
      <div className="landing-prueba__account-shine" />
    </aside>
  );
}

function PhoneMockup() {
  return (
    <div className="landing-prueba__phone">
      <div className="landing-prueba__phone-glow" />
      <div className="landing-prueba__phone-frame">
        <div className="landing-prueba__phone-screen">
          <div className="landing-prueba__phone-status">
            <span>9:1</span>
            <span>◔ ◔ ◔</span>
          </div>

          <div className="landing-prueba__phone-top">
            <div className="landing-prueba__user">
              <div className="landing-prueba__user-avatar" />
              <span>Lucia</span>
            </div>
            <div className="landing-prueba__phone-icons">
              <BellMiniIcon />
              <PowerMiniIcon />
            </div>
          </div>

          <div className="landing-prueba__phone-body">
            <div className="landing-prueba__phone-brand">REFERIDOS APP</div>

            <article className="landing-prueba__mobile-card">
              <div className="landing-prueba__mobile-card-media">
                <BurgerArtwork />
                <div className="landing-prueba__mobile-card-qr">
                  <QRCode value="https://referidos.app/urban-grill" size={58} />
                </div>
              </div>
              <div className="landing-prueba__mobile-card-content">
                <h3>Combo burger + bebida</h3>
                <p>
                  Encuentra promos cerca de ti, únete a puntos y obtén beneficios en cada
                  visita.
                </p>
                <div className="landing-prueba__mobile-meta">
                  <span>
                    <LocationIcon />
                    La Carolina, Calle B
                  </span>
                  <span className="landing-prueba__mobile-pill">A domicilio</span>
                </div>
              </div>
            </article>
          </div>

          <div className="landing-prueba__phone-nav">
            <div className="is-active">
              <HomeMiniIcon />
              <span>Conectarte</span>
            </div>
            <div>
              <GridMiniIcon />
              <span>Panel</span>
            </div>
            <div>
              <SearchMiniIcon />
              <span>Explorar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromoStack() {
  return (
    <div className="landing-prueba__promo-stack" aria-hidden="true">
      <div className="landing-prueba__promo-event">
        <div className="landing-prueba__promo-branding">Ayllu Rooftop</div>
        <div className="landing-prueba__promo-event-content">
          <div className="landing-prueba__promo-event-thumb">
            <ImageIcon />
          </div>
          <div>
            <h3>Happy hour mocktails</h3>
            <p>Dos bebidas por el precio de una.</p>
            <div className="landing-prueba__promo-date">
              <CalendarDotIcon />
              <span>10 de Agosto</span>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-prueba__promo-card">
        <div className="landing-prueba__promo-card-copy">
          <h3>Urban Grill</h3>
          <p>Menú completo con bebida fría, a precio especial, por tiempo limitado.</p>
          <div className="landing-prueba__promo-location">
            <LocationIcon />
            <span>La Carolina, Calle B</span>
          </div>
        </div>
        <div className="landing-prueba__promo-card-qr">
          <QRCode value="https://referidos.app/urban-grill" size={92} />
        </div>
      </div>
    </div>
  );
}

function BurgerArtwork() {
  return (
    <div className="landing-prueba__burger-art">
      <div className="landing-prueba__burger-glow" />
      <div className="landing-prueba__burger-top" />
      <div className="landing-prueba__burger-lettuce" />
      <div className="landing-prueba__burger-cheese" />
      <div className="landing-prueba__burger-patty" />
      <div className="landing-prueba__burger-bottom" />
      <div className="landing-prueba__burger-stick" />
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m9 6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21.81 12.23c0-.72-.07-1.4-.19-2.05H12v3.88h5.51a4.76 4.76 0 0 1-2.04 3.12v2.58h3.29c1.93-1.78 3.05-4.4 3.05-7.53Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.29-2.58c-.91.61-2.09.98-3.48.98-2.67 0-4.92-1.8-5.73-4.21H2.88v2.66A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.27 13.72A5.98 5.98 0 0 1 5.95 12c0-.6.11-1.18.32-1.72V7.62H2.88A10 10 0 0 0 2 12c0 1.61.38 3.14 1.05 4.38l3.22-2.66Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.06c1.5 0 2.84.52 3.9 1.54l2.92-2.92C17.07 3.04 14.75 2 12 2A10 10 0 0 0 2.88 7.62l3.39 2.66c.81-2.41 3.06-4.22 5.73-4.22Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3 1.84 4.49L18 9.33l-4.16 1.62L12 15.43l-1.84-4.48L6 9.33l4.16-1.84L12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <defs>
        <linearGradient id="giftBoxGradient" x1="12" x2="58" y1="16" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d58cff" />
          <stop offset="1" stopColor="#6d1cd5" />
        </linearGradient>
      </defs>
      <rect x="16" y="28" width="40" height="28" rx="8" fill="url(#giftBoxGradient)" />
      <rect x="12" y="22" width="48" height="12" rx="6" fill="rgba(255,255,255,0.38)" />
      <rect x="33" y="18" width="6" height="38" rx="3" fill="#fff4ff" opacity="0.92" />
      <path d="M27 22c0-5 4.9-9 10.2-4.5C41.8 12 47 16.8 47 22" fill="none" stroke="#fff4ff" strokeWidth="4" strokeLinecap="round" />
      <path d="M25 22c0-4.6-3.6-8.3-8-8.3S9 17.4 9 22c0 5.2 4.5 8.3 8 8.3" fill="none" stroke="#fff4ff" strokeWidth="4" strokeLinecap="round" opacity="0.82" />
    </svg>
  );
}

function CoinsIcon() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <defs>
        <linearGradient id="walletGradient" x1="18" x2="58" y1="18" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#71d8ff" />
          <stop offset="1" stopColor="#5d65f8" />
        </linearGradient>
        <linearGradient id="coinGradient" x1="15" x2="40" y1="24" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe185" />
          <stop offset="1" stopColor="#ff9a3d" />
        </linearGradient>
        <linearGradient id="cashGradient" x1="8" x2="30" y1="20" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#90ffcb" />
          <stop offset="1" stopColor="#21c86d" />
        </linearGradient>
      </defs>
      <rect x="28" y="18" width="30" height="24" rx="7" fill="url(#walletGradient)" />
      <rect x="34" y="24" width="17" height="4.5" rx="2.25" fill="#c9f6ff" opacity="0.82" />
      <ellipse cx="22" cy="28" rx="9" ry="4.5" fill="url(#cashGradient)" />
      <rect x="13" y="28" width="18" height="20" fill="url(#cashGradient)" />
      <ellipse cx="22" cy="48" rx="9" ry="4.5" fill="#34d47e" />
      <ellipse cx="41" cy="39" rx="9" ry="4.5" fill="url(#coinGradient)" />
      <rect x="32" y="39" width="18" height="13" fill="url(#coinGradient)" />
      <ellipse cx="41" cy="52" rx="9" ry="4.5" fill="#ffbf50" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <defs>
        <linearGradient id="chartGradient" x1="16" x2="56" y1="14" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#76d4ff" />
          <stop offset="1" stopColor="#4254f1" />
        </linearGradient>
      </defs>
      <rect x="14" y="16" width="44" height="38" rx="10" fill="url(#chartGradient)" />
      <rect x="22" y="30" width="8" height="16" rx="3.5" fill="#eef5ff" opacity="0.94" />
      <rect x="34" y="24" width="8" height="22" rx="3.5" fill="#eef5ff" opacity="0.94" />
      <rect x="46" y="20" width="8" height="26" rx="3.5" fill="#eef5ff" opacity="0.94" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="11" y="11" width="42" height="42" rx="6" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="43" cy="21" r="4.5" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <path
        d="m16 42 13-13a2.8 2.8 0 0 1 4 0L48 44"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
    </svg>
  );
}

function CalendarDotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#ffbc32" />
      <circle cx="12" cy="12" r="2.8" fill="#fff6d9" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BellMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 18h8M9.5 19.5a2.5 2.5 0 0 0 5 0M7.5 9.8a4.5 4.5 0 1 1 9 0v3l1.4 2.3H6.1l1.4-2.3v-3Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function PowerMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.6v7.3M8.1 6.3a7 7 0 1 0 7.8 0"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function HomeMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m4 10 8-6 8 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M6.5 10.5v8h11v-8"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function GridMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="5" height="5" rx="1.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="14" y="5" width="5" height="5" rx="1.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="5" y="14" width="5" height="5" rx="1.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="14" y="14" width="5" height="5" rx="1.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function SearchMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m16 16 4.2 4.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
