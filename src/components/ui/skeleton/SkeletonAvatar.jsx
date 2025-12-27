import SkeletonBase from "./SkeletonBase";

export default function SkeletonAvatar({
  size = 40,
  shape = "circle",
  className = "",
  style,
}) {
  const radius = shape === "circle" ? "9999px" : "12px";
  return (
    <SkeletonBase
      width={size}
      height={size}
      radius={radius}
      className={className}
      style={style}
    />
  );
}
