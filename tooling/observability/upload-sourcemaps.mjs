import fs from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";

const ROOT = process.cwd();
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_RELEASES = 10;

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

function readGitBuildId() {
  try {
    return execSync("git rev-parse --short HEAD", {
      cwd: ROOT,
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

function normalizeTenantLabel(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
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

async function resolveTenant({
  supabase,
  tenantIdHint,
  tenantNameHint,
}) {
  const tenantId = String(tenantIdHint || "").trim();
  const tenantName = String(tenantNameHint || "").trim();

  if (tenantId) {
    const { data: byId, error: byIdError } = await supabase
      .from("tenants")
      .select("id,name")
      .eq("id", tenantId)
      .limit(1)
      .maybeSingle();
    if (!byIdError && byId?.id) return byId;
    throw new Error(`Could not resolve tenant id ${tenantId}`);
  }

  if (tenantName) {
    const { data: byName, error: byNameError } = await supabase
      .from("tenants")
      .select("id,name")
      .ilike("name", tenantName)
      .limit(1)
      .maybeSingle();
    if (!byNameError && byName?.id) return byName;
  }

  const { data: allTenants, error: allTenantsError } = await supabase
    .from("tenants")
    .select("id,name")
    .order("created_at", { ascending: true })
    .limit(50);

  if (allTenantsError || !Array.isArray(allTenants) || allTenants.length === 0) {
    throw new Error(
      `Could not resolve tenant ${tenantName || tenantId || "(empty)"}`
    );
  }

  if (tenantName) {
    const wanted = normalizeTenantLabel(tenantName);
    const normalizedMatches = allTenants.filter(
      (tenant) => normalizeTenantLabel(tenant.name) === wanted
    );
    if (normalizedMatches.length === 1) {
      return normalizedMatches[0];
    }
  }

  if (allTenants.length === 1) {
    return allTenants[0];
  }

  const labels = allTenants
    .map((tenant) => `${tenant.name} (${tenant.id})`)
    .join(", ");
  throw new Error(
    `Could not resolve tenant ${tenantName || tenantId || "(empty)"}; available tenants: ${labels}`
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const app = args.app || args.appId;
  if (!app) {
    throw new Error("Missing --app <referidos-app|prelaunch>");
  }

  const appDir = path.join("apps", app);
  const appPath = path.join(ROOT, appDir);
  const appPkgPath = path.join(appPath, "package.json");
  const appPkg = JSON.parse(await fs.readFile(appPkgPath, "utf-8"));

  const appId = process.env.APP_ID || process.env.VITE_APP_ID || app;
  const appVersion = process.env.APP_VERSION || appPkg.version || "0.0.0";
  const buildId =
    process.env.BUILD_ID ||
    process.env.VITE_BUILD_ID ||
    readGitBuildId() ||
    `build-${Date.now()}`;
  const appEnv =
    process.env.APP_ENV ||
    process.env.MODE ||
    process.env.NODE_ENV ||
    "production";
  const tenantIdHint = process.env.OBS_TENANT_ID || "";
  const tenantNameHint =
    process.env.OBS_TENANT_NAME ||
    process.env.VITE_DEFAULT_TENANT_ID ||
    "ReferidosAPP";
  const bucket = process.env.OBS_SOURCEMAP_BUCKET || "obs-sourcemaps";

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
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

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const tenant = await resolveTenant({
    supabase,
    tenantIdHint,
    tenantNameHint,
  });
  if (!tenant?.id) {
    throw new Error(
      `Could not resolve tenant ${tenantNameHint || tenantIdHint || "(empty)"}`
    );
  }

  const releaseKey = safeSegment(`${appId}@${appVersion}+${buildId}`);
  const releasePath = `tenants/${safeSegment(tenant.name)}/apps/${safeSegment(appId)}/releases/${releaseKey}`;
  const manifestPath = `${releasePath}/manifest.json`;

  const manifest = {
    release_key: releaseKey,
    tenant: tenant.name,
    app_id: appId,
    app_version: appVersion,
    build_id: buildId,
    env: appEnv,
    generated_at: new Date().toISOString(),
    maps: [],
  };

  for (const relPath of maps) {
    const relPosix = toPosix(relPath);
    const generatedFile = relPosix.replace(/\.map$/, "");
    const mapStoragePath = `${releasePath}/maps/${relPosix}`;
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

  const releaseSelector = {
    tenant_id: tenant.id,
    app_id: appId,
    app_version: appVersion,
    build_id: buildId,
    env: appEnv,
  };

  const { data: existingRelease } = await supabase
    .from("obs_releases")
    .select("id,meta")
    .match(releaseSelector)
    .limit(1)
    .maybeSingle();

  const existingMeta = (existingRelease?.meta && typeof existingRelease.meta === "object")
    ? existingRelease.meta
    : {};

  const mergedMeta = {
    ...existingMeta,
    sourcemaps: {
      bucket,
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
    .select("id,created_at,meta")
    .eq("tenant_id", tenant.id)
    .eq("app_id", appId)
    .order("created_at", { ascending: false });
  if (releasesError) {
    throw new Error(`releases_query_failed: ${releasesError.message}`);
  }

  const now = Date.now();
  const pruneCandidates = (releases || []).filter((release, idx) => {
    const createdMs = Date.parse(release.created_at || "");
    const oldByAge = Number.isFinite(createdMs) ? now - createdMs > NINETY_DAYS_MS : true;
    const oldByCount = idx >= MAX_RELEASES;
    return oldByAge || oldByCount;
  });

  for (const release of pruneCandidates) {
    const releaseMeta = (release.meta && typeof release.meta === "object") ? release.meta : {};
    const sourcemaps = (releaseMeta.sourcemaps && typeof releaseMeta.sourcemaps === "object")
      ? releaseMeta.sourcemaps
      : null;
    const sourceBucket = sourcemaps?.bucket || bucket;
    const oldManifestPath = sourcemaps?.manifest_path;
    const oldReleasePath = sourcemaps?.release_path;
    const available = Boolean(sourcemaps?.available);
    if (!available || !oldManifestPath || !oldReleasePath) continue;

    const oldManifest = await downloadJson(supabase, sourceBucket, oldManifestPath);
    const paths = new Set([oldManifestPath]);
    if (oldManifest && Array.isArray(oldManifest.maps)) {
      oldManifest.maps.forEach((entry) => {
        if (entry?.map_path) paths.add(entry.map_path);
      });
    }

    if (paths.size) {
      await removeStoragePaths(supabase, sourceBucket, [...paths]);
    }

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
      .eq("id", release.id);
    if (updateError) {
      throw new Error(`release_meta_prune_failed(${release.id}): ${updateError.message}`);
    }
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        app_id: appId,
        app_version: appVersion,
        build_id: buildId,
        env: appEnv,
        tenant: tenant.name,
        release_key: releaseKey,
        uploaded_maps: manifest.maps.length,
        manifest_path: manifestPath,
        pruned_releases: pruneCandidates.length,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error?.message || error);
  process.exit(1);
});
