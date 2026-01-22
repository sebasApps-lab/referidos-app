import SkeletonBlock from "../../components/ui/skeleton/SkeletonBlock";
import SkeletonText from "../../components/ui/skeleton/SkeletonText";

export default function HistorialSkeleton({ rows = 3 }) {
  return (
    <div className="px-4 pb-4 space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={`historial-skel-${index}`}
          className="rounded-2xl border border-[#E9E2F7] bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <SkeletonBlock width="45%" height={12} radius="9999px" />
            <SkeletonBlock width="18%" height={10} radius="9999px" />
          </div>
          <div className="mt-3">
            <SkeletonText lines={2} lineHeight={10} gap={6} lastLineWidth="70%" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <SkeletonBlock width="16%" height={10} radius="9999px" />
            <SkeletonBlock width="20%" height={10} radius="9999px" />
            <SkeletonBlock width="14%" height={10} radius="9999px" />
          </div>
        </div>
      ))}
    </div>
  );
}
