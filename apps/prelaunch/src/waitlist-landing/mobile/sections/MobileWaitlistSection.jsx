import MobileMockupSteps from "../components/MobileMockupSteps";
import MobileWaitlistForm from "../components/MobileWaitlistForm";

export default function MobileWaitlistSection({
  email,
  honeypot,
  status,
  errorMessage,
  onEmailChange,
  onHoneypotChange,
  onSubmit,
}) {
  return (
    <section className="mobile-landing__waitlist" id="waitlist-bottom">
      <div className="mobile-landing__waitlist-heading mobile-landing__reveal-up">
        <h2 className="mobile-landing__waitlist-title">No te quedes sin tu invitación</h2>
        <div className="mobile-landing__waitlist-form-block" id="waitlist-invitation-form">
          <p className="mobile-landing__waitlist-copy">
            Los puestos son limitados, entra en la lista de espera
          </p>

          <MobileWaitlistForm
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

      <div className="mobile-landing__promo-section mobile-landing__reveal-up mobile-landing__reveal-delay-2">
        <h2 className="mobile-landing__promo-heading">
          <span className="mobile-landing__promo-heading-first-line">
            <span className="mobile-landing__promo-heading-prefix">¡Empieza en </span>
            <strong className="mobile-landing__promo-heading-emphasis">3 simples </strong>
          </span>
          <strong className="mobile-landing__promo-heading-break">pasos!</strong>
        </h2>

        <MobileMockupSteps className="mobile-landing__reveal-up mobile-landing__reveal-delay-3" />
      </div>
    </section>
  );
}
