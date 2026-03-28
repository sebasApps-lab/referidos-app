import { asset, iconAsset, mobileAsset } from "./desktopWaitlistLandingAssets";

export const navigationLinks = [
  { label: "Ayuda", to: "/ayuda/es" },
  { label: "Cómo funciona", targetId: "waitlist-bottom" },
  { label: "Para negocios", actionId: "business-interest-modal" },
];

export const desktopSteps = [
  {
    key: "correo",
    numberSrc: mobileAsset("icon-number-1-blue.png"),
    iconSrc: iconAsset("icon-mail-blue.png"),
    shadowSrc: asset("mid-card-icon-shadow-1.svg"),
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
    numberSrc: mobileAsset("icon-number-2-purple.png"),
    iconSrc: iconAsset("icon-gift.png"),
    shadowSrc: asset("mid-card-icon-shadow-2.svg"),
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
    numberSrc: mobileAsset("icon-number-3-blue-cyan.png"),
    iconSrc: iconAsset("icon-coins.png"),
    shadowSrc: asset("mid-card-icon-shadow-3.svg"),
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
        to: "/soporte/abrir-ticket?origin=consumer&channel=whatsapp",
      },
      {
        label: "Soporte por correo",
        to: "/soporte/abrir-ticket?origin=consumer&channel=email",
      },
      {
        label: "Comentarios y sugerencias",
        to: "/feedback?origin=consumer",
      },
    ],
  },
];
