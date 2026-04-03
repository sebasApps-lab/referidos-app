import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { prelaunchLogoAsset } from "../../../assets/registry";
import { scrollToSection } from "../../scrollToSection";
import MobileHeroBackground from "../components/MobileHeroBackground";
import MobilePhoneSection from "../components/MobilePhoneSection";

export default function MobileHeroSection({
  isTabletHeroLayout,
  phoneGlowFilterId,
  onBusinessClick,
  onHelpClick,
  onHowItWorksClick,
  onInvitationClick,
  onWaitlistClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function handleMenuAction(callback) {
    setIsMenuOpen(false);
    window.setTimeout(callback, 0);
  }

  return (
    <div className="mobile-landing__top-section">
      <MobileHeroBackground />

      <header className="mobile-landing__header">
        <div className="mobile-landing__brand mobile-landing__reveal-up">
          <img
            src={prelaunchLogoAsset("go-plip-white-lila.svg")}
            alt="Go Plip"
            className="mobile-landing__brand-logo"
          />
          <span className="mobile-landing__brand-subtitle">Acceso Anticipado</span>
        </div>

        <button
          type="button"
          className="mobile-landing__menu-button"
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls={drawerId}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="mobile-landing__menu-line" />
          <span className="mobile-landing__menu-line" />
          <span className="mobile-landing__menu-line" />
        </button>
      </header>

      <button
        type="button"
        aria-label="Cerrar menú"
        className={[
          "mobile-landing__drawer-backdrop",
          isMenuOpen ? "mobile-landing__drawer-backdrop--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id={drawerId}
        className={[
          "mobile-landing__drawer",
          isMenuOpen ? "mobile-landing__drawer--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Menú principal"
      >
        <div className="mobile-landing__drawer-header">
          <h2>Menú</h2>
          <button
            type="button"
            className="mobile-landing__drawer-close"
            aria-label="Cerrar menú"
            onClick={() => setIsMenuOpen(false)}
          >
            <span />
            <span />
          </button>
        </div>

        <nav className="mobile-landing__drawer-nav">
          <button
            type="button"
            className="mobile-landing__drawer-link"
            onClick={() =>
              handleMenuAction(() => {
                if (onHelpClick) {
                  onHelpClick();
                  return;
                }
                navigate("/ayuda/es");
              })
            }
          >
            Ayuda
          </button>

          <button
            type="button"
            className="mobile-landing__drawer-link"
            onClick={() => handleMenuAction(onInvitationClick)}
          >
            Recibir mi invitación
          </button>

          <button
            type="button"
            className="mobile-landing__drawer-link"
            onClick={() => handleMenuAction(onBusinessClick)}
          >
            Para negocios
          </button>
        </nav>

        <div className="mobile-landing__drawer-brand">
          <img
            src={prelaunchLogoAsset("go-plip-dark-light-purple.svg")}
            alt="Go Plip"
            className="mobile-landing__drawer-logo"
          />
        </div>
      </aside>

      <div className="mobile-landing__hero-layout">
        <section className="mobile-landing__hero-section">
          <div className="mobile-landing__hero-text mobile-landing__reveal-up mobile-landing__reveal-delay-1">
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
              Participa en el <strong>acceso anticipado</strong> de la app y recibe beneficios
              extra, solo por usar la aplicación.
            </p>
          </div>

          <div className="mobile-landing__hero-actions mobile-landing__reveal-up mobile-landing__reveal-delay-2">
            <button
              type="button"
              className="mobile-landing__hero-primary-button"
              onClick={() => {
                if (onWaitlistClick) {
                  onWaitlistClick();
                  return;
                }
                scrollToSection("waitlist-bottom");
              }}
            >
              <span>Entrar a la lista de espera</span>
              <span>&gt;</span>
            </button>

            <button
              type="button"
              className="mobile-landing__hero-link-button"
              onClick={() => {
                onHowItWorksClick?.();
                scrollToSection("waitlist-steps");
              }}
            >
              ¿Cómo funciona?
            </button>
          </div>
        </section>

        {isTabletHeroLayout ? (
          <MobilePhoneSection
            isHeroLayout
            phoneGlowFilterId={phoneGlowFilterId}
            className="mobile-landing__reveal-up mobile-landing__reveal-delay-3"
          />
        ) : null}
      </div>
    </div>
  );
}
