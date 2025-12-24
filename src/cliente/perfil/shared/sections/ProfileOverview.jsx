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
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={getAvatarSrc(usuario)}
              alt="avatar"
              className="h-20 w-20 rounded-[28px] border border-white shadow-sm object-cover"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-2 -right-2 h-9 w-9 rounded-2xl bg-[#1D1B1A] text-white flex items-center justify-center shadow"
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
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
              Identidad
            </p>
            <h3 className="text-base font-semibold text-[#1D1B1A]">
              {usuario?.nombre || "Usuario"}
            </h3>
            <p className="text-xs text-black/50">
              {getRoleLabel(usuario)} - Miembro desde{" "}
              {formatReadableDate(usuario?.created_at || usuario?.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: `${tier.glow}66`,
              color: tier.accent,
              border: `1px solid ${tier.glow}`,
            }}
          >
            <Sparkles size={14} />
            Tier {tier.label}
          </span>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              verification.accountVerified
                ? "bg-[#10B98122] text-[#10B981]"
                : "bg-[#F59E0B22] text-[#F59E0B]"
            }`}
          >
            <ShieldCheck size={14} />
            {verification.accountVerified ? "Verificado" : "Sin verificar"}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-black/70">
            Alias o username
          </label>
          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Tu alias visible"
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-black/70 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/40"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-black/70">
            Estado de cuenta
          </label>
          <div className="mt-2 rounded-2xl border border-black/10 bg-white/80 px-3 py-2 text-sm text-black/60">
            {verification.accountVerified ? "Cuenta verificada" : "Sin verificar"}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-2xl bg-[#1D1B1A] px-4 py-2 text-xs font-semibold text-white shadow hover:opacity-90"
        >
          Guardar cambios
        </button>
        <span className="text-xs text-black/50">
          {status || "Actualiza alias o avatar cuando lo necesites."}
        </span>
      </div>
    </section>
  );
}
