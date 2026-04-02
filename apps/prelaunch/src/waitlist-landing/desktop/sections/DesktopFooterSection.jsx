import DesktopFooterColumns from "../components/DesktopFooterColumns";

export default function DesktopFooterSection({
  onPlatformClick,
  onWhoWeAreClick,
  onLinkClick,
}) {
  return (
    <footer className="figma-prototype__footerSection">
      <div className="figma-prototype__footerBrandScaleWrap figma-prototype__reveal-left">
        <div className="figma-prototype__footerBrand">
          <div className="figma-prototype__footerBrandTop">
            <img
              src="/assets/logo/go-plip-white-lila.svg"
              alt="Go Plip"
              className="figma-prototype__footerBrandLogo"
            />
            <p>
              Catálogo de promociones y
              <br />
              sistema de recompensas por
              <br />
              canjearlas y referir.
            </p>
          </div>

          <p className="figma-prototype__footerBrandBottom">
            {"© 2026 Qrew. Todos los derechos reservados."}
          </p>
        </div>
      </div>

      <div className="figma-prototype__footerColumnsScaleWrap figma-prototype__reveal-right figma-prototype__reveal-delay-1">
        <DesktopFooterColumns
          onPlatformClick={onPlatformClick}
          onWhoWeAreClick={onWhoWeAreClick}
          onLinkClick={onLinkClick}
        />
      </div>
    </footer>
  );
}
