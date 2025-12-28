import React from "react";
import { CameraOff, ShieldAlert } from "lucide-react";

export default function EscanerPermisos({
  camSupported,
  camGranted,
  onManual,
  onRequestCamera,
  showButton = true,
}) {
  if (camSupported && camGranted) return null;

  const title = !camSupported
    ? "Cámara no disponible"
    : "Permiso denegado";
  const description = !camSupported
    ? "Tu navegador no soporta el escaneo automático. Aún puedes ingresar los códigos manualmente."
    : "Activa el permiso de cámara o ingresa el código manualmente.";

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm text-left">
      <div className="flex items-start gap-3">
        <span className="h-10 w-10 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
          {!camSupported ? <CameraOff size={18} /> : <ShieldAlert size={18} />}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
          <div
            className={`mt-3 flex flex-wrap gap-2 ${
              showButton ? "justify-start" : "justify-center"
            }`}
          >
            {typeof onRequestCamera === "function" && (
              <button
                type="button"
                onClick={onRequestCamera}
                className="inline-flex items-center gap-2 rounded-xl border border-[#5E30A5] px-3 py-2 text-xs font-semibold text-[#5E30A5] transition hover:bg-[#F3EEFF]"
              >
                Activar cámara
              </button>
            )}
            {showButton && (
              <button
                type="button"
                onClick={onManual}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
              >
                Ingresar código
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
