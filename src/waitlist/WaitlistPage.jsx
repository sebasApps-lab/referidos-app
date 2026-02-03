// src/waitlist/WaitlistPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { submitWaitlistSignup } from "./waitlistApi";

const FLOW_TARGET_ID = "waitlist-flow";

const HOW_CARDS = [
  "Explora promos",
  "Refiere y gana",
  "Negocios crecen",
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
  const [mode, setMode] = useState(() => normalizeMode(searchParams.get("mode")));
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
    const lockWidth = 840;
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
    const nextMode = normalizeMode(searchParams.get("mode"));
    if (nextMode !== mode) {
      setMode(nextMode);
    }
  }, [searchParams, mode]);

  const handleModeChange = (nextMode) => {
    const normalized = normalizeMode(nextMode);
    if (normalized !== mode) {
      setMode(normalized);
    }
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("mode", normalized);
    setSearchParams(nextParams, { replace: true });
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

  return (
      <div
        className="desktop-min relative min-h-screen bg-[#F7F4FF] text-slate-900"
        style={{
          fontFamily: '"Space Grotesk", "Sora", "Trebuchet MS", sans-serif',
        }}
      >
      <style>{`
        :root {
          --brand-purple: #5E30A5;
          --brand-yellow: #FFC21C;
          --ink: #1F1235;
          --layout-min: 840px;
          --layout-max: 1440px;
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
        .hero-split-bg {
          background: var(--brand-purple);
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
          @media (max-width: 1080px) {
            .hero-subline {
              white-space: normal;
            }
            .hero-body {
              padding-right: 2rem;
            }
          }
          @media (max-width: 950px) {
            .hero-right {
              padding-left: 1.5rem;
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
        }
        [data-desktop-lock="true"] .hero-title {
          font-size: 3.75rem;
          line-height: 1.1;
        }
        [data-desktop-lock="true"] .hero-title span {
          font-size: 3.75rem;
          line-height: 1.1;
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
        @media (prefers-reduced-motion: reduce) {
          .floaty, .fade-up, .soft-glow { animation: none; }
        }
      `}</style>

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
          <div className="hero-bg-fixed pointer-events-none absolute inset-x-0 top-0 h-[800px] md:h-[960px]">
            <div className="absolute inset-0 bg-white" />
            <div className="hero-split-bg absolute inset-0" />
          </div>

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
                  <div className="rounded-full bg-white/80 px-3 py-1 shadow">Periodo de prueba</div>
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

                {mode === "cliente" ? (
                  <div className="mt-6 w-full max-w-[360px] rounded-[28px] border-0 bg-transparent pb-6 pl-0 pr-0 pt-6 text-right text-white shadow-none md:ml-auto">
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
                ) : (
                  <div className="mt-2 w-full max-w-[360px] border-0 bg-transparent pb-6 pl-0 pr-0 pt-6 text-right text-white shadow-none md:ml-auto">
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
                              isPurple ? "bg-[var(--brand-purple)]" : "bg-white"
                            }`}
                          >
                            <div
                              className="text-3xl font-semibold leading-none text-transparent md:text-4xl"
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
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
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
                    <div className="mt-6 flex flex-col items-end gap-2">
                      <a
                        href="/app"
                        onClick={() => trackEvent("open_pwa_click")}
                        className="w-4/5 rounded-2xl border border-white/70 bg-white px-6 pb-1 pt-2 text-center text-sm font-semibold leading-tight text-black shadow-md shadow-purple-900/20 transition-transform hover:-translate-y-0.5 hover:border-[var(--brand-yellow)]/80 hover:bg-[var(--brand-yellow)]"
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
                )}
              </div>
            </div>

            <div className="mt-12 w-full">
              <div className="relative w-full">
                <div className="floaty absolute -top-6 left-6 h-16 w-16 rounded-2xl bg-white shadow-xl" />
                <div className="floaty absolute -bottom-10 right-6 h-20 w-20 rounded-full bg-[var(--brand-yellow)]/70 blur-xl" />
                <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-5 shadow-2xl backdrop-blur">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Promo destacada
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-[var(--ink)]">2x1 en cafés</p>
                          <p className="text-sm text-slate-600">Canjea con QR</p>
                        </div>
                        <span className="rounded-full bg-[var(--brand-yellow)] px-3 py-1 text-xs font-semibold text-[#5A3A00]">
                          Liga Oro
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-[var(--brand-purple)]/90 p-4 text-white shadow">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Puntos</p>
                        <p className="mt-2 text-xl font-semibold">+120</p>
                        <p className="text-xs text-white/70">Por referir</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 text-slate-700 shadow">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Grupo</p>
                        <p className="mt-2 text-lg font-semibold text-[var(--ink)]">Activo</p>
                        <p className="text-xs text-slate-500">5 personas</p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-dashed border-[var(--brand-purple)]/40 bg-[var(--brand-purple)]/10 p-4 text-sm text-[var(--brand-purple)]">
                      Beneficios acumulados listos para canje.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section id={FLOW_TARGET_ID} className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--ink)] md:text-3xl">
                  Elige tu camino
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Dos rutas claras. Una sola experiencia.
                </p>
              </div>
            </div>

            <div className={`mt-6 grid gap-6 ${mode === "cliente" ? "md:grid-cols-1" : "md:grid-cols-1"}`}>
              {mode === "cliente" ? (
                <>
                  <div className="fade-up rounded-[28px] border border-slate-100 bg-[#FFF7E5] p-6 text-sm text-slate-700 shadow-sm">
                    <h4 className="text-lg font-semibold text-[var(--ink)]">
                      Beneficios visibles desde el día uno
                    </h4>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        Promos reales y fáciles de canjear.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        Beneficios por referir a tu gente.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                        Cupos limitados para acceder primero.
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="grid gap-4 md:grid-cols-3">
            {HOW_CARDS.map((item) => (
              <div
                key={item}
                className="rounded-[28px] border border-white/70 bg-white/80 p-6 text-center text-sm font-semibold text-[var(--ink)] shadow-lg"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="grid gap-6 md:grid-cols-[0.9fr,1.1fr]">
            <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-yellow)]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B4B00]">
                ALPHA / PRELAUNCH
              </span>
              <h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">
                La beta llegará pronto
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                La lista de espera tiene cupos. Te avisaremos por email cuando se abra.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[var(--ink)]">FAQ rápido</h3>
              <div className="mt-4 space-y-3">
                {FAQ_ITEMS.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm"
                  >
                    <p className="font-semibold text-[var(--ink)]">{item.question}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Referidos</span>
          <div className="flex flex-wrap gap-4">
            <a href="/privacy" className="hover:text-slate-700">Privacidad</a>
            <a href="/terms" className="hover:text-slate-700">Términos</a>
            <a href="mailto:soporte@referidos.app" className="hover:text-slate-700">Contacto</a>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em]">ALPHA v0.8</span>
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
