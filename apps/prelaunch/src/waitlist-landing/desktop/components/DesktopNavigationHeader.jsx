import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../scrollToSection";
import { navigationLinks } from "../desktopWaitlistLandingContent";

export default function DesktopNavigationHeader({ onBusinessClick, onLinkClick }) {
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
          onClick={() => {
            setIsMenuOpen(false);
            onLinkClick?.(link);
          }}
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
          onClick={(event) => {
            onLinkClick?.(link);
            handleScroll(event, link.targetId);
          }}
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
      <div className="figma-prototype__nav-brand figma-prototype__entry-edge-left">
        <div className="figma-prototype__nav-brand-row">
          <img
            src="/assets/logo/go-plip-white-lila.svg"
            alt="Go Plip"
            className="figma-prototype__nav-brand-logo"
          />
          <span className="figma-prototype__nav-brand-tag">
            <span>Acceso</span>
            <span>Anticipado</span>
          </span>
        </div>
      </div>

      <nav
        className="figma-prototype__nav-links figma-prototype__entry-edge-right figma-prototype__entry-delay-1"
        aria-label="Principal"
      >
        {navigationLinks.map((link) =>
          renderNavItem(link, "figma-prototype__nav-link figma-prototype__nav-link--interactive"),
        )}
      </nav>

      <button
        type="button"
        className="figma-prototype__nav-menu-button"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
      </button>

      <nav
        className={`figma-prototype__nav-drawer ${isMenuOpen ? "figma-prototype__nav-drawer--open" : ""}`}
        aria-label="Menú principal compacto"
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
