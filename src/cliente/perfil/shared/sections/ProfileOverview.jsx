import React, { useEffect, useRef, useState } from "react";
import { Camera, Check, Pencil, ShieldCheck, Sparkles, X } from "lucide-react";
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
  const [status, setStatus] = useState(null);
  const [invalidChars, setInvalidChars] = useState(false);
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

  const lettersCount =
    (alias.match(/[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00D1\u00FC\u00DC]/g) || []).length;
  const hasMinLetters = lettersCount >= 5;
  const canSave = Boolean(alias.trim()) && hasMinLetters && !invalidChars;

  const handleSave = () => {
    if (!usuario) return;
    const nextAlias = alias.trim();
    if (!nextAlias || !hasMinLetters || invalidChars) {
      setStatus({ type: "error", text: "No se pudo actualizar el alias" });
      return;
    }
    setUser({ ...usuario, alias: nextAlias });
    setBaseAlias(nextAlias);
    setIsEditingAlias(false);
    setStatus({ type: "success", text: "Alias actualizado" });
  };
  const handleCancel = () => {
    if (baseAlias) {
      setAlias(baseAlias);
      setIsEditingAlias(false);
    } else {
      setAlias("");
    }
    setInvalidChars(false);
    setStatus(null);
  };
  const handleAliasChange = (value) => {
    const containsInvalid = /[^A-Za-z0-9\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00D1\u00FC\u00DC\s]/.test(value);
    const sanitized = value.replace(/[^A-Za-z0-9\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00D1\u00FC\u00DC\s]/g, "");
    setInvalidChars(containsInvalid);
    setAlias(sanitized);
    if (status) setStatus(null);
  };
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => {
      setStatus(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [status]);

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
                setStatus({
                  type: "success",
                  text: "Imagen seleccionada (pendiente de guardado)",
                })
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
                onChange={(e) => handleAliasChange(e.target.value)}
                placeholder="Tu alias"
                className="w-full rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]/30"
              />
              <div className="mt-3 space-y-1 text-xs">
                {status ? (
                  <div
                    className={`flex items-center gap-2 font-semibold ${
                      status.type === "error"
                        ? "text-red-500"
                        : "text-emerald-600"
                    }`}
                  >
                    {status.type === "error" ? <X size={14} /> : <Check size={14} />}
                    {status.text}
                  </div>
                ) : null}
                {invalidChars ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <X size={12} />
                    No se permiten caracteres especiales
                  </div>
                ) : null}
                <div
                  className={`flex items-center gap-2 ${
                    hasMinLetters ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  {hasMinLetters ? <Check size={12} /> : <X size={12} />}
                  El alias debe contener al menos cuatro letras
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-[#2F1A55]"
                >
                  Cancelar
                </button>
                {alias.trim() ? (
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!canSave}
                    className={canSave ? "text-[#5E30A5]" : "text-slate-400"}
                  >
                    Guardar
                  </button>
                ) : null}
              </div>
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
          Haz que tu perfil se sienta tuyo, actualiza tu alias.
        </span>
      </div>
    </section>
  );
}
