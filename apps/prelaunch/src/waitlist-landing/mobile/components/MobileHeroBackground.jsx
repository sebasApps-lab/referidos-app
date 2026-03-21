import {
  HERO_MASK_PATH,
  HERO_MASK_VIEWBOX_HEIGHT,
  HERO_MASK_VIEWBOX_MIN_X,
  HERO_MASK_VIEWBOX_WIDTH,
  sharedBgAsset,
} from "../mobileWaitlistLandingAssets";

export default function MobileHeroBackground({ heroClipId, heroFilterId }) {
  return (
    <div className="mobile-landing__hero-bg-wrap" aria-hidden="true">
      <svg
        className="mobile-landing__hero-bg-svg"
        viewBox={`${HERO_MASK_VIEWBOX_MIN_X} 0 ${HERO_MASK_VIEWBOX_WIDTH} ${HERO_MASK_VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <defs>
          <clipPath id={heroClipId} clipPathUnits="userSpaceOnUse">
            <path d={HERO_MASK_PATH} />
          </clipPath>
          <filter
            id={heroFilterId}
            x="-533.441"
            y="-2.32614"
            width="1613.88"
            height="907.347"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2.11467" />
            <feGaussianBlur stdDeviation="2.2204" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.51 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
        <path d={HERO_MASK_PATH} fill="#2f0663" filter={`url(#${heroFilterId})`} />
        <image
          className="mobile-landing__hero-bg-image"
          href={sharedBgAsset("landing-hero-2-bg.png")}
          x={HERO_MASK_VIEWBOX_MIN_X}
          y="0"
          width={HERO_MASK_VIEWBOX_WIDTH}
          height="906"
          preserveAspectRatio="xMidYMin slice"
          clipPath={`url(#${heroClipId})`}
        />
      </svg>
    </div>
  );
}
