import iconNumber1Blue from "../../assets/landing/steps/icon-number-1-blue.png";
import iconNumber2Purple from "../../assets/landing/steps/icon-number-2-purple.png";
import iconNumber3BlueCyan from "../../assets/landing/steps/icon-number-3-blue-cyan.png";
import iconMailBlue from "../../assets/landing/steps/icon-mail-blue.png";
import iconGift from "../../assets/landing/steps/icon-gift.png";
import iconCoins from "../../assets/landing/steps/icon-coins.png";
import midCardIconShadow1 from "../../assets/landing/steps/mid-card-icon-shadow-1.svg";
import midCardIconShadow2 from "../../assets/landing/steps/mid-card-icon-shadow-2.svg";
import midCardIconShadow3 from "../../assets/landing/steps/mid-card-icon-shadow-3.svg";

export const navigationLinks = [
  { label: "Ayuda", to: "/ayuda/es" },
  { label: "Cómo funciona", targetId: "waitlist-bottom" },
  { label: "Para negocios", actionId: "business-interest-modal" },
];

export const desktopSteps = [
  {
    key: "correo",
    numberSrc: iconNumber1Blue,
    iconSrc: iconMailBlue,
    shadowSrc: midCardIconShadow1,
    title: (
      <>
        <span className="figma-prototype__benefit-title-bold">Añade</span>
        <span className="figma-prototype__benefit-title-medium">
          {" "}tu correo
          <br />a la lista
        </span>
      </>
    ),
    description: (
      <>
        Espera y recibe la invitación
        <br />
        para descargar la app.
      </>
    ),
  },
  {
    key: "recompensas",
    numberSrc: iconNumber2Purple,
    iconSrc: iconGift,
    shadowSrc: midCardIconShadow2,
    title: (
      <>
        <span className="figma-prototype__benefit-title-bold">Descarga</span>
        <span className="figma-prototype__benefit-title-regular">
          {" "}y recibe
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
  },
  {
    key: "puntos",
    numberSrc: iconNumber3BlueCyan,
    iconSrc: iconCoins,
    shadowSrc: midCardIconShadow3,
    title: (
      <>
        <span className="figma-prototype__benefit-title-bold">Gana puntos </span>
        <span className="figma-prototype__benefit-title-regular">
          <br />
        </span>
        <span className="figma-prototype__benefit-title-medium">y recompensas</span>
      </>
    ),
    description: (
      <>
        Canjea promociones, suma puntos
        <br />y obtén más beneficios.
      </>
    ),
  },
];

export const footerColumns = [
  {
    title: "INFORMACIÓN",
    links: [
      { label: "Plataforma", actionId: "platform-modal" },
      { label: "Quiénes somos", actionId: "who-we-are-modal" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacidad", to: "/ayuda/es/articulo/privacidad" },
      { label: "Términos y Condiciones", to: "/ayuda/es/articulo/terminos" },
      { label: "Borrar mis datos", to: "/ayuda/es/articulo/borrar-datos" },
    ],
  },
  {
    title: "CONTACTO",
    links: [
      {
        label: "Chat de soporte",
        to: "/soporte/abrir-ticket?origin=cliente&channel=whatsapp",
      },
      {
        label: "Soporte por correo",
        to: "/soporte/abrir-ticket?origin=cliente&channel=email",
      },
      {
        label: "Comentarios y sugerencias",
        to: "/feedback?origin=cliente",
      },
    ],
  },
];
