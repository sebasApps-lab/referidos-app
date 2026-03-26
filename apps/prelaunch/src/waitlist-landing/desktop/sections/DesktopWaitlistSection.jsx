import DesktopMockupSteps from "../components/DesktopMockupSteps";
import DesktopWaitlistForm from "../components/DesktopWaitlistForm";

export default function DesktopWaitlistSection({ onAddEmailClick }) {
  return (
    <section className="figma-prototype__waitlist">
      <div className="figma-prototype__waitlist-bg" aria-hidden="true" />
      <div className="figma-prototype__waitlist-glow" aria-hidden="true">
        <img src="/assets/glow-bottom-section.svg" alt="" />
      </div>

      <div className="figma-prototype__waitlist-content">
        <div className="figma-prototype__waitlist-copy">
          <p className="figma-prototype__waitlist-title">No te quedes sin un puesto para participar</p>

          <div className="figma-prototype__waitlist-copy-stack">
            <p className="figma-prototype__waitlist-subtitle">
              Los puestos son limitados, entra en la lista de espera
            </p>

            <DesktopWaitlistForm onAddEmailClick={onAddEmailClick} />
          </div>
        </div>

        <DesktopMockupSteps />
      </div>
    </section>
  );
}
