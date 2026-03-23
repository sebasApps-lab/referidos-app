import { asset, businessAsset } from "../desktopWaitlistLandingAssets";

export default function DesktopHeroPhoneShowcase() {
  return (
    <div className="business-landing__hero-visual">
      <div className="business-landing__hero-phone">
        <img
          className="business-landing__hero-phone-glow"
          src={asset("phone-glow.svg")}
          alt=""
          aria-hidden="true"
        />
        <img
          className="business-landing__hero-phone-device"
          src={businessAsset("iMac-panel-promos-mockup-BLUE.png")}
          alt="Mockup iMac mostrando el panel de promociones para negocios"
          loading="eager"
        />
      </div>
    </div>
  );
}

