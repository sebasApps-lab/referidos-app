import { useEffect, useState } from "react";
import { CODE_RE } from "../../utils/validators";

const cards = [
  {
    key: "cliente",
    title: "Cliente",
    desc: "Gana y canjea promociones escaneando codigos.",
  },
  {
    key: "negocio",
    title: "Negocio",
    desc: "Administra promos y canjes para tus sucursales.",
  },
];

export default function RoleSelectStep({
  error,
  onSubmit,
  onValidateNegocioCode,
}) {
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [persisting, setPersisting] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [codigoError, setCodigoError] = useState("");
  const [codigoFormatOk, setCodigoFormatOk] = useState(true);
  const [checkingCodigo, setCheckingCodigo] = useState(false);
  const [negocioConfirmed, setNegocioConfirmed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleNext = async () => {
    if (!selected || persisting) return;
    try {
      setPersisting(true);
      await onSubmit?.(selected);
    } finally {
      setPersisting(false);
    }
  };

  const handleSelectRole = (role) => {
    if (persisting || checkingCodigo) return;
    if (negocioConfirmed && role !== "negocio") return;
    if (role === "negocio") {
      setSelected(null);
      setCodigo("");
      setCodigoError("");
      setCodigoFormatOk(true);
      setShowCodeModal(true);
      return;
    }
    setSelected("cliente");
  };

  const handleCodigoChange = (value) => {
    const upper = value.toUpperCase();
    setCodigo(upper);
    setCodigoFormatOk(isPartialFormat(upper));
    if (codigoError) setCodigoError("");
  };

  const handleCodigoConfirm = async () => {
    if (checkingCodigo) return;
    const code = codigo.trim().toUpperCase();
    if (!CODE_RE.test(code)) {
      setCodigoError("Codigo de registro invalido");
      return;
    }
    if (!onValidateNegocioCode) {
      setCodigoError("No se pudo validar el codigo");
      return;
    }
    try {
      setCheckingCodigo(true);
      const result = await onValidateNegocioCode(code);
      if (!result?.ok) {
        setCodigoError(result?.error || "No se pudo validar el codigo");
        return;
      }
      setShowCodeModal(false);
      setSelected("negocio");
      setNegocioConfirmed(true);
    } catch (err) {
      setCodigoError(err?.message || "No se pudo validar el codigo");
    } finally {
      setCheckingCodigo(false);
    }
  };

  const registerDisabled = !selected || persisting;

  return (
    <div className="w-full max-w-xl mt-2">
      <div
        className={`rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {error ? (
          <div className="text-center text-sm text-red-300 mb-3">{error}</div>
        ) : null}

        <div className="space-y-1 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/60">
            Tipo de cuenta
          </p>
          <h1 className="text-2xl font-semibold text-white">
            Como quieres continuar?
          </h1>
          <p className="text-sm text-white/60">
            Elige tu rol para entrar con la experiencia adecuada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {cards.map((card, idx) => {
            const isActive = selected === card.key;
            return (
              <button
                key={card.key}
                onClick={() => handleSelectRole(card.key)}
                disabled={negocioConfirmed && card.key !== "negocio"}
                className={`text-left rounded-2xl border transition-all duration-300 p-5 h-full ${
                  isActive
                    ? "border-[#FFC21C]/80 bg-white/10 shadow-lg shadow-[#ffc21c1f]"
                    : "border-white/10 bg-white/0 hover:bg-white/5"
                } ${
                  negocioConfirmed && card.key !== "negocio"
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
                style={{
                  animation: mounted
                    ? `fadeIn 0.35s ease ${idx * 0.05}s both`
                    : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {card.title}
                    </h2>
                    <p className="text-sm text-white/60 mt-1">{card.desc}</p>
                  </div>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border ${
                      isActive
                        ? "bg-[#FFC21C] border-[#FFC21C]"
                        : "border-white/40"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleNext}
            disabled={registerDisabled}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              !registerDisabled
                ? "bg-[#FFC21C] text-[#0F172A] shadow-lg shadow-[#ffc21c33] active:scale-[0.99]"
                : "bg-white/10 text-white/60 cursor-not-allowed"
            }`}
          >
            {persisting ? "Guardando..." : "Registrarse"}
          </button>
        </div>

        <div className="text-center text-xs text-white/50 mt-4">
          Pantalla de bienvenida. Selecciona tu rol y continua con la
          experiencia adecuada.
        </div>
      </div>

      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6 backdrop-blur-[2px]">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-[#0F172A] relative">
            <h3 className="text-center text-xl font-bold text-[#5E30A5] mb-2">
              Codigo de registro
            </h3>
            <p className="text-sm text-gray-600 mb-3 text-center">
              Solo necesario para negocios
            </p>
            {codigoError ? (
              <div className="text-center text-xs text-red-500 mb-2">
                {codigoError}
              </div>
            ) : null}
            <input
              autoFocus
              className={`w-full border rounded-lg px-3 py-2 text-sm uppercase tracking-wide transition-colors ${
                codigoFormatOk
                  ? "border-gray-400 text-gray-900 focus:border-[#5E30A5] focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
                  : "border-red-500 text-red-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
              }`}
              placeholder="REF-435526"
              value={codigo}
              onChange={(event) => handleCodigoChange(event.target.value)}
              disabled={checkingCodigo}
            />
            <a
              href={
                "https://wa.me/593000000000?text=" +
                encodeURIComponent(
                  "Hola! Deseo recibir un codigo de registro para registrar mi negocio."
                )
              }
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#5E30A5] underline block mt-2"
            >
              Solicitar codigo para negocio
            </a>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                disabled={checkingCodigo}
                className={`flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-semibold ${
                  checkingCodigo ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCodigoConfirm}
                disabled={checkingCodigo}
                className={`flex-1 py-2.5 rounded-lg font-semibold ${
                  checkingCodigo
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#5E30A5] text-white shadow"
                }`}
              >
                {checkingCodigo ? "Validando..." : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function isPartialFormat(code) {
  if (!code) return true;
  if (code === "R" || code === "RE" || code === "REF" || code === "REF-") return true;
  if (!code.startsWith("REF-")) return false;
  const tail = code.slice(4);
  return /^[A-HJ-KM-NP-Z2-9-]*$/.test(tail);
}
