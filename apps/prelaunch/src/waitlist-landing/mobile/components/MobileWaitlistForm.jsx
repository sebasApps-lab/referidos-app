import { useState } from "react";
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
        <span>{"t\u00e9rminos y condiciones,"}</span>
        {" adem\u00e1s de las "}
        <span>{"Pol\u00edticas de Privacidad"}</span>
      </p>
    </div>
  );
}
