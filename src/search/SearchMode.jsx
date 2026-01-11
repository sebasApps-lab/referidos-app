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
  variant = "overlay",
  headerClassName = "",
  contentClassName = "",
  panelClassName = "",
  className = "",
}) {
  const isInline = variant === "inline";
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
          open ? "pointer-events-none" : ""
        }`}
      >
        {children}
      </div>

      {!isInline && <SearchOverlay open={open} onClick={handleClose} />}

      <div
        className={`${
          isInline
            ? "absolute inset-0 z-[50] bg-white"
            : "fixed inset-0 z-[100]"
        } flex flex-col transition duration-200 ${panelClassName} ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className={`${isInline ? "pt-0" : "pt-2"} ${headerClassName}`}>
          {searchBar}
        </div>
        <div
          className={`${
            isInline
              ? "flex-1 px-4 pb-6 pt-4"
              : "flex-1 overflow-y-auto px-4 pb-6 pt-[calc(var(--cliente-header-height,0px)+32px)]"
          } ${contentClassName}`}
        >
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
