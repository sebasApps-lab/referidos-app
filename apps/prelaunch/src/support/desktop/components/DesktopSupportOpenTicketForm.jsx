import {
  ECUADOR_FLAG_SVG_URL,
  SUPPORT_FORM_MAIL_ICON_URL,
  SUPPORT_FORM_WHATSAPP_ICON_URL,
} from "../../supportOpenTicketShared";

export default function DesktopSupportOpenTicketForm({ controller }) {
  return (
    <section className="support-open-ticket__card">
      <form className="support-open-ticket__form" onSubmit={controller.handleSubmit}>
        <div className="support-open-ticket__field">
          <label htmlFor="support-name">Nombre</label>
          <input
            id="support-name"
            type="text"
            value={controller.name}
            onChange={(event) => controller.setName(event.target.value)}
            placeholder="Ingresa tu nombre..."
          />
        </div>

        <div className="support-open-ticket__field">
          <label htmlFor="support-email">{"Correo electr\u00f3nico"}</label>
          <input
            id="support-email"
            type="email"
            autoComplete="email"
            value={controller.email}
            onChange={(event) => controller.setEmail(event.target.value)}
            placeholder={"Ingresa tu correo electr\u00f3nico..."}
          />
        </div>

        <div className="support-open-ticket__field">
          <label htmlFor="support-phone">{"N\u00famero de tel\u00e9fono"}</label>
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
              id="support-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={controller.phone}
              onChange={(event) => controller.setPhone(event.target.value)}
              placeholder={"Ingresa tu n\u00famero de tel\u00e9fono..."}
            />
          </div>
        </div>

        <div className="support-open-ticket__field">
          <label htmlFor="support-category">{"Categor\u00eda"}</label>
          <div className="support-open-ticket__select-wrap">
            <select
              id="support-category"
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
                <img src={SUPPORT_FORM_MAIL_ICON_URL} alt="" aria-hidden="true" />
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

        <div className="support-open-ticket__submit-row">
          <button
            type="submit"
            className="support-open-ticket__submit"
            disabled={!controller.canSubmit}
          >
            {controller.submitting ? "Enviando..." : "Enviar mensaje"}
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
