import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { sanitizeText } from "../../utils/sanitize";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";

const VALID_WINDOW_MS = 30 * 60 * 1000;

const PacmanTimer = ({ timeLeftMs }) => {
  const progress = Math.max(0, Math.min(1, timeLeftMs / VALID_WINDOW_MS));
  const mouthDeg = 50 * (1 - progress) + 10;
  const color =
    timeLeftMs > 20 * 60 * 1000
      ? "#10B981"
      : timeLeftMs > 10 * 60 * 1000
      ? "#F59E0B"
      : "#EF4444";

  return (
    <div
      className="absolute -top-3 -left-3 w-10 h-10 rounded-full"
      style={{
        background: `conic-gradient(transparent ${mouthDeg}deg, ${color} ${mouthDeg}deg 360deg)`,
        border: `3px solid ${color}`,
        opacity: 0.92,
        boxShadow: `0 4px 10px ${color}33`,
      }}
    >
      <div
        className="w-4 h-4 rounded-full absolute"
        style={{
          background: `${color}66`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

const StatusBadge = ({ variant }) => {
  const styles = {
    canjeados: { bg: "#1DA1F2", text: "canjeado" },
    expirados: { bg: "#EF4444", text: "expirado" },
  }[variant];

  if (!styles) return null;

  return (
    <div
      className="absolute -top-3 -left-3 px-2 py-1 text-[10px] font-semibold rounded-md text-white"
      style={{
        background: styles.bg,
        border: `2px solid ${styles.bg}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      {styles.text}
    </div>
  );
};

export default function HistorialItem({ item, variant }) {
  const navigate = useNavigate();
  const promo = item?.promo || {};
  const safePromo = {
    ...promo,
    titulo: sanitizeText(promo.titulo),
    descripcion: sanitizeText(promo.descripcion),
    sector: sanitizeText(promo.sector),
    nombreLocal: sanitizeText(promo.nombreLocal),
  };

  const goDetalle = () => {
    if (promo?.id) navigate(`/detalle/${promo.id}`);
  };

  return (
    <article
      className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-sm"
      onClick={goDetalle}
    >
      {variant === "activos" && (
        <PacmanTimer timeLeftMs={item.timeLeftMs} />
      )}
      {variant === "canjeados" && <StatusBadge variant="canjeados" />}
      {variant === "expirados" && <StatusBadge variant="expirados" />}

      <div className="flex gap-4 p-4">
        <div
          className="h-24 w-24 rounded-2xl bg-[#ECE7E1] bg-cover bg-center flex-shrink-0"
          style={{
            backgroundImage: promo.imagen ? `url(${promo.imagen})` : undefined,
          }}
        />
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <h3 className="text-sm font-semibold text-[#1D1B1A] line-clamp-2">
              {safePromo.titulo}
            </h3>
            <p className="text-xs text-black/55 line-clamp-2">
              {safePromo.descripcion}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] text-black/50">
            <span className="inline-flex items-center gap-1 text-[#3D5A80] font-semibold">
              <MapPin size={12} />
              {safePromo.nombreLocal}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {formatDateIsoToDdMmYyyy(promo.fin)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
