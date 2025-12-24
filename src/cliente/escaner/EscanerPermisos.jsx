import React from "react";
import { CameraOff, ShieldAlert } from "lucide-react";

export default function EscanerPermisos({
  camSupported,
  camGranted,
  onManual,
}) {
  if (camSupported && camGranted) return null;

  const title = !camSupported
    ? "Camara no disponible"
    : "Permiso denegado";
  const description = !camSupported
    ? "Tu navegador no soporta el escaneo automatico. Usa el ingreso manual."
    : "Activa el permiso de camara o continua con el ingreso manual.";

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm text-left">
      <div className="flex items-start gap-3">
        <span className="h-10 w-10 rounded-xl bg-[#F3EEFF] text-[#5E30A5] flex items-center justify-center">
          {!camSupported ? <CameraOff size={18} /> : <ShieldAlert size={18} />}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-[#2F1A55]">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
          <button
            type="button"
            onClick={onManual}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
          >
            Ingresar QR manual
          </button>
        </div>
      </div>
    </div>
  );
}
