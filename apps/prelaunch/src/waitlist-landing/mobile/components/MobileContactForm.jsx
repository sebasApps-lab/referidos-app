import { useState } from "react";
import { asset } from "../mobileWaitlistLandingAssets";

export default function MobileContactForm() {
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
          Si necesitas ayuda, usa el siguiente <span>enlace</span>.
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
            placeholder={"Correo electr\u00f3nico"}
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
          src={asset("purple-button-glow.png")}
          alt=""
        />
        <button type="button" className="mobile-landing__purple-button">
          <span>Enviar mensaje</span>
        </button>
      </div>
    </div>
  );
}
