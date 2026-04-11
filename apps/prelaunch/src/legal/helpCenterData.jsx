const IS_DEV = import.meta.env.DEV;

const SIDEBAR_CATEGORY_DEFS = [
  { key: "legal", title: "Legal", slug: "legal" },
];

export function buildSidebarCategories(basePath = "/ayuda/es") {
  return SIDEBAR_CATEGORY_DEFS.map((category) => ({
    key: category.key,
    title: category.title,
    to: `${basePath}/categoria/${category.slug}`,
  }));
}

export function buildDefaultResources() {
  return buildLegalResources();
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
