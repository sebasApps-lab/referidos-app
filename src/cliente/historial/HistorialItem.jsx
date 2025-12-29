import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { sanitizeText } from "../../utils/sanitize";
import { formatDateIsoToDdMmYyyy } from "../../utils/dateUtils";

const VALID_WINDOW_MS = 5 * 60 * 1000;

const createSeededRng = (seed) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const createQrModules = (seed = 9321) => {
  const size = 25;
  const modules = [];
  const rng = createSeededRng(seed);
  const isFinder = (x, y) =>
    (x < 7 && y < 7) ||
    (x >= size - 7 && y < 7) ||
    (x < 7 && y >= size - 7);
  const isTiming = (x, y) => x === 6 || y === 6;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (x === 0 || y === 0 || x === size - 1 || y === size - 1) continue;
      if (isFinder(x, y)) continue;
      if (isTiming(x, y)) {
        modules.push([x, y]);
        continue;
      }
      if (rng() > 0.58) modules.push([x, y]);
    }
  }

  return modules;
};

const QR_MODULES = createQrModules();

const QrGlyph = ({ className, style }) => (
  <svg
    viewBox="0 0 25 25"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    shapeRendering="crispEdges"
  >
    <rect width="25" height="25" fill="transparent" />
    <rect x="0" y="0" width="7" height="7" fill="currentColor" />
    <rect x="1" y="1" width="5" height="5" fill="white" />
    <rect x="2" y="2" width="3" height="3" fill="currentColor" />
    <rect x="18" y="0" width="7" height="7" fill="currentColor" />
    <rect x="19" y="1" width="5" height="5" fill="white" />
    <rect x="20" y="2" width="3" height="3" fill="currentColor" />
    <rect x="0" y="18" width="7" height="7" fill="currentColor" />
    <rect x="1" y="19" width="5" height="5" fill="white" />
    <rect x="2" y="20" width="3" height="3" fill="currentColor" />
    {QR_MODULES.map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
    ))}
  </svg>
);

const QrBadge = ({ progress }) => {
  const clamped = Math.max(0, Math.min(1, progress));
  const openingDeg = (1 - clamped) * 360;
  const mask = `conic-gradient(transparent ${openingDeg}deg, #000 ${openingDeg}deg 360deg)`;
  const maskOpening = `conic-gradient(#000 ${openingDeg}deg, transparent ${openingDeg}deg 360deg)`;

  return (
    <div className="relative h-14 w-14 rounded-2xl bg-white/90 ring-1 ring-black/5 shadow-sm flex items-center justify-center overflow-hidden">
      <QrGlyph className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] text-slate-300" />
      <div
        className="absolute -inset-1 rounded-2xl"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          background: "#8fd300",
          opacity: 0.12,
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute -inset-1 rounded-2xl"
        style={{
          WebkitMaskImage: maskOpening,
          maskImage: maskOpening,
          background: "#8A8F98",
          opacity: 0.04,
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute inset-2"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <QrGlyph className="h-full w-full text-[#22C55E]" />
      </div>
      <div className="pointer-events-none absolute inset-2 overflow-visible">
        <div
          className="absolute left-1/2 top-1/2 h-[140%] w-px bg-[#22C55E]/80"
          style={{
            transform: "translate(-50%, -100%) rotate(0deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[140%] w-px bg-[#22C55E]/80"
          style={{
            transform: `translate(-50%, -100%) rotate(${openingDeg}deg)`,
            transformOrigin: "bottom center",
          }}
        />
      </div>
    </div>
  );
};

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
      className="absolute top-5 left-5 w-6 h-6 rounded-full"
      style={{
        background: `conic-gradient(transparent ${mouthDeg}deg, ${color} ${mouthDeg}deg 360deg)`,
        border: `2px solid ${color}`,
        opacity: 0.92,
        boxShadow: `0 4px 10px ${color}33`,
      }}
    >
      <div
        className="w-2 h-2 rounded-full absolute"
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
      className="absolute top-1 right-7 px-2 py-1 text-[10px] font-semibold rounded-md text-white"
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

export default function HistorialItem({ item, variant, now }) {
  const navigate = useNavigate();
  const promo = item?.promo || {};
  const safePromo = {
    ...promo,
    titulo: sanitizeText(promo.titulo),
    descripcion: sanitizeText(promo.descripcion),
    sector: sanitizeText(promo.sector),
    ubicacion: sanitizeText(promo.ubicacion || promo.sector),
    nombreLocal: sanitizeText(promo.nombreLocal),
  };

  const goDetalle = () => {
    if (promo?.id) navigate(`/detalle/${promo.id}`);
  };

  const timeLeftMs = item?.expiresAt
    ? new Date(item.expiresAt).getTime() - now
    : item?.timeLeftMs ?? 0;
  const qrProgress =
    variant === "activos"
      ? Math.max(0, Math.min(1, timeLeftMs / VALID_WINDOW_MS))
      : 0;

  return (
    <article
      className="relative overflow-hidden bg-white cursor-pointer"
      onClick={goDetalle}
    >
      {variant === "activos" && <PacmanTimer timeLeftMs={timeLeftMs} />}
      {variant === "canjeados" && <StatusBadge variant="canjeados" />}
      {variant === "expirados" && <StatusBadge variant="expirados" />}

      <div className="flex gap-4 p-4 items-center">
        <div
          className="h-[60px] w-[60px] rounded-xl bg-[#F8F5FF] bg-cover bg-center flex-shrink-0 ring-1 ring-white/80"
          style={{
            backgroundImage: promo.imagen ? `url(${promo.imagen})` : undefined,
          }}
        />
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div>
            <h3 className="text-[13px] font-semibold text-[#2F1A55] line-clamp-1">
              {safePromo.titulo}
            </h3>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              {safePromo.descripcion}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1 text-[#5E30A5] font-semibold">
              <MapPin size={12} />
              {safePromo.ubicacion}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {formatDateIsoToDdMmYyyy(promo.fin)}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <QrBadge progress={qrProgress} />
        </div>
      </div>
    </article>
  );
}
