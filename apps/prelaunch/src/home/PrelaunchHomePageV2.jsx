import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { submitWaitlistSignup } from "../waitlist/waitlistApi";
import { ingestPrelaunchEvent } from "../services/prelaunchSystem";
import "./prelaunchHomeV2.css";

const NAV_ITEMS = [
  { label: "Sistema", href: "#system" },
  { label: "Mercado", href: "#market" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const SIGNAL_BAND = [
  {
    label: "Cliente",
    title: "Descubrimiento claro",
    description: "Promociones legibles, grupos visibles y beneficios que se entienden en segundos.",
  },
  {
    label: "Negocio",
    title: "Operacion util",
    description: "Un panel para ordenar oferta, preparar salidas y sostener crecimiento con mas criterio.",
  },
  {
    label: "Soporte",
    title: "Confianza operativa",
    description: "La marca no se rompe al llegar un problema: soporte y legal ya forman parte del sistema.",
  },
  {
    label: "Expansion",
    title: "Lista para ciudad nueva",
    description: "Una narrativa que puede replicarse por plaza, vertical o etapa sin sentirse improvisada.",
  },
];

const SYSTEM_CARDS = [
  {
    title: "Adquisicion con mas nivel",
    description:
      "La entrada ya no se comporta como una promo casual. Se presenta como una invitacion de marca con disciplina visual y una promesa clara.",
    Icon: OrbitIcon,
  },
  {
    title: "Canje y validacion",
    description:
      "QR, reglas y contexto suficiente para que la experiencia se vea confiable desde el primer uso y no como un parche temporal.",
    Icon: ScanIcon,
  },
  {
    title: "Operacion visible",
    description:
      "Borradores, revision, soporte y cumplimiento integrados en la historia principal, no escondidos como deuda del producto.",
    Icon: GridIcon,
  },
  {
    title: "Marca reusable",
    description:
      "La home se diseña como una base replicable para mercados futuros, no como una landing efimera sin estructura.",
    Icon: ShieldIcon,
  },
];

const MARKET_LANES = [
  {
    eyebrow: "Cliente",
    title: "La experiencia se siente limpia, actual y segura.",
    description:
      "Referidos presenta promociones, puntos y grupos como una experiencia util de todos los dias, no como un wireframe vestido con colores.",
    bullets: [
      "Promociones con contexto suficiente para decidir rapido.",
      "Puntos y referidos explicados sin ruido ni sobrecarga.",
      "Instalacion PWA y acceso ligero para activar mas usuarios.",
    ],
    tone: "light",
  },
  {
    eyebrow: "Negocio",
    title: "El panel se comunica como una herramienta de crecimiento.",
    description:
      "La narrativa para negocios deja de sonar beta-local. Habla de publicacion, control, revision y expansion con lenguaje de producto real.",
    bullets: [
      "Promociones listas para ajustar antes de publicar.",
      "Capacidad para ordenar la oferta por contexto y etapa.",
      "Base de marca consistente entre panel, soporte y home.",
    ],
    tone: "dark",
  },
  {
    eyebrow: "Operacion",
    title: "Soporte, legal y conversion sostienen la misma percepcion.",
    description:
      "Una pagina premium no termina cuando termina el hero. La sensacion de control se sostiene en las rutas que resuelven dudas, friccion y confianza.",
    bullets: [
      "Footers y rutas reales, no arquitectura decorativa.",
      "Soporte humano visible desde la home principal.",
      "Cumplimiento y datos tratados como parte del producto.",
    ],
    tone: "light",
  },
];

const EXPANSION_ITEMS = [
  {
    title: "Disenada para mercados vivos",
    description:
      "La identidad visual se apoya en una base sobria y operativa. Puede sentirse local para un comercio de calle y suficientemente firme para una cadena pequena o una nueva ciudad.",
  },
  {
    title: "Una sola voz para multiples plazas",
    description:
      "No hay una landing para cada ocurrencia. Hay un sistema de marca, producto y soporte que puede modularse sin perder jerarquia ni credibilidad.",
  },
  {
    title: "Producto primero, decoracion despues",
    description:
      "La direccion visual sirve para reforzar el producto real. Las capturas, los mensajes y la estructura cargan el peso principal de la home.",
  },
];

const BRAND_VALUES = [
  {
    title: "Claridad ejecutiva",
    description: "Cada bloque debe justificar su presencia y empujar la percepcion de control.",
  },
  {
    title: "Ambicion regional",
    description: "La experiencia esta pensada para crecer sin volver a caer en estetica de proyecto local improvisado.",
  },
  {
    title: "Comercio con criterio",
    description: "Promociones, puntos y referidos se presentan como infraestructura comercial, no como truco visual.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Que cambia en esta version 2?",
    answer:
      "La home principal adopta una identidad completamente nueva: otra narrativa, otra direccion cromatica, otra tipografia y otra forma de presentar el producto y la operacion.",
  },
  {
    question: "Referidos sigue siendo una sola pagina?",
    answer:
      "Si. La estrategia sigue concentrando marca, producto, confianza, about y conversion en una sola pagina principal para no fragmentar la historia.",
  },
  {
    question: "La waitlist esta pensada para quien?",
    answer:
      "La reserva principal de acceso se concentra en el flujo cliente, mientras las rutas legacy conservan los recorridos anteriores para cliente y negocio.",
  },
  {
    question: "Por que mantener cliente-legacy y negocio-legacy?",
    answer:
      "Porque funcionan como archivo operativo y referencia historica mientras la pagina principal evoluciona hacia una direccion mas madura.",
  },
  {
    question: "Esto ya parece una plataforma multi regional?",
    answer:
      "Esa es precisamente la intencion de la V2: que la pagina ya se lea como la entrada de una plataforma replicable entre plazas, no como una maqueta local con polish superficial.",
  },
  {
    question: "Es una app nativa o una PWA?",
    answer:
      "En esta etapa se presenta como una PWA instalable, con una experiencia mas ligera para adopcion temprana y despliegue mas agil.",
  },
];

export default function PrelaunchHomePageV2() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const meta = useMemo(
    () => ({
      title: "Referidos | Red de fidelidad para comercio de proximidad",
      description:
        "Una home premium para presentar promociones, grupos, puntos y operacion con criterio regional, producto visible y una narrativa mas madura.",
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
      props: { page: "premium_home_v2" },
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
      source: "premium_home_v2_waitlist",
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
      trackEvent("waitlist_submit", { already: true, source: "premium_home_v2" });
      void ingestPrelaunchEvent("waitlist_submit", {
        path: location.pathname,
        props: { already: true, role_intent: "cliente", source: "premium_home_v2" },
      });
      return;
    }

    setStatus("success");
    trackEvent("waitlist_submit", { already: false, source: "premium_home_v2" });
    void ingestPrelaunchEvent("waitlist_submit", {
      path: location.pathname,
      props: { already: false, role_intent: "cliente", source: "premium_home_v2" },
    });
  };

  const handleLegacyClick = (target) => {
    trackEvent("legacy_open", { target, source: "premium_home_v2" });
    void ingestPrelaunchEvent("legacy_open", {
      path: location.pathname,
      props: { target, source: "premium_home_v2" },
    });
  };

  return (
    <div className="v2-home" id="top">
      <div className="v2-noise" aria-hidden="true" />
      <div className="v2-grid" aria-hidden="true" />

      <header className="v2-nav-wrap">
        <div className="v2-container v2-nav">
          <a href="#top" className="v2-brand" aria-label="Ir al inicio de Referidos">
            <span className="v2-brand-mark">
              <span className="v2-brand-dot v2-brand-dot--a" />
              <span className="v2-brand-dot v2-brand-dot--b" />
              <span className="v2-brand-dot v2-brand-dot--c" />
            </span>
            <span className="v2-brand-copy">
              <strong>ReferidosAPP</strong>
              <small>NETWORK PRELAUNCH</small>
            </span>
          </a>

          <nav className="v2-nav-links" aria-label="Secciones principales">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="v2-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="v2-nav-actions">
            <Link
              to="/negocio-legacy"
              onClick={() => handleLegacyClick("negocio")}
              className="v2-button v2-button--ghost"
            >
              Negocio legacy
            </Link>
            <a href="#join" className="v2-button">
              Reservar acceso
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="v2-hero v2-container">
          <div className="v2-hero-copy">
            <p className="v2-kicker">Prelaunch v2 / local commerce network</p>
            <h1 className="v2-display">
              Una red de fidelidad hecha para mercados vivos, no para parecer una beta maquillada.
            </h1>
            <p className="v2-copy">
              Referidos presenta promociones, grupos, puntos y operacion como una capa de crecimiento para comercio de proximidad. La experiencia principal ya no se ve como un wireframe con polish: se ve como una entrada de marca lista para abrir ciudad tras ciudad.
            </p>

            <div className="v2-signal-row">
              <span>PWA instalable</span>
              <span>QR operativo</span>
              <span>Soporte humano</span>
              <span>Arquitectura regional</span>
            </div>

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

            <div className="v2-hero-links">
              <a href="#system" className="v2-inline-link">
                Ver el sistema completo
                <ArrowIcon />
              </a>
              <Link
                to="/cliente-legacy"
                onClick={() => handleLegacyClick("cliente")}
                className="v2-inline-link v2-inline-link--muted"
              >
                Revisar cliente legacy
              </Link>
            </div>
          </div>

          <div className="v2-stage" aria-label="Vista previa del producto Referidos">
            <div className="v2-stage-note v2-stage-note--north">
              <span>Direccion de marca</span>
              <strong>Cliente, negocio y soporte bajo una sola narrativa operativa.</strong>
            </div>

            <div className="v2-stage-surface">
              <div className="v2-stage-topbar">
                <span>referidos.app</span>
                <span>network preview</span>
              </div>

              <div className="v2-screen v2-screen--desktop">
                <img
                  src="/screenshots/desktop-1.png"
                  alt="Vista de escritorio del panel de Referidos"
                  loading="eager"
                />
              </div>

              <div className="v2-screen v2-screen--mobile">
                <div className="v2-screen-label">cliente pwa</div>
                <img
                  src="/screenshots/mobile-1.png"
                  alt="Vista movil de Referidos"
                  loading="eager"
                />
              </div>
            </div>

            <div className="v2-stage-rail">
              <div>
                <strong>01</strong>
                <span>Promociones legibles y mas confiables.</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Grupos y puntos presentados como producto real.</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Operacion lista para sostener expansion.</span>
              </div>
            </div>

            <div className="v2-stage-note v2-stage-note--south">
              <span>Stack principal</span>
              <ul>
                <li>Captacion mas limpia</li>
                <li>Canje con criterio</li>
                <li>Soporte alineado con la marca</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="v2-band v2-container" aria-label="Capas de la plataforma">
          <div className="v2-band-grid">
            {SIGNAL_BAND.map((item) => (
              <article key={item.label} className="v2-band-item">
                <p>{item.label}</p>
                <h2>{item.title}</h2>
                <span>{item.description}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="system" className="v2-section">
          <div className="v2-container">
            <div className="v2-section-heading">
              <p className="v2-kicker">Sistema</p>
              <h2>Una home con acabados altos necesita un sistema, no una coleccion de ocurrencias.</h2>
              <p>
                La V2 cambia la tesis completa: menos ornamento de prototipo, mas estructura de producto. Cada bloque existe para sostener adquisicion, claridad y expansion.
              </p>
            </div>

            <div className="v2-system-grid">
              {SYSTEM_CARDS.map((item) => (
                <article key={item.title} className="v2-card v2-card--system">
                  <div className="v2-icon-box">
                    <item.Icon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="market" className="v2-section v2-section--contrast">
          <div className="v2-container">
            <div className="v2-section-heading v2-section-heading--light">
              <p className="v2-kicker v2-kicker--light">Mercado</p>
              <h2>La plataforma ya se comunica como una pieza seria de comercio regional.</h2>
              <p>
                La narrativa deja de hablar como landing experimental. Ahora organiza la experiencia por capas de mercado que cualquier equipo puede entender, defender y replicar.
              </p>
            </div>

            <div className="v2-lane-grid">
              {MARKET_LANES.map((lane) => (
                <article
                  key={lane.eyebrow}
                  className={`v2-lane ${lane.tone === "dark" ? "v2-lane--dark" : ""}`}
                >
                  <p className="v2-lane-eyebrow">{lane.eyebrow}</p>
                  <h3>{lane.title}</h3>
                  <p className="v2-lane-copy">{lane.description}</p>
                  <ul className="v2-check-list">
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
          </div>
        </section>

        <section className="v2-section">
          <div className="v2-container v2-expansion-layout">
            <div className="v2-expansion-intro">
              <p className="v2-kicker">Escala</p>
              <h2>Premium no es verse distante. Es sostener nivel cuando el producto crece.</h2>
              <p>
                Esta V2 esta pensada para que la marca conserve control en nuevos contextos: otro barrio, otra ciudad, otra categoria o una cadena con mas exigencia operativa.
              </p>
              <blockquote>
                La ambicion no se comunica con palabras grandes. Se comunica con estructura, jerarquia y consistencia.
              </blockquote>
            </div>

            <div className="v2-expansion-grid">
              {EXPANSION_ITEMS.map((item) => (
                <article key={item.title} className="v2-card v2-card--elevated">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="v2-section v2-section--dark">
          <div className="v2-container v2-about-layout">
            <article className="v2-about-copy">
              <p className="v2-kicker v2-kicker--light">About</p>
              <h2>Referidos se presenta como una capa de comercio local con criterio internacional.</h2>
              <p>
                La prioridad de esta home no es adornar una beta. Es demostrar que el producto puede hablar con una voz mas firme, mas limpia y mas preparada para operar en distintos contextos sin verse amateur.
              </p>
              <p>
                Eso implica que la landing ya forma parte del producto: vende confianza, ordena la percepcion y da la primera prueba de que el equipo sabe cuando simplificar y cuando elevar el nivel.
              </p>
              <div className="v2-about-links">
                <Link to="/soporte-chat">Hablar con soporte</Link>
                <Link to="/legal/es/privacidad">Privacidad</Link>
                <Link to="/legal/es/terminos">Terminos</Link>
              </div>
            </article>

            <div className="v2-values-grid">
              {BRAND_VALUES.map((item) => (
                <article key={item.title} className="v2-card v2-card--dark">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="v2-section">
          <div className="v2-container">
            <div className="v2-section-heading">
              <p className="v2-kicker">FAQ</p>
              <h2>Preguntas que una pagina seria responde de frente.</h2>
            </div>

            <div className="v2-faq-grid">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="v2-faq-item">
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

        <section id="join" className="v2-section v2-section--join">
          <div className="v2-container">
            <div className="v2-cta-card">
              <div className="v2-cta-copy">
                <p className="v2-kicker">Reserva de acceso</p>
                <h2>Una sola accion principal, una sola promesa y una entrada a la altura de la marca.</h2>
                <p>
                  La conversion vuelve a ser simple: deja tu correo y te avisaremos cuando la beta avance. El resto de la pagina existe para darle contexto, confianza y nivel a esa accion.
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

              <div className="v2-cta-links">
                <Link to="/cliente-legacy" onClick={() => handleLegacyClick("cliente")}>Cliente legacy</Link>
                <Link to="/negocio-legacy" onClick={() => handleLegacyClick("negocio")}>Negocio legacy</Link>
                <Link to="/soporte-correo">Soporte por correo</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="v2-footer v2-container">
        <div className="v2-footer-brand">
          <div className="v2-brand v2-brand--footer">
            <span className="v2-brand-mark">
              <span className="v2-brand-dot v2-brand-dot--a" />
              <span className="v2-brand-dot v2-brand-dot--b" />
              <span className="v2-brand-dot v2-brand-dot--c" />
            </span>
            <span className="v2-brand-copy">
              <strong>ReferidosAPP</strong>
              <small>NETWORK PRELAUNCH</small>
            </span>
          </div>
          <p>
            Promociones, grupos, puntos y soporte presentados con una direccion mas madura para una plataforma que quiere crecer sin volver a parecer una maqueta local.
          </p>
        </div>

        <div className="v2-footer-links">
          <div>
            <h3>Navegacion</h3>
            <a href="#system">Sistema</a>
            <a href="#market">Mercado</a>
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
    <form className={`v2-form ${tone === "dark" ? "v2-form--dark" : ""}`} onSubmit={onSubmit}>
      <div className="v2-form-row">
        <label htmlFor={`${idPrefix}-email`} className="v2-sr-only">
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
          className="v2-input"
          required
        />
        <button type="submit" className="v2-submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando..." : "Reservar acceso"}
        </button>
      </div>

      <div className="v2-honeypot" aria-hidden="true">
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

      <p className="v2-form-note">
        Al registrarte aceptas recibir noticias del acceso anticipado. Revisa <Link to="/legal/es/privacidad">Privacidad</Link> y <Link to="/legal/es/terminos">Terminos</Link>.
      </p>

      {statusMessage ? (
        <div className={`v2-status ${status === "error" ? "v2-status--error" : "v2-status--success"}`} aria-live="polite">
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

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 7L10 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OrbitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 6.8c3 1.7 7 8.7 10 10.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4H5a1 1 0 0 0-1 1v2M17 4h2a1 1 0 0 1 1 1v2M7 20H5a1 1 0 0 1-1-1v-2M17 20h2a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 9h1M12 9h1M15 9h1M9 15h1M12 15h1M15 15h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="4" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="10" width="7" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
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

