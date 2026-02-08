import { useModal } from "../../modals/useModal";

export default function ModalAccountVerifySkip({ onConfirm }) {
  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="text-center text-sm font-semibold text-gray-900">
        Al verificar tu cuenta podras:
      </div>
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <div>Publicar hasta 2 promociones adicionales</div>
        <div>Obtener mayor visibilidad en la app</div>
        <div>Mostrar tu perfil como cuenta verificada</div>
      </div>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-600"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={() => {
            closeModal();
            onConfirm?.();
          }}
          className="flex-1 rounded-lg bg-[#5E30A5] py-2 text-sm font-semibold text-white"
        >
          Ahora no
        </button>
      </div>
    </div>
  );
}
