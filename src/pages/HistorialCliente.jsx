// src/pages/HistorialCliente.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { sanitizeText } from "../utils/sanitize";
import { getQrHistory } from "../services/qrService";
import { handleError } from "../utils/errorUtils";
import PromoCard from "../components/cards/PromoCard";

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
      className="absolute -top-2 -left-2 w-10 h-10 rounded-full"
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
    canjeado: { bg: "#1DA1F2", color: "#fff", text: "canjeado" },
    expirado: { bg: "#EF4444", color: "#fff", text: "expirado" },
  }[variant];

  if (!styles) return null;

  return (
    <div
      className="absolute -top-2 -left-2 px-2 py-1 text-xs font-semibold rounded-md"
      style={{
        background: styles.bg,
        color: styles.color,
        border: `2px solid ${styles.bg}`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      {styles.text}
    </div>
  );
};

const Tabs = ({ active, onChange }) => {
  const tabs = [
    { key: "activos", label: "QR activos" },
    { key: "canjeados", label: "QR canjeados" },
    { key: "expirados", label: "QR expirados" },
  ];
  return (
    <div className="flex justify-around w-full max-w-md mb-4 border-b border-gray-200">
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`pb-2 text-sm font-semibold transition border-b-2 ${
              isActive ? "text-[#5E30A5] border-[#5E30A5]" : "text-gray-500 border-transparent"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

const CardHistorial = ({ item, variant }) => {
  const { promo } = item;
  const safePromo = {
    ...promo,
    titulo: sanitizeText(promo.titulo),
    descripcion: sanitizeText(promo.descripcion),
    sector: sanitizeText(promo.sector),
    nombreLocal: sanitizeText(promo.nombreLocal),
  };

  return (
    <div className="relative">
      {variant === "activos" && <PacmanTimer timeLeftMs={item.timeLeftMs} />}
      {variant === "canjeados" && <StatusBadge variant="canjeado" />}
      {variant === "expirados" && <StatusBadge variant="expirado" />}
      <PromoCard promo={safePromo} rating={item.rating || 4.5} />
    </div>
  );
};

export default function HistorialCliente() {
  const usuario = useAppStore((s) => s.usuario);
  const [tab, setTab] = useState("activos");
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!usuario?.id) return;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const { ok, data, error: err } = await getQrHistory();
        if (!ok) throw new Error(err || "No se pudo cargar el historial");

        const now = Date.now();
        const enriched = data.map((item) => {
          const exp = item.expiresAt ? new Date(item.expiresAt).getTime() : now;
          const timeLeftMs = exp - now;
          const estado = item.status === "canjeado"
            ? "canjeado"
            : timeLeftMs <= 0
            ? "expirado"
            : "activo";
          return { ...item, estado, timeLeftMs };
        });

        setHistorial(enriched);
      } catch (err) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [usuario?.id]);

  const grouped = useMemo(() => {
    const base = { activos: [], canjeados: [], expirados: [] };
    historial.forEach((item) => {
      if (item.estado === "canjeado") base.canjeados.push(item);
      else if (item.estado === "expirado") base.expirados.push(item);
      else base.activos.push(item);
    });
    return base;
  }, [historial]);

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
        <p className="text-lg text-gray-700">Debes iniciar sesión para ver tu historial.</p>
        <Link
          to="/cliente/inicio"
          className="mt-4 bg-[#5E30A5] text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const currentList = grouped[tab] || [];

  return (
    <div className="flex flex-col items-center p-4 pb-16 relative bg-white w-full">

      <Tabs active={tab} onChange={setTab} />

      {loading && <p className="text-gray-600 mt-6">Cargando historial...</p>}
      {error && !loading && <p className="text-red-500 mt-4 text-sm">{error}</p>}

      {!loading && !error && currentList.length === 0 && (
        <p className="text-gray-600 mt-6 text-center">
          {tab === "activos" && "No tienes promos activas."}
          {tab === "canjeados" && "Canjea tu primera promo."}
          {tab === "expirados" && "Aquí se mostrarán tus promos expiradas."}
        </p>
      )}

      <div className="w-full max-w-2xl flex flex-col gap-4 mt-2">
        {currentList.map((item) => (
          <CardHistorial key={item.id} item={item} variant={tab} />
        ))}
      </div>
    </div>
  );
}
