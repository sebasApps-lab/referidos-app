import { prelaunchBgSetAsset } from "../../../assets/registry";

const bottomDesktop1694Webp = prelaunchBgSetAsset("bottom/bottom-desktop-optimized-1694.webp");
const bottomDesktop2541Webp = prelaunchBgSetAsset("bottom/bottom-desktop-optimized-2541.webp");
const bottomDesktop3388Webp = prelaunchBgSetAsset("bottom/bottom-desktop-optimized-3388.webp");
const bottomDesktop1694Avif = prelaunchBgSetAsset("bottom/bottom-desktop-optimized-1694.avif");
const bottomDesktop2541Avif = prelaunchBgSetAsset("bottom/bottom-desktop-optimized-2541.avif");
const bottomDesktop3388Avif = prelaunchBgSetAsset("bottom/bottom-desktop-optimized-3388.avif");

export default function DesktopBottomBackground() {
  return (
    <div className="figma-prototype__bottom-bg" aria-hidden="true">
      <picture className="figma-prototype__bottom-bg-picture">
        {bottomDesktop1694Avif && bottomDesktop2541Avif && bottomDesktop3388Avif ? (
          <source
            type="image/avif"
            srcSet={`${bottomDesktop1694Avif} 1694w, ${bottomDesktop2541Avif} 2541w, ${bottomDesktop3388Avif} 3388w`}
            sizes="100vw"
          />
        ) : null}
        <source
          type="image/webp"
          srcSet={`${bottomDesktop1694Webp} 1694w, ${bottomDesktop2541Webp} 2541w, ${bottomDesktop3388Webp} 3388w`}
          sizes="100vw"
        />
        <img
          className="figma-prototype__bottom-bg-image"
          src={bottomDesktop1694Webp}
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>
    </div>
  );
}
