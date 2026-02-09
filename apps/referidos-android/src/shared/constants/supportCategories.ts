export type SupportRole = "cliente" | "negocio";

export type SupportCategory = {
  id: string;
  label: string;
  description: string;
  roles: SupportRole[];
};

export const SUPPORT_CHAT_CATEGORIES: SupportCategory[] = [
  {
    id: "acceso",
    label: "Acceso / Cuenta",
    description: "Ingreso, contrasena o bloqueo.",
    roles: ["cliente", "negocio"],
  },
  {
    id: "verificacion",
    label: "Verificacion",
    description: "Correo, telefono o estado de cuenta.",
    roles: ["cliente", "negocio"],
  },
  {
    id: "qr",
    label: "QR / Escaner",
    description: "Lectura o validacion de QR.",
    roles: ["cliente", "negocio"],
  },
  {
    id: "promos",
    label: "Promociones",
    description: "Aplicacion de promos o visibilidad.",
    roles: ["cliente", "negocio"],
  },
  {
    id: "negocios_sucursales",
    label: "Negocios / Sucursales",
    description: "Datos del negocio, direcciones u horarios.",
    roles: ["negocio"],
  },
  {
    id: "pagos_plan",
    label: "Pagos / Plan",
    description: "Facturacion, plan o upgrades.",
    roles: ["negocio"],
  },
  {
    id: "tier_beneficios",
    label: "Tier / Beneficios",
    description: "Progreso, beneficios y referidos.",
    roles: ["cliente"],
  },
  {
    id: "reporte_abuso",
    label: "Reporte de abuso",
    description: "Contenido indebido o fraude.",
    roles: ["cliente", "negocio"],
  },
  {
    id: "bug_performance",
    label: "Bug / Rendimiento",
    description: "Errores o lentitud.",
    roles: ["cliente", "negocio"],
  },
  {
    id: "sugerencia",
    label: "Sugerencia",
    description: "Mejoras o nuevas funciones.",
    roles: ["cliente", "negocio"],
  },
];

