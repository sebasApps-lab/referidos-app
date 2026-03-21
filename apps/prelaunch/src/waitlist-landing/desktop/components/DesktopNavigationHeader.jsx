import { navigationLinks } from "../desktopWaitlistLandingContent";

export default function DesktopNavigationHeader() {
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
        {navigationLinks.map((link) => (
          <a key={link} href="#!" onClick={(event) => event.preventDefault()}>
            {link}
          </a>
        ))}
      </nav>

      <button type="button" className="figma-prototype__nav-menu-button" aria-label="Abrir menú">
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
        <span className="figma-prototype__nav-menu-line" />
      </button>
    </header>
  );
}
