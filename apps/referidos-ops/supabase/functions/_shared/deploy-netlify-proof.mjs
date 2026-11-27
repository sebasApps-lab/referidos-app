const API = "https://api.netlify.com/api/v1";
const SITE_ID = /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i;
const DEPLOY_ID = /^[A-Za-z0-9_-]{1,128}$/;
const SITE_NAME = /^[a-z0-9][a-z0-9-]{0,62}$/;
const API_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
const PAGE_SIZE = 20;
const MAX_PAGES = 2;

function failure(reason) {
  return { status: "not_confirmed", reason, evidence: null };
}

function matches(value, pattern) {
  return typeof value === "string" && value === value.trim() && pattern.test(value);
}

async function get(path, token, fetchImpl) {
  const response = await fetchImpl(`${API}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    redirect: "error",
    signal: AbortSignal.timeout(5000),
  });
  return response.ok ? await response.json() : null;
}

export function netlifyDeployTitle(binding, executionId) {
  return `versioning:${binding.product_key}:${binding.env_key}:${binding.semver}:${binding.source_commit_sha}:${executionId}:${binding.github_run_id}`;
}

/** Observe an exact deployment and the current publication. Discovery never creates a deploy. */
export async function readNetlifyPublication({ siteId, siteName, title, reportedId, token, fetchImpl = fetch }) {
  if (!matches(siteId, SITE_ID) || !matches(siteName, SITE_NAME) || typeof title !== "string" || !title.startsWith("versioning:") ||
      (reportedId != null && !matches(reportedId, DEPLOY_ID)) || !token) return failure("netlify_configuration_unverified");
  const sitePath = `/sites/${siteId}`;
  try {
    const site = await get(sitePath, token, fetchImpl);
    if (site?.id !== siteId || site.name !== siteName) return failure("netlify_site_unverified");
    const live = site.published_deploy;
    let id = reportedId;
    if (!id && live?.title === title) id = live.id;
    if (!id) {
      const matches = new Set();
      for (let page = 1; page <= MAX_PAGES; page += 1) {
        const options = `production=true&per_page=${PAGE_SIZE}&page=${page}`;
        const deploys = await get(`${sitePath}/deploys?${options}`, token, fetchImpl);
        if (!Array.isArray(deploys)) return failure("netlify_discovery_unverified");
        for (const candidate of deploys) {
          if (candidate?.title === title && candidate.site_id === siteId) matches.add(candidate.id);
        }
        if (deploys.length < PAGE_SIZE) break;
      }
      if (matches.size !== 1) return failure(matches.size ? "netlify_deploy_ambiguous" : "netlify_deploy_not_visible");
      [id] = matches;
    }
    if (!matches(id, DEPLOY_ID)) return failure("netlify_deploy_identity_unverified");
    const deploy = await get(`${sitePath}/deploys/${id}`, token, fetchImpl);
    if (deploy?.id !== id || deploy.site_id !== siteId || deploy.title !== title) {
      return failure("netlify_deploy_identity_unverified");
    }
    if (deploy.state !== "ready" || deploy.draft !== false || (deploy.context != null && deploy.context !== "production") ||
        !matches(deploy.published_at, API_TIMESTAMP) || !Number.isFinite(Date.parse(deploy.published_at))) {
      return failure("netlify_publication_unverified");
    }
    // Read again after fetching the exact deploy. A later publication must not be replaced as the OPS head.
    const current = await get(sitePath, token, fetchImpl);
    if (current?.id !== siteId || current.name !== siteName || !matches(current.published_deploy?.id, DEPLOY_ID)) {
      return failure("netlify_current_publication_unverified");
    }
    const liveId = current.published_deploy.id;
    const reason = liveId === id ? null : "netlify_deploy_superseded";
    return {
      status: "published",
      reason,
      evidence: {
        status: "published",
        netlify_site_id: siteId,
        netlify_deploy_id: id,
        netlify_deploy_title: title,
        netlify_current_deploy_id: liveId,
        published_at: deploy.published_at,
        observed_at: new Date().toISOString(),
        ...(reason ? { reconciliation_block: reason } : {}),
      },
    };
  } catch {
    return failure("netlify_read_failed");
  }
}
