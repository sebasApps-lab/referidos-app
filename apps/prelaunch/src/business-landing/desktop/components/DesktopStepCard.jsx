export default function DesktopStepCard({ step }) {
  return (
    <article className={`business-landing__benefit-card business-landing__benefit-card--${step.key}`}>
      <img className="business-landing__step-number-badge" src={step.numberSrc} alt="" />

      <div className="business-landing__step-card-body">
        <div className="business-landing__benefit-shadow" aria-hidden="true" />

        <div className="business-landing__benefit-surface">
          <h3 className="business-landing__benefit-title-content">{step.title}</h3>
          <p className="business-landing__benefit-description">{step.description}</p>
        </div>

        <div className="business-landing__benefit-gloss" aria-hidden="true" />

        <div className={`business-landing__benefit-icon business-landing__benefit-icon--${step.key}`} aria-hidden="true">
          <img className="business-landing__benefit-icon-shadow" src={step.shadowSrc} alt="" />
          <img className="business-landing__benefit-icon-image" src={step.iconSrc} alt="" loading="lazy" />
        </div>
      </div>
    </article>
  );
}

