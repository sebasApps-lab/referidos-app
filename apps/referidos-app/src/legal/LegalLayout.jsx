import React from "react";
import LegalHeader from "./blocks/LegalHeader";
import LegalFooter from "./blocks/LegalFooter";

export default function LegalLayout({ title, locale, children }) {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A]">
      <div className="mx-auto flex h-screen w-full max-w-3xl flex-col px-6 py-8">
        <LegalHeader title={title} locale={locale} />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <LegalFooter locale={locale} />
      </div>
    </div>
  );
}
