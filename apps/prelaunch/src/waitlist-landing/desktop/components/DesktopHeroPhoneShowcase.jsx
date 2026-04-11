import DesktopInfoCard from "./DesktopInfoCard";
import phoneMockup from "../../../assets/landing/hero/nothing-phone-2a-optimized.webp";

export default function DesktopHeroPhoneShowcase({ className = "", onInviteClick }) {
  return (
    <div className={`figma-prototype__hero-visual ${className}`.trim()}>
      <div className="figma-prototype__hero-phone">
        <img
          className="figma-prototype__hero-phone-device"
          src={phoneMockup}
          alt="Mockup del telefono Nothing Phone 2a mostrando la app Referidos"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <DesktopInfoCard onInviteClick={onInviteClick} />
    </div>
  );
}
