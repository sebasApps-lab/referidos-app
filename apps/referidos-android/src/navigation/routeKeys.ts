export const ROOT_ROUTES = {
  AUTH: "AuthFlow",
  CLIENTE: "ClienteTabs",
  NEGOCIO: "NegocioTabs",
  ADMIN: "AdminTabs",
  SOPORTE: "SoporteTabs",
} as const;

export const TAB_ROUTES = {
  CLIENTE: {
    INICIO: "ClienteInicio",
    ESCANER: "ClienteEscaner",
    HISTORIAL: "ClienteHistorial",
    PERFIL: "ClientePerfil",
  },
  NEGOCIO: {
    INICIO: "NegocioInicio",
    ESCANER: "NegocioEscaner",
    GESTIONAR: "NegocioGestionar",
    PERFIL: "NegocioPerfil",
  },
  ADMIN: {
    INICIO: "AdminInicio",
    USUARIOS: "AdminUsuarios",
    SOPORTE: "AdminSoporte",
    OBSERVABILIDAD: "AdminObservabilidad",
    PERFIL: "AdminPerfil",
  },
  SOPORTE: {
    INICIO: "SoporteInicio",
    INBOX: "SoporteInbox",
    TICKET: "SoporteTicket",
    IRREGULAR: "SoporteIrregular",
    PERFIL: "SoportePerfil",
  },
} as const;

export const STACK_ROUTES = {
  ADMIN: {
    TABS: ROOT_ROUTES.ADMIN,
    NEGOCIOS: "AdminNegocios",
    PROMOS: "AdminPromos",
    QRS: "AdminQRs",
    REPORTES: "AdminReportes",
    LOGS: "AdminLogs",
    DATOS: "AdminDatos",
    APPS: "AdminApps",
    SISTEMA: "AdminSistema",
    ANALYTICS: "AdminAnalytics",
    ISSUES: "AdminIssues",
    ISSUE_EVENTS: "AdminIssueEvents",
    ISSUE_EVENT_DETAILS: "AdminIssueEventDetails",
    ERROR_CODES: "AdminErrorCodes",
    VERSIONING: "AdminVersioning",
    DOCUMENTATION: "AdminDocumentation",
    LEGAL: "AdminLegal",
    SUPPORT_TICKETS_PANEL: "AdminSupportTicketsPanel",
    SUPPORT_CATALOG: "AdminSupportCatalog",
    SUPPORT_TICKET: "AdminSupportTicket",
    SUPPORT_AGENTS: "AdminSupportAgents",
  },
  SOPORTE: {
    TABS: ROOT_ROUTES.SOPORTE,
    INICIO: "SoporteInicio",
    JORNADAS: "SoporteJornadas",
    ISSUES: "SoporteIssues",
    ERROR_CATALOG: "SoporteErrorCatalog",
    TICKET: "SoporteTicketStack",
  },
} as const;
