import { mobileAsset } from "../desktopWaitlistLandingAssets";

export default function DesktopMockupSteps() {
  return (
    <div className="business-landing__promo-stack">
      <img className="business-landing__promo-stack-blur" src="/assets/card-carousel-glow.png" alt="" aria-hidden="true" />
      <img
        className="business-landing__promo-mockup"
        src={mobileAsset("mockup-how-to-use.png")}
        alt="Mockup de uso de la app Referidos con promociones y recompensas"
        loading="lazy"
      />
    </div>
  );
}

