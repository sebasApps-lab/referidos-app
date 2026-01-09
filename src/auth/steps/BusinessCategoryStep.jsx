import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function BusinessCategoryStep({
  subtitle,
  helperLabel,
  categories,
  subcategories,
  currentCategory,
  inputClassName,
  onConfirmCategory,
  innerRef,
  onGoWelcome,
}) {
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const categoryList = categories || [];
  const subcategoryMap = subcategories || {};

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

  const fieldClassName = `${inputClassName} !mt-0 !mb-0 !border-gray-200 focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none`;
  const labelClassName = "block text-xs text-gray-500 ml-1 mb-0";
  const isReady = Boolean(selectedSubLabel);

  const handleSelectParent = (id) => {
    setSelectedParent(id);
    setSelectedSub("");
  };

  const handleConfirm = () => {
    if (!selectedSubLabel) return;
    onConfirmCategory?.(selectedSubLabel);
  };

  return (
    <section
      style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }}
      className="px-2 h-full"
    >
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mt-3 mb-6 text-center">
            {subtitle || "No te preocupes, puedes cambiarlo más adelante."}
          </p>

          <div className="space-y-4">
            <label className={labelClassName}>
              {helperLabel ||
                "Así podremos mostrar tus promos a las personas correctas."}
            </label>

            {selectedParent ? (
              <button
                type="button"
                onClick={() => handleSelectParent("")}
                className={`${fieldClassName} flex items-center gap-2 px-3 !pr-0 mb-3`}
              >
                <span className="flex-1 text-left text-gray-900">
                  {selectedParentLabel}
                </span>
                <span className="flex items-center justify-center h-full px-3 border-l border-black text-gray-900">
                  <PencilIcon className="w-4 h-4" />
                </span>
              </button>
            ) : null}

            {!selectedParent ? (
              <CategoryGrid
                items={categoryList}
                selectedId={selectedParent}
                onSelect={handleSelectParent}
              />
            ) : (
              <CategoryGrid
                items={subcategoryList}
                selectedId={selectedSub}
                onSelect={setSelectedSub}
              />
            )}
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

        <div className="text-center mt-3">
          <Link to="/" onClick={onGoWelcome} className="text-sm text-gray-700">
            YA TENGO UNA CUENTA.
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryGrid({ items, selectedId, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => {
        const isActive = selectedId === item.id;
        const iconColor = isActive ? "text-[#5E30A5]" : "text-gray-500";
        const icon = item.icon || {};
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            className={`aspect-[4/3] rounded-xl border p-2 flex flex-col items-center justify-start text-center transition-colors ${
              isActive
                ? "border-[#5E30A5] bg-[#5E30A5]/10"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center ${iconColor} flex-shrink-0 mt-1`}
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
            <span className="text-[11px] font-semibold text-gray-700 mt-1 leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PencilIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}
