// src/admin/sistema/RegistroCodes.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { KeyRound, Plus } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import { supabase } from "../../lib/supabaseClient";

const STATUS_VARIANT = {
  activo: "success",
  usado: "info",
  revocado: "danger",
  expirado: "warning",
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toISOString().slice(0, 10);
};

const getStatus = (row) => {
  if (row?.revoked_at) return "revocado";
  if (row?.used_at) return "usado";
  if (row?.expires_at && new Date(row.expires_at).getTime() <= Date.now()) {
    return "expirado";
  }
  return "activo";
};

export default function RegistroCodes() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [revokingId, setRevokingId] = useState(null);
  const [error, setError] = useState("");

  const invokeWithAuth = useCallback(async (fnName, options = {}) => {
    const { data: { session } = {} } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error("No hay sesion activa");
    }
    const { data, error: invokeError } = await supabase.functions.invoke(
      fnName,
      {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (invokeError) throw invokeError;
    if (data?.ok === false) {
      throw new Error(data.message || "Error al procesar la solicitud");
    }
    return data;
  }, []);

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await invokeWithAuth("list-registration-codes", {
        body: { limit: 100 },
      });
      setCodes(data?.data || []);
    } catch (err) {
      setError(err?.message || "No se pudieron cargar los codigos");
      setCodes([]);
    } finally {
      setLoading(false);
    }
  }, [invokeWithAuth]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const handleCreate = async () => {
    setCreating(true);
    setError("");
    try {
      await invokeWithAuth("create-registration-code", { body: {} });
      await fetchCodes();
    } catch (err) {
      setError(err?.message || "No se pudo crear el codigo");
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (row) => {
    if (!row?.id) return;
    setRevokingId(row.id);
    setError("");
    try {
      await invokeWithAuth("revoke-registration-code", {
        body: { id: row.id },
      });
      await fetchCodes();
    } catch (err) {
      setError(err?.message || "No se pudo revocar el codigo");
    } finally {
      setRevokingId(null);
    }
  };

  const rows = useMemo(() => {
    return codes.map((row) => ({
      ...row,
      estado: getStatus(row),
      creado: formatDate(row.created_at),
      usado: formatDate(row.used_at),
    }));
  }, [codes]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-[#2F1A55]">
            Codigos de registro
          </div>
          <div className="text-xs text-slate-500">
            Control de onboarding para negocios.
          </div>
        </div>
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
        >
          <Plus size={14} />
          {creating ? "Creando..." : "Crear codigo"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      <Table
        columns={[
          { key: "codigo", label: "Codigo" },
          { key: "estado", label: "Estado" },
          { key: "creado", label: "Creado" },
          { key: "usado", label: "Usado", hideOnMobile: true },
          { key: "acciones", label: "Acciones", align: "right" },
        ]}
      >
        {loading && (
          <tr>
            <td
              colSpan={5}
              className="px-4 py-6 text-center text-xs text-slate-400"
            >
              Cargando codigos...
            </td>
          </tr>
        )}

        {!loading && rows.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="px-4 py-6 text-center text-xs text-slate-400"
            >
              Sin codigos disponibles.
            </td>
          </tr>
        )}

        {!loading &&
          rows.map((code) => (
            <tr key={code.id} className="hover:bg-[#FAF8FF]">
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-700">{code.code}</div>
                <div className="text-xs text-slate-400">{code.id}</div>
              </td>
              <td className="px-4 py-3">
                <Badge variant={STATUS_VARIANT[code.estado]}>
                  {code.estado}
                </Badge>
              </td>
              <td className="px-4 py-3 text-slate-500">{code.creado}</td>
              <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                {code.usado}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => handleRevoke(code)}
                  disabled={revokingId === code.id || code.estado === "revocado"}
                  className="rounded-lg border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500 disabled:opacity-50"
                >
                  <KeyRound size={12} className="inline" />
                  {revokingId === code.id ? "Revocando..." : "Revocar"}
                </button>
              </td>
            </tr>
          ))}
      </Table>
    </div>
  );
}
