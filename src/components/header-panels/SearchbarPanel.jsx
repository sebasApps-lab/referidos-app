import SearchBar from "../ui/SearchBar";

export default function SearchbarPanel({ value, onChange, onFilters }) {
  return (
    <div className="hero-search-surface">
      <div className="max-w-6xl mx-auto px-4 pb-3 pt-0">
        <SearchBar
          value={value}
          onChange={onChange}
          onFilters={onFilters}
        />
      </div>
    </div>
  );
}
