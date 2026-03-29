import { getLegalMarkdown } from "@referidos/legal-content";

export const LEGAL_ARTICLES = {
  privacidad: {
    title: "Política de Privacidad",
    subtitle: "Lee cómo protegemos tu privacidad y tratamos tus datos en Referidos App.",
    eyebrow: "Información legal",
    markdown: getLegalMarkdown("privacy", "es"),
  },
  terminos: {
    title: "Términos y Condiciones",
    subtitle: "Consulta las condiciones de uso de la plataforma y nuestras reglas generales.",
    eyebrow: "Información legal",
    markdown: getLegalMarkdown("terms", "es"),
  },
  "borrar-datos": {
    title: "Borrar mis datos",
    subtitle: "Revisa cómo solicitar la eliminación de tu información personal.",
    eyebrow: "Información legal",
    markdown: getLegalMarkdown("data-deletion", "es"),
  },
};
