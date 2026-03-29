import DesktopMockupSteps from "../components/DesktopMockupSteps";
import DesktopWaitlistForm from "../components/DesktopWaitlistForm";

export default function DesktopWaitlistSection() {
  return (
    <section className="business-landing__waitlist">
      <div className="business-landing__waitlist-bg" aria-hidden="true" />
      <div className="business-landing__waitlist-glow" aria-hidden="true">
        <img src="/assets/glow-bottom-section.svg" alt="" />
      </div>

      <div className="business-landing__waitlist-content">
        <div className="business-landing__waitlist-copy">
          <p className="business-landing__waitlist-title">No te quedes sin un puesto para participar</p>

          <div className="business-landing__waitlist-copy-stack">
            <p className="business-landing__waitlist-subtitle">
              Los puestos son limitados, entra en la lista de espera
            </p>

            <DesktopWaitlistForm />
          </div>
        </div>

        <DesktopMockupSteps />
      </div>
    </section>
  );
}

