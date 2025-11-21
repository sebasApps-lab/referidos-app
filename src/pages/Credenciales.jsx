// src/pages/Credenciales.jsx

import { initialData } from "../data/simulatedData";

export default function Credenciales() {
  return (
    <div className="min-h-screen p-4 bg-white">
      <h1 className="text-2xl font-bold text-[#5E30A5] mb-4">Credenciales de prueba — usuarios y negocios</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full max-w-3xl border-collapse">
          <thead className="bg-[#5E30A5] text-white">
            <tr>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Contraseña</th>
            </tr>
          </thead>
          <tbody>
            {initialData.usuarios.map(u => (
              <tr key={`u-${u.id}`} className="odd:bg-gray-50">
                <td className="p-2 border">Usuario</td>
                <td className="p-2 border">{u.nombre}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.password}</td>
              </tr>
            ))}
            {initialData.negocios.map(n => (
              <tr key={`n-${n.id}`} className="odd:bg-gray-50">
                <td className="p-2 border">Negocio</td>
                <td className="p-2 border">{n.nombre}</td>
                <td className="p-2 border">{n.email}</td>
                <td className="p-2 border">{n.password}</td>
              </tr>
            ))}
            <tr className="odd:bg-gray-50">
              <td className="p-2 border">Admin</td>
              <td className="p-2 border">Admin</td>
              <td className="p-2 border">{initialData.admin.email}</td>
              <td className="p-2 border">{initialData.admin.password}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-2 right-2 text-xs opacity-60">ALPHA v0.0.1</div>
    </div>
  );
}
