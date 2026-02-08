import React from "react";

const LOCALE_LABELS = {
  es: "ES",
  en: "EN",
};

export default function LegalHeader({ title, locale }) {
  const localeLabel = LOCALE_LABELS[locale] || String(locale || "ES").toUpperCase();

  return (
    <header className="border-b border-slate-200 pb-6">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        Legal
      </div>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
      <div className="mt-1 text-xs text-slate-500">Idioma: {localeLabel}</div>
    </header>
  );
}
