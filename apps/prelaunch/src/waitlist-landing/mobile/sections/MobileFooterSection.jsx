import { useNavigate } from "react-router-dom";
import { footerPanels } from "../mobileWaitlistLandingContent";
import MobileFooterPanels from "../components/MobileFooterPanels";

export default function MobileFooterSection({
  onBusinessClick,
  onLinkClick,
  onPlatformClick,
  onWhoWeAreClick,
}) {
  const navigate = useNavigate();

  function trackAndNavigate({ linkId, targetPath, surface, label }) {
    onLinkClick?.({
      linkId,
      targetPath,
      targetKind: "internal",
      surface,
      label,
    });
    navigate(targetPath);
  }

  function handleFooterPanelClick(panelKey) {
    if (panelKey === "help") {
      trackAndNavigate({
        linkId: "footer_help",
        targetPath: "/ayuda/es",
        surface: "footer_panel",
        label: "Ayuda",
      });
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
      trackAndNavigate({
        linkId: "footer_delete_data",
        targetPath: "/ayuda/es/articulo/borrar-datos",
        surface: "footer_panel",
        label: "Borrar datos",
      });
    }
  }

  return (
    <footer className="mobile-landing__footer">
      <MobileFooterPanels
        panels={footerPanels}
        onPanelClick={handleFooterPanelClick}
        className="mobile-landing__reveal-up"
      />

      <div className="mobile-landing__footer-info">
        <div className="mobile-landing__footer-about mobile-landing__reveal-up mobile-landing__reveal-delay-1">
          <img
            src="/assets/logo/go-plip-black-gray.svg"
            alt="Go Plip"
            className="mobile-landing__footer-logo"
          />
          <p className="mobile-landing__footer-about-copy">
            {"Catálogo de promociones y sistema de recompensas por canjearlas y referir."}
          </p>
        </div>

        <div className="mobile-landing__footer-legal mobile-landing__reveal-up mobile-landing__reveal-delay-2">
          <div className="mobile-landing__footer-legal-links">
            <button
              type="button"
              onClick={() =>
                trackAndNavigate({
                  linkId: "footer_terms",
                  targetPath: "/ayuda/es/articulo/terminos",
                  surface: "footer_legal",
                  label: "Términos",
                })}
            >
              {"Términos"}
            </button>
            <span>-</span>
            <button
              type="button"
              onClick={() =>
                trackAndNavigate({
                  linkId: "footer_privacy",
                  targetPath: "/ayuda/es/articulo/privacidad",
                  surface: "footer_legal",
                  label: "Privacidad",
                })}
            >
              Privacidad
            </button>
          </div>
          <div className="mobile-landing__footer-copyright">
            {"© 2026 GoPlip. Todos los derechos reservados."}
          </div>
        </div>
      </div>
    </footer>
  );
}
