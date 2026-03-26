import DesktopFooterColumns from "../components/DesktopFooterColumns";

export default function DesktopFooterSection({ onPlatformClick, onWhoWeAreClick }) {
  return (
    <footer className="figma-prototype__footerSection">
      <div className="figma-prototype__footerBrandScaleWrap">
        <div className="figma-prototype__footerBrand">
          <div className="figma-prototype__footerBrandTop">
            <h3>
              <span>REFERIDOS </span>
              <span className="figma-prototype__footerBrandAccent">APP</span>
            </h3>
            <p>
              Catálogo de promociones y
              <br />
              sistema de recompensas por
              <br />
              canjearlas y referir.
            </p>
          </div>

          <p className="figma-prototype__footerBrandBottom">
            {"\u00a9 2026 Referidos App. Todos los derechos reservados."}
          </p>
        </div>
      </div>

      <div className="figma-prototype__footerColumnsScaleWrap">
        <DesktopFooterColumns
          onPlatformClick={onPlatformClick}
          onWhoWeAreClick={onWhoWeAreClick}
        />
      </div>
    </footer>
  );
}
