export default function MobileStepCard({ step }) {
  return (
    <div className="mobile-landing__step-card-shell">
      <article className={step.wrapClassName}>
        <img className="mobile-landing__step-number-badge" src={step.numberSrc} alt="" />
        <div className="mobile-landing__step-card-body">
          {step.iconShadowSrc ? (
            <img className={step.iconShadowClassName} src={step.iconShadowSrc} alt="" />
          ) : (
            <div className={step.iconShadowClassName} />
          )}
          <img className={step.iconClassName} src={step.iconSrc} alt="" />
          <div className="mobile-landing__step-card-surface">
            <p className="mobile-landing__step-title">{step.title}</p>
            <p className="mobile-landing__step-description">{step.description}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
