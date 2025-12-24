import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Calendar } from "lucide-react";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";
import { sanitizeText } from "../../utils/sanitize";

export default function PromoCard({ promo, rating, variant = "carousel" }) {
  const navigate = useNavigate();
  if (!promo) return null;

  const goDetalle = () => navigate(`/detalle/${promo.id}`);

  const nombreLocal = sanitizeText(promo.nombreLocal || "Local");
  const titulo = sanitizeText(promo.titulo || "Promo destacada");
  const descripcion = sanitizeText(promo.descripcion || "Sin descripcion");
  const sector = sanitizeText(promo.sector || "Zona cercana");
  const displayRating = Number.isFinite(Number(rating))
    ? Number(rating).toFixed(1)
    : null;

  const wrapperClass =
    variant === "grid"
      ? "w-full"
      : "flex-shrink-0 w-[270px] sm:w-[320px] pr-4";

  return (
    <div className={wrapperClass}>
      <article
        onClick={goDetalle}
        className="group cursor-pointer rounded-2xl overflow-hidden border border-[#E9E2F7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <div className="relative h-40 bg-[#F8F5FF]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: promo.imagen ? `url(${promo.imagen})` : undefined,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#5E30A5] shadow-sm">
              {sector}
            </span>
          </div>
          {displayRating && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#5E30A5] shadow-sm">
              <Star size={12} className="text-[#5E30A5]" />
              {displayRating}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold text-[#2F1A55] leading-snug line-clamp-2">
              {titulo}
            </h3>
          </div>

          <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3">
            {descripcion}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 text-[#5E30A5] font-semibold">
              <MapPin size={12} />
              {nombreLocal}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {formatDateIsoToDdMmYyyy(promo.fin)}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
