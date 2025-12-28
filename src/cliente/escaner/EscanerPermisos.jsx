import React from "react";
import { CameraOff, Settings, ShieldAlert } from "lucide-react";

export default function EscanerPermisos({
  camSupported,
  camGranted,
  onManual,
  onRequestCamera,
  showButton = true,
  manualDisabled = false,
}) {
  if (camSupported && camGranted) return null;

  const title = !camSupported ? "Camara no disponible" : "Permiso denegado";
  const description = !camSupported
    ? "Tu navegador no soporta el escaneo automatico. Aun puedes ingresar los codigos manualmente."
    : "Activa el permiso de camara o ingresa el codigo manualmente.";

  return (
    <div className="w-full rounded-2xl border border-[#E9E2F7] bg-white p-5 text-left shadow-[0_3px_8px_rgba(47,26,85,0.08)]">
      <div className="flex items-start gap-3">
        <span className="h-10 w-10 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
          {!camSupported ? <CameraOff size={18} /> : <ShieldAlert size={18} />}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>
      </div>
      <div
        className={`flex flex-wrap items-center justify-center gap-2 ${
          showButton ? "mt-4" : "mt-3"
        }`}
      >
        {typeof onRequestCamera === "function" && (
          <button
            type="button"
            onClick={onRequestCamera}
            className="inline-flex items-center gap-2 rounded-xl bg-[#F3EEFF] px-3 py-2 text-xs font-semibold text-[#5E30A5] transition-all duration-300 ease-out hover:bg-[#E9DFFF]"
          >
            <Settings size={14} />
            Activar camara
          </button>
        )}
        <div
          className={`overflow-hidden ${
            showButton ? "" : "pointer-events-none"
          }`}
          style={{
            maxWidth: showButton ? 260 : 0,
            maxHeight: showButton ? 80 : 0,
            opacity: showButton ? 1 : 0,
            transform: showButton ? "translateY(0)" : "translateY(-4px)",
            transition:
              "opacity 140ms ease, transform 140ms ease, max-width 180ms ease 140ms",
          }}
        >
          <button
            type="button"
            onClick={onManual}
            disabled={manualDisabled}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 ease-out ${
              manualDisabled
                ? "bg-[#5E30A5]/70 cursor-not-allowed"
                : "bg-[#5E30A5] hover:bg-[#4B2488]"
            }`}
          >
            Ingresar codigo manualmente
          </button>
        </div>
      </div>
    </div>
  );
}
