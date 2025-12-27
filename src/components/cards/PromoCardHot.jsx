import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";
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
        className="cursor-pointer rounded-xl border border-[#E9E2F7] bg-white shadow-sm overflow-hidden flex"
      >
        <div className="h-20 w-20 bg-[#F3EEFF] flex-shrink-0">
          {promo.imagen ? (
            <img
              src={promo.imagen}
              alt={titulo}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#F3EEFF]" />
          )}
        </div>
        <div className="flex-1 p-3">
          <h3 className="text-[13px] font-semibold text-[#2F1A55] line-clamp-1">
            {titulo}
          </h3>
          <div className="mt-1 text-[11px] font-semibold text-[#5E30A5]">
            {nombreLocal}
          </div>
          <div className="mt-2 space-y-1 text-[10px] text-slate-500">
            <div className="inline-flex items-center gap-1">
              <MapPin size={10} />
              {ubicacion}
            </div>
            <div className="inline-flex items-center gap-1">
              <Calendar size={10} />
              {formatDateIsoToDdMmYyyy(promo.fin)}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
