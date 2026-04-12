import { Link } from "react-router-dom";
import { useState } from "react";

export default function DesktopWaitlistForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="business-landing__waitlist-form">
      <div className="business-landing__waitlist-inputRow">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Tu correo electronico"
        />

        <div className="business-landing__waitlist-buttonWrap">
          <button type="button">
            <span className="business-landing__waitlist-buttonLabel">Anadir correo</span>
          </button>
          <span className="business-landing__waitlist-buttonGlow" aria-hidden="true" />
        </div>
      </div>

      <p className="business-landing__waitlist-legal">
        <span>Al suscribirte, aceptas los </span>
        <Link
          className="business-landing__waitlist-legal-link"
          to="/ayuda/es/articulo/terminos-condiciones-lista"
        >
          terminos y condiciones
        </Link>
        <span>, ademas de las </span>
        <Link
          className="business-landing__waitlist-legal-link"
          to="/ayuda/es/articulo/politicas-privacidad-lista"
        >
          Politicas de Privacidad
        </Link>
      </p>
    </div>
  );
}
