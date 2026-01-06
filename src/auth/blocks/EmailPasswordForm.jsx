import React from "react";
import { Link } from "react-router-dom";

export default function EmailPasswordForm({
  authTab,
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  primaryLabel,
  primaryDisabled,
  inputClassName,
  inputDisabled,
}) {
  return (
    <>
      <label className="text-sm text-gray-700">Email</label>
      <input
        type="email"
        placeholder="Ingrese su email..."
        className={inputClassName}
        value={email}
        onChange={(event) => onChangeEmail(event.target.value)}
        disabled={inputDisabled}
      />

      <label className="text-sm text-gray-700">Contraseña</label>
      <input
        type="password"
        placeholder="Ingrese su contraseña..."
        className={inputClassName}
        value={password}
        onChange={(event) => onChangePassword(event.target.value)}
        disabled={inputDisabled}
      />

      <button
        onClick={onSubmit}
        disabled={primaryDisabled}
        className="w-full bg-[#FFC21C] text-white font-semibold py-2.5 rounded-lg shadow active:scale-[0.98] disabled:opacity-50 mt-3"
      >
        {primaryLabel}
      </button>

      {authTab === "login" ? (
        <Link to="/recuperar" className="block text-center text-sm text-gray-400 mt-4 underline">
          OLVIDASTE TU CONTRASENA?
        </Link>
      ) : (
        <div className="block text-center text-sm text-gray-500 mt-4">
          Avanza para elegir el tipo de cuenta
        </div>
      )}
    </>
  );
}
