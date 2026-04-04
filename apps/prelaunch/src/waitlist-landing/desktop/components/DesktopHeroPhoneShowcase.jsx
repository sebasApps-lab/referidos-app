import DesktopInfoCard from "./DesktopInfoCard";
import phoneGlow from "../../../assets/landing/hero/phone-glow.svg";
import phoneMockup from "../../../assets/landing/hero/nothing-phone-2a-optimized.webp";
import phoneBackShadow from "../../../assets/landing/hero/phone-back-shadow.svg";

export default function DesktopHeroPhoneShowcase({ className = "", onInviteClick }) {
  return (
    <div className={`figma-prototype__hero-visual ${className}`.trim()}>
      <div className="figma-prototype__hero-phone">
        <img
          className="figma-prototype__hero-phone-glow"
          src={phoneGlow}
          alt=""
          aria-hidden="true"
        />
        <img
          className="figma-prototype__hero-phone-device"
          src={phoneMockup}
          alt="Mockup del telefono Nothing Phone 2a mostrando la app Referidos"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <img
        className="figma-prototype__hero-phone-back-shadow"
        src={phoneBackShadow}
        alt=""
        aria-hidden="true"
      />

      <DesktopInfoCard onInviteClick={onInviteClick} />
    </div>
  );
}
