import SearchBar from "../search/SearchBar";

export default function SearchbarPanel({
  value,
  onChange,
  onFilters,
  onFocus,
  onCancel,
  showBack = false,
}) {
  return (
    <div className="hero-search-surface">
      <div className="max-w-6xl mx-auto px-4 pb-3 pt-0">
        <SearchBar
          value={value}
          onChange={onChange}
          onFilters={onFilters}
          onFocus={onFocus}
          onCancel={onCancel}
          showBack={showBack}
          autoFocus={showBack}
        />
      </div>
    </div>
  );
}
