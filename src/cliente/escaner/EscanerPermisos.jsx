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
    <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm text-left">
      <div className="flex items-start gap-3">
        <span className="h-10 w-10 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center">
          {!camSupported ? <CameraOff size={18} /> : <ShieldAlert size={18} />}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-[#1D1B1A]">{title}</h3>
          <p className="text-xs text-black/55 mt-1">{description}</p>
          <button
            type="button"
            onClick={onManual}
            className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-[#1D1B1A] px-3 py-2 text-xs font-semibold text-white"
          >
            Ingresar QR manual
          </button>
        </div>
      </div>
    </div>
  );
}
