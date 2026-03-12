import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { submitWaitlistSignup } from "../waitlist/waitlistApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import "./prelaunchHomeV4.css";

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
      "Descubre beneficios cerca de ti y revisa todo desde el mismo lugar antes de salir de casa.",
  },
  {
    title: "Puntos en un solo lugar",
    description:
      "Sigue tu progreso, revisa lo que ya ganaste y canjea cuando te convenga.",
  },
  {
    title: "Referidos con recompensa",
    description:
      "Invita a otras personas y convierte tus recomendaciones en beneficios reales.",
  },
];

const BUSINESS_BENEFITS = [
  {
    title: "Mas visitas repetidas",
    description:
      "Lanza promociones pensadas para que la primera compra no sea la ultima.",
  },
  {
    title: "Ofertas para horas clave",
    description:
      "Mueve mas flujo en horarios lentos con beneficios faciles de comunicar.",
  },
  {
    title: "Resultados faciles de seguir",
    description:
      "Observa que canjes generan respuesta y repite lo que mejor funciona.",
  },
];

const HOW_STEPS = [
  {
    step: "01",
    title: "El cliente encuentra una promo",
    description: "Ve beneficios disponibles, revisa condiciones y elige que le interesa.",
  },
  {
    step: "02",
    title: "El negocio valida con QR",
    description: "El canje se confirma al momento, sin depender de procesos manuales.",
  },
  {
    step: "03",
    title: "La recompensa ayuda a que vuelva",
    description: "Los puntos y referidos convierten una compra puntual en una relacion mas frecuente.",
  },
];

const TRUST_POINTS = [
  "Promociones con informacion visible antes de llegar al local.",
  "Canje con QR para confirmar beneficios al momento.",
  "Atencion por chat o correo si alguien necesita ayuda.",
];

const FAQ_ITEMS = [
  {
    question: "Que puede hacer un cliente en Referidos?",
    answer:
      "Encontrar promociones cercanas, acumular puntos, revisar recompensas y canjear beneficios desde el celular.",
  },
  {
    question: "Que tipo de negocio puede usarlo?",
    answer:
      "Negocios que quieran atraer primeras visitas, activar promociones por horarios y lograr que sus clientes regresen con mas frecuencia.",
  },
  {
    question: "Necesito descargar una app?",
    answer:
      "Referidos se presenta como una PWA instalable, asi que puedes abrirla desde el navegador y anadirla a tu celular.",
  },
  {
    question: "Como me entero cuando abran acceso?",
    answer:
      "Deja tu correo en la lista de espera y te avisaremos cuando el acceso anticipado este disponible.",
  },
];

export default function PrelaunchHomePageV4() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const meta = useMemo(
    () => ({
      title: "Referidos | Promociones y puntos para volver",
      description:
        "Una experiencia clara para descubrir promociones, acumular puntos y ayudar a los negocios a generar mas visitas repetidas.",
      ogImage: `${window.location.origin}/screenshots/desktop-1.png`,
      themeColor: "#F4F5FA",
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
      props: { page: "premium_home_v4" },
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
      source: "premium_home_v4_waitlist",
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
      trackEvent("waitlist_submit", { already: true, source: "premium_home_v4" });
      void ingestPrelaunchEvent("waitlist_submit", {
        path: location.pathname,
        props: { already: true, role_intent: "cliente", source: "premium_home_v4" },
      });
      return;
    }

    setStatus("success");
    trackEvent("waitlist_submit", { already: false, source: "premium_home_v4" });
    void ingestPrelaunchEvent("waitlist_submit", {
      path: location.pathname,
      props: { already: false, role_intent: "cliente", source: "premium_home_v4" },
    });
  };

  return (
    <div className="v4-home" id="top">
      <header className="v4-nav-wrap">
        <div className="v4-container v4-nav">
          <a href="#top" className="v4-brand" aria-label="Ir al inicio de Referidos">
            <span className="v4-brand-mark">R</span>
            <span className="v4-brand-copy">
              <strong>Referidos</strong>
              <small>PROMOS Y PUNTOS</small>
            </span>
          </a>

          <nav className="v4-nav-links" aria-label="Secciones principales">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="v4-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#acceso" className="v4-button v4-button--ghost">
            Quiero acceso
          </a>
        </div>
      </header>

      <main>
        <section className="v4-hero v4-container">
          <div className="v4-hero-copy">
            <p className="v4-eyebrow">Promociones y puntos con una experiencia clara</p>
            <h1>Una sola app para volver a tus lugares favoritos.</h1>
            <p className="v4-copy">
              Referidos ayuda a los clientes a descubrir beneficios y a los negocios a convertir visitas sueltas en clientes que regresan.
            </p>

            <LeadForm
              idPrefix="hero-v4"
              email={email}
              setEmail={setEmail}
              honeypot={honeypot}
              setHoneypot={setHoneypot}
              status={status}
              errorMessage={errorMessage}
              onSubmit={handleSubmit}
              onFocus={resetStatus}
            />

            <div className="v4-proof-list">
              <span>Promociones cerca de ti</span>
              <span>Canje con QR</span>
              <span>Puntos y referidos</span>
            </div>
          </div>

          <div className="v4-stage" aria-label="Vista previa de Referidos">
            <div className="v4-browser-shot">
              <div className="v4-browser-topbar">
                <span />
                <span />
                <span />
              </div>
              <img src="/screenshots/desktop-1.png" alt="Vista de escritorio del panel de Referidos" loading="eager" />
            </div>

            <div className="v4-mobile-card">
              <div className="v4-card-label">App cliente</div>
              <img src="/screenshots/mobile-1.png" alt="Vista movil de Referidos" loading="eager" />
            </div>

            <figure className="v4-photo-card v4-photo-card--owners">
              <img src="/editorial/v4-shop-owners.jpg" alt="Dueno y duena de negocio local sonriendo en su mostrador" loading="eager" />
              <figcaption>Una experiencia pensada para negocios reales.</figcaption>
            </figure>
          </div>
        </section>

        <section id="clientes" className="v4-section">
          <div className="v4-container v4-section-grid">
            <div className="v4-section-intro">
              <p className="v4-eyebrow">Clientes</p>
              <h2>Descubre, acumula y vuelve.</h2>
              <p>
                Abres la app, ves un beneficio claro y vuelves cuando realmente te conviene.
              </p>
            </div>

            <div className="v4-card-grid">
              {CLIENT_BENEFITS.map((item) => (
                <article key={item.title} className="v4-card">
                  <div className="v4-icon-wrap">
                    <GiftIcon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="negocios" className="v4-section v4-section--tint">
          <div className="v4-container v4-business-layout">
            <figure className="v4-photo-panel">
              <img src="/editorial/v4-qr-checkout.jpg" alt="Cliente mostrando su celular para validar un beneficio con QR" loading="lazy" />
            </figure>

            <div>
              <div className="v4-section-intro v4-section-intro--compact">
                <p className="v4-eyebrow">Negocios</p>
                <h2>Promociones utiles para atraer visitas y hacer que vuelvan.</h2>
                <p>
                  Referidos te ayuda a mover trafico, activar recompensas y seguir que beneficios generan respuesta.
                </p>
              </div>

              <div className="v4-card-grid v4-card-grid--stacked">
                {BUSINESS_BENEFITS.map((item, index) => (
                  <article key={item.title} className="v4-card v4-card--compact">
                    <span className="v4-index">0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="v4-section">
          <div className="v4-container">
            <div className="v4-section-headline">
              <p className="v4-eyebrow">Como funciona</p>
              <h2>Un recorrido corto para usarla y volver.</h2>
            </div>

            <div className="v4-steps-grid">
              {HOW_STEPS.map((item) => (
                <article key={item.step} className="v4-step-card">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="v4-section">
          <div className="v4-container v4-trust-layout">
            <div className="v4-trust-copy">
              <p className="v4-eyebrow">Confianza</p>
              <h2>Todo debe salir bien justo cuando alguien la usa.</h2>
              <p>
                Por eso se combinan tres cosas concretas: informacion visible, canje confirmado y ayuda cuando hace falta.
              </p>

              <ul className="v4-check-list">
                {TRUST_POINTS.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="v4-support-panel">
              <img src="/screenshots/mobile-1.png" alt="Detalle movil de Referidos" loading="lazy" />
              <div>
                <strong>Todo claro antes del canje</strong>
                <p>El cliente ve el beneficio, llega al local y sabe que esperar.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas" className="v4-section">
          <div className="v4-container">
            <div className="v4-section-headline">
              <p className="v4-eyebrow">Preguntas</p>
              <h2>Lo esencial para entender Referidos.</h2>
            </div>

            <div className="v4-faq-grid">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="v4-faq-item">
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

        <section id="acceso" className="v4-section v4-section--cta">
          <div className="v4-container">
            <div className="v4-cta">
              <div>
                <p className="v4-eyebrow">Acceso anticipado</p>
                <h2>Deja tu correo y te avisaremos cuando abramos acceso.</h2>
                <p>
                  Si quieres usar Referidos como cliente o explorarla para tu negocio, este es el punto de entrada.
                </p>
              </div>

              <LeadForm
                idPrefix="footer-v4"
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

      <footer className="v4-footer v4-container">
        <div className="v4-footer-brand">
          <div className="v4-brand v4-brand--footer">
            <span className="v4-brand-mark">R</span>
            <span className="v4-brand-copy">
              <strong>Referidos</strong>
              <small>PROMOS Y PUNTOS</small>
            </span>
          </div>
          <p>Promociones, puntos y mas razones para volver.</p>
        </div>

        <div className="v4-footer-links">
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
    <form className={`v4-form ${tone === "cta" ? "v4-form--cta" : ""}`} onSubmit={onSubmit}>
      <div className="v4-form-row">
        <label htmlFor={`${idPrefix}-email`} className="v4-sr-only">
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
          className="v4-input"
          required
        />
        <button type="submit" className="v4-button" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Reservar acceso"}
        </button>
      </div>

      <div className="v4-honeypot" aria-hidden="true">
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

      <p className="v4-form-note">
        Al registrarte aceptas recibir noticias del acceso anticipado. Revisa <Link to="/legal/es/privacidad">Privacidad</Link> y <Link to="/legal/es/terminos">Terminos</Link>.
      </p>

      {statusMessage ? (
        <div className={`v4-status ${status === "error" ? "v4-status--error" : "v4-status--success"}`} aria-live="polite">
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

function GiftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10h16v10H4zM12 10v10M4 7h16v3H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 7c0-1.7 1.1-3 2.5-3 1.3 0 2.5 1 2.5 2.3C17 8.1 14.8 9 12 9M12 7c0-1.7-1.1-3-2.5-3C8.2 4 7 5 7 6.3 7 8.1 9.2 9 12 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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

