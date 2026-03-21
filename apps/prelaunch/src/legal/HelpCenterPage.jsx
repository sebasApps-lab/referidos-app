import { Link } from "react-router-dom";
import "./helpCenter.css";

const sidebarCategories = [
  {
    key: "legal",
    title: "Legal",
    to: "/ayuda",
    active: true,
  },
  {
    key: "signin",
    title: "Cómo iniciar sesión",
  },
  {
    key: "verify",
    title: "Verificar cuenta",
  },
  {
    key: "redeem",
    title: "Canjear promos",
  },
  {
    key: "benefits",
    title: "Beneficios",
  },
];

const legalResources = [
  {
    key: "terms",
    title: "Términos y Condiciones",
    description: "Consulta nuestras normas y reglas.",
    to: "/legal/es/terminos",
    Icon: TermsIcon,
  },
  {
    key: "privacy",
    title: "Política de Privacidad",
    description: "Lee cómo protegemos tu privacidad.",
    to: "/legal/es/privacidad",
    Icon: PrivacyIcon,
  },
  {
    key: "delete",
    title: "Borrar mis datos",
    description: "Solicita la eliminación de tu información.",
    to: "/legal/es/borrar-datos",
    Icon: DeleteIcon,
  },
];

export default function HelpCenterPage() {
  return (
    <main className="help-center" aria-label="Centro de Ayuda">
      <header className="help-center__header">
        <div className="help-center__header-inner">
          <div className="help-center__brand-wrap">
            <Link className="help-center__brand" to="/">
              <span className="help-center__brand-main">REFERIDOS</span>
              <span className="help-center__brand-accent">APP</span>
            </Link>
            <span className="help-center__brand-separator" aria-hidden="true">
              |
            </span>
            <span className="help-center__brand-support">Centro de Ayuda</span>
          </div>

          <nav className="help-center__header-actions" aria-label="Cuenta">
            <Link className="help-center__header-link help-center__header-link--ghost" to="/">
              Crear cuenta
            </Link>
            <Link className="help-center__header-link help-center__header-link--solid" to="/">
              Ingresar
            </Link>
          </nav>
        </div>
      </header>

      <section className="help-center__body">
        <div className="help-center__layout">
          <aside className="help-center__sidebar">
            <h1 className="help-center__sidebar-title">Categorías</h1>

            <div className="help-center__sidebar-panel">
              {sidebarCategories.map((category) =>
                category.to ? (
                  <Link
                    key={category.key}
                    className={`help-center__sidebar-link${
                      category.active ? " help-center__sidebar-link--active" : ""
                    }`}
                    to={category.to}
                  >
                    <span>{category.title}</span>
                    {category.active ? <ChevronRightIcon /> : null}
                  </Link>
                ) : (
                  <button
                    key={category.key}
                    type="button"
                    className="help-center__sidebar-link help-center__sidebar-link--mock"
                  >
                    <span>{category.title}</span>
                  </button>
                ),
              )}
            </div>
          </aside>

          <section className="help-center__content">
            <div className="help-center__resource-list">
              {legalResources.map((category) => {
                const Icon = category.Icon;

                return (
                  <Link key={category.key} className="help-center__resource-card" to={category.to}>
                    <div className="help-center__resource-icon">
                      <Icon />
                    </div>

                    <div className="help-center__resource-copy">
                      <h2>{category.title}</h2>
                      <p>{category.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <section className="help-center__cta-panel">
              <div className="help-center__business-card">
                <div className="help-center__business-copy">
                  <div className="help-center__business-icon" aria-hidden="true">
                    <BriefcaseIcon />
                  </div>

                  <div className="help-center__business-text">
                    <h3>¿Eres un Negocio o Empresa?</h3>
                    <button type="button" className="help-center__business-button">
                      <span>Ir al Centro de Ayuda para Empresas</span>
                      <ChevronRightIcon />
                    </button>
                  </div>
                </div>
              </div>

              <div className="help-center__support-card">
                <div className="help-center__support-copy">
                  <div className="help-center__support-icon" aria-hidden="true">
                    <ChatBubbleIcon />
                  </div>

                  <div className="help-center__support-text">
                    <h3>¿No encontraste lo que buscabas?</h3>
                    <p>
                      Ve al <strong>Chat de Soporte</strong> por
                    </p>
                  </div>
                </div>

                <Link className="help-center__whatsapp-button" to="/soporte-chat">
                  <WhatsAppIcon />
                  <span>Whatsapp</span>
                </Link>
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}

function TermsIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="help-terms-gradient" x1="10" x2="54" y1="6" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dac8ff" />
          <stop offset="1" stopColor="#9c58f6" />
        </linearGradient>
      </defs>
      <path d="M18 8h21l13 13v26c0 4.418-3.582 8-8 8H18c-4.418 0-8-3.582-8-8V16c0-4.418 3.582-8 8-8Z" fill="url(#help-terms-gradient)" opacity="0.18" />
      <path d="M20 8h19l13 13v24c0 4.418-3.582 8-8 8H20c-4.418 0-8-3.582-8-8V16c0-4.418 3.582-8 8-8Z" fill="url(#help-terms-gradient)" />
      <path d="M39 8v10c0 1.657 1.343 3 3 3h10" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
      <path d="M23 26h16M23 33h16M23 40h10" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3.5" opacity="0.92" />
      <circle cx="47" cy="46" r="9" fill="#8c47f3" />
      <path d="m43.2 46.3 2.3 2.4 5.2-5.7" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
    </svg>
  );
}

function PrivacyIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="help-privacy-gradient" x1="8" x2="55" y1="10" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e0cbff" />
          <stop offset="1" stopColor="#a45df8" />
        </linearGradient>
      </defs>
      <path d="M32 8c6.445 6.1 14.792 8.39 19 8.96V31c0 12.4-9.03 21.52-19 24.92C22.03 52.52 13 43.4 13 31V16.96c4.208-.57 12.555-2.86 19-8.96Z" fill="url(#help-privacy-gradient)" />
      <path d="m24.4 32.5 4.4 4.5 11-12" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <circle cx="47" cy="46" r="9" fill="#8c47f3" />
      <path d="m43.2 46.3 2.3 2.4 5.2-5.7" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="help-delete-gradient" x1="8" x2="56" y1="10" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e3ccff" />
          <stop offset="1" stopColor="#a15af7" />
        </linearGradient>
      </defs>
      <path d="M22 14h20l-1.6 34.3a6 6 0 0 1-6 5.7h-4.8a6 6 0 0 1-6-5.7L22 14Z" fill="url(#help-delete-gradient)" />
      <path d="M18 14h28M26 14V9h12v5M27 24v18M37 24v18" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <circle cx="46" cy="46" r="9" fill="#8c47f3" />
      <path d="m42.2 46.3 2.3 2.4 5.2-5.7" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="help-briefcase-gradient" x1="6" x2="58" y1="8" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="1" stopColor="#d9b8ff" />
        </linearGradient>
      </defs>
      <path d="M17 18h30c4.418 0 8 3.582 8 8v20c0 4.418-3.582 8-8 8H17c-4.418 0-8-3.582-8-8V26c0-4.418 3.582-8 8-8Z" fill="url(#help-briefcase-gradient)" opacity="0.92" />
      <path d="M24 18v-3a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v3" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <path d="M9 31h46M28 31v7h8v-7" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="help-chat-gradient" x1="10" x2="56" y1="8" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d8e2ff" />
          <stop offset="1" stopColor="#6994ff" />
        </linearGradient>
      </defs>
      <path d="M16 12h32c6.627 0 12 5.373 12 12v13c0 6.627-5.373 12-12 12H31l-11 9v-9h-4c-6.627 0-12-5.373-12-12V24c0-6.627 5.373-12 12-12Z" fill="url(#help-chat-gradient)" />
      <path d="M21 27h22M21 35h17" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="4" opacity="0.92" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 4.93A9.94 9.94 0 0 0 12.05 2C6.56 2 2.1 6.46 2.1 11.95c0 1.75.46 3.46 1.33 4.97L2 22l5.24-1.38a9.9 9.9 0 0 0 4.8 1.22h.01c5.49 0 9.95-4.46 9.95-9.95a9.87 9.87 0 0 0-2.89-6.96ZM12.05 20.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.68-8.22 8.22-8.22a8.17 8.17 0 0 1 5.82 2.41 8.15 8.15 0 0 1 2.4 5.81c0 4.54-3.68 8.22-8.22 8.22Zm4.51-6.17c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.57.12-.17.25-.65.8-.8.96-.15.17-.29.19-.54.07-.25-.13-1.05-.39-2.01-1.24-.74-.66-1.25-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.38-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.38-.78-1.89-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.41 1.03 2.58c.12.17 1.77 2.71 4.29 3.8.6.26 1.08.42 1.45.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z"
      />
    </svg>
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
        strokeWidth="2.5"
      />
    </svg>
  );
}
