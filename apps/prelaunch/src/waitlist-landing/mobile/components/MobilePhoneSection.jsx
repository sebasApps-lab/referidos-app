import phoneBackShadow from "../../../assets/landing/hero/phone-back-shadow-container.webp";
import phoneGlow from "../../../assets/landing/hero/mobile-phone-glow.svg";
import phoneMockup from "../../../assets/landing/hero/nothing-phone-2a-optimized.webp";

export default function MobilePhoneSection({
  isHeroLayout = false,
  className = "",
}) {
  return (
    <section
      className={`${className} mobile-landing__phone-section${
        isHeroLayout ? " mobile-landing__phone-section--hero" : ""
      }`.trim()}
    >
      <div className="mobile-landing__phone-stack">
        <img
          className="mobile-landing__phone-back-shadow"
          src={phoneBackShadow}
          alt=""
        />
        <img
          className="mobile-landing__phone-glow"
          src={phoneGlow}
          alt=""
          aria-hidden="true"
        />
        <img
          className="mobile-landing__phone-image"
          src={phoneMockup}
          alt={"AplicaciÃƒÂ³n Referidos App en un telÃƒÂ©fono"}
          loading={isHeroLayout ? "eager" : "lazy"}
          fetchPriority={isHeroLayout ? "high" : "low"}
          decoding="async"
        />
      </div>
    </section>
  );
}
