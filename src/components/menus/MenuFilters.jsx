// src/components/menus/MenuFilters.jsx
import React, { useState } from "react";

const BRAND_PURPLE = "#5E30A5";

export default function MenuFilters({ onClose }) {
  const [categoria, setCategoria] = useState("");
  const [sector, setSector] = useState("");
  const [descuento, setDescuento] = useState("");
  const [orden, setOrden] = useState("");

  return (
    <div
      style={{
        background: "#FFF",
        borderRadius: 12,
        padding: 16,
        margin: "8px 16px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: BRAND_PURPLE,
          marginBottom: 12,
        }}
      >
        Filtros
      </h2>

      <label style={{ fontSize: 13, fontWeight: 600 }}>Categoría</label>
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        style={selectStyle}
      >
        <option value="">Todas</option>
        <option>Restaurantes</option>
        <option>Moda</option>
        <option>Tecnología</option>
        <option>Belleza</option>
        <option>Educación</option>
      </select>

      <label style={{ fontSize: 13, fontWeight: 600 }}>Sector</label>
      <input
        value={sector}
        onChange={(e) => setSector(e.target.value)}
        placeholder="Ej. Centro, Norte, Sur..."
        style={inputStyle}
      />

      <label style={{ fontSize: 13, fontWeight: 600 }}>Descuento mínimo</label>
      <select
        value={descuento}
        onChange={(e) => setDescuento(e.target.value)}
        style={selectStyle}
      >
        <option value="">Cualquiera</option>
        <option>10%+</option>
        <option>20%+</option>
        <option>30%+</option>
        <option>40%+</option>
        <option>50%+</option>
      </select>

      <label style={{ fontSize: 13, fontWeight: 600 }}>Ordenar por</label>
      <select
        value={orden}
        onChange={(e) => setOrden(e.target.value)}
        style={selectStyle}
      >
        <option value="">Relevancia</option>
        <option>Mayor descuento</option>
        <option>Nuevas</option>
        <option>Más cercanas</option>
        <option>Mejor valoradas</option>
      </select>

      <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
        <button
          style={btnClearStyle}
          onClick={() => {
            setCategoria("");
            setSector("");
            setDescuento("");
            setOrden("");
          }}
        >
          Limpiar
        </button>

        <button style={btnApplyStyle} onClick={onClose}>
          Aplicar
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: 10,
  border: "1px solid #CCC",
  marginBottom: 12,
  fontSize: 13,
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: 10,
  border: "1px solid #CCC",
  marginBottom: 12,
  fontSize: 13,
  background: "#FFF",
};

const btnApplyStyle = {
  flex: 1,
  background: "#5E30A5",
  color: "white",
  border: 0,
  padding: "10px",
  borderRadius: 10,
  fontWeight: 600,
};

const btnClearStyle = {
  flex: 1,
  background: "#EEE",
  color: "#444",
  border: 0,
  padding: "10px",
  borderRadius: 10,
  fontWeight: 600,
};
