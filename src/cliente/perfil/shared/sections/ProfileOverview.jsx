import React, { useEffect, useRef, useState } from "react";
import { Camera, Pencil, ShieldCheck, Sparkles } from "lucide-react";
import {
  formatReadableDate,
  getAvatarSrc,
  getRoleLabel,
  getTierMeta,
} from "../../../services/clienteUI";

export default function ProfileOverview({ usuario, setUser, verification }) {
  const initialAlias = usuario?.alias || "";
  const [alias, setAlias] = useState(initialAlias);
  const [baseAlias, setBaseAlias] = useState(initialAlias);
  const [isEditingAlias, setIsEditingAlias] = useState(!initialAlias);
  const [status, setStatus] = useState("");
  const fileRef = useRef(null);
  const tier = getTierMeta(usuario);
  const createdAtRaw =
    usuario?.created_at ||
    usuario?.createdAt ||
    usuario?.created_at?.toString?.() ||
    usuario?.createdAt?.toString?.();
  const createdAtValue =
    typeof createdAtRaw === "string" && createdAtRaw.includes(" ") && !createdAtRaw.includes("T")
      ? createdAtRaw.replace(" ", "T")
      : createdAtRaw;
  const createdAtLabel = formatReadableDate(createdAtValue);
  const showRole = usuario?.role && usuario.role !== "cliente";

  useEffect(() => {
    const nextAlias = usuario?.alias || "";
    setBaseAlias(nextAlias);
    if (!isEditingAlias) {
      setAlias(nextAlias);
      if (!nextAlias) setIsEditingAlias(true);
    }
  }, [usuario?.alias, isEditingAlias]);

  const handleSave = () => {
    if (!usuario) return;
    const nextAlias = alias.trim();
    if (!nextAlias) return;
    setUser({ ...usuario, alias: nextAlias });
    setBaseAlias(nextAlias);
    setIsEditingAlias(false);
    setStatus("Alias actualizado");
  };
  const handleCancel = () => {
    if (baseAlias) {
      setAlias(baseAlias);
      setIsEditingAlias(false);
    } else {
      setAlias("");
    }
    setStatus("");
  };

  return (
    <section className="px-2">
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
              {showRole ? `${getRoleLabel(usuario)} - ` : ""}Miembro desde{" "}
              {createdAtLabel}
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

      <div className="mt-6 grid gap-4">
        <div>
          <label className="text-xs font-semibold text-[#2F1A55]">
            Alias
          </label>
          {isEditingAlias ? (
            <div className="mt-2">
              <input
                value={alias}
                onChange={(e) =>
                  setAlias(
                    e.target.value.replace(
                      /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g,
                      ""
                    )
                  )
                }
                placeholder="Tu alias"
                className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
              />
              {alias.trim() ? (
                <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-[#2F1A55]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="text-[#5E30A5]"
                  >
                    Guardar
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#2F1A55]">
                {baseAlias}
              </span>
              <button
                type="button"
                onClick={() => setIsEditingAlias(true)}
                className="text-[#5E30A5]"
                aria-label="Editar alias"
              >
                <Pencil size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-xs text-slate-500">
          {status || "Haz que tu perfil se sienta tuyo, actualiza tu alias."}
        </span>
      </div>
    </section>
  );
}
