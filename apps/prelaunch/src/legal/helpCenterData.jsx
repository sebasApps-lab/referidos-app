const IS_DEV = import.meta.env.DEV;

const SIDEBAR_CATEGORY_DEFS = [
  { key: "legal", title: "Legal", slug: "legal" },
  { key: "signin", title: "C\u00f3mo iniciar sesi\u00f3n", slug: "signin" },
  { key: "verify", title: "Verificar cuenta", slug: "verify" },
  { key: "redeem", title: "Canjear promos", slug: "redeem" },
  { key: "benefits", title: "Beneficios", slug: "benefits" },
  { key: "points", title: "Sistema de puntos", slug: "points" },
  { key: "levels", title: "Beneficios por nivel", slug: "levels" },
];

const DEFAULT_RESOURCE_DEFS = [
  {
    key: "signin",
    title: "C\u00f3mo iniciar sesi\u00f3n",
    description: "Gu\u00eda para iniciar sesi\u00f3n en la app.",
    iconKey: "signin",
  },
  {
    key: "verify",
    title: "Verificar cuenta",
    description: "C\u00f3mo verificar tu identidad y activar beneficios.",
    iconKey: "verify",
  },
  {
    key: "redeem",
    title: "Canjear promos",
    description: "Descubre c\u00f3mo canjear ofertas y recompensas.",
    iconKey: "redeem",
  },
  {
    key: "points",
    title: "Sistema de puntos",
    description: "C\u00f3mo funcionan los puntos y c\u00f3mo acumularlos.",
    iconKey: "points",
  },
];

const CATEGORY_RESOURCE_DEFS = {
  signin: [
    {
      key: "signin-main",
      title: "C\u00f3mo iniciar sesi\u00f3n",
      description: "Gu\u00eda para iniciar sesi\u00f3n en la app.",
      iconKey: "signin",
    },
  ],
  verify: [
    {
      key: "verify-main",
      title: "Verificar cuenta",
      description: "C\u00f3mo verificar tu identidad y activar beneficios.",
      iconKey: "verify",
    },
  ],
  redeem: [
    {
      key: "redeem-main",
      title: "Canjear promos",
      description: "Descubre c\u00f3mo canjear ofertas y recompensas.",
      iconKey: "redeem",
    },
  ],
  benefits: [
    {
      key: "benefits-main",
      title: "Beneficios",
      description: "Conoce los beneficios disponibles seg\u00fan tu actividad.",
      iconKey: "redeem",
    },
  ],
  points: [
    {
      key: "points-main",
      title: "Sistema de puntos",
      description: "C\u00f3mo funcionan los puntos y c\u00f3mo acumularlos.",
      iconKey: "points",
    },
  ],
  levels: [
    {
      key: "levels-main",
      title: "Beneficios por nivel",
      description: "Descubre c\u00f3mo subir de nivel y desbloquear m\u00e1s ventajas.",
      iconKey: "points",
    },
  ],
};

function cloneItems(items) {
  return items.map((item) => ({ ...item }));
}

export function buildSidebarCategories(basePath = "/ayuda/es") {
  return SIDEBAR_CATEGORY_DEFS.map((category) => ({
    key: category.key,
    title: category.title,
    to: `${basePath}/categoria/${category.slug}`,
  }));
}

export function buildDefaultResources() {
  return cloneItems(DEFAULT_RESOURCE_DEFS);
}

export function buildLegalResources(basePath = "/ayuda/es") {
  return [
    {
      key: "terms",
      title: "T\u00e9rminos y Condiciones",
      description: "Consulta nuestras normas y reglas.",
      to: `${basePath}/articulo/terminos`,
      iconKey: "terms",
    },
    {
      key: "privacy",
      title: "Pol\u00edtica de Privacidad",
      description: "Lee c\u00f3mo protegemos tu privacidad.",
      to: `${basePath}/articulo/privacidad`,
      iconKey: "privacy",
    },
    {
      key: "delete",
      title: "Borrar mis datos",
      description: "Solicita la eliminaci\u00f3n de tu informaci\u00f3n.",
      to: `${basePath}/articulo/borrar-datos`,
      iconKey: "delete",
    },
  ];
}

export function buildCategoryResources(basePath = "/ayuda/es") {
  return {
    legal: buildLegalResources(basePath),
    signin: cloneItems(CATEGORY_RESOURCE_DEFS.signin),
    verify: cloneItems(CATEGORY_RESOURCE_DEFS.verify),
    redeem: cloneItems(CATEGORY_RESOURCE_DEFS.redeem),
    benefits: cloneItems(CATEGORY_RESOURCE_DEFS.benefits),
    points: cloneItems(CATEGORY_RESOURCE_DEFS.points),
    levels: cloneItems(CATEGORY_RESOURCE_DEFS.levels),
  };
}

export function resolveHelpCenterHeaderActions(actions = []) {
  return actions
    .filter((action) => !action.devOnly || IS_DEV)
    .map((action) => ({
      ...action,
      label: action.devOnly ? `${action.label} (Dev)` : action.label,
    }));
}
