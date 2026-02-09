import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";

const STATUS_VARIANT = {
  pending: "bg-amber-100 text-amber-700",
  defined: "bg-emerald-100 text-emerald-700",
  ignored: "bg-slate-100 text-slate-700",
};

function formatDate(iso) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("es-EC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function ErrorCatalogTable() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRows = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("obs_error_catalog")
      .select(
        "id, error_code, status, count_total, source_hint, sample_message, sample_route, first_seen_at, last_seen_at",
      )
      .order("last_seen_at", { ascending: false })
      .limit(250);
    setLoading(false);
    if (fetchError) {
      setRows([]);
      setError(fetchError.message || "No se pudo cargar catalogo");
      return;
    }
    setRows(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadRows();
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => {
      const code = String(row.error_code || "").toLowerCase();
      const status = String(row.status || "").toLowerCase();
      const message = String(row.sample_message || "").toLowerCase();
      const route = String(row.sample_route || "").toLowerCase();
      return (
        code.includes(term) ||
        status.includes(term) ||
        message.includes(term) ||
        route.includes(term)
      );
    });
  }, [rows, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por code, status, ruta o mensaje"
            className="h-10 w-full rounded-xl border border-[#E7E1FF] bg-white pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#5E30A5]"
          />
        </div>
        <button
          type="button"
          onClick={loadRows}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-sm font-semibold text-[#5E30A5] disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : undefined} />
          Recargar
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <Table
        columns={[
          { key: "code", label: "Error code" },
          { key: "status", label: "Estado" },
          { key: "count", label: "Total" },
          { key: "source", label: "Source" },
          { key: "last", label: "Ultimo visto", hideOnMobile: true },
          { key: "sample", label: "Muestra", hideOnMobile: true },
        ]}
      >
        {filtered.map((row) => (
          <tr key={row.id} className="hover:bg-[#FAF8FF]">
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-800">{row.error_code}</div>
              <div className="text-xs text-slate-400">{row.sample_route || "-"}</div>
            </td>
            <td className="px-4 py-3">
              <Badge className={STATUS_VARIANT[row.status] || STATUS_VARIANT.pending}>
                {row.status}
              </Badge>
            </td>
            <td className="px-4 py-3 text-slate-700">{row.count_total}</td>
            <td className="px-4 py-3 text-slate-600">{row.source_hint || "-"}</td>
            <td className="hidden px-4 py-3 text-slate-600 md:table-cell">
              {formatDate(row.last_seen_at)}
            </td>
            <td className="hidden max-w-[420px] px-4 py-3 text-xs text-slate-500 md:table-cell">
              <div className="line-clamp-2">{row.sample_message || "-"}</div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

