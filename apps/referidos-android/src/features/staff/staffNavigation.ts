import type { ImageSourcePropType } from "react-native";
import { STACK_ROUTES, TAB_ROUTES } from "@navigation/routeKeys";

export const staffIcons = {
  menu: require("./assets/menu.png"),
  bell: require("./assets/bell.png"),
  refresh: require("./assets/refresh-ccw.png"),
  logout: require("./assets/log-out.png"),
  shield: require("./assets/shield-check.png"),
  grid: require("./assets/layout-grid.png"),
  chart: require("./assets/bar-chart-3.png"),
  users: require("./assets/users.png"),
  store: require("./assets/store.png"),
  apps: require("./assets/app-window.png"),
  tag: require("./assets/tag.png"),
  qrCode: require("./assets/qr-code.png"),
  alert: require("./assets/alert-triangle.png"),
  layers: require("./assets/layers-3.png"),
  file: require("./assets/file-text.png"),
  activity: require("./assets/activity.png"),
  gitBranch: require("./assets/git-branch.png"),
  book: require("./assets/book-open.png"),
  scale: require("./assets/scale.png"),
  settings: require("./assets/settings.png"),
  list: require("./assets/list.png"),
  calendar: require("./assets/calendar-clock.png"),
  user: require("./assets/user.png"),
  message: require("./assets/message-square.png"),
  search: require("./assets/search.png"),
  filters: require("./assets/sliders-horizontal.png"),
  chevronDown: require("./assets/chevron-down.png"),
  plus: require("./assets/plus.png"),
  toggle: require("./assets/toggle-left.png"),
  phone: require("./assets/phone.png"),
  mail: require("./assets/mail.png"),
  key: require("./assets/key-round.png"),
  userCheck: require("./assets/user-check.png"),
  ticket: require("./assets/ticket.png"),
  collapse: require("./assets/chevrons-left.png"),
  expand: require("./assets/chevrons-right.png"),
} satisfies Record<string, ImageSourcePropType>;

export type StaffRole = "admin" | "soporte";

type MenuItem = { route: string; label: string; icon: ImageSourcePropType; matches?: string[] };
type MenuGroup = { title: string; items: MenuItem[] };

const adminTab = TAB_ROUTES.ADMIN;
const admin = STACK_ROUTES.ADMIN;
const supportTab = TAB_ROUTES.SOPORTE;
const support = STACK_ROUTES.SOPORTE;

export const STAFF_TABS: Record<StaffRole, { root: string; routes: string[] }> = {
  admin: { root: admin.TABS, routes: Object.values(adminTab) },
  soporte: {
    root: support.TABS,
    routes: [supportTab.INICIO, supportTab.INBOX, supportTab.IRREGULAR, supportTab.PERFIL],
  },
};

export const STAFF_MENU: Record<StaffRole, MenuGroup[]> = {
  admin: [
    { title: "Dashboard", items: [
      { route: adminTab.INICIO, label: "Inicio", icon: staffIcons.grid },
      { route: admin.DASHBOARD, label: "Dashboard", icon: staffIcons.chart },
    ] },
    { title: "Gestión", items: [
      { route: adminTab.USUARIOS, label: "Usuarios", icon: staffIcons.users },
      { route: admin.NEGOCIOS, label: "Negocios", icon: staffIcons.store },
      { route: admin.APPS, label: "Apps", icon: staffIcons.apps },
      { route: admin.PROMOS, label: "Promos", icon: staffIcons.tag },
    ] },
    { title: "Operación", items: [
      { route: admin.QRS, label: "QRs", icon: staffIcons.qrCode },
      { route: admin.REPORTES, label: "Reportes", icon: staffIcons.alert },
      { route: adminTab.SOPORTE, label: "Soporte", icon: staffIcons.shield, matches: [admin.SUPPORT_TICKET] },
      { route: admin.SUPPORT_TICKETS_PANEL, label: "Panel Tickets", icon: staffIcons.layers },
      { route: admin.SUPPORT_CATALOG, label: "Macros", icon: staffIcons.file },
    ] },
    { title: "Sistema", items: [
      { route: admin.LOGS, label: "Logs", icon: staffIcons.file },
      { route: admin.ISSUES, label: "Issues", icon: staffIcons.activity, matches: [admin.ISSUE_EVENTS, admin.ISSUE_EVENT_DETAILS] },
      { route: admin.ERROR_CODES, label: "Catálogo errores", icon: staffIcons.alert },
      { route: admin.DATOS, label: "Datos", icon: staffIcons.chart },
      { route: admin.ANALYTICS, label: "Analytics", icon: staffIcons.chart },
      { route: admin.DLQ, label: "Eventos DLQ", icon: staffIcons.alert },
      { route: admin.VERSIONING, label: "Versionado", icon: staffIcons.gitBranch },
      { route: admin.DOCUMENTATION, label: "Documentación", icon: staffIcons.book },
      { route: admin.LEGAL, label: "Legal", icon: staffIcons.scale },
      { route: admin.SISTEMA, label: "Sistema", icon: staffIcons.settings },
      { route: admin.SUPPORT_AGENTS, label: "Asesores", icon: staffIcons.users },
      { route: adminTab.OBSERVABILIDAD, label: "Observabilidad", icon: staffIcons.activity },
      { route: adminTab.PERFIL, label: "Perfil", icon: staffIcons.user },
    ] },
  ],
  soporte: [
    { title: "Paneles", items: [
      { route: supportTab.INICIO, label: "Inicio", icon: staffIcons.grid },
      { route: supportTab.INBOX, label: "Inbox", icon: staffIcons.list, matches: [support.TICKET] },
      { route: support.JORNADAS, label: "Jornadas", icon: staffIcons.calendar },
      { route: support.ISSUES, label: "Issues", icon: staffIcons.activity },
      { route: support.ERROR_CATALOG, label: "Catálogo errores", icon: staffIcons.alert },
      { route: supportTab.IRREGULAR, label: "Irregulares", icon: staffIcons.file },
      { route: supportTab.PERFIL, label: "Perfil", icon: staffIcons.user },
    ] },
  ],
};

export const STAFF_ROUTE_META: Partial<Record<string, { title: string; subtitle: string }>> = {
  [adminTab.INICIO]: { title: "Inicio", subtitle: "Vista global del estado de la plataforma" },
  [adminTab.USUARIOS]: { title: "Usuarios", subtitle: "Gestión y control de cuentas" },
  [adminTab.SOPORTE]: { title: "Soporte", subtitle: "Modo asesor para revisar tickets" },
  [adminTab.OBSERVABILIDAD]: { title: "Observabilidad", subtitle: "Issues, eventos y catálogo de errores" },
  [adminTab.PERFIL]: { title: "Perfil", subtitle: "Sesión y notificaciones" },
  [admin.NEGOCIOS]: { title: "Negocios", subtitle: "Supervisión de locales y sucursales" },
  [admin.PROMOS]: { title: "Promos", subtitle: "Moderación y control de promociones" },
  [admin.QRS]: { title: "QRs", subtitle: "Auditoría de códigos y canjes" },
  [admin.REPORTES]: { title: "Reportes", subtitle: "Quejas y casos pendientes" },
  [admin.LOGS]: { title: "Logs", subtitle: "Auditoría del sistema" },
  [admin.DATOS]: { title: "Datos", subtitle: "Análisis avanzado y tendencias" },
  [admin.APPS]: { title: "Apps", subtitle: "Identidad canónica de apps para tickets, logs y macros" },
  [admin.SISTEMA]: { title: "Sistema", subtitle: "Control global y herramientas administrativas" },
  [admin.ANALYTICS]: { title: "Analytics", subtitle: "Métricas y estado operativo por producto" },
  [admin.DASHBOARD]: { title: "Dashboard", subtitle: "Acceso central al estado productivo y analytics por app" },
  [admin.DLQ]: { title: "Eventos de borrado DLQ", subtitle: "Detalle de los eventos fallidos de telemetría que se eliminarán en el siguiente purge" },
  [admin.ISSUES]: { title: "Issues", subtitle: "Listado de issues de observabilidad" },
  [admin.ERROR_CODES]: { title: "Catálogo errores", subtitle: "Errores detectados, pendientes y definidos" },
  [admin.VERSIONING]: { title: "Versionado", subtitle: "Releases, historial de componentes y despliegues" },
  [admin.DOCUMENTATION]: { title: "Documentación", subtitle: "Guías del repo organizadas por ámbito general y por app" },
  [admin.LEGAL]: { title: "Legal", subtitle: "Políticas de marca, fuentes oficiales y versiones de documentos legales" },
  [admin.SUPPORT_TICKETS_PANEL]: { title: "Panel Tickets", subtitle: "Estado y asignación de tickets" },
  [admin.SUPPORT_CATALOG]: { title: "Macros", subtitle: "Catálogo operativo y CRUD desde panel admin" },
  [admin.SUPPORT_TICKET]: { title: "Soporte", subtitle: "Detalle del ticket" },
  [admin.SUPPORT_AGENTS]: { title: "Asesores", subtitle: "Gestiona disponibilidad y autorizaciones" },
  [supportTab.INICIO]: { title: "Inicio", subtitle: "Resumen operativo del asesor" },
  [supportTab.INBOX]: { title: "Inbox", subtitle: "Tickets disponibles, asignados y resueltos" },
  [supportTab.IRREGULAR]: { title: "Irregulares", subtitle: "Creación de tickets operativos" },
  [supportTab.PERFIL]: { title: "Perfil", subtitle: "Jornada y sesión" },
  [support.JORNADAS]: { title: "Jornadas", subtitle: "Historial unificado de jornadas y sesiones" },
  [support.ISSUES]: { title: "Issues", subtitle: "Listado de issues y eventos de observabilidad" },
  [support.ERROR_CATALOG]: { title: "Catálogo errores", subtitle: "Referencia de códigos de observabilidad" },
  [support.TICKET]: { title: "Detalle de ticket", subtitle: "Seguimiento operativo del caso" },
};
