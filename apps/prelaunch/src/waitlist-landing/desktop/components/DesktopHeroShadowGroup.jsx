import shadowPinkGlow from "../../../assets/landing/hero/shadow-pink-glow.svg";
import shadowPinkBase from "../../../assets/landing/hero/shadow-pink-base.svg";
import shadowPurpleGlow from "../../../assets/landing/hero/shadow-purple-glow.svg";
import shadowPurpleBase from "../../../assets/landing/hero/shadow-purple-base.svg";

export default function DesktopHeroShadowGroup() {
  return (
    <div className="figma-prototype__hero-shadow-group" aria-hidden="true">
      <img className="figma-prototype__hero-shadow-pink-glow" src={shadowPinkGlow} alt="" />
      <img className="figma-prototype__hero-shadow-pink-base" src={shadowPinkBase} alt="" />
      <img className="figma-prototype__hero-shadow-purple-glow" src={shadowPurpleGlow} alt="" />
      <img className="figma-prototype__hero-shadow-purple-base" src={shadowPurpleBase} alt="" />
    </div>
  );
}
