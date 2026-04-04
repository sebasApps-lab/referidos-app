import { useState } from "react";
import purpleButtonGlow from "../../../assets/landing/bottom/purple-button-glow.png";

export default function MobileContactForm({ onFeedbackClick, onHelpClick, onLinkClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="mobile-landing__contact-form">
      <div className="mobile-landing__contact-copy-block">
        <p className="mobile-landing__contact-copy">
          Tus ideas y opiniones son muy valiosas para nosotros, no dudes en escribirnos.
        </p>
        <p className="mobile-landing__contact-copy">
          Si necesitas ayuda, usa el siguiente{" "}
          <button
            type="button"
            className="mobile-landing__contact-help-link"
            onClick={() => {
              onLinkClick?.({
                linkId: "contact_help_link",
                targetPath: "/ayuda/es",
                targetKind: "internal",
                surface: "contact_block",
                label: "enlace",
              });
              onHelpClick?.();
            }}
          >
            enlace
          </button>
          .
        </p>
      </div>

      <div className="mobile-landing__contact-fields">
        <div className="mobile-landing__contact-input-wrap">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre..."
            className="mobile-landing__contact-input"
          />
        </div>

        <div className="mobile-landing__contact-input-wrap">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Correo electrónico..."
            className="mobile-landing__contact-input"
          />
        </div>

        <div className="mobile-landing__contact-textarea-wrap">
          <textarea
            value={message}
            onChange={(event) => {
              if (event.target.value.length <= 200) {
                setMessage(event.target.value);
              }
            }}
            placeholder="Mensaje..."
            className="mobile-landing__contact-textarea"
            maxLength={200}
          />
          <div className="mobile-landing__contact-counter">{message.length} / 200</div>
        </div>
      </div>

      <div className="mobile-landing__purple-button-wrap">
        <img
          className="mobile-landing__purple-button-glow"
          src={purpleButtonGlow}
          alt=""
        />
        <button
          type="button"
          className="mobile-landing__purple-button"
          onClick={() => {
            onLinkClick?.({
              linkId: "contact_feedback_button",
              targetPath: "/feedback?origin=cliente",
              targetKind: "internal",
              surface: "contact_block",
              label: "Enviar mensaje",
            });
            onFeedbackClick({
              name,
              email,
              message,
              sourceSurface: "landing_mobile_contact_block",
            });
          }}
        >
          <span>Enviar mensaje</span>
        </button>
      </div>
    </div>
  );
}
