import { useId, useState } from "react";
import { Link } from "react-router-dom";
import {
  HelpCenterBrandLogo,
  HelpCenterCtas,
  HelpCenterThemeProvider,
  HelpCenterThemedAssetIcon,
} from "../helpCenterShared";
import { resolveHelpCenterHeaderActions } from "../helpCenterData";
import "../helpCenter.css";

export function HelpCenterMobileLayout({
  sidebarItems,
  resourceItems = [],
  activeCategoryKey = null,
  content = null,
  basePath = "/ayuda/es",
  headerTitle = "Centro de ayuda",
  theme = "consumer",
  headerActions = [],
  ctaProps = undefined,
  brandVariant = theme,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerId = useId();
  const activeCategory = activeCategoryKey
    ? sidebarItems.find((category) => category.key === activeCategoryKey) || null
    : null;
  const isDefaultScreen = !activeCategory && !content;
  const showCtas = isDefaultScreen;

  return (
    <HelpCenterThemeProvider theme={theme}>
      <main
        className={`help-center help-center--${theme} help-center-mobile help-center-mobile--${theme}`}
        aria-label="Centro de Ayuda"
      >
        <HelpCenterMobileHeader
          basePath={basePath}
          headerTitle={headerTitle}
          titleTo={basePath}
          headerActions={headerActions}
          brandVariant={brandVariant}
          drawerId={drawerId}
          drawerTitle={"Categor\u00edas"}
          drawerItems={sidebarItems}
          activeItemKey={activeCategoryKey}
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen((current) => !current)}
          onCloseMenu={() => setIsMenuOpen(false)}
        />

        <section className="help-center-mobile__body">
          <div className="help-center-mobile__main">
            <aside className="help-center-mobile__sidebar">
              <h2 className="help-center-mobile__sidebar-title">Categor\u00edas</h2>

              <div className="help-center-mobile__sidebar-panel">
                {sidebarItems.map((category) => (
                  <MobileSidebarCategoryRow
                    key={category.key}
                    category={category}
                    isActive={category.key === activeCategoryKey}
                  />
                ))}
              </div>
            </aside>

            <section className="help-center-mobile__content">
              {activeCategory ? (
                <h1 className="help-center-mobile__content-title">{activeCategory.title}</h1>
              ) : null}

              {content ?? (
                <div className="help-center-mobile__resource-list">
                  {resourceItems.map((resource) => (
                    <MobileHelpResourceCard key={resource.key} resource={resource} />
                  ))}
                </div>
              )}

              {showCtas ? <HelpCenterCtas {...ctaProps} /> : null}
            </section>
          </div>
        </section>

        <HelpCenterMobileFooter basePath={basePath} brandVariant={brandVariant} />
      </main>
    </HelpCenterThemeProvider>
  );
}

export function HelpCenterMobileHeader({
  basePath = "/ayuda/es",
  headerTitle = "Centro de ayuda",
  titleTo = basePath,
  headerActions = [],
  drawerActions = headerActions,
  brandVariant = "consumer",
  drawerId,
  drawerTitle = "Men\u00fa",
  drawerItems = [],
  activeItemKey = null,
  isMenuOpen = false,
  onToggleMenu,
  onCloseMenu,
}) {
  const resolvedHeaderActions = resolveHelpCenterHeaderActions(headerActions);
  const resolvedDrawerActions = resolveHelpCenterHeaderActions(drawerActions);

  return (
    <>
      <header className="help-center-mobile__header">
        <Link className="help-center-mobile__brand" to="/">
          <HelpCenterBrandLogo
            variant={brandVariant}
            className="help-center-mobile__brand-logo"
          />
        </Link>

        {titleTo ? (
          <Link className="help-center-mobile__header-title" to={titleTo}>
            {headerTitle}
          </Link>
        ) : (
          <span className="help-center-mobile__header-title">{headerTitle}</span>
        )}

        <div className="help-center-mobile__header-end">
          {resolvedHeaderActions.length ? (
            <nav className="help-center-mobile__header-actions" aria-label="Cuenta">
              {resolvedHeaderActions.map((action) => (
                <Link
                  key={action.key}
                  className={[
                    "help-center-mobile__header-action",
                    action.variant === "ghost"
                      ? "help-center-mobile__header-action--ghost"
                      : "help-center-mobile__header-action--primary",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  to={action.to}
                >
                  {action.label}
                </Link>
              ))}
            </nav>
          ) : null}

          {drawerItems.length ? (
            <button
              type="button"
              className="help-center-mobile__menu-button"
              aria-label="Abrir men\u00fa"
              aria-expanded={isMenuOpen}
              aria-controls={drawerId}
              onClick={onToggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
          ) : null}
        </div>
      </header>

      {drawerItems.length ? (
        <>
          <button
            type="button"
            aria-label="Cerrar men\u00fa"
            className={[
              "help-center-mobile__drawer-backdrop",
              isMenuOpen ? "help-center-mobile__drawer-backdrop--open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={onCloseMenu}
          />

          <aside
            id={drawerId}
            className={[
              "help-center-mobile__drawer",
              isMenuOpen ? "help-center-mobile__drawer--open" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={drawerTitle}
          >
            <div className="help-center-mobile__drawer-header">
              <h2>{drawerTitle}</h2>
              <button
                type="button"
                className="help-center-mobile__drawer-close"
                aria-label="Cerrar men\u00fa"
                onClick={onCloseMenu}
              >
                <span />
                <span />
              </button>
            </div>

            <nav className="help-center-mobile__drawer-nav">
              {drawerItems.map((item) => (
                <Link
                  key={item.key}
                  className={[
                    "help-center-mobile__drawer-link",
                    item.key === activeItemKey ? "help-center-mobile__drawer-link--active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  to={item.to}
                  onClick={onCloseMenu}
                >
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>

            {resolvedDrawerActions.length ? (
              <div className="help-center-mobile__drawer-actions">
                {resolvedDrawerActions.map((action) => (
                  <Link
                    key={action.key}
                    className={[
                      "help-center-mobile__drawer-action",
                      action.variant === "ghost"
                        ? "help-center-mobile__drawer-action--ghost"
                        : "help-center-mobile__drawer-action--primary",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    to={action.to}
                    onClick={onCloseMenu}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </aside>
        </>
      ) : null}
    </>
  );
}

function MobileHelpResourceCard({ resource }) {
  const className = [
    "help-center-mobile__resource-card",
    resource.to
      ? "help-center-mobile__resource-card--link"
      : "help-center-mobile__resource-card--static",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <div className="help-center-mobile__resource-icon">
        {resource.Icon ? (
          <resource.Icon />
        ) : (
          <HelpCenterThemedAssetIcon assetKey={resource.iconKey} />
        )}
      </div>

      <div className="help-center-mobile__resource-copy">
        <h2>{resource.title}</h2>
        <p>{resource.description}</p>
      </div>
    </>
  );

  if (resource.to) {
    return (
      <Link className={className} to={resource.to}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}

function MobileSidebarCategoryRow({ category, isActive }) {
  const className = [
    "help-center__sidebar-link",
    "help-center-mobile__sidebar-link",
    isActive ? "help-center__sidebar-link--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={className} to={category.to}>
      <span>{category.title}</span>
    </Link>
  );
}

export function HelpCenterMobileFooter({ basePath, brandVariant = "consumer" }) {
  return (
    <footer className="help-center-mobile__footer">
      <div className="help-center-mobile__footer-about">
        <HelpCenterBrandLogo
          variant={brandVariant}
          className="help-center-mobile__footer-logo"
        />

        <p className="help-center-mobile__footer-about-copy">
          {"Cat\u00e1logo de promociones y sistema de recompensas por canjearlas y referir."}
        </p>
      </div>

      <div className="help-center-mobile__footer-legal">
        <div className="help-center-mobile__footer-legal-links">
          <Link to={`${basePath}/articulo/terminos`}>{"T\u00e9rminos"}</Link>
          <span>-</span>
          <Link to={`${basePath}/articulo/privacidad`}>Privacidad</Link>
        </div>

        <div className="help-center-mobile__footer-copyright">
          {"\u00a9 2026 GoPlip. Todos los derechos reservados."}
        </div>
      </div>
    </footer>
  );
}
