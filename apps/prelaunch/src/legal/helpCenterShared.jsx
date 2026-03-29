import { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { resolveHelpCenterHeaderActions } from "./helpCenterData";
import "./helpCenter.css";

const HelpCenterThemeContext = createContext("consumer");

const HELP_CENTER_ICON_FILES = {
  consumer: {
    signin: "cliente/key-icon-cliente.png",
    terms: "cliente/terms-icon-cliente.png",
    privacy: "cliente/privacy-icon-cliente.png",
    verify: "cliente/verify-account-icon-cliente.png",
    redeem: "cliente/gift-promos-icon-cliente.png",
    delete: "cliente/delete-data-icon-cliente.png",
    points: "cliente/points-icon-cliente.png",
    business: "cliente/negocio-icon-cliente.png",
    support: "cliente/chat-support-icon-cliente.png",
    arrow: "ir-right-arrow-negocio.png",
  },
  business: {
    signin: "negocio/key-icon-negocio.png",
    terms: "negocio/terms-icon-negocio.png",
    privacy: "negocio/privacy-icon-negocio.png",
    verify: "negocio/verify-account-icon-negocio.png",
    redeem: "negocio/gift-promos-icon-negocio.png",
    delete: "negocio/delete-data-icon-negocio.png",
    points: "negocio/points-icon-negocio.png",
    business: "negocio/clientes-icon-negocio.png",
    support: "negocio/chat-support-icon-negocio.png",
    arrow: "ir-right-arrow-negocio.png",
  },
};

function helpCenterAsset(relativePath) {
  return `/assets/shared/help-center/${relativePath}`;
}

function useThemedHelpCenterAsset(key) {
  const theme = useContext(HelpCenterThemeContext);
  const relativePath =
    HELP_CENTER_ICON_FILES[theme]?.[key] ?? HELP_CENTER_ICON_FILES.business[key];
  return helpCenterAsset(relativePath);
}

function HelpCenterAssetIcon({ assetKey }) {
  const src = useThemedHelpCenterAsset(assetKey);
  return <img src={src} alt="" aria-hidden="true" />;
}

export function HelpCenterThemeProvider({ theme, children }) {
  return (
    <HelpCenterThemeContext.Provider value={theme}>{children}</HelpCenterThemeContext.Provider>
  );
}

export function HelpCenterLayout({
  sidebarItems,
  resourceItems = [],
  activeCategoryKey = null,
  content = null,
  basePath = "/ayuda/es",
  headerTitle = "Centro de Ayuda",
  theme = "consumer",
  headerActions = null,
}) {
  const activeCategory = activeCategoryKey
    ? sidebarItems.find((category) => category.key === activeCategoryKey) || null
    : null;
  const isDefaultScreen = !activeCategory && !content;
  const showCtas = isDefaultScreen;

  return (
    <HelpCenterThemeProvider theme={theme}>
      <main className={`help-center help-center--${theme}`} aria-label="Centro de Ayuda">
        <HelpCenterHeader
          basePath={basePath}
          headerTitle={headerTitle}
          headerActions={headerActions}
        />

        <section className="help-center__body">
          <div className="help-center__layout">
            <aside className="help-center__sidebar">
              <h1 className="help-center__sidebar-title">Categor\u00edas</h1>

              <div className="help-center__sidebar-panel">
                {sidebarItems.map((category) => (
                  <SidebarCategoryRow
                    key={category.key}
                    category={category}
                    isActive={category.key === activeCategoryKey}
                  />
                ))}
              </div>
            </aside>

            <section className="help-center__content">
              {activeCategory ? (
                <h2 className="help-center__content-title">{activeCategory.title}</h2>
              ) : null}

              {content ?? (
                <div
                  className={[
                    "help-center__resource-list",
                    isDefaultScreen ? "help-center__resource-list--overview" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {resourceItems.map((resource) => (
                    <HelpResourceCard key={resource.key} resource={resource} />
                  ))}
                </div>
              )}

              {showCtas ? <HelpCenterCtas /> : null}
            </section>
          </div>
        </section>
      </main>
    </HelpCenterThemeProvider>
  );
}

export function HelpCenterHeader({ basePath, headerTitle, headerActions, titleTo = basePath }) {
  const actions = resolveHelpCenterHeaderActions(
    headerActions ??
      [
        {
          key: "signup",
          label: "Crear cuenta",
          to: "/",
          className: "help-center__header-link help-center__header-link--ghost",
          devOnly: true,
        },
        {
          key: "login",
          label: "Ingresar",
          to: "/",
          className: "help-center__header-link help-center__header-link--solid",
          devOnly: true,
        },
      ],
  );

  return (
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
          {titleTo ? (
            <Link className="help-center__brand-support" to={titleTo}>
              {headerTitle}
            </Link>
          ) : (
            <span className="help-center__brand-support">{headerTitle}</span>
          )}
        </div>

        <nav className="help-center__header-actions" aria-label="Cuenta">
          {actions.map((action) => (
            <Link key={action.key} className={action.className} to={action.to}>
              {action.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SidebarCategoryRow({ category, isActive }) {
  const className = [
    "help-center__sidebar-link",
    isActive ? "help-center__sidebar-link--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={className} to={category.to}>
      <span>{category.title}</span>
      {isActive ? <ChevronRightIcon /> : null}
    </Link>
  );
}

function HelpResourceCard({ resource }) {
  const cardClassName = [
    "help-center__resource-card",
    resource.to ? "help-center__resource-card--link" : "help-center__resource-card--static",
  ].join(" ");

  const content = (
    <>
      <div className="help-center__resource-icon">
        {resource.Icon ? <resource.Icon /> : <HelpCenterAssetIcon assetKey={resource.iconKey} />}
      </div>

      <div className="help-center__resource-copy">
        <h2>{resource.title}</h2>
        <p>{resource.description}</p>
      </div>
    </>
  );

  if (resource.to) {
    return (
      <Link className={cardClassName} to={resource.to}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

export function HelpCenterCtas({ emailLabel = "Correo electr\u00f3nico" } = {}) {
  const theme = useContext(HelpCenterThemeContext);
  const businessTitle =
    theme === "business" ? "\u00bfEres un cliente?" : "\u00bfEres un Negocio o Empresa?";
  const businessLinkText =
    theme === "business"
      ? "Ir al Centro de Ayuda para Clientes"
      : "Ir al Centro de Ayuda para Empresas";
  const businessTarget = theme === "business" ? "/ayuda/es" : "/ayuda-negocios/es";

  return (
    <section className="help-center__cta-panel">
      <div className="help-center__business-card">
        <div className="help-center__business-copy">
          <div className="help-center__business-icon" aria-hidden="true">
            <BriefcaseIcon />
          </div>

          <div className="help-center__business-text">
            <h3>{businessTitle}</h3>
            <div className="help-center__business-action">
              <Link className="help-center__business-link-text" to={businessTarget}>
                {businessLinkText}
              </Link>
              <Link
                className="help-center__business-arrow-button"
                to={businessTarget}
                aria-label={businessLinkText}
              >
                <BusinessArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="help-center__support-card">
        <div className="help-center__support-copy">
          <div className="help-center__support-icon" aria-hidden="true">
            <ChatBubbleIcon />
          </div>

          <div className="help-center__support-text">
            <h3>\u00bfNo encontraste lo que buscabas?</h3>
            <div className="help-center__support-line">
              <p>
                Ve al <strong>Chat de Soporte</strong> por
              </p>

              <div className="help-center__support-actions">
                <Link
                  className="help-center__whatsapp-button"
                  to={`/soporte/abrir-ticket?origin=${theme === "business" ? "negocio" : "cliente"}&channel=whatsapp`}
                >
                  <WhatsAppIcon />
                  <span>Whatsapp</span>
                </Link>

                <Link
                  className="help-center__email-button"
                  to={`/soporte/abrir-ticket?origin=${theme === "business" ? "negocio" : "cliente"}&channel=email`}
                >
                  <MailSupportIcon />
                  <span>{emailLabel}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MailSupportIcon() {
  return <img src="/assets/fluent-color-mail-16.svg" alt="" aria-hidden="true" />;
}

function BriefcaseIcon() {
  return <HelpCenterAssetIcon assetKey="business" />;
}

function ChatBubbleIcon() {
  return <HelpCenterAssetIcon assetKey="support" />;
}

function BusinessArrowIcon() {
  return <HelpCenterAssetIcon assetKey="arrow" />;
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
