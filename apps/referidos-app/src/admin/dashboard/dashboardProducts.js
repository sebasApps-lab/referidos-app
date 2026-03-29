export const DASHBOARD_PRODUCTS = [
  {
    key: "prelaunch_web",
    label: "Prelaunch",
    subtitle: "Landing y funnel de pre-registro",
    analyticsReady: true,
  },
  {
    key: "referidos_app",
    label: "Referidos App",
    subtitle: "App principal publicada en produccion",
    analyticsReady: false,
  },
];

export function normalizeDashboardProductKey(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "referidos_app") return "referidos_app";
  return "prelaunch_web";
}

export function getDashboardProductMeta(productKey) {
  return (
    DASHBOARD_PRODUCTS.find((item) => item.key === normalizeDashboardProductKey(productKey)) ||
    DASHBOARD_PRODUCTS[0]
  );
}

