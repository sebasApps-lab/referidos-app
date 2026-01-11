import React from "react";
import { useModal } from "../../modals/useModal";

export default function ModalLocationPermission({ onConfirm }) {
  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <LocationOffIcon className="h-6 w-6" />
      </div>
      <div className="text-base font-semibold text-[#2F1A55]">
        Permitir ubicación
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Necesitamos tu permiso para centrar el mapa en tu ubicación.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-500"
        >
          Ahora no
        </button>
        <button
          type="button"
          onClick={() => {
            closeModal();
            onConfirm?.();
          }}
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4B2488]"
        >
          Permitir ubicación
        </button>
      </div>
    </div>
  );
}

function LocationOffIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="10" r="3" />
      <path d="M4 4l16 16" />
    </svg>
  );
}
