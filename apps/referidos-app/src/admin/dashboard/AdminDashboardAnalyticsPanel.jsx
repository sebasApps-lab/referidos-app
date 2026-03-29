import React from "react";
import { Activity, BarChart3, Clock3, Rocket } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import useOpsTelemetryHotSync from "../ops/useOpsTelemetryHotSync";
import PrelaunchAnalyticsPanel from "../prelaunch/PrelaunchAnalyticsPanel";
import { DASHBOARD_PRODUCTS, getDashboardProductMeta, normalizeDashboardProductKey } from "./dashboardProducts";
import { useDashboardProdVersions } from "./hooks/useDashboardProdVersions";

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ProductTabs({ selectedProduct, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {DASHBOARD_PRODUCTS.map((product) => {
        const active = product.key === selectedProduct;
        return (
          <button
            key={product.key}
            type="button"
            onClick={() => onSelect(product.key)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
              active
                ? "border-[#5E30A5] bg-[#F1EAFF] text-[#5E30A5]"
                : "border-[#E9E2F7] bg-white text-slate-600 hover:bg-[#F8F4FF]"
            }`}
          >
            <div className="font-semibold">{product.label}</div>
            <div className="mt-1 text-xs opacity-80">{product.subtitle}</div>
          </button>
        );
      })}
    </div>
  );
}

export default function AdminDashboardAnalyticsPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProduct = normalizeDashboardProductKey(searchParams.get("product"));
  const selectedMeta = getDashboardProductMeta(selectedProduct);
  const { loading, error, products } = useDashboardProdVersions();
  const selectedProductRow = products.find((item) => item.key === selectedProduct) || null;

  useOpsTelemetryHotSync({
    enabled: true,
    panelKey:
      selectedProduct === "prelaunch_web"
        ? "admin_dashboard_analytics_prelaunch"
        : "admin_dashboard_analytics_referidos_app",
  });

  const handleSelectProduct = (productKey) => {
    const next = new URLSearchParams(searchParams);
    next.set("product", normalizeDashboardProductKey(productKey));
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Analytics
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-[#2F1A55]">
              {selectedMeta.label}
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">
              {selectedMeta.analyticsReady
                ? "Panel operativo para seguir actividad, funnel, waitlist, soporte anonimo y riesgo."
                : "La capa de analytics de Referidos App se implementara despues. La seleccion ya queda preparada desde el dashboard."}
            </p>
          </div>

          <div className="rounded-2xl border border-[#EEE7FA] bg-[#FAF8FF] px-4 py-3 text-xs text-slate-500">
            <div className="font-semibold text-[#2F1A55]">Version prod en linea</div>
            <div className="mt-1 text-sm font-bold text-[#5E30A5]">
              {String(selectedProductRow?.release?.version_label || "").trim() || "Sin release prod"}
            </div>
            <div className="mt-1">Deploy: {formatDate(selectedProductRow?.release?.created_at)}</div>
          </div>
        </div>

        <div className="mt-5">
          <ProductTabs
            selectedProduct={selectedProduct}
            onSelect={handleSelectProduct}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-sm text-slate-500 shadow-sm">
          Cargando contexto del producto...
        </div>
      ) : null}

      {!loading && selectedProduct === "prelaunch_web" ? <PrelaunchAnalyticsPanel /> : null}

      {!loading && selectedProduct !== "prelaunch_web" ? (
        <div className="rounded-3xl border border-dashed border-[#D8CCF4] bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4EEFF] text-[#5E30A5]">
              <Rocket size={22} />
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-lg font-extrabold text-[#2F1A55]">
                  Analytics de Referidos App aun no disponible
                </div>
                <div className="mt-2 max-w-3xl text-sm text-slate-500">
                  La navegacion y el contexto del producto ya quedaron listos. Cuando se implemente
                  esta capa, esta misma ruta servira para mostrar conectados, adquisicion, embudos,
                  errores y conversiones de la app principal.
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-[#EEE8F8] bg-[#FBF9FF] p-4">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
                    <BarChart3 size={16} />
                    Adquisicion
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Funnel y rendimiento por origen y canal.
                  </div>
                </div>
                <div className="rounded-2xl border border-[#EEE8F8] bg-[#FBF9FF] p-4">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
                    <Activity size={16} />
                    Conectados
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Usuarios activos y presencia reciente por plataforma.
                  </div>
                </div>
                <div className="rounded-2xl border border-[#EEE8F8] bg-[#FBF9FF] p-4">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F1A55]">
                    <Clock3 size={16} />
                    Retencion
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Cohortes, frecuencia de uso y reactivacion.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
