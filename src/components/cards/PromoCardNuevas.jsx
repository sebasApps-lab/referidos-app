import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";
import { sanitizeText } from "../../utils/sanitize";

export default function PromoCardNuevas({ promo, className, wrapperProps }) {
  const navigate = useNavigate();
  if (!promo) return null;

  const goDetalle = () => navigate(`/detalle/${promo.id}`);
  const titulo = sanitizeText(promo.titulo || "Promo nueva");
  const descripcion = sanitizeText(promo.descripcion || "Sin descripcion");
  const nombreLocal = sanitizeText(promo.nombreLocal || "Local");
  const ubicacion = sanitizeText(promo.ubicacion || promo.sector || "Ubicacion");

  const baseClass = className || "flex-shrink-0 w-[90%] sm:w-[420px] pr-3";
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
        className="cursor-pointer rounded-2xl border border-[#E9E2F7] bg-white shadow-sm overflow-hidden flex aspect-[5/2]"
      >
        <div className="w-32 sm:w-36 bg-[#F3EEFF] flex-shrink-0">
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
        <div className="flex-1 p-4">
          <h3 className="text-sm font-semibold text-[#2F1A55] line-clamp-2">
            {titulo}
          </h3>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">
            {descripcion}
          </p>
          <div className="mt-3 text-sm font-semibold text-[#5E30A5]">
            {nombreLocal}
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} />
              {ubicacion}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={11} />
              {formatDateIsoToDdMmYyyy(promo.fin)}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
