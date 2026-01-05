import React from "react";
import { Check, Lock, Minus, Plus, X } from "lucide-react";

export default function PinAccessCard({
  showPinForm,
  pinEnabled,
  pinStep,
  pinSlots,
  pinReveal,
  pinComplete,
  pinMatches,
  onRemovePin,
  onTogglePinForm,
  onPinPointerDown,
  onUpdatePinSlot,
  onPinKeyDown,
  registerPinRef,
  onResetPinForm,
  onPinNext,
  onPinConfirm,
}) {
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
          <div className="flex items-center justify-center gap-2">
            {pinSlots.map((char, index) => (
              <input
                key={`pin-${index}`}
                value={char}
                onChange={(event) => onUpdatePinSlot(event.target.value)}
                onKeyDown={onPinKeyDown}
                onPointerDown={onPinPointerDown}
                ref={registerPinRef(index)}
                maxLength={1}
                type={pinReveal[index] ? "text" : "password"}
                inputMode="numeric"
                pattern="[0-9]*"
                className="h-11 w-11 rounded-xl border border-[#D8CFF2] bg-white text-center text-lg font-semibold text-[#5E30A5] outline-none transition focus:border-[#5E30A5] focus:ring-2 focus:ring-[#5E30A5]/20"
              />
            ))}
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
