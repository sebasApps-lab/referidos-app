import mockupHowToUse from "../../../assets/landing/bottom/mockup-how-to-use-optimized.webp";

export default function MobileMockupSteps({ className = "" }) {
  return (
    <img
      className={`mobile-landing__promo-mockup ${className}`.trim()}
      src={mockupHowToUse}
      alt=""
    />
  );
}
