// src/pages/Admin.jsx

import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Admin screen (ALPHA v0.0.1)
 * - Tab 1: Bases de datos (editable: usuarios, negocios, promociones, qrValidos)
 * - Tab 2: Promociones (lista y ver/editar/activar/verificar)
 * - Editar número de soporte
 * - Reset demo
 */

export default function Admin() {
  const { data, setData, resetDemo, setSoporteNumero } = useContext(AppContext);

  // local state para edición
  const [tab, setTab] = useState("bases"); // 'bases' | 'promos'
  const [localData, setLocalData] = useState(data);
  const [soporteLocal, setSoporteLocal] = useState(data.soporteNumero || "");
  const [editing, setEditing] = useState({}); // { type: 'usuarios'|'negocios'|'promos'|'qr', id: ... }

  useEffect(() => {
    setLocalData(data);
    setSoporteLocal(data.soporteNumero || "");
  }, [data]);

  // helper para actualizar context desde localData
  const saveAll = () => {
    setData(localData);
    alert("Datos guardados en el demo local.");
  };

  // usuarios
  const addUsuario = () => {
    const nextId = (localData.usuarios.reduce((m, u) => Math.max(m, u.id), 0) || 0) + 1;
    const nuevo = { id: nextId, nombre: "Nuevo Usuario", email: `user${nextId}@example.com`, password: "pass123", telefono: "", emailConfirmado: false, role: "cliente" };
    setLocalData(prev => ({ ...prev, usuarios: [...prev.usuarios, nuevo] }));
  };
  const deleteUsuario = (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    setLocalData(prev => ({ ...prev, usuarios: prev.usuarios.filter(u => u.id !== id) }));
  };

  // negocios
  const addNegocio = () => {
    const nextId = (localData.negocios.reduce((m, n) => Math.max(m, n.id), 0) || 0) + 1;
    const nuevo = { id: nextId, nombre: "Nuevo Negocio", email: `neg${nextId}@example.com`, password: "pass123", sector: "", direccion: "", lat: 0, lng: 0, role: "negocio", promociones: [] };
    setLocalData(prev => ({ ...prev, negocios: [...prev.negocios, nuevo] }));
  };
  const deleteNegocio = (id) => {
    if (!confirm("¿Eliminar negocio?")) return;
    setLocalData(prev => ({ ...prev, negocios: prev.negocios.filter(n => n.id !== id) }));
  };

  // promos
  const addPromo = (negocioId) => {
    const promoId = `p-${Date.now().toString(36).slice(0,6)}`;
    const nueva = { id: promoId, titulo: "Nueva promo", inicio: new Date().toISOString().split("T")[0], fin: new Date(Date.now() + 7*24*3600*1000).toISOString().split("T")[0], imagen: null, activo: false };
    setLocalData(prev => ({
      ...prev,
      negocios: prev.negocios.map(n => n.id === negocioId ? { ...n, promociones: [...(n.promociones||[]), nueva] } : n)
    }));
  };
  const deletePromo = (negocioId, promoId) => {
    if (!confirm("¿Eliminar promoción?")) return;
    setLocalData(prev => ({
      ...prev,
      negocios: prev.negocios.map(n => n.id === negocioId ? { ...n, promociones: n.promociones.filter(p => p.id !== promoId) } : n)
    }));
  };

  // qrvalido (editable flag usado/expired)
  const toggleQRUsado = (qrId) => {
    setLocalData(prev => ({ ...prev, qrValidos: prev.qrValidos.map(q => q.id === qrId ? { ...q, usado: !q.usado } : q) }));
  };
  const deleteQR = (qrId) => {
    if (!confirm("¿Eliminar QR?")) return;
    setLocalData(prev => ({ ...prev, qrValidos: prev.qrValidos.filter(q => q.id !== qrId) }));
  };

  // editar campo generico
  const handleChangeUsuario = (id, field, value) => {
    setLocalData(prev => ({ ...prev, usuarios: prev.usuarios.map(u => u.id === id ? { ...u, [field]: value } : u) }));
  };
  const handleChangeNegocio = (id, field, value) => {
    setLocalData(prev => ({ ...prev, negocios: prev.negocios.map(n => n.id === id ? { ...n, [field]: value } : n) }));
  };

  // guardar soporte
  const guardarSoporte = () => {
    setSoporteNumero(soporteLocal);
    setData(prev => ({ ...prev, soporteNumero: soporteLocal }));
    alert("Número de soporte actualizado.");
  };

  // reset demo
  const handleResetDemo = () => {
    if (!confirm("¿Restablecer datos de demo a su estado inicial?")) return;
    resetDemo();
    alert("Demo reseteado.");
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <h1 className="text-2xl font-bold text-[#5E30A5] mb-4">Panel Admin</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("bases")} className={`px-3 py-2 rounded ${tab === "bases" ? "bg-[#5E30A5] text-white" : "bg-gray-100"}`}>Bases de datos</button>
        <button onClick={() => setTab("promos")} className={`px-3 py-2 rounded ${tab === "promos" ? "bg-[#5E30A5] text-white" : "bg-gray-100"}`}>Promociones</button>
      </div>

      {tab === "bases" && (
        <div className="space-y-6">
          {/* Soporte */}
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h2 className="font-semibold mb-2">Número de soporte</h2>
            <div className="flex gap-2 items-center">
              <input value={soporteLocal} onChange={(e) => setSoporteLocal(e.target.value)} className="border rounded px-3 py-2" />
              <button onClick={guardarSoporte} className="bg-[#5E30A5] text-white px-3 py-2 rounded">Guardar</button>
              <button onClick={handleResetDemo} className="ml-auto bg-red-500 text-white px-3 py-2 rounded">Reset demo</button>
            </div>
          </div>

          {/* Usuarios */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Usuarios ({localData.usuarios.length})</h3>
              <div className="flex gap-2">
                <button onClick={addUsuario} className="bg-green-500 text-white px-3 py-1 rounded">+ Usuario</button>
                <button onClick={saveAll} className="bg-[#5E30A5] text-white px-3 py-1 rounded">Guardar cambios</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-left text-sm text-gray-600">
                  <tr><th className="p-2">ID</th><th className="p-2">Nombre</th><th className="p-2">Email</th><th className="p-2">Tel</th><th className="p-2">Confirmado</th><th className="p-2">Acciones</th></tr>
                </thead>
                <tbody>
                  {localData.usuarios.map(u => (
                    <tr key={u.id} className="border-t">
                      <td className="p-2">{u.id}</td>
                      <td className="p-2">
                        <input className="border rounded px-2 py-1 w-full" value={u.nombre} onChange={(e) => handleChangeUsuario(u.id, "nombre", e.target.value)} />
                      </td>
                      <td className="p-2">
                        <input className="border rounded px-2 py-1 w-full" value={u.email} onChange={(e) => handleChangeUsuario(u.id, "email", e.target.value)} />
                      </td>
                      <td className="p-2">
                        <input className="border rounded px-2 py-1 w-full" value={u.telefono} onChange={(e) => handleChangeUsuario(u.id, "telefono", e.target.value)} />
                      </td>
                      <td className="p-2">
                        <input type="checkbox" checked={!!u.emailConfirmado} onChange={(e) => handleChangeUsuario(u.id, "emailConfirmado", e.target.checked)} />
                      </td>
                      <td className="p-2">
                        <button onClick={() => deleteUsuario(u.id)} className="text-red-600">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Negocios */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Negocios ({localData.negocios.length})</h3>
              <div className="flex gap-2">
                <button onClick={addNegocio} className="bg-green-500 text-white px-3 py-1 rounded">+ Negocio</button>
              </div>
            </div>

            <div className="space-y-4">
              {localData.negocios.map(n => (
                <div key={n.id} className="border rounded p-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-1">ID {n.id} - {n.sector}</div>
                      <input className="border rounded px-2 py-1 w-full mb-2" value={n.nombre} onChange={(e) => handleChangeNegocio(n.id, "nombre", e.target.value)} />
                      <input className="border rounded px-2 py-1 w-full mb-2" value={n.email} onChange={(e) => handleChangeNegocio(n.id, "email", e.target.value)} />
                      <input className="border rounded px-2 py-1 w-full mb-2" value={n.direccion} onChange={(e) => handleChangeNegocio(n.id, "direccion", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => addPromo(n.id)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm">+ Promo</button>
                      <button onClick={() => deleteNegocio(n.id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Eliminar</button>
                    </div>
                  </div>

                  {/* promos del negocio */}
                  <div className="mt-3 bg-gray-50 p-2 rounded">
                    <div className="text-xs text-gray-600 mb-2">Promociones ({n.promociones?.length || 0})</div>
                    <div className="space-y-2">
                      {(n.promociones || []).map(p => (
                        <div key={p.id} className="flex items-center gap-2">
                          <input className="border rounded px-2 py-1 flex-1" value={p.titulo} onChange={(e) => {
                            const val = e.target.value;
                            setLocalData(prev => ({ ...prev, negocios: prev.negocios.map(nn => nn.id === n.id ? { ...nn, promociones: nn.promociones.map(pp => pp.id === p.id ? { ...pp, titulo: val } : pp) } : nn) }));
                          }} />
                          <button onClick={() => {
                            // toggle activo
                            setLocalData(prev => ({ ...prev, negocios: prev.negocios.map(nn => nn.id === n.id ? { ...nn, promociones: nn.promociones.map(pp => pp.id === p.id ? { ...pp, activo: !pp.activo } : pp) } : nn) }));
                          }} className={`px-2 py-1 rounded text-sm ${p.activo ? "bg-green-500 text-white" : "bg-gray-200"}`}>{p.activo ? "Activo" : "Inactivo"}</button>
                          <button onClick={() => deletePromo(n.id, p.id)} className="text-red-600 text-sm">Eliminar</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR válidos */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">QR válidos ({localData.qrValidos.length})</h3>
            </div>

            <div className="space-y-2">
              {localData.qrValidos.map(q => (
                <div key={q.id} className="flex items-center justify-between border p-2 rounded">
                  <div>
                    <div className="text-sm">ID: {q.id}</div>
                    <div className="text-xs text-gray-600">Promo: {q.promoId} • From: {q.fromUserId} • To: {q.toUserId}</div>
                    <div className="text-xs text-gray-500">Expira: {new Date(q.expiresAt).toLocaleString()}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => toggleQRUsado(q.id)} className={`px-2 py-1 rounded text-sm ${q.usado ? "bg-green-500 text-white" : "bg-gray-200"}`}>{q.usado ? "Usado" : "Marcar usado"}</button>
                    <button onClick={() => deleteQR(q.id)} className="text-red-600 text-sm">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {tab === "promos" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Lista global de promociones por negocio. Aquí puedes verificar o cambiar estado.</p>
          <div className="space-y-3">
            {localData.negocios.flatMap(n => (n.promociones||[]).map(p => ({ negocio: n, promo: p }))).map(item => (
              <div key={item.promo.id} className="border rounded p-3 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{item.promo.titulo}</div>
                  <div className="text-xs text-gray-500">{item.negocio.nombre} • {item.promo.inicio} → {item.promo.fin}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    // toggle activo en localData
                    setLocalData(prev => ({ ...prev, negocios: prev.negocios.map(nn => nn.id === item.negocio.id ? { ...nn, promociones: nn.promociones.map(pp => pp.id === item.promo.id ? { ...pp, activo: !pp.activo } : pp) } : nn) }));
                  }} className={`px-3 py-1 rounded ${item.promo.activo ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                    {item.promo.activo ? "Activa" : "Inactivar"}
                  </button>
                  <button onClick={() => {
                    // verificar (simulado): confirm and set activo true
                    if (confirm("Verificar y activar promoción?")) {
                      setLocalData(prev => ({ ...prev, negocios: prev.negocios.map(nn => nn.id === item.negocio.id ? { ...nn, promociones: nn.promociones.map(pp => pp.id === item.promo.id ? { ...pp, activo: true } : pp) } : nn) }));
                    }
                  }} className="px-3 py-1 rounded bg-[#5E30A5] text-white">Verificar</button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button onClick={saveAll} className="bg-[#5E30A5] text-white px-4 py-2 rounded mr-2">Guardar cambios</button>
            <button onClick={handleResetDemo} className="bg-red-500 text-white px-4 py-2 rounded">Reset demo</button>
          </div>
        </div>
      )}

      <div className="absolute bottom-2 right-2 text-xs opacity-60">ALPHA v0.0.1</div>
    </div>
  );
}
