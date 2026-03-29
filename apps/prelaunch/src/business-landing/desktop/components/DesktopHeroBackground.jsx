import { businessAsset } from "../desktopWaitlistLandingAssets";

export default function DesktopHeroBackground() {
  return (
    <div className="business-landing__hero-bg" aria-hidden="true">
      <img src={businessAsset("bg-hero-negocio.png")} alt="" />
    </div>
  );
}

