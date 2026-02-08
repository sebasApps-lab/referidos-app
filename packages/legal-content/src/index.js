import LegalContent from "./LegalContent.jsx";
import privacyEs from "../content/es/privacy.md?raw";
import termsEs from "../content/es/terms.md?raw";
import dataDeletionEs from "../content/es/data-deletion.md?raw";
import privacyEn from "../content/en/privacy.md?raw";
import termsEn from "../content/en/terms.md?raw";
import dataDeletionEn from "../content/en/data-deletion.md?raw";

const LEGAL_DOCS = {
  privacy: {
    es: privacyEs,
    en: privacyEn,
  },
  terms: {
    es: termsEs,
    en: termsEn,
  },
  "data-deletion": {
    es: dataDeletionEs,
    en: dataDeletionEn,
  },
};

const LEGAL_DOC_ALIASES = {
  privacy: "privacy",
  privacidad: "privacy",
  terms: "terms",
  terminos: "terms",
  "data-deletion": "data-deletion",
  "delete-data": "data-deletion",
  "borrar-datos": "data-deletion",
};

export const LEGAL_LOCALES = ["es", "en"];
export const LEGAL_DOC_KEYS = Object.keys(LEGAL_DOCS);

export function normalizeLegalLocale(locale = "es") {
  return locale === "en" ? "en" : "es";
}

export function normalizeLegalDoc(doc = "terms") {
  return LEGAL_DOC_ALIASES[doc] || "terms";
}

export function getLegalMarkdown(doc, locale = "es") {
  const safeDoc = normalizeLegalDoc(doc);
  const safeLocale = normalizeLegalLocale(locale);
  return LEGAL_DOCS[safeDoc]?.[safeLocale] || LEGAL_DOCS[safeDoc]?.es || "";
}

export { LegalContent };

