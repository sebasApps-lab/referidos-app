function ensureStretchingSvgMask(svgMarkup) {
  if (!svgMarkup) {
    return svgMarkup;
  }

  if (/preserveAspectRatio\s*=/.test(svgMarkup)) {
    return svgMarkup.replace(
      /preserveAspectRatio\s*=\s*["'][^"']*["']/i,
      'preserveAspectRatio="none"',
    );
  }

  return svgMarkup.replace(/<svg\b/i, '<svg preserveAspectRatio="none"');
}

const svgMaskUrlCache = new Map();

export function svgMaskUrl(svgMarkup) {
  const normalizedSvg = ensureStretchingSvgMask(svgMarkup);

  if (svgMaskUrlCache.has(normalizedSvg)) {
    return svgMaskUrlCache.get(normalizedSvg);
  }

  let resolvedUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(normalizedSvg)}`;

  if (
    typeof Blob !== "undefined" &&
    typeof URL !== "undefined" &&
    typeof URL.createObjectURL === "function"
  ) {
    resolvedUrl = URL.createObjectURL(
      new Blob([normalizedSvg], { type: "image/svg+xml" }),
    );
  }

  svgMaskUrlCache.set(normalizedSvg, resolvedUrl);
  return resolvedUrl;
}
