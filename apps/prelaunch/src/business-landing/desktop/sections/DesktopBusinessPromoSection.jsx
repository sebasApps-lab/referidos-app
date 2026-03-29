export default function DesktopBusinessPromoSection() {
  return (
    <section className="business-landing__promo-section">
      <div className="business-landing__promo-layout">
        <div className="business-landing__promo-copy">
          <div className="business-landing__promo-copy-top">
            <h2 className="business-landing__promo-title">
              Crea promociones exclusivas
              <br />y personalizables.
            </h2>

            <ul className="business-landing__promo-bullet-list">
              <li>
                <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                  ✓
                </span>
                <span>Recibe pagos y nuevos clientes al instante.</span>
              </li>
              <li>
                <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                  ✓
                </span>
                <span>Analiza métricas detalladas y optimiza tus campañas.</span>
              </li>
            </ul>
          </div>

          <div className="business-landing__promo-signup" id="waitlist-steps">
            <div className="business-landing__promo-email-field" aria-label="Tu correo electrónico">
              <img src="/assets/fluent-color-mail-16.svg" alt="" aria-hidden="true" />
              <span>Tu correo electrónico</span>
            </div>

            <div className="business-landing__promo-signup-row">
              <p>
                Prueba gratis: Sin tarjeta de crédito.
                <br />
                Sin compromiso.
              </p>
              <button type="button">Empieza gratis</button>
            </div>
          </div>

          <ul className="business-landing__promo-summary-list">
            <li>
              <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                ✓
              </span>
              <span>Crea promociones exclusivas y personalizables.</span>
            </li>
            <li>
              <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                ✓
              </span>
              <span>Recibe pagos y nuevos clientes al instante.</span>
            </li>
            <li>
              <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                ✓
              </span>
              <span>Analiza métricas detalladas y optimiza tus campañas.</span>
            </li>
          </ul>
        </div>

        <aside className="business-landing__promo-qr-card" aria-label="Escanea y descarga la app">
          <h3>Escanea y descarga la app</h3>

          <div className="business-landing__promo-qr-frame">
            <img src="/assets/icons/qr-code.svg" alt="Código QR para descargar la app" />
          </div>

          <button type="button" className="business-landing__promo-download-button">
            Descarga Qrew Negocios
          </button>

          <div className="business-landing__promo-store-row">
            <button type="button" className="business-landing__promo-store-button">
              App Store
            </button>
            <button type="button" className="business-landing__promo-store-button">
              Google Play
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
