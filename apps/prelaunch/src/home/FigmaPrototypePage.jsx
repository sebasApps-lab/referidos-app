import React, { useEffect } from "react";
import "./figmaPrototype.css";

const featureCards = [
  {
    key: "explora",
    className: "figma-prototype__card--left",
    title: (
      <>
        Explora promociones
        <br />
        exclusivas
      </>
    ),
    body: (
      <>
        Descubre regalos, descuentos, 2x1,
        <br />y todo tipo de promociones
      </>
    ),
  },
  {
    key: "puntos",
    className: "figma-prototype__card--mid",
    title: (
      <>
        Gana puntos
        <br />
        y&nbsp;recompensas
      </>
    ),
    body: (
      <>
        Guarda promos cerca de ti, para
        <br />
        canjearlas y acumular puntos.
      </>
    ),
  },
  {
    key: "progreso",
    className: "figma-prototype__card--right",
    title: (
      <>
        Sigue tu progreso
        <br />
        en tiempo real
      </>
    ),
    body: (
      <>
        Puedes ver todo los beneficios
        <br />
        que vas a alcanzar con tus puntos.
      </>
    ),
  },
];

export default function FigmaPrototypePage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflowX;
    const previousBodyOverflow = body.style.overflowX;
    const previousBodyBackground = body.style.background;

    html.style.overflowX = "auto";
    body.style.overflowX = "auto";
    body.style.background = "#ffffff";

    return () => {
      html.style.overflowX = previousHtmlOverflow;
      body.style.overflowX = previousBodyOverflow;
      body.style.background = previousBodyBackground;
    };
  }, []);

  return (
    <main className="figma-prototype" aria-label="Wireframe ready">
      <div className="figma-prototype__frame">
        <header className="figma-prototype__header" />

        <div className="figma-prototype__body">
          <section className="figma-prototype__hero">
            <div className="figma-prototype__hero-bg" aria-hidden="true">
              <HeroBackgroundSvg />
            </div>

            <div className="figma-prototype__hero-content">
              <div className="figma-prototype__hero-left">
                <p className="figma-prototype__eyebrow">REFERIDOS APP</p>

                <div className="figma-prototype__hero-copy">
                  <div className="figma-prototype__hero-bodytext">
                    <h1>
                      Descubre y comparte
                      <br />
                      ofertas, gana
                      <br />
                      recompensas facilmente
                    </h1>
                    <p>
                      Aprovecha promociones exclusivas, invita a tus amigos y canda
                      puntos por cada canje.
                    </p>
                  </div>

                  <button className="figma-prototype__download-button" type="button">
                    <span className="figma-prototype__download-label">Descargar</span>
                    <span className="figma-prototype__download-arrow" aria-hidden="true">
                      {">"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="figma-prototype__hero-right">
                <div className="figma-prototype__phone-column">
                  <div className="figma-prototype__phone-placeholder" aria-hidden="true" />
                </div>

                <div className="figma-prototype__signup-column">
                  <aside className="figma-prototype__signup-card">
                    <div className="figma-prototype__signup-card-bg" aria-hidden="true">
                      <SignupCardSvg />
                    </div>

                    <h2>Crea tu cuenta gratis</h2>

                    <div className="figma-prototype__signup-content">
                      <div className="figma-prototype__signup-body">
                        <div className="figma-prototype__signup-buttons">
                          <button className="figma-prototype__google-button" type="button">
                            <GoogleMark />
                            <span>Continuar con Google</span>
                          </button>

                          <button className="figma-prototype__mail-button" type="button">
                            <MailMark />
                            <span>Continuar con correo</span>
                          </button>
                        </div>

                        <div className="figma-prototype__signup-bottom-text">
                          <span>Ya tienes cuenta?</span>
                          <span>Inicia sesi&oacute;n</span>
                        </div>
                      </div>

                      <div className="figma-prototype__signup-line" />
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          <section className="figma-prototype__mid">
            <div className="figma-prototype__mid-content">
              <div className="figma-prototype__mid-heading">
                <div className="figma-prototype__mid-title">
                  <span>As&iacute; de</span>
                  <strong>f&aacute;cil y divertido</strong>
                </div>

                <p>
                  Encuentra promociones exclusivas gana puntos y haz un seguimiento de tus
                  recopensas, &iexcl;todo desde una misma app!
                </p>
              </div>

              <div className="figma-prototype__cards">
                {featureCards.map((card) => (
                  <article key={card.key} className={`figma-prototype__card ${card.className}`}>
                    <div className="figma-prototype__card-volume" aria-hidden="true" />
                    <div className="figma-prototype__card-surface">
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </div>
                    <div className="figma-prototype__card-glow" aria-hidden="true" />
                    <IconPlaceholder />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="figma-prototype__bottom">
            <div className="figma-prototype__bottom-content">
              <div className="figma-prototype__subscribe-block">
                <h2>
                  <span>Promociones irresistibles,</span>
                  <span>al alcance de tu mano</span>
                </h2>

                <div className="figma-prototype__email-input">
                  <p>Descubre y canjea las ofertas que mas te gusten!</p>

                  <div className="figma-prototype__input-stack">
                    <div className="figma-prototype__input-row">
                      <span>Tu correo electr&oacute;nico</span>
                      <button type="button">Crear cuenta gratuita</button>
                      <div className="figma-prototype__input-glow" aria-hidden="true" />
                    </div>

                    <p className="figma-prototype__legal-copy">
                      Al suscribirte, aceptas los <span>t&eacute;rminos y condiciones</span>{" "}
                      ademas de las <span>Pol&iacute;ticas de Privacidad</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="figma-prototype__promo-placeholder" aria-hidden="true" />
            </div>
          </section>
        </div>

        <footer className="figma-prototype__footer" />
      </div>
    </main>
  );
}

function IconPlaceholder() {
  return (
    <div className="figma-prototype__icon-holder" aria-hidden="true">
      <div className="figma-prototype__icon-cross figma-prototype__icon-cross--one" />
      <div className="figma-prototype__icon-cross figma-prototype__icon-cross--two" />
      <span>ICON</span>
    </div>
  );
}

function HeroBackgroundSvg() {
  return (
    <svg
      width="1440"
      height="574"
      viewBox="0 0 1440 574"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0H1440V496.565L1363.82 513.913C1363.82 513.913 1310.25 524.7 1275.64 529.886C1231.51 536.499 1206.52 538.532 1162.06 542.42C1116.53 546.403 1090.87 546.969 1045.26 549.91C942.842 556.514 885.552 562.533 783.02 567.03C691.669 571.037 640.379 571.732 548.945 572.838C461.867 573.892 413.013 574.816 325.951 572.838C285.551 571.92 262.856 572.019 222.533 569.398C189.651 567.261 164.18 565.995 131.506 561.754C100.87 557.778 90.4203 554.397 60.4809 548.76C29.0504 542.841 0 536.529 0 536.529V0Z"
        fill="#2F0663"
      />
    </svg>
  );
}

function SignupCardSvg() {
  return (
    <svg width="260" height="381" viewBox="0 0 260 381" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-0.201172 -0.173706H215.799C240.099 -0.173706 259.799 19.5258 259.799 43.8263V336.826C259.799 361.127 240.099 380.826 215.799 380.826H-0.201172V-0.173706Z" fill="white" />
      <path d="M215.799 -0.636597C240.355 -0.636597 260.262 19.2703 260.262 43.8263V336.826C260.262 361.382 240.355 381.289 215.799 381.289H-0.664062V-0.636597H215.799Z" stroke="white" strokeOpacity="0.22" strokeWidth="0.925" />
      <path d="M105.712 315.714C105.712 315.714 75.6808 308.275 57.149 301.376C44.6356 296.718 25.699 287.964 25.699 287.964L-1.12598 277.326V511.351H317.074V256.976C317.074 256.976 307.152 258.697 300.887 260.214C294.496 261.76 290.863 262.553 284.699 264.839C281.208 266.133 279.274 266.938 275.912 268.539C275.912 268.539 265.737 272.701 258.799 278.714C251.862 284.726 247.43 294.353 243.537 299.064C239.631 303.789 237.342 306.488 232.437 310.164C227.649 313.751 224.54 315.249 219.024 317.564C219.024 317.564 207.924 324.039 176.012 324.039C160.749 324.039 152.424 323.576 138.549 322.189C125.543 320.888 105.712 315.714 105.712 315.714Z" fill="#E5D2F5" stroke="#DFC3FA" strokeWidth="0.925" />
      <path d="M16.3047 275.756C21.2409 275.463 27.3904 275.23 32.1973 275.476C41.2672 275.941 46.4039 276.261 55.377 277.796C68.1569 279.981 75.1544 282.335 87.3633 286.602C96.1256 289.665 106.9 294.647 115.473 298.857C119.761 300.963 123.503 302.879 126.173 304.267C127.508 304.962 128.575 305.525 129.309 305.914C129.675 306.108 129.959 306.259 130.15 306.362C130.246 306.413 130.32 306.453 130.369 306.479C130.394 306.492 130.412 306.502 130.425 306.509C130.431 306.512 130.435 306.515 130.438 306.516C130.44 306.517 130.442 306.518 130.442 306.518L130.443 306.519H130.444C130.445 306.52 130.446 306.521 130.447 306.521L130.511 306.556C130.556 306.58 130.623 306.616 130.712 306.663C130.889 306.758 131.151 306.897 131.49 307.077C132.169 307.436 133.156 307.955 134.391 308.595C136.861 309.873 140.323 311.634 144.286 313.557C151.722 317.167 160.906 321.346 168.62 324.012L170.143 324.524L170.148 324.526H170.149L170.151 324.527C170.153 324.528 170.156 324.529 170.16 324.53C170.168 324.533 170.179 324.537 170.194 324.542C170.225 324.552 170.272 324.568 170.333 324.589C170.455 324.63 170.636 324.691 170.873 324.769C171.347 324.927 172.043 325.156 172.93 325.441C174.704 326.011 177.244 326.804 180.304 327.699C186.424 329.489 194.619 331.683 202.925 333.298C219.545 336.529 239.81 336.528 251.166 336.526H319.849V475.276H7.19824V276.443L7.61719 276.403L7.66113 276.864L7.61816 276.403H7.62012C7.62199 276.403 7.62524 276.403 7.62891 276.402C7.63619 276.402 7.64696 276.401 7.66113 276.399C7.68992 276.397 7.73298 276.393 7.78906 276.388C7.90132 276.377 8.06716 276.362 8.28125 276.344C8.70977 276.306 9.33265 276.252 10.1094 276.189C11.6629 276.064 13.8343 275.902 16.3047 275.756Z" fill="#E5C7FC" stroke="#DFC3FA" strokeWidth="0.925" />
      <path d="M-0.492188 276.896L7.19824 279.945V475.276H287.937V511.813H-1.12598V276.645L-0.492188 276.896ZM319.849 336.526V475.276H287.937V336.526H319.849ZM287.937 336.526H251.166C239.81 336.528 219.545 336.529 202.925 333.298C194.619 331.683 186.424 329.49 180.304 327.7C177.244 326.805 174.704 326.011 172.93 325.441C172.043 325.156 171.347 324.927 170.873 324.769C170.636 324.691 170.455 324.63 170.333 324.589C170.272 324.568 170.225 324.552 170.194 324.542C170.179 324.537 170.168 324.533 170.16 324.53C170.156 324.529 170.153 324.528 170.151 324.527L170.149 324.526H170.148L170.143 324.524L169.092 324.17C170.396 324.235 171.573 324.293 172.584 324.339C173.799 324.394 174.776 324.435 175.449 324.462C175.785 324.475 176.046 324.485 176.223 324.492C176.31 324.495 176.378 324.497 176.423 324.499C176.445 324.5 176.462 324.501 176.474 324.501C176.479 324.501 176.484 324.502 176.486 324.502H176.503C176.506 324.502 176.51 324.503 176.516 324.503C176.526 324.503 176.543 324.505 176.563 324.506C176.607 324.508 176.671 324.51 176.756 324.515C176.925 324.523 177.176 324.535 177.499 324.55C178.146 324.579 179.088 324.619 180.262 324.659C182.61 324.74 185.89 324.825 189.616 324.844C197.075 324.881 206.296 324.649 213.405 323.581C222.189 322.262 227.148 321.381 235.524 318.514L236.075 318.325C243.233 315.876 247.496 314.417 253.922 310.238C262.332 304.77 266.043 301.081 272.312 293.226C277.263 287.023 279.671 283.569 283.352 275.288C285.188 271.155 286.104 267.949 286.56 265.784C286.787 264.702 286.9 263.88 286.956 263.332C286.984 263.058 286.998 262.853 287.005 262.718C287.008 262.65 287.01 262.6 287.011 262.568C287.011 262.553 287.012 262.541 287.012 262.534C287.012 262.531 287.012 262.528 287.012 262.526H287.937V336.526ZM16.3047 275.756C21.2409 275.463 27.3904 275.23 32.1973 275.477C41.2672 275.941 46.4039 276.261 55.377 277.796C68.1569 279.981 75.1544 282.335 87.3633 286.602C96.1256 289.665 106.9 294.647 115.473 298.857C119.761 300.963 123.503 302.879 126.173 304.268C127.508 304.962 128.575 305.525 129.309 305.914C129.675 306.109 129.959 306.26 130.15 306.362C130.246 306.414 130.32 306.453 130.369 306.479C130.394 306.493 130.412 306.502 130.425 306.509C130.431 306.512 130.435 306.515 130.438 306.517C130.44 306.517 130.442 306.518 130.442 306.518L130.443 306.519H130.444C130.445 306.52 130.446 306.521 130.447 306.521L130.511 306.556C130.556 306.58 130.623 306.616 130.712 306.663C130.889 306.758 131.151 306.898 131.49 307.077C132.169 307.436 133.156 307.955 134.391 308.595C136.861 309.874 140.323 311.634 144.286 313.558C151.722 317.167 160.906 321.346 168.62 324.012L169.092 324.17C167.261 324.078 165.178 323.969 162.949 323.837C155.312 323.384 145.962 322.691 139.076 321.73C129.147 320.345 120.949 318.729 115.235 317.459C112.379 316.824 110.143 316.277 108.623 315.888C107.863 315.693 107.281 315.538 106.891 315.432C106.696 315.379 106.548 315.338 106.449 315.31C106.4 315.297 106.363 315.286 106.338 315.279L106.304 315.269H106.302L106.294 315.267L106.285 315.265H106.284C106.283 315.264 106.282 315.264 106.28 315.264C106.277 315.263 106.271 315.261 106.264 315.26C106.249 315.256 106.228 315.25 106.199 315.243C106.142 315.229 106.057 315.208 105.945 315.18C105.721 315.124 105.389 315.041 104.961 314.933C104.104 314.716 102.86 314.398 101.309 313.996C98.2056 313.191 93.8748 312.047 88.9658 310.686C79.1442 307.965 67.0196 304.385 57.7734 300.943C51.5301 298.619 43.6776 295.27 37.3809 292.5C34.2337 291.115 31.4765 289.876 29.5068 288.983C28.5223 288.537 27.734 288.177 27.1924 287.929C26.922 287.805 26.7128 287.709 26.5713 287.643C26.5007 287.611 26.4463 287.586 26.4102 287.569C26.3923 287.561 26.3782 287.555 26.3691 287.551C26.3649 287.549 26.3616 287.547 26.3594 287.546C26.3584 287.545 26.3571 287.545 26.3564 287.545V287.544L26.3447 287.539L26.332 287.534L7.19824 279.945V276.443L7.61719 276.403L7.66113 276.864L7.61816 276.403H7.62012C7.62199 276.403 7.62524 276.403 7.62891 276.402C7.63619 276.402 7.64697 276.401 7.66113 276.399C7.68992 276.397 7.73298 276.393 7.78906 276.388C7.90132 276.377 8.06716 276.363 8.28125 276.344C8.70977 276.306 9.33265 276.252 10.1094 276.189C11.6629 276.064 13.8343 275.902 16.3047 275.756Z" fill="#F0DDFA" />
      <path d="M27.0867 285.189C9.57086 268.988 -18.2383 255.589 -18.2383 255.589V510.426H323.549V441.514C323.549 441.514 261.929 429.674 222.724 417.464C188.043 406.663 149.649 390.176 149.649 390.176C149.649 390.176 129.987 382.724 118.199 376.301C110.365 372.032 105.88 369.671 98.7742 364.276C91.9521 359.097 88.4751 355.697 82.5867 349.476C75.1595 341.63 65.4742 327.739 65.4742 327.739C65.4742 327.739 41.9925 298.975 27.0867 285.189Z" fill="#D1ABF7" stroke="#D1AFF8" strokeWidth="0.925" />
      <path d="M-2.05098 293.976C-19.5668 277.776 -47.376 264.376 -47.376 264.376V519.214H294.412V450.301C294.412 450.301 232.791 438.461 193.587 426.251C158.906 415.45 120.512 398.964 120.512 398.964C120.512 398.964 100.849 391.512 89.0615 385.089C81.2272 380.82 76.7424 378.459 69.6365 373.064C62.8144 367.884 59.3374 364.484 53.449 358.264C46.0218 350.418 36.3365 336.526 36.3365 336.526C36.3365 336.526 12.8548 307.763 -2.05098 293.976Z" fill="#B78AE8" stroke="#BB90EB" strokeWidth="0.925" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.81 12.23c0-.72-.07-1.4-.19-2.05H12v3.88h5.51a4.76 4.76 0 0 1-2.04 3.12v2.58h3.29c1.93-1.78 3.05-4.4 3.05-7.53Z" fill="#4285F4" />
      <path d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.29-2.58c-.91.61-2.09.98-3.48.98-2.67 0-4.92-1.8-5.73-4.21H2.88v2.66A10 10 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.27 13.72A5.98 5.98 0 0 1 5.95 12c0-.6.11-1.18.32-1.72V7.62H2.88A10 10 0 0 0 2 12c0 1.61.38 3.14 1.05 4.38l3.22-2.66Z" fill="#FBBC05" />
      <path d="M12 6.06c1.5 0 2.84.52 3.9 1.54l2.92-2.92C17.07 3.04 14.75 2 12 2A10 10 0 0 0 2.88 7.62l3.39 2.66c.81-2.41 3.06-4.22 5.73-4.22Z" fill="#EA4335" />
    </svg>
  );
}

function MailMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="figmaPrototypeMail" x1="4" x2="19" y1="5" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffc96c" />
          <stop offset="1" stopColor="#feb231" />
        </linearGradient>
      </defs>
      <path d="M5.5 6.5h13a1.5 1.5 0 0 1 1.5 1.5v8a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V8a1.5 1.5 0 0 1 1.5-1.5Z" fill="url(#figmaPrototypeMail)" />
      <path d="m5.8 8.2 6.2 4.4 6.2-4.4" fill="none" stroke="#cf8111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}
