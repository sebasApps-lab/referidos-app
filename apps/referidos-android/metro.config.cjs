const path = require("node:path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
const rootNodeModules = path.resolve(workspaceRoot, "node_modules");
const appNodeModules = path.resolve(projectRoot, "node_modules");

const resolvePreferredModulePath = (moduleName) => {
  const appPath = path.resolve(appNodeModules, moduleName);
  const rootPath = path.resolve(rootNodeModules, moduleName);
  return {
    selected: require("node:fs").existsSync(appPath) ? appPath : rootPath,
    appPath,
    rootPath,
  };
};

const escapeRegex = (value) => value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

const pathRegex = (absolutePath) => {
  // Keep slash-only regex so Metro path matching stays deterministic on Windows.
  const normalized = absolutePath.replace(/\\/g, "/");
  const body = escapeRegex(normalized);
  return new RegExp(`^${body}(?:\\/.*)?$`);
};

const reactPaths = resolvePreferredModulePath("react");
const reactNativePaths = resolvePreferredModulePath("react-native");
const safeAreaPaths = resolvePreferredModulePath("react-native-safe-area-context");
const gesturePaths = resolvePreferredModulePath("react-native-gesture-handler");
const screensPaths = resolvePreferredModulePath("react-native-screens");
const navNativePaths = resolvePreferredModulePath("@react-navigation/native");
const navElementsPaths = resolvePreferredModulePath("@react-navigation/elements");
const navCorePaths = resolvePreferredModulePath("@react-navigation/core");
const navRoutersPaths = resolvePreferredModulePath("@react-navigation/routers");

const duplicateBlockList = [];
for (const pair of [
  reactPaths,
  reactNativePaths,
  safeAreaPaths,
  gesturePaths,
  screensPaths,
  navNativePaths,
  navElementsPaths,
  navCorePaths,
  navRoutersPaths,
]) {
  if (pair.selected === pair.appPath && pair.rootPath !== pair.appPath) {
    duplicateBlockList.push(pathRegex(pair.rootPath));
  }
  if (pair.selected === pair.rootPath && pair.appPath !== pair.rootPath) {
    duplicateBlockList.push(pathRegex(pair.appPath));
  }
}

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      appNodeModules,
      rootNodeModules,
    ],
    // Monorepo guardrail: always resolve React/RN from this app to avoid
    // version drift with workspace-root hoisted packages.
    extraNodeModules: {
      react: reactPaths.selected,
      "react/jsx-runtime": path.resolve(reactPaths.selected, "jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve(reactPaths.selected, "jsx-dev-runtime.js"),
      "react-native": reactNativePaths.selected,
      // Safe area must come from a single copy, otherwise Android crashes with:
      // "Tried to register two views with the same name RNCSafeAreaView".
      "react-native-safe-area-context": safeAreaPaths.selected,
      // Keep native module resolution aligned with Android autolinking sources.
      "react-native-gesture-handler": gesturePaths.selected,
      "react-native-screens": screensPaths.selected,
      // These packages are only present at workspace root right now.
      "@react-navigation/native": navNativePaths.selected,
      "@react-navigation/elements": navElementsPaths.selected,
      "@react-navigation/core": navCorePaths.selected,
      "@react-navigation/routers": navRoutersPaths.selected,
    },
    blockList: duplicateBlockList,
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
