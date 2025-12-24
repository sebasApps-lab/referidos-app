import React from "react";
import InicioPromos from "./InicioPromos";
import PromoCardCercanas from "../../components/cards/PromoCardCercanas";
import PromoCardHot from "../../components/cards/PromoCardHot";
import PromoCardNuevas from "../../components/cards/PromoCardNuevas";

const MOCK_PROMOS = [
  {
    id: "mock-1",
    titulo: "2x1 en pizzas artesanales",
    descripcion: "Lleva una pizza grande y la segunda va por la casa.",
    nombreLocal: "Don Giovanni",
    ubicacion: "La Mariscal, Quito",
    fin: "2025-12-30",
    imagen:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-2",
    titulo: "Combo burger + bebida",
    descripcion: "Menu completo con papas y bebida a precio especial.",
    nombreLocal: "Urban Grill",
    ubicacion: "La Carolina, Quito",
    fin: "2025-11-18",
    imagen:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-3",
    titulo: "Descuento en bowls saludables",
    descripcion: "20% en bowls frescos de lunes a jueves.",
    nombreLocal: "Green Spot",
    ubicacion: "Cumbaya, Quito",
    fin: "2025-10-02",
    imagen:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-4",
    titulo: "Cafe + croissant",
    descripcion: "Promo desayuno rapido para iniciar el dia.",
    nombreLocal: "Maison Cafe",
    ubicacion: "La Carolina, Quito",
    fin: "2025-09-14",
    imagen:
      "https://images.unsplash.com/photo-1459257868276-5e65389e2722?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-5",
    titulo: "Entradas de cine 2x1",
    descripcion: "Valido de lunes a miercoles en horarios seleccionados.",
    nombreLocal: "Cine Plaza",
    ubicacion: "Centro, Quito",
    fin: "2025-08-25",
    imagen:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-6",
    titulo: "Descuento en sneakers",
    descripcion: "Hasta 30% en modelos seleccionados.",
    nombreLocal: "Run Club",
    ubicacion: "La Floresta, Quito",
    fin: "2025-09-30",
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-7",
    titulo: "Promo sushi night",
    descripcion: "Rolls mixtos con entrada incluida.",
    nombreLocal: "Maki House",
    ubicacion: "La Carolina, Quito",
    fin: "2025-10-11",
    imagen:
      "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-8",
    titulo: "Spa express",
    descripcion: "Masaje de 30 min con descuento especial.",
    nombreLocal: "Zen Room",
    ubicacion: "Norte, Quito",
    fin: "2025-12-05",
    imagen:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-9",
    titulo: "Clase de indoor cycling",
    descripcion: "Primera clase gratis para nuevos usuarios.",
    nombreLocal: "Spin Lab",
    ubicacion: "La Mariscal, Quito",
    fin: "2025-11-02",
    imagen:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-10",
    titulo: "Tacos 3x2",
    descripcion: "Sabores mixtos en tortillas artesanales.",
    nombreLocal: "La Taqueria",
    ubicacion: "Centro, Quito",
    fin: "2025-07-20",
    imagen:
      "https://images.unsplash.com/photo-1550547660-4fd6f5d5f0e8?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-11",
    titulo: "Helado doble",
    descripcion: "Segundo scoop sin costo extra.",
    nombreLocal: "Gelato Lab",
    ubicacion: "Cumbaya, Quito",
    fin: "2025-10-19",
    imagen:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-12",
    titulo: "Happy hour mocktails",
    descripcion: "Dos bebidas por el precio de una.",
    nombreLocal: "Rooftop",
    ubicacion: "La Carolina, Quito",
    fin: "2025-09-09",
    imagen:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-13",
    titulo: "Taller de ceramica",
    descripcion: "Reserva tu cupo con 15% off.",
    nombreLocal: "Studio Clay",
    ubicacion: "La Floresta, Quito",
    fin: "2025-08-12",
    imagen:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-14",
    titulo: "Box de brunch",
    descripcion: "Entrega en 45 min con bebida incluida.",
    nombreLocal: "Brunch & Co",
    ubicacion: "Cumbaya, Quito",
    fin: "2025-12-22",
    imagen:
      "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "mock-15",
    titulo: "Entrada + postre",
    descripcion: "Combo especial para compartir.",
    nombreLocal: "Bistro 19",
    ubicacion: "Centro, Quito",
    fin: "2025-11-28",
    imagen:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60",
  },
];

const SECTIONS = [
  {
    id: "nuevas",
    title: "Nuevas",
    promos: MOCK_PROMOS.slice(0, 5),
    CardComponent: PromoCardNuevas,
    autoScroll: true,
    autoScrollInterval: 5000,
  },
  {
    id: "cercanas",
    title: "Cerca de ti",
    promos: MOCK_PROMOS.slice(5, 10),
    CardComponent: PromoCardCercanas,
  },
  {
    id: "hot",
    title: "Hot",
    promos: MOCK_PROMOS.slice(10, 15),
    CardComponent: PromoCardHot,
  },
];

export default function InicioPromosPreview() {
  return <InicioPromos sections={SECTIONS} ratings={{}} />;
}
