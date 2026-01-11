import { useCallback } from "react";
import SearchOverlay from "./SearchOverlay";
import { useSearchKeyboard } from "./hooks/useSearchKeyboard";

export default function SearchMode({
  open = false,
  onOpenChange,
  onBack,
  onEscape,
  searchBar,
  results,
  empty,
  suggestions,
  loading,
  footer,
  children,
  className = "",
}) {
  const handleClose = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    onOpenChange?.(false);
  }, [onBack, onOpenChange]);

  useSearchKeyboard({
    active: open,
    onEscape: onEscape || handleClose,
    onBack: handleClose,
  });

  return (
    <div className={`relative ${className}`}>
      <div
        className={`transition duration-200 ${
          open ? "opacity-60 scale-[0.98] pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>

      <SearchOverlay open={open} onClick={handleClose} />

      <div
        className={`fixed inset-0 z-[6] flex flex-col transition duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="pt-2">{searchBar}</div>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {loading}
          {results}
          {empty}
          {suggestions}
        </div>
        {footer}
      </div>
    </div>
  );
}
