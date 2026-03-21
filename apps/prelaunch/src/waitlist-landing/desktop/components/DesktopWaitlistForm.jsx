import { useState } from "react";

export default function DesktopWaitlistForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="figma-prototype__waitlist-form">
      <div className="figma-prototype__waitlist-inputRow">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Tu correo electronico"
        />

        <div className="figma-prototype__waitlist-buttonWrap">
          <button type="button">
            <span className="figma-prototype__waitlist-buttonLabel">Añadir correo</span>
          </button>
          <span className="figma-prototype__waitlist-buttonGlow" aria-hidden="true" />
        </div>
      </div>

      <p className="figma-prototype__waitlist-legal">
        <span>Al suscribirte, aceptas los </span>
        <span className="figma-prototype__waitlist-legal-link">términos y condiciones</span>
        <span>, además de las </span>
        <span className="figma-prototype__waitlist-legal-link">Políticas de Privacidad</span>
      </p>
    </div>
  );
}
