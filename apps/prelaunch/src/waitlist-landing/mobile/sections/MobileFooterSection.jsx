import { footerPanels } from "../mobileWaitlistLandingContent";
import MobileFooterPanels from "../components/MobileFooterPanels";

export default function MobileFooterSection() {
  return (
    <footer className="mobile-landing__footer">
      <MobileFooterPanels panels={footerPanels} />

      <div className="mobile-landing__footer-info">
        <div className="mobile-landing__footer-about">
          <div className="mobile-landing__footer-brand">REFERIDOS APP</div>
          <p className="mobile-landing__footer-about-copy">
            {"Cat\u00e1logo de promociones y sistema de recompensas por canjearlas y referir."}
          </p>
        </div>

        <div className="mobile-landing__footer-legal">
          <div className="mobile-landing__footer-legal-links">
            <button type="button">{"T\u00e9rminos"}</button>
            <span>-</span>
            <button type="button">Privacidad</button>
          </div>
          <div className="mobile-landing__footer-copyright">
            {"\u00a9 2026 Referidos App. Todos los derechos reservados."}
          </div>
        </div>
      </div>
    </footer>
  );
}
