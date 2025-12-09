import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { useAppStore } from "../store/appStore";
import { sanitizeText } from "../utils/sanitize";
import { getPromoById } from "../services/promoService";
import { generatePromoQr, generateValidQr, getActiveValidQr } from "../services/qrService";
import { handleError } from "../utils/errorUtils";

const Badge = ({ status }) => {
  if (!status) return null;
  const map = {
    valido: { text: "Válido", color: "#10B981" },
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
  const usuario = useAppStore((s) => s.usuario);

  const [promo, setPromo] = useState(null);
  const [loadingPromo, setLoadingPromo] = useState(true);
  const [staticQr, setStaticQr] = useState("");
  const [validQr, setValidQr] = useState(null);
  const [error, setError] = useState("");
  const [loadingQr, setLoadingQr] = useState(false);

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
      setError(err || "No se pudo generar el QR base");
      return;
    }
    setStaticQr(data.code);
  }, [safeId]);

  const loadValidQr = useCallback(async () => {
    const { ok, data, error: err } = await getActiveValidQr(safeId);
    if (!ok) {
      setError(err || "No se pudo consultar el QR activo");
      return;
    }
    setValidQr(data);
  }, [safeId]);

  useEffect(() => {
    loadPromo();
  }, [loadPromo]);

  useEffect(() => {
    if (!usuario?.id || !safeId) return;
    loadStaticQr();
    loadValidQr();
  }, [usuario?.id, safeId, loadStaticQr, loadValidQr]);

  const handleGenerateValid = async (force = false) => {
    setLoadingQr(true);
    setError("");
    try {
      const { ok, data, error: err } = await generateValidQr(safeId, { force });
      if (!ok) throw new Error(err || "No se pudo generar el QR válido");
      setValidQr(data);
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoadingQr(false);
    }
  };

  const cardShadow = "0 8px 19px rgba(0,0,0,0.12)";

  const renderQrBlock = (label, qrCode, extra) => (
    <div
      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-md flex flex-col items-center gap-3"
      style={{ boxShadow: cardShadow }}
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-sm font-semibold text-[#5E30A5]">{label}</p>
        {extra}
      </div>
      {qrCode ? (
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
          <QRCode value={qrCode} size={180} />
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Sin datos aún.</p>
      )}
    </div>
  );

  if (loadingPromo) {
    return (
      <div className="p-6">
        <p className="text-gray-700">Cargando detalles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-[#5E30A5] font-semibold mb-4"
        >
          ← Volver
        </button>
        <p className="text-red-500 text-sm">{error}</p>
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
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-20">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="text-[#5E30A5] text-lg font-semibold"
        >
          ← Volver
        </button>
        <h1 className="text-xl font-bold text-[#5E30A5]">
          {safePromo.titulo}
        </h1>
      </div>

      <div
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md"
        style={{ boxShadow: cardShadow }}
      >
        {safePromo.imagen && (
          <div
            className="w-full h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${safePromo.imagen})` }}
          />
        )}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{safePromo.nombreLocal}</p>
              <p className="text-base font-semibold text-gray-900">
                {safePromo.sector || "Sector no especificado"}
              </p>
            </div>
            {status && <Badge status={status} />}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {safePromo.descripcion || "Sin descripción"}
          </p>
        </div>
      </div>

      {renderQrBlock(
        validQr ? "QR válido (30 min)" : "QR válido (genera para canjear)",
        validQr?.code,
        <div className="flex flex-col gap-1 text-right">
          {status && <Badge status={status} />}
          {validQr?.expiresAt && status === "valido" && (
            <Timer expiresAt={validQr.expiresAt} />
          )}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => handleGenerateValid(false)}
          disabled={loadingQr}
          className={`flex-1 px-4 py-3 rounded-xl font-semibold text-white shadow ${
            loadingQr
              ? "bg-[#CBB3F0] cursor-not-allowed"
              : "bg-[#5E30A5] hover:bg-[#4c2686]"
          }`}
        >
          {validQr ? "Reutilizar / actualizar QR" : "Generar QR válido (30 min)"}
        </button>
        {validQr && (
          <button
            onClick={() => handleGenerateValid(true)}
            disabled={loadingQr}
            className={`px-4 py-3 rounded-xl font-semibold border shadow ${
              loadingQr
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "border-[#5E30A5] text-[#5E30A5]"
            }`}
          >
            Regenerar
          </button>
        )}
      </div>

      {renderQrBlock("QR base de la promo (no caduca)", staticQr, null)}
    </div>
  );
}
