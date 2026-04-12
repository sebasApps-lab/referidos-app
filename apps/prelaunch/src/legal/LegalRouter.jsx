import React from "react";
import { useParams } from "react-router-dom";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DataDeletionPage from "./pages/DataDeletionPage";
import LegalLayout from "./LegalLayout";
import LegalContent from "./blocks/LegalContent";

const DOC_PAGES = {
  "terminos-condiciones-lista": TermsPage,
  "politicas-privacidad-lista": PrivacyPage,
  "borrar-correo-lista": DataDeletionPage,
};

const SUPPORTED_LOCALES = ["es", "en"];

export default function LegalRouter() {
  const { locale = "es", document = "terminos-condiciones-lista" } = useParams();
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
