import { scrollToSection } from "../../scrollToSection";
import { navigationLinks } from "../desktopWaitlistLandingContent";

export default function DesktopNavigationHeader() {
  function handleScroll(event, targetId) {
    event.preventDefault();
    scrollToSection(targetId);
  }

  return (
    <header className="business-landing__nav">
      <div className="business-landing__nav-brand">
        <div className="business-landing__nav-brand-row">
          <span className="business-landing__nav-brand-main">REFERIDOS</span>
          <span className="business-landing__nav-brand-accent">APP</span>
        </div>
        <span className="business-landing__nav-brand-tag">Acceso anticipado</span>
      </div>

      <nav className="business-landing__nav-links" aria-label="Principal">
        {navigationLinks.map((link) =>
          link.targetId ? (
            <a
              key={link.label}
              href={`#${link.targetId}`}
              className="business-landing__nav-link business-landing__nav-link--interactive"
              onClick={(event) => handleScroll(event, link.targetId)}
            >
              {link.label}
            </a>
          ) : (
            <span
              key={link.label}
              className="business-landing__nav-link business-landing__nav-link--placeholder"
            >
              {link.label}
            </span>
          ),
        )}
      </nav>

      <button type="button" className="business-landing__nav-menu-button" aria-label="Abrir menú">
        <span className="business-landing__nav-menu-line" />
        <span className="business-landing__nav-menu-line" />
        <span className="business-landing__nav-menu-line" />
      </button>
    </header>
  );
}

