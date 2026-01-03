import React from "react";
import InicioPromos from "./InicioPromos";

export const MOCK_PROMOS = [
  {
    id: "negocio-mock-1",
    titulo: "Descuento en almuerzos ejecutivos",
    descripcion: "Aplica de lunes a viernes hasta las 15h.",
    estado: "activo",
    fechacreacion: "2026-01-05",
  },
  {
    id: "negocio-mock-2",
    titulo: "2x1 en bebidas frias",
    descripcion: "Happy hour desde las 16h.",
    estado: "pendiente",
    fechacreacion: "2026-01-03",
  },
  {
    id: "negocio-mock-3",
    titulo: "Combo familiar",
    descripcion: "Ideal para grupos de 4 personas.",
    estado: "activo",
    fechacreacion: "2026-01-02",
  },
  {
    id: "negocio-mock-4",
    titulo: "Promo desayuno",
    descripcion: "Cafe + sandwich a precio especial.",
    estado: "inactivo",
    fechacreacion: "2025-12-28",
  },
  {
    id: "negocio-mock-5",
    titulo: "Postres de temporada",
    descripcion: "Agrega un postre con 20% off.",
    estado: "activo",
    fechacreacion: "2025-12-20",
  },
];

export default function InicioPromosPreview() {
  return <InicioPromos promos={MOCK_PROMOS} />;
}
