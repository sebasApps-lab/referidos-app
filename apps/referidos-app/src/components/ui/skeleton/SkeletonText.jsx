import SkeletonBlock from "./SkeletonBlock";

const toSize = (value, fallback) => {
  if (typeof value === "number") return `${value}px`;
  return value ?? fallback;
};

export default function SkeletonText({
  lines = 2,
  lineHeight = 12,
  gap = 8,
  lastLineWidth = "70%",
  className = "",
}) {
  const safeLines = Math.max(1, lines);
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: toSize(gap, "8px"),
      }}
    >
      {Array.from({ length: safeLines }).map((_, index) => {
        const isLast = index === safeLines - 1;
        return (
          <SkeletonBlock
            key={index}
            width={isLast ? lastLineWidth : "100%"}
            height={lineHeight}
            radius="9999px"
          />
        );
      })}
    </div>
  );
}
