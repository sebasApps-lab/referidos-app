import { useId } from "react";
import "../../home/mobileWaitlistLanding.css";
import useMobileWaitlistLandingLayout from "./useMobileWaitlistLandingLayout";
import MobileBottomBackground from "./components/MobileBottomBackground";
import MobileContactSection from "./sections/MobileContactSection";
import MobileFooterSection from "./sections/MobileFooterSection";
import MobileHeroSection from "./sections/MobileHeroSection";
import MobileWaitlistSection from "./sections/MobileWaitlistSection";
import MobileWaitlistStepsSection from "./sections/MobileWaitlistStepsSection";

export default function MobileWaitlistLandingPage() {
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
        />
        <MobileWaitlistStepsSection
          isTabletHeroLayout={isTabletHeroLayout}
          phoneGlowFilterId={phoneGlowFilterId}
        />
      </section>

      <section className="mobile-landing__features-contact">
        <MobileBottomBackground bottomClipId={bottomClipId} />

        <div className="mobile-landing__features-contact-inner">
          <MobileWaitlistSection />
          <MobileContactSection />
        </div>

        <MobileFooterSection />
      </section>
    </main>
  );
}
