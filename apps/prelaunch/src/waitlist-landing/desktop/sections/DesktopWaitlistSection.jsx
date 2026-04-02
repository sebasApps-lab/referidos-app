import DesktopMockupSteps from "../components/DesktopMockupSteps";
import DesktopWaitlistForm from "../components/DesktopWaitlistForm";

export default function DesktopWaitlistSection({
  email,
  honeypot,
  status,
  errorMessage,
  onEmailChange,
  onHoneypotChange,
  onSubmit,
}) {
  return (
    <section className="figma-prototype__waitlist">
      <div className="figma-prototype__waitlist-bg" aria-hidden="true" />
      <div className="figma-prototype__waitlist-glow" aria-hidden="true">
        <img src="/assets/glow-bottom-section.svg" alt="" />
      </div>

      <div className="figma-prototype__waitlist-content">
        <div className="figma-prototype__waitlist-copy figma-prototype__reveal-left">
          <p className="figma-prototype__waitlist-title">No te quedes sin un puesto para participar</p>

          <div className="figma-prototype__waitlist-copy-stack">
            <p className="figma-prototype__waitlist-subtitle">
              Los puestos son limitados, entra en la lista de espera
            </p>

            <DesktopWaitlistForm
              email={email}
              honeypot={honeypot}
              status={status}
              errorMessage={errorMessage}
              onEmailChange={onEmailChange}
              onHoneypotChange={onHoneypotChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>

        <DesktopMockupSteps className="figma-prototype__reveal-right figma-prototype__reveal-delay-1" />
      </div>
    </section>
  );
}
