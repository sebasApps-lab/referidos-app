import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import VersioningReleaseExplorerPanel from "../../admin/versioning/VersioningReleaseExplorerPanel";

export default function AdminVersioningReleases() {
  const [searchParams] = useSearchParams();
  const initialProductKey = (searchParams.get("producto") || "").trim().toLowerCase();

  return (
    <AdminLayout
      title="Historial de releases"
      subtitle="Componentes y revisiones de una versión por entorno"
    >
      <div className="space-y-4">
        <Link
          to="/admin/versionado/global"
          className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-[#5E30A5] hover:bg-[#FAF8FF]"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Volver a Versionado
        </Link>
        <VersioningReleaseExplorerPanel initialProductKey={initialProductKey} />
      </div>
    </AdminLayout>
  );
}
