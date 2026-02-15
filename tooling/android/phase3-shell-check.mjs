import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function readText(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing file: ${relativePath}`);
  }
  return fs.readFileSync(absolutePath, "utf8");
}

function assertIncludes(content, needle, label) {
  if (!content.includes(needle)) {
    throw new Error(`[FAIL] ${label}: "${needle}" not found`);
  }
}

function main() {
  const roleTabs = readText("apps/referidos-android/src/navigation/RoleTabs.tsx");
  const appStore = readText("apps/referidos-android/src/shared/store/appStore.ts");
  const modalHost = readText("apps/referidos-android/src/shared/modals/ModalHost.tsx");
  const placeholder = readText("apps/referidos-android/src/shared/ui/FeaturePlaceholder.tsx");
  const modalStore = readText("apps/referidos-android/src/shared/store/modalStore.ts");

  assertIncludes(roleTabs, "lazy: false", "keep-alive");
  assertIncludes(roleTabs, "detachInactiveScreens={false}", "keep-alive");
  assertIncludes(roleTabs, 'backBehavior="history"', "tab history behavior");
  assertIncludes(roleTabs, "headerShown: false", "header visibility");
  assertIncludes(roleTabs, "setActiveTab(role, current.name)", "tab state persistence");

  assertIncludes(appStore, "clearSessionCache()", "cache reset hooks");
  assertIncludes(appStore, "useModalStore.getState().reset()", "modal reset hooks");

  assertIncludes(modalStore, 'kind: "confirm"', "confirm modal primitive");
  assertIncludes(modalStore, 'kind: "alert"', "warning/alert modal primitive");
  assertIncludes(modalStore, 'kind: "picker"', "picker modal primitive");
  assertIncludes(modalHost, "<Modal", "global modal host");

  assertIncludes(placeholder, "BlockSkeleton", "block-level skeleton placeholder");

  console.log("Phase 3 shell/navigation/modal checks: OK");
}

main();
