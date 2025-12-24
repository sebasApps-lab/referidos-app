import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({ value, onChange, onFilters }) {
  return (
    <div className="px-4">
      <div className="flex items-center gap-3 rounded-2xl border border-[#E9E2F7] bg-white px-4 py-3 shadow-sm">
        <span className="text-[#5E30A5]">
          <Search size={18} />
        </span>
        <input
          placeholder="Buscar promos o locales"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm font-semibold text-[#2F1A55] placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={onFilters}
          className="h-9 w-9 rounded-xl border border-[#E9E2F7] bg-white flex items-center justify-center text-slate-400 hover:text-[#5E30A5]"
          aria-label="Abrir filtros"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
