import DesktopHeroBackground from "../components/DesktopHeroBackground";
import DesktopHeroPhoneShowcase from "../components/DesktopHeroPhoneShowcase";
import DesktopHeroShadowGroup from "../components/DesktopHeroShadowGroup";

export default function DesktopHeroSection() {
  return (
    <section className="figma-prototype__hero">
      <DesktopHeroShadowGroup />
      <DesktopHeroBackground />

      <div className="figma-prototype__hero-content">
        <div className="figma-prototype__hero-copy">
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

            <button className="figma-prototype__hero-button" type="button">
              <span>Entrar a la lista de espera</span>
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>

        <DesktopHeroPhoneShowcase />
      </div>
    </section>
  );
}
