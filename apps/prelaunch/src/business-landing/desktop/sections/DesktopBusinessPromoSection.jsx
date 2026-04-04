import qrCodeIcon from "../../../assets/shared/qr-code.svg";
import supportMailIcon from "../../../assets/support/fluent-color-mail-16.svg";

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
                  Ã¢Å“â€œ
                </span>
                <span>Recibe pagos y nuevos clientes al instante.</span>
              </li>
              <li>
                <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                  Ã¢Å“â€œ
                </span>
                <span>Analiza mÃƒÂ©tricas detalladas y optimiza tus campaÃƒÂ±as.</span>
              </li>
            </ul>
          </div>

          <div className="business-landing__promo-signup" id="waitlist-steps">
            <div className="business-landing__promo-email-field" aria-label="Tu correo electrÃƒÂ³nico">
              <img src={supportMailIcon} alt="" aria-hidden="true" />
              <span>Tu correo electrÃƒÂ³nico</span>
            </div>

            <div className="business-landing__promo-signup-row">
              <p>
                Prueba gratis: Sin tarjeta de crÃƒÂ©dito.
                <br />
                Sin compromiso.
              </p>
              <button type="button">Empieza gratis</button>
            </div>
          </div>

          <ul className="business-landing__promo-summary-list">
            <li>
              <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                Ã¢Å“â€œ
              </span>
              <span>Crea promociones exclusivas y personalizables.</span>
            </li>
            <li>
              <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                Ã¢Å“â€œ
              </span>
              <span>Recibe pagos y nuevos clientes al instante.</span>
            </li>
            <li>
              <span className="business-landing__promo-bullet-icon" aria-hidden="true">
                Ã¢Å“â€œ
              </span>
              <span>Analiza mÃƒÂ©tricas detalladas y optimiza tus campaÃƒÂ±as.</span>
            </li>
          </ul>
        </div>

        <aside className="business-landing__promo-qr-card" aria-label="Escanea y descarga la app">
          <h3>Escanea y descarga la app</h3>

          <div className="business-landing__promo-qr-frame">
            <img src={qrCodeIcon} alt="CÃƒÂ³digo QR para descargar la app" />
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
