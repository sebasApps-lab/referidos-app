import React from "react";
import { Check, Lock, Minus, Plus, X } from "lucide-react";

export default function PinAccessCard({
  showPinForm,
  pinEnabled,
  pinStep,
  pinValue,
  pinSlots,
  pinReveal,
  pinComplete,
  pinMatches,
  pinFocused,
  onRemovePin,
  onTogglePinForm,
  onPinPointerDown,
  onPinValueChange,
  onPinFocus,
  onPinBlur,
  registerHiddenRef,
  onResetPinForm,
  onPinNext,
  onPinConfirm,
}) {
  const firstEmpty = pinSlots.findIndex((char) => !char);
  const activeIndex =
    firstEmpty === -1 ? pinSlots.length - 1 : firstEmpty;

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-[#5E30A5]" />
          <span className="text-xs font-semibold text-[#2F1A55]">
            {showPinForm
              ? pinStep === "confirm"
                ? "Confirmar PIN"
                : "Anadir PIN"
              : "PIN"}
          </span>
          {pinEnabled ? (
            <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-1 text-emerald-600">
              <Check size={12} />
            </span>
          ) : null}
        </div>
        {pinEnabled ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRemovePin}
              className="h-8 w-8 rounded-full border border-red-200 bg-red-50 text-red-500 flex items-center justify-center"
              aria-label="Quitar PIN"
            >
              <Minus size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onTogglePinForm}
            className={`h-8 w-8 rounded-full border flex items-center justify-center ${
              showPinForm
                ? "border-slate-900 bg-white text-slate-900"
                : "border-emerald-300 text-emerald-500"
            }`}
            aria-label={showPinForm ? "Cerrar PIN" : "Agregar PIN"}
          >
            {showPinForm ? <X size={14} /> : <Plus size={14} />}
          </button>
        )}
      </div>
      {showPinForm ? (
        <div className="mt-4 space-y-5">
          <p className="text-xs text-slate-500 text-center">
            {pinStep === "confirm" ? "Ingresar el PIN de nuevo." : "Ingresa un PIN."}
          </p>
          <div
            className="relative flex items-center justify-center gap-2"
            onPointerDown={onPinPointerDown}
          >
            <input
              ref={registerHiddenRef}
              value={pinValue}
              onChange={(event) => onPinValueChange(event.target.value)}
              onFocus={onPinFocus}
              onBlur={onPinBlur}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="absolute inset-0 h-full w-full opacity-0"
              aria-label="PIN"
            />
            {pinSlots.map((char, index) => {
              const displayChar = char
                ? pinReveal[index]
                  ? char
                  : "*"
                : "";
              const isActive = pinFocused && index === activeIndex;
              return (
                <div
                  key={`pin-${index}`}
                  className={`h-11 w-11 rounded-xl border bg-white text-center text-lg font-semibold text-[#5E30A5] flex items-center justify-center ${
                    isActive
                      ? "border-[#5E30A5] ring-2 ring-[#5E30A5]/20"
                      : "border-[#D8CFF2]"
                  }`}
                >
                  {displayChar || (isActive ? (
                    <span className="pin-caret inline-flex h-5 w-px bg-[#5E30A5]" />
                  ) : null)}
                </div>
              );
            })}
          </div>
          {pinStep === "confirm" ? (
            <div className="text-xs pl-1 text-center">
              {(() => {
                const color = pinComplete
                  ? pinMatches
                    ? "text-emerald-600"
                    : "text-red-500"
                  : "text-slate-400";
                const Icon = pinComplete ? (pinMatches ? Check : X) : X;
                return (
                  <span className={`inline-flex items-center gap-2 ${color}`}>
                    <Icon size={12} />
                    El PIN debe coincidir
                  </span>
                );
              })()}
            </div>
          ) : null}
          <div className="mt-2 flex items-center justify-between text-sm font-semibold px-4">
            <button
              type="button"
              onClick={onResetPinForm}
              className="text-[#2F1A55]"
            >
              Cancelar
            </button>
            {pinStep === "confirm" ? (
              <button
                type="button"
                onClick={onPinConfirm}
                disabled={!pinComplete || !pinMatches}
                className={
                  pinComplete && pinMatches ? "text-[#5E30A5]" : "text-slate-400"
                }
              >
                Confirmar
              </button>
            ) : (
              <button
                type="button"
                onClick={onPinNext}
                disabled={!pinComplete}
                className={pinComplete ? "text-[#5E30A5]" : "text-slate-400"}
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
