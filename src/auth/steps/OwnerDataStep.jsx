import React from "react";
import { Link } from "react-router-dom";
import ErrorBanner from "../blocks/ErrorBanner";

export default function OwnerDataStep({
  error,
  inputClassName,
  nombreDueno,
  apellidoDueno,
  telefono,
  onChangeNombre,
  onChangeApellido,
  onChangeTelefono,
  onSubmit,
  innerRef,
  onGoWelcome,
}) {
  return (
    <section style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }} className="px-2">
      <div className="pb-4" ref={innerRef}>
        <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar negocio</h2>
        <p className="text-sm text-gray-600 mb-3">Datos del Propietario</p>

        {error && <ErrorBanner message={error} className="mb-2" />}

        <label className="text-sm text-gray-700">Nombres</label>
        <input className={inputClassName} value={nombreDueno} onChange={(event) => onChangeNombre(event.target.value)} />

        <label className="text-sm text-gray-700">Apellidos</label>
        <input className={inputClassName} value={apellidoDueno} onChange={(event) => onChangeApellido(event.target.value)} />

        <label className="text-sm text-gray-700">Telefono</label>
        <input
          className={inputClassName}
          value={telefono}
          onChange={(event) => onChangeTelefono(event.target.value.replace(/[^\d]/g, ""))}
          placeholder="0998888888"
        />

        <div className="pt-4">
          <button onClick={onSubmit} className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow">
            Siguiente
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
