import React from "react";
import LegalLayout from "../LegalLayout";
import LegalContent from "../blocks/LegalContent";
import dataDeletionEs from "../content/es/data-deletion.md?raw";
import dataDeletionEn from "../content/en/data-deletion.md?raw";

const CONTENT = {
  es: dataDeletionEs,
  en: dataDeletionEn,
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
