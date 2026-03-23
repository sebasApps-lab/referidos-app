import { scrollToSection } from "../../scrollToSection";
import DesktopHeroBackground from "../components/DesktopHeroBackground";
import DesktopHeroPhoneShowcase from "../components/DesktopHeroPhoneShowcase";

export default function DesktopHeroSection() {
  return (
    <section className="business-landing__hero">
      <DesktopHeroBackground />

      <div className="business-landing__hero-content">
        <div className="business-landing__hero-copy">
          <div className="business-landing__hero-copy-stack">
            <div className="business-landing__hero-copy-body">
              <p className="business-landing__hero-title">
                Impulsa tu negocio creando promociones a tu medida.
              </p>

              <p className="business-landing__hero-subtitle">
                Atrae nuevos clientes y genera mas ventas con ofertas que puedes crear y
                publicar desde tu computadora, table o smartphone.
              </p>
            </div>

            <button
              className="business-landing__hero-button"
              type="button"
              onClick={() => scrollToSection("waitlist-bottom")}
            >
              <span>Crear cuenta gratis</span>
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>

        <DesktopHeroPhoneShowcase />
      </div>
    </section>
  );
}
