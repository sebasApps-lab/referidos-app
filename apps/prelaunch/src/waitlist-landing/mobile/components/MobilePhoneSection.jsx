import "./MobilePhoneSection.css";
import phoneMockup from "../../../assets/landing/hero/nothing-phone-2a-optimized.webp";

export default function MobilePhoneSection({
  isHeroLayout = false,
  className = "",
  showDisclaimer = false,
}) {
  return (
    <section
      className={`${className} mobile-landing__phone-section${
        showDisclaimer ? " mobile-landing__phone-section--with-disclaimer" : ""
      }`.trim()}
    >
      <div className="mobile-landing__phone-stack">
        <img
          className="mobile-landing__phone-image"
          src={phoneMockup}
          alt="Aplicacion Referidos App en un telefono"
          loading={isHeroLayout ? "eager" : "lazy"}
          fetchPriority={isHeroLayout ? "high" : "low"}
          decoding="async"
        />
      </div>
      {showDisclaimer ? (
        <p className="mobile-landing__phone-disclaimer">
          Negocios y promociones mostrados solo con fines ilustrativos.
        </p>
      ) : null}
    </section>
  );
}
