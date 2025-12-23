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
          <div
            className={`absolute top-0.5 z-20 transition-transform duration-300 ${
              expanded
                ? "translate-x-0 translate-y-[68px] scale-[0.65]"
                : "translate-x-4 translate-y-0 scale-100"
            }`}
          >
            <button
              type="button"
              onClick={handleExpand}
              className="relative w-11 h-11 rounded-xl border-2 border-white/30 bg-white/10 overflow-hidden flex items-center justify-center"
              aria-label="Abrir negocio"
            >
              <CategoryIcon size={22} className="text-[#FFC21C]" />
            </button>
          </div>

          <div
            className={`absolute left-0 top-0.3 z-30 origin-top-left transition-transform duration-300 ${
              expanded
              ? "-translate-x-3 translate-y-4 scale-[1.70]"
              : "translate-x-5 translate-y-0 scale-100"
            }`}
          >
            <div className="relative w-14 h-14">
              <span
                className={`absolute px-3 py-0.5 text-[10px] font-semibold tracking-wide text-white bg-orange-400/50 border border-orange-200/60 pointer-events-none ${
                  expanded ? "rounded-md" : ""
                }`}
                style={{
                  top: -6,
                  right: -12,
                  clipPath: expanded
                    ? "none"
                    : "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 10% 50%)",
                }}
              >
                {SUBSCRIPTION_DEFAULT}
                <span
                  className={`absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-[#FDBA74] ${
                    expanded ? "hidden" : "bg-transparent"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExpand}
            className={`absolute right-12 z-10 left-[46px] text-left leading-tight transition-all duration-300 origin-left ${
              expanded
                ? "top-0 translate-y-[235px] -translate-x-9 text-2xl font-extrabold"
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

        <div className="flex items-center gap-5 pr-4">
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
