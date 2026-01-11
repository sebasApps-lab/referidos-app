import React from "react";
import { useModal } from "../../modals/useModal";

export default function ModalGpsDisabled() {
  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <GpsOffIcon className="h-6 w-6" />
      </div>
      <div className="text-base font-semibold text-[#2F1A55]">
        GPS desactivado
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Activa el GPS de tu dispositivo para continuar.
      </p>
      <div className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4B2488]"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

function GpsOffIcon({ className = "" }) {
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
      <path d="M12 0.518l8 15-8-3.5-8 3.5 8-15z" />
      <path d="M4 4l16 16" />
    </svg>
  );
}
