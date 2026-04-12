import React from "react";
import LegalLayout from "../LegalLayout";
import LegalContent from "../blocks/LegalContent";
import { getLegalMarkdown } from "@referidos/legal-content/prelaunch";

const CONTENT = {
  es: getLegalMarkdown("terminos-condiciones-lista", "es"),
  en: getLegalMarkdown("terminos-condiciones-lista", "en"),
};

const TITLES = {
  es: "Terminos y condiciones",
  en: "Terms and conditions",
};

export default function TermsPage({ locale = "es" }) {
  const title = TITLES[locale] || TITLES.es;
  const markdown = CONTENT[locale] || CONTENT.es;

  return (
    <LegalLayout title={title} locale={locale}>
      <LegalContent markdown={markdown} />
    </LegalLayout>
  );
}
