import React from "react";
import { useParams } from "react-router-dom";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import LegalLayout from "./LegalLayout";
import LegalContent from "./blocks/LegalContent";

const DOC_PAGES = {
  terms: TermsPage,
  privacy: PrivacyPage,
};

const SUPPORTED_LOCALES = ["es", "en"];

export default function LegalRouter() {
  const { locale = "es", document = "terms" } = useParams();
  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "es";
  const Page = DOC_PAGES[document];

  if (!Page) {
    return (
      <LegalLayout title="Documento no disponible" locale={safeLocale}>
        <LegalContent markdown="# Documento no disponible\n\nEl documento solicitado no existe." />
      </LegalLayout>
    );
  }

  return <Page locale={safeLocale} />;
}
