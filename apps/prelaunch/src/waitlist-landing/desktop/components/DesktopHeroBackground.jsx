import heroDesktopMaskRaw from "../../../assets/landing/hero/bg/hero-desktop-mask.svg?raw";
import { svgMaskUrl } from "../../../assets/svgMaskUrl";
import heroDesktop1600Webp from "../../../assets/landing/hero/bg/hero-desktop-optimized-1600.webp";
import heroDesktop1920Webp from "../../../assets/landing/hero/bg/hero-desktop-optimized-1920.webp";
import heroDesktop2560Webp from "../../../assets/landing/hero/bg/hero-desktop-optimized-2560.webp";
import heroDesktop1600Avif from "../../../assets/landing/hero/bg/hero-desktop-optimized-1600.avif";
import heroDesktop1920Avif from "../../../assets/landing/hero/bg/hero-desktop-optimized-1920.avif";
import heroDesktop2560Avif from "../../../assets/landing/hero/bg/hero-desktop-optimized-2560.avif";
const heroDesktopMask = svgMaskUrl(heroDesktopMaskRaw);

export default function DesktopHeroBackground() {
  return (
    <div className="figma-prototype__hero-bg" aria-hidden="true">
      <div className="figma-prototype__hero-bg-mask">
        <picture className="figma-prototype__hero-bg-picture">
          <source
            type="image/avif"
            srcSet={`${heroDesktop1600Avif} 1600w, ${heroDesktop1920Avif} 1920w, ${heroDesktop2560Avif} 2560w`}
            sizes="100vw"
          />
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
