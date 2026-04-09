import { useRef } from "react";
import useSectionAssetsReady from "../../../performance/useSectionAssetsReady";
import "./MobileWaitlistStepsSection.css";
import { steps } from "../mobileWaitlistLandingContent";
import MobilePhoneSection from "../components/MobilePhoneSection";
import MobileStepCard from "../components/MobileStepCard";

export default function MobileWaitlistStepsSection({ isTabletHeroLayout }) {
  const aboutBlockRef = useRef(null);
  const isSectionReady = useSectionAssetsReady(aboutBlockRef, [isTabletHeroLayout]);

  return (
    <div className="mobile-landing__second-section">
      {!isTabletHeroLayout ? (
        <MobilePhoneSection showDisclaimer />
      ) : null}

      <section
        ref={aboutBlockRef}
        className="mobile-landing__about-block prelaunch-section-gated"
        id="waitlist-steps"
        data-section-ready={isSectionReady ? "true" : "false"}
      >
        <div className="mobile-landing__about-heading mobile-landing__reveal-up">
          <h2 className="mobile-landing__about-title">
            <span>{"Así de "}</span>
            <strong>{"rápido y simple"}</strong>
          </h2>
          <p className="mobile-landing__about-copy">
            {"Entra en la lista de espera para recibir tu invitación."}
            <br />
            {"Descarga la app una vez esté disponible y recibe beneficios."}
          </p>
        </div>

        <div className="mobile-landing__steps">
          {steps.map((step, index) => (
            <MobileStepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
