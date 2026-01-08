import React from "react";
import { Link } from "react-router-dom";
import ErrorBanner from "../blocks/ErrorBanner";
import { normalizeBusinessName } from "../utils/businessDataUtils";

export default function BusinessDataStep({
  error,
  inputClassName,
  ruc,
  nombreNegocio,
  categoriaNegocio,
  categories,
  subtitle,
  isSucursalPrincipal,
  onChangeRuc,
  onChangeNombre,
  onChangeCategoria,
  onChangeSucursalPrincipal,
  onSubmit,
  innerRef,
  onGoWelcome,
}) {
  const fieldClassName = `${inputClassName} !mt-0 !mb-0 !border-gray-200 focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none`;
  const labelClassName = "block text-xs text-gray-500 ml-1 mb-0";
  const categoryList = categories || [];
  const selectedCategory = categoriaNegocio || "";

  return (
    <section style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }} className="px-2 h-full">
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mt-3 mb-6 text-center">
            {subtitle || "Así te verán tus clientes"}
          </p>

          {error && <ErrorBanner message={error} className="mb-2" />}

          <div className="space-y-6">
            <div className="space-y-1">
              <label className={labelClassName}>Nombre negocio</label>
              <input
                className={fieldClassName}
                value={nombreNegocio}
                maxLength={38}
                onChange={(event) =>
                  onChangeNombre(normalizeBusinessName(event.target.value))
                }
              />
            </div>

            <div className="space-y-2">
              <label className={labelClassName}>Categoría</label>
              <div className="grid grid-cols-2 gap-3">
                {categoryList.map((category) => {
                  const isActive = selectedCategory === category.id;
                  const iconColor = isActive ? "text-[#5E30A5]" : "text-gray-500";
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => onChangeCategoria?.(category.id)}
                      className={`aspect-square rounded-xl border px-3 py-3 flex flex-col items-center justify-center text-center transition-colors ${
                        isActive
                          ? "border-[#5E30A5] bg-[#5E30A5]/10"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center ${iconColor}`}>
                        <svg
                          viewBox={category.icon?.viewBox || "0 0 24 24"}
                          className="w-7 h-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {(category.icon?.paths || []).map((path) => (
                            <path key={path} d={path} />
                          ))}
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-gray-700 mt-1">
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClassName}>RUC</label>
              <input
                className={fieldClassName}
                value={ruc}
                onChange={(event) => onChangeRuc(event.target.value.replace(/[^\d]/g, ""))}
                maxLength={13}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={Boolean(isSucursalPrincipal)}
                onChange={(event) =>
                  onChangeSucursalPrincipal?.(event.target.checked)
                }
                className="h-4 w-4 accent-[#5E30A5]"
              />
              Este es mi sucursal principal
            </label>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button onClick={onSubmit} className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow">
            Registrar Negocio
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
