import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import IssuesTable from "../../admin/observability/IssuesTable";
import ErrorCatalogTable from "../../admin/observability/ErrorCatalogTable";

const VIEWS = Object.freeze({
  ISSUES: "issues",
  CATALOG: "catalog",
});

export default function AdminObservability() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentView = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const requested = params.get("view");
    return requested === VIEWS.CATALOG ? VIEWS.CATALOG : VIEWS.ISSUES;
  }, [location.search]);

  const setView = (nextView) => {
    const params = new URLSearchParams(location.search);
    if (nextView === VIEWS.ISSUES) {
      params.delete("view");
    } else {
      params.set("view", nextView);
    }
    const search = params.toString();
    navigate(`/admin/observability${search ? `?${search}` : ""}`, {
      replace: true,
    });
  };

  return (
    <AdminLayout title="Observability" subtitle="Issues, eventos y trazabilidad">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-2xl border border-[#E7E1FF] bg-white p-1">
          <button
            type="button"
            onClick={() => setView(VIEWS.ISSUES)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              currentView === VIEWS.ISSUES
                ? "bg-[#5E30A5] text-white"
                : "text-[#4E3A78] hover:bg-[#F7F4FF]"
            }`}
          >
            Issues y eventos
          </button>
          <button
            type="button"
            onClick={() => setView(VIEWS.CATALOG)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              currentView === VIEWS.CATALOG
                ? "bg-[#5E30A5] text-white"
                : "text-[#4E3A78] hover:bg-[#F7F4FF]"
            }`}
          >
            Catalogo de errores
          </button>
        </div>

        {currentView === VIEWS.ISSUES ? <IssuesTable /> : <ErrorCatalogTable />}
      </div>
    </AdminLayout>
  );
}
