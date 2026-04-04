import bottomMobileMaskRaw from "../../../assets/landing/bottom/bg/bottom-mobile-mask.svg?raw";
import { svgMaskUrl } from "../../../assets/svgMaskUrl";
import bottomMobile1875Webp from "../../../assets/landing/bottom/bg/bottom-mobile-optimized-1875x1250.webp";
import bottomMobile2813Webp from "../../../assets/landing/bottom/bg/bottom-mobile-optimized-2813x1875.webp";
import bottomMobile3750Webp from "../../../assets/landing/bottom/bg/bottom-mobile-optimized-3750x2500.webp";
import bottomMobile1875Avif from "../../../assets/landing/bottom/bg/bottom-mobile-optimized-1875x1250.avif";
import bottomMobile2813Avif from "../../../assets/landing/bottom/bg/bottom-mobile-optimized-2813x1875.avif";
import bottomMobile3750Avif from "../../../assets/landing/bottom/bg/bottom-mobile-optimized-3750x2500.avif";
const bottomMobileMask = svgMaskUrl(bottomMobileMaskRaw);

export default function MobileBottomBackground({ bottomClipId }) {
  return (
    <div className="mobile-landing__bottom-mask-wrap" aria-hidden="true">
      <div className="mobile-landing__bottom-mask-surface" data-bottom-clip-id={bottomClipId}>
        <picture className="mobile-landing__bottom-mask-picture">
          {bottomMobile1875Avif && bottomMobile2813Avif && bottomMobile3750Avif ? (
            <source
              type="image/avif"
              srcSet={`${bottomMobile1875Avif} 1875w, ${bottomMobile2813Avif} 2813w, ${bottomMobile3750Avif} 3750w`}
              sizes="100vw"
            />
          ) : null}
          <source
            type="image/webp"
            srcSet={`${bottomMobile1875Webp} 1875w, ${bottomMobile2813Webp} 2813w, ${bottomMobile3750Webp} 3750w`}
            sizes="100vw"
          />
          <img
            className="mobile-landing__bottom-mask-image"
            src={bottomMobile1875Webp}
            alt=""
            decoding="async"
            loading="lazy"
            style={{
              WebkitMaskImage: `url(${bottomMobileMask})`,
              maskImage: `url(${bottomMobileMask})`,
            }}
          />
        </picture>
      </div>
    </div>
  );
}
