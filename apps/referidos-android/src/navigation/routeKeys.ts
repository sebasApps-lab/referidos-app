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
    INBOX: "SoporteInbox",
    TICKET: "SoporteTicket",
    IRREGULAR: "SoporteIrregular",
    PERFIL: "SoportePerfil",
  },
} as const;
