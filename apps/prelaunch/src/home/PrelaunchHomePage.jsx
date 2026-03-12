import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { submitWaitlistSignup } from "../waitlist/waitlistApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import "./prelaunchHome.css";

const NAV_ITEMS = [
  { label: "Plataforma", href: "#platform" },
  { label: "Escala", href: "#scale" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const TRUST_PILLARS = [
  {
    title: "PWA instalable",
    description: "Una entrada sin friccion de app store para activar usuarios mas rapido.",
  },
  {
    title: "QR y validacion",
    description: "Promociones y canjes con una capa operativa clara y verificable.",
  },
  {
    title: "Grupos y referidos",
    description: "Mecanicas sociales que convierten visitas en recurrencia.",
  },
  {
    title: "Soporte humano",
    description: "Rutas reales para resolver friccion, cambios y confianza.",
  },
];

const PLATFORM_LANES = [
  {
    eyebrow: "Experiencia cliente",
    title: "Promociones que se descubren, se canjean y se recuerdan.",
    description:
      "La capa cliente esta pensada para verse premium desde el primer contacto: exploracion clara, recompensas comprensibles y una experiencia que no parece una beta improvisada.",
    bullets: [
      "Promos verificadas y explicadas sin ruido visual.",
      "Grupos para multiplicar alcance sin perder claridad.",
      "Acumulacion de puntos con feedback inmediato.",
    ],
    tone: "light",
  },
  {
    eyebrow: "Experiencia negocio",
    title: "Un panel que se siente listo para marca, operacion y crecimiento.",
    description:
      "La capa negocio no habla como experimento local. Habla como infraestructura: publicar, medir, ajustar y repetir con una narrativa consistente entre ciudades, sucursales y campañas.",
    bullets: [
      "Promociones en borrador y revision antes de publicar.",
      "Capacidad para ordenar la oferta por mercado o etapa.",
      "Una presentacion de marca alineada con soporte y legal.",
    ],
    tone: "dark",
  },
];

const SYSTEM_PILLARS = [
  {
    title: "Descubrimiento con criterio",
    description: "La oferta no solo se muestra: se prioriza para verse seria, util y facil de entender.",
    Icon: CompassIcon,
  },
  {
    title: "Canje verificable",
    description: "QR, reglas y validacion para que el beneficio se sienta real y medible.",
    Icon: QrIcon,
  },
  {
    title: "Relaciones, no solo visitas",
    description: "Los grupos y referidos convierten el producto en un canal de recurrencia.",
    Icon: GroupIcon,
  },
  {
    title: "Moderacion y soporte",
    description: "La confianza no se delega al azar. Se construye con operaciones y servicio.",
    Icon: ShieldIcon,
  },
];

const SCALE_ITEMS = [
  {
    title: "Una narrativa, multiples mercados",
    description:
      "La marca se presenta con una sola voz, mientras la oferta y la operacion pueden adaptarse por ciudad, vertical o etapa de despliegue.",
  },
  {
    title: "Listo para small chains y despliegue regional",
    description:
      "La interfaz esta pensada para sentirse local en la calle y suficientemente disciplinada para operar en grupos de negocios, equipos o nuevas plazas.",
  },
  {
    title: "Soporte, legal y conversion alineados",
    description:
      "Una pagina seria no termina en el hero. Toda la experiencia, desde waitlist hasta privacidad y soporte, sostiene la misma percepcion de calidad.",
  },
];

const ABOUT_PRINCIPLES = [
  {
    title: "Marca con disciplina",
    description: "Cada bloque debe verse resuelto, no acumulado. Menos ruido, mejor criterio.",
  },
  {
    title: "Cercania local con ambicion regional",
    description: "La experiencia tiene que sentirse relevante para un negocio de barrio y solida para una red que quiere crecer.",
  },
  {
    title: "Producto visible antes que decoracion",
    description: "Primero se entiende el valor. Despues, si hace falta, se embellece. Nunca al reves.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Que es Referidos en esta etapa?",
    answer:
      "Es la experiencia prelaunch de una plataforma que conecta clientes y negocios mediante promociones, puntos, grupos y validacion con QR en una PWA instalable.",
  },
  {
    question: "La waitlist es solo para clientes?",
    answer:
      "La reserva principal de acceso esta orientada a la experiencia cliente, pero la pagina ya presenta la capa negocio y mantiene las rutas legacy para revisar ese flujo mientras evoluciona la beta.",
  },
  {
    question: "Por que una sola pagina y no varias?",
    answer:
      "Porque el objetivo de esta etapa no es dispersar trafico, sino concentrar mensaje, producto, confianza y conversion en una sola narrativa premium.",
  },
  {
    question: "Es una app nativa?",
    answer:
      "Por ahora se presenta como PWA instalable. Eso permite una entrada rapida, coherente entre dispositivos y menos friccion para activar usuarios y negocios.",
  },
  {
    question: "Como se sostendra al crecer?",
    answer:
      "La pagina y el producto se estan modelando para operar por ciudad, vertical y mercado sin perder consistencia visual, soporte ni claridad operativa.",
  },
  {
    question: "Que pasa con las landings antiguas?",
    answer:
      "Se conservaron como archivo operativo en /cliente-legacy y /negocio-legacy para no perder referencia mientras la home principal adopta una direccion mas madura.",
  },
];

export default function PrelaunchHomePage() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const meta = useMemo(
    () => ({
      title: "Referidos | Promociones, grupos y puntos listos para crecer",
      description:
        "Una experiencia prelaunch de nivel premium para conectar clientes y negocios con promociones, referidos, QR y soporte de marca.",
      ogImage: `${window.location.origin}/screenshots/desktop-1.png`,
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
      props: { page: "premium_home" },
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
      source: "premium_home_waitlist",
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
      trackEvent("waitlist_submit", { already: true, source: "premium_home" });
      void ingestPrelaunchEvent("waitlist_submit", {
        path: location.pathname,
        props: { already: true, role_intent: "cliente", source: "premium_home" },
      });
      return;
    }

    setStatus("success");
    trackEvent("waitlist_submit", { already: false, source: "premium_home" });
    void ingestPrelaunchEvent("waitlist_submit", {
      path: location.pathname,
      props: { already: false, role_intent: "cliente", source: "premium_home" },
    });
  };

  const handleLegacyClick = (target) => {
    trackEvent("legacy_open", { target });
    void ingestPrelaunchEvent("legacy_open", {
      path: location.pathname,
      props: { target },
    });
  };

  return (
    <div className="plx-home" id="top">
      <div className="plx-backdrop" aria-hidden="true" />
      <div className="plx-shell">
        <header className="plx-nav-wrap">
          <div className="plx-nav plx-container">
            <a href="#top" className="plx-wordmark" aria-label="Ir al inicio de Referidos">
              <span className="plx-wordmark-mark">R</span>
              <span>
                ReferidosAPP
                <small>PRELAUNCH</small>
              </span>
            </a>

            <nav className="plx-nav-links" aria-label="Secciones principales">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="plx-nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="plx-nav-actions">
              <a href="#join" className="plx-nav-button plx-nav-button--ghost">
                Reservar acceso
              </a>
              <Link
                to="/negocio-legacy"
                onClick={() => handleLegacyClick("negocio")}
                className="plx-nav-button"
              >
                Negocios beta
              </Link>
            </div>
          </div>
        </header>

        <main>
          <section className="plx-hero plx-container">
            <div className="plx-hero-copy">
              <p className="plx-kicker">PWA premium para promociones, grupos y puntos</p>
              <h1 className="plx-display">
                Promociones que se sienten <em>claras, serias y listas</em> para crecer ciudad por ciudad.
              </h1>
              <p className="plx-copy">
                Referidos conecta clientes y negocios en una experiencia que ya no parece un mockup local. La narrativa, el producto y la conversion se presentan como una sola plataforma pensada para operar con criterio de marca, soporte y expansion regional.
              </p>

              <LeadForm
                idPrefix="hero"
                email={email}
                setEmail={setEmail}
                honeypot={honeypot}
                setHoneypot={setHoneypot}
                status={status}
                errorMessage={errorMessage}
                onSubmit={handleSubmit}
                onFocus={resetStatus}
              />

              <div className="plx-secondary-actions">
                <a href="#platform" className="plx-text-link">
                  Ver la plataforma completa
                  <ArrowRightIcon />
                </a>
                <Link
                  to="/cliente-legacy"
                  onClick={() => handleLegacyClick("cliente")}
                  className="plx-muted-link"
                >
                  Revisar cliente legacy
                </Link>
              </div>

              <div className="plx-proof-row">
                <div>
                  <strong>Diseño con criterio</strong>
                  <span>Menos gimmicks, mas producto visible.</span>
                </div>
                <div>
                  <strong>Arquitectura regional</strong>
                  <span>Una narrativa de marca para multiples plazas.</span>
                </div>
                <div>
                  <strong>Operacion integrada</strong>
                  <span>Waitlist, soporte y legal bajo la misma percepcion premium.</span>
                </div>
              </div>
            </div>

            <div className="plx-hero-visual" aria-label="Vista previa del producto Referidos">
              <div className="plx-visual-note plx-visual-note--top">
                <span>Regional-ready</span>
                <p>Una sola experiencia de marca para clientes, negocios y soporte.</p>
              </div>

              <div className="plx-device plx-device--desktop">
                <div className="plx-device-chrome" />
                <img
                  src="/screenshots/desktop-1.png"
                  alt="Vista de escritorio del panel de Referidos"
                  className="plx-device-image"
                  loading="eager"
                />
              </div>

              <div className="plx-device plx-device--mobile">
                <div className="plx-device-badge">Cliente PWA</div>
                <img
                  src="/screenshots/mobile-1.png"
                  alt="Vista movil de Referidos"
                  className="plx-device-image"
                  loading="eager"
                />
              </div>

              <div className="plx-visual-note plx-visual-note--bottom">
                <span>Beta con estructura</span>
                <ul>
                  <li>Promociones con claridad operativa</li>
                  <li>Grupos, puntos y referidos en una sola capa</li>
                  <li>Soporte y legal alineados con la marca</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="plx-trust plx-container" aria-label="Fundamentos del producto">
            <div className="plx-section-heading">
              <p className="plx-kicker">Fundamentos</p>
              <h2>
                La pagina ya no intenta impresionar con artificios. <span>Expone fundamentos serios.</span>
              </h2>
            </div>
            <div className="plx-trust-grid">
              {TRUST_PILLARS.map((item) => (
                <article key={item.title} className="plx-card plx-card--soft">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="platform" className="plx-section plx-section--dark">
            <div className="plx-container">
              <div className="plx-section-heading plx-section-heading--light">
                <p className="plx-kicker">Plataforma</p>
                <h2>Una sola historia para cliente, negocio y operacion.</h2>
                <p>
                  La home principal deja de competir consigo misma. En lugar de dos landings peleando por atencion, ahora explica un ecosistema completo con producto visible y prioridades claras.
                </p>
              </div>

              <div className="plx-platform-grid">
                {PLATFORM_LANES.map((lane) => (
                  <article
                    key={lane.eyebrow}
                    className={`plx-story-card ${lane.tone === "dark" ? "plx-story-card--dark" : ""}`}
                  >
                    <p className="plx-story-eyebrow">{lane.eyebrow}</p>
                    <h3>{lane.title}</h3>
                    <p className="plx-story-copy">{lane.description}</p>
                    <ul className="plx-bullet-list">
                      {lane.bullets.map((bullet) => (
                        <li key={bullet}>
                          <CheckIcon />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="plx-system-grid">
                {SYSTEM_PILLARS.map((item) => (
                  <article key={item.title} className="plx-card plx-card--dark">
                    <div className="plx-icon-wrap">
                      <item.Icon />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="scale" className="plx-section">
            <div className="plx-container">
              <div className="plx-scale-layout">
                <div className="plx-scale-intro">
                  <p className="plx-kicker">Escala</p>
                  <h2>
                    Pensada para verse local en la calle y suficientemente madura para crecer por mercado.
                  </h2>
                  <p>
                    Multi-regional no significa hacer ruido con banderas o promesas vacias. Significa que la marca, el producto y la operacion resisten expansion sin volverse un collage de decisiones apresuradas.
                  </p>
                </div>
                <div className="plx-scale-grid">
                  {SCALE_ITEMS.map((item) => (
                    <article key={item.title} className="plx-card plx-card--elevated">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="plx-section">
            <div className="plx-container plx-about-layout">
              <article className="plx-manifesto">
                <p className="plx-kicker">About</p>
                <h2>
                  Referidos no quiere parecer una startup improvisada. Quiere sentirse como una plataforma lista para durar.
                </h2>
                <p>
                  La idea es simple: ayudar a que negocios y clientes se encuentren alrededor de promociones reales, reglas claras y una experiencia de producto que inspire confianza desde el primer scroll.
                </p>
                <p>
                  Eso obliga a tratar la landing como parte del producto. No como una pagina desechable de marketing, sino como la primera prueba de criterio, consistencia y nivel operativo.
                </p>
                <div className="plx-manifesto-links">
                  <Link to="/soporte-chat">Hablar con soporte</Link>
                  <Link to="/legal/es/privacidad">Ver privacidad</Link>
                </div>
              </article>

              <div className="plx-principles-grid">
                {ABOUT_PRINCIPLES.map((item) => (
                  <article key={item.title} className="plx-card plx-card--soft">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="plx-section">
            <div className="plx-container">
              <div className="plx-section-heading">
                <p className="plx-kicker">FAQ</p>
                <h2>Preguntas que una pagina seria responde sin esconderse.</h2>
              </div>
              <div className="plx-faq-grid">
                {FAQ_ITEMS.map((item) => (
                  <details key={item.question} className="plx-faq-item">
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

          <section id="join" className="plx-section plx-section--cta">
            <div className="plx-container">
              <div className="plx-final-cta">
                <div>
                  <p className="plx-kicker plx-kicker--inverse">Acceso anticipado</p>
                  <h2>Reserva tu acceso antes de la salida publica.</h2>
                  <p>
                    La waitlist concentra conversion sin sacrificar percepcion de marca. Un solo flujo, una sola promesa y una interfaz que ya se siente como producto serio.
                  </p>
                </div>

                <LeadForm
                  idPrefix="final"
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

                <div className="plx-cta-links">
                  <Link to="/cliente-legacy" onClick={() => handleLegacyClick("cliente")}>Cliente legacy</Link>
                  <Link to="/negocio-legacy" onClick={() => handleLegacyClick("negocio")}>Negocio legacy</Link>
                  <Link to="/soporte-correo">Soporte</Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="plx-footer plx-container">
          <div className="plx-footer-brand">
            <div className="plx-wordmark plx-wordmark--footer">
              <span className="plx-wordmark-mark">R</span>
              <span>
                ReferidosAPP
                <small>PRELAUNCH</small>
              </span>
            </div>
            <p>
              Promociones, grupos y puntos presentados con una narrativa premium para una plataforma que quiere operar con disciplina local y ambicion regional.
            </p>
          </div>

          <div className="plx-footer-links">
            <div>
              <h3>Secciones</h3>
              <a href="#platform">Plataforma</a>
              <a href="#scale">Escala</a>
              <a href="#about">About</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h3>Legacy</h3>
              <Link to="/cliente-legacy" onClick={() => handleLegacyClick("cliente")}>Cliente legacy</Link>
              <Link to="/negocio-legacy" onClick={() => handleLegacyClick("negocio")}>Negocio legacy</Link>
            </div>
            <div>
              <h3>Soporte y legal</h3>
              <Link to="/soporte-chat">Chat de soporte</Link>
              <Link to="/legal/es/privacidad">Privacidad</Link>
              <Link to="/legal/es/terminos">Terminos</Link>
              <Link to="/legal/es/borrar-datos">Borrar datos</Link>
            </div>
          </div>
        </footer>
      </div>
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
    <form className={`plx-form ${tone === "dark" ? "plx-form--dark" : ""}`} onSubmit={onSubmit}>
      <div className="plx-form-row">
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
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
          className="plx-input"
          required
        />
        <button type="submit" className="plx-submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Reservar acceso"}
        </button>
      </div>

      <div className="plx-honeypot" aria-hidden="true">
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

      <p className="plx-form-note">
        Al registrarte aceptas recibir noticias del acceso anticipado. Revisa <Link to="/legal/es/privacidad">Privacidad</Link> y <Link to="/legal/es/terminos">Terminos</Link>.
      </p>

      {statusMessage ? (
        <div className={`plx-status ${status === "error" ? "plx-status--error" : "plx-status--success"}`} aria-live="polite">
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

function ArrowRightIcon() {
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

function CompassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.8 9.2l-1.9 5.6-5.7 1.9 1.9-5.6 5.7-1.9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 14h2v2h-2zM18 14h2v6h-6v-2h4zM14 18h2v2h-2z" fill="currentColor" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.5 11a3 3 0 100-6 3 3 0 000 6zM16.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5M13.5 19c.2-1.8 1.9-3.2 4-3.2 2.2 0 4 1.6 4 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.2-2.7 7.9-7 9-4.3-1.1-7-4.8-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.2 12.4l1.8 1.8 3.8-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
