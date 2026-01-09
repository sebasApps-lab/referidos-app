const DEFAULT_SUBCATEGORY_ICON = {
  viewBox: "0 0 24 24",
  paths: [
    "M5 7h14v10H5z",
    "M8 10h8",
    "M8 13h6",
  ],
};

const makeSub = (id, label, icon = DEFAULT_SUBCATEGORY_ICON) => ({
  id,
  label,
  icon,
});

export const BUSINESS_CATEGORIES = [
  {
    id: "restaurante",
    label: "Restaurante",
    icon: {
      viewBox: "0 0 24 24",
      paths: ["M4 14h16", "M6 14a6 6 0 0 1 12 0", "M12 8V6"],
    },
  },
  {
    id: "cafe",
    label: "Café",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M6 9h8v4a4 4 0 0 1-8 0V9Z",
        "M14 10h2a2 2 0 0 1 0 4h-2",
        "M8 6h4",
      ],
    },
  },
  {
    id: "compras",
    label: "Compras",
    icon: {
      viewBox: "0 0 24 24",
      paths: ["M6 8h12l-1 10H7L6 8Z", "M9 8a3 3 0 0 1 6 0"],
    },
  },
  {
    id: "farmacia",
    label: "Farmacia",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M9 3h6",
        "M10 3v3h4V3",
        "M8 6h8v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6Z",
      ],
    },
  },
  {
    id: "belleza",
    label: "Belleza",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M7 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
        "M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0",
        "M9 8l8-4",
        "M9 16l8 4",
      ],
    },
  },
  {
    id: "salud",
    label: "Salud",
    icon: {
      viewBox: "0 0 24 24",
      paths: ["M11 5h2v4h4v2h-4v4h-2v-4H7V9h4V5Z"],
    },
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M3 10h3v4H3z",
        "M18 10h3v4h-3z",
        "M6 12h12",
        "M8 9v6",
        "M16 9v6",
      ],
    },
  },
  {
    id: "deporte-recreacion",
    label: "Deporte & Recreación",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16",
        "M12 4c2.2 0 4 3.6 4 8s-1.8 8-4 8",
        "M12 4c-2.2 0-4 3.6-4 8s1.8 8 4 8",
        "M4 12h16",
      ],
    },
  },
  {
    id: "servicios-profesionales",
    label: "Servicios Profesionales",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M9 6V4h6v2",
        "M5 8h14v10H5z",
        "M5 12h14",
        "M10 12v2h4v-2",
      ],
    },
  },
  {
    id: "tecnologia",
    label: "Tecnología",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M6 6h12v8H6z",
        "M9 18h6",
        "M8 14h8",
      ],
    },
  },
  {
    id: "mascotas",
    label: "Mascotas",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M7 9m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0",
        "M17 9m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0",
        "M5 15c0-2.5 2.5-4 7-4s7 1.5 7 4c0 2-1.5 4-4 4H9c-2.5 0-4-2-4-4Z",
      ],
    },
  },
  {
    id: "educacion",
    label: "Educación",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M3 8l9-4 9 4-9 4-9-4Z",
        "M6 10v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5",
        "M21 12v4",
      ],
    },
  },
  {
    id: "otras",
    label: "Otras",
    icon: {
      viewBox: "0 0 24 24",
      paths: [
        "M5 6h4v4H5z",
        "M10 6h4v4h-4z",
        "M15 6h4v4h-4z",
        "M5 12h4v4H5z",
        "M10 12h4v4h-4z",
        "M15 12h4v4h-4z",
      ],
    },
  },
];

export const BUSINESS_SUBCATEGORIES = {
  restaurante: [
    makeSub("comida-rapida", "Comida rápida"),
    makeSub("hamburguesas", "Hamburguesas"),
    makeSub("pizzeria", "Pizzería"),
    makeSub("comida-tipica", "Comida típica"),
    makeSub("parrilladas", "Parrilladas"),
    makeSub("mariscos", "Mariscos"),
    makeSub("gourmet", "Restaurante gourmet"),
    makeSub("asiatica", "Comida asiática"),
    makeSub("vegetariana", "Comida vegetariana / vegana"),
    makeSub("food-truck", "Food truck"),
    makeSub("otra", "Otra"),
  ],
  cafe: [makeSub("otra", "Otra")],
  compras: [
    makeSub("ropa", "Ropa"),
    makeSub("zapatos", "Zapatos"),
    makeSub("accesorios", "Accesorios"),
    makeSub("minimarket", "Minimarket"),
    makeSub("supermercado", "Supermercado"),
    makeSub("licoreria", "Licorería"),
    makeSub("ferreteria", "Ferretería"),
    makeSub("regalos", "Tienda de regalos"),
    makeSub("papeleria", "Papelería"),
    makeSub("otra", "Otra"),
  ],
  farmacia: [makeSub("otra", "Otra")],
  belleza: [
    makeSub("peluqueria", "Peluquería"),
    makeSub("barberia", "Barbería"),
    makeSub("manicure", "Manicure / Pedicure"),
    makeSub("spa", "Spa"),
    makeSub("facial", "Estética facial"),
    makeSub("maquillaje", "Maquillaje profesional"),
    makeSub("unas", "Centro de uñas"),
    makeSub("otra", "Otra"),
  ],
  salud: [
    makeSub("clinica", "Clínica"),
    makeSub("consultorio", "Consultorio médico"),
    makeSub("odontologia", "Odontología"),
    makeSub("psicologia", "Psicología"),
    makeSub("fisioterapia", "Fisioterapia"),
    makeSub("laboratorio", "Laboratorio clínico"),
    makeSub("otra", "Otra"),
  ],
  fitness: [
    makeSub("gimnasio", "Gimnasio"),
    makeSub("crossfit", "CrossFit"),
    makeSub("yoga", "Yoga / Pilates"),
    makeSub("otra", "Otra"),
  ],
  "deporte-recreacion": [makeSub("otra", "Otra")],
  "servicios-profesionales": [
    makeSub("limpieza", "Limpieza profesional"),
    makeSub("contabilidad", "Contabilidad"),
    makeSub("abogados", "Abogados"),
    makeSub("marketing", "Marketing / Publicidad"),
    makeSub("diseno", "Diseño gráfico"),
    makeSub("otra", "Otra"),
  ],
  tecnologia: [
    makeSub("venta", "Venta de tecnología"),
    makeSub("soporte", "Soporte técnico / Reparación"),
    makeSub("software", "Software / IT"),
    makeSub("internet", "Internet / redes"),
    makeSub("otra", "Otra"),
  ],
  mascotas: [
    makeSub("veterinaria", "Veterinaria"),
    makeSub("grooming", "Grooming"),
    makeSub("pet-shop", "Pet shop"),
    makeSub("entrenamiento", "Entrenamiento"),
    makeSub("otra", "Otra"),
  ],
  educacion: [
    makeSub("cursos", "Cursos"),
    makeSub("academia", "Academia"),
    makeSub("idiomas", "Idiomas"),
    makeSub("musica", "Música"),
    makeSub("tutorias", "Tutorías"),
    makeSub("otra", "Otra"),
  ],
  otras: [
    makeSub("pasteleria", "Pastelería"),
    makeSub("reposteria", "Repostería"),
    makeSub("heladeria", "Heladería"),
    makeSub("hoteles", "🏨 Hoteles / Hospedaje"),
    makeSub("automotriz", "🚗 Automotriz"),
    makeSub("turismo", "✈️ Turismo"),
    makeSub("eventos", "🎉 Eventos"),
    makeSub("foto-video", "📸 Fotografía / Video"),
    makeSub("artesanias", "🧵 Artesanías"),
    makeSub("entretenimiento", "🎮 Entretenimiento"),
    makeSub("otra", "Otra"),
  ],
};
