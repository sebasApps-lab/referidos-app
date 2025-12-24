import React from "react";
import PromoSection from "../../components/sections/PromoSection";

export default function InicioPromos({ sections, ratings }) {
  return (
    <section id="cliente-promos" className="mt-6">
      <div className="px-4 mb-4">
        <h2 className="text-sm font-semibold text-[#2F1A55]">
          Promos seleccionadas
        </h2>
        <p className="text-xs text-slate-500">
          Listas simples y claras para explorar rapido.
        </p>
      </div>
      <div className="space-y-6">
        {sections.map((section) => (
          <PromoSection
            key={section.title}
            title={section.title}
            promos={section.promos}
            ratings={ratings}
          />
        ))}
      </div>
    </section>
  );
}
