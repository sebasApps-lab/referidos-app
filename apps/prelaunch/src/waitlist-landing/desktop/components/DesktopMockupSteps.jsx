import { asset } from "../desktopWaitlistLandingAssets";

export default function DesktopMockupSteps({ className = "" }) {
  return (
    <div className={`figma-prototype__promo-stack ${className}`.trim()}>
      <img className="figma-prototype__promo-stack-blur" src="/assets/card-carousel-glow.png" alt="" aria-hidden="true" />
      <img
        className="figma-prototype__promo-mockup"
        src={asset("mockup-how-to-use.png")}
        alt="Mockup de uso de la app Referidos con promociones y recompensas"
        loading="lazy"
      />
    </div>
  );
}
