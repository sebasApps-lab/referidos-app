import React from "react";
import LegalLayout from "../LegalLayout";
import LegalContent from "../blocks/LegalContent";
import { getLegalMarkdown } from "@referidos/legal-content/prelaunch";

const CONTENT = {
  es: getLegalMarkdown("borrar-correo-lista", "es"),
  en: getLegalMarkdown("borrar-correo-lista", "en"),
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
