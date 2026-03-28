import { useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../mobileWaitlistLandingAssets";

export default function MobileWaitlistForm({ onAddEmailClick }) {
  const [waitlistEmail, setWaitlistEmail] = useState("");

  return (
    <div className="mobile-landing__waitlist-form">
      <div className="mobile-landing__waitlist-email-wrap">
        <input
          type="email"
          value={waitlistEmail}
          onChange={(event) => setWaitlistEmail(event.target.value)}
          placeholder={"Tu correo electr\u00f3nico..."}
          className="mobile-landing__waitlist-email-input"
        />
      </div>

      <div className="mobile-landing__green-button-wrap">
        <img
          className="mobile-landing__green-button-glow"
          src={asset("green-button-glow.png")}
          alt=""
        />
        <button
          type="button"
          className="mobile-landing__green-button"
          onClick={() => onAddEmailClick?.()}
        >
          <span>{"A\u00f1adir correo a la lista"}</span>
        </button>
      </div>

      <p className="mobile-landing__legal-copy">
        {"Al suscribirte, aceptas los "}
        <Link to="/ayuda/es/articulo/terminos">{"t\u00e9rminos y condiciones,"}</Link>
        {" adem\u00e1s de las "}
        <Link to="/ayuda/es/articulo/privacidad">{"Pol\u00edticas de Privacidad"}</Link>
      </p>
    </div>
  );
}
