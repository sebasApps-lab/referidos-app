import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({ value, onChange, onFilters }) {
  return (
    <div className="px-4">
      <div className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur">
        <span className="text-[#E07A5F]">
          <Search size={18} />
        </span>
        <input
          placeholder="Buscar promos o locales"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm font-semibold text-[#1D1B1A] placeholder:text-black/40 focus:outline-none"
        />
        <button
          type="button"
          onClick={onFilters}
          className="h-9 w-9 rounded-2xl border border-black/10 bg-white/80 flex items-center justify-center text-black/60 hover:text-black"
          aria-label="Abrir filtros"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
