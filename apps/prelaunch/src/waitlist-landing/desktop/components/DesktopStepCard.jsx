export default function DesktopStepCard({ step, index = 0 }) {
  return (
    <article
      className={`figma-prototype__benefit-card figma-prototype__benefit-card--${step.key} figma-prototype__reveal-up`}
      style={{ "--figma-reveal-delay": `${120 + index * 90}ms` }}
    >
      <img className="figma-prototype__step-number-badge" src={step.numberSrc} alt="" />

      <div className="figma-prototype__step-card-body">
        <div className="figma-prototype__benefit-shadow" aria-hidden="true" />

        <div className="figma-prototype__benefit-surface">
          <h3 className="figma-prototype__benefit-title-content">{step.title}</h3>
          <p className="figma-prototype__benefit-description">{step.description}</p>
        </div>

        <div className="figma-prototype__benefit-gloss" aria-hidden="true" />

        <div
          className={`figma-prototype__benefit-icon figma-prototype__benefit-icon--${step.key}`}
          aria-hidden="true"
        >
          <img className="figma-prototype__benefit-icon-shadow" src={step.shadowSrc} alt="" />
          <img
            className="figma-prototype__benefit-icon-image"
            src={step.iconSrc}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
