import iMacPanelPromosMockupBlue from "../../../../../assets/dev/business/iMac-panel-promos-mockup-BLUE.png";

export default function DesktopHeroPhoneShowcase() {
  return (
    <div className="business-landing__hero-visual">
      <div className="business-landing__hero-phone">
        <img
          className="business-landing__hero-phone-device"
          src={iMacPanelPromosMockupBlue}
          alt="Mockup iMac mostrando el panel de promociones para negocios"
          loading="eager"
        />
      </div>
    </div>
  );
}

