import React, { useEffect, useMemo, useState } from "react";

// Lint purge (no-unused-vars): se removio prop `onGoWelcome` no consumida (firma del componente).
export default function BusinessCategoryStep({
  subtitle,
  helperLabel,
  categories,
  subcategories,
  currentCategory,
  onConfirmCategory,
  innerRef,
}) {
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const categoryList = useMemo(() => categories || [], [categories]);
  const subcategoryMap = useMemo(() => subcategories || {}, [subcategories]);

  useEffect(() => {
    if (!currentCategory) {
      setSelectedParent("");
      setSelectedSub("");
      return;
    }

    let parentId = "";
    let subId = "";

    for (const [key, list] of Object.entries(subcategoryMap)) {
      const match = list?.find((item) => item.label === currentCategory);
      if (match) {
        parentId = key;
        subId = match.id;
        break;
      }
    }

    if (!parentId) {
      const parentMatch = categoryList.find(
        (item) => item.label === currentCategory
      );
      parentId = parentMatch?.id || "";
    }

    setSelectedParent(parentId);
    setSelectedSub(subId);
  }, [categoryList, currentCategory, subcategoryMap]);

  const selectedParentLabel = useMemo(() => {
    if (!selectedParent) return "";
    const match = categoryList.find((item) => item.id === selectedParent);
    return match?.label || "";
  }, [categoryList, selectedParent]);

  const subcategoryList = useMemo(() => {
    if (!selectedParent) return [];
    return subcategoryMap[selectedParent] || [];
  }, [selectedParent, subcategoryMap]);

  const selectedSubLabel = useMemo(() => {
    if (!selectedSub) return "";
    const match = subcategoryList.find((item) => item.id === selectedSub);
    return match?.label || "";
  }, [selectedSub, subcategoryList]);

  const parentItems = useMemo(
    () => categoryList.map((item) => ({ ...item, type: "parent" })),
    [categoryList]
  );
  const subItems = useMemo(
    () => subcategoryList.map((item) => ({ ...item, type: "sub" })),
    [subcategoryList]
  );

  const labelClassName = "block text-xs text-gray-500 ml-1 mb-0";
  const hasSubcategories = subcategoryList.length > 0;
  const isReady = Boolean(selectedParent) && (!hasSubcategories || selectedSubLabel);

  const handleSelectParent = (id) => {
    setSelectedParent(id);
    setSelectedSub("");
  };

  const handleConfirm = () => {
    if (!selectedParent) return;
    const value = hasSubcategories ? selectedSubLabel : selectedParentLabel;
    if (!value) return;
    onConfirmCategory?.(value);
  };

  const handleClearParent = () => {
    setSelectedParent("");
    setSelectedSub("");
  };

  const showSubcategoryGrid = Boolean(selectedParent) && hasSubcategories;
  const gridItems = showSubcategoryGrid
    ? [
        parentItems.find((item) => item.id === selectedParent),
        ...subItems,
      ].filter(Boolean)
    : parentItems;

  return (
    <section
      style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }}
      className="px-2 h-full"
    >
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mt-3 mb-6 text-center">
            {subtitle || "No te preocupes, puedes cambiarlo después"}
          </p>

          <div className="space-y-4">
            <label className={labelClassName}>
              {helperLabel ||
                "Así podremos mostrar tus promos a las personas correctas."}
            </label>

            <CategoryGrid
              items={gridItems}
              selectedParentId={selectedParent}
              selectedSubId={selectedSub}
              onSelectParent={handleSelectParent}
              onSelectSub={setSelectedSub}
              onClearParent={handleClearParent}
              className="mt-3"
            />
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={handleConfirm}
            disabled={!isReady}
            className={`w-full py-2.5 rounded-lg font-semibold shadow ${
              isReady
                ? "bg-[#10B981] text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}

function CategoryGrid({
  items,
  selectedParentId,
  selectedSubId,
  onSelectParent,
  onSelectSub,
  onClearParent,
  className = "",
}) {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      {items.map((item) => {
        if (!item) return null;
        const isParent = item.type === "parent";
        const isActive = isParent
          ? selectedParentId === item.id
          : selectedSubId === item.id;
        const iconColor = isActive ? "text-[#5E30A5]" : "text-gray-500";
        const icon = item.icon || {};
        const canSelect = !isParent || !isActive;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (!canSelect) return;
              if (isParent) {
                onSelectParent?.(item.id);
              } else {
                onSelectSub?.(item.id);
              }
            }}
            className={`aspect-[4/3] rounded-xl border p-2 flex flex-col items-center justify-start text-center transition-colors relative ${
              isActive
                ? "border-[#5E30A5] bg-[#5E30A5]/10"
                : "border-gray-200 bg-white"
            }`}
          >
            {isParent && isActive && (
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  onClearParent?.();
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  event.stopPropagation();
                  onClearParent?.();
                }}
                className="absolute top-1 right-1 h-5 w-5 rounded-full border border-[#5E30A5] bg-white text-[#5E30A5] text-[12px] leading-none flex items-center justify-center"
                aria-label="Quitar categoria"
              >
                ×
              </span>
            )}
            <div
              className={`w-8 h-8 flex items-center justify-center ${iconColor} flex-shrink-0 mt-0.5`}
            >
              <svg
                viewBox={icon.viewBox || "0 0 24 24"}
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {(icon.paths || []).map((path) => (
                  <path key={path} d={path} />
                ))}
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-gray-700 mt-0.5 leading-[1.05] min-h-[22px]">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

