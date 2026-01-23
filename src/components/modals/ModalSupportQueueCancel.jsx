import React from "react";
import { useModal } from "../../modals/useModal";

export default function ModalSupportQueueCancel({
  onConfirmCancel,
  onContinueQueue,
}) {
  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="text-center text-sm font-semibold text-gray-900">
        Cancelar busqueda
      </div>
      <div className="mt-3 text-sm text-gray-600 text-center">
        Si cancelas la busqueda, tu caso no sera atendido.
      </div>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => {
            closeModal();
            onContinueQueue?.();
          }}
          className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600"
        >
          Seguir en cola
        </button>
        <button
          type="button"
          onClick={() => {
            closeModal();
            onConfirmCancel?.();
          }}
          className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white"
        >
          Cancelar cola
        </button>
      </div>
    </div>
  );
}
