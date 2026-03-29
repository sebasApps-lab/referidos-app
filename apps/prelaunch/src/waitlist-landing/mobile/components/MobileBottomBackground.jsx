import {
  asset,
  BOTTOM_MASK_OBJECT_BOUNDING_BOX_TRANSFORM,
  BOTTOM_MASK_PATH,
  sharedBgAsset,
} from "../mobileWaitlistLandingAssets";

export default function MobileBottomBackground({ bottomClipId }) {
  return (
    <div className="mobile-landing__bottom-mask-wrap" aria-hidden="true">
      <svg className="mobile-landing__bottom-mask-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id={bottomClipId} clipPathUnits="objectBoundingBox">
            <path
              d={BOTTOM_MASK_PATH}
              transform={BOTTOM_MASK_OBJECT_BOUNDING_BOX_TRANSFORM}
            />
          </clipPath>
        </defs>
        <image
          href={sharedBgAsset("landing-bottom-footer-bg.png")}
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${bottomClipId})`}
        />
      </svg>
      <img className="mobile-landing__bottom-glow" src={asset("bottom-glow.png")} alt="" />
    </div>
  );
}
