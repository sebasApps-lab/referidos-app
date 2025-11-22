// src/pages/Perfil.jsx

import React from "react";
import { useAppStore } from "../../store/appStore";

export default function Perfil() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);

  const [form, setForm] = React.useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = () => {
    setUser({ ...usuario, ...form });
    alert("Datos guardados");
  };

  return (
    <div style={{ padding: 20, paddingBottom: 120 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
        Mi perfil
      </h1>

      <label style={{ fontWeight: 600 }}>Nombre</label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #CCC"
        }}
      />

      <label style={{ fontWeight: 600 }}>Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #CCC"
        }}
      />

      <label style={{ fontWeight: 600 }}>Teléfono</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #CCC"
        }}
      />

      <button
        onClick={guardar}
        style={{
          width: "100%",
          padding: 12,
          background: "#5E30A5",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 600,
          marginTop: 10
        }}
      >
        Guardar cambios
      </button>
    </div>
  );
}
