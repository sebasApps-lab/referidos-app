import { scrollToSection } from "../../scrollToSection";
import MobileHeroBackground from "../components/MobileHeroBackground";
import MobilePhoneSection from "../components/MobilePhoneSection";

export default function MobileHeroSection({
  heroClipId,
  heroFilterId,
  isTabletHeroLayout,
  phoneGlowFilterId,
}) {
  return (
    <div className="mobile-landing__top-section">
      <MobileHeroBackground heroClipId={heroClipId} heroFilterId={heroFilterId} />

      <header className="mobile-landing__header">
        <div className="mobile-landing__brand">
          <div className="mobile-landing__brand-row">
            <span className="mobile-landing__brand-referidos">REFERIDOS</span>
            <span className="mobile-landing__brand-app">APP</span>
          </div>
          <div className="mobile-landing__brand-subtitle">Acceso anticipado</div>
        </div>

        <button type="button" className="mobile-landing__menu-button" aria-label="Abrir menú">
          <span className="mobile-landing__menu-line" />
          <span className="mobile-landing__menu-line" />
          <span className="mobile-landing__menu-line" />
        </button>
      </header>

      <div className="mobile-landing__hero-layout">
        <section className="mobile-landing__hero-section">
          <div className="mobile-landing__hero-text">
            <h1 className="mobile-landing__hero-title">
              Descubre y
              <br />
              comparte ofertas,
              <br />
              gana recompensas
              <br />
              fácilmente
            </h1>
            <p className="mobile-landing__hero-copy">
              Participa en el <strong>acceso anticipado</strong> de la app y recibe
              beneficios extra, solo por usar la aplicación.
            </p>
          </div>

          <div className="mobile-landing__hero-actions">
            <button
              type="button"
              className="mobile-landing__hero-primary-button"
              onClick={() => scrollToSection("waitlist-bottom")}
            >
              <span>Entrar a la lista de espera</span>
              <span>&gt;</span>
            </button>

            <button
              type="button"
              className="mobile-landing__hero-link-button"
              onClick={() => scrollToSection("waitlist-bottom")}
            >
              ¿Cómo funciona?
            </button>
          </div>
        </section>

        {isTabletHeroLayout ? (
          <MobilePhoneSection isHeroLayout phoneGlowFilterId={phoneGlowFilterId} />
        ) : null}
      </div>
    </div>
  );
}
