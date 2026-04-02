import { Link } from "react-router-dom";

export default function DesktopWaitlistForm({
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
    <form className="figma-prototype__waitlist-form" onSubmit={onSubmit}>
      <label className="figma-prototype__waitlist-honeypot" htmlFor="desktop-waitlist-company">
        Empresa
        <input
          id="desktop-waitlist-company"
          type="text"
          name="company"
          autoComplete="off"
          tabIndex={-1}
          value={honeypot}
          onChange={(event) => onHoneypotChange?.(event.target.value)}
        />
      </label>

      <div className="figma-prototype__waitlist-inputRow">
        <input
          type="email"
          value={email}
          onChange={(event) => onEmailChange?.(event.target.value)}
          placeholder="Tu correo electrónico"
          autoComplete="email"
          aria-label="Correo electrónico para lista de espera"
          aria-invalid={status === "error" ? "true" : "false"}
        />

        <div className="figma-prototype__waitlist-buttonWrap">
          <button type="submit" disabled={isLoading}>
            <span className="figma-prototype__waitlist-buttonLabel">
              {isLoading ? "Enviando..." : "Añadir correo"}
            </span>
          </button>
          <span className="figma-prototype__waitlist-buttonGlow" aria-hidden="true" />
        </div>
      </div>

      {errorMessage ? (
        <p
          className="figma-prototype__waitlist-feedback figma-prototype__waitlist-feedback--error"
          role="status"
          aria-live="polite"
        >
          {errorMessage}
        </p>
      ) : null}

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
    </form>
  );
}
