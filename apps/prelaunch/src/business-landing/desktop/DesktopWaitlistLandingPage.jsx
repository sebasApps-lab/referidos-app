import { useEffect, useState } from "react";
import "./desktopWaitlistLanding.css";
import DesktopNavigationHeader from "./components/DesktopNavigationHeader";
import DesktopFooterSection from "./sections/DesktopFooterSection";
import DesktopBusinessPromoSection from "./sections/DesktopBusinessPromoSection";
import DesktopHeroSection from "./sections/DesktopHeroSection";

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

  useEffect(() => {
    function handleResize() {
      setFooterColumnsScale(getFooterColumnsScale());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className="business-landing"
      aria-label="Business landing prototype"
      style={{ "--figma-footer-columns-scale": footerColumnsScale }}
    >
      <div className="business-landing__shell">
        <section className="business-landing__hero-band">
          <DesktopNavigationHeader />
          <DesktopHeroSection />
        </section>
        <section className="business-landing__bottom-band" id="waitlist-bottom">
          <DesktopBusinessPromoSection />
          <DesktopFooterSection />
        </section>
      </div>
    </main>
  );
}

