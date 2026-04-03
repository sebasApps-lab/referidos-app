import { prelaunchBgSetAsset } from "../../../assets/registry";
import heroMobileMask from "../../../assets/bg-sets/landing-hero-mobile-mask.svg?no-inline";

const heroMobile960Webp = prelaunchBgSetAsset("bg-mobile-960.webp");
const heroMobile1280Webp = prelaunchBgSetAsset("bg-mobile-1280.webp");
const heroMobile1605Webp = prelaunchBgSetAsset("bg-mobile-1605.webp");
const heroMobile960Avif = prelaunchBgSetAsset("bg-mobile-960.avif");
const heroMobile1280Avif = prelaunchBgSetAsset("bg-mobile-1280.avif");
const heroMobile1605Avif = prelaunchBgSetAsset("bg-mobile-1605.avif");

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
