import React from "react";

const LEGAL_VERSION = "1.0";
const LOCALE_LABELS = {
  es: "ES",
  en: "EN",
};

export default function LegalFooter({ locale }) {
  const year = new Date().getFullYear();
  const localeLabel = LOCALE_LABELS[locale] || String(locale || "ES").toUpperCase();

  return (
    <footer className="border-t border-slate-200 pt-6 text-xs text-slate-500">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span>© {year} Referidos</span>
        <span>Version {LEGAL_VERSION}</span>
        <span>Idioma: {localeLabel}</span>
      </div>
    </footer>
  );
}
