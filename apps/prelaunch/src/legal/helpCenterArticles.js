import { getLegalMarkdown } from "@referidos/legal-content/prelaunch";

export const LEGAL_ARTICLES = {
  "politicas-privacidad-lista": {
    title: "Politica de Privacidad",
    subtitle: "Lee como protegemos tu privacidad y tratamos tus datos en Referidos App.",
    eyebrow: "Informacion legal",
    markdown: getLegalMarkdown("politicas-privacidad-lista", "es"),
  },
  "terminos-condiciones-lista": {
    title: "Terminos y Condiciones",
    subtitle: "Consulta las condiciones de uso de la plataforma y nuestras reglas generales.",
    eyebrow: "Informacion legal",
    markdown: getLegalMarkdown("terminos-condiciones-lista", "es"),
  },
  "borrar-correo-lista": {
    title: "Borrar mi correo de la lista",
    subtitle: "Revisa como solicitar la eliminacion de tu informacion personal.",
    eyebrow: "Informacion legal",
    markdown: getLegalMarkdown("borrar-correo-lista", "es"),
  },
};
