import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PromoCard from "../cards/PromoCard";
import SectionTitle from "./SectionTitle";
import { useCarousel } from "../../hooks/useCarousel";

export default function PromoSection({ title, promos, ratings }) {
  const ref = useRef(null);
  const { canLeft, canRight, scroll } = useCarousel(ref);

  return (
    <div className="mb-8 relative">
      <div className="flex items-center justify-between px-2">
        <SectionTitle>{title}</SectionTitle>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canLeft}
            className={`h-9 w-9 rounded-2xl border border-black/10 flex items-center justify-center transition ${
              canLeft
                ? "bg-white text-black shadow-sm hover:shadow-md"
                : "bg-black/5 text-black/30 cursor-not-allowed"
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canRight}
            className={`h-9 w-9 rounded-2xl border border-black/10 flex items-center justify-center transition ${
              canRight
                ? "bg-white text-black shadow-sm hover:shadow-md"
                : "bg-black/5 text-black/30 cursor-not-allowed"
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {canLeft && (
        <button
          onClick={() => scroll("left")}
          className="md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 shadow rounded-full border border-white/70"
          aria-label="Anterior"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {canRight && (
        <button
          onClick={() => scroll("right")}
          className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 shadow rounded-full border border-white/70"
          aria-label="Siguiente"
        >
          <ChevronRight size={16} />
        </button>
      )}

      <div
        ref={ref}
        className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth px-2 pt-2"
      >
        {promos.map((p) => (
          <PromoCard key={p.id} promo={p} rating={ratings[p.id]} />
        ))}
      </div>
    </div>
  );
}
