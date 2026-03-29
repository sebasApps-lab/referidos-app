export function clampChartMax(value, fallback = 1) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export function buildLineChartGeometry(data = [], { width = 320, height = 136 } = {}) {
  const safeData = Array.isArray(data) && data.length > 0
    ? data
    : [{ label: "", value: 0 }];
  const values = safeData.map((item) => Number(item.value || 0));
  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);

  if (!Number.isFinite(minValue)) minValue = 0;
  if (!Number.isFinite(maxValue)) maxValue = 0;

  if (minValue === maxValue) {
    if (maxValue === 0) {
      maxValue = 1;
    } else {
      minValue = Math.max(0, minValue - Math.abs(minValue * 0.15));
      maxValue = maxValue + Math.abs(maxValue * 0.15);
    }
  }

  const padding = {
    top: 18,
    right: 12,
    bottom: 24,
    left: 12,
  };

  const innerWidth = Math.max(1, width - padding.left - padding.right);
  const innerHeight = Math.max(1, height - padding.top - padding.bottom);
  const xStep = safeData.length > 1 ? innerWidth / (safeData.length - 1) : innerWidth / 2;
  const range = Math.max(maxValue - minValue, 1);

  const points = safeData.map((item, index) => {
    const value = Number(item.value || 0);
    const x = padding.left + (safeData.length > 1 ? index * xStep : innerWidth / 2);
    const y = padding.top + innerHeight - ((value - minValue) / range) * innerHeight;
    return {
      ...item,
      value,
      x,
      y,
    };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ");

  const baselineY = padding.top + innerHeight;
  const areaPath = [
    linePath,
    `L ${points[points.length - 1].x.toFixed(2)} ${baselineY.toFixed(2)}`,
    `L ${points[0].x.toFixed(2)} ${baselineY.toFixed(2)}`,
    "Z",
  ].join(" ");

  return {
    width,
    height,
    padding,
    innerWidth,
    innerHeight,
    minValue,
    maxValue,
    points,
    linePath,
    areaPath,
    baselineY,
  };
}

export function buildVerticalBarGeometry(values = [], { width = 320, height = 136 } = {}) {
  const safeValues = Array.isArray(values) && values.length > 0
    ? values
    : [{ label: "", value: 0, color: "#5E30A5" }];
  const maxValue = clampChartMax(
    Math.max(...safeValues.map((item) => Number(item.value || 0))),
    1,
  );
  const padding = {
    top: 14,
    right: 12,
    bottom: 28,
    left: 12,
  };
  const innerWidth = Math.max(1, width - padding.left - padding.right);
  const innerHeight = Math.max(1, height - padding.top - padding.bottom);
  const barGap = 18;
  const barWidth = Math.min(
    56,
    Math.max(
      28,
      (innerWidth - Math.max(0, safeValues.length - 1) * barGap) / safeValues.length,
    ),
  );
  const totalBarsWidth = safeValues.length * barWidth + Math.max(0, safeValues.length - 1) * barGap;
  const offsetX = padding.left + Math.max(0, (innerWidth - totalBarsWidth) / 2);

  const bars = safeValues.map((item, index) => {
    const value = Number(item.value || 0);
    const barHeight = Math.max(4, (value / maxValue) * innerHeight);
    const x = offsetX + index * (barWidth + barGap);
    const y = padding.top + innerHeight - barHeight;
    return {
      ...item,
      value,
      x,
      y,
      barWidth,
      barHeight,
    };
  });

  return {
    width,
    height,
    padding,
    innerHeight,
    innerWidth,
    maxValue,
    bars,
  };
}

export function getMeterRatio(value, maxValue) {
  const safeMax = clampChartMax(maxValue, 1);
  return Math.max(0, Math.min(1, Number(value || 0) / safeMax));
}
