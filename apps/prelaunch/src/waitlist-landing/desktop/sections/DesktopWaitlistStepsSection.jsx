import { useRef } from "react";
import useSectionAssetsReady from "../../../performance/useSectionAssetsReady";
import "./DesktopWaitlistStepsSection.css";
import { desktopSteps } from "../desktopWaitlistLandingContent";
import DesktopStepCard from "../components/DesktopStepCard";

export default function DesktopWaitlistStepsSection() {
  const sectionRef = useRef(null);
  const isSectionReady = useSectionAssetsReady(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="figma-prototype__benefits prelaunch-section-gated"
      id="waitlist-steps"
      data-section-ready={isSectionReady ? "true" : "false"}
    >
      <div className="figma-prototype__benefits-inner">
        <div className="figma-prototype__benefits-heading figma-prototype__reveal-up">
          <div className="figma-prototype__benefits-title">
            <span>Así de</span>
            <strong>rápido y simple</strong>
          </div>

          <p>
            <span>
              Entra en la lista de espera para recibir tu invitación, descarga la app una vez
              este disponible y{" "}
            </span>
            <span className="figma-prototype__benefits-heading-regular">recibe beneficios</span>
            <span className="figma-prototype__benefits-heading-strong">!</span>
          </p>
        </div>

        <div className="figma-prototype__benefit-grid">
          {desktopSteps.map((step, index) => (
            <DesktopStepCard key={step.key} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
