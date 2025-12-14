// src/components/modals/ModalSplashChoiceOverlay.jsx
import { useEffect, useState } from "react";
import { useModal } from "../../modals/useModal";
import { CODE_RE } from "../../utils/validators";

const cards = [
  { key: "cliente", title: "Cliente", desc: "Gana y canjea promociones escaneando códigos." },
  { key: "negocio", title: "Negocio", desc: "Administra promos y canjes para tus sucursales." },
];

const DEFAULT_CODES = ["REF-123456", "REF-654321"];

const isPartialFormat = (code) => {
  if (!code) return true;
  if (code === "R" || code === "RE" || code === "REF" || code === "REF-") return true;
  if (!code.startsWith("REF-")) return false;
  const tail = code.slice(4);
  return /^[0-9]{0,6}$/.test(tail);
};

export default function ModalSplashChoiceOverlay({
  authCreds,
  onCliente,
  onNegocio,
  onBack = null,
}) {
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [code, setCode] = useState("");
  const [codeFormatOk, setCodeFormatOk] = useState(true);
  const [codeValid, setCodeValid] = useState(false);
  const [persisting, setPersisting] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const proceedNegocio = async (codeVal) => {
    if (!onNegocio) return;
    try {
      setPersisting(true);
      await onNegocio(codeVal);
    } finally {
      setPersisting(false);
    }
  };

  const handleNext = () => {
    if (!selected) return;
    if (selected === "cliente") {
      onCliente?.(authCreds);
      return;
    }
    setError("");
    setShowCodeModal(true);
  };

  const handleCodeChange = (val) => {
    const upper = val.toUpperCase();
    setCode(upper);
    const formatOk = isPartialFormat(upper);
    setCodeFormatOk(formatOk);
    const ok = formatOk && CODE_RE.test(upper) && DEFAULT_CODES.includes(upper);
    setCodeValid(ok);
  };

  const confirmCode = () => {
    if (!codeValid || persisting) return;
    proceedNegocio(code);
    setShowCodeModal(false);
  };

  return (
    <div className="w-screen h-screen bg-[#5E30A5] text-white flex items-center justify-center p-6 relative">
      <button
        onClick={() => {
          if (onBack) onBack();
          else closeModal();
        }}
        className="absolute left-8 w-9 h-25 rounded-xl bg-[#5624a1ff] text-white shadow-lg flex items-center justify-center active:scale-95 transition"
        style={{ top: "42%", transform: "translate(-50%, 0)", zIndex: 20 }}
        aria-label="Volver"
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
          <path d="M15 5L8 12L15 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className={`w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="p-8 space-y-6">
          {error && <div className="text-center text-sm text-red-300">{error}</div>}
          <div className="space-y-1 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">Tipo de cuenta</p>
            <h1 className="text-2xl font-semibold text-white">¿Cómo quieres continuar?</h1>
            <p className="text-sm text-white/60">Elige tu rol para entrar con la experiencia adecuada.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card, idx) => {
              const isActive = selected === card.key;
              return (
                <button
                  key={card.key}
                  onClick={() => setSelected(card.key)}
                  className={`text-left rounded-2xl border transition-all duration-300 p-5 h-full ${
                    isActive
                      ? "border-[#FFC21C]/80 bg-white/10 shadow-lg shadow-[#ffc21c1f]"
                      : "border-white/10 bg-white/0 hover:bg-white/5"
                  }`}
                  style={{
                    animation: mounted ? `fadeIn 0.35s ease ${idx * 0.05}s both` : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                      <p className="text-sm text-white/60 mt-1">{card.desc}</p>
                    </div>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border ${
                        isActive ? "bg-[#FFC21C] border-[#FFC21C]" : "border-white/40"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={handleNext}
              disabled={!selected || persisting}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                selected && !persisting
                  ? "bg-[#FFC21C] text-[#0F172A] shadow-lg shadow-[#ffc21c33] active:scale-[0.99]"
                  : "bg-white/10 text-white/60 cursor-not-allowed"
              }`}
            >
              {persisting ? "Guardando..." : "Registrarse"}
            </button>
          </div>

          <div className="text-center text-xs text-white/50">
            Pantalla de bienvenida. Selecciona tu rol y continúa con la experiencia adecuada.
          </div>
        </div>
      </div>

      {showCodeModal && (
        <div
          className="absolute inset-0 flex items-center justify-center p-6 bg-black/20 backdrop-blur-[2px]"
          style={{ zIndex: 30 }}
        >
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-[#0F172A] relative">
            <h3 className="text-center text-xl font-bold text-[#5E30A5] mb-2">Código de registro</h3>
            <p className="text-sm text-gray-600 mb-3 text-center">Solo necesario para negocios</p>
            <input
              autoFocus
              className={`w-full border rounded-lg px-3 py-2 text-sm uppercase tracking-wide transition-colors ${
                codeFormatOk
                  ? "border-gray-400 text-gray-900 focus:border-[#5E30A5] focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/40"
                  : "border-red-500 text-red-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
              }`}
              placeholder="REF-435526"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
            />
            <a
              href={
                "https://wa.me/593000000000?text=" +
                encodeURIComponent("Hola! Deseo recibir un codigo de registro para registrar mi negocio.")
              }
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#5E30A5] underline block mt-2"
            >
              Solicitar código para negocio
            </a>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowCodeModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-semibold"
              >
                Volver
              </button>
              <button
                onClick={confirmCode}
                disabled={!codeValid || persisting}
                className={`flex-1 py-2.5 rounded-lg font-semibold ${
                  codeValid && !persisting ? "bg-[#5E30A5] text-white shadow" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {persisting ? "Guardando..." : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
