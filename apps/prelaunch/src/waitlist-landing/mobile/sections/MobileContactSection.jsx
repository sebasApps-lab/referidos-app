import MobileContactForm from "../components/MobileContactForm";

export default function MobileContactSection({ onFeedbackClick, onHelpClick, onLinkClick }) {
  return (
    <section className="mobile-landing__contact-section">
      <h2 className="mobile-landing__contact-title mobile-landing__reveal-up">
        {"Déjanos un mensaje"}
      </h2>
      <div className="mobile-landing__reveal-up mobile-landing__reveal-delay-1">
        <MobileContactForm
          onFeedbackClick={onFeedbackClick}
          onHelpClick={onHelpClick}
          onLinkClick={onLinkClick}
        />
      </div>
    </section>
  );
}
