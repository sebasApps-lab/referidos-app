import {
  ECUADOR_FLAG_SVG_URL,
  SUPPORT_FORM_WHATSAPP_ICON_URL,
} from "../../supportOpenTicketShared";

export default function MobileSupportOpenTicketForm({ controller }) {
  return (
    <section className="support-open-ticket__card">
      <form className="support-open-ticket__form" onSubmit={controller.handleSubmit}>
        <div className="support-open-ticket__field support-open-ticket__field--plain">
          <div className="support-open-ticket__text-shell">
            <input
              id="support-name-mobile"
              type="text"
              value={controller.name}
              onChange={(event) => controller.setName(event.target.value)}
              placeholder="Nombre.."
            />
          </div>
        </div>

        <div className="support-open-ticket__field support-open-ticket__field--plain">
          <div className="support-open-ticket__text-shell">
            <input
              id="support-email-mobile"
              type="email"
              autoComplete="email"
              value={controller.email}
              onChange={(event) => controller.setEmail(event.target.value)}
              placeholder={"Correo electr\u00f3nico..."}
            />
          </div>
        </div>

        <div className="support-open-ticket__field support-open-ticket__field--plain">
          <div className="support-open-ticket__phone-row">
            <div className="support-open-ticket__country-box">
              <img
                className="support-open-ticket__country-flag"
                src={ECUADOR_FLAG_SVG_URL}
                alt="Bandera de Ecuador"
                loading="lazy"
              />
              <span>+593</span>
            </div>

            <input
              id="support-phone-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={controller.phone}
              onChange={(event) => controller.setPhone(event.target.value)}
              placeholder={"Tel\u00e9fono..."}
            />
          </div>
        </div>

        <div className="support-open-ticket__field">
          <label htmlFor="support-category-mobile">{"Categor\u00eda"}</label>
          <div className="support-open-ticket__select-wrap">
            <select
              id="support-category-mobile"
              value={controller.category}
              onChange={(event) => controller.setCategory(event.target.value)}
              disabled={controller.categoriesLoading}
            >
              {controller.categoryOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <span className="support-open-ticket__select-chevron" aria-hidden="true">
              {"\u25be"}
            </span>
          </div>
        </div>

        <div className="support-open-ticket__field support-open-ticket__field--method">
          <span className="support-open-ticket__method-label">
            {"\u00bfC\u00f3mo prefieres recibir soporte?"}
          </span>

          <div className="support-open-ticket__method-options">
            <button
              type="button"
              className={`support-open-ticket__method-option ${
                controller.preferredChannel === "email" ? "is-active" : ""
              }`}
              onClick={() => controller.setPreferredChannel("email")}
            >
              <span className="support-open-ticket__method-icon support-open-ticket__method-icon--email">
                <MailMethodIcon />
              </span>
              <span>{"Correo electr\u00f3nico"}</span>
            </button>

            <button
              type="button"
              className={`support-open-ticket__method-option ${
                controller.preferredChannel === "whatsapp" ? "is-active" : ""
              }`}
              onClick={() => controller.setPreferredChannel("whatsapp")}
            >
              <span className="support-open-ticket__method-icon support-open-ticket__method-icon--whatsapp">
                <img src={SUPPORT_FORM_WHATSAPP_ICON_URL} alt="" aria-hidden="true" />
              </span>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {controller.isOtherCategorySelected ? (
          <div className="support-open-ticket__field support-open-ticket__field--plain">
            <div className="support-open-ticket__text-shell support-open-ticket__text-shell--textarea">
              <textarea
                id="support-description-mobile"
                value={controller.description}
                onChange={(event) => controller.setDescription(event.target.value)}
                placeholder="Descripción (Opcional)"
                rows={4}
              />
            </div>
          </div>
        ) : null}

        <div className="support-open-ticket__submit-row">
          <p className="support-open-ticket__submit-copy">
            Se creará un ticket para que un asesor se ponga en contacto contigo
          </p>
          <button
            type="submit"
            className="support-open-ticket__submit"
            disabled={!controller.canSubmit}
          >
            {controller.submitting ? "Creando ticket..." : "Crear ticket"}
          </button>
        </div>

        {controller.error ? (
          <p className="support-open-ticket__message is-error">{controller.error}</p>
        ) : null}
        {controller.success ? (
          <p className="support-open-ticket__message is-success">{controller.success}</p>
        ) : null}
      </form>
    </section>
  );
}

function MailMethodIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="support-open-ticket__mail-icon-body"
        d="M4.75 7.75h14.5v8.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2z"
      />
      <path
        className="support-open-ticket__mail-icon-flap"
        d="M4.75 8.25 12 13l7.25-4.75"
      />
    </svg>
  );
}
