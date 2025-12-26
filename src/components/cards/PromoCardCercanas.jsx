import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";
import { sanitizeText } from "../../utils/sanitize";

export default function PromoCardCercanas({ promo, className }) {
  const navigate = useNavigate();
  if (!promo) return null;

  const goDetalle = () => navigate(`/detalle/${promo.id}`);
  const titulo = sanitizeText(promo.titulo || "Promo destacada");
  const descripcion = sanitizeText(promo.descripcion || "Sin descripcion");
  const nombreLocal = sanitizeText(promo.nombreLocal || "Local");
  const ubicacion = sanitizeText(promo.ubicacion || promo.sector || "Ubicacion");

  const wrapperClass =
    className || "flex-shrink-0 w-[88%] sm:w-[340px] pr-3";

  return (
    <div className={wrapperClass}>
      <article
        onClick={goDetalle}
        className="cursor-pointer rounded-2xl border border-[#E9E2F7] bg-white shadow-sm overflow-hidden"
      >
        <div className="h-44 bg-[#F8F5FF]">
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
        <div className="p-4">
          <h3 className="text-[15px] font-semibold text-[#2F1A55] line-clamp-2">
            {titulo}
          </h3>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">
            {descripcion}
          </p>
          <div className="mt-3 h-px bg-[#E9E2F7]" />
          <div className="mt-3 text-sm font-semibold text-[#5E30A5]">
            {nombreLocal}
          </div>
          <div className="mt-2 space-y-1 text-xs text-slate-500">
            <div className="inline-flex items-center gap-2">
              <MapPin size={12} />
              {ubicacion}
            </div>
            <div className="inline-flex items-center gap-2">
              <Calendar size={12} />
              Hasta {formatDateIsoToDdMmYyyy(promo.fin)}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
