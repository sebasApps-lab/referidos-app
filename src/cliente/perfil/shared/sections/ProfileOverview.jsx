import React, { useRef, useState } from "react";
import { Camera, ShieldCheck, Sparkles } from "lucide-react";
import {
  formatReadableDate,
  getAvatarSrc,
  getRoleLabel,
  getTierMeta,
} from "../../../services/clienteUI";

export default function ProfileOverview({ usuario, setUser, verification }) {
  const [alias, setAlias] = useState(
    usuario?.alias || usuario?.username || ""
  );
  const [status, setStatus] = useState("");
  const fileRef = useRef(null);
  const tier = getTierMeta(usuario);

  const handleSave = () => {
    if (!usuario) return;
    setUser({ ...usuario, alias });
    setStatus("Cambios guardados");
    alert("Datos guardados");
  };

  return (
    <section className="rounded-2xl border border-[#E9E2F7] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={getAvatarSrc(usuario)}
              alt="avatar"
              className="h-20 w-20 rounded-2xl border border-[#E9E2F7] bg-white object-cover"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl bg-[#5E30A5] text-white flex items-center justify-center shadow-sm transition hover:bg-[#4B2488]"
            >
              <Camera size={16} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() =>
                setStatus("Imagen seleccionada (pendiente de guardado)")
              }
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
              Identidad
            </p>
            <h3 className="text-base font-semibold text-[#2F1A55]">
              {usuario?.nombre || "Usuario"}
            </h3>
            <p className="text-xs text-slate-500">
              {getRoleLabel(usuario)} - Miembro desde{" "}
              {formatReadableDate(usuario?.created_at || usuario?.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-[#F3EEFF] text-[#5E30A5] border border-[#E9E2F7]"
          >
            <Sparkles size={14} />
            Tier {tier.label}
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              verification.accountVerified
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            <ShieldCheck size={14} />
            {verification.accountVerified ? "Verificado" : "Sin verificar"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Alias o username
          </label>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Tu alias visible"
            className="mt-2 w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Estado de cuenta
          </label>
          <div className="mt-2 rounded-xl border border-[#E9E2F7] bg-[#FAF8FF] px-3 py-2 text-sm text-slate-500">
            {verification.accountVerified ? "Cuenta verificada" : "Sin verificar"}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[#5E30A5] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
        >
          Guardar cambios
        </button>
        <span className="text-xs text-slate-500">
          {status || "Actualiza alias o avatar cuando lo necesites."}
        </span>
      </div>
    </section>
  );
}
