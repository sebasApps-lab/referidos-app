import React from "react";
import "./negocio-crear-promo.css";

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8.25 18.75h7.5M9 20.25a3 3 0 0 0 6 0M6 9.75a6 6 0 1 1 12 0v4.03l1.24 2.06a.75.75 0 0 1-.64 1.16H5.4a.75.75 0 0 1-.64-1.16L6 13.78V9.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconHelp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.1" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M9.72 9.15a2.52 2.52 0 1 1 4.19 2.67c-.82.72-1.41 1.22-1.41 2.43"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <circle cx="12" cy="16.95" r="1.05" fill="currentColor" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m9.89 3.2.58 1.76a7.84 7.84 0 0 1 3.07 0l.58-1.76 2.07.86-.39 1.8c.48.29.94.65 1.34 1.05l1.76-.57.86 2.06-1.57.98c.13.51.2 1.04.2 1.58 0 .55-.07 1.08-.2 1.59l1.57.98-.86 2.06-1.76-.57c-.4.4-.86.76-1.34 1.05l.39 1.8-2.07.86-.58-1.76a7.84 7.84 0 0 1-3.07 0l-.58 1.76-2.07-.86.39-1.8a8.2 8.2 0 0 1-1.34-1.05l-1.76.57-.86-2.06 1.57-.98A6.7 6.7 0 0 1 5.2 12c0-.54.07-1.07.2-1.58l-1.57-.98.86-2.06 1.76.57c.4-.4.86-.76 1.34-1.05l-.39-1.8 2.07-.86Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="2.85" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconHomeMini() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M3.9 8.6 10 3.95l6.1 4.65"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
      <path
        d="M5.7 8.15v6.2h8.6v-6.2"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1"
      />
      <path
        d="M8.55 14.35v-3.6h2.9v3.6"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
}

function IconTrendUp() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M3.4 13.2 7.2 9.35l2.8 2.8 5.2-5.55"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M12.75 6.6h2.9v2.85"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="m5.5 7.5 4.5 4.5 4.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6 3.25h6.2l2.8 2.8v9.2A1.75 1.75 0 0 1 13.25 17H6.75A1.75 1.75 0 0 1 5 15.25v-10.25A1.75 1.75 0 0 1 6.75 3.25Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12 3.45v3.2h3.2M8 8.7h4.8M8 11.1h4.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 4.5v11M4.5 10h11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconPlane() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="m17 3-7.3 14-1.9-5.8L2 9.3 17 3Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M6.75 6.5v8m3.25-8v8m3.25-8v8M4.5 5.25h11M7.25 3.5h5.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M5.75 5.25h8.5l-.45 10.05a1.5 1.5 0 0 1-1.5 1.43H7.7a1.5 1.5 0 0 1-1.5-1.43L5.75 5.25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconCheck({ color = "currentColor" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.6" fill={color} />
      <path
        d="m6.65 10.1 2.05 2.05 4.65-5.05"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 17.1s5-4.3 5-8.45A5 5 0 0 0 5 8.65c0 4.15 5 8.45 5 8.45Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
      <circle cx="10" cy="8.65" r="1.7" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect
        x="3.25"
        y="4.5"
        width="13.5"
        height="12.25"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M6.5 2.9v3.2M13.5 2.9v3.2M3.6 7.5h12.8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </svg>
  );
}

function IconPurchase() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.8" fill="#6d46e8" />
      <path
        d="M10 5.7a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM5.9 15.1a4.16 4.16 0 0 1 8.2 0"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="1.55"
      />
    </svg>
  );
}

function IconGift() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.8" fill="#6d46e8" />
      <path
        d="M5.7 9.1h8.6v5.2H5.7zM10 6v8.3M5.5 7.25h9M7.7 6.2c0-.8.58-1.45 1.3-1.45.8 0 1.33.76 1 1.46-.25.51-.96 1.04-2.3 1.04Zm4.6 0c0-.8-.58-1.45-1.3-1.45-.8 0-1.33.76-1 1.46.25.51.96 1.04 2.3 1.04Z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function IconDiscount() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.8" fill="#6d46e8" />
      <path
        d="M6.1 10.8 8.3 8.5M7.1 7.2h.01M12.9 12.8h.01M12.35 6.45l1.2 1.2c.33.33.33.86 0 1.2l-4.8 4.8a1.22 1.22 0 0 1-.86.35h-1.94v-1.94c0-.32.13-.63.35-.86l4.8-4.8c.33-.33.86-.33 1.2 0Z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function IconImage() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <rect
        x="12"
        y="10"
        width="56"
        height="56"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.6"
      />
      <circle cx="52" cy="27" r="7.2" fill="none" stroke="currentColor" strokeWidth="4.6" />
      <path
        d="m15.8 53.5 18-18a3.5 3.5 0 0 1 5 0l26.7 26.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.6"
      />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 57 44" aria-hidden="true">
      <defs>
        <linearGradient id="qrew-mark-prueba4" x1="3" x2="46" y1="5" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7f57ff" />
          <stop offset="1" stopColor="#532ce0" />
        </linearGradient>
      </defs>
      <path
        d="M7.1 5.1h16.2c8.44 0 15.2 5.74 15.2 14.04 0 7.02-4.78 12.06-11.54 13.44l9.25 8.18H26.1l-8.96-8.04h6.16c4.6 0 7.92-2.98 7.92-7.18 0-4.28-3.32-7.26-7.92-7.26H11.54l7.74 6.9-3.92 4.4L5.1 20.45v-15.34c0-.01.9-.01 2-.01Z"
        fill="url(#qrew-mark-prueba4)"
      />
      <path
        d="M2.2 9.54h10.72v4.9H7.41v3.83h5.08v4.84H7.41v10.78H2.2V9.54Z"
        fill="url(#qrew-mark-prueba4)"
      />
      <path d="M23.3 5.1h11.96l4.36 4.02-16.32.02Z" fill="#8f73ff" opacity="0.9" />
    </svg>
  );
}

function FauxSelect({ text }) {
  return (
    <div className="negocio-crear-promo-select">
      <span>{text}</span>
      <IconChevron />
    </div>
  );
}

export default function NegocioCrearPromoPage() {
  return (
    <div className="negocio-crear-promo-page">
      <div className="negocio-crear-promo-canvas">
        <header className="negocio-crear-promo-topbar">
          <div className="negocio-crear-promo-topbar__left">
            <div className="negocio-crear-promo-brand">
              <LogoMark />
              <span>REFERIDOS APP</span>
            </div>
            <div className="negocio-crear-promo-divider" />
            <nav className="negocio-crear-promo-breadcrumbs" aria-label="Ubicación">
              <a className="negocio-crear-promo-breadcrumbs__home" href="/negocio/panel/crear-promo">
                <IconHomeMini />
              </a>
              <span className="negocio-crear-promo-breadcrumbs__dot" aria-hidden="true" />
              <a className="negocio-crear-promo-breadcrumbs__label" href="/negocio/panel/crear-promo">Promociones</a>
              <span className="negocio-crear-promo-breadcrumbs__dot" aria-hidden="true" />
              <span className="negocio-crear-promo-breadcrumbs__label is-current">Crear promoción</span>
            </nav>
          </div>

          <div className="negocio-crear-promo-topbar__search-gap" aria-hidden="true" />

          <button className="negocio-crear-promo-stats-button" type="button">
            <IconTrendUp />
            <span>Ver estadísticas</span>
          </button>

          <div className="negocio-crear-promo-topbar__right">
            <button className="negocio-crear-promo-icon-button negocio-crear-promo-notify" type="button" aria-label="Notificaciones">
              <IconBell />
              <span className="negocio-crear-promo-badge">3</span>
            </button>
            <button className="negocio-crear-promo-icon-button" type="button" aria-label="Ayuda">
              <IconHelp />
            </button>
            <button className="negocio-crear-promo-icon-button" type="button" aria-label="Ajustes">
              <IconSettings />
            </button>
            <button className="negocio-crear-promo-profile" type="button" aria-label="Perfil">
              <span className="negocio-crear-promo-avatar" aria-hidden="true" />
              <span>Roberto</span>
              <IconChevron />
            </button>
          </div>
        </header>

        <main className="negocio-crear-promo-main">
          <section className="negocio-crear-promo-editor">
            <div className="negocio-crear-promo-editor__glow" />
            <div className="negocio-crear-promo-editor__glow negocio-crear-promo-editor__glow--secondary" />

            <div className="negocio-crear-promo-field">
              <label>Título</label>
              <div className="negocio-crear-promo-input">
                <span>Ejemplo: Combo burger + bebida</span>
                <IconDoc />
              </div>
            </div>

            <div className="negocio-crear-promo-field">
              <label>Descripción</label>
              <div className="negocio-crear-promo-textarea">Descripción de la promoción...</div>
            </div>

            <div className="negocio-crear-promo-field">
              <label>Tipo de promoción</label>
              <div className="negocio-crear-promo-input negocio-crear-promo-input--select negocio-crear-promo-input--select-placeholder">
                <span className="negocio-crear-promo-input__placeholder">Selecciona el tipo de promoción...</span>
                <IconChevron />
              </div>
            </div>

            <div className="negocio-crear-promo-field negocio-crear-promo-field--conditions">
              <label>Condiciones</label>
              <div className="negocio-crear-promo-group">
                <div className="negocio-crear-promo-condition-row">
                  <div className="negocio-crear-promo-inline-icon"><IconPurchase /></div>
                  <span>Compra</span>
                  <FauxSelect text="2" />
                  <span className="negocio-crear-promo-inline-x">×</span>
                  <FauxSelect text="1" />
                  <span>y lleva gratis</span>
                </div>
                <div className="negocio-crear-promo-condition-row">
                  <div className="negocio-crear-promo-inline-icon"><IconGift /></div>
                  <span>Gratis</span>
                  <FauxSelect text="1" />
                  <div className="negocio-crear-promo-chip-input">Ejemplo: Refresco 350ml</div>
                </div>
              </div>
            </div>

            <div className="negocio-crear-promo-field negocio-crear-promo-field--benefits">
              <label>Beneficios adicionales</label>
              <div className="negocio-crear-promo-group negocio-crear-promo-group--stacked">
                <div className="negocio-crear-promo-benefit-row">
                  <div className="negocio-crear-promo-inline-icon"><IconDiscount /></div>
                  <span>Obtiene</span>
                  <FauxSelect text="Segundo" />
                  <span>con</span>
                  <div className="negocio-crear-promo-mini-input">20</div>
                  <span>% de descuento</span>
                  <button className="negocio-crear-promo-trash" type="button" aria-label="Eliminar"><IconTrash /></button>
                </div>
                <div className="negocio-crear-promo-benefit-row">
                  <div className="negocio-crear-promo-inline-icon"><IconGift /></div>
                  <span>Obtiene</span>
                  <FauxSelect text="Tercero" />
                  <span>gratis.</span>
                  <button className="negocio-crear-promo-trash" type="button" aria-label="Eliminar"><IconTrash /></button>
                </div>
              </div>
            </div>

            <button className="negocio-crear-promo-add" type="button">
              <IconPlus />
              <span>Agregar beneficio</span>
            </button>

            <div className="negocio-crear-promo-actions">
              <div className="negocio-crear-promo-save-state">
                <span className="negocio-crear-promo-save-dot" />
                <span>Guardado hace 3 min</span>
              </div>
              <div className="negocio-crear-promo-actions__buttons">
                <button className="negocio-crear-promo-primary" type="button">
                  <IconDoc />
                  <span>Guardar borrador</span>
                </button>
                <button className="negocio-crear-promo-secondary" type="button">
                  <IconPlane />
                  <span>Enviar a revisión</span>
                </button>
              </div>
            </div>
          </section>

          <section className="negocio-crear-promo-preview-wrap">
            <div className="negocio-crear-promo-speed-switch">
              <button className="is-active" type="button">Normal</button>
              <button type="button">Rápida</button>
            </div>
            <a
              className="negocio-crear-promo-help-link"
              href="/negocio/panel/crear-promo"
            >
              ¿Cómo elegir?
            </a>

            <article className="negocio-crear-promo-card">
              <div className="negocio-crear-promo-card__media"><IconImage /></div>
              <div className="negocio-crear-promo-card__body">
                <h1>Título</h1>
                <p>Descripción...</p>
                <div className="negocio-crear-promo-separator" />
                <section className="negocio-crear-promo-card__conditions">
                  <div className="negocio-crear-promo-card__pill">
                    <IconCheck color="#13a66d" />
                    <span>
                      Compra <span className="negocio-crear-promo-card__tone">2 Ejemplo</span> y obtén el <span className="negocio-crear-promo-card__tone">Tercer objeto gratis.</span>
                    </span>
                  </div>
                  <div className="negocio-crear-promo-card__pill negocio-crear-promo-card__pill--alt">
                    <IconCheck color="#6846d8" />
                    <span><span className="negocio-crear-promo-card__accent">20%</span> de descuento en el Segundo objeto*</span>
                  </div>
                </section>
                <div className="negocio-crear-promo-separator" />
                <div className="negocio-crear-promo-meta">
                  <div className="negocio-crear-promo-meta__row">
                    <IconPin />
                    <span>Nombre local</span>
                  </div>
                  <div className="negocio-crear-promo-meta__row">
                    <IconCalendar />
                    <span>Hasta DD de MM</span>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}





