import { prelaunchBgSetAsset } from "../../../assets/registry";
import heroDesktopMaskRaw from "../../../assets/bg-sets/hero/hero-desktop-mask.svg?raw";
import { svgMaskUrl } from "../../../assets/svgMaskUrl";

const heroDesktop1600Webp = prelaunchBgSetAsset("hero/hero-desktop-optimized-1600.webp");
const heroDesktop1920Webp = prelaunchBgSetAsset("hero/hero-desktop-optimized-1920.webp");
const heroDesktop2560Webp = prelaunchBgSetAsset("hero/hero-desktop-optimized-2560.webp");
const heroDesktop1600Avif = prelaunchBgSetAsset("hero/hero-desktop-optimized-1600.avif");
const heroDesktop1920Avif = prelaunchBgSetAsset("hero/hero-desktop-optimized-1920.avif");
const heroDesktop2560Avif = prelaunchBgSetAsset("hero/hero-desktop-optimized-2560.avif");
const heroDesktopMask = svgMaskUrl(heroDesktopMaskRaw);

export default function DesktopHeroBackground() {
  return (
    <div className="figma-prototype__hero-bg" aria-hidden="true">
      <div className="figma-prototype__hero-bg-mask">
        <picture className="figma-prototype__hero-bg-picture">
          {heroDesktop1600Avif && heroDesktop1920Avif && heroDesktop2560Avif ? (
            <source
              type="image/avif"
              srcSet={`${heroDesktop1600Avif} 1600w, ${heroDesktop1920Avif} 1920w, ${heroDesktop2560Avif} 2560w`}
              sizes="100vw"
            />
          ) : null}
          <source
            type="image/webp"
            srcSet={`${heroDesktop1600Webp} 1600w, ${heroDesktop1920Webp} 1920w, ${heroDesktop2560Webp} 2560w`}
            sizes="100vw"
          />
          <img
            className="figma-prototype__hero-bg-image"
            src={heroDesktop1920Webp}
            alt=""
            fetchPriority="high"
            decoding="async"
            style={{
              WebkitMaskImage: `url(${heroDesktopMask})`,
              maskImage: `url(${heroDesktopMask})`,
            }}
          />
        </picture>
      </div>
    </div>
  );
}
