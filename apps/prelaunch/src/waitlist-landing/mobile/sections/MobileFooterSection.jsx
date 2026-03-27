import { useNavigate } from "react-router-dom";
import { footerPanels } from "../mobileWaitlistLandingContent";
import MobileFooterPanels from "../components/MobileFooterPanels";

export default function MobileFooterSection({
  onBusinessClick,
  onPlatformClick,
  onWhoWeAreClick,
}) {
  const navigate = useNavigate();

  function handleFooterPanelClick(panelKey) {
    if (panelKey === "help") {
      navigate("/ayuda/es");
      return;
    }

    if (panelKey === "business") {
      onBusinessClick?.();
      return;
    }

    if (panelKey === "platform") {
      onPlatformClick?.();
      return;
    }

    if (panelKey === "team") {
      onWhoWeAreClick?.();
      return;
    }

    if (panelKey === "delete-data") {
      navigate("/ayuda/es/articulo/borrar-datos");
    }
  }

  return (
    <footer className="mobile-landing__footer">
      <MobileFooterPanels panels={footerPanels} onPanelClick={handleFooterPanelClick} />

      <div className="mobile-landing__footer-info">
        <div className="mobile-landing__footer-about">
          <div className="mobile-landing__footer-brand">REFERIDOS APP</div>
          <p className="mobile-landing__footer-about-copy">
            {"Catálogo de promociones y sistema de recompensas por canjearlas y referir."}
          </p>
        </div>

        <div className="mobile-landing__footer-legal">
          <div className="mobile-landing__footer-legal-links">
            <button type="button" onClick={() => navigate("/ayuda/es/articulo/terminos")}>
              {"Términos"}
            </button>
            <span>-</span>
            <button type="button" onClick={() => navigate("/ayuda/es/articulo/privacidad")}>
              Privacidad
            </button>
          </div>
          <div className="mobile-landing__footer-copyright">
            {"© 2026 Referidos App. Todos los derechos reservados."}
          </div>
        </div>
      </div>
    </footer>
  );
}
