import { useId, useState } from "react";
import "../../home/mobileWaitlistLanding.css";
import "./MobileLandingModals.css";
import useMobileWaitlistLandingLayout from "./useMobileWaitlistLandingLayout";
import MobileBottomBackground from "./components/MobileBottomBackground";
import MobileBusinessInterestModal from "./components/MobileBusinessInterestModal";
import MobileCongratsModal from "./components/MobileCongratsModal";
import MobilePlatformModal from "./components/MobilePlatformModal";
import MobileWhoWeAreModal from "./components/MobileWhoWeAreModal";
import MobileContactSection from "./sections/MobileContactSection";
import MobileFooterSection from "./sections/MobileFooterSection";
import MobileHeroSection from "./sections/MobileHeroSection";
import MobileWaitlistSection from "./sections/MobileWaitlistSection";
import MobileWaitlistStepsSection from "./sections/MobileWaitlistStepsSection";

export default function MobileWaitlistLandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const heroClipId = useId().replace(/:/g, "");
  const heroFilterId = useId().replace(/:/g, "");
  const phoneGlowFilterId = useId().replace(/:/g, "");
  const bottomClipId = useId().replace(/:/g, "");
  const { phoneScale, isTabletHeroLayout, stepCardScale } = useMobileWaitlistLandingLayout();

  return (
    <main
      className="mobile-landing"
      aria-label="Mobile waitlist landing"
      style={{
        "--mobile-phone-scale": phoneScale.toFixed(4),
        "--mobile-step-card-scale": stepCardScale.toFixed(4),
      }}
    >
      <section className="mobile-landing__top-page">
        <MobileHeroSection
          heroClipId={heroClipId}
          heroFilterId={heroFilterId}
          isTabletHeroLayout={isTabletHeroLayout}
          phoneGlowFilterId={phoneGlowFilterId}
          onBusinessClick={() => setActiveModal("business-interest")}
        />
        <MobileWaitlistStepsSection
          isTabletHeroLayout={isTabletHeroLayout}
          phoneGlowFilterId={phoneGlowFilterId}
        />
      </section>

      <section className="mobile-landing__features-contact">
        <MobileBottomBackground bottomClipId={bottomClipId} />

        <div className="mobile-landing__features-contact-inner">
          <MobileWaitlistSection onAddEmailClick={() => setActiveModal("congrats")} />
          <MobileContactSection />
        </div>

        <MobileFooterSection
          onBusinessClick={() => setActiveModal("business-interest")}
          onPlatformClick={() => setActiveModal("platform")}
          onWhoWeAreClick={() => setActiveModal("team")}
        />
      </section>

      <MobileBusinessInterestModal
        isOpen={activeModal === "business-interest"}
        onClose={() => setActiveModal(null)}
      />
      <MobilePlatformModal
        isOpen={activeModal === "platform"}
        onClose={() => setActiveModal(null)}
      />
      <MobileWhoWeAreModal
        isOpen={activeModal === "team"}
        onClose={() => setActiveModal(null)}
      />
      <MobileCongratsModal
        isOpen={activeModal === "congrats"}
        onClose={() => setActiveModal(null)}
      />
    </main>
  );
}
