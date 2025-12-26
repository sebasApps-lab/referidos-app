import React from "react";
import PromoSection from "../../components/sections/PromoSection";

export default function InicioPromos({ sections, ratings }) {
  if (!sections || sections.length === 0) return null;

  return (
    <section id="cliente-promos" className="mt-6 space-y-6">
      {sections.map((section) => (
        <PromoSection
          key={section.id}
          title={section.title}
          promos={section.promos}
          ratings={ratings}
          CardComponent={section.CardComponent}
          autoScroll={section.autoScroll}
          autoScrollInterval={section.autoScrollInterval}
          loop={section.loop}
          loopPeek={section.loopPeek}
        />
      ))}
    </section>
  );
}
