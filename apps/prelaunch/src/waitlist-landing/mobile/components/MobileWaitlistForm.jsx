import { Link } from "react-router-dom";
import { asset } from "../mobileWaitlistLandingAssets";

export default function MobileWaitlistForm({
  email,
  onEmailChange,
  honeypot,
  onHoneypotChange,
  onSubmit,
  status = "idle",
  errorMessage = "",
}) {
  const isLoading = status === "loading";

  return (
    <form className="mobile-landing__waitlist-form" onSubmit={onSubmit}>
      <label className="mobile-landing__waitlist-honeypot" htmlFor="mobile-waitlist-company">
        Empresa
        <input
          id="mobile-waitlist-company"
          type="text"
          name="company"
          autoComplete="off"
          tabIndex={-1}
          value={honeypot}
          onChange={(event) => onHoneypotChange?.(event.target.value)}
        />
      </label>

      <div className="mobile-landing__waitlist-email-wrap">
        <input
          type="email"
          value={email}
          onChange={(event) => onEmailChange?.(event.target.value)}
          placeholder="Tu correo electrónico..."
          className="mobile-landing__waitlist-email-input"
          autoComplete="email"
          aria-label="Correo electrónico para lista de espera"
          aria-invalid={status === "error" ? "true" : "false"}
        />
      </div>

      <div className="mobile-landing__green-button-wrap">
        <img
          className="mobile-landing__green-button-glow"
          src={asset("green-button-glow.png")}
          alt=""
        />
        <button type="submit" className="mobile-landing__green-button" disabled={isLoading}>
          <span>{isLoading ? "Enviando..." : "Añadir correo a la lista"}</span>
        </button>
      </div>

      {errorMessage ? (
        <p className="mobile-landing__waitlist-feedback" role="status" aria-live="polite">
          {errorMessage}
        </p>
      ) : null}

      <p className="mobile-landing__legal-copy">
        <span>Al suscribirte, aceptas los </span>
        <Link className="mobile-landing__legal-copy-link" to="/ayuda/es/articulo/terminos">
          términos y condiciones,
        </Link>
        <span> además de las </span>
        <Link className="mobile-landing__legal-copy-link" to="/ayuda/es/articulo/privacidad">
          Políticas de Privacidad
        </Link>
      </p>
    </form>
  );
}
