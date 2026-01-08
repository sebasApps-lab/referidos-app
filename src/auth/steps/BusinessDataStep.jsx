import React from "react";
import { Link } from "react-router-dom";
import ErrorBanner from "../blocks/ErrorBanner";

export default function BusinessDataStep({
  error,
  inputClassName,
  ruc,
  nombreNegocio,
  sectorNegocio,
  calle1,
  calle2,
  onChangeRuc,
  onChangeNombre,
  onChangeSector,
  onChangeCalle1,
  onChangeCalle2,
  onSubmit,
  innerRef,
  onGoWelcome,
}) {
  const fieldClassName = `${inputClassName} !mt-0 !mb-0 !border-gray-200 focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none`;
  const labelClassName = "block text-xs text-gray-500 ml-1 mb-0";

  return (
    <section style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }} className="px-2 h-full">
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mt-3 mb-6 text-center">
            Datos del negocio
          </p>

          {error && <ErrorBanner message={error} className="mb-2" />}

          <div className="space-y-6">
            <div className="space-y-1">
              <label className={labelClassName}>RUC</label>
              <input
                className={fieldClassName}
                value={ruc}
                onChange={(event) => onChangeRuc(event.target.value.replace(/[^\d]/g, ""))}
                maxLength={13}
              />
            </div>

            <div className="space-y-1">
              <label className={labelClassName}>Nombre negocio</label>
              <input
                className={fieldClassName}
                value={nombreNegocio}
                onChange={(event) => onChangeNombre(event.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className={labelClassName}>Sector negocio</label>
              <input
                className={fieldClassName}
                value={sectorNegocio}
                onChange={(event) => onChangeSector(event.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className={labelClassName}>Calle 1</label>
              <input
                className={fieldClassName}
                value={calle1}
                onChange={(event) => onChangeCalle1(event.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className={labelClassName}>Calle 2 (opcional)</label>
              <input
                className={fieldClassName}
                value={calle2}
                onChange={(event) => onChangeCalle2(event.target.value)}
              />
            </div>
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
