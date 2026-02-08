import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { sanitizeText } from "../../utils/sanitize";

export default function PromoCardHot({ promo, className, wrapperProps }) {
  const navigate = useNavigate();
  if (!promo) return null;

  const goDetalle = () => navigate(`/detalle/${promo.id}`);
  const titulo = sanitizeText(promo.titulo || "Promo hot");
  const nombreLocal = sanitizeText(promo.nombreLocal || "Local");
  const ubicacion = sanitizeText(promo.ubicacion || promo.sector || "Ubicacion");

  const baseClass = className || "flex-shrink-0 w-[210px] pr-3";
  const {
    className: wrapperClassName,
    style: wrapperStyle,
    ...restWrapperProps
  } = wrapperProps || {};
  const mergedClassName = [baseClass, wrapperClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={mergedClassName}
      style={wrapperStyle}
      {...restWrapperProps}
    >
      <article
        onClick={goDetalle}
        className="cursor-pointer rounded-xl border border-[#E9E2F7] shadow-sm overflow-hidden flex aspect-[2/1] relative text-white"
        style={{
          background:
            "linear-gradient(135deg, #FF7A5C 0%, #FF7A5C 34%, #FFB86B 34%, #FFB86B 60%, #8FD3FF 60%, #8FD3FF 82%, #7B5CFF 82%, #7B5CFF 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute -top-6 left-0 w-full h-20 opacity-70"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C40,55 80,10 130,30 C170,45 220,15 260,28 C310,45 350,5 400,20 L400,0 L0,0 Z"
              fill="rgba(255,255,255,0.25)"
            />
          </svg>
          <svg
            className="absolute top-4 left-0 w-full h-20 opacity-60"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C50,10 90,60 150,35 C210,10 250,55 310,30 C350,15 380,35 400,25 L400,80 L0,80 Z"
              fill="rgba(255,255,255,0.18)"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-full h-16 opacity-65"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C60,30 120,70 180,45 C240,20 300,60 360,40 C380,32 395,25 400,28 L400,80 L0,80 Z"
              fill="rgba(0,0,0,0.12)"
            />
          </svg>
        </div>

        <div className="relative z-10 flex h-full w-full">
          <div className="h-full w-24 p-2 flex-shrink-0">
            <div className="h-full w-full rounded-lg border border-white/30 bg-white/15 overflow-hidden">
              {promo.imagen ? (
                <img
                  src={promo.imagen}
                  alt={titulo}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-white/15" />
              )}
            </div>
          </div>
          <div className="flex-1 p-3 pr-4">
            <h3 className="text-[13px] font-semibold text-white line-clamp-1 drop-shadow-sm">
              {titulo}
            </h3>
            <div className="mt-1 text-[11px] font-semibold text-white/90">
              {nombreLocal}
            </div>
            <div className="mt-2 space-y-1 text-[10px] text-white/85">
              <div className="inline-flex items-center gap-1">
                <MapPin size={10} />
                {ubicacion}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
