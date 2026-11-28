const TARGETS = {
  staging: {
    runtimeRef: "iegjfeaadayfvqockwov",
    referidos_app: "referidosapp-staging",
    prelaunch_web: "testing-goplip",
  },
  prod: {
    runtimeRef: "ztcsrfwvjgqnmhnlpeye",
    referidos_app: "referidosapp",
    prelaunch_web: "join-goplip",
  },
};
const UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}(?![\s\S])/i;
const PROJECT_REF = /^[a-z0-9]{20}(?![\s\S])/;
const NETLIFY_ID = /^[a-z0-9-]{1,80}(?![\s\S])/i;
const NETLIFY_API = "https://api.netlify.com/api/v1";

function runtimeTarget(productKey, envKey) {
  const target = Object.hasOwn(TARGETS, envKey) ? TARGETS[envKey] : null;
  if (!target || !["referidos_app", "prelaunch_web"].includes(productKey)) {
    throw new Error("Producto o entorno sin destino de publicación autorizado.");
  }
  return target;
}

function assertSupabaseUrl(url, projectRef) {
  const expectedUrl = "https://" + projectRef + ".supabase.co";
  if (!PROJECT_REF.test(projectRef) || (url !== expectedUrl && url !== expectedUrl + "/")) {
    throw new Error("Supabase no coincide con el proyecto autorizado para este entorno.");
  }
}

export function validateSupabaseDestinations({ productKey, envKey, runtimeUrl, runtimeKey, obsUrl, obsProjectRef }) {
  const { runtimeRef } = runtimeTarget(productKey, envKey);
  assertSupabaseUrl(runtimeUrl, runtimeRef);
  assertSupabaseUrl(obsUrl, obsProjectRef || runtimeRef);

  const key = runtimeKey ?? "";
  if (/^sb_publishable_[a-zA-Z0-9_-]+(?![\s\S])/.test(key)) return;
  if (/^[\w-]+\.[\w-]+\.[\w-]+(?![\s\S])/.test(key)) {
    let claims;
    try {
      claims = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString("utf8"));
    } catch {
      // Report only the validation error below.
    }
    if (claims?.role === "anon" && claims.ref === runtimeRef) return;
  }
  throw new Error("La clave de runtime debe ser pública y corresponder al proyecto autorizado.");
}

async function readSite(siteId, token, fetchImpl) {
  if (!UUID.test(siteId ?? "") || typeof token !== "string" || !token.trim()) {
    throw new Error("Falta el Project ID verificado o la credencial de lectura de Netlify.");
  }
  let response;
  try {
    response = await fetchImpl(NETLIFY_API + "/sites/" + siteId, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return { retry: true };
  }
  if (response.status === 429 || response.status >= 500) return { retry: true };
  if (!response.ok) throw new Error("Netlify rechazó la consulta de destino. HTTP " + response.status);
  return { site: await response.json().catch(() => null) };
}

export async function verifyNetlifyDestination({
  productKey, envKey, siteId, token, expectedDeployId, fetchImpl = fetch,
  attempts = 4, wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
}) {
  const expectedName = runtimeTarget(productKey, envKey)[productKey];
  if (expectedDeployId != null && !NETLIFY_ID.test(expectedDeployId)) {
    throw new Error("El identificador de la publicación es inválido.");
  }
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 6) {
    throw new Error("Límite inválido de consultas a Netlify.");
  }
  for (let attempt = 0; attempt < attempts; attempt++) {
    const { site, retry } = await readSite(siteId, token, fetchImpl);
    if (!retry) {
      if (site?.id !== siteId || site.name !== expectedName) {
        throw new Error("El proyecto de Netlify no coincide con el producto y entorno aprobados.");
      }
      const active = site.published_deploy;
      if (expectedDeployId == null) return { siteId, siteName: expectedName };
      const publishedType = active?.draft === false || (active && !Object.hasOwn(active, "draft") &&
        active.context === "production" && typeof active.published_at === "string" &&
        Number.isFinite(Date.parse(active.published_at)));
      if (active?.id === expectedDeployId && active.site_id === siteId &&
          active.state === "ready" && publishedType) {
        return { siteId, siteName: expectedName, deploymentId: expectedDeployId };
      }
    }
    if (attempt + 1 < attempts) await wait(2000);
  }
  throw new Error("Netlify no confirmó el despliegue activo exacto en el sitio esperado.");
}

export function readNetlifyDeployId(output) {
  const values = [output?.deploy_id, output?.deployId, output?.id].filter((value) => value != null && value !== "");
  if (!values.length || !values.every((value) => typeof value === "string" && NETLIFY_ID.test(value) && value === values[0])) {
    throw new Error("La salida de Netlify no identifica una publicación única.");
  }
  return values[0];
}
