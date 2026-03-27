import { useEffect, useState } from "react";
import "./desktopWaitlistLanding.css";
import "./DesktopLandingModals.css";
import DesktopBusinessInterestModal from "./components/DesktopBusinessInterestModal";
import DesktopCongratsModal from "./components/DesktopCongratsModal";
import DesktopNavigationHeader from "./components/DesktopNavigationHeader";
import DesktopPlatformModal from "./components/DesktopPlatformModal";
import DesktopWhoWeAreModal from "./components/DesktopWhoWeAreModal";
import DesktopFooterSection from "./sections/DesktopFooterSection";
import DesktopHeroSection from "./sections/DesktopHeroSection";
import DesktopWaitlistSection from "./sections/DesktopWaitlistSection";
import DesktopWaitlistStepsSection from "./sections/DesktopWaitlistStepsSection";

function getFooterColumnsScale() {
  if (typeof window === "undefined") {
    return 1;
  }

  if (window.innerWidth >= 850) {
    return 1;
  }

  if (window.innerWidth <= 700) {
    return 0.72;
  }

  return 0.72 + ((window.innerWidth - 700) / 150) * 0.28;
}

export default function DesktopWaitlistLandingPage() {
  const [footerColumnsScale, setFooterColumnsScale] = useState(() =>
    getFooterColumnsScale(),
  );
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    function handleResize() {
      setFooterColumnsScale(getFooterColumnsScale());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="figma-prototype"
      aria-label="Figma prototype v2"
      style={{ "--figma-footer-columns-scale": footerColumnsScale }}
    >
      <div className="figma-prototype__shell">
        <section className="figma-prototype__hero-band">
          <DesktopNavigationHeader onBusinessClick={() => setActiveModal("business-interest")} />
          <DesktopHeroSection />
        </section>
        <DesktopWaitlistStepsSection />
        <section className="figma-prototype__bottom-band" id="waitlist-bottom">
          <DesktopWaitlistSection onAddEmailClick={() => setActiveModal("congrats")} />
          <DesktopFooterSection
            onPlatformClick={() => setActiveModal("platform")}
            onWhoWeAreClick={() => setActiveModal("team")}
          />
        </section>
      </div>

      <DesktopBusinessInterestModal
        isOpen={activeModal === "business-interest"}
        onClose={() => setActiveModal(null)}
      />
      <DesktopPlatformModal
        isOpen={activeModal === "platform"}
        onClose={() => setActiveModal(null)}
      />
      <DesktopWhoWeAreModal
        isOpen={activeModal === "team"}
        onClose={() => setActiveModal(null)}
      />
      <DesktopCongratsModal
        isOpen={activeModal === "congrats"}
        onClose={() => setActiveModal(null)}
      />
    </main>
  );
}
