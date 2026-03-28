import { buildVerticalBarGeometry } from "./svgChartUtils";

export default function SvgMetricCompareCard({
  helper = "",
  leftColor = "#5E30A5",
  leftLabel,
  leftValue,
  rightColor = "#D6C6F6",
  rightLabel,
  rightValue,
  title,
  valueFormatter = (value) => String(value),
}) {
  const chart = buildVerticalBarGeometry([
    { label: leftLabel, value: leftValue, color: leftColor },
    { label: rightLabel, value: rightValue, color: rightColor },
  ]);

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {title}
      </div>
      <svg
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        className="mt-4 h-36 w-full"
        role="img"
        aria-label={title}
      >
        <line
          x1={chart.padding.left}
          x2={chart.width - chart.padding.right}
          y1={chart.height - chart.padding.bottom}
          y2={chart.height - chart.padding.bottom}
          stroke="#ECE3FA"
          strokeWidth="1"
        />

        {chart.bars.map((bar) => (
          <g key={bar.label}>
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.barWidth}
              height={bar.barHeight}
              rx="14"
              fill={bar.color}
            />
            <text
              x={bar.x + bar.barWidth / 2}
              y={bar.y - 8}
              fill="#2F1A55"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
            >
              {valueFormatter(bar.value)}
            </text>
            <text
              x={bar.x + bar.barWidth / 2}
              y={chart.height - 8}
              fill="#64748B"
              fontSize="10"
              textAnchor="middle"
            >
              {bar.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="text-xs text-slate-500">{helper}</div>
    </div>
  );
}
