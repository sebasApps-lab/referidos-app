import { Link } from "react-router-dom";
import { scrollToSection } from "../../scrollToSection";
import { navigationLinks } from "../desktopWaitlistLandingContent";

export default function DesktopNavigationHeader({ onBusinessClick }) {
  function handleScroll(event, targetId) {
    event.preventDefault();
    scrollToSection(targetId);
  }

  return (
    <header className="figma-prototype__nav">
      <div className="figma-prototype__nav-brand">
        <div className="figma-prototype__nav-brand-row">
          <span className="figma-prototype__nav-brand-main">REFERIDOS</span>
          <span className="figma-prototype__nav-brand-accent">APP</span>
        </div>
        <span className="figma-prototype__nav-brand-tag">Acceso anticipado</span>
      </div>

      <nav className="figma-prototype__nav-links" aria-label="Principal">
        {navigationLinks.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              to={link.to}
              className="figma-prototype__nav-link figma-prototype__nav-link--interactive"
            >
              {link.label}
            </Link>
          ) : link.targetId ? (
            <a
              key={link.label}
              href={`#${link.targetId}`}
              className="figma-prototype__nav-link figma-prototype__nav-link--interactive"
              onClick={(event) => handleScroll(event, link.targetId)}
            >
              {link.label}
            </a>
          ) : link.actionId === "business-interest-modal" ? (
            <button
              key={link.label}
              type="button"
              className="figma-prototype__nav-link figma-prototype__nav-link--interactive"
              onClick={onBusinessClick}
            >
              {link.label}
            </button>
          ) : (
            <span
              key={link.label}
              className="figma-prototype__nav-link figma-prototype__nav-link--placeholder"
            >
              {link.label}
            </span>
          ),
        )}
      </nav>

      <button type="button" className="figma-prototype__nav-menu-button" aria-label="Abrir men\u00fa">
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
      </button>
    </header>
  );
}
