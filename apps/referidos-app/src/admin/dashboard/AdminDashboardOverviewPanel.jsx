import React from "react";
import { ArrowRight, MonitorSmartphone, RefreshCw, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

function ProductCard({ product, onSelect }) {
  const release = product.release || null;
  const versionLabel = String(release?.version_label || "").trim() || "Sin release prod";
  const buildLabel =
    Number.isFinite(Number(release?.build_number)) && Number(release?.build_number) > 0
      ? `build ${release.build_number}`
      : "build -";
  const deployedAt = formatDate(release?.created_at);

  return (
    <button
      type="button"
      onClick={() => onSelect(product.key)}
      className="group flex w-full flex-col rounded-3xl border border-[#E9E2F7] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#D7C8F5] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Produccion
          </div>
          <div className="mt-2 text-xl font-extrabold text-[#2F1A55]">{product.label}</div>
          <div className="mt-1 text-sm text-slate-500">{product.subtitle}</div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4EEFF] text-[#5E30A5]">
          {product.key === "prelaunch_web" ? <Rocket size={22} /> : <MonitorSmartphone size={22} />}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[#EFE8FB] bg-[#FBF9FF] p-4">
        <div className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Version en linea</div>
        <div className="mt-2 text-2xl font-extrabold text-[#5E30A5]">{versionLabel}</div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>{buildLabel}</span>
          <span>Deploy: {deployedAt}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-500">
          {product.analyticsReady ? "Abrir analytics" : "Analytics de esta app proximamente"}
        </span>
        <span className="inline-flex items-center gap-2 font-semibold text-[#5E30A5]">
          Ir al panel
          <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}

export default function AdminDashboardOverviewPanel() {
  const navigate = useNavigate();
  const { loading, refreshing, error, products, reload } = useDashboardProdVersions();

  const handleSelect = (productKey) => {
    navigate(`/admin/dashboard/analytics?product=${encodeURIComponent(productKey)}`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Dashboard
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-[#2F1A55]">
              Estado productivo por app
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-500">
              Este bloque muestra la version que esta realmente en linea en produccion. Desde aqui
              puedes entrar al analytics del producto seleccionado.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reload({ silent: true })}
            disabled={loading || refreshing}
            className="inline-flex items-center gap-2 self-start rounded-2xl border border-[#E9E2F7] bg-white px-4 py-2 text-sm font-semibold text-[#2F1A55] disabled:opacity-60"
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-6 text-sm text-slate-500 shadow-sm">
          Cargando versiones productivas...
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.key}
              product={product}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

