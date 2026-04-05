export default function MobileStepCard({ step, index = 0 }) {
  return (
    <div
      className="mobile-landing__step-card-shell mobile-landing__reveal-up"
      style={{ "--mobile-reveal-delay": `${120 + index * 90}ms` }}
    >
      <article className={step.wrapClassName}>
        <img className="mobile-landing__step-number-badge" src={step.numberSrc} alt="" />
        <div className="mobile-landing__step-card-body">
          {step.iconShadowSrc && step.iconShadowClassName ? (
            <img className={step.iconShadowClassName} src={step.iconShadowSrc} alt="" />
          ) : step.iconShadowClassName ? (
            <div className={step.iconShadowClassName} />
          ) : null}
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
