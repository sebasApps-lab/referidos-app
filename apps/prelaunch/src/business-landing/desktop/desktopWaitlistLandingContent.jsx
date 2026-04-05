import iconCoins from "../../assets/landing/steps/coin-optimized.webp";
import iconGift from "../../assets/landing/steps/gift-optimized.webp";
import iconMailBlue from "../../assets/landing/steps/mail-optimized.webp";
import iconNumber1Blue from "../../assets/landing/steps/n1-blue-optimized.webp";
import iconNumber2Purple from "../../assets/landing/steps/n2-purple-optimized.webp";
import iconNumber3BlueCyan from "../../assets/landing/steps/n3-cyan-optimized.webp";

export const navigationLinks = [
  { label: "CÃ³mo funciona", targetId: "waitlist-bottom" },
  { label: "Recibir mi invitaciÃ³n", targetId: "waitlist-steps" },
];

export const desktopSteps = [
  {
    key: "correo",
    numberSrc: iconNumber1Blue,
    iconSrc: iconMailBlue,
    title: (
      <>
        <span className="business-landing__benefit-title-bold">AÃ±ade</span>
        <span className="business-landing__benefit-title-medium">
          {" "}tu correo
          <br />a la lista
        </span>
      </>
    ),
    description: (
      <>
        Espera y recibe la invitaciÃ³n
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
        <span className="business-landing__benefit-title-bold">Descarga</span>
        <span className="business-landing__benefit-title-regular">
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
        <span className="business-landing__benefit-title-bold">Gana puntos </span>
        <span className="business-landing__benefit-title-regular">
          <br />
        </span>
        <span className="business-landing__benefit-title-medium">y recompensas</span>
      </>
    ),
    description: (
      <>
        Canjea promociones, suma puntos
        <br />y obtÃ©n mÃ¡s beneficios.
      </>
    ),
  },
];

export const footerColumns = [
  {
    title: "INFORMACIÃ“N",
    links: ["Plataforma", "QuiÃ©nes somos"],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacidad", to: "/ayuda/es/articulo/privacidad" },
      { label: "TÃ©rminos y Condiciones", to: "/ayuda/es/articulo/terminos" },
      { label: "Borrar mis datos", to: "/ayuda/es/articulo/borrar-datos" },
    ],
  },
  {
    title: "CONTACTO",
    links: ["Chat de soporte", "Soporte por correo", "Comentarios y sugerencias"],
  },
];
