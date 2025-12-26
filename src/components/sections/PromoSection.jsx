import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PromoCardCercanas from "../cards/PromoCardCercanas";
import SectionTitle from "./SectionTitle";
import { useCarousel } from "../../hooks/useCarousel";
import { useAutoCarousel } from "../../hooks/useAutoCarousel";

export default function PromoSection({
  title,
  promos,
  ratings,
  CardComponent = PromoCardCercanas,
  autoScroll = false,
  autoScrollInterval = 5000,
  loop = false,
  loopPeek = 0,
}) {
  const ref = useRef(null);
  const loopEnabled = loop && promos?.length > 1;
  const { canLeft, canRight, scroll, scrollToStart } = useCarousel(ref, {
    loop: loopEnabled,
    itemsCount: promos?.length || 0,
    loopPeek,
  });

  useAutoCarousel({
    enabled: autoScroll && promos?.length > 1,
    intervalMs: autoScrollInterval,
    onTick: () => {
      if (canRight) {
        scroll("right");
        return;
      }
      if (canLeft) {
        scrollToStart();
      }
    },
  });

  if (!promos || promos.length === 0) return null;

  const renderItems = loopEnabled
    ? [0, 1, 2].flatMap((loopIndex) =>
        promos.map((promo) => ({
          promo,
          key: `${promo.id}-${loopIndex}`,
        }))
      )
    : promos.map((promo) => ({ promo, key: promo.id }));

  return (
    <div className="mb-8 relative">
      <div className="flex items-center justify-between px-2">
        <SectionTitle>{title}</SectionTitle>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canLeft}
            className={`h-9 w-9 rounded-xl border border-[#E9E2F7] flex items-center justify-center transition ${
              canLeft
                ? "bg-white text-[#5E30A5] shadow-sm hover:border-[#5E30A5]/40"
                : "bg-[#F8F5FF] text-slate-300 cursor-not-allowed"
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canRight}
            className={`h-9 w-9 rounded-xl border border-[#E9E2F7] flex items-center justify-center transition ${
              canRight
                ? "bg-white text-[#5E30A5] shadow-sm hover:border-[#5E30A5]/40"
                : "bg-[#F8F5FF] text-slate-300 cursor-not-allowed"
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
          className="md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 shadow rounded-full border border-[#E9E2F7]"
          aria-label="Anterior"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {canRight && (
        <button
          onClick={() => scroll("right")}
          className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 shadow rounded-full border border-[#E9E2F7]"
          aria-label="Siguiente"
        >
          <ChevronRight size={16} />
        </button>
      )}

      <div
        ref={ref}
        className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth px-2 pt-2"
      >
        {renderItems.map(({ promo, key }) => (
          <CardComponent
            key={key}
            promo={promo}
            rating={ratings?.[promo.id]}
          />
        ))}
      </div>
    </div>
  );
}
