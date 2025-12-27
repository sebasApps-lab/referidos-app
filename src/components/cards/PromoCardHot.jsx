import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";
import { sanitizeText } from "../../utils/sanitize";
import badgeHot from "../../assets/badges/badge-promo-hot..png";
import embersBg from "../../assets/images/embers-bg.png";
import sparklesOverlay from "../../assets/overlays/hot-sparkles-overlay.png";

export default function PromoCardHot({ promo, className, wrapperProps }) {
  const navigate = useNavigate();
  if (!promo) return null;

  const goDetalle = () => navigate(`/detalle/${promo.id}`);
  const titulo = sanitizeText(promo.titulo || "Promo hot");
  const descripcion = sanitizeText(promo.descripcion || "Sin descripcion");
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
        className="cursor-pointer rounded-[26px] shadow-lg overflow-hidden flex aspect-[2/1] relative text-white"
      >
        <div className="relative h-full w-[46%] flex-shrink-0">
          {promo.imagen ? (
            <img
              src={promo.imagen}
              alt={titulo}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 h-full w-full bg-[#2B0B0B]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/0 to-black/15" />
        </div>

        <div className="relative flex-1">
          <img
            src={embersBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <img
            src={sparklesOverlay}
            alt=""
            className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-80"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#3B0A05]/85 via-[#7A1A0C]/65 to-[#2A0606]/80" />

          <div className="relative z-10 flex h-full flex-col px-4 py-3">
            <img
              src={badgeHot}
              alt="Hot"
              className="h-7 w-auto"
              style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.35))" }}
            />
            <h3 className="mt-2 text-[16px] font-semibold leading-snug text-white line-clamp-2 drop-shadow">
              {titulo}
            </h3>
            <p className="mt-1 text-[12px] text-white/85 line-clamp-3">
              {descripcion}
            </p>
            <div className="mt-2 h-px w-full bg-white/20" />
            <div className="mt-2 space-y-1 text-[11px] text-white/85">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-[#F9C85F]" />
                <span className="font-semibold">{nombreLocal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-[#F9C85F]" />
                <span>Hasta {formatDateIsoToDdMmYyyy(promo.fin)}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/70">
                <span>{ubicacion}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
