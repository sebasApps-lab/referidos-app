import { asset } from "../desktopWaitlistLandingAssets";

export default function DesktopHeroShadowGroup() {
  return (
    <div className="figma-prototype__hero-shadow-group" aria-hidden="true">
      <img className="figma-prototype__hero-shadow-pink-glow" src={asset("shadow-pink-glow.svg")} alt="" />
      <img className="figma-prototype__hero-shadow-pink-base" src={asset("shadow-pink-base.svg")} alt="" />
      <img className="figma-prototype__hero-shadow-purple-glow" src={asset("shadow-purple-glow.svg")} alt="" />
      <img className="figma-prototype__hero-shadow-purple-base" src={asset("shadow-purple-base.svg")} alt="" />
    </div>
  );
}
