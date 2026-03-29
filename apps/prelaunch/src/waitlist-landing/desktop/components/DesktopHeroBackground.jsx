import { asset } from "../desktopWaitlistLandingAssets";

export default function DesktopHeroBackground() {
  return (
    <div className="figma-prototype__hero-bg" aria-hidden="true">
      <img src={asset("bg-mask-group.svg")} alt="" />
    </div>
  );
}
