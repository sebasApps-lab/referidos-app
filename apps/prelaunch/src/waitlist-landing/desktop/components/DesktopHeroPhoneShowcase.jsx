import { asset } from "../desktopWaitlistLandingAssets";
import DesktopSignupCard from "./DesktopSignupCard";

export default function DesktopHeroPhoneShowcase() {
  return (
    <div className="figma-prototype__hero-visual">
      <div className="figma-prototype__hero-phone">
        <img
          className="figma-prototype__hero-phone-glow"
          src={asset("phone-glow.svg")}
          alt=""
          aria-hidden="true"
        />
        <img
          className="figma-prototype__hero-phone-device"
          src={asset("Nothing Phone 2a 2.png")}
          alt="Mockup del telefono Nothing Phone 2a mostrando la app Referidos"
          loading="eager"
        />
      </div>

      <img
        className="figma-prototype__hero-phone-back-shadow"
        src={asset("phone-back-shadow.svg")}
        alt=""
        aria-hidden="true"
      />

      <DesktopSignupCard />
    </div>
  );
}
