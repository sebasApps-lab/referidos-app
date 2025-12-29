import React, { useEffect, useRef, useState } from "react";
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

const QrGlyph = ({ className, style, holeFill = "white" }) => (
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
    <rect x="1" y="1" width="5" height="5" fill={holeFill} />
    <rect x="2" y="2" width="3" height="3" fill="currentColor" />
    <rect x="18" y="0" width="7" height="7" fill="currentColor" />
    <rect x="19" y="1" width="5" height="5" fill={holeFill} />
    <rect x="20" y="2" width="3" height="3" fill="currentColor" />
    <rect x="0" y="18" width="7" height="7" fill="currentColor" />
    <rect x="1" y="19" width="5" height="5" fill={holeFill} />
    <rect x="2" y="20" width="3" height="3" fill="currentColor" />
    {QR_MODULES.map(([x, y]) => (
      <rect
        key={`${x}-${y}`}
        x={x}
        y={y}
        width="1"
        height="1"
        fill="currentColor"
      />
    ))}
  </svg>
);

const QrBadge = ({ progress, className }) => {
  const clamped = Math.max(0, Math.min(1, progress));
  const openingDeg = (1 - clamped) * 360;
  const mask = `conic-gradient(transparent ${openingDeg}deg, #000 ${openingDeg}deg 360deg)`;
  const maskOpening = `conic-gradient(#000 ${openingDeg}deg, transparent ${openingDeg}deg 360deg)`;
  const tone =
    clamped > 0.4
      ? { base: "#22C55E", glow: "#8fd300", hole: "#f3fae4" }
      : clamped > 0.15
      ? { base: "#F59E0B", glow: "#FFD166", hole: "#FFF4D6" }
      : { base: "#EF4444", glow: "#FF8A8A", hole: "#FFE3E3" };
  const lineOpacity = clamped <= 0 ? 0 : 0.8;

  return (
    <div
      className={`relative ${className || "h-14 w-14"} rounded-xl bg-white/80 flex items-center justify-center overflow-hidden`}
    >
      <QrGlyph className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] text-slate-300" />
      <div
        className="absolute -inset-1 rounded-2xl"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          background: tone.glow,
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
          opacity: 0.1,
          filter: "blur(10px)",
        }}
      />
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          border: `1px solid ${tone.base}`,
        }}
      />
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          WebkitMaskImage: maskOpening,
          maskImage: maskOpening,
          border: "1px solid #E6E9EF",
        }}
      />
      <div
        className="absolute inset-2"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <QrGlyph className="h-full w-full" style={{ color: tone.base }} holeFill={tone.hole} />
      </div>
      <div className="pointer-events-none absolute inset-2 overflow-visible">
        <div
          className="absolute left-1/2 top-1/2 h-[140%] w-px"
          style={{
            background: tone.base,
            opacity: lineOpacity,
            transition: "opacity 220ms ease",
            transform: "translate(-50%, -100%) rotate(0deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[140%] w-px"
          style={{
            background: tone.base,
            opacity: lineOpacity,
            transition: "opacity 220ms ease",
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
    progress > 0.4 ? "#10B981" : progress > 0.15 ? "#F59E0B" : "#EF4444";

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

export default function HistorialItemActivo({ item, now }) {
  const navigate = useNavigate();
  const promo = item?.promo || {};
  const localNameRef = useRef(null);
  const [isLocalNameWrapped, setIsLocalNameWrapped] = useState(false);
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
  const qrProgress = Math.max(0, Math.min(1, timeLeftMs / VALID_WINDOW_MS));
  const isClickable = timeLeftMs > 0;
  const shadowGradient = isLocalNameWrapped
    ? "linear-gradient(174deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.20) 58%, rgba(0,0,0,0) 80%)"
    : "linear-gradient(174deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.20) 28%, rgba(0,0,0,0) 62%)";

  useEffect(() => {
    const el = localNameRef.current;
    if (!el || typeof window === "undefined") return undefined;

    const measure = () => {
      const styles = window.getComputedStyle(el);
      const fontSize = parseFloat(styles.fontSize || "0");
      const lineHeightRaw = styles.lineHeight;
      const lineHeight =
        lineHeightRaw && lineHeightRaw !== "normal"
          ? parseFloat(lineHeightRaw)
          : fontSize * 1.2;
      const lines = lineHeight ? Math.round(el.offsetHeight / lineHeight) : 1;
      setIsLocalNameWrapped(lines > 1);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [safePromo.nombreLocal]);

  return (
    <article
      className={`relative overflow-hidden bg-white ${
        isClickable ? "cursor-pointer" : "cursor-default"
      }`}
      onClick={isClickable ? goDetalle : undefined}
    >


      <div className="flex flex-col gap-3 px-4 py-4">
        <div className="flex gap-4 items-stretch">
          <div
            className="relative h-[180px] w-[180px] rounded-tl-xl bg-[#F8F5FF] bg-cover bg-center flex-shrink-0 ring-1 ring-white/80 overflow-hidden"
            style={{
              backgroundImage: promo.imagen ? `url(${promo.imagen})` : undefined,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: shadowGradient,
                filter: "blur(6px)",
                transform: "scaleY(1.08)",
              }}
            />
            <span
              ref={localNameRef}
              className="absolute left-3 top-2 max-w-[calc(100%-32px)] text-[20px] font-bold tracking-[0.2px] text-[#D4A21C] leading-tight"
            >
              {safePromo.nombreLocal}
            </span>
          </div>
          <div className="flex flex-col flex-1 min-w-0 h-full">
            <h3 className="text-[20px] font-semibold text-[#2F1A55] leading-snug line-clamp-2 min-h-[2.4em]">
              {safePromo.titulo}
            </h3>
            <div className="mt-3 flex-1 flex items-center justify-center">
              <div className="h-[120px] w-[120px] flex items-center justify-center">
                {timeLeftMs > 0 && (
                  <QrBadge progress={qrProgress} className="h-full w-full" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[17px] text-slate-500 line-clamp-2">
            {safePromo.descripcion}
          </p>
          <div className="flex flex-wrap gap-3 text-[18px] text-slate-500">
            <span className="inline-flex items-center gap-1 text-[#5E30A5] font-semibold">
              <MapPin size={18} />
              {safePromo.ubicacion}
            </span>
            <span className="inline-flex items-center gap-1">
              {formatDateIsoToDdMmYyyy(promo.fin)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
