import { useEffect, useRef, useState } from "react";
import useSectionAssetsReady from "../../../performance/useSectionAssetsReady";
import { scrollToSection } from "../../scrollToSection";
import DesktopHeroBackground from "../components/DesktopHeroBackground";
import DesktopHeroPhoneShowcase from "../components/DesktopHeroPhoneShowcase";
import phoneBottomShadow from "../../../assets/landing/hero/phone-bottom-shadow-optimized.webp";

const HERO_BG_ENTRY_MS = 420;

export default function DesktopHeroSection({
  onWaitlistClick,
  onCardWaitlistClick,
  onAssetsReadyChange,
}) {
  const sectionRef = useRef(null);
  const isSectionReady = useSectionAssetsReady(sectionRef);
  const [isHeroIntroReady, setIsHeroIntroReady] = useState(false);
  const heroBackgroundClassName = isSectionReady
    ? "figma-prototype__hero-bg-entry"
    : "figma-prototype__entry-pending";
  const heroCopyClassName = isHeroIntroReady
    ? "figma-prototype__hero-copy figma-prototype__hero-copy-entry"
    : "figma-prototype__hero-copy figma-prototype__entry-pending";
  const heroVisualClassName = isHeroIntroReady
    ? "figma-prototype__hero-visual-entry"
    : "figma-prototype__entry-pending";

  useEffect(() => {
    if (!isSectionReady) {
      setIsHeroIntroReady(false);
      onAssetsReadyChange?.(false);
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setIsHeroIntroReady(true);
      onAssetsReadyChange?.(true);
    }, HERO_BG_ENTRY_MS);

    return () => window.clearTimeout(timerId);
  }, [isSectionReady, onAssetsReadyChange]);

  return (
    <section
      ref={sectionRef}
      className="figma-prototype__hero prelaunch-section-gated"
      data-section-ready={isSectionReady ? "true" : "false"}
      >
      <div className="hero-phone-bottom-shadow-anchor" aria-hidden="true">
        <div className={`hero-phone-bottom-shadow-frame ${heroVisualClassName}`.trim()}>
          <img className="hero-phone-bottom-shadow" src={phoneBottomShadow} alt="" />
        </div>
      </div>
      <DesktopHeroBackground className={heroBackgroundClassName} />

      <div className="figma-prototype__hero-content">
        <div className={heroCopyClassName}>
          <div className="figma-prototype__hero-copy-stack">
            <div className="figma-prototype__hero-copy-body">
              <p className="figma-prototype__hero-title">
                Descubre y comparte
                <br />
                ofertas, gana
                <br />
                recompensas fácilmente
              </p>

              <p className="figma-prototype__hero-subtitle">
                <span>Participa en el </span>
                <strong>acceso anticipado</strong>
                <span>
                  {" "}de la app y recibe
                  <br />
                  beneficios extra, solo por usar la aplicación.
                </span>
              </p>
            </div>

            <button
              className="figma-prototype__hero-button"
              type="button"
              onClick={() => {
                if (onWaitlistClick) {
                  onWaitlistClick();
                  return;
                }
                scrollToSection("waitlist-bottom");
              }}
            >
              <span>Entrar a la lista de espera</span>
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>

        <DesktopHeroPhoneShowcase
          className={heroVisualClassName}
          onInviteClick={onCardWaitlistClick}
        />
      </div>
    </section>
  );
}
