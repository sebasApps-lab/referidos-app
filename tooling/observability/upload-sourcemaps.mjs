import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { createClient } from "@supabase/supabase-js";

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_RELEASES = 10;
const UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const LINE_BREAK = /[\r\n\u2028\u2029]/;

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      out[key] = true;
      continue;
    }
    out[key] = next;
    i += 1;
  }
  return out;
}

function safeSegment(value) {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9._@+-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function readGitBuildId(root) {
  try {
    return execSync("git rev-parse --short HEAD", {
      cwd: root,
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf-8",
    }).trim();
  } catch {
    return "";
  }
}

async function collectMapFiles(baseDir, current = "") {
  const folder = path.join(baseDir, current);
  const entries = await fs.readdir(folder, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const rel = current ? path.join(current, entry.name) : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await collectMapFiles(baseDir, rel)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".map")) {
      files.push(rel);
    }
  }
  return files;
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function readTenantHints(env) {
  const id = (env.OBS_TENANT_ID || "").trim().toLowerCase();
  const name = env.OBS_TENANT_NAME || "";
  if (env.OBS_TENANT_ID && !UUID.test(id)) {
    throw new Error("OBS_TENANT_ID must be a UUID");
  }
  if (name && (!name.trim() || LINE_BREAK.test(name))) {
    throw new Error("OBS_TENANT_NAME must be a non-empty single-line exact tenant name");
  }
  if (!id && !name) {
    throw new Error("Set OBS_TENANT_ID or OBS_TENANT_NAME for the target Supabase project");
  }
  return { id, name };
}

async function resolveTenant(supabase, hints) {
  const query = supabase.from("tenants").select("id,name,status");
  const { data, error } = await (hints.id
    ? query.eq("id", hints.id)
    : query.eq("name", hints.name)
  ).maybeSingle();

  if (error) throw new Error("Tenant lookup did not return a single result");
  if (!data) throw new Error("Configured tenant was not found in the target Supabase project");

  const id = typeof data.id === "string" ? data.id.toLowerCase() : "";
  if (!UUID.test(id) || typeof data.name !== "string" || !data.name.trim() || LINE_BREAK.test(data.name)) {
    throw new Error("Tenant lookup returned an invalid identity");
  }
  if ((hints.id && hints.id !== id) || (hints.name && hints.name !== data.name)) {
    throw new Error("Configured tenant selectors do not match the resolved tenant");
  }
  if (data.status !== "active") throw new Error("Configured tenant is inactive");

  return { id, name: data.name };
}

function buildReleaseLocation({ tenant_id, app_id, app_version, build_id, env }) {
  const releaseKey = safeSegment(`${app_id}@${app_version}+${build_id}`);
  const releasePath = `tenants/${tenant_id}/apps/${safeSegment(app_id)}/envs/${safeSegment(env)}/releases/${releaseKey}`;
  return { releaseKey, releasePath, manifestPath: `${releasePath}/manifest.json` };
}

function mapObjectPath(releasePath, file) {
  // The Storage client appends the object path directly to its request URL.
  if (typeof file !== "string" || !file.endsWith(".map") || /[\\%?#]/.test(file) || LINE_BREAK.test(file)) return null;
  if (file.split("/").some((part) => !part || part === "." || part === "..")) return null;
  return `${releasePath}/maps/${file}`;
}

function sameRelease(row, selector) {
  return Object.entries(selector).every(([key, value]) => row?.[key] === value);
}

function hasUsableSourcesContent(mapJson) {
  if (!mapJson || typeof mapJson !== "object") return false;
  const sourcesContent = mapJson.sourcesContent;
  if (!Array.isArray(sourcesContent) || sourcesContent.length === 0) return false;
  return sourcesContent.some(
    (entry) => typeof entry === "string" && entry.trim().length > 0,
  );
}

async function downloadJson(supabase, bucket, storagePath) {
  const { data, error } = await supabase.storage.from(bucket).download(storagePath);
  if (error || !data) return null;
  const text = await data.text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function removeStoragePaths(supabase, bucket, paths) {
  for (const group of chunk(paths, 100)) {
    const { error } = await supabase.storage.from(bucket).remove(group);
    if (error) {
      throw new Error(`storage_remove_failed: ${error.message}`);
    }
  }
}

export async function uploadSourcemaps({
  argv = process.argv.slice(2),
  env = process.env,
  root = process.cwd(),
  createSupabase = createClient,
} = {}) {
  const args = parseArgs(argv);
  const app = args.app || args.appId;
  if (!app) {
    throw new Error("Missing --app <referidos-app|prelaunch>");
  }

  const tenantHints = readTenantHints(env);
  const appDir = path.join("apps", app);
  const appPath = path.join(root, appDir);
  const appPkgPath = path.join(appPath, "package.json");
  const appPkg = JSON.parse(await fs.readFile(appPkgPath, "utf-8"));

  const appId = env.APP_ID || env.VITE_APP_ID || app;
  const appVersion = env.APP_VERSION || appPkg.version || "0.0.0";
  const buildId =
    env.BUILD_ID ||
    env.VITE_BUILD_ID ||
    readGitBuildId(root) ||
    `build-${Date.now()}`;
  const appEnv = env.APP_ENV || env.MODE || env.NODE_ENV || "production";
  const bucket = env.OBS_SOURCEMAP_BUCKET || "obs-sourcemaps";

  const supabaseUrl = env.SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  const distDir = path.join(appPath, "dist");
  const maps = await collectMapFiles(distDir);
  if (!maps.length) {
    throw new Error(
      `No sourcemaps found in ${appDir}/dist. Ensure Vite build.sourcemap is enabled.`,
    );
  }

  const supabase = createSupabase(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const tenant = await resolveTenant(supabase, tenantHints);
  const releaseSelector = {
    tenant_id: tenant.id,
    app_id: appId,
    app_version: appVersion,
    build_id: buildId,
    env: appEnv,
  };
  const { releaseKey, releasePath, manifestPath } = buildReleaseLocation(releaseSelector);
  const { data: existingRelease, error: existingReleaseError } = await supabase
    .from("obs_releases")
    .select("id,meta")
    .match(releaseSelector)
    .maybeSingle();
  if (existingReleaseError) throw new Error("Could not read existing release metadata");

  const manifest = {
    release_key: releaseKey,
    tenant: tenant.name,
    ...releaseSelector,
    generated_at: new Date().toISOString(),
    maps: [],
  };

  for (const relPath of maps) {
    const relPosix = toPosix(relPath);
    const generatedFile = relPosix.replace(/\.map$/, "");
    const mapStoragePath = mapObjectPath(releasePath, relPosix);
    if (!mapStoragePath) throw new Error(`invalid_sourcemap_path(${relPosix})`);
    const fullPath = path.join(distDir, relPath);
    const content = await fs.readFile(fullPath);
    let parsedMap = null;
    try {
      parsedMap = JSON.parse(content.toString("utf-8"));
    } catch {
      throw new Error(`invalid_sourcemap_json(${relPosix})`);
    }
    if (!hasUsableSourcesContent(parsedMap)) {
      throw new Error(
        `sourcemap_missing_sourcesContent(${relPosix}). Rebuild with sourcesContent enabled and retry upload.`,
      );
    }

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(mapStoragePath, content, {
        upsert: true,
        contentType: "application/json",
      });
    if (uploadError) {
      throw new Error(`upload_failed(${relPosix}): ${uploadError.message}`);
    }

    manifest.maps.push({
      generated_file: generatedFile,
      map_file: relPosix,
      map_path: mapStoragePath,
      has_sources_content: true,
    });
  }

  const { error: manifestUploadError } = await supabase.storage
    .from(bucket)
    .upload(manifestPath, JSON.stringify(manifest, null, 2), {
      upsert: true,
      contentType: "application/json",
    });
  if (manifestUploadError) {
    throw new Error(`manifest_upload_failed: ${manifestUploadError.message}`);
  }

  const existingMeta = (existingRelease?.meta && typeof existingRelease.meta === "object")
    ? existingRelease.meta
    : {};

  const mergedMeta = {
    ...existingMeta,
    sourcemaps: {
      bucket,
      tenant_id: tenant.id,
      release_key: releaseKey,
      release_path: releasePath,
      manifest_path: manifestPath,
      file_count: manifest.maps.length,
      uploaded_at: new Date().toISOString(),
      available: true,
    },
  };

  const { error: releaseUpsertError } = await supabase
    .from("obs_releases")
    .upsert(
      {
        ...releaseSelector,
        meta: mergedMeta,
      },
      { onConflict: "tenant_id,app_id,app_version,build_id,env" },
    );
  if (releaseUpsertError) {
    throw new Error(`release_upsert_failed: ${releaseUpsertError.message}`);
  }

  const { data: releases, error: releasesError } = await supabase
    .from("obs_releases")
    .select("id,tenant_id,app_id,app_version,build_id,env,created_at,meta")
    .eq("tenant_id", tenant.id)
    .eq("app_id", appId)
    .order("created_at", { ascending: false });
  if (releasesError) {
    throw new Error(`releases_query_failed: ${releasesError.message}`);
  }

  const now = Date.now();
  const availableReleases = (releases || []).filter((release) =>
    release.tenant_id === tenant.id && release.app_id === appId && release.meta?.sourcemaps?.available === true,
  );
  let prunedReleases = 0;
  for (const [index, release] of availableReleases.entries()) {
    const createdMs = Date.parse(release.created_at || "");
    if (!Number.isFinite(createdMs) || sameRelease(release, releaseSelector)) continue;
    if (index < MAX_RELEASES && now - createdMs <= NINETY_DAYS_MS) continue;

    const releaseMeta = release.meta;
    const sourcemaps = releaseMeta.sourcemaps;
    // Legacy name-keyed paths stay readable, but ownership is not provable for cleanup.
    if (sourcemaps.tenant_id !== tenant.id || sourcemaps.bucket !== bucket) continue;
    const oldLocation = buildReleaseLocation(release);
    if (
      oldLocation.releasePath === releasePath ||
      sourcemaps.release_key !== oldLocation.releaseKey ||
      sourcemaps.release_path !== oldLocation.releasePath ||
      sourcemaps.manifest_path !== oldLocation.manifestPath
    ) continue;

    const oldManifest = await downloadJson(supabase, bucket, oldLocation.manifestPath);
    const oldSelector = {
      tenant_id: tenant.id,
      app_id: appId,
      app_version: release.app_version,
      build_id: release.build_id,
      env: release.env,
    };
    if (
      !sameRelease(oldManifest, oldSelector) ||
      oldManifest.release_key !== oldLocation.releaseKey ||
      !Array.isArray(oldManifest.maps) ||
      oldManifest.maps.length === 0 ||
      oldManifest.maps.length !== sourcemaps.file_count
    ) continue;

    const mapPaths = oldManifest.maps.map((entry) => {
      const expectedPath = mapObjectPath(oldLocation.releasePath, entry?.map_file);
      return expectedPath === entry?.map_path ? expectedPath : null;
    });
    if (mapPaths.some((entry) => !entry) || new Set(mapPaths).size !== mapPaths.length) continue;

    await removeStoragePaths(supabase, bucket, [...mapPaths, oldLocation.manifestPath]);

    const updatedMeta = {
      ...releaseMeta,
      sourcemaps: {
        ...sourcemaps,
        available: false,
        pruned_at: new Date().toISOString(),
      },
    };
    const { error: updateError } = await supabase
      .from("obs_releases")
      .update({ meta: updatedMeta })
      .eq("id", release.id)
      .match(oldSelector);
    if (updateError) {
      throw new Error(`release_meta_prune_failed(${release.id}): ${updateError.message}`);
    }
    prunedReleases += 1;
  }

  if (env.GITHUB_OUTPUT) {
    await fs.appendFile(env.GITHUB_OUTPUT, `tenant_name=${tenant.name}\ntenant_id=${tenant.id}\n`, "utf-8");
  }

  return {
    ok: true,
    ...releaseSelector,
    tenant: tenant.name,
    release_key: releaseKey,
    uploaded_maps: manifest.maps.length,
    manifest_path: manifestPath,
    pruned_releases: prunedReleases,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  uploadSourcemaps().then((result) => {
    console.log(JSON.stringify(result, null, 2));
  }).catch((error) => {
    console.error(error?.message || error);
    process.exitCode = 1;
  });
}
