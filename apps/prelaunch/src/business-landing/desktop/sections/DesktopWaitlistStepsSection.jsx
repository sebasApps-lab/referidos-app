import { desktopSteps } from "../desktopWaitlistLandingContent";
import DesktopStepCard from "../components/DesktopStepCard";

export default function DesktopWaitlistStepsSection() {
  return (
    <section className="business-landing__benefits" id="waitlist-steps">
      <div className="business-landing__benefits-inner">
        <div className="business-landing__benefits-heading">
          <div className="business-landing__benefits-title">
            <span>Así de</span>
            <strong>rápido y simple</strong>
          </div>

          <p>
            <span>
              Entra en la lista de espera para recibir tu invitación, descarga la app una vez
              este disponible y{" "}
            </span>
            <span className="business-landing__benefits-heading-regular">recibe beneficios</span>
            <span className="business-landing__benefits-heading-strong">!</span>
          </p>
        </div>

        <div className="business-landing__benefit-grid">
          {desktopSteps.map((step) => (
            <DesktopStepCard key={step.key} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

