import DesktopFooterColumns from "../components/DesktopFooterColumns";

export default function DesktopFooterSection() {
  return (
    <footer className="business-landing__footerSection">
      <div className="business-landing__footerBrandScaleWrap">
        <div className="business-landing__footerBrand">
          <div className="business-landing__footerBrandTop">
            <h3>
              <span>REFERIDOS </span>
              <span className="business-landing__footerBrandAccent">APP</span>
            </h3>
            <p>
              Catálogo de promociones y
              <br />
              sistema de recompensas por
              <br />
              canjearlas y referir.
            </p>
          </div>

          <p className="business-landing__footerBrandBottom">
            &copy; 2026 Referidos App - BETA v0.1.2
          </p>
        </div>
      </div>

      <div className="business-landing__footerColumnsScaleWrap">
        <DesktopFooterColumns />
      </div>
    </footer>
  );
}

