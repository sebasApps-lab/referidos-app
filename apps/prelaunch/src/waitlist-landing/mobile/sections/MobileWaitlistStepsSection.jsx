import { steps } from "../mobileWaitlistLandingContent";
import MobilePhoneSection from "../components/MobilePhoneSection";
import MobileStepCard from "../components/MobileStepCard";

export default function MobileWaitlistStepsSection({ isTabletHeroLayout, phoneGlowFilterId }) {
  return (
    <div className="mobile-landing__second-section">
      {!isTabletHeroLayout ? (
        <MobilePhoneSection phoneGlowFilterId={phoneGlowFilterId} />
      ) : null}

      <section className="mobile-landing__about-block" id="waitlist-steps">
        <div className="mobile-landing__about-heading">
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
          {steps.map((step) => (
            <MobileStepCard key={step.id} step={step} />
          ))}
        </div>
      </section>
    </div>
  );
}
