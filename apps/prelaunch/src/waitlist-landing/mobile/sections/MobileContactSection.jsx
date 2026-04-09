import PrelaunchCheckpoint from "../../../observability/PrelaunchCheckpoint";
import "./MobileWaitlistBottomSection.css";
import MobileContactForm from "../components/MobileContactForm";

export default function MobileContactSection({ onFeedbackClick, onHelpClick, onLinkClick }) {
  return (
    <section className="mobile-landing__contact-section">
      <PrelaunchCheckpoint id="contact_block_start" order={40} surface="contact_block" />
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
      <PrelaunchCheckpoint id="contact_block_end" order={49} surface="contact_block" position="end" />
    </section>
  );
}
