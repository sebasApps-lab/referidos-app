import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { submitWaitlistSignup } from "../waitlist/waitlistApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import "./prelaunchHomeV5.css";

const NAV_ITEMS = [
  { label: "Clientes", href: "#clientes" },
  { label: "Negocios", href: "#negocios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Preguntas", href: "#preguntas" },
];

const CLIENT_BENEFITS = [
  {
    title: "Promociones que quieres usar hoy",
    description:
      "Promociones, puntos y recompensas visibles desde el primer vistazo.",
  },
  {
    title: "Todo en un solo lugar",
    description:
      "Todo queda reunido en una sola experiencia para que volver sea mas facil.",
  },
  {
    title: "Comparte y gana",
    description:
      "Tus recomendaciones pueden darte una recompensa adicional dentro de la app.",
  },
];

const BUSINESS_BENEFITS = [
  {
    title: "Haz que una promo invite a volver",
    description:
      "Convierte una compra puntual en una relacion mas frecuente con tu negocio.",
  },
  {
    title: "Crea beneficios para horas y dias concretos",
    description:
      "Activa campañas segun el momento que mas te convenga mover.",
  },
  {
    title: "Sigue la respuesta de tus recompensas",
    description:
      "Mide canjes y usa esa informacion para repetir lo que mejor te funciona.",
  },
];

const HOW_STEPS = [
  {
    step: "01",
    title: "Descubre una promo",
    description: "El cliente ve que beneficio le interesa y decide donde quiere volver.",
  },
  {
    step: "02",
    title: "Escanea y canjea",
    description: "El negocio confirma el beneficio con QR al momento de la compra.",
  },
  {
    step: "03",
    title: "Acumula y regresa",
    description: "Los puntos y referidos hacen mas facil repetir la visita.",
  },
];

const TRUST_POINTS = [
  "Beneficios visibles antes de salir de casa.",
  "Canje rapido con QR en el local.",
  "Soporte por chat y correo cuando hace falta.",
];

const FAQ_ITEMS = [
  {
    question: "Que obtiene un cliente con Referidos?",
    answer:
      "Puede descubrir promociones cercanas, acumular puntos y canjear recompensas desde el celular.",
  },
  {
    question: "Que gana un negocio usando Referidos?",
    answer:
      "Una forma mas clara de atraer visitas, activar recompensas y aumentar la recurrencia.",
  },
  {
    question: "Necesito descargar una app?",
    answer:
      "Referidos se presenta como una PWA instalable, por lo que puedes abrirla en el navegador y agregarla al celular.",
  },
  {
    question: "Como me avisan cuando abran acceso?",
    answer:
      "Deja tu correo en la lista de espera y te avisaremos cuando el acceso anticipado este disponible.",
  },
];

export default function PrelaunchHomePageV5() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const meta = useMemo(
    () => ({
      title: "Referidos | Beneficios que invitan a volver",
      description:
        "Promociones, puntos y recompensas para clientes, con una forma mas clara de generar visitas repetidas para negocios.",
      ogImage: `${window.location.origin}/screenshots/desktop-1.png`,
      themeColor: "#5B34C8",
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
      props: { page: "premium_home_v5" },
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
      source: "premium_home_v5_waitlist",
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
      trackEvent("waitlist_submit", { already: true, source: "premium_home_v5" });
      void ingestPrelaunchEvent("waitlist_submit", {
        path: location.pathname,
        props: { already: true, role_intent: "cliente", source: "premium_home_v5" },
      });
      return;
    }

    setStatus("success");
    trackEvent("waitlist_submit", { already: false, source: "premium_home_v5" });
    void ingestPrelaunchEvent("waitlist_submit", {
      path: location.pathname,
      props: { already: false, role_intent: "cliente", source: "premium_home_v5" },
    });
  };

  return (
    <div className="v5-home" id="top">
      <header className="v5-nav-wrap">
        <div className="v5-container v5-nav">
          <a href="#top" className="v5-brand" aria-label="Ir al inicio de Referidos">
            <span className="v5-brand-mark">R</span>
            <span className="v5-brand-copy">
              <strong>Referidos</strong>
              <small>BENEFICIOS PARA VOLVER</small>
            </span>
          </a>

          <nav className="v5-nav-links" aria-label="Secciones principales">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="v5-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#acceso" className="v5-button v5-button--nav">
            Quiero acceso
          </a>
        </div>
      </header>

      <main>
        <section className="v5-hero v5-container">
          <div className="v5-hero-copy">
            <p className="v5-eyebrow">Promociones, puntos y razones para volver</p>
            <h1>Haz que una buena oferta se convierta en una visita repetida.</h1>
            <p className="v5-copy">
              Referidos conecta promociones, recompensas y canjes en una experiencia pensada para clientes y para negocios que quieren ver a su gente regresar.
            </p>

            <LeadForm
              idPrefix="hero-v5"
              email={email}
              setEmail={setEmail}
              honeypot={honeypot}
              setHoneypot={setHoneypot}
              status={status}
              errorMessage={errorMessage}
              onSubmit={handleSubmit}
              onFocus={resetStatus}
            />

            <div className="v5-proof-strip">
              <span>Promos cerca de ti</span>
              <span>Canje con QR</span>
              <span>Mas visitas repetidas</span>
            </div>
          </div>

          <div className="v5-hero-visual" aria-label="Vista previa de Referidos">
            <div className="v5-hero-photo">
              <img src="/editorial/v5-cafe-customer.jpg" alt="Cliente revisando promociones desde su celular en una cafeteria" loading="eager" />
            </div>

            <div className="v5-desktop-shot">
              <img src="/screenshots/desktop-1.png" alt="Vista de escritorio del panel de Referidos" loading="eager" />
            </div>

            <div className="v5-mobile-shot">
              <img src="/screenshots/mobile-1.png" alt="Vista movil de Referidos" loading="eager" />
            </div>
          </div>
        </section>

        <section id="clientes" className="v5-section">
          <div className="v5-container v5-clients-layout">
            <div className="v5-section-copy">
              <p className="v5-eyebrow">Clientes</p>
              <h2>Todo lo que necesitas para volver.</h2>
              <p>
                Beneficios visibles, puntos acumulados y recompensas listas para usar.
              </p>
            </div>

            <div className="v5-feature-grid">
              {CLIENT_BENEFITS.map((item) => (
                <article key={item.title} className="v5-card">
                  <div className="v5-icon-wrap">
                    <StarIcon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="negocios" className="v5-section v5-section--dark">
          <div className="v5-container v5-business-layout">
            <figure className="v5-owner-photo">
              <img src="/editorial/v5-store-owner.jpg" alt="Duena de negocio local sonriendo dentro de su tienda" loading="lazy" />
            </figure>

            <div>
              <div className="v5-section-copy v5-section-copy--light">
                <p className="v5-eyebrow v5-eyebrow--light">Negocios</p>
                <h2>Promociones para atraer y razones para regresar.</h2>
                <p>
                  Una forma mas clara de activar beneficios y darle a tus clientes una razon para regresar.
                </p>
              </div>

              <div className="v5-feature-grid v5-feature-grid--dark">
                {BUSINESS_BENEFITS.map((item, index) => (
                  <article key={item.title} className="v5-card v5-card--dark">
                    <span className="v5-index">0{index + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="v5-section">
          <div className="v5-container">
            <div className="v5-section-copy">
              <p className="v5-eyebrow">Como funciona</p>
              <h2>Un flujo corto para usarlo hoy y volver manana.</h2>
            </div>

            <div className="v5-steps-grid">
              {HOW_STEPS.map((item) => (
                <article key={item.step} className="v5-step-card">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v5-section v5-section--soft">
          <div className="v5-container v5-trust-layout">
            <figure className="v5-qr-photo">
              <img src="/editorial/v4-qr-checkout.jpg" alt="Canjeando una recompensa con el celular en un mostrador" loading="lazy" />
            </figure>

            <div className="v5-trust-copy">
              <p className="v5-eyebrow">Confianza</p>
              <h2>Cuando alguien usa una promo, todo debe sentirse claro.</h2>
              <p>
                La experiencia se apoya en beneficios visibles, canje confirmado y soporte cuando hace falta.
              </p>

              <ul className="v5-check-list">
                {TRUST_POINTS.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="preguntas" className="v5-section">
          <div className="v5-container">
            <div className="v5-section-copy">
              <p className="v5-eyebrow">Preguntas</p>
              <h2>Lo esencial para entender Referidos.</h2>
            </div>

            <div className="v5-faq-grid">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="v5-faq-item">
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

        <section id="acceso" className="v5-section v5-section--cta">
          <div className="v5-container">
            <div className="v5-cta">
              <div className="v5-cta-copy">
                <p className="v5-eyebrow">Acceso anticipado</p>
                <h2>Deja tu correo y te avisaremos cuando abramos acceso.</h2>
                <p>
                  Si quieres usar Referidos como cliente o explorarla para tu negocio, este es el punto de entrada.
                </p>
              </div>

              <LeadForm
                idPrefix="footer-v5"
                tone="cta"
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

      <footer className="v5-footer v5-container">
        <div className="v5-footer-brand">
          <div className="v5-brand v5-brand--footer">
            <span className="v5-brand-mark">R</span>
            <span className="v5-brand-copy">
              <strong>Referidos</strong>
              <small>BENEFICIOS PARA VOLVER</small>
            </span>
          </div>
          <p>Promociones, puntos y recompensas que invitan a volver.</p>
        </div>

        <div className="v5-footer-links">
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
  tone = "default",
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
    <form className={`v5-form ${tone === "cta" ? "v5-form--cta" : ""}`} onSubmit={onSubmit}>
      <div className="v5-form-row">
        <label htmlFor={`${idPrefix}-email`} className="v5-sr-only">
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
          className="v5-input"
          required
        />
        <button type="submit" className="v5-button" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Reservar acceso"}
        </button>
      </div>

      <div className="v5-honeypot" aria-hidden="true">
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

      <p className="v5-form-note">
        Al registrarte aceptas recibir noticias del acceso anticipado. Revisa <Link to="/legal/es/privacidad">Privacidad</Link> y <Link to="/legal/es/terminos">Terminos</Link>.
      </p>

      {statusMessage ? (
        <div className={`v5-status ${status === "error" ? "v5-status--error" : "v5-status--success"}`} aria-live="polite">
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

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l2.6 5.4 6 .9-4.3 4.3 1 6.1L12 17l-5.3 2.7 1-6.1L3.4 9.3l6-.9L12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
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

