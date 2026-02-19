import { createAppAuth } from "npm:@octokit/auth-app@7.0.0";

function asString(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function unwrapQuotes(input: string) {
  const value = asString(input);
  if (!value) return "";
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function tryDecodeBase64(value: string) {
  try {
    const decoded = atob(value);
    return asString(decoded);
  } catch {
    return "";
  }
}

function normalizeGithubAppPrivateKey(input: string) {
  let key = unwrapQuotes(input);
  if (!key) return "";

  // Common case when secret was pasted with escaped newlines.
  key = key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();

  // Some setups store private key as base64 text.
  if (!key.includes("BEGIN") && /^[A-Za-z0-9+/=\s]+$/.test(key)) {
    const decoded = tryDecodeBase64(key.replace(/\s+/g, ""));
    if (decoded.includes("BEGIN")) {
      key = decoded.replace(/\r\n/g, "\n").trim();
    }
  }

  if (key && !key.endsWith("\n")) {
    key = `${key}\n`;
  }
  return key;
}

export function resolveGithubOwnerRepo(ownerInput: string, repoInput: string) {
  const ownerRaw = asString(ownerInput);
  const repoRaw = asString(repoInput);

  if (!repoRaw) {
    return { owner: ownerRaw, repo: "" };
  }

  try {
    const parsed = new URL(repoRaw);
    if (parsed.hostname.includes("github.com")) {
      const parts = parsed.pathname
        .split("/")
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts.length >= 2) {
        return {
          owner: asString(parts[0]),
          repo: asString(parts[1]).replace(/\.git$/i, ""),
        };
      }
    }
  } catch {
    // Non-URL format.
  }

  const normalizedRepo = repoRaw.replace(/^\/+|\/+$/g, "").replace(/\.git$/i, "");
  const slashParts = normalizedRepo
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (slashParts.length >= 2) {
    return {
      owner: asString(slashParts[0]),
      repo: asString(slashParts[1]),
    };
  }

  return { owner: ownerRaw, repo: normalizedRepo };
}

type GithubAuthConfig = {
  owner: string;
  repo: string;
  token: string;
  authMode: "github_app" | "pat";
};

type GithubAuthError = {
  error: string;
  detail: string;
};

async function getGitHubAppInstallationToken({
  appId,
  privateKey,
  installationId,
}: {
  appId: string;
  privateKey: string;
  installationId: string;
}) {
  const appAuth = createAppAuth({
    appId,
    privateKey,
    installationId: Number(installationId),
  });

  const installationAuth = await appAuth({ type: "installation" });
  return asString(installationAuth?.token);
}

export async function getGithubAuthConfig(): Promise<
  | { ok: true; data: GithubAuthConfig }
  | { ok: false; data: GithubAuthError }
> {
  const repoConfig = resolveGithubOwnerRepo(
    asString(Deno.env.get("GITHUB_DEPLOY_OWNER")),
    asString(Deno.env.get("GITHUB_DEPLOY_REPO"))
  );

  const owner = repoConfig.owner;
  const repo = repoConfig.repo;
  if (!owner || !repo) {
    return {
      ok: false,
      data: {
        error: "missing_github_repo_env",
        detail:
          "Missing GITHUB_DEPLOY_OWNER/GITHUB_DEPLOY_REPO. GITHUB_DEPLOY_REPO accepts: repo, owner/repo, or full github URL.",
      },
    };
  }

  const appId = asString(Deno.env.get("GITHUB_APP_ID"));
  const appPrivateKey = normalizeGithubAppPrivateKey(
    asString(Deno.env.get("GITHUB_APP_PRIVATE_KEY"))
  );
  const appInstallationId = asString(Deno.env.get("GITHUB_APP_INSTALLATION_ID"));
  const patToken = asString(Deno.env.get("GITHUB_DEPLOY_TOKEN"));

  if (appId && appPrivateKey && appInstallationId) {
    try {
      const appToken = await getGitHubAppInstallationToken({
        appId,
        privateKey: appPrivateKey,
        installationId: appInstallationId,
      });

      if (!appToken) {
        return {
          ok: false,
          data: {
            error: "github_app_token_empty",
            detail: "No se pudo generar installation token con GitHub App.",
          },
        };
      }

      return {
        ok: true,
        data: {
          owner,
          repo,
          token: appToken,
          authMode: "github_app",
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "GitHub App auth failed";
      if (patToken) {
        return {
          ok: true,
          data: {
            owner,
            repo,
            token: patToken,
            authMode: "pat",
          },
        };
      }
      return {
        ok: false,
        data: {
          error: "github_app_auth_failed",
          detail: `${message}. Verifica formato PEM en GITHUB_APP_PRIVATE_KEY.`,
        },
      };
    }
  }

  if (patToken) {
    return {
      ok: true,
      data: {
        owner,
        repo,
        token: patToken,
        authMode: "pat",
      },
    };
  }

  return {
    ok: false,
    data: {
      error: "missing_github_auth_env",
      detail:
        "Missing github auth env. Preferred: GITHUB_APP_ID/GITHUB_APP_PRIVATE_KEY/GITHUB_APP_INSTALLATION_ID. Fallback: GITHUB_DEPLOY_TOKEN.",
    },
  };
}
