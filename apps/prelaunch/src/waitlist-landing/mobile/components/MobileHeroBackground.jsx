import heroMobileMaskRaw from "../../../assets/landing/hero/bg/hero-mobile-mask.svg?raw";
import { svgMaskUrl } from "../../../assets/svgMaskUrl";
import heroMobile960Webp from "../../../assets/landing/hero/bg/hero-mobile-optimized-960.webp";
import heroMobile1280Webp from "../../../assets/landing/hero/bg/hero-mobile-optimized-1280.webp";
import heroMobile1605Webp from "../../../assets/landing/hero/bg/hero-mobile-optimized-1605.webp";
import heroMobile960Avif from "../../../assets/landing/hero/bg/hero-mobile-optimized-960.avif";
import heroMobile1280Avif from "../../../assets/landing/hero/bg/hero-mobile-optimized-1280.avif";
import heroMobile1605Avif from "../../../assets/landing/hero/bg/hero-mobile-optimized-1605.avif";
const heroMobileMask = svgMaskUrl(heroMobileMaskRaw);

export default function MobileHeroBackground() {
  return (
    <div className="mobile-landing__hero-bg-wrap" aria-hidden="true">
      <div className="mobile-landing__hero-bg-mask">
        <picture className="mobile-landing__hero-bg-picture">
          <source
            type="image/avif"
            srcSet={`${heroMobile960Avif} 960w, ${heroMobile1280Avif} 1280w, ${heroMobile1605Avif} 1605w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${heroMobile960Webp} 960w, ${heroMobile1280Webp} 1280w, ${heroMobile1605Webp} 1605w`}
            sizes="100vw"
          />
          <img
            className="mobile-landing__hero-bg-image"
            src={heroMobile1280Webp}
            alt=""
            fetchPriority="high"
            decoding="async"
            style={{
              WebkitMaskImage: `url(${heroMobileMask})`,
              maskImage: `url(${heroMobileMask})`,
            }}
          />
        </picture>
      </div>
    </div>
  );
}
