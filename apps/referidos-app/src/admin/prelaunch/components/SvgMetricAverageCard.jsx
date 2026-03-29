import { getMeterRatio } from "./svgChartUtils";

export default function SvgMetricAverageCard({
  accentColor = "#5E30A5",
  helper = "",
  maxValue = 1,
  title,
  value,
  valueLabel,
}) {
  const ratio = getMeterRatio(value, maxValue);
  const meterWidth = 320;
  const meterHeight = 56;
  const fillWidth = 24 + ratio * (meterWidth - 32);

  return (
    <div className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {title}
          </div>
          <div className="mt-2 text-2xl font-bold text-[#2F1A55]">{valueLabel}</div>
        </div>
        <div className="text-[11px] text-slate-400">
          {Math.round(ratio * 100)}% del referente
        </div>
      </div>

      <svg
        viewBox={`0 0 ${meterWidth} ${meterHeight}`}
        className="mt-4 h-16 w-full"
        role="img"
        aria-label={title}
      >
        <rect
          x="4"
          y="16"
          width={meterWidth - 8}
          height="18"
          rx="9"
          fill="#F3EEFC"
        />
        <rect
          x="4"
          y="16"
          width={fillWidth}
          height="18"
          rx="9"
          fill={accentColor}
        />
        <circle cx={fillWidth} cy="25" r="6" fill="#ffffff" stroke={accentColor} strokeWidth="3" />
      </svg>

      <div className="text-xs text-slate-500">{helper}</div>
    </div>
  );
}
