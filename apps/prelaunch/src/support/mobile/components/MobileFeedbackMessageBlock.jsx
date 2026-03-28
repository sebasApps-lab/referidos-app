export default function MobileFeedbackMessageBlock({ controller }) {
  return (
    <section className="feedback-page__contact-section">
      <h1 className="feedback-page__contact-title">{"D\u00e9janos un mensaje"}</h1>

      <form className="feedback-page__contact-form" onSubmit={controller.handleSubmit}>
        <div className="feedback-page__contact-copy-block">
          <p className="feedback-page__contact-copy">
            Tus ideas y opiniones son muy valiosas para nosotros, no dudes en escribirnos.
          </p>
          <p className="feedback-page__contact-copy">
            Si necesitas ayuda, usa el siguiente <a href="/soporte/abrir-ticket">enlace</a>.
          </p>
        </div>

        <div className="feedback-page__contact-fields">
          <div className="feedback-page__honeypot" aria-hidden="true">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={controller.honeypot}
              onChange={(event) => controller.setHoneypot(event.target.value)}
              placeholder="No llenar"
            />
          </div>

          <div className="feedback-page__contact-input-wrap">
            <input
              type="text"
              value={controller.name}
              onChange={(event) => controller.setName(event.target.value)}
              placeholder="Nombre..."
              className="feedback-page__contact-input"
            />
          </div>

          <div className="feedback-page__contact-input-wrap">
            <input
              type="email"
              value={controller.email}
              onChange={(event) => controller.setEmail(event.target.value)}
              placeholder={"Correo electr\u00f3nico"}
              className="feedback-page__contact-input"
            />
          </div>

          <div className="feedback-page__contact-textarea-wrap">
            <textarea
              value={controller.message}
              onChange={(event) => {
                if (event.target.value.length <= controller.messageMax) {
                  controller.setMessage(event.target.value);
                }
              }}
              placeholder="Mensaje..."
              className="feedback-page__contact-textarea"
              maxLength={controller.messageMax}
            />
            <div className="feedback-page__contact-counter">
              {controller.message.length} / {controller.messageMax}
            </div>
          </div>
        </div>

        <div className="feedback-page__submit-row">
          <button
            type="submit"
            className="feedback-page__submit"
            disabled={!controller.canSubmit}
          >
            {controller.submitting ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>

        {controller.error ? (
          <p className="feedback-page__message feedback-page__message--error">
            {controller.error}
          </p>
        ) : null}
        {controller.success ? (
          <p className="feedback-page__message feedback-page__message--success">
            {controller.success}
          </p>
        ) : null}
      </form>
    </section>
  );
}
