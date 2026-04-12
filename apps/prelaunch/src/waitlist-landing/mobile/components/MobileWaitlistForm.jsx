import { Link } from "react-router-dom";
import greenButtonGlow from "../../../assets/landing/bottom/green-button-glow-optimized.webp";
import checkIcon from "../../../assets/modals/lets-icons_check-fill.svg";
import lockIcon from "../../../assets/modals/majesticons_lock.svg";

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
          src={greenButtonGlow}
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
        <Link
          className="mobile-landing__legal-copy-link"
          to="/ayuda/es/articulo/terminos-condiciones-lista"
        >
          términos y condiciones,
        </Link>
        <span> además de las </span>
        <Link
          className="mobile-landing__legal-copy-link"
          to="/ayuda/es/articulo/politicas-privacidad-lista"
        >
          Políticas de Privacidad
        </Link>
      </p>

      <div className="mobile-landing__waitlist-badges" aria-hidden="true">
        <div className="mobile-landing__waitlist-badge">
          <img className="mobile-landing__waitlist-badge-icon" src={checkIcon} alt="" />
          <span>Sin spam.</span>
        </div>
        <div className="mobile-landing__waitlist-badge">
          <img className="mobile-landing__waitlist-badge-lock" src={lockIcon} alt="" />
          <span>Solo usaremos tu correo para esta notificación.</span>
        </div>
      </div>
    </form>
  );
}
