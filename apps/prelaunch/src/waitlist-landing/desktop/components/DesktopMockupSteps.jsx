import cardCarouselGlow from "../../../assets/landing/bottom/card-carousel-glow-optimized.webp";
import mockupHowToUse from "../../../assets/landing/bottom/mockup-how-to-use-optimized.webp";

export default function DesktopMockupSteps({ className = "" }) {
  return (
    <div className={`figma-prototype__promo-stack ${className}`.trim()}>
      <img
        className="figma-prototype__promo-stack-blur"
        src={cardCarouselGlow}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <img
        className="figma-prototype__promo-mockup"
        src={mockupHowToUse}
        alt="Mockup de uso de la app Referidos con promociones y recompensas"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
