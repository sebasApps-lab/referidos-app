import SkeletonBlock from "./SkeletonBlock";
import SkeletonText from "./SkeletonText";
import SkeletonAvatar from "./SkeletonAvatar";

export default function SkeletonCard({
  imageHeight = 140,
  lines = 2,
  showAvatar = false,
  className = "",
}) {
  return (
    <div
      className={className}
      style={{
        borderRadius: "16px",
        border: "1px solid #E6E7EB",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <SkeletonBlock height={imageHeight} radius={0} />
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 10 }}>
        <SkeletonText lines={lines} lineHeight={12} gap={6} lastLineWidth="60%" />
        {showAvatar ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SkeletonAvatar size={26} />
            <SkeletonBlock width="40%" height={12} radius="9999px" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
