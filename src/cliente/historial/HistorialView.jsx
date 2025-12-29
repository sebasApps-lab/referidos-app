import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { getQrHistory } from "../../services/qrService";
import { handleError } from "../../utils/errorUtils";
import { useClienteUI } from "../hooks/useClienteUI";
import HistorialList from "./HistorialList";
import HistorialEmpty from "./HistorialEmpty";
import { HISTORIAL_PREVIEW_BY_TAB } from "./HistorialPromosPreview";

const Tabs = ({ active, onChange }) => {
  const tabs = [
    { key: "activos", label: "ACTIVOS" },
    { key: "canjeados", label: "CANJEADOS" },
    { key: "expirados", label: "EXPIRADOS" },
  ];

  return (
    <div className="flex items-center justify-center">
      {tabs.map((t, index) => {
        const isActive = active === t.key;
        return (
          <React.Fragment key={t.key}>
            <button
              onClick={() => onChange(t.key)}
              className={`relative px-3 py-1.5 text-[13px] font-bold tracking-[0.22em] transition ${
                isActive
                  ? "text-[#5E30A5]"
                  : "text-[#94A3B8] hover:text-[#7A8AA3]"
              }`}
            >
              {t.label}
            </button>
            {index < tabs.length - 1 && (
              <span className="mx-1 h-6 w-px translate-y-0.5 bg-gradient-to-b from-transparent via-[#5E30A5]/30 to-transparent" />
            )}
          </React.Fragment>
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
  const useHistorialPreview = true;

  useEffect(() => {
    if (useHistorialPreview || !usuario?.id) return;
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
  }, [usuario?.id, useHistorialPreview]);

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
          className="mt-4 bg-[#5E30A5] text-white px-4 py-2 rounded-xl shadow-sm transition hover:bg-[#4B2488]"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const currentList = useHistorialPreview
    ? HISTORIAL_PREVIEW_BY_TAB[historyTab]
    : grouped[historyTab] || [];

  return (
    <div className="flex h-full flex-col">
      <section className="hero-bleed historial-hero text-white">
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-2 pb-1">
          <div className="text-center">
            <p className="max-w-[325px] mx-auto text-center text-[18px] font-light leading-snug text-white">
              Consulta tus codigos activos, canjeados
              <span className="block">o expirados.</span>
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-3">
          <div className="w-full rounded-full border border-white/60 bg-[#FAF8FF] px-2 py-0.5 shadow-sm">
            <Tabs active={historyTab} onChange={setHistoryTab} />
          </div>
        </div>
      </section>

      <div
        className="relative flex-1 overflow-y-auto bg-white -mt-4"
        style={{
          marginBottom: "calc(-80px - env(safe-area-inset-bottom))",
          paddingBottom: "calc(80px + env(safe-area-inset-bottom))",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-white" />
        <div className="w-full px-0 pt-4 pb-0 space-y-0">
        {!useHistorialPreview && loading && (
          <p className="text-sm text-slate-500">Cargando historial...</p>
        )}
        {!useHistorialPreview && error && !loading && (
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
    </div>
  );
}
