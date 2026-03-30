import { asset, sharedAsset } from "./mobileWaitlistLandingAssets";

export const steps = [
  {
    id: "mail",
    title: (
      <>
        <span className="mobile-landing__step-title-strong">{"Añade"}</span>{" "}
        <span className="mobile-landing__step-title-light">
          tu correo
          <br />
          a la lista
        </span>
      </>
    ),
    description: (
      <>
        {"Espera y recibe la invitación"}
        <br />
        para descargar la app.
      </>
    ),
    numberSrc: asset("icon-number-1-blue.png"),
    iconShadowSrc: asset("mail-icon-shadow.png"),
    iconSrc: asset("mail-icon.png"),
    iconShadowClassName:
      "mobile-landing__step-icon-shadow mobile-landing__step-icon-shadow--mail",
    iconClassName: "mobile-landing__step-icon-image mobile-landing__step-icon-image--mail",
    wrapClassName: "mobile-landing__step-card mobile-landing__step-card--mail",
  },
  {
    id: "gift",
    title: (
      <>
        <span className="mobile-landing__step-title-strong">Descarga</span>{" "}
        <span className="mobile-landing__step-title-light">
          y recibe
          <br />
          tu recompensas
        </span>
      </>
    ),
    description: (
      <>
        Recibe tus beneficios extra por
        <br />
        participar en el acceso anticipado.
      </>
    ),
    numberSrc: asset("icon-number-2-purple.png"),
    iconSrc: sharedAsset("icon-gift.png"),
    iconShadowClassName: "mobile-landing__step-gift-shadow",
    iconClassName: "mobile-landing__step-icon-image mobile-landing__step-icon-image--gift",
    wrapClassName: "mobile-landing__step-card mobile-landing__step-card--gift",
  },
  {
    id: "coins",
    title: (
      <>
        <span className="mobile-landing__step-title-strong">Gana puntos</span>
        <br />
        <span className="mobile-landing__step-title-light">y recompensas</span>
      </>
    ),
    description: (
      <>
        Canjea promociones, suma puntos
        <br />
        {"y obtén más beneficios."}
      </>
    ),
    numberSrc: asset("icon-number-3-blue-cyan.png"),
    iconShadowClassName: "mobile-landing__step-gift-shadow",
    iconSrc: sharedAsset("icon-coins.png"),
    iconClassName: "mobile-landing__step-icon-image mobile-landing__step-icon-image--coins",
    wrapClassName: "mobile-landing__step-card mobile-landing__step-card--coins",
  },
];

export const footerPanels = [
  { key: "help", label: "Ayuda" },
  { key: "platform", label: "Plataforma" },
  { key: "team", label: "Quiénes somos" },
  { key: "business", label: "Para negocios" },
  { key: "delete-data", label: "Borrar datos" },
];
