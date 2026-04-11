import iconNumber1Blue from "../../assets/landing/steps/n1-blue-optimized.webp";
import iconNumber2Purple from "../../assets/landing/steps/n2-purple-optimized.webp";
import iconNumber3BlueCyan from "../../assets/landing/steps/n3-cyan-optimized.webp";
import iconMailBlue from "../../assets/landing/steps/mail-optimized.webp";
import iconGift from "../../assets/landing/steps/gift-optimized.webp";
import iconCoins from "../../assets/landing/steps/coin-optimized.webp";

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
