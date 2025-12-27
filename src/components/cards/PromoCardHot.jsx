import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";
import { sanitizeText } from "../../utils/sanitize";
import badgeHot from "../../assets/badges/badge-promo-hot.png";
import embersBg from "../../assets/images/embers-bg.png";
import sparklesOverlay from "../../assets/overlays/hot-sparkles-overlay.png";

export default function PromoCardHot({ promo, className, wrapperProps }) {
  const navigate = useNavigate();
  if (!promo) return null;

  const goDetalle = () => navigate(`/detalle/${promo.id}`);
  const titulo = sanitizeText(promo.titulo || "Promo hot");
  const descripcion = sanitizeText(promo.descripcion || "Sin descripcion");
  const nombreLocal = sanitizeText(promo.nombreLocal || "Local");

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
        className="cursor-pointer rounded-[26px] shadow-lg overflow-hidden relative text-white aspect-[2/1]"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2">
            {promo.imagen ? (
              <img
                src={promo.imagen}
                alt={titulo}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#2B0B0B]" />
            )}
          </div>

          <img
            src={sparklesOverlay}
            alt=""
            className="absolute inset-y-0 left-0 h-full w-full object-cover object-left"
            aria-hidden="true"
          />

          <div className="absolute inset-y-0 left-[45%] w-[55%]">
            <img
              src={embersBg}
              alt=""
              className="h-full w-full object-cover mix-blend-screen"
              aria-hidden="true"
              style={{
                WebkitMaskImage:
                  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 8%, rgba(0,0,0,1) 16%)",
                maskImage:
                  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 8%, rgba(0,0,0,1) 16%)",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 ml-[45%] flex h-full flex-col px-4 py-3">
          <div
            className="relative inline-flex w-fit"
            style={{ opacity: 0.92 }}
          >
            <img src={badgeHot} alt="Hot" className="h-7 w-auto" />
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(75deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.12) 70%, rgba(0,0,0,0.25) 100%)",
                mixBlendMode: "multiply",
              }}
            />
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(175deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 18%)",
                mixBlendMode: "multiply",
              }}
            />
          </div>

          <h3 className="mt-2 text-sm font-semibold leading-snug text-white line-clamp-1">
            {titulo}
          </h3>
          <p className="mt-1 text-xs text-white/85 line-clamp-2">
            {descripcion}
          </p>

          <div className="mt-2 h-px w-full bg-[#F6C35B]/45" />

          <div className="mt-2 space-y-1 text-[11px] text-white/90">
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-[#F6C35B]" />
              <span className="font-semibold">{nombreLocal}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} className="text-[#F6C35B]" />
              <span>Hasta {formatDateIsoToDdMmYyyy(promo.fin)}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
