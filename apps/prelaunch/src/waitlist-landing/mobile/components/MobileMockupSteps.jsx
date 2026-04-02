import { rootAsset } from "../mobileWaitlistLandingAssets";

export default function MobileMockupSteps({ className = "" }) {
  return (
    <img
      className={`mobile-landing__promo-mockup ${className}`.trim()}
      src={rootAsset("mockup-how-to-use.png")}
      alt=""
    />
  );
}
