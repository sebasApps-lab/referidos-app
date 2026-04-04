import { asset } from "../desktopWaitlistLandingAssets";

export default function DesktopMockupSteps({ className = "" }) {
  return (
    <div className={`figma-prototype__promo-stack ${className}`.trim()}>
      <img
        className="figma-prototype__promo-stack-blur"
        src={asset("card-carousel-glow-optimized.webp")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <img
        className="figma-prototype__promo-mockup"
        src={asset("mockup-how-to-use-optimized.webp")}
        alt="Mockup de uso de la app Referidos con promociones y recompensas"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
