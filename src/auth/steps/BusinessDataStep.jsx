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
  subtitle,
  isSucursalPrincipal,
  onChangeRuc,
  onChangeNombre,
  onOpenCategory,
  onChangeSucursalPrincipal,
  onSubmit,
  innerRef,
  onGoWelcome,
}) {
  const fieldClassName = `${inputClassName} !mt-0 !mb-0 !border-gray-200 focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none`;
  const labelClassName = "block text-xs text-gray-500 ml-1 mb-0";
  const selectedCategory = categoriaNegocio || "";

  return (
    <section
      style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }}
      className="px-2 h-full"
    >
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
              <button
                type="button"
                onClick={onOpenCategory}
                className={`${fieldClassName} flex items-center gap-2 px-3 !pr-0`}
              >
                <span className="flex-1 text-left text-gray-900">
                  {selectedCategory || "Elige una categoría"}
                </span>
                <span className="flex items-center justify-center h-full px-3 border-l border-black text-gray-900">
                  <PencilIcon className="w-4 h-4" />
                </span>
              </button>
            </div>

            <div className="space-y-1">
              <label className={labelClassName}>RUC</label>
              <input
                className={fieldClassName}
                value={ruc}
                onChange={(event) =>
                  onChangeRuc(event.target.value.replace(/[^\d]/g, ""))
                }
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
          <button
            onClick={onSubmit}
            className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow"
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
