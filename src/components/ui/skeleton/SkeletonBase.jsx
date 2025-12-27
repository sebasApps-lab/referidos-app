import "./skeleton.css";

const toSize = (value, fallback) => {
  if (typeof value === "number") return `${value}px`;
  return value ?? fallback;
};

export default function SkeletonBase({
  width = "100%",
  height = "16px",
  radius = "8px",
  className = "",
  style,
}) {
  const styles = {
    width: toSize(width, "100%"),
    height: toSize(height, "16px"),
    borderRadius: toSize(radius, "8px"),
    ...style,
  };

  return (
    <div
      aria-busy="true"
      className={`skeleton-base ${className}`.trim()}
      style={styles}
    />
  );
}
