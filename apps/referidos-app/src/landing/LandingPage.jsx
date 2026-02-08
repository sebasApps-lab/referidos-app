import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const HERO_METRICS = [
  { label: "Clientes activos", value: "+20k" },
  { label: "Negocios aliados", value: "+1.2k" },
  { label: "Canjes mensuales", value: "+95k" },
];

const HOW_STEPS = [
  {
    title: "Escanea un QR",
    description: "Cada visita suma puntos y valida tu canje en segundos.",
    Icon: QrIcon,
  },
  {
    title: "Activa grupos",
    description: "Invita a tu gente favorita y multiplica tus beneficios.",
    Icon: GroupIcon,
  },
  {
    title: "Gana y canjea",
    description: "Tus puntos se convierten en promociones reales.",
    Icon: PointsIcon,
  },
];

const ROLE_STEPS = {
  cliente: [
    "Descarga la app y crea tu cuenta en 1 minuto.",
    "Escanea en tu negocio favorito y suma puntos al instante.",
    "Comparte tu grupo y canjea promociones exclusivas.",
  ],
  negocio: [
    "Registra tu negocio y verifica tu cuenta.",
    "Crea promociones, QR y reglas de canje personalizadas.",
    "Mide resultados en tiempo real y fideliza clientes.",
  ],
};

const ROLE_BENEFITS = [
  {
    title: "Clientes",
    highlight: "Ahorros reales en cada visita",
    bullets: [
      "Puntos acumulados que se ven al instante.",
      "Grupos para compartir beneficios con tu gente.",
      "Promos verificadas y sin letras pequenas.",
    ],
  },
  {
    title: "Negocios",
    highlight: "Fideliza y vende mas",
    bullets: [
      "Control total sobre tus promociones.",
      "Canjes rapidos con QR y validacion segura.",
      "Panel para seguir crecimiento y recurrencia.",
    ],
  },
];

const TRUST_ITEMS = [
  {
    title: "Verificacion activa",
    description: "Negocios y usuarios revisados para evitar fraude.",
    Icon: ShieldIcon,
  },
  {
    title: "Moderacion continua",
    description: "Promos claras, sin engaños ni ruido.",
    Icon: CheckIcon,
  },
  {
    title: "Soporte humano",
    description: "Un equipo listo para ayudarte cuando lo necesites.",
    Icon: SupportIcon,
  },
];

const FAQ_ITEMS = [
  {
    question: "Cuanto cuesta usar Referidos?",
    answer: "La app es gratis para clientes. Los negocios eligen su plan segun sus objetivos.",
  },
  {
    question: "Necesito internet para usarla?",
    answer: "Solo necesitas conexion para registrar y canjear puntos.",
  },
  {
    question: "Puedo cambiarme de rol?",
    answer: "Si. Puedes registrar un negocio desde tu cuenta cuando quieras.",
  },
  {
    question: "Que pasa si pierdo mis puntos?",
    answer: "Tus puntos quedan respaldados en tu cuenta, no en tu telefono.",
  },
  {
    question: "Como se verifican los negocios?",
    answer: "Validamos identidad, ubicacion y reglas de canje antes de publicar.",
  },
];

export default function LandingPage() {
  const [role, setRole] = useState("cliente");
  const location = useLocation();

  const meta = useMemo(
    () => ({
      title: "Referidos | Promociones reales con QR, grupos y puntos",
      description:
        "Gana y canjea promociones con QR. Crea grupos, suma puntos y haz que cada visita cuente. Hecho para clientes y negocios.",
      ogImage: `${window.location.origin}/screenshots/desktop-1.png`,
    }),
    []
  );

  useEffect(() => {
    const url = `${window.location.origin}${location.pathname}`;
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
  }, [location.pathname, meta]);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#FFF7ED] text-slate-900"
      style={{
        fontFamily: '"Space Grotesk", "Sora", "Trebuchet MS", sans-serif',
      }}
    >
      <style>{`
        @keyframes floaty {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        .floaty { animation: floaty 8s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .glow-pulse { animation: glowPulse 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .floaty, .fade-up, .glow-pulse { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 right-10 h-72 w-72 rounded-full blur-[120px] glow-pulse"
          style={{ background: "radial-gradient(circle, #FDBA74, #FB7185)" }}
        />
        <div
          className="absolute bottom-0 left-0 h-72 w-72 rounded-full blur-[140px] glow-pulse"
          style={{ background: "radial-gradient(circle, #38BDF8, #A78BFA)" }}
        />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
        <div className="text-lg font-semibold tracking-tight">
          Referidos
          <span className="ml-2 rounded-full bg-[#111827] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
            beta
          </span>
        </div>
        <div className="hidden items-center gap-3 text-sm text-slate-600 md:flex">
          <span>QR</span>
          <span>Grupos</span>
          <span>Puntos</span>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-12 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#B45309] shadow-sm">
            Promos que se pueden tocar
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
            Convierte cada visita en
            <span className="block text-[#F97316]">puntos reales</span>
            con QR, grupos y recompensas claras.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-700 md:text-lg">
            Referidos es la app que conecta negocios y clientes con promociones
            transparentes. Escanea, suma puntos y canjea beneficios sin friccion.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/auth"
              className="rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              Empezar ahora
            </a>
            <a
              href="#como-empezar"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-transform hover:-translate-y-0.5"
            >
              Ver como funciona
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="flex items-center gap-2">
                <span className="text-lg font-semibold text-slate-900">
                  {metric.value}
                </span>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto max-w-md">
            <div className="floaty absolute -top-6 left-10 h-16 w-16 rounded-2xl bg-white shadow-xl" />
            <div className="floaty absolute -bottom-10 right-6 h-20 w-20 rounded-full bg-[#0EA5E9] opacity-80 blur-xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-4 shadow-2xl backdrop-blur">
              <img
                src="/screenshots/mobile-1.png"
                alt="Vista previa de la app"
                loading="lazy"
                className="w-full rounded-2xl"
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {["QR rapido", "Grupos", "Canjes"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl bg-[#0F172A] px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-xl backdrop-blur">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Descargas listas para cada dispositivo
          </h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Instala en tu telefono o escritorio. La experiencia PWA funciona en
            segundos.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StoreButton
              href="https://play.google.com/store"
              label="Descargar Android"
              Icon={AndroidIcon}
            />
            <StoreButton
              href="https://apps.apple.com/"
              label="Descargar Apple"
              Icon={AppleIcon}
            />
            <StoreButton
              href="https://www.microsoft.com/store/apps"
              label="Descargar Windows"
              Icon={WindowsIcon}
            />
          </div>
        </div>
      </section>

      <section id="como-empezar" className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Como empezar en minutos
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Dos caminos claros para que todo sea simple desde el primer dia.
            </p>
          </div>
          <div className="flex rounded-full border border-slate-200 bg-white p-1 text-sm font-semibold">
            {["cliente", "negocio"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRole(tab)}
                className={`rounded-full px-5 py-2 transition-all ${
                  role === tab
                    ? "bg-[#0F172A] text-white shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Soy {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ROLE_STEPS[role].map((step, idx) => (
            <div
              key={step}
              className="fade-up rounded-[28px] border border-white/70 bg-white/80 p-6 text-sm text-slate-700 shadow-lg"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#F97316]">
                Paso {idx + 1}
              </div>
              <p className="text-base text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {HOW_STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-[30px] border border-white/70 bg-white/80 p-7 shadow-xl"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F172A] text-white">
                <step.Icon />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {ROLE_BENEFITS.map((lane) => (
            <div
              key={lane.title}
              className="rounded-[32px] border border-white/70 bg-[#0F172A] p-8 text-white shadow-2xl"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                {lane.title}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{lane.highlight}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {lane.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-[#F97316]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="rounded-[40px] border border-white/70 bg-white/80 p-8 shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                QR, grupos y puntos sin friccion
              </h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Tres elementos simples que hacen que la experiencia fluya.
              </p>
            </div>
            <img
              src="/screenshots/desktop-1.png"
              alt="Panel de Referidos"
              loading="lazy"
              className="w-full max-w-md rounded-2xl border border-white/80 shadow-lg md:w-80"
            />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {HOW_STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600"
              >
                <div className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                  <step.Icon />
                  {step.title}
                </div>
                {step.description}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-lg"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F97316] text-white">
                <item.Icon />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-xl">
          <h2 className="text-3xl font-semibold text-slate-900">
            Preguntas frecuentes
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700"
              >
                <summary className="cursor-pointer text-base font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Referidos</span>
          <div className="flex flex-wrap gap-4">
            <a href="/legal/es/terms" className="hover:text-slate-700">
              Terminos
            </a>
            <a href="/legal/es/privacy" className="hover:text-slate-700">
              Privacidad
            </a>
            <a href="/legal/es/data-deletion" className="hover:text-slate-700">
              Eliminacion de datos
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StoreButton({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-transform hover:-translate-y-0.5"
    >
      <Icon />
      {label}
    </a>
  );
}

function QrIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4h6v6H4V4zm0 10h6v6H4v-6zm10-10h6v6h-6V4zm0 10h3v3h-3v-3zm3 3h3v3h-3v-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h10v-2c0-1.1.9-2.08 2.2-2.9C10.74 13.42 9.36 13 8 13zm8 0c-.72 0-1.5.08-2.3.24 1.78.9 3.3 2.08 3.3 3.76v2h7v-2c0-2.66-5.33-4-8-4z"
        fill="currentColor"
      />
    </svg>
  );
}

function PointsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l2.3 5.3L20 8l-4.4 3.6L16.8 18 12 15.3 7.2 18l1.2-6.4L4 8l5.7-.7L12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a7 7 0 00-7 7v4a3 3 0 003 3h1v-6H6v-1a6 6 0 0112 0v1h-3v6h1a3 3 0 003-3v-4a7 7 0 00-7-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 8h10v8a2 2 0 01-2 2H9a2 2 0 01-2-2V8z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 6l-1.5-2M15 6l1.5-2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="11" r="0.8" fill="currentColor" />
      <circle cx="14" cy="11" r="0.8" fill="currentColor" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M16.4 2c0 1.1-.4 2.1-1.1 2.9-.7.8-1.9 1.4-3 1.3-.1-1 .4-2.1 1-2.8.7-.8 2-1.4 3.1-1.4z"
        fill="currentColor"
      />
      <path
        d="M20.2 17c-.5 1.1-.8 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.8-.9-2 0-2.5.9-3.8.9-1.6 0-2.8-1.6-3.7-3-.7-1.1-1.2-2.4-1.2-3.8 0-2.3 1.2-3.5 2.9-3.5 1.4 0 2.4.9 3.7.9 1.2 0 2.4-.9 3.9-.9 1.4 0 2.6.7 3.4 1.8-1.8 1-1.5 3.8 1.8 4.8z"
        fill="currentColor"
      />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 5l8-1v8H3V5zm0 7h8v8l-8-1v-7zm10-8l8-1v9h-8V4zm0 9h8v9l-8-1v-8z"
        fill="currentColor"
      />
    </svg>
  );
}
