const runtimeTargets = {
  dev: { branch: "dev", supabase: "referidos-app-dev", projectRef: "btvrtxdizqsqrzdsgvsj" },
  staging: { branch: "staging", supabase: "referidos-app-staging", projectRef: "iegjfeaadayfvqockwov" },
  prod: { branch: "main", supabase: "referidos-app", projectRef: "ztcsrfwvjgqnmhnlpeye" },
};

const webTargets = {
  referidos_app: { staging: "referidosapp-staging", prod: "referidosapp" },
  prelaunch_web: { staging: "testing-goplip", prod: "join-goplip" },
};

export const versioningOpsTarget = "referidos-ops";

export function getVersioningTarget(productKey, envKey) {
  const runtime = runtimeTargets[envKey];
  if (!runtime) return null;
  return { ...runtime, netlify: webTargets[productKey]?.[envKey] || "" };
}

export function identifyVersioningRuntime(supabaseUrl) {
  try {
    const { hostname } = new URL(supabaseUrl);
    return Object.values(runtimeTargets).find(({ projectRef }) => hostname === `${projectRef}.supabase.co`)?.supabase || hostname;
  } catch {
    return "Supabase sin identificar";
  }
}
