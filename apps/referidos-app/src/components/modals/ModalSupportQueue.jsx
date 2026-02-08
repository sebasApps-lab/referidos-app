import React from "react";
import { Loader2, X } from "lucide-react";
import { useModal } from "../../modals/useModal";

export default function ModalSupportQueue({
  onCancelQueue,
  onConfirmUnderstand,
  onRequestCancel,
}) {
  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-gray-900">
          Buscando asesor disponible
        </div>
        <button
          type="button"
          onClick={() => {
            closeModal();
            onConfirmUnderstand?.();
          }}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-600">
        <Loader2 className="animate-spin text-[#5E30A5]" size={16} />
        Estamos buscando un asesor disponible.
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Puede tomar varios minutos. Puedes cerrar este mensaje y te
        notificaremos cuando haya un asesor disponible.
      </p>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => {
            closeModal();
            onConfirmUnderstand?.();
          }}
          className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600"
        >
          Entiendo
        </button>
        <button
          type="button"
          onClick={() => {
            closeModal();
            onRequestCancel?.();
          }}
          className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
