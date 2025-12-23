// src/admin/logs/LogsTable.jsx
import React from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";

const LOGS = [
  {
    id: "LOG_901",
    accion: "Cambio de rol",
    actor: "admin@referidos.app",
    estado: "ok",
    fecha: "2025-02-14 09:12",
    origen: "panel admin",
  },
  {
    id: "LOG_915",
    accion: "Bloqueo de negocio",
    actor: "admin@referidos.app",
    estado: "warning",
    fecha: "2025-02-14 08:40",
    origen: "panel admin",
  },
  {
    id: "LOG_920",
    accion: "Error edge function",
    actor: "system",
    estado: "error",
    fecha: "2025-02-13 23:10",
    origen: "edge",
  },
];

const STATUS_VARIANT = {
  ok: "success",
  warning: "warning",
  error: "danger",
};

export default function LogsTable() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-lg font-semibold text-[#2F1A55]">Logs</div>
        <div className="text-xs text-slate-500">
          Auditoria de acciones admin y errores criticos.
        </div>
      </div>

      <Table
        columns={[
          { key: "evento", label: "Evento" },
          { key: "actor", label: "Actor" },
          { key: "estado", label: "Estado" },
          { key: "fecha", label: "Fecha", hideOnMobile: true },
          { key: "origen", label: "Origen", hideOnMobile: true },
        ]}
      >
        {LOGS.map((log) => (
          <tr key={log.id} className="hover:bg-[#FAF8FF]">
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-700">{log.accion}</div>
              <div className="text-xs text-slate-400">{log.id}</div>
            </td>
            <td className="px-4 py-3 text-slate-500">{log.actor}</td>
            <td className="px-4 py-3">
              <Badge variant={STATUS_VARIANT[log.estado]}>
                {log.estado === "ok" ? (
                  <ShieldCheck size={12} />
                ) : (
                  <AlertCircle size={12} />
                )}
                {log.estado}
              </Badge>
            </td>
            <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
              {log.fecha}
            </td>
            <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
              {log.origen}
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
