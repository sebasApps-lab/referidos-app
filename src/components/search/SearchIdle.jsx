import PromoCardHot from "../cards/PromoCardHot";
import PromoSection from "../sections/PromoSection";
import SectionTitle from "../sections/SectionTitle";
import { HOT_PROMOS } from "../../cliente/inicio/InicioPromosPreview";

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
    Array.isArray(hotPromos) && hotPromos.length > 0
      ? hotPromos
      : HOT_PROMOS;

  return (
    <div className="mt-6 px-4">
      <div className="mb-6">
        <PromoSection
          title="Hot"
          promos={safePromos}
          ratings={ratings}
          CardComponent={PromoCardHot}
          autoScroll
          autoScrollInterval={5000}
        />
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
