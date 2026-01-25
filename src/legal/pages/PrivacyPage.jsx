import React from "react";
import LegalLayout from "../LegalLayout";
import LegalContent from "../blocks/LegalContent";
import privacyEs from "../content/es/privacy.md?raw";
import privacyEn from "../content/en/privacy.md?raw";

const CONTENT = {
  es: privacyEs,
  en: privacyEn,
};

const TITLES = {
  es: "Politicas de privacidad",
  en: "Privacy policy",
};

export default function PrivacyPage({ locale = "es" }) {
  const title = TITLES[locale] || TITLES.es;
  const markdown = CONTENT[locale] || CONTENT.es;

  return (
    <LegalLayout title={title} locale={locale}>
      <LegalContent markdown={markdown} />
    </LegalLayout>
  );
}
