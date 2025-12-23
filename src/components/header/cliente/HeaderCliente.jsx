// src/components/header/HeaderCliente.jsx
import React from "react";
import { Menu } from "lucide-react";

export default function HeaderCliente({
  usuario,
  avatarSrc,
  expanded,
  setExpanded,
  onOpenMenu,
  onOpenTier,
  onOpenGrupo,
  collapsedRef,
  expandedRef,
  collapsedHeight,
  onSwipeStart,
  onSwipeMove,
  onSwipeEnd,
}) {
  const handleTierClick = () => {
    if (expanded) {
      onOpenTier?.();
      return;
    }

    setExpanded(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div
        ref={collapsedRef}
        className="md:hidden flex items-center justify-between py-4"
        style={{ minHeight: collapsedHeight, touchAction: "pan-y" }}
        onPointerDown={onSwipeStart}
        onPointerMove={onSwipeMove}
        onPointerUp={onSwipeEnd}
        onPointerCancel={onSwipeEnd}
      >
        <div className="relative h-12 w-[200px]">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className={`absolute left-0 top-0 z-10 w-12 h-12 rounded-xl border-2 border-white/30 bg-white/10 overflow-hidden flex items-center justify-center origin-top-left transition-transform duration-300 ${
              expanded
                ? "translate-y-[96px] scale-[2]"
                : "translate-y-0 scale-100"
            }`}
            aria-label="Abrir perfil"
          >
            <img
              src={avatarSrc}
              alt="avatar"
              className="w-9 h-9 object-contain"
            />
          </button>

          <button
            type="button"
            onClick={handleTierClick}
            className={`absolute rounded-lg font-semibold bg-white/10 border border-white/30 transition-all duration-300 ${
              expanded
                ? "left-3 top-1.5 translate-y-0 scale-105 px-5 py-2 text-base"
                : "left-[56px] top-1/2 -translate-y-1/2 px-4 py-1.5 text-xs"
            }`}
          >
            {usuario?.tier || "Explorador"}
          </button>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-base font-semibold tracking-wide">
            Referidos App
          </span>
          <button onClick={() => onOpenMenu?.()}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      <div
        ref={expandedRef}
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: expanded ? 520 : 0,
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
          transition: "max-height 280ms ease, opacity 200ms ease",
          touchAction: "pan-y",
        }}
        onPointerDown={onSwipeStart}
        onPointerMove={onSwipeMove}
        onPointerUp={onSwipeEnd}
        onPointerCancel={onSwipeEnd}
      >
        <div className="max-w-6xl mx-auto px-4 pt-2 pb-4">
          <div className="relative pt-2 pl-27">
            <div className="absolute left-0 right-0 -top-2 h-px bg-white/10" />
            <div className="text-xs uppercase tracking-wider text-white/70">
              Bienvenido
            </div>
            <div className="text-xl font-extrabold truncate">
              {usuario?.nombre || "usuario"}
            </div>
            <div
              className="mt-1 text-sm text-white/85"
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              Encuentra las mejores promos cerca de ti.
            </div>

            <div className="mt-4 flex items-end justify-between">
              <span className="text-[#A6F28F] font-bold text-sm">
                {usuario?.referidosCount
                  ? `${usuario.referidosCount} referidos`
                  : "0 referidos"}
              </span>

              <div
                className="flex items-center cursor-pointer"
                onClick={onOpenGrupo}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-lg bg-[#E6E6E6] border-2 border-white"
                    style={{ marginLeft: i === 0 ? 0 : -10 }}
                  />
                ))}
                <div
                  className="w-7 h-7 rounded-lg bg-white border-2 border-dashed border-[#CFCFCF] flex items-center justify-center text-[#6B6B6B] font-bold"
                  style={{ marginLeft: -10 }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
