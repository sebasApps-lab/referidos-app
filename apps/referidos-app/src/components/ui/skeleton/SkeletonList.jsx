export default function SkeletonList({
  count = 3,
  item,
  gap = 12,
  className = "",
}) {
  const renderItem = typeof item === "function" ? item : () => item;
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: typeof gap === "number" ? `${gap}px` : gap,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderItem(index)}</div>
      ))}
    </div>
  );
}
