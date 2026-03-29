import { desktopSteps } from "../desktopWaitlistLandingContent";
import DesktopStepCard from "../components/DesktopStepCard";

export default function DesktopWaitlistStepsSection() {
  return (
    <section className="figma-prototype__benefits" id="waitlist-steps">
      <div className="figma-prototype__benefits-inner">
        <div className="figma-prototype__benefits-heading figma-prototype__entry-fade-up figma-prototype__entry-delay-2">
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
