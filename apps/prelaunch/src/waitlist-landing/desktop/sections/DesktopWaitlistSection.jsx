import { useRef } from "react";
import useSectionAssetsReady from "../../../performance/useSectionAssetsReady";
import "./DesktopWaitlistBottomSection.css";
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
  const sectionRef = useRef(null);
  const isSectionReady = useSectionAssetsReady(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="figma-prototype__waitlist prelaunch-section-gated"
      data-section-ready={isSectionReady ? "true" : "false"}
    >
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
