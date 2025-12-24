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
        className="group cursor-pointer rounded-3xl overflow-hidden border border-white/60 shadow-[0_14px_40px_rgba(15,23,42,0.08)] bg-white/90 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
      >
        <div className="relative h-40 bg-[#ECE7E1]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: promo.imagen ? `url(${promo.imagen})` : undefined,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-black/70 shadow-sm">
              {sector}
            </span>
          </div>
          {displayRating && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#F9D976] px-2 py-1 text-[11px] font-semibold text-black shadow">
              <Star size={12} className="text-black" />
              {displayRating}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold text-[#1D1B1A] leading-snug line-clamp-2">
              {titulo}
            </h3>
          </div>

          <p className="mt-2 text-xs text-black/60 leading-relaxed line-clamp-3">
            {descripcion}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-black/50">
            <span className="inline-flex items-center gap-1 text-[#3D5A80] font-semibold">
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
