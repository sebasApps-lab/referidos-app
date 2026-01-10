import React from "react";
import ErrorBanner from "../blocks/ErrorBanner";

export default function BusinessAddressStep({
  innerRef,
  isSucursalPrincipal,
  onChangeSucursalPrincipal,
  error,
  onSubmit,
}) {
  return (
    <section
      style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }}
      className="px-2 h-full"
    >
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <div className="flex-1 mt-3">
          {error && <ErrorBanner message={error} className="mb-2" />}
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

        <div className="mt-auto pt-4">
          <button
            onClick={onSubmit}
            className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow"
          >
            Entrar
          </button>
        </div>
      </div>
    </section>
  );
}
