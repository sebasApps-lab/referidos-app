import { asset, rootAsset } from "../mobileWaitlistLandingAssets";

export default function MobilePhoneSection({
  isHeroLayout = false,
  phoneGlowFilterId,
  className = "",
}) {
  return (
    <section
      className={`${className} mobile-landing__phone-section${
        isHeroLayout ? " mobile-landing__phone-section--hero" : ""
      }`.trim()}
    >
      <div className="mobile-landing__phone-stack">
        <img
          className="mobile-landing__phone-back-shadow"
          src={asset("phone-back-shadow-container.png")}
          alt=""
        />
        <svg
          className="mobile-landing__phone-glow"
          viewBox="-211.5 0 797 700"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g opacity="0.61" filter={`url(#${phoneGlowFilterId})`}>
            <path
              d="M-24 239.5C-24 210.781 -0.718803 187.5 28 187.5H346C374.719 187.5 398 210.781 398 239.5V512.5H-24V239.5Z"
              fill="white"
              fillOpacity="0.42"
            />
          </g>
          <defs>
            <filter
              id={phoneGlowFilterId}
              x="-211.5"
              y="0"
              width="797"
              height="700"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="93.75" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>
        <img
          className="mobile-landing__phone-image"
          src={rootAsset("Nothing Phone 2a 2.png")}
          alt={"Aplicación Referidos App en un teléfono"}
        />
      </div>
    </section>
  );
}
