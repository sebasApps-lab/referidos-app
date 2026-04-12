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
      key: "terminos-condiciones-lista",
      title: "T\u00e9rminos y Condiciones",
      description: "Consulta nuestras normas y reglas.",
      to: `${basePath}/articulo/terminos-condiciones-lista`,
      iconKey: "terms",
    },
    {
      key: "politicas-privacidad-lista",
      title: "Pol\u00edtica de Privacidad",
      description: "Lee c\u00f3mo protegemos tu privacidad.",
      to: `${basePath}/articulo/politicas-privacidad-lista`,
      iconKey: "privacy",
    },
    {
      key: "borrar-correo-lista",
      title: "Borrar mi correo",
      description: "Solicita la eliminaci\u00f3n de tu informaci\u00f3n.",
      to: `${basePath}/articulo/borrar-correo-lista`,
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
