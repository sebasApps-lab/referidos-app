import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const TEXT_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".md",
  ".txt",
  ".css",
  ".html",
  ".sql",
  ".yml",
  ".yaml",
  ".toml",
]);

const MOJIBAKE_PATTERN = /(�|Ã[\u0080-\u00BF]|Â[\u0080-\u00BF])/u;
const ALLOWED_LEGACY_FILES = new Set([
  "docs/referidos-system/support-macros-ops-cache.md",
  "apps/referidos-app/src/profile/shared/blocks/PasswordAccessCard.jsx",
  "apps/referidos-app/src/auth/hooks/useAuthActions.js",
  "apps/referidos-app/src/admin/support/AdminSupportCatalogPanel.jsx",
  "apps/referidos-app/src/admin/reportes/ReportesTable.jsx",
]);

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".turbo",
  "coverage",
]);

function listTextFiles(rootDir = ".") {
  const files = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const currentDir = stack.pop();
    if (!currentDir) continue;
    let entries = [];
    try {
      entries = readdirSync(currentDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.name.startsWith(".") && entry.name !== ".github") {
        if (entry.isDirectory()) continue;
      }
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) stack.push(fullPath);
        continue;
      }
      if (entry.name.startsWith(".tmp-eslint")) continue;
      if (shouldScan(fullPath)) files.push(fullPath);
    }
  }
  return files;
}

function shouldScan(filePath) {
  const extension = extname(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(extension);
}

function checkFile(filePath) {
  const normalizedPath = filePath.replaceAll("\\", "/").replace(/^\.\//u, "");
  if (ALLOWED_LEGACY_FILES.has(normalizedPath)) return null;
  let content = "";
  try {
    content = readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
  if (!MOJIBAKE_PATTERN.test(content)) return null;
  const match = content.match(MOJIBAKE_PATTERN);
  return {
    filePath,
    match: match?.[0] || "?",
  };
}

const offenders = [];
for (const filePath of listTextFiles(".")) {
  if (!shouldScan(filePath)) continue;
  const result = checkFile(filePath);
  if (result) offenders.push(result);
}

if (offenders.length > 0) {
  console.error("Se detectó texto con posible mojibake en archivos versionados:");
  for (const offender of offenders) {
    console.error(`- ${offender.filePath} (match: ${JSON.stringify(offender.match)})`);
  }
  process.exit(1);
}

console.log("OK: no se detectó mojibake en archivos versionados.");
