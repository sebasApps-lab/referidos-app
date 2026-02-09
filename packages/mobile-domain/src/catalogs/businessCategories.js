export const BUSINESS_CATEGORIES = [
  { id: "restaurante", label: "Comida" },
  { id: "cafe", label: "Cafe" },
  { id: "compras", label: "Compras" },
  { id: "farmacia", label: "Farmacia" },
  { id: "belleza", label: "Belleza" },
  { id: "salud", label: "Salud" },
  { id: "fitness", label: "Fitness" },
  { id: "deporte-recreacion", label: "Deporte y Recreacion" },
  { id: "servicios-profesionales", label: "Servicios Profesionales" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "mascotas", label: "Mascotas" },
  { id: "educacion", label: "Educacion" },
  { id: "otras", label: "Otras" },
];

export const BUSINESS_SUBCATEGORIES = {
  restaurante: [
    "Comida rapida",
    "Hamburguesas",
    "Pizzeria",
    "Comida tipica",
    "Parrilladas",
    "Mariscos",
    "Restaurante gourmet",
    "Comida asiatica",
    "Vegetariana / vegana",
    "Food truck",
    "Otra",
  ],
  cafe: [],
  compras: [
    "Ropa",
    "Zapatos",
    "Accesorios",
    "Minimarket",
    "Supermercado",
    "Licoreria",
    "Ferreteria",
    "Tienda de regalos",
    "Papeleria",
    "Otra",
  ],
  farmacia: [],
  belleza: [
    "Peluqueria",
    "Barberia",
    "Manicure / Pedicure",
    "Spa",
    "Estetica facial",
    "Maquillaje profesional",
    "Centro de unas",
    "Otra",
  ],
  salud: [
    "Clinica",
    "Consultorio medico",
    "Odontologia",
    "Psicologia",
    "Fisioterapia",
    "Laboratorio clinico",
    "Otra",
  ],
  fitness: ["Gimnasio", "CrossFit", "Yoga / Pilates", "Otra"],
  "deporte-recreacion": [],
  "servicios-profesionales": [
    "Limpieza profesional",
    "Contabilidad",
    "Abogados",
    "Marketing / Publicidad",
    "Diseno grafico",
    "Otra",
  ],
  tecnologia: [
    "Venta de tecnologia",
    "Soporte tecnico / Reparacion",
    "Software / IT",
    "Internet / redes",
    "Otra",
  ],
  mascotas: ["Veterinaria", "Grooming", "Pet shop", "Entrenamiento", "Otra"],
  educacion: ["Cursos", "Academia", "Idiomas", "Musica", "Tutorias", "Otra"],
  otras: [
    "Pasteleria",
    "Reposteria",
    "Heladeria",
    "Hoteles / Hospedaje",
    "Automotriz",
    "Turismo",
    "Eventos",
    "Fotografia / Video",
    "Artesanias",
    "Entretenimiento",
    "Otra",
  ],
};

export function resolveCategoryPath(value) {
  const label = String(value || "").trim();
  if (!label) return { parentLabel: "", subLabel: "" };

  const parent = BUSINESS_CATEGORIES.find((item) => item.label === label);
  if (parent) return { parentLabel: parent.label, subLabel: "" };

  for (const [categoryId, list] of Object.entries(BUSINESS_SUBCATEGORIES)) {
    if (list.includes(label)) {
      const parentItem = BUSINESS_CATEGORIES.find((item) => item.id === categoryId);
      return { parentLabel: parentItem?.label || "", subLabel: label };
    }
  }

  return { parentLabel: label, subLabel: "" };
}
