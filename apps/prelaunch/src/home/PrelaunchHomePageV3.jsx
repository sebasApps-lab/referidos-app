import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { submitWaitlistSignup } from "../waitlist/waitlistApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import "./prelaunchHomeV3.css";

const NAV_ITEMS = [
  { label: "Clientes", href: "#clientes" },
  { label: "Negocios", href: "#negocios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Preguntas", href: "#preguntas" },
];

const CLIENT_BENEFITS = [
  {
    title: "Promociones cerca de ti",
    description:
      "Encuentra beneficios en lugares que ya frecuentas y descubre nuevos favoritos en tu zona.",
  },
  {
    title: "Puntos que si dan ganas de usar",
    description:
      "Guarda puntos, revisa recompensas y canjea desde el celular sin depender de tarjetas fisicas.",
  },
  {
    title: "Referidos con recompensa",
    description:
      "Invita a otras personas y convierte tus recomendaciones en beneficios reales dentro de la app.",
  },
];

const BUSINESS_BENEFITS = [
  {
    title: "Mas visitas repetidas",
    description:
      "Crea promociones y recompensas que le den a tus clientes una razon clara para volver.",
  },
  {
    title: "Campanas para horas clave",
    description:
      "Activa ofertas puntuales cuando quieras mover mas flujo en dias u horarios especificos.",
  },
  {
    title: "Resultados faciles de seguir",
    description:
      "Revisa que promociones generan canjes y cuales te ayudan a recuperar clientes.",
  },
];

const HOW_STEPS = [
  {
    step: "01",
    title: "Descubre",
    description: "El cliente ve promociones y recompensas disponibles cerca de donde esta.",
  },
  {
    step: "02",
    title: "Canjea",
    description: "Presenta el QR en el negocio y recibe el beneficio en el momento.",
  },
  {
    step: "03",
    title: "Vuelve",
    description: "Los puntos y referidos crean una razon simple para regresar.",
  },
];

const TRUST_POINTS = [
  "Promociones activas con fechas y condiciones visibles.",
  "Canje con QR para confirmar beneficios al momento.",
  "Soporte por chat o correo si necesitas ayuda.",
];

const FAQ_ITEMS = [
  {
    question: "Que gana un cliente usando Referidos?",
    answer:
      "Puede encontrar promociones cercanas, acumular puntos y canjear beneficios desde el celular en un solo lugar.",
  },
  {
    question: "Que tipo de negocio puede sumarse?",
    answer:
      "Negocios que quieran atraer primeras visitas, aumentar recurrencia y lanzar promociones con una operacion simple.",
  },
  {
    question: "Necesito descargar una app?",
    answer:
      "Referidos se presenta como una PWA instalable, asi que puedes abrirla desde el navegador y agregarla a tu celular.",
  },
  {
    question: "Como sabre cuando abran acceso?",
    answer:
      "Deja tu correo en la lista de espera y te avisaremos cuando el acceso anticipado este disponible.",
  },
];

export default function PrelaunchHomePageV3() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const meta = useMemo(
    () => ({
      title: "Referidos | Beneficios para clientes y mas visitas para negocios",
      description:
        "Una sola app para descubrir promociones, acumular puntos y ayudar a los negocios a generar mas visitas repetidas.",
      ogImage: `${window.location.origin}/screenshots/desktop-1.png`,
      themeColor: "#0B1020",
    }),
    []
  );

  useEffect(() => {
    const url = `${window.location.origin}${location.pathname}`;
    setPageMeta(meta, url);
  }, [location.pathname, meta]);

  useEffect(() => {
    void ingestPrelaunchEvent("page_view", {
      path: location.pathname,
      props: { page: "premium_home_v3" },
    });
  }, [location.pathname]);

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "loading") return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Ingresa un correo valido para reservar tu acceso.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const result = await submitWaitlistSignup({
      email: trimmedEmail,
      role: "cliente",
      source: "premium_home_v3_waitlist",
      consentVersion: "privacy_v1",
      honeypot,
    });

    if (!result?.ok) {
      setStatus("error");
      setErrorMessage("No pudimos registrar tu correo ahora mismo. Intenta otra vez.");
      return;
    }

    if (result.already) {
      setStatus("already");
      trackEvent("waitlist_submit", { already: true, source: "premium_home_v3" });
      void ingestPrelaunchEvent("waitlist_submit", {
        path: location.pathname,
        props: { already: true, role_intent: "cliente", source: "premium_home_v3" },
      });
      return;
    }

    setStatus("success");
    trackEvent("waitlist_submit", { already: false, source: "premium_home_v3" });
    void ingestPrelaunchEvent("waitlist_submit", {
      path: location.pathname,
      props: { already: false, role_intent: "cliente", source: "premium_home_v3" },
    });
  };

  return (
    <div className="v3-home" id="top">
      <div className="v3-orbit v3-orbit--left" aria-hidden="true" />
      <div className="v3-orbit v3-orbit--right" aria-hidden="true" />

      <header className="v3-nav-wrap">
        <div className="v3-container v3-nav">
          <a href="#top" className="v3-brand" aria-label="Ir al inicio de Referidos">
            <span className="v3-brand-mark">R</span>
            <span className="v3-brand-copy">
              <strong>Referidos</strong>
              <small>CLUB LOCAL</small>
            </span>
          </a>

          <nav className="v3-nav-links" aria-label="Secciones principales">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="v3-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#acceso" className="v3-button v3-button--nav">
            Quiero acceso
          </a>
        </div>
      </header>

      <main>
        <section className="v3-hero v3-container">
          <div className="v3-hero-copy">
            <p className="v3-kicker">Recompensas para volver</p>
            <h1 className="v3-display">Haz que una visita se convierta en la siguiente.</h1>
            <p className="v3-copy">
              Referidos conecta a clientes con promociones y puntos en sus lugares favoritos, y le da a los negocios una forma simple de traer gente de regreso.
            </p>

            <LeadForm
              idPrefix="hero-v3"
              email={email}
              setEmail={setEmail}
              honeypot={honeypot}
              setHoneypot={setHoneypot}
              status={status}
              errorMessage={errorMessage}
              onSubmit={handleSubmit}
              onFocus={resetStatus}
            />

            <div className="v3-hero-links">
              <a href="#negocios" className="v3-inline-link">
                Ver para negocios
                <ArrowIcon />
              </a>
              <Link to="/soporte-chat" className="v3-inline-link v3-inline-link--muted">
                Hablar con soporte
              </Link>
            </div>

            <div className="v3-proof-row" aria-label="Beneficios principales">
              <div>
                <strong>Descubre</strong>
                <span>Promociones y recompensas cerca de ti.</span>
              </div>
              <div>
                <strong>Canjea</strong>
                <span>Usa tu QR y recibe el beneficio al momento.</span>
              </div>
              <div>
                <strong>Vuelve</strong>
                <span>Mas razones para regresar a tus lugares favoritos.</span>
              </div>
            </div>
          </div>

          <div className="v3-stage" aria-label="Vista previa de Referidos">
            <div className="v3-stage-panel">
              <div className="v3-stage-tag">Vista cliente</div>
              <div className="v3-desktop-shot">
                <img
                  src="/screenshots/desktop-1.png"
                  alt="Vista de escritorio del panel de Referidos"
                  loading="eager"
                />
              </div>
              <div className="v3-mobile-shot">
                <img
                  src="/screenshots/mobile-1.png"
                  alt="Vista movil de Referidos"
                  loading="eager"
                />
              </div>
            </div>

            <div className="v3-floating-note v3-floating-note--top">
              <span>Para clientes</span>
              <strong>Ahorra y acumula beneficios sin cambiar tus rutinas.</strong>
            </div>

            <div className="v3-floating-note v3-floating-note--bottom">
              <span>Para negocios</span>
              <strong>Activa promociones con una meta clara: hacer que vuelvan.</strong>
            </div>
          </div>
        </section>

        <section id="clientes" className="v3-section">
          <div className="v3-container">
            <div className="v3-section-heading">
              <p className="v3-kicker">Clientes</p>
              <h2>Todo lo que te hace volver, en una sola app.</h2>
              <p>
                Menos cupones sueltos y menos tarjetas perdidas. Aqui las promociones, los puntos y los referidos viven en el mismo lugar.
              </p>
            </div>

            <div className="v3-feature-grid">
              {CLIENT_BENEFITS.map((item) => (
                <article key={item.title} className="v3-card">
                  <div className="v3-card-icon">
                    <GiftIcon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="negocios" className="v3-section v3-section--dark">
          <div className="v3-container v3-business-layout">
            <div className="v3-business-copy">
              <p className="v3-kicker v3-kicker--light">Negocios</p>
              <h2>Promociones que no terminan en una sola compra.</h2>
              <p>
                Referidos ayuda a convertir una visita ocasional en una relacion mas frecuente con tu negocio.
              </p>
            </div>

            <div className="v3-business-grid">
              {BUSINESS_BENEFITS.map((item, index) => (
                <article key={item.title} className="v3-card v3-card--dark">
                  <span className="v3-index">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="v3-section">
          <div className="v3-container">
            <div className="v3-section-heading">
              <p className="v3-kicker">Como funciona</p>
              <h2>Simple para usar, util para volver.</h2>
            </div>

            <div className="v3-steps">
              {HOW_STEPS.map((item) => (
                <article key={item.step} className="v3-step">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v3-section">
          <div className="v3-container v3-trust-layout">
            <div className="v3-trust-panel">
              <p className="v3-kicker">Confianza</p>
              <h2>Lo importante es que funcione bien cuando quieres usarlo.</h2>
              <p>
                Por eso la experiencia se apoya en tres cosas concretas: promociones claras, canje inmediato y ayuda cuando la necesites.
              </p>
              <ul className="v3-check-list">
                {TRUST_POINTS.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="v3-quote-card">
              <p>
                Una buena recompensa no solo atrae una compra: le da a la gente una razon real para volver.
              </p>
              <span>Lo que realmente importa</span>
            </div>
          </div>
        </section>

        <section id="preguntas" className="v3-section v3-section--soft">
          <div className="v3-container">
            <div className="v3-section-heading">
              <p className="v3-kicker">Preguntas</p>
              <h2>Lo esencial, sin rodeos.</h2>
            </div>

            <div className="v3-faq-grid">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="v3-faq-item">
                  <summary>
                    <span>{item.question}</span>
                    <PlusIcon />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="acceso" className="v3-section v3-section--cta">
          <div className="v3-container">
            <div className="v3-cta">
              <div className="v3-cta-copy">
                <p className="v3-kicker v3-kicker--light">Acceso anticipado</p>
                <h2>Deja tu correo y te avisaremos cuando abramos acceso.</h2>
                <p>
                  Si quieres usar Referidos como cliente o explorarla para tu negocio, este es el punto de entrada.
                </p>
              </div>

              <LeadForm
                idPrefix="footer-v3"
                tone="dark"
                email={email}
                setEmail={setEmail}
                honeypot={honeypot}
                setHoneypot={setHoneypot}
                status={status}
                errorMessage={errorMessage}
                onSubmit={handleSubmit}
                onFocus={resetStatus}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="v3-footer v3-container">
        <div className="v3-footer-brand">
          <div className="v3-brand v3-brand--footer">
            <span className="v3-brand-mark">R</span>
            <span className="v3-brand-copy">
              <strong>Referidos</strong>
              <small>CLUB LOCAL</small>
            </span>
          </div>
          <p>Beneficios para clientes. Mas visitas repetidas para negocios.</p>
        </div>

        <div className="v3-footer-links">
          <div>
            <h3>Explora</h3>
            <a href="#clientes">Clientes</a>
            <a href="#negocios">Negocios</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#preguntas">Preguntas</a>
          </div>
          <div>
            <h3>Soporte</h3>
            <Link to="/soporte-chat">Chat</Link>
            <Link to="/soporte-correo">Correo</Link>
          </div>
          <div>
            <h3>Legal</h3>
            <Link to="/legal/es/privacidad">Privacidad</Link>
            <Link to="/legal/es/terminos">Terminos</Link>
            <Link to="/legal/es/borrar-datos">Borrar datos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LeadForm({
  idPrefix,
  tone = "light",
  email,
  setEmail,
  honeypot,
  setHoneypot,
  status,
  errorMessage,
  onSubmit,
  onFocus,
}) {
  const statusMessage = status === "error" ? errorMessage : getStatusMessage(status);

  return (
    <form className={`v3-form ${tone === "dark" ? "v3-form--dark" : ""}`} onSubmit={onSubmit}>
      <div className="v3-form-row">
        <label htmlFor={`${idPrefix}-email`} className="v3-sr-only">
          Correo electronico
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            onFocus();
          }}
          placeholder="tu@correo.com"
          className="v3-input"
          required
        />
        <button type="submit" className="v3-button v3-submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Reservar acceso"}
        </button>
      </div>

      <div className="v3-honeypot" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Empresa</label>
        <input
          id={`${idPrefix}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <p className="v3-form-note">
        Al registrarte aceptas recibir noticias del acceso anticipado. Revisa <Link to="/legal/es/privacidad">Privacidad</Link> y <Link to="/legal/es/terminos">Terminos</Link>.
      </p>

      {statusMessage ? (
        <div className={`v3-status ${status === "error" ? "v3-status--error" : "v3-status--success"}`} aria-live="polite">
          {statusMessage}
        </div>
      ) : null}
    </form>
  );
}

function getStatusMessage(status) {
  if (status === "success") return "Listo. Reservaste tu acceso y te escribiremos cuando la beta avance.";
  if (status === "already") return "Ese correo ya estaba reservado. Te avisaremos igualmente.";
  return "";
}

function setPageMeta(meta, url) {
  document.title = meta.title;
  document.documentElement.lang = "es";

  const setMeta = (name, content) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  const setProperty = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  const setLink = (rel, href) => {
    let tag = document.querySelector(`link[rel="${rel}"]`);
    if (!tag) {
      tag = document.createElement("link");
      tag.setAttribute("rel", rel);
      document.head.appendChild(tag);
    }
    tag.setAttribute("href", href);
  };

  setMeta("description", meta.description);
  setMeta("robots", "index,follow");
  setMeta("theme-color", meta.themeColor);
  setProperty("og:type", "website");
  setProperty("og:title", meta.title);
  setProperty("og:description", meta.description);
  setProperty("og:image", meta.ogImage);
  setProperty("og:url", url);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", meta.title);
  setMeta("twitter:description", meta.description);
  setMeta("twitter:image", meta.ogImage);
  setLink("canonical", url);
}

function trackEvent(eventName, payload = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
    return;
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 7L10 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10h16v10H4zM12 10v10M4 7h16v3H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 7c0-1.7 1.1-3 2.5-3 1.3 0 2.5 1 2.5 2.3C17 8.1 14.8 9 12 9M12 7c0-1.7-1.1-3-2.5-3C8.2 4 7 5 7 6.3 7 8.1 9.2 9 12 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

