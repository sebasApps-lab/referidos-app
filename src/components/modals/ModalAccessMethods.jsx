import { Fingerprint, Lock } from "lucide-react";
import { useModal } from "../../modals/useModal";

export default function ModalAccessMethods() {
  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-gray-700 shadow-2xl">
      <div className="text-center text-sm font-semibold text-gray-900">
        Simplifica el inicio de sesion anadiendo uno de los siguientes metodos de inicio
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex aspect-square flex-col items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700"
        >
          <Fingerprint className="mb-2 h-6 w-6 text-[#5E30A5]" />
          Huella
        </button>
        <button
          type="button"
          className="flex aspect-square flex-col items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700"
        >
          <Lock className="mb-2 h-6 w-6 text-[#5E30A5]" />
          Pin
        </button>
      </div>
      <button
        type="button"
        onClick={closeModal}
        className="mt-5 w-full text-sm font-semibold text-gray-500"
      >
        Ahora no
      </button>
    </div>
  );
}
