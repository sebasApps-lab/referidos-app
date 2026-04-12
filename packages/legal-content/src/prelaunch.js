import LegalContent from "./LegalContent.jsx";
import privacyListEs from "../content/es/politicas-privacidad-lista.md?raw";
import termsListEs from "../content/es/terminos-condiciones-lista.md?raw";
import deleteListEs from "../content/es/borrar-correo-lista.md?raw";

const LEGAL_DOCS = {
  "politicas-privacidad-lista": {
    es: privacyListEs,
    en: privacyListEs,
  },
  "terminos-condiciones-lista": {
    es: termsListEs,
    en: termsListEs,
  },
  "borrar-correo-lista": {
    es: deleteListEs,
    en: deleteListEs,
  },
};

const LEGAL_DOC_ALIASES = {
  privacy: "politicas-privacidad-lista",
  privacidad: "politicas-privacidad-lista",
  terms: "terminos-condiciones-lista",
  terminos: "terminos-condiciones-lista",
  "data-deletion": "borrar-correo-lista",
  "delete-data": "borrar-correo-lista",
  "borrar-datos": "borrar-correo-lista",
  "politicas-privacidad-lista": "politicas-privacidad-lista",
  "terminos-condiciones-lista": "terminos-condiciones-lista",
  "borrar-correo-lista": "borrar-correo-lista",
};

export const LEGAL_LOCALES = ["es", "en"];
export const LEGAL_DOC_KEYS = Object.keys(LEGAL_DOCS);

export function normalizeLegalLocale(locale = "es") {
  return locale === "en" ? "en" : "es";
}

export function normalizeLegalDoc(doc = "terminos-condiciones-lista") {
  return LEGAL_DOC_ALIASES[doc] || "terminos-condiciones-lista";
}

export function getLegalMarkdown(doc, locale = "es") {
  const safeDoc = normalizeLegalDoc(doc);
  const safeLocale = normalizeLegalLocale(locale);
  return LEGAL_DOCS[safeDoc]?.[safeLocale] || LEGAL_DOCS[safeDoc]?.es || "";
}

export { LegalContent };
