// src/waitlist/WaitlistPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { submitWaitlistSignup } from "./waitlistApi";

const FLOW_TARGET_ID = "waitlist-flow";

const HOW_CARDS = [
  {
    title: "Explora promos",
    description:
      "Explora la variedad de promociones en la aplicacion y escogue tus favoritas. Encuentra descuentos, regalos y más.",
  },
  {
    title: "Refiere y gana",
    description:
      "Acercate al restaurante, local o negocio y canjea tu promoción. Así de simple empieza a sumar y acumular puntos. Si tus amigos también participan multiplicarás tus puntos.",
  },
  {
    title: "Obtén beneficios",
    description:
      "La aplicacion te premia por acumular puntos, obtienes beneficios con tus puntos acumulados. Y ayudas a crecer a todo tipo de negocio.",
  },
];

const FAQ_CLIENTE_ITEMS = [
  {
    question: "¿Tiene algún costo?",
    answer:
      "Es y será completamente gratis, sin subscripciones, sin compras en la aplicacion ni pagos ocultos. Jamás se te pedirá ingresar información de pago o tarjetas.",
  },
  {
    question: "¿Es una app?",
    answer:
      "Sí. Es una app instalable (PWA). La instalas desde el navegador en 5 segundos, sin APK raros ni permisos especiales fuera de los normales del sitio. Se instala con el método oficial del navegador y se actualiza automáticamente funcionando en Android, iPhone y PC (según compatibilidad del navegador).",
  },
  {
    question: "¿Cuándo sale?",
    answer:
      "El acceso anticipado a la beta cerrada empezará pronto, si registras tu correo recibiras una invitacion para unirte. La version pública de la aplicación puede tardar un poco más, pero puedes empezar a acumular tus beneficios en la beta cerrada.",
  },
  {
    question: "¿Como me registro en la app?",
    answer:
      "Es muy rapido y simple, puedes continuar usando tu cuenta de Google, Facebook, etc. O registrarte con un correo y una contraseña.",
  },
  {
    question: "¿Puedo quitar mi email de la lista?",
    answerNode: (
      <>
        Tu email se borrará automaticamente de la lista una vez te enviemos la invitación cuando inicie el acceso anticipado. Pero si deseas borrarlo y no recibir la notificación con tu invitación, puedes hacerlo facilmente contactando con{" "}
        <button
          type="button"
          className="text-[var(--brand-purple)] font-semibold hover:underline"
        >
          ayuda y soporte
        </button>
        .
      </>
    ),
  },
];

const FAQ_ITEMS = [
  {
    question: "¿Cuánto cuesta?",
    answer: "Gratis en beta.",
  },
  {
    question: "¿Es una app?",
    answer: "Por ahora PWA instalable.",
  },
  {
    question: "¿Cuándo sale?",
    answer: "Te avisamos por email.",
  },
  {
    question: "¿Negocios necesitan verificación?",
    answer: "Más adelante; por ahora onboarding simplificado.",
  },
  {
    question: "¿Puedo borrar mi email?",
    answer: "Sí, link en el correo.",
  },
];

const BUSINESS_STEPS = [
  {
    title: "Instala la APP",
    description: "Desde el navegador y en segundos",
    Icon: DownloadIcon,
  },
  {
    title: "Pide un código aquí",
    description: "Llegará en menos de 1 minuto",
    Icon: KeyIcon,
  },
  {
    title: "Regístrate",
    description: "Usa correo, cuenta de Google, Facebook...",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Crea promociones",
    description: "Publica las promociones aprovadas",
    Icon: TagIcon,
  },
];

export default function WaitlistPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = normalizeMode(searchParams.get("mode"));
  const rootRef = useRef(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const meta = useMemo(
    () => ({
      title: "Referidos | Waitlist beta",
      description:
        "Únete a la lista de espera y recibe acceso primero. Clientes y negocios con promos reales y beneficios por referir.",
      ogImage: `${window.location.origin}/screenshots/desktop-1.png`,
    }),
    []
  );

  useEffect(() => {
    const url = `${window.location.origin}${location.pathname}${location.search}`;
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
  }, [location.pathname, location.search, meta]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const lockWidth = 880;
    const isDesktopDevice = window.screen && window.screen.width >= 1024;

    const applyLock = () => {
      const shouldLock = isDesktopDevice && window.innerWidth <= lockWidth;
      if (shouldLock) {
        document.documentElement.dataset.desktopLock = "true";
      } else {
        delete document.documentElement.dataset.desktopLock;
      }
    };

    applyLock();
    window.addEventListener("resize", applyLock);
    return () => window.removeEventListener("resize", applyLock);
  }, []);

  useEffect(() => {
    if (!rootRef.current || typeof window === "undefined") return;
    let rafId = null;
    const maxShift = 510;
    const shiftStart = 1 / 5;
    const lockStart = 1.5 / 5;
    const lockEnd = 2.1 / 5;
    const lockGain = 1.3;

    const updateStretch = () => {
      rafId = null;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const baseHeight = window.innerWidth >= 768 ? 960 : 800;
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      const lockValue = Math.min(1, lockStart * lockGain);
      let virtualProgress = 0;
      if (progress <= lockStart) {
        const t = Math.min(1, Math.max(0, progress / lockStart));
        const eased = Math.min(1, Math.max(0, t ** 1.6));
        virtualProgress = lockValue * eased;
      } else if (progress <= lockEnd) {
        virtualProgress = lockValue;
      } else {
        const t = (progress - lockEnd) / (1 - lockEnd);
        const eased = Math.min(1, Math.max(0, t ** 1.8));
        virtualProgress = lockValue + eased * (1 - lockValue);
      }

      let stretchProgress = 0;
      if (progress <= lockStart) {
        const t = Math.min(1, Math.max(0, progress / lockStart));
        const eased = Math.min(1, Math.max(0, t ** 1.6));
        stretchProgress = lockValue * eased;
      } else if (progress <= lockEnd) {
        stretchProgress = lockValue;
      } else {
        const t = (progress - lockEnd) / (1 - lockEnd);
        const eased = Math.min(1, Math.max(0, t ** 1.8));
        stretchProgress = lockValue + eased * (1 - lockValue);
      }

      const virtualScrollY = maxScroll * stretchProgress;

      const maxStretch = Math.max(0, doc.scrollHeight - baseHeight - 90);
      const stretch = Math.min(maxStretch, Math.max(0, virtualScrollY));
      rootRef.current.style.setProperty("--hero-bg-stretch", `${stretch}px`);

      const shiftProgress = Math.min(
        1,
        Math.max(0, (virtualProgress - shiftStart) / (1 - shiftStart)) ** 2.2 * 1.6
      );
      const shift = Math.min(maxShift, Math.max(0, shiftProgress * maxShift));
      rootRef.current.style.setProperty("--hero-bg-shift", `${shift}px`);
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(updateStretch);
    };

    updateStretch();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleModeChange = (nextMode) => {
    const normalized = normalizeMode(nextMode);
    const currentParam = searchParams.get("mode");
    if (currentParam !== normalized) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("mode", normalized);
      setSearchParams(nextParams, { replace: true });
    }
    trackEvent(normalized === "cliente" ? "select_mode_cliente" : "select_mode_negocio");
  };


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
      setErrorMessage("Ingresa un email válido.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const result = await submitWaitlistSignup({
      email: trimmedEmail,
      role: "cliente",
      source: "landing_waitlist",
      consentVersion: "privacy_v1",
      honeypot,
    });

    if (!result?.ok) {
      setStatus("error");
      setErrorMessage("No pudimos registrarte. Intenta de nuevo.");
      return;
    }

    if (result.already) {
      setStatus("already");
      trackEvent("waitlist_submit", { already: true });
      return;
    }

    setStatus("success");
    trackEvent("waitlist_submit", { already: false });
  };

  const statusMessage = getStatusMessage(status);
  const visibleMessage = status === "error" ? errorMessage : statusMessage;
  const [cardOne, cardTwo, cardThree] = HOW_CARDS;

  const handleSwitchToNegocio = () => {
    handleModeChange("negocio");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderBusinessPanel = () => (
    <div className="hero-panel hero-panel-negocio mt-2 w-full max-w-[360px] border-0 bg-transparent pb-6 pl-0 pr-0 pt-6 text-right text-white shadow-none md:ml-auto">
      <p className="text-sm text-white/80">
        Crea borradores de promociones, envialas a revisión y déjalas listas para publicar en el acceso anticipado.
      </p>
      <div className="mt-4 space-y-1.5">
        {BUSINESS_STEPS.map((step, index) => {
          const isPurple = index % 2 === 1;
          return (
            <div
              key={step.title}
                            className={`flex items-center gap-3 rounded-2xl px-4 py-2 ${
                              isPurple ? "bg-transparent" : "bg-white"
                            }`}
            >
              <div
                className="step-number text-3xl font-semibold leading-none text-transparent md:text-4xl"
                style={{
                  WebkitTextStroke: `2px ${isPurple ? "rgba(255,255,255,0.85)" : "rgba(94,48,165,0.85)"}`,
                }}
              >
                {index + 1}
              </div>
              <div className="flex flex-1 items-center justify-between gap-3">
                <div className="text-left">
                  <p className={`text-sm font-semibold ${isPurple ? "text-white" : "text-slate-900"}`}>
                    {step.title}
                    {step.title === "Crea promociones" && (
                      <span className={`ml-2 text-[10px] font-semibold ${isPurple ? "text-white/70" : "text-slate-500"}`}>
                        borradores
                      </span>
                    )}
                  </p>
                  <p className={`text-xs ${isPurple ? "text-white/70" : "text-slate-500"}`}>
                    {step.description}
                  </p>
                </div>
                <div
                  className={`flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center rounded-xl ${
                    isPurple ? "bg-white text-[var(--brand-purple)]" : "bg-[var(--brand-purple)] text-white"
                  }`}
                >
                  <step.Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <a
          href="/app"
          onClick={() => trackEvent("open_pwa_click")}
          className="w-4/5 translate-x-2 rounded-2xl border border-white/70 bg-white px-6 pb-1 pt-2 text-center text-sm font-semibold leading-tight text-black shadow-md shadow-purple-900/20 transition-transform hover:-translate-y-0.5 hover:border-[var(--brand-yellow)]/80 hover:bg-[var(--brand-yellow)]"
        >
          Descargar panel para negocio
          <span className="block text-xs font-semibold text-slate-600">
            (Acceso anticipado)
          </span>
        </a>
        <p className="text-xs text-white/70">
          Version PWA, funciona para Android y iPhone, proximamente en Windows.
        </p>
      </div>
    </div>
  );

  const renderClientPanel = () => (
    <div className="hero-panel mt-6 w-full max-w-[360px] rounded-[28px] border-0 bg-transparent pb-6 pl-0 pr-0 pt-6 text-right text-white shadow-none md:ml-auto">
      <p className="text-sm text-white/80">
        Obten beneficios por participar en el acceso anticipado, registra tu correo y te notificaremos.
      </p>
      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col items-end gap-3">
          <input
            id="waitlist-email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@email.com"
            className="w-[288px] rounded-2xl border border-white/40 bg-white/95 px-4 py-3 text-left text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              resetStatus();
            }}
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-[288px] rounded-2xl border border-white/70 bg-white px-6 py-3 text-sm font-semibold text-black shadow-md shadow-purple-900/20 transition-transform hover:-translate-y-0.5 hover:border-[var(--brand-yellow)]/80 hover:bg-[var(--brand-yellow)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Enviando..." : "Unirse a la lista de espera"}
          </button>
        </div>

        <div
          className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="company">Empresa</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <p className="text-xs text-white/70">
          Al unirte aceptas recibir el correo de notificacion para poder descargar la app una vez esté disponible.
        </p>
        <p className="text-xs text-white/70">
          <a href="/privacy" className="text-white hover:underline">
            Privacidad
          </a>
          <span className="mx-1">·</span>
          <a href="/terms" className="text-white hover:underline">
            Términos
          </a>
        </p>

        <div aria-live="polite" className="min-h-0">
          {visibleMessage && (
            <div
              className={`mt-2 flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold ${
                status === "error"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {status === "error" ? <AlertIcon /> : <CheckIcon />}
              {visibleMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );

  return (
      <div
        className="desktop-min relative min-h-screen bg-[var(--brand-purple)] text-slate-900"
        data-mode={mode}
        ref={rootRef}
        style={{
          fontFamily: '"Space Grotesk", "Sora", "Trebuchet MS", sans-serif',
        }}
      >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@100;200;300;400;500;600;700&display=swap");
        :root {
          --brand-purple: #5E30A5;
          --brand-yellow: #FFC21C;
          --ink: #1F1235;
          --layout-min: 880px;
          --layout-max: 1440px;
          --hero-bg-stretch: 0px;
          --hero-bg-shift: 0px;
        }
        @keyframes floaty {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { opacity: 0.3; }
        }
        .floaty { animation: floaty 7s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .soft-glow { animation: shimmer 6s ease-in-out infinite; }
        .hero-bg-fixed {
          --hero-bg-base: 800px;
          height: calc(var(--hero-bg-base) + var(--hero-bg-stretch));
          z-index: 0;
        }
        .hero-content {
          position: relative;
          z-index: 1;
        }
        .hero-split-bg {
          background: var(--brand-purple);
          transform: translateX(var(--hero-bg-shift));
          -webkit-clip-path: polygon(
            100% 0%,
            100% 100%,
            52% 100%,
            60% 82%,
            50% 62%,
            56% 48%,
            62% 32%,
            54% 16%,
            58% 0%
          );
          clip-path: polygon(
            100% 0%,
            100% 100%,
            52% 100%,
            60% 82%,
            50% 62%,
            56% 48%,
            62% 32%,
            54% 16%,
            58% 0%
          );
        }
        .hero-grid {
          display: grid;
          gap: 2.5rem;
          align-items: start;
          grid-template-columns: minmax(400px, 1.15fr) minmax(300px, 0.85fr);
        }
        .hero-subline {
          white-space: nowrap;
        }
        .hero-panel-wrap {
          position: relative;
          width: 100%;
        }
        .mode-stack {
          position: relative;
        }
        .mode-sizer {
          visibility: hidden;
          pointer-events: none;
        }
        .mode-layer {
          position: absolute;
          inset: 0;
        }
        .hero-panel-sizer {
          visibility: hidden;
          pointer-events: none;
        }
        .hero-panel-layer {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }
        .note-thin {
          font-weight: 200;
          font-variation-settings: "wght" 200;
          font-synthesis-weight: none;
        }
        @media (min-width: 768px) {
          .hero-bg-fixed {
            --hero-bg-base: 960px;
          }
        }
        [data-mode="cliente"] .mode-negocio {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        [data-mode="negocio"] .mode-cliente {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
        [data-mode="cliente"] .only-negocio {
          display: none !important;
        }
        [data-mode="negocio"] .only-cliente {
          display: none !important;
        }
          @media (max-width: 1080px) {
            .hero-subline {
              white-space: normal;
            }
            .hero-body {
              padding-right: 2rem;
            }
          }
          @media (max-width: 950px) {
            .hero-panel {
              padding-left: 1.5rem;
            }
          }
          @media (max-width: 1030px) {
            .hero-panel-negocio {
              padding-left: 3rem;
            }
          }
        [data-desktop-lock="true"] .desktop-min {
          width: clamp(var(--layout-min), 100vw, var(--layout-max));
          min-width: var(--layout-min);
          max-width: var(--layout-max);
          margin-left: auto;
          margin-right: auto;
        }
        [data-desktop-lock="true"] .hero-bg-fixed {
          width: clamp(var(--layout-min), 100vw, var(--layout-max));
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          height: calc(var(--hero-bg-base) + var(--hero-bg-stretch));
        }
        [data-desktop-lock="true"] .hero-title {
          font-size: 3.75rem;
          line-height: 1.25;
        }
        [data-desktop-lock="true"] .hero-title span {
          font-size: 3.75rem;
          line-height: 1.25;
        }
        [data-desktop-lock="true"] .hero-body {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
        [data-desktop-lock="true"] .step-number {
          font-size: 2.25rem;
          line-height: 1;
        }
        @media (max-width: 767px) {
          .hero-split-bg {
            -webkit-clip-path: polygon(
              100% 0%,
              100% 100%,
              64% 100%,
              70% 84%,
              62% 62%,
              66% 48%,
              72% 32%,
              66% 16%,
              70% 0%
            );
            clip-path: polygon(
              100% 0%,
              100% 100%,
              64% 100%,
              70% 84%,
              62% 62%,
              66% 48%,
              72% 32%,
              66% 16%,
              70% 0%
          );
          }
          .hero-subline {
            white-space: normal;
          }
        }
        [data-desktop-lock="true"] .hero-split-bg {
          -webkit-clip-path: polygon(
            100% 0%,
            100% 100%,
            52% 100%,
            60% 82%,
            50% 62%,
            56% 48%,
            62% 32%,
            54% 16%,
            58% 0%
          );
          clip-path: polygon(
            100% 0%,
            100% 100%,
            52% 100%,
            60% 82%,
            50% 62%,
            56% 48%,
            62% 32%,
            54% 16%,
            58% 0%
          );
        }
        [data-desktop-lock="true"] .hero-right {
          align-items: flex-end;
        }
        @media (prefers-reduced-motion: reduce) {
          .floaty, .fade-up, .soft-glow { animation: none; }
        }
      `}</style>

      <div className="hero-bg-fixed pointer-events-none absolute inset-x-0 top-0">
        <div className="absolute inset-0 bg-white" />
        <div className="hero-split-bg absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 right-12 h-72 w-72 rounded-full blur-[130px] soft-glow"
          style={{ background: "radial-gradient(circle, rgba(255,194,28,0.55), rgba(94,48,165,0.25))" }}
        />
        <div
          className="absolute bottom-0 left-0 h-80 w-80 rounded-full blur-[140px] soft-glow"
          style={{ background: "radial-gradient(circle, rgba(94,48,165,0.35), rgba(255,255,255,0))" }}
        />
      </div>

      <main className="relative z-10">
          <div className="relative">
          <div className="hero-content">
            <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
              <div className="text-lg font-semibold tracking-tight text-[var(--ink)]">
                Referidos
              </div>
              <div className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 md:flex">
                <span>Promos</span>
                <span>Beneficios</span>
                <span>Referidos</span>
              </div>
            </header>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-12">
            <div className="hero-grid">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-sm">
                  RESERVA TU ACCESO ANTICIPADO
                </span>
                <h1 className="hero-title text-4xl font-semibold leading-tight text-[var(--ink)] md:text-6xl">
                  Busca promociones
                  <span className="hero-subline block text-[var(--brand-purple)]">Canjea y suma puntos</span>
                </h1>
                  <p className="hero-body max-w-xl text-base leading-7 text-slate-700 md:text-lg">
                  Encuentra promociones en restaurantes o negocios cerca de tí. Al invitar amigos multiplicas los puntos que recibes.
                  Acumula puntos y obtén beneficios. Solo por canjear promociones.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#como-funciona"
                    className="text-sm font-semibold text-[var(--brand-purple)] underline-offset-4 hover:underline"
                  >
                    ¿Cómo funciona?
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <div className="rounded-full bg-white/80 px-3 py-1 shadow">Beta cerrada</div>
                  <div className="rounded-full bg-white/80 px-3 py-1 shadow">Cupos limitados</div>
                  <div className="rounded-full bg-white/80 px-3 py-1 shadow">Beneficios extra</div>
                  <div className="rounded-full bg-white/80 px-3 py-1 shadow">Reserva ya</div>
                </div>
              </div>

              <div className="hero-right flex w-full -translate-y-3 flex-col items-stretch md:items-end">
                <div className="flex items-center rounded-full bg-white/90 px-0.5 py-0.5 shadow-lg backdrop-blur">
                  <button
                    type="button"
                    onClick={() => handleModeChange("cliente")}
                    aria-pressed={mode === "cliente"}
                    className={`rounded-full px-5 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple)]/60 ${
                      mode === "cliente"
                        ? "bg-[var(--brand-purple)] text-white shadow"
                        : "bg-transparent text-[var(--brand-purple)] hover:bg-transparent"
                    }`}
                  >
                    Explorar promos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange("negocio")}
                    aria-pressed={mode === "negocio"}
                    className={`-ml-2 rounded-full px-5 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-purple)]/60 ${
                      mode === "negocio"
                        ? "bg-[var(--brand-purple)] text-white shadow"
                        : "bg-transparent text-[var(--brand-purple)] hover:bg-transparent"
                    }`}
                  >
                    App para negocios
                  </button>
                </div>

                <div className="hero-panel-wrap">
                  <div className="hero-panel-sizer" aria-hidden="true">
                    {renderBusinessPanel()}
                  </div>
                  <div className="hero-panel-layer mode-negocio" aria-hidden={mode !== "negocio"}>
                    {renderBusinessPanel()}
                  </div>
                  <div className="hero-panel-layer mode-cliente" aria-hidden={mode !== "cliente"}>
                    {renderClientPanel()}
                  </div>
                </div>
              </div>
            </div>

            </section>
          </div>
        </div>

        <section id={FLOW_TARGET_ID} className="mx-auto w-full max-w-6xl px-6 pb-16 pt-16">
          <div className="rounded-[36px] border border-slate-400/45 bg-white/55 p-6 shadow-xl backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-yellow)]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B4B00]">
              BETA / ACCESO ANTICIPADO
            </span>
            <h3 className="mt-5 text-xl font-semibold text-[var(--ink)]">
              No te quedes sin participar, registra tu correo en la lista de espera.
            </h3>
            <p className="mt-4 text-sm text-slate-600">
              Las invitaciones serán limitadas, te enviaremos la tuya por correo, participa y obtén beneficios extra.
            </p>

            <div className="mt-10 mode-stack">
              <div className="mode-sizer" aria-hidden="true">
                <div className="grid gap-6 md:grid-cols-1">
                  <div className="fade-up rounded-[28px] border border-slate-100 bg-white p-6 text-sm text-slate-700 shadow-sm">
                    <h4 className="text-lg font-semibold text-[var(--ink)]">
                      ¿Qué puedo hacer en prelaunch?
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                        Crear promos draft.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                        Previsualizarlas.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                        Enviar para revisión.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mode-layer mode-cliente" aria-hidden={mode !== "cliente"}>
                <div className="grid gap-6 md:grid-cols-1">
                  <div className="fade-up rounded-[28px] border border-slate-100 bg-[#FFF7E5] p-6 text-sm text-slate-700 shadow-sm">
                    <h4 className="text-lg font-semibold text-[var(--ink)]">
                      Beneficios desde el día uno
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        Promos listas y fáciles de canjear.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        Multiplica puntos por llevar amigos.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        Beneficios extra por participar en el acceso anticipado de la beta.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mode-layer mode-negocio" aria-hidden={mode !== "negocio"}>
                <div className="grid gap-6 md:grid-cols-1">
                  <div className="fade-up rounded-[28px] border border-slate-100 bg-white p-6 text-sm text-slate-700 shadow-sm">
                    <h4 className="text-lg font-semibold text-[var(--ink)]">
                      ¿Qué puedo hacer en prelaunch?
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                        Crear promos draft.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                        Previsualizarlas.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-purple)]" />
                        Enviar para revisión.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div id="como-funciona" className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1 rounded-[22px] border border-slate-200 bg-white/80 p-6 text-center text-sm font-semibold text-[var(--ink)] shadow-sm">
                <h4 className="text-sm font-semibold text-[var(--ink)]">
                  {cardOne.title}
                </h4>
                <p className="mt-2 text-left text-xs font-normal text-slate-400">
                  {cardOne.description}
                </p>
              </div>
              <span aria-hidden="true" className="hidden text-2xl font-semibold text-black md:inline-flex">
                &gt;
              </span>
              <div className="flex-1 rounded-[22px] border border-slate-200 bg-white/80 p-6 text-center text-sm font-semibold text-[var(--ink)] shadow-sm">
                <h4 className="text-sm font-semibold text-[var(--ink)]">
                  {cardTwo.title}
                </h4>
                <p className="mt-2 text-left text-xs font-normal text-slate-400">
                  {cardTwo.description}
                </p>
              </div>
              <span aria-hidden="true" className="hidden text-2xl font-semibold text-black md:inline-flex">
                &gt;
              </span>
              <div className="flex-1 rounded-[22px] border border-slate-200 bg-white/80 p-6 text-center text-sm font-semibold text-[var(--ink)] shadow-sm">
                <h4 className="text-sm font-semibold text-[var(--ink)]">
                  {cardThree.title}
                </h4>
                <p className="mt-2 text-left text-xs font-normal text-slate-400">
                  {cardThree.description}
                </p>
              </div>
            </div>
            <div className="mt-6" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-52">
          <div className="rounded-[28px] border border-slate-400/45 bg-white/85 px-6 pb-6 pt-10 shadow-lg">
            <div className="mode-stack">
              <div className="mode-sizer" aria-hidden="true">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl font-semibold text-[var(--ink)]">Más información</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {FAQ_CLIENTE_ITEMS.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm"
                    >
                      <p className="font-semibold text-[var(--ink)]">{item.question}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {item.answerNode ?? item.answer}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="note-thin mt-4 text-center text-xs text-slate-800">
                  Información válida para personas que no van a registrar un negocio, ni ofrecer promociones.{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToNegocio}
                    className="note-thin text-[var(--brand-purple)] hover:underline"
                  >
                    Ver sección para negocios.
                  </button>
                </div>
              </div>

              <div className="mode-layer mode-cliente" aria-hidden={mode !== "cliente"}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl font-semibold text-[var(--ink)]">Más información</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {FAQ_CLIENTE_ITEMS.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm"
                    >
                      <p className="font-semibold text-[var(--ink)]">{item.question}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {item.answerNode ?? item.answer}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="note-thin mt-4 text-center text-xs text-slate-800">
                  Información válida para personas que no van a registrar un negocio, ni ofrecer promociones.{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToNegocio}
                    className="note-thin text-[var(--brand-purple)] hover:underline"
                  >
                    Ver sección para negocios.
                  </button>
                </div>
              </div>

              <div className="mode-layer mode-negocio" aria-hidden={mode !== "negocio"}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xl font-semibold text-[var(--ink)]">FAQ rápido</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {FAQ_ITEMS.map((item) => (
                    <div
                      key={item.question}
                      className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm"
                    >
                      <p className="font-semibold text-[var(--ink)]">{item.question}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 w-full pb-10">
        <div className="border-t border-white/15">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 pt-6 text-xs text-white/75">
            <span>© {new Date().getFullYear()} Referidos</span>
            <div className="flex flex-wrap gap-4">
              <a href="/privacy" className="hover:text-white">Privacidad</a>
              <a href="/terms" className="hover:text-white">Términos</a>
              <a href="mailto:soporte@referidos.app" className="hover:text-white">Contacto</a>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em]">ALPHA v0.8</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function normalizeMode(value) {
  return value === "negocio" ? "negocio" : "cliente";
}

function getStatusMessage(status) {
  if (status === "success") return "Listo, te avisaremos pronto.";
  if (status === "already") return "Ya estabas en la lista. Te avisaremos igual.";
  return "";
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

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z"
        fill="currentColor"
      />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16l-1.5 10.5a2 2 0 01-2 1.5H7.5a2 2 0 01-2-1.5L4 7z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 7V5a4 4 0 018 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v10m0 0l4-4m-4 4l-4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17v3h16v-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 4h14a2 2 0 012 2v11a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 10l-2 2 2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10l2 2-2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 12l-8 8-9-9V4h7l10 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 3v6c0 4.2-2.7 7.9-7 9-4.3-1.1-7-4.8-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 7v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
      <path
        d="M10 2h4l8 14-2 4H4L2 16 10 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
