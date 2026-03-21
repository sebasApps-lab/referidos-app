import "../../home/figmaPrototype.css";
import DesktopNavigationHeader from "./components/DesktopNavigationHeader";
import DesktopFooterSection from "./sections/DesktopFooterSection";
import DesktopHeroSection from "./sections/DesktopHeroSection";
import DesktopWaitlistSection from "./sections/DesktopWaitlistSection";
import DesktopWaitlistStepsSection from "./sections/DesktopWaitlistStepsSection";

export default function DesktopWaitlistLandingPage() {
  return (
    <main className="figma-prototype" aria-label="Figma prototype v2">
      <div className="figma-prototype__shell">
        <section className="figma-prototype__hero-band">
          <DesktopNavigationHeader />
          <DesktopHeroSection />
        </section>
        <DesktopWaitlistStepsSection />
        <section className="figma-prototype__bottom-band">
          <DesktopWaitlistSection />
          <DesktopFooterSection />
        </section>
      </div>
    </main>
  );
}
