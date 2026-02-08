import React from "react";
import LegalLayout from "../LegalLayout";
import LegalContent from "../blocks/LegalContent";
import termsEs from "../content/es/terms.md?raw";
import termsEn from "../content/en/terms.md?raw";

const CONTENT = {
  es: termsEs,
  en: termsEn,
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
