import { useState } from "react";
import { Link } from "react-router-dom";

export default function DesktopWaitlistForm({ onAddEmailClick }) {
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
          <button type="button" onClick={onAddEmailClick}>
            <span className="figma-prototype__waitlist-buttonLabel">Añadir correo</span>
          </button>
          <span className="figma-prototype__waitlist-buttonGlow" aria-hidden="true" />
        </div>
      </div>

      <p className="figma-prototype__waitlist-legal">
        <span>Al suscribirte, aceptas los </span>
        <Link className="figma-prototype__waitlist-legal-link" to="/ayuda/es/articulo/terminos">
          términos y condiciones
        </Link>
        <span>, además de las </span>
        <Link className="figma-prototype__waitlist-legal-link" to="/ayuda/es/articulo/privacidad">
          Políticas de Privacidad
        </Link>
      </p>
    </div>
  );
}
