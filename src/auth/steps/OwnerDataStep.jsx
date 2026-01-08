import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ErrorBanner from "../blocks/ErrorBanner";
import {
  formatBirthdateInput,
  getBirthdateStatus,
  normalizeOwnerName,
} from "../utils/ownerDataUtils";

export default function OwnerDataStep({
  error,
  inputClassName,
  nombreDueno,
  apellidoDueno,
  fechaNacimiento,
  onChangeNombre,
  onChangeApellido,
  onChangeFechaNacimiento,
  onSubmit,
  innerRef,
  onGoWelcome,
  primaryDisabled,
}) {
  const birthStatus = useMemo(
    () => getBirthdateStatus(fechaNacimiento),
    [fechaNacimiento]
  );
  const fieldClassName = `${inputClassName} !mt-0 !mb-0 !border-gray-200 focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/30 focus:outline-none`;
  const labelClassName = "block text-xs text-gray-500 ml-1 mb-0";

  return (
    <section style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }} className="px-2 h-full">
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <p className="text-sm text-gray-600 mt-3 mb-6 text-center">
          Eres quien administrara el negocio en la app.
        </p>

        {error && <ErrorBanner message={error} className="mb-2" />}

        <div className="space-y-6 flex-1">
          <div className="space-y-1">
            <label className={labelClassName}>Nombre(s)</label>
            <input
              className={fieldClassName}
              value={nombreDueno}
              maxLength={26}
              onChange={(event) =>
                onChangeNombre(normalizeOwnerName(event.target.value))
              }
            />
          </div>

          <div className="space-y-1">
            <label className={labelClassName}>Apellido(s)</label>
            <input
              className={fieldClassName}
              value={apellidoDueno}
              maxLength={26}
              onChange={(event) =>
                onChangeApellido(normalizeOwnerName(event.target.value))
              }
            />
          </div>

          <div className="space-y-1">
            <label className={labelClassName}>¿Cuando naciste?</label>
            <input
              className={fieldClassName}
              value={fechaNacimiento}
              maxLength={10}
              inputMode="numeric"
              placeholder="DD/MM/AAAA"
              onChange={(event) =>
                onChangeFechaNacimiento(formatBirthdateInput(event.target.value))
              }
            />

            {birthStatus.isValid && birthStatus.isUnderage ? (
              <div className="text-xs text-red-500">
                Tienes que ser mayor de edad para ser el administrador.
              </div>
            ) : null}
          </div>
        </div>

        <div className="pt-10 mt-auto">
          <button
            onClick={onSubmit}
            disabled={primaryDisabled}
            className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60"
          >
            Confirmar
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
