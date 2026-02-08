import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { sanitizeText } from "../utils/sanitize";
import { getPromoById } from "../services/promoService";
import { generatePromoQr, getActiveValidQr } from "../services/qrService";
import { COLORS } from "../constants/branding";
import { formatDateIsoToDdMmYyyy } from "../utils/dateUtils";

const Badge = ({ status }) => {
  if (!status) return null;
  const map = {
    valido: { text: "Valido", color: COLORS.REFERRAL_GREEN },
    canjeado: { text: "Canjeado", color: "#1DA1F2" },
    expirado: { text: "Expirado", color: "#EF4444" },
  };
  const cfg = map[status] || map.valido;
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background: `${cfg.color}22`,
        color: cfg.color,
        border: `1px solid ${cfg.color}`,
      }}
    >
      {cfg.text}
    </span>
  );
};

const Timer = ({ expiresAt }) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = useMemo(() => {
    if (!expiresAt) return 0;
    return new Date(expiresAt).getTime() - now;
  }, [expiresAt, now]);

  if (!expiresAt) return null;

  if (remaining <= 0) {
    return <span className="text-xs text-red-500 font-semibold">Expirado</span>;
  }

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000)
    .toString()
    .padStart(2, "0");

  return (
    <span className="text-xs text-gray-700 font-semibold">
      Tiempo restante: {minutes}:{seconds}
    </span>
  );
};

export default function PromoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  const [promo, setPromo] = useState(null);
  const [loadingPromo, setLoadingPromo] = useState(true);
  const [staticQr, setStaticQr] = useState("");
  const [validQr, setValidQr] = useState(null);
  const [error, setError] = useState("");
  const [qrError, setQrError] = useState("");
  const [loadingQr, setLoadingQr] = useState(true);

  const safeId = sanitizeText(id);

  const status = useMemo(() => {
    if (!validQr) return null;
    if (validQr.status === "canjeado") return "canjeado";
    const remaining = validQr.expiresAt ? new Date(validQr.expiresAt).getTime() - Date.now() : 0;
    if (remaining <= 0) return "expirado";
    return "valido";
  }, [validQr]);

  const loadPromo = useCallback(async () => {
    setLoadingPromo(true);
    setError("");
    const { ok, data, error: err } = await getPromoById(safeId);
    if (!ok) {
      setError(err || "No se pudo cargar la promo");
      setLoadingPromo(false);
      return;
    }
    setPromo(data);
    setLoadingPromo(false);
  }, [safeId]);

  const loadStaticQr = useCallback(async () => {
    const { ok, data, error: err } = await generatePromoQr(safeId);
    if (!ok) {
      setQrError((prev) => prev || err || "No se pudo cargar el QR de la promo");
      return;
    }
    setStaticQr(data.code);
  }, [safeId]);

  const loadValidQr = useCallback(async () => {
    const { ok, data, error: err } = await getActiveValidQr(safeId);
    if (!ok) {
      setQrError((prev) => prev || err || "No se pudo consultar el QR activo");
      return;
    }
    setValidQr(data);
  }, [safeId]);

  const loadQrs = useCallback(async () => {
    setLoadingQr(true);
    setQrError("");
    await Promise.all([loadStaticQr(), loadValidQr()]);
    setLoadingQr(false);
  }, [loadStaticQr, loadValidQr]);

  useEffect(() => {
    loadPromo();
  }, [loadPromo]);

  useEffect(() => {
    if (!safeId) return;
    loadQrs();
  }, [safeId, loadQrs]);

  if (loadingPromo) {
    return (
      <div className="bg-white">
        <div className="relative">
          <div className="w-full h-[230px] md:h-[260px] bg-[#F3ECFF]" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-[#5E30A5] shadow-md border border-[#E8DBFF] flex items-center justify-center"
            aria-label="Volver"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#5E30A5" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-5 py-6">
          <p className="text-gray-700">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white">
        <div className="relative">
          <div className="w-full h-[230px] md:h-[260px] bg-[#F3ECFF]" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-[#5E30A5] shadow-md border border-[#E8DBFF] flex items-center justify-center"
            aria-label="Volver"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#5E30A5" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-5 py-6">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!promo) return null;

  const safePromo = {
    ...promo,
    titulo: sanitizeText(promo.titulo),
    descripcion: sanitizeText(promo.descripcion),
    nombreLocal: sanitizeText(promo.nombreLocal),
    sector: sanitizeText(promo.sector),
    estado: sanitizeText(promo.estado),
  };

  const periodo = (() => {
    const finFmt = safePromo.fin ? formatDateIsoToDdMmYyyy(safePromo.fin) : "";
    if (finFmt) return `Valido hasta ${finFmt}`;
    return "Validez no disponible";
  })();

  const qrToShow = validQr?.code || staticQr;

  return (
    <div className="bg-white">
      <div className="relative">
        {safePromo.imagen ? (
          <img
            src={safePromo.imagen}
            alt={safePromo.titulo}
            className="w-full h-[200px] md:h-[230px] object-cover"
          />
        ) : (
          <div className="w-full h-[200px] md:h-[230px] bg-gradient-to-br from-[#D4C7F9] to-[#F8EFFF] flex items-center justify-center text-[#5E30A5] font-bold text-lg">
            Imagen no disponible
          </div>
        )}
        <div
          className="absolute inset-x-0 bottom-0 pb-0 px-2"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.2) 100%)",
          }}
        >
          <div
            className="flex items-center justify-between gap-3 rounded-2xl px-3 pt-2 pb-1"
            style={{
              background: "rgba(255,255,255,0.14)",
              boxShadow: "0 10px 30px rgba(255,255,255,0.25)",
            }}
          >
            <p className="text-base md:text-lg font-bold uppercase tracking-[0.08em] text-[#7C5CD6] truncate">
              {safePromo.nombreLocal || "Local sin nombre"}
            </p>
            {safePromo.lat && safePromo.lng ? (
              <a
                href={`https://www.google.com/maps?q=${safePromo.lat},${safePromo.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#5E30A5] font-semibold text-sm whitespace-nowrap"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E30A5" strokeWidth="1.8">
                  <path d="M3 6.5 9 4l6 2.5 6-2.5v13l-6 2.5-6-2.5-6 2.5v-13Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 4v13" />
                  <path d="M15 6.5v13" />
                </svg>
                Ver en Maps
              </a>
            ) : (
              <div className="text-xs text-gray-500">Ubicacion no disponible</div>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-[#5E30A5] shadow-md border border-[#E8DBFF] flex items-center justify-center"
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#5E30A5" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-6 pt-1 space-y-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3 flex-wrap mt-0.5">
            <div className="flex items-center gap-2 text-[#6B6B6B] text-sm md:text-base font-medium">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5">
                <path d="M12 21s8-4.534 8-10A8 8 0 0 0 4 11c0 5.466 8 10 8 10z" />
                <circle cx="12" cy="11" r="2" />
              </svg>
              <span>{safePromo.sector || "Sector no especificado"}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B6B6B] text-sm md:text-base font-medium">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.6">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
              </svg>
              <span>{periodo}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <h1 className="text-2xl md:text-3xl font-black text-[#484848] leading-tight">
              {safePromo.titulo}
            </h1>
            <p className="text-[18px] md:text-[20px] leading-relaxed text-[#8A8A8A]">
              {safePromo.descripcion || "Sin descripcion"}
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col items-center gap-0">
          <div className="w-full flex items-center justify-center gap-3">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5E30A5] text-center">
              Accede a la Promo
            </p>
          </div>

          {loadingQr ? (
            <p className="text-sm text-gray-500">Cargando QR...</p>
          ) : qrToShow ? (
            <div className="bg-white border border-[#E8DBFF] rounded-2xl p-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
              <QRCode value={qrToShow} size={210} />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <svg width="154" height="154" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" />
                <path d="M14 17h4M14 21h4M18 13v4M22 13v8M14 13h4" />
              </svg>
              <p className="text-sm text-center">{qrError || "Aun no hay un codigo QR para esta promo."}</p>
            </div>
          )}

          {status === "valido" && validQr?.expiresAt && <Timer expiresAt={validQr.expiresAt} />}

          {qrError && <p className="text-xs text-red-500 text-center">{qrError}</p>}
        </div>
      </div>
    </div>
  );
}
