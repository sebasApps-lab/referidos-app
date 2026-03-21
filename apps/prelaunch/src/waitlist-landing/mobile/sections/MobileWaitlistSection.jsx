import MobileMockupSteps from "../components/MobileMockupSteps";
import MobileWaitlistForm from "../components/MobileWaitlistForm";

export default function MobileWaitlistSection() {
  return (
    <section className="mobile-landing__waitlist">
      <div className="mobile-landing__waitlist-heading">
        <h2 className="mobile-landing__waitlist-title">No te quedes sin tu invitación</h2>
        <div className="mobile-landing__waitlist-form-block">
          <p className="mobile-landing__waitlist-copy">
            Los puestos son limitados, entra en la lista de espera
          </p>

          <MobileWaitlistForm />
        </div>
      </div>

      <div className="mobile-landing__promo-section">
        <h2 className="mobile-landing__promo-heading">
          <span className="mobile-landing__promo-heading-first-line">
            <span className="mobile-landing__promo-heading-prefix">{"\u00a1Empieza en "}</span>
            <strong className="mobile-landing__promo-heading-emphasis">{"3 simples "}</strong>
          </span>
          <strong className="mobile-landing__promo-heading-break">pasos!</strong>
        </h2>

        <MobileMockupSteps />
      </div>
    </section>
  );
}
