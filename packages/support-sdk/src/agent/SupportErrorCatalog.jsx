import React, { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { OBS_ERROR_CODES } from "@referidos/observability";
import { supabase } from "../../lib/supabaseClient";

const STATUS_VARIANT = {
  pending: "bg-amber-100 text-amber-700",
  defined: "bg-emerald-100 text-emerald-700",
  ignored: "bg-slate-100 text-slate-700",
};

const EXTRA_KNOWN_CODES = [
  "method_not_allowed",
  "empty_batch",
  "invalid_message",
  "invalid_body",
  "invalid_action",
  "profile_not_found",
  "tenant_missing",
  "issue_upsert_failed",
  "event_insert_failed",
  "event_not_found",
  "issue_not_found",
  "unauthorized",
];

const KNOWN_CODES = Array.from(
  new Set([...Object.values(OBS_ERROR_CODES), ...EXTRA_KNOWN_CODES]),
).sort();

function buildFallbackRows() {
  const now = new Date().toISOString();
  return KNOWN_CODES.map((code) => ({
    id: `seed-${code}`,
    error_code: code,
    status: "defined",
    count_total: 0,
    source_hint: "seed",
    sample_message: "Catalog seed",
    sample_route: null,
    sample_context: {
      category: "catalog_seed",
      description: "Codigo sembrado desde contrato de observability.",
    },
    first_seen_at: now,
    last_seen_at: now,
  }));
}

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

export default function SupportErrorCatalog() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRows = async () => {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from("obs_error_catalog")
      .select(
        "id, error_code, status, count_total, source_hint, sample_message, sample_route, sample_context, first_seen_at, last_seen_at",
      )
      .order("last_seen_at", { ascending: false })
      .limit(300);
    setLoading(false);
    if (fetchError) {
      setRows(buildFallbackRows());
      setError(fetchError.message || "No se pudo cargar catalogo.");
      return;
    }
    const next = Array.isArray(data) ? data : [];
    setRows(next.length ? next : buildFallbackRows());
  };

  useEffect(() => {
    void loadRows();
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => {
      const haystack = [
        row.error_code,
        row.status,
        row.sample_message,
        row.sample_route,
        row.sample_context?.category,
        row.sample_context?.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [rows, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#E9E2F7] bg-white p-5">
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
          onClick={() => {
            void loadRows();
          }}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D9C8FF] bg-white px-3 py-2 text-sm font-semibold text-[#5E30A5] disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : undefined} />
          Recargar
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="rounded-3xl border border-[#E9E2F7] bg-white p-5">
        {loading ? (
          <div className="text-sm text-slate-500">Cargando catalogo...</div>
        ) : filtered.length === 0 ? (
          <div className="text-sm text-slate-500">No hay codigos para el filtro actual.</div>
        ) : (
          <div className="max-h-[68vh] space-y-2 overflow-auto pr-1">
            {filtered.map((row) => (
              <div
                key={row.id}
                className="rounded-2xl border border-[#E9E2F7] bg-[#FCFBFF] px-4 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-[#2F1A55]">{row.error_code}</div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${STATUS_VARIANT[row.status] || STATUS_VARIANT.pending}`}>
                    {row.status}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Categoria: {row.sample_context?.category || "-"} | Source: {row.source_hint || "-"}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Total: {row.count_total} | Ultimo visto: {formatDate(row.last_seen_at)}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {row.sample_context?.description || row.sample_message || "-"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

