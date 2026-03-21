import DesktopFooterColumns from "../components/DesktopFooterColumns";

export default function DesktopFooterSection() {
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
            &copy; 2026 Referidos App - BETA v0.1.2
          </p>
        </div>
      </div>

      <div className="figma-prototype__footerColumnsScaleWrap">
        <DesktopFooterColumns />
      </div>
    </footer>
  );
}
