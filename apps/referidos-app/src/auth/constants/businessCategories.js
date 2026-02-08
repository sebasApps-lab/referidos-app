const makeIcon = (paths, viewBox = "0 0 24 24") => ({
  viewBox,
  paths,
});

const DEFAULT_SUBCATEGORY_ICON = makeIcon([
  "M5 7h14v10H5z",
  "M8 10h8",
  "M8 13h6",
]);

const makeSub = (id, label, icon = DEFAULT_SUBCATEGORY_ICON) => ({
  id,
  label,
  icon,
});

const SUB_ICONS = {
  comidaRapida: makeIcon([
    "M6 9V6",
    "M9 9V5",
    "M12 9V6",
    "M15 9V5",
    "M5 9h14l-2 8H7L5 9Z",
  ]),
  hamburguesas: makeIcon(["M7 9h10", "M5 12h14", "M6 15h12", "M9 8h1"]),
  pizzeria: makeIcon([
    "M12 3a9 9 0 1 0 0.01 0",
    "M12 12V3",
    "M12 12l7.8 4.5",
    "M12 12l-7.8 4.5",
    "M8.5 8.5h.01",
    "M15.5 8.5h.01",
    "M12 15.5h.01",
  ]),
  comidaTipica: null,
  parrilladas: null,
  mariscos: makeIcon([
    "M5 12c2-2 4-3 7-3 3 0 5 1 7 3-2 2-4 3-7 3-3 0-5-1-7-3Z",
    "M5 12l-2-2v4l2-2",
    "M13 12h.01",
  ]),
  gourmet: makeIcon(["M4 13h16", "M6 13a6 6 0 0 1 12 0", "M12 6v1"]),
  asiatica: makeIcon([
    "M5 13h14",
    "M7 13a5 5 0 0 0 10 0",
    "M14 6l4-3",
    "M13 8l5-3",
  ]),
  vegetariana: null,
  foodTruck: makeIcon([
    "M3 14h11v-5H7l-2 3H3v2",
    "M14 14h5l2-2v-3h-7v5",
    "M6 17a1.5 1.5 0 1 0 0.01 0",
    "M17 17a1.5 1.5 0 1 0 0.01 0",
  ]),
  comidaOtra: null,

  ropa: makeIcon(["M6 6l3-2h6l3 2-3 2v10H9V8L6 6Z"]),
  zapatos: null,
  accesorios: null,
  minimarket: makeIcon(["M4 9h16l-1 8H5L4 9Z", "M6 9V6h12v3", "M9 12h2"]),
  supermercado: makeIcon([
    "M5 6h2l2 9h9l2-6H8",
    "M10 19a1 1 0 1 0 .01 0",
    "M16 19a1 1 0 1 0 .01 0",
  ]),
  licoreria: makeIcon([
    "M10 3h4v2h-1v3l2 2v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-9l2-2V5h-1V3Z",
  ]),
  ferreteria: null,
  regalos: makeIcon([
    "M4 9h16v11H4V9Z",
    "M4 9h16",
    "M12 9v11",
    "M8 6c0-1 1-2 2-2 2 0 2 2 2 2",
    "M12 6c0-1 1-2 2-2 2 0 2 2 2 2",
  ]),
  papeleria: makeIcon(["M4 20l4-1 9-9-3-3-9 9-1 4Z", "M13 7l3 3"]),
  comprasOtra: null,

  peluqueria: null,
  barberia: null,
  manicure: null,
  spa: makeIcon(["M12 6c2 2 2 4 0 6-2-2-2-4 0-6Z", "M7 9c2 1 3 3 3 5-3-1-5-3-3-5Z", "M17 9c2 2 0 4-3 5 0-2 1-4 3-5Z"]),
  facial: makeIcon(["M7 7a5 5 0 0 1 10 0v4a5 5 0 0 1-10 0V7Z", "M10 9h.01", "M14 9h.01", "M10 12c1 1 3 1 4 0"]),
  maquillaje: makeIcon(["M10 3h4v3h-4V3Z", "M9 6h6v8l-3 3-3-3V6Z", "M9 17h6"]),
  unas: null,
  bellezaOtra: null,

  clinica: makeIcon(["M6 4h12v16H6Z", "M9 4v4h6V4", "M12 11v4", "M10 13h4"]),
  consultorio: makeIcon(["M6 4v5a4 4 0 0 0 8 0V4", "M14 9a3 3 0 1 0 0.01 0", "M14 12v2a4 4 0 0 1-8 0v-1"]),
  odontologia: makeIcon(["M8 6c1-2 7-2 8 0 1 2-1 6-2 8-1 2-2-1-2-3-1 2-1 5-2 3-2-2-3-6-2-8Z"]),
  psicologia: null,
  fisioterapia: null,
  laboratorio: makeIcon(["M10 4h4", "M10 4v6l-4 6a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-6V4", "M9 14h6"]),
  saludOtra: null,

  gimnasio: null,
  crossfit: makeIcon(["M10 7a2 2 0 1 1 4 0v2h-4V7Z", "M8 9h8l2 8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4l2-8Z"]),
  yoga: null,
  fitnessOtra: null,

  limpieza: makeIcon(["M6 15l4-4 3 3-4 4-3-3Z", "M13 10l5-5", "M5 18h6"]),
  contabilidad: makeIcon(["M7 4h10v16H7Z", "M9 7h6", "M9 10h2", "M13 10h2", "M9 13h2", "M13 13h2"]),
  abogados: makeIcon(["M12 4v14", "M6 7h6l-3 5-3-5Z", "M12 7h6l-3 5-3-5Z", "M9 18h6"]),
  marketing: makeIcon(["M4 10l12-4v12L4 14v-4Z", "M16 8h3v8h-3", "M8 14l1 4"]),
  diseno: null,
  serviciosOtra: null,

  ventaTecnologia: makeIcon(["M4 6h12v8H4z", "M8 16h4", "M18 8h2v8h-2z"]),
  soporte: makeIcon(["M14 5a3 3 0 0 0-3 3l-6 6 2 2 6-6a3 3 0 0 0 3-3Z", "M6 18l-2 2"]),
  software: makeIcon(["M9 7l-4 5 4 5", "M15 7l4 5-4 5", "M12 6l-2 12"]),
  internet: makeIcon(["M6 10a8 8 0 0 1 12 0", "M8 13a5 5 0 0 1 8 0", "M11 16a2 2 0 0 1 2 0"]),
  tecnologiaOtra: null,

  veterinaria: makeIcon(["M8 7a1.5 1.5 0 1 0 .01 0", "M12 6a1.5 1.5 0 1 0 .01 0", "M16 7a1.5 1.5 0 1 0 .01 0", "M12 11c3 0 5 2 5 4s-2 3-5 3-5-1-5-3 2-4 5-4Z"]),
  grooming: makeIcon([
    "M7 8a2 2 0 1 0 .01 0",
    "M7 16a2 2 0 1 0 .01 0",
    "M9 10l8 8",
    "M9 14l8-8",
  ]),
  petShop: makeIcon(["M7 7h6l4 4-6 6-4-4V7Z", "M9 9h.01"]),
  entrenamiento: null,
  mascotasOtra: null,

  cursos: makeIcon(["M6 7h8", "M6 11h8", "M6 15h8", "M16 7l2 2 3-3"]),
  academia: makeIcon(["M5 10h14", "M7 10v8", "M12 10v8", "M17 10v8", "M4 10l8-4 8 4"]),
  idiomas: makeIcon(["M5 8h8v5H8l-3 3V8Z", "M13 10h6v4h-3l-3 2v-6Z"]),
  musica: makeIcon(["M10 5v10a2 2 0 1 0 2 2V7h4V5h-6Z"]),
  tutorias: null,
  educacionOtra: null,

  pasteleria: null,
  reposteria: null,
  heladeria: makeIcon(["M9 7a3 3 0 1 1 6 0c0 2-3 3-3 3s-3-1-3-3Z", "M10 10l2 8 2-8"]),
  hoteles: makeIcon(["M4 12h16v6H4z", "M6 12V9h6v3", "M14 12V9h4v3"]),
  automotriz: makeIcon(["M5 12l2-4h10l2 4", "M4 12h16v5H4z", "M7 17a1.5 1.5 0 1 0 .01 0", "M17 17a1.5 1.5 0 1 0 .01 0"]),
  turismo: makeIcon(["M7 6h10v12H7z", "M9 6V4h6v2", "M7 10h10"]),
  eventos: null,
  fotoVideo: makeIcon(["M5 9h14v8H5z", "M9 9l1-2h4l1 2", "M12 13a2 2 0 1 0 0.01 0"]),
  artesanias: null,
  entretenimiento: null,
  otrasOtra: null,
};

export const BUSINESS_CATEGORIES = [
  {
    id: "restaurante",
    label: "Comida",
    icon: makeIcon(["M4 14h16", "M6 14a6 6 0 0 1 12 0", "M12 8V6"]),
  },
  {
    id: "cafe",
    label: "Café",
    icon: makeIcon([
      "M6 9h8v4a4 4 0 0 1-8 0V9Z",
      "M14 10h2a2 2 0 0 1 0 4h-2",
      "M8 6h4",
    ]),
  },
  {
    id: "compras",
    label: "Compras",
    icon: makeIcon(["M6 8h12l-1 10H7L6 8Z", "M9 8a3 3 0 0 1 6 0"]),
  },
  {
    id: "farmacia",
    label: "Farmacia",
    icon: makeIcon([
      "M9 3h6",
      "M10 3v3h4V3",
      "M8 6h8v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6Z",
    ]),
  },
  {
    id: "belleza",
    label: "Belleza",
    icon: SUB_ICONS.grooming,
  },
  {
    id: "salud",
    label: "Salud",
    icon: makeIcon(["M11 5h2v4h4v2h-4v4h-2v-4H7V9h4V5Z"]),
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: makeIcon([
      "M3 10h3v4H3z",
      "M18 10h3v4h-3z",
      "M6 12h12",
      "M8 9v6",
      "M16 9v6",
    ]),
  },
  {
    id: "deporte-recreacion",
    label: "Deporte & Recreación",
    icon: makeIcon([
      "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16",
      "M12 4c2.2 0 4 3.6 4 8s-1.8 8-4 8",
      "M12 4c-2.2 0-4 3.6-4 8s1.8 8 4 8",
      "M4 12h16",
    ]),
  },
  {
    id: "servicios-profesionales",
    label: "Servicios Profesionales",
    icon: makeIcon([
      "M9 6V4h6v2",
      "M5 8h14v10H5z",
      "M5 12h14",
      "M10 12v2h4v-2",
    ]),
  },
  {
    id: "tecnologia",
    label: "Tecnología",
    icon: makeIcon(["M6 6h12v8H6z", "M9 18h6", "M8 14h8"]),
  },
  {
    id: "mascotas",
    label: "Mascotas",
    icon: makeIcon([
      "M7 9m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0",
      "M17 9m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0",
      "M5 15c0-2.5 2.5-4 7-4s7 1.5 7 4c0 2-1.5 4-4 4H9c-2.5 0-4-2-4-4Z",
    ]),
  },
  {
    id: "educacion",
    label: "Educación",
    icon: makeIcon([
      "M3 8l9-4 9 4-9 4-9-4Z",
      "M6 10v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5",
      "M21 12v4",
    ]),
  },
  {
    id: "otras",
    label: "Otras",
    icon: makeIcon([
      "M6 12a2 2 0 1 0 0.01 0",
      "M12 12a2 2 0 1 0 0.01 0",
      "M18 12a2 2 0 1 0 0.01 0",
    ]),
  },
];

export const BUSINESS_SUBCATEGORIES = {
  restaurante: [
    makeSub("comida-rapida", "Comida rápida", SUB_ICONS.comidaRapida),
    makeSub("hamburguesas", "Hamburguesas", SUB_ICONS.hamburguesas),
    makeSub("pizzeria", "Pizzería", SUB_ICONS.pizzeria),
    makeSub("comida-tipica", "Comida típica"),
    makeSub("parrilladas", "Parrilladas"),
    makeSub("mariscos", "Mariscos", SUB_ICONS.mariscos),
    makeSub("gourmet", "Restaurante gourmet", SUB_ICONS.gourmet),
    makeSub("asiatica", "Comida asiática", SUB_ICONS.asiatica),
    makeSub("vegetariana", "Vegetariana / vegana"),
    makeSub("food-truck", "Food truck", SUB_ICONS.foodTruck),
    makeSub("otra", "Otra"),
  ],
  cafe: [],
  compras: [
    makeSub("ropa", "Ropa", SUB_ICONS.ropa),
    makeSub("zapatos", "Zapatos"),
    makeSub("accesorios", "Accesorios"),
    makeSub("minimarket", "Minimarket", SUB_ICONS.minimarket),
    makeSub("supermercado", "Supermercado", SUB_ICONS.supermercado),
    makeSub("licoreria", "Licorería", SUB_ICONS.licoreria),
    makeSub("ferreteria", "Ferretería"),
    makeSub("regalos", "Tienda de regalos", SUB_ICONS.regalos),
    makeSub("papeleria", "Papelería", SUB_ICONS.papeleria),
    makeSub("otra", "Otra"),
  ],
  farmacia: [],
  belleza: [
    makeSub("peluqueria", "Peluquería"),
    makeSub("barberia", "Barbería"),
    makeSub("manicure", "Manicure / Pedicure"),
    makeSub("spa", "Spa", SUB_ICONS.spa),
    makeSub("facial", "Estética facial", SUB_ICONS.facial),
    makeSub("maquillaje", "Maquillaje profesional", SUB_ICONS.maquillaje),
    makeSub("unas", "Centro de uñas"),
    makeSub("otra", "Otra"),
  ],
  salud: [
    makeSub("clinica", "Clínica", SUB_ICONS.clinica),
    makeSub("consultorio", "Consultorio médico", SUB_ICONS.consultorio),
    makeSub("odontologia", "Odontología", SUB_ICONS.odontologia),
    makeSub("psicologia", "Psicología"),
    makeSub("fisioterapia", "Fisioterapia"),
    makeSub("laboratorio", "Laboratorio clínico", SUB_ICONS.laboratorio),
    makeSub("otra", "Otra"),
  ],
  fitness: [
    makeSub("gimnasio", "Gimnasio"),
    makeSub("crossfit", "CrossFit", SUB_ICONS.crossfit),
    makeSub("yoga", "Yoga / Pilates"),
    makeSub("otra", "Otra"),
  ],
  "deporte-recreacion": [],
  "servicios-profesionales": [
    makeSub("limpieza", "Limpieza profesional", SUB_ICONS.limpieza),
    makeSub("contabilidad", "Contabilidad", SUB_ICONS.contabilidad),
    makeSub("abogados", "Abogados", SUB_ICONS.abogados),
    makeSub("marketing", "Marketing / Publicidad", SUB_ICONS.marketing),
    makeSub("diseno", "Diseño gráfico"),
    makeSub("otra", "Otra"),
  ],
  tecnologia: [
    makeSub("venta", "Venta de tecnología", SUB_ICONS.ventaTecnologia),
    makeSub("soporte", "Soporte técnico / Reparación", SUB_ICONS.soporte),
    makeSub("software", "Software / IT", SUB_ICONS.software),
    makeSub("internet", "Internet / redes", SUB_ICONS.internet),
    makeSub("otra", "Otra"),
  ],
  mascotas: [
    makeSub("veterinaria", "Veterinaria", SUB_ICONS.veterinaria),
    makeSub("grooming", "Grooming", SUB_ICONS.grooming),
    makeSub("pet-shop", "Pet shop", SUB_ICONS.petShop),
    makeSub("entrenamiento", "Entrenamiento"),
    makeSub("otra", "Otra"),
  ],
  educacion: [
    makeSub("cursos", "Cursos", SUB_ICONS.cursos),
    makeSub("academia", "Academia", SUB_ICONS.academia),
    makeSub("idiomas", "Idiomas", SUB_ICONS.idiomas),
    makeSub("musica", "Música", SUB_ICONS.musica),
    makeSub("tutorias", "Tutorías"),
    makeSub("otra", "Otra"),
  ],
  otras: [
    makeSub("pasteleria", "Pastelería"),
    makeSub("reposteria", "Repostería"),
    makeSub("heladeria", "Heladería", SUB_ICONS.heladeria),
    makeSub("hoteles", "Hoteles / Hospedaje", SUB_ICONS.hoteles),
    makeSub("automotriz", "Automotriz", SUB_ICONS.automotriz),
    makeSub("turismo", "Turismo", SUB_ICONS.turismo),
    makeSub("eventos", "Eventos"),
    makeSub("foto-video", "Fotografía / Video", SUB_ICONS.fotoVideo),
    makeSub("artesanias", "Artesanías"),
    makeSub("entretenimiento", "Entretenimiento"),
    makeSub("otra", "Otra"),
  ],
};

export const getBusinessCategoryPath = (value) => {
  const label = String(value || "").trim();
  if (!label) {
    return { parentLabel: "", subLabel: "" };
  }

  const parentMatch = BUSINESS_CATEGORIES.find((item) => item.label === label);
  if (parentMatch) {
    return { parentLabel: parentMatch.label, subLabel: "" };
  }

  for (const [parentId, list] of Object.entries(BUSINESS_SUBCATEGORIES)) {
    if (!Array.isArray(list)) continue;
    const subMatch = list.find((item) => item.label === label);
    if (subMatch) {
      const parent = BUSINESS_CATEGORIES.find((item) => item.id === parentId);
      return {
        parentLabel: parent?.label || "",
        subLabel: subMatch.label,
      };
    }
  }

  return { parentLabel: label, subLabel: "" };
};
