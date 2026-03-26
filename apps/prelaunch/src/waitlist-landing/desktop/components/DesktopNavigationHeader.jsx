import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../scrollToSection";
import { navigationLinks } from "../desktopWaitlistLandingContent";

export default function DesktopNavigationHeader({ onBusinessClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  function handleScroll(event, targetId) {
    event.preventDefault();
    scrollToSection(targetId);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function renderNavItem(link, className) {
    if (link.to) {
      return (
        <Link
          key={link.label}
          to={link.to}
          className={className}
          onClick={() => setIsMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    }

    if (link.targetId) {
      return (
        <a
          key={link.label}
          href={`#${link.targetId}`}
          className={className}
          onClick={(event) => handleScroll(event, link.targetId)}
        >
          {link.label}
        </a>
      );
    }

    if (link.actionId === "business-interest-modal") {
      return (
        <button
          key={link.label}
          type="button"
          className={className}
          onClick={() => {
            setIsMenuOpen(false);
            onBusinessClick?.();
          }}
        >
          {link.label}
        </button>
      );
    }

    return (
      <span key={link.label} className={`${className} figma-prototype__nav-link--placeholder`}>
        {link.label}
      </span>
    );
  }

  return (
    <header
      ref={headerRef}
      className={`figma-prototype__nav ${isMenuOpen ? "figma-prototype__nav--menu-open" : ""}`}
    >
      <div className="figma-prototype__nav-brand">
        <div className="figma-prototype__nav-brand-row">
          <span className="figma-prototype__nav-brand-main">REFERIDOS</span>
          <span className="figma-prototype__nav-brand-accent">APP</span>
        </div>
        <span className="figma-prototype__nav-brand-tag">Acceso anticipado</span>
      </div>

      <nav className="figma-prototype__nav-links" aria-label="Principal">
        {navigationLinks.map((link) =>
          renderNavItem(link, "figma-prototype__nav-link figma-prototype__nav-link--interactive"),
        )}
      </nav>

      <button
        type="button"
        className="figma-prototype__nav-menu-button"
        aria-label={isMenuOpen ? "Cerrar men\u00fa" : "Abrir men\u00fa"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
      </button>

      <nav
        className={`figma-prototype__nav-drawer ${isMenuOpen ? "figma-prototype__nav-drawer--open" : ""}`}
        aria-label="Men\u00fa principal compacto"
      >
        {navigationLinks.map((link) =>
          renderNavItem(
            link,
            "figma-prototype__nav-drawer-link figma-prototype__nav-link--interactive",
          ),
        )}
      </nav>
    </header>
  );
}
