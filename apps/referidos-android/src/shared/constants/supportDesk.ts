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

export type SupportStatusId = (typeof SUPPORT_STATUS_GROUPS)[number]["id"];
export type SupportOriginFilterId = (typeof SUPPORT_ORIGIN_FILTERS)[number]["id"];
