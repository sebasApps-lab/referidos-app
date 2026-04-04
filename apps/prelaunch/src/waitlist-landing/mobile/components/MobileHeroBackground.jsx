import { prelaunchBgSetAsset } from "../../../assets/registry";
import heroMobileMaskRaw from "../../../assets/bg-sets/hero/hero-mobile-mask.svg?raw";
import { svgMaskUrl } from "../../../assets/svgMaskUrl";

const heroMobile960Webp = prelaunchBgSetAsset("hero/hero-mobile-optimized-960.webp");
const heroMobile1280Webp = prelaunchBgSetAsset("hero/hero-mobile-optimized-1280.webp");
const heroMobile1605Webp = prelaunchBgSetAsset("hero/hero-mobile-optimized-1605.webp");
const heroMobile960Avif = prelaunchBgSetAsset("hero/hero-mobile-optimized-960.avif");
const heroMobile1280Avif = prelaunchBgSetAsset("hero/hero-mobile-optimized-1280.avif");
const heroMobile1605Avif = prelaunchBgSetAsset("hero/hero-mobile-optimized-1605.avif");
const heroMobileMask = svgMaskUrl(heroMobileMaskRaw);

export default function MobileHeroBackground() {
  return (
    <div className="mobile-landing__hero-bg-wrap" aria-hidden="true">
      <div className="mobile-landing__hero-bg-mask">
        <picture className="mobile-landing__hero-bg-picture">
          {heroMobile960Avif && heroMobile1280Avif && heroMobile1605Avif ? (
            <source
              type="image/avif"
              srcSet={`${heroMobile960Avif} 960w, ${heroMobile1280Avif} 1280w, ${heroMobile1605Avif} 1605w`}
              sizes="100vw"
            />
          ) : null}
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
