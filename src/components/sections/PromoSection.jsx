// src/components/sections/PromoSection.jsx
import { useRef } from "react";
import PromoCard from "../cards/PromoCard";
import SectionTitle from "./SectionTitle";
import { useCarousel } from "../../hooks/useCarousel";

export default function PromoSection({ title, promos, ratings }) {
  const ref = useRef(null);
  const { canLeft, canRight, scroll } = useCarousel(ref);

  return (
    <div className="mb-6 relative">
      <SectionTitle>{title}</SectionTitle>

      {canLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 shadow rounded-full"
        >
          ‹
        </button>
      )}

      {canRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 shadow rounded-full"
        >
          ›
        </button>
      )}

      <div
        ref={ref}
        className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth"
      >
        {promos.map((p) => (
          <PromoCard key={p.id} promo={p} rating={ratings[p.id]} />
        ))}
      </div>
    </div>
  );
}
