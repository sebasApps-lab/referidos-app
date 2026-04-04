const rootAssets = import.meta.glob("./root/*", {
  eager: true,
  import: "default",
});
const bgAssets = import.meta.glob("./bg/*", {
  eager: true,
  import: "default",
});
const bgSetWebpAssets = import.meta.glob("./bg-sets/**/*.webp", {
  eager: true,
  import: "default",
});
const bgSetAvifAssets = import.meta.glob("./bg-sets/**/*.avif", {
  eager: true,
  import: "default",
});
const bgSetSvgAssets = import.meta.glob("./bg-sets/**/*.svg", {
  eager: true,
  import: "default",
});
const bgSetAssets = {
  ...bgSetWebpAssets,
  ...bgSetAvifAssets,
  ...bgSetSvgAssets,
};
const iconAssets = import.meta.glob("./icons/*", {
  eager: true,
  import: "default",
});
const logoAssets = import.meta.glob("./logos/*", {
  eager: true,
  import: "default",
});
const mobileAssets = import.meta.glob("./mobile/*", {
  eager: true,
  import: "default",
});
const modalAssets = import.meta.glob("./modals/*", {
  eager: true,
  import: "default",
});
const supportFormAssets = import.meta.glob("./support-form/*", {
  eager: true,
  import: "default",
});
const businessAssets = import.meta.glob("./business/*", {
  eager: true,
  import: "default",
});

function resolveAsset(map, directory, name) {
  const key = `./${directory}/${name}`;
  const url = map[key];
  if (!url) {
    throw new Error(`Missing prelaunch asset: ${key}`);
  }
  return url;
}

export const prelaunchAsset = (name) => resolveAsset(rootAssets, "root", name);
export const prelaunchBgAsset = (name) => resolveAsset(bgAssets, "bg", name);
export const prelaunchBgSetAsset = (name) => {
  const key = `./bg-sets/${name}`;
  return bgSetAssets[key] || null;
};
export const prelaunchIconAsset = (name) => resolveAsset(iconAssets, "icons", name);
export const prelaunchLogoAsset = (name) => resolveAsset(logoAssets, "logos", name);
export const prelaunchMobileAsset = (name) => resolveAsset(mobileAssets, "mobile", name);
export const prelaunchModalAsset = (name) => resolveAsset(modalAssets, "modals", name);
export const prelaunchSupportFormAsset = (name) =>
  resolveAsset(supportFormAssets, "support-form", name);
export const prelaunchBusinessAsset = (name) =>
  resolveAsset(businessAssets, "business", name);
