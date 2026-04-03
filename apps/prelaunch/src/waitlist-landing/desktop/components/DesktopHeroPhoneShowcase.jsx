import { asset } from "../desktopWaitlistLandingAssets";
import DesktopInfoCard from "./DesktopInfoCard";

export default function DesktopHeroPhoneShowcase({ className = "", onInviteClick }) {
  return (
    <div className={`figma-prototype__hero-visual ${className}`.trim()}>
      <div className="figma-prototype__hero-phone">
        <img
          className="figma-prototype__hero-phone-glow"
          src={asset("phone-glow.svg")}
          alt=""
          aria-hidden="true"
        />
        <img
          className="figma-prototype__hero-phone-device"
          src={asset("Nothing Phone 2a.png")}
          alt="Mockup del telefono Nothing Phone 2a mostrando la app Referidos"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <img
        className="figma-prototype__hero-phone-back-shadow"
        src={asset("phone-back-shadow.svg")}
        alt=""
        aria-hidden="true"
      />

      <DesktopInfoCard onInviteClick={onInviteClick} />
    </div>
  );
}
