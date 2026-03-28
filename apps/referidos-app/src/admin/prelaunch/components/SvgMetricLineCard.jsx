import { buildLineChartGeometry } from "./svgChartUtils";

export default function SvgMetricLineCard({
  color = "#5E30A5",
  data = [],
  helper = "",
  title,
  value,
}) {
  const chart = buildLineChartGeometry(data);
  const firstLabel = data[0]?.label || "";
  const lastLabel = data[data.length - 1]?.label || "";
  const gradientId = `metric-fill-${String(title || "chart")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {title}
          </div>
          <div className="mt-2 text-2xl font-bold text-[#2F1A55]">{value}</div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>Min {Math.round(chart.minValue)}</div>
          <div>Max {Math.round(chart.maxValue)}</div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        className="mt-4 h-36 w-full"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <line
          x1={chart.padding.left}
          x2={chart.width - chart.padding.right}
          y1={chart.baselineY}
          y2={chart.baselineY}
          stroke="#ECE3FA"
          strokeWidth="1"
        />

        <path d={chart.areaPath} fill={`url(#${gradientId})`} />
        <path
          d={chart.linePath}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {chart.points.map((point, index) => (
          <circle
            key={`${point.label}-${index}`}
            cx={point.x}
            cy={point.y}
            r={index === chart.points.length - 1 ? 4.5 : 3}
            fill={index === chart.points.length - 1 ? color : "#ffffff"}
            stroke={color}
            strokeWidth="2"
          />
        ))}

        <text
          x={chart.padding.left}
          y={chart.height - 6}
          fill="#94A3B8"
          fontSize="10"
        >
          {firstLabel}
        </text>
        <text
          x={chart.width - chart.padding.right}
          y={chart.height - 6}
          fill="#94A3B8"
          fontSize="10"
          textAnchor="end"
        >
          {lastLabel}
        </text>
      </svg>

      <div className="text-xs text-slate-500">{helper}</div>
    </div>
  );
}
