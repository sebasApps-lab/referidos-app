// src/admin/usuarios/UsuariosTable.jsx
import React, { useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import UsuarioDrawer from "./UsuarioDrawer";

const USERS = [
  {
    id: "USR_2f81a",
    nombre: "Maria Paredes",
    email: "maria@correo.com",
    telefono: "0991112233",
    role: "cliente",
    account_status: "active",
    emailConfirmado: true,
    fechaCreacion: "2025-02-11",
    reportes: 1,
  },
  {
    id: "USR_3b19c",
    nombre: "Carlos Soto",
    email: "carlos@correo.com",
    telefono: "0982223344",
    role: "negocio",
    account_status: "active",
    emailConfirmado: true,
    fechaCreacion: "2025-02-08",
    reportes: 0,
  },
  {
    id: "USR_7aa02",
    nombre: "Lucia Gomez",
    email: "lucia@correo.com",
    telefono: "0975556677",
    role: "cliente",
    account_status: "pending",
    emailConfirmado: false,
    fechaCreacion: "2025-02-14",
    reportes: 2,
  },
  {
    id: "USR_9d12e",
    nombre: "Admin Soporte",
    email: "soporte@referidos.app",
    telefono: "022334455",
    role: "soporte",
    account_status: "active",
    emailConfirmado: true,
    fechaCreacion: "2025-01-30",
    reportes: 0,
  },
  {
    id: "USR_1cd9a",
    nombre: "Jorge Vera",
    email: "jorge@correo.com",
    telefono: "0969911122",
    role: "negocio",
    account_status: "blocked",
    emailConfirmado: true,
    fechaCreacion: "2025-02-01",
    reportes: 5,
  },
];

const STATUS_VARIANT = {
  active: "success",
  pending: "warning",
  expired: "warning",
  blocked: "danger",
  suspended: "warning",
  deleted: "neutral",
};

export default function UsuariosTable({ defaultRole = "todos" }) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState(defaultRole);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [emailFilter, setEmailFilter] = useState("todos");
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    return USERS.filter((user) => {
      const matchesQuery =
        user.nombre.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole = roleFilter === "todos" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "todos" || user.account_status === statusFilter;
      const matchesEmail =
        emailFilter === "todos" ||
        (emailFilter === "confirmado" && user.emailConfirmado) ||
        (emailFilter === "pendiente" && !user.emailConfirmado);

      return matchesQuery && matchesRole && matchesStatus && matchesEmail;
    });
  }, [query, roleFilter, statusFilter, emailFilter]);

  const openDrawer = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-semibold text-[#2F1A55]">Usuarios</div>
          <div className="text-xs text-slate-500">
            Supervisa registros, roles y estados de cuenta.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm"
          >
            <Filter size={14} />
            Guardar vista
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5E30A5] px-3 py-2 text-xs font-semibold text-white shadow-sm"
          >
            Exportar
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <Search size={14} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar usuario o email"
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          />
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <SlidersHorizontal size={14} />
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          >
            <option value="todos">Rol: todos</option>
            <option value="cliente">Cliente</option>
            <option value="negocio">Negocio</option>
            <option value="soporte">Soporte</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <SlidersHorizontal size={14} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          >
            <option value="todos">Estado: todos</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
            <option value="suspended">Suspended</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <SlidersHorizontal size={14} />
          <select
            value={emailFilter}
            onChange={(event) => setEmailFilter(event.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-600 outline-none"
          >
            <option value="todos">Email: todos</option>
            <option value="confirmado">Confirmado</option>
            <option value="pendiente">Pendiente</option>
          </select>
        </div>
      </div>

      <Table
        columns={[
          { key: "usuario", label: "Usuario" },
          { key: "rol", label: "Rol" },
          { key: "estado", label: "Estado" },
          { key: "email", label: "Email" },
          { key: "registro", label: "Registro", hideOnMobile: true },
          { key: "confirmado", label: "Confirmado", hideOnMobile: true },
          { key: "acciones", label: "Acciones", align: "right" },
        ]}
      >
        {filteredUsers.map((user) => (
          <tr key={user.id} className="hover:bg-[#FAF8FF]">
            <td className="px-4 py-3">
              <div className="font-semibold text-slate-700">{user.nombre}</div>
              <div className="text-xs text-slate-400">{user.id}</div>
            </td>
            <td className="px-4 py-3">
              <Badge variant="purple">{user.role}</Badge>
            </td>
            <td className="px-4 py-3">
              <Badge variant={STATUS_VARIANT[user.account_status]}>
                {user.account_status}
              </Badge>
            </td>
            <td className="px-4 py-3 text-slate-500">{user.email}</td>
            <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
              {user.fechaCreacion}
            </td>
            <td className="hidden px-4 py-3 md:table-cell">
              <div className="inline-flex items-center gap-1 text-xs text-slate-500">
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.emailConfirmado ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                {user.emailConfirmado ? "Confirmado" : "Pendiente"}
              </div>
            </td>
            <td className="px-4 py-3 text-right">
              <button
                type="button"
                onClick={() => openDrawer(user)}
                className="rounded-lg border border-[#E9E2F7] px-3 py-1 text-xs font-semibold text-slate-500 transition hover:text-[#5E30A5]"
              >
                Ver
              </button>
            </td>
          </tr>
        ))}
      </Table>

      <UsuarioDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        usuario={selectedUser}
      />
    </div>
  );
}
