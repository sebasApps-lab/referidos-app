import iconNumber1Blue from "../../assets/landing/steps/n1-blue-optimized.webp";
import iconNumber2Purple from "../../assets/landing/steps/n2-purple-optimized.webp";
import iconNumber3BlueCyan from "../../assets/landing/steps/n3-cyan-optimized.webp";
import iconMailBlue from "../../assets/landing/steps/mail-optimized.webp";
import iconGift from "../../assets/landing/steps/gift-optimized.webp";
import iconCoins from "../../assets/landing/steps/coin-optimized.webp";

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
    iconSrc: iconMailBlue,
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
