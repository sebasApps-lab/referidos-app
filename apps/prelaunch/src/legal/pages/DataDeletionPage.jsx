import React from "react";
import LegalLayout from "../LegalLayout";
import LegalContent from "../blocks/LegalContent";
import { getLegalMarkdown } from "@referidos/legal-content";

const CONTENT = {
  es: getLegalMarkdown("data-deletion", "es"),
  en: getLegalMarkdown("data-deletion", "en"),
};

const TITLES = {
  es: "Eliminacion de datos",
  en: "Data deletion",
};

export default function DataDeletionPage({ locale = "es" }) {
  const title = TITLES[locale] || TITLES.es;
  const markdown = CONTENT[locale] || CONTENT.es;

  return (
    <LegalLayout title={title} locale={locale}>
      <LegalContent markdown={markdown} />
    </LegalLayout>
  );
}
