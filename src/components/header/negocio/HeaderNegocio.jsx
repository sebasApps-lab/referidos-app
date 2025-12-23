// src/components/header/HeaderNegocio.jsx
import React from "react";
import { Menu, Store, Utensils } from "lucide-react";

const BRAND_PURPLE = "#5E30A5";
const SUBSCRIPTION_DEFAULT = "FREE";
const DEFAULT_SECTOR = "Restaurante";
const DEFAULT_DIRECCION = "Calle 1 / Calle 2";

export default function HeaderNegocio({
  usuario,
  negocio,
  avatarSrc,
  expanded,
  setExpanded,
  onOpenMenu,
  collapsedRef,
  expandedRef,
  collapsedHeight,
  onSwipeStart,
  onSwipeMove,
  onSwipeEnd,
}) {
  const nombreNegocio = negocio?.nombre || "Nombre del negocio";
  const sector = negocio?.sector || DEFAULT_SECTOR;
  const rawDireccion = (negocio?.direccion || "").trim();
  const [calle1Raw, calle2Raw] = rawDireccion
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  const direccion =
    rawDireccion && calle1Raw && calle2Raw
      ? `${calle1Raw} / ${calle2Raw}`
      : rawDireccion || DEFAULT_DIRECCION;
  const referidosCount = usuario?.referidosCount ?? 0;
  const negocioImagen = negocio?.imagen || "";
  const hasImage = Boolean(negocioImagen);
  const ownerRole = "Propietario";
  const handleExpand = () => setExpanded(true);
  const CategoryIcon = Utensils;

  const tornStyle = {
    backgroundColor: BRAND_PURPLE,
    backgroundImage:
      "radial-gradient(circle at left, transparent 0 6px, #5E30A5 7px)",
    backgroundSize: "12px 12px",
    backgroundRepeat: "repeat-y",
  };

  return (
    <>
      <div
        ref={collapsedRef}
        className="md:hidden flex items-center justify-between py-4"
        style={{ minHeight: collapsedHeight, touchAction: "pan-y" }}
        onPointerDown={onSwipeStart}
        onPointerMove={onSwipeMove}
        onPointerUp={onSwipeEnd}
        onPointerCancel={onSwipeEnd}
      >
        <div className="relative flex-1 min-w-0 h-12">
          <button
            type="button"
            onClick={handleExpand}
            className={`absolute top-0.5 z-20 w-11 h-11 rounded-xl border-2 border-white/30 bg-white/10 overflow-hidden flex items-center justify-center transition-transform duration-300 ${
              expanded
                ? "translate-x-0 translate-y-[68px] scale-[0.65]"
                : "translate-x-4 translate-y-0 scale-100"
            }`}
            aria-label="Abrir negocio"
          >
            <CategoryIcon size={22} className="text-[#FFC21C]" />
            <span className="absolute -bottom-2 left-6 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/15 border border-white/30 tracking-wide">
              {SUBSCRIPTION_DEFAULT}
            </span>
          </button>

          <button
            type="button"
            onClick={handleExpand}
            className={`absolute right-12 z-10 left-[46px] text-left leading-tight transition-all duration-300 origin-left ${
              expanded
                ? "top-0 translate-y-[78px] translate-x-0 text-2xl font-extrabold"
                : "top-1/2 -translate-y-1/2 translate-x-[22px] text-m font-semibold"
            }`}
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {nombreNegocio}
          </button>
        </div>

        <button onClick={() => onOpenMenu?.()} className="ml-3">
          <Menu size={28} />
        </button>
      </div>

      <div
        ref={expandedRef}
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: expanded ? 680 : 0,
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
          transition: "max-height 300ms ease, opacity 200ms ease",
          touchAction: "pan-y",
        }}
        onPointerDown={onSwipeStart}
        onPointerMove={onSwipeMove}
        onPointerUp={onSwipeEnd}
        onPointerCancel={onSwipeEnd}
      >
        <div className="w-full">
          <div className="relative min-h-[240px] border-t border-white/30">
            <div className="absolute left-0 right-0 -top-2 h-px bg-white/30" />
            <div className="grid grid-cols-[2fr_1fr] min-h-[240px]">
              <div className="relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={
                    hasImage
                      ? { backgroundImage: `url(${negocioImagen})` }
                      : undefined
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
                {!hasImage && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    <Store size={96} />
                  </div>
                )}
              </div>

              <div className="relative bg-[#5E30A5] px-2 pt-4 pb-2">
                <div className="flex flex-col items-center pr-4">
                  <div className="w-21 h-21 rounded-xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center">
                    <img
                      src={avatarSrc}
                      alt="avatar dueno"
                      className="w-15 h-15 object-contain"
                    />
                  </div>
                  <div className="mt-1 inline-flex items-center rounded-full border border-white/20 px-2 py-0.5 text-[11px] uppercase tracking-wide text-white/80">
                    {ownerRole}
                  </div>
                </div>
                <div className="flex flex-col items-start pl-3">
                  <div className="mt-4 text-xs uppercase tracking-wider text-white/60">
                    Sector
                  </div>
                  <div className="text-sm font-semibold">{sector}</div>
                  <div className="mt-1 text-xs text-white/80">{direccion}</div>

                  <div className="mt-3 text-sm font-bold text-[#A6F28F]">
                    {referidosCount} referidos
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 left-2/3 w-4 -translate-x-2 pointer-events-none"
              style={tornStyle}
            />
          </div>
        </div>
      </div>
    </>
  );
}
