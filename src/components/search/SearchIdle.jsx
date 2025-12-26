import { useRef } from "react";
import PromoCardHot from "../cards/PromoCardHot";
import SectionTitle from "../sections/SectionTitle";
import { useAutoCarousel } from "../../hooks/useAutoCarousel";
import { useCarousel } from "../../hooks/useCarousel";

const FALLBACK_HOT = [
  { id: "hot-1", titulo: "Promo hot 1", nombreLocal: "Local 1" },
  { id: "hot-2", titulo: "Promo hot 2", nombreLocal: "Local 2" },
  { id: "hot-3", titulo: "Promo hot 3", nombreLocal: "Local 3" },
  { id: "hot-4", titulo: "Promo hot 4", nombreLocal: "Local 4" },
];

const DEFAULT_SUGGESTIONS = [
  "Pizza",
  "Cafe",
  "Sushi",
  "Cine",
  "Gym",
  "Descuento",
];

export default function SearchIdle({
  hotPromos,
  ratings,
  suggestions = DEFAULT_SUGGESTIONS,
  onSelectSuggestion,
}) {
  const safePromos =
    Array.isArray(hotPromos) && hotPromos.length > 0 ? hotPromos : FALLBACK_HOT;
  const ref = useRef(null);
  const { canLeft, canRight, scroll, scrollToStart } = useCarousel(ref);

  useAutoCarousel({
    enabled: safePromos.length > 1,
    intervalMs: 5000,
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

  return (
    <div className="mt-6 px-4">
      <div className="mb-6">
        <SectionTitle>Hot</SectionTitle>
        <div
          ref={ref}
          className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth"
        >
          {safePromos.map((promo) => (
            <PromoCardHot
              key={promo.id}
              promo={promo}
              rating={ratings?.[promo.id]}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Busquedas sugeridas</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onSelectSuggestion?.(term)}
              className="rounded-full border border-[#E9E2F7] bg-white px-3 py-1.5 text-xs font-semibold text-[#5E30A5] hover:bg-[#F5F2FF] transition"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
