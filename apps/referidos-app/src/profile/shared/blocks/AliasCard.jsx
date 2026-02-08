import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Pencil, X } from "lucide-react";

export default function AliasCard({
  usuario,
  setUser,
  config = {},
  status,
  onStatus,
  scrollContainerId = "cliente-main-scroll",
}) {
  const aliasConfig = useMemo(
    () => ({
      panelTitle: "Nombre en pantalla",
      emptyMessage: "Haz que tu perfil se sienta tuyo, anade un alias.",
      editMessage: "Esto es lo que los demas veran.",
      viewMessage: "Esto es lo que los demas veran.",
      editTitle: "Elige tu alias",
      fieldLabel: "Alias",
      placeholder: "Ingresa un alias",
      displayLabel: "Alias",
      emptyValue: "Sin alias.",
      valueClass: "mt-1 block text-[13px] text-slate-500",
      minLettersText: "El alias debe contener al menos cuatro letras",
      ...config,
    }),
    [config]
  );
  const initialAlias = usuario?.alias || "";
  const [alias, setAlias] = useState(initialAlias);
  const [baseAlias, setBaseAlias] = useState(initialAlias);
  const [isEditingAlias, setIsEditingAlias] = useState(false);
  const [invalidChars, setInvalidChars] = useState(false);
  const aliasInputRef = useRef(null);
  const aliasRowRef = useRef(null);
  const aliasFocusedRef = useRef(false);
  const prevViewportRef = useRef(0);
  const [viewportH, setViewportH] = useState(0);
  const [localStatus, setLocalStatus] = useState(null);
  const currentStatus = status ?? localStatus;
  const setStatus = onStatus || setLocalStatus;

  const aliasMessage = isEditingAlias
    ? aliasConfig.editMessage
    : baseAlias
    ? aliasConfig.viewMessage
    : aliasConfig.emptyMessage;

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
    const container = document.getElementById(scrollContainerId);
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
  }, [scrollContainerId]);

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
    (alias.match(
      /[A-Za-z\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00D1\u00FC\u00DC]/g
    ) || []).length;
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
    setAlias(baseAlias || "");
    setIsEditingAlias(false);
    setInvalidChars(false);
    setStatus(null);
  };

  const handleAliasChange = (value) => {
    const containsInvalid =
      /[^A-Za-z0-9\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00D1\u00FC\u00DC\s]/.test(
        value
      );
    const sanitized = value.replace(
      /[^A-Za-z0-9\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00D1\u00FC\u00DC\s]/g,
      ""
    );
    setInvalidChars(containsInvalid);
    setAlias(sanitized);
    if (currentStatus) setStatus(null);
  };

  useEffect(() => {
    if (!currentStatus) return;
    const timer = setTimeout(() => {
      setStatus(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentStatus, setStatus]);

  return (
    <div className="relative rounded-[28px] border border-[#E9E2F7] px-5 pb-5 pt-4">
      <div className="absolute -top-2 left-4 right-4 flex items-center gap-3">
        <span className="bg-white px-2 text-xs uppercase tracking-[0.2em] text-[#5E30A5]/70">
          {aliasConfig.panelTitle}
        </span>
      </div>
      {aliasMessage ? (
        <div className="mt-1 text-xs text-slate-500 text-center">
          {aliasMessage}
        </div>
      ) : null}
      {isEditingAlias ? (
        <div className="mt-5" ref={aliasRowRef}>
          <div className="text-xs font-semibold text-[#2F1A55]">
            {aliasConfig.editTitle}
          </div>
          <div className="relative mt-6 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2">
            <span className="absolute -top-3 left-3 bg-white px-2 text-[13px] text-slate-500">
              {aliasConfig.fieldLabel}
            </span>
            <input
              ref={aliasInputRef}
              value={alias}
              onChange={(e) => handleAliasChange(e.target.value)}
              placeholder={aliasConfig.placeholder}
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
              {aliasConfig.minLettersText}
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
              {aliasConfig.displayLabel}
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
          <span className={aliasConfig.valueClass}>
            {baseAlias || aliasConfig.emptyValue}
          </span>
        </div>
      )}
      {currentStatus ? (
        <div
          className={`mt-3 flex items-center gap-2 text-xs font-semibold ${
            currentStatus.type === "error" ? "text-red-500" : "text-emerald-600"
          }`}
        >
          {currentStatus.type === "error" ? (
            <X size={14} />
          ) : (
            <Check size={14} />
          )}
          {currentStatus.text}
        </div>
      ) : null}
    </div>
  );
}
