const importEnv = import.meta.env || {};
const browserWindow = typeof window !== "undefined" ? window : null;
const runtimeWindowConfig = browserWindow?.__REFERIDOS_RUNTIME_CONFIG__ || {};

const asString = (value, fallback = "") => {
  const text = String(value ?? "").trim();
  return text || fallback;
};

const mode = asString(importEnv.MODE, "development");
const appEnv = asString(runtimeWindowConfig.appEnv, asString(importEnv.VITE_ENV, mode));
const appId = asString(runtimeWindowConfig.appId, asString(importEnv.VITE_APP_ID, "referidos-app"));
const appVersion = asString(
  runtimeWindowConfig.appVersion,
  asString(
    importEnv.VITE_APP_VERSION ||
      importEnv.VITE_VERSION_LABEL ||
      importEnv.VITE_RELEASE ||
      importEnv.VITE_COMMIT_SHA,
    "dev"
  )
);
const buildId = asString(
  runtimeWindowConfig.buildId,
  asString(
    runtimeWindowConfig.buildNumber ||
      importEnv.VITE_BUILD_NUMBER ||
      importEnv.VITE_BUILD_ID ||
      importEnv.VITE_SOURCE_COMMIT_SHA ||
      importEnv.VITE_COMMIT_SHA
  )
);
const buildNumber = asString(
  runtimeWindowConfig.buildNumber,
  asString(importEnv.VITE_BUILD_NUMBER || importEnv.VITE_BUILD_ID)
);
const releaseId = asString(
  runtimeWindowConfig.releaseId,
  asString(importEnv.VITE_VERSION_RELEASE_ID || importEnv.VITE_RELEASE_ID)
);
const artifactId = asString(
  runtimeWindowConfig.artifactId,
  asString(importEnv.VITE_VERSION_ARTIFACT_ID || importEnv.VITE_ARTIFACT_ID)
);
const releaseChannel = asString(
  runtimeWindowConfig.releaseChannel,
  asString(importEnv.VITE_RELEASE_CHANNEL || appEnv)
);
const sourceCommitSha = asString(
  runtimeWindowConfig.sourceCommitSha,
  asString(importEnv.VITE_SOURCE_COMMIT_SHA || importEnv.VITE_COMMIT_SHA)
);
const defaultTenantId = asString(
  runtimeWindowConfig.defaultTenantId,
  asString(importEnv.VITE_DEFAULT_TENANT_ID, "ReferidosAPP")
);
const supabaseUrl = asString(runtimeWindowConfig.supabaseUrl, asString(importEnv.VITE_SUPABASE_URL));
const supabaseAnonKey = asString(
  runtimeWindowConfig.supabaseAnonKey,
  asString(importEnv.VITE_SUPABASE_ANON_KEY)
);
const redirectFromOrigin = browserWindow ? `${browserWindow.location.origin}/auth` : "";
const authRedirectUrl = asString(
  runtimeWindowConfig.authRedirectUrl,
  asString(redirectFromOrigin, asString(importEnv.VITE_AUTH_REDIRECT_URL))
);
const googleClientId = asString(
  runtimeWindowConfig.googleClientId,
  asString(importEnv.VITE_GOOGLE_CLIENT_ID)
);
const googleOneTapClientId = asString(
  runtimeWindowConfig.googleOneTapClientId,
  asString(importEnv.VITE_GOOGLE_ONE_TAP_CLIENT_ID, googleClientId)
);
const mapTilerKey = asString(runtimeWindowConfig.mapTilerKey, asString(importEnv.VITE_MAPTILER_KEY));

export const runtimeConfig = Object.freeze({
  appEnv,
  appId,
  appVersion,
  buildId,
  buildNumber,
  releaseId,
  artifactId,
  releaseChannel,
  sourceCommitSha,
  defaultTenantId,
  supabaseUrl,
  supabaseAnonKey,
  authRedirectUrl,
  googleClientId,
  googleOneTapClientId,
  mapTilerKey,
  mode,
  isProd: appEnv === "prod" || appEnv === "production",
});

export function getRuntimeConfig() {
  return runtimeConfig;
}
