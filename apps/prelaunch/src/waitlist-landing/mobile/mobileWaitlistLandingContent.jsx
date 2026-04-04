import iconNumber1Blue from "../../assets/landing/steps/icon-number-1-blue.png";
import iconNumber2Purple from "../../assets/landing/steps/icon-number-2-purple.png";
import iconNumber3BlueCyan from "../../assets/landing/steps/icon-number-3-blue-cyan.png";
import iconMailBlue from "../../assets/landing/steps/icon-mail-blue.png";
import iconGift from "../../assets/landing/steps/icon-gift.png";
import iconCoins from "../../assets/landing/steps/icon-coins.png";
import midCardIconShadow1 from "../../assets/landing/steps/mid-card-icon-shadow-1.svg";

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
    numberSrc: iconNumber1Blue,
    iconShadowSrc: midCardIconShadow1,
    iconSrc: iconMailBlue,
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
    numberSrc: iconNumber2Purple,
    iconSrc: iconGift,
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
    numberSrc: iconNumber3BlueCyan,
    iconShadowClassName: "mobile-landing__step-gift-shadow",
    iconSrc: iconCoins,
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
