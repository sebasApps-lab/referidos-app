import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { getQrHistory } from "../../services/qrService";
import { handleError } from "../../utils/errorUtils";
import { useClienteUI } from "../hooks/useClienteUI";
import HistorialList from "./HistorialList";
import HistorialEmpty from "./HistorialEmpty";

const Tabs = ({ active, onChange }) => {
  const tabs = [
    { key: "activos", label: "QR activos" },
    { key: "canjeados", label: "QR canjeados" },
    { key: "expirados", label: "QR expirados" },
  ];

  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-white/60 bg-white/90 p-2 shadow-sm">
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition ${
              isActive
                ? "bg-[#1D1B1A] text-white shadow"
                : "bg-transparent text-black/50 hover:text-black"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

export default function HistorialView() {
  const usuario = useAppStore((s) => s.usuario);
  const { historyTab, setHistoryTab } = useClienteUI();
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
          const estado =
            item.status === "canjeado"
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <p className="text-sm text-black/60">
          Debes iniciar sesion para ver tu historial.
        </p>
        <Link
          to="/cliente/inicio"
          className="mt-4 bg-[#1D1B1A] text-white px-4 py-2 rounded-2xl shadow"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const currentList = grouped[historyTab] || [];

  return (
    <div className="flex flex-col items-center px-4 py-6 gap-6">
      <div className="w-full max-w-3xl space-y-4">
        <div>
          <h1
            className="text-lg font-semibold text-[#1D1B1A]"
            style={{ fontFamily: "var(--cliente-heading)" }}
          >
            Historial de promos
          </h1>
          <p className="text-xs text-black/50">
            Consulta los QR activos, canjeados o expirados.
          </p>
        </div>

        <Tabs active={historyTab} onChange={setHistoryTab} />

        {loading && (
          <p className="text-sm text-black/60">Cargando historial...</p>
        )}
        {error && !loading && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && currentList.length === 0 && (
          <HistorialEmpty variant={historyTab} />
        )}

        {!loading && !error && currentList.length > 0 && (
          <HistorialList items={currentList} variant={historyTab} />
        )}
      </div>
    </div>
  );
}
