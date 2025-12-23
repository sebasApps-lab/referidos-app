// src/admin/sistema/RegistroCodes.jsx
import React from "react";
import { KeyRound, Plus } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";

const CODES = [
  {
    id: "REG_102",
    code: "NEG-4F8D",
    estado: "activo",
    creado: "2025-02-10",
    usado: "-",
  },
  {
    id: "REG_119",
    code: "NEG-7C21",
    estado: "usado",
    creado: "2025-02-05",
    usado: "2025-02-12",
  },
  {
    id: "REG_130",
    code: "NEG-9A12",
    estado: "revocado",
    creado: "2025-02-08",
    usado: "-",
  },
];

const STATUS_VARIANT = {
  activo: "success",
  usado: "info",
  revocado: "danger",
};

export default function RegistroCodes() {
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
          className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white"
        >
          <Plus size={14} />
          Crear codigo
        </button>
      </div>

      <Table
        columns={[
          { key: "codigo", label: "Codigo" },
          { key: "estado", label: "Estado" },
          { key: "creado", label: "Creado" },
          { key: "usado", label: "Usado", hideOnMobile: true },
          { key: "acciones", label: "Acciones", align: "right" },
        ]}
      >
        {CODES.map((code) => (
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
                className="rounded-lg border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500"
              >
                <KeyRound size={12} className="inline" />
                Revocar
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
