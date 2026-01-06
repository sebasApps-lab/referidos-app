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
  return (
    <section style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }} className="px-2">
      <div className="pb-4" ref={innerRef}>
        <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar negocio</h2>
        <p className="text-sm text-gray-600 mb-3">Datos del negocio</p>

        {error && <ErrorBanner message={error} className="mb-2" />}

        <label className="text-sm text-gray-700">RUC</label>
        <input
          className={inputClassName}
          value={ruc}
          onChange={(event) => onChangeRuc(event.target.value.replace(/[^\d]/g, ""))}
          maxLength={13}
        />

        <label className="text-sm text-gray-700">Nombre negocio</label>
        <input className={inputClassName} value={nombreNegocio} onChange={(event) => onChangeNombre(event.target.value)} />

        <label className="text-sm text-gray-700">Sector negocio</label>
        <input className={inputClassName} value={sectorNegocio} onChange={(event) => onChangeSector(event.target.value)} />

        <label className="text-sm text-gray-700">Calle 1</label>
        <input className={inputClassName} value={calle1} onChange={(event) => onChangeCalle1(event.target.value)} />

        <label className="text-sm text-gray-700">Calle 2 (opcional)</label>
        <input className={inputClassName} value={calle2} onChange={(event) => onChangeCalle2(event.target.value)} />

        <div className="pt-4">
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
