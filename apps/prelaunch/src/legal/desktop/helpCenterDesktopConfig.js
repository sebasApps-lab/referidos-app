export const clientDesktopHeaderActions = [
  {
    key: "waitlist",
    label: "Entrar en la lista de espera",
    to: "/#waitlist-bottom",
    className: "help-center__header-link help-center__header-link--solid",
  },
];

export const businessDesktopHeaderActions = [
  {
    key: "signup",
    label: "Crear cuenta",
    to: "/",
    className: "help-center__header-link help-center__header-link--ghost",
    devOnly: true,
  },
  {
    key: "login",
    label: "Ingresar",
    to: "/",
    className: "help-center__header-link help-center__header-link--solid",
    devOnly: true,
  },
];
