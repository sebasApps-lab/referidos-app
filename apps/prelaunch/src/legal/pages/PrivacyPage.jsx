import React from "react";
import LegalLayout from "../LegalLayout";
import LegalContent from "../blocks/LegalContent";
import { getLegalMarkdown } from "@referidos/legal-content/prelaunch";

const CONTENT = {
  es: getLegalMarkdown("politicas-privacidad-lista", "es"),
  en: getLegalMarkdown("politicas-privacidad-lista", "en"),
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
