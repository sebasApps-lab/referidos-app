import React, { useMemo } from "react";
import ErrorBanner from "../blocks/ErrorBanner";
import {
  formatBirthdateInput,
  getBirthdateStatus,
  normalizeUserName,
} from "../utils/userProfileUtils";

export default function UserProfileStep({
  error,
  inputClassName,
  nombreDueno,
  apellidoDueno,
  genero,
  fechaNacimiento,
  subtitle,
  underageMessage,
  onChangeNombre,
  onChangeApellido,
  onChangeGenero,
  onChangeFechaNacimiento,
  onSubmit,
  onSkip,
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
  const genderOptions = [
    { label: "Femenino", value: "femenino" },
    { label: "Masculino", value: "masculino" },
    { label: "No-binario", value: "no_binario" },
    { label: "Prefiero no especificar", value: "no_especificar" },
  ];
  const selectedGenero = genero || "no_especificar";
  const optionBase =
    "px-3 py-1.5 text-xs border rounded-full transition-colors";

  return (
    <section
      style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }}
      className="px-2 h-full"
    >
      <div className="pb-4 flex h-full flex-col" ref={innerRef}>
        <p className="text-sm text-gray-600 mt-3 mb-6 text-center">
          {subtitle || "Eres quien administrara el negocio en la app."}
        </p>

        {error && <ErrorBanner message={error} className="mb-2" />}

        <div className="space-y-6">
          <div className="space-y-1">
            <label className={labelClassName}>Nombre(s)</label>
            <input
              className={fieldClassName}
              value={nombreDueno}
              maxLength={26}
              onChange={(event) =>
                onChangeNombre(normalizeUserName(event.target.value))
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
                onChangeApellido(normalizeUserName(event.target.value))
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
                {underageMessage || "Tienes que ser mayor de edad para ser el administrador."}
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className={labelClassName}>
              ¿Con qué género te identificas?
            </label>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((option) => {
                const isSelected = selectedGenero === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChangeGenero?.(option.value)}
                    className={`${optionBase} ${
                      isSelected
                        ? "border-[#5E30A5] text-[#5E30A5] bg-[#F5F0FF]"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="pt-10">
            <button
              onClick={onSubmit}
              disabled={primaryDisabled}
              className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow disabled:opacity-60"
            >
              Continuar
            </button>
            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="w-full text-sm font-semibold text-gray-500 mt-2"
              >
                Omitir por ahora
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
