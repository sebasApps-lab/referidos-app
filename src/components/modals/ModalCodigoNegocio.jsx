// src/components/modals/ModalCodigoNegocio.jsx
import { useState, useEffect } from "react";
import ModalBase from "./ModalBase";
import { useModal } from "../../modals/useModal";
import { CODE_RE } from "../../utils/validators";

const DEFAULT_CODES = ["REF-001532", "REF-003765"];

export default function ModalCodigoNegocio({ onConfirm }) {
  const { closeModal } = useModal();
  const [codigo, setCodigo] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const upper = codigo.toUpperCase();
    const ok = CODE_RE.test(upper) && DEFAULT_CODES.includes(upper);
    setValid(ok);
  }, [codigo]);

  const handleNext = () => {
    if (!valid) return;
    onConfirm?.(codigo.toUpperCase());
    closeModal();
  };

  return (
    <ModalBase title="Código de registro">
      <div className="space-y-3">
        <p className="text-sm text-gray-600 text-center">
          Ingresa el código de registro para negocios.
        </p>

        <input
          autoFocus
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase tracking-wide"
          placeholder="REF-000000"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
        />

        <div className="text-xs text-gray-500 text-center">
          Formato requerido: REF-######. Se habilitará el botón al ser válido.
        </div>

        <button
          onClick={handleNext}
          disabled={!valid}
          className={`w-full font-semibold py-2.5 rounded-lg shadow ${
            valid
              ? "bg-[#5E30A5] text-white hover:bg-[#4b2784]"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Siguiente
        </button>
      </div>
    </ModalBase>
  );
}
