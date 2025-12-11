// src/components/modals/ModalCodigoNegocio.jsx
import { useState, useEffect } from "react";
import ModalBase from "./ModalBase";
import { useModal } from "../../modals/useModal";
import { CODE_RE } from "../../utils/validators";

const DEFAULT_CODES = ["REF-123456", "REF-654321"];

function isPartialFormat(code) {
  if (!code) return true;
  if (code === "R" || code === "RE" || code === "REF" || code === "REF-") return true;
  if (!code.startsWith("REF-")) return false;
  const tail = code.slice(4);
  return /^[0-9]{0,6}$/.test(tail);
}

export default function ModalCodigoNegocio({ onConfirm }) {
  const { closeModal } = useModal();
  const [codigo, setCodigo] = useState("");
  const [valid, setValid] = useState(false);
  const [formatOk, setFormatOk] = useState(true);
  const whatsappHref =
    "https://wa.me/593000000000?text=" +
    encodeURIComponent("Hola! Deseo recibir un codigo de registro para registrar mi negocio.");

  useEffect(() => {
    const upper = codigo.toUpperCase();
    const isFormat = isPartialFormat(upper);
    setFormatOk(isFormat);
    const ok = isFormat && CODE_RE.test(upper) && DEFAULT_CODES.includes(upper);
    setValid(ok);
  }, [codigo]);

  const handleNext = () => {
    if (!valid) return;
    onConfirm?.(codigo.toUpperCase());
    closeModal();
  };

  return (
    <ModalBase title="Código de registro">
      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-700">Solo necesario para negocios</div>

        <input
          autoFocus
          className={`w-full border rounded-lg px-3 py-2 text-sm uppercase tracking-wide transition-colors ${
            formatOk
              ? "border-gray-400 text-gray-900 focus:border-[#5E30A5] focus:outline focus:outline-1 focus:outline-[#5E30A5] focus:ring-0"
              : "border-red-500 text-red-600 focus:border-red-500 focus:outline focus:outline-1 focus:outline-red-500 focus:ring-0"
          }`}
          placeholder="REF-435526"
          value={codigo}
          onChange={(e) => {
            const upper = e.target.value.toUpperCase();
            setCodigo(upper);
            setFormatOk(isPartialFormat(upper));
          }}
        />

        <a href={whatsappHref} target="_blank" rel="noreferrer" className="text-xs text-[#5E30A5] underline self-start -mt-1 block">
          Solicitar código para negocio
        </a>

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
