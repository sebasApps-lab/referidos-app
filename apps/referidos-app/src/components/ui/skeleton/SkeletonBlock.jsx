import SkeletonBase from "./SkeletonBase";

export default function SkeletonBlock({
  width = "100%",
  height = "16px",
  radius = "8px",
  className = "",
  style,
}) {
  return (
    <SkeletonBase
      width={width}
      height={height}
      radius={radius}
      className={className}
      style={style}
    />
  );
}
