import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Check, Pencil, ShieldCheck, Sparkles, X } from "lucide-react";
import {
  formatReadableDate,
  getAvatarSrc,
  getRoleLabel,
  getPlanFallback,
  getTierMeta,
} from "../../../cliente/services/clienteUI";

export default function ProfileOverview({ usuario, setUser, verification }) {
  const initialAlias = usuario?.alias || "";
  const [alias, setAlias] = useState(initialAlias);
  const [baseAlias, setBaseAlias] = useState(initialAlias);
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const [status, setStatus] = useState(null);
  const [invalidChars, setInvalidChars] = useState(false);
  const fileRef = useRef(null);
  const aliasInputRef = useRef(null);
  const aliasRowRef = useRef(null);
  const aliasFocusedRef = useRef(false);
  const prevViewportRef = useRef(0);
  const [viewportH, setViewportH] = useState(0);
  const tier = getTierMeta(usuario);
  const plan = getPlanFallback(usuario?.role);
  const tierPerks = plan?.perks || [];
  const createdAtRaw = usuario?.fechacreacion;
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
    }
  }, [usuario?.alias, isEditingAlias]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const update = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      setViewportH(vh);
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    window.addEventListener("focusin", update);
    window.addEventListener("focusout", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("focusin", update);
      window.removeEventListener("focusout", update);
    };
  }, []);

  const centerAliasInView = useCallback(() => {
    const row = aliasRowRef.current;
    if (!row) return;
    const container = document.getElementById("cliente-main-scroll");
    const containerRect = container
      ? container.getBoundingClientRect()
      : { top: 0, height: window.innerHeight };
    const rowRect = row.getBoundingClientRect();
    const currentScroll = container ? container.scrollTop : window.scrollY;
    const offsetTop = rowRect.top - containerRect.top;
    const target =
      currentScroll +
      offsetTop -
      (containerRect.height / 2 - rowRect.height / 2);

    if (container) {
      container.scrollTo({ top: target, behavior: "auto" });
    } else {
      window.scrollTo({ top: target, behavior: "auto" });
    }
  }, []);

  const handleAliasFocus = useCallback(() => {
    aliasFocusedRef.current = true;
    requestAnimationFrame(() => {
      centerAliasInView();
    });
  }, [centerAliasInView]);

  const handleAliasBlur = useCallback(() => {
    aliasFocusedRef.current = false;
  }, []);

  useEffect(() => {
    if (!viewportH) return;
    const prev = prevViewportRef.current;
    prevViewportRef.current = viewportH;
    if (!aliasFocusedRef.current || !prev) return;
    if (viewportH > prev + 40) return;
    requestAnimationFrame(() => {
      centerAliasInView();
    });
  }, [viewportH, centerAliasInView]);

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
    } else {
      setAlias("");
    }
    setIsEditingAlias(false);
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
      {!verification.accountVerified ? (
          <div className="relative rounded-[28px]  px-4 pb-4 pt-5 mb-8">
            <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
              <span className="bg-white px-2 text-base font-semibold text-[#2F1A55]">
                Cuenta sin verificar
              </span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1.5 text-[11px] font-semibold text-amber-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F4B740] text-[12px] font-black text-white leading-none">
                  -
                </span>
                Sin verificar
              </span>
            </div>
            <div className="mt-1 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-center gap-3 mr-1">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#FFC21C] px-3 py-1.5 text-xs font-semibold text-white shadow active:scale-[0.98]"
                >
                  <ShieldCheck size={17} />
                  Verificar cuenta
                </button>
              </div>
          </div>
        </div>
      ) : null}
      <div className="relative rounded-[28px] border border-[#E9E2F7] px-4 pb-4 pt-3">
        <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
          <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
            Identidad
          </span>
          {verification.accountVerified ? (
            <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <ShieldCheck size={14} />
              Verificado
            </span>
          ) : null}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
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
              <h3 className="text-base font-semibold text-[#2F1A55]">
                {usuario?.nombre || "Usuario"}
              </h3>
              <p className="text-xs text-slate-500">
                {showRole ? `${getRoleLabel(usuario)} - ` : ""}Miembro desde{" "}
                {createdAtLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <div className="relative rounded-[28px] border border-[#E9E2F7] px-4 pb-4 pt-5">
          <div className="absolute -top-3 left-4 right-4 flex items-center gap-3">
            <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
              Tier
            </span>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold bg-[#F3EEFF] text-[#5E30A5] border border-[#E9E2F7]">
              <Sparkles size={12} />
              {tier.label}              
            </span>
          </div>
          <ul className="mt-2 space-y-2 text-sm text-slate-600">
            {tierPerks.map((perk, index) => (
              <li key={`${perk}-${index}`} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#5E30A5]" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-[28px] border border-[#E9E2F7] px-5 pb-5 pt-4">
          <div className="absolute -top-2 left-4 right-4 flex items-center gap-3">
            <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
              Nombre en pantalla
            </span>
          </div>
          {isEditingAlias ? (
            <div className="mt-1 text-xs text-slate-500 text-center">
              Esto es lo que los demas veran.
            </div>
          ) : !baseAlias ? (
            <div className="mt-1 text-xs text-slate-500 text-center">
              Haz que tu perfil se sienta tuyo, añade un alias.
            </div>
          ) : null}
          {isEditingAlias ? (
            <div className="mt-5" ref={aliasRowRef}>
              <div className="text-xs font-semibold text-[#2F1A55]">
                Elige tu alias
              </div>
              <div className="relative mt-6 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
                <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
                  Alias
                </span>
                <input
                  ref={aliasInputRef}
                  value={alias}
                  onChange={(e) => handleAliasChange(e.target.value)}
                  placeholder="Ingresa un alias"
                  onFocus={handleAliasFocus}
                  onBlur={handleAliasBlur}
                  className="w-full bg-transparent text-sm text-slate-600 focus:outline-none"
                />
              </div>
              <div className="mt-3 space-y-1 text-xs pl-3">
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
              <div className="mt-5 flex items-center justify-between text-xs font-semibold px-2">
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
                  disabled={!canSave}
                  className={canSave ? "text-[#5E30A5]" : "text-slate-400"}
                >
                  Guardar
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-semibold text-[#2F1A55]">
                  Alias
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingAlias(true)}
                  className="text-[#5E30A5]"
                  aria-label="Editar alias"
                >
                  <Pencil size={16} />
                </button>
              </div>
              {baseAlias ? (
                <span className="mt-1 block text-sm font-semibold text-[#2F1A55]">
                  {baseAlias}
                </span>
              ) : (
                <span className="mt-4 mb-3 block text-[13px] text-slate-500">
                  Sin alias.
                </span>
              )}
            </div>
          )}
          {status ? (
            <div
              className={`mt-3 flex items-center gap-2 text-xs font-semibold ${
                status.type === "error" ? "text-red-500" : "text-emerald-600"
              }`}
            >
              {status.type === "error" ? <X size={14} /> : <Check size={14} />}
              {status.text}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
