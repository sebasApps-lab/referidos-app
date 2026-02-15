export const SUPPORT_STATUS_GROUPS = [
  { id: "new", label: "Nuevos" },
  { id: "assigned", label: "Asignados" },
  { id: "in_progress", label: "En progreso" },
  { id: "waiting_user", label: "Esperando usuario" },
  { id: "queued", label: "En cola" },
  { id: "closed", label: "Resueltos" },
] as const;

export const SUPPORT_ORIGIN_FILTERS = [
  { id: "all", label: "Todos" },
  { id: "registered", label: "Registrados" },
  { id: "anonymous", label: "Anonimos" },
] as const;

export const SUPPORT_DESK_CATEGORIES = [
  { id: "acceso", label: "Acceso / Cuenta" },
  { id: "verificacion", label: "Verificacion" },
  { id: "qr", label: "QR / Escaner" },
  { id: "promos", label: "Promociones" },
  { id: "negocios_sucursales", label: "Negocios / Sucursales" },
  { id: "pagos_plan", label: "Pagos / Plan" },
  { id: "reporte_abuso", label: "Reporte de abuso" },
  { id: "bug_performance", label: "Bug / Rendimiento" },
  { id: "sugerencia", label: "Sugerencia" },
  { id: "tier_beneficios", label: "Tier / Beneficios" },
] as const;

export const SUPPORT_MACROS = [
  {
    id: "welcome",
    title: "Bienvenida",
    body: "Hola, gracias por escribirnos. Ya estoy revisando tu caso y te confirmo en un momento.",
    status: "new",
  },
  {
    id: "assigned_ack",
    title: "Tomando el caso",
    body: "Ya tengo tu caso asignado. Empiezo a revisarlo ahora mismo.",
    status: "assigned",
  },
  {
    id: "request_steps",
    title: "Solicitar pasos",
    body: "Para ayudarte mejor: 1) pasos exactos, 2) pantalla, 3) mensaje de error si aparece.",
    status: "in_progress",
  },
  {
    id: "request_evidence",
    title: "Solicitar evidencia",
    body: "Si puedes, envia una captura o video corto del problema.",
    status: "in_progress",
  },
  {
    id: "waiting_user",
    title: "Esperando respuesta",
    body: "Quedo atento a tu respuesta para continuar con el caso.",
    status: "waiting_user",
  },
  {
    id: "queue_notice",
    title: "Caso en cola",
    body: "Tu caso quedo en cola. Te escribo apenas lo retome.",
    status: "queued",
  },
  {
    id: "closing",
    title: "Cierre cordial",
    body: "Hemos resuelto el caso. Si necesitas algo mas, escribe nuevamente.",
    status: "closed",
  },
] as const;

export type SupportStatusId = (typeof SUPPORT_STATUS_GROUPS)[number]["id"];
export type SupportOriginFilterId = (typeof SUPPORT_ORIGIN_FILTERS)[number]["id"];
