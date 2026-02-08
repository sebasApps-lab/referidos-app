import SkeletonBlock from "../../components/ui/skeleton/SkeletonBlock";
import SkeletonText from "../../components/ui/skeleton/SkeletonText";

function MetricsRow() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`metric-${index}`}
          className="rounded-2xl border border-[#E6E7EB] bg-white px-3 py-3"
        >
          <SkeletonBlock height={10} radius="9999px" width="70%" />
          <div className="mt-2">
            <SkeletonBlock height={20} radius="12px" width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PromoSkeletonCard({ index }) {
  return (
    <div
      key={`promo-${index}`}
      className="rounded-2xl border border-[#E6E7EB] bg-white p-4"
    >
      <SkeletonBlock height={12} radius="9999px" width="55%" />
      <div className="mt-2">
        <SkeletonText lines={2} lineHeight={10} gap={6} lastLineWidth="70%" />
      </div>
      <div className="mt-3 flex gap-2">
        <SkeletonBlock height={10} radius="9999px" width="35%" />
      </div>
    </div>
  );
}

export default function InicioSkeleton() {
  return (
    <div className="pb-16">
      <section className="px-4 pt-4">
        <SkeletonBlock height={210} radius="32px" />
        <div className="mt-4">
          <MetricsRow />
        </div>
        <div className="mt-4 flex gap-2">
          <SkeletonBlock height={32} radius="9999px" width="40%" />
          <SkeletonBlock height={32} radius="9999px" width="30%" />
        </div>
      </section>

      <section className="mt-6 space-y-4 px-4">
        <SkeletonBlock width="120px" height={12} radius="9999px" />
        {Array.from({ length: 3 }).map((_, index) => (
          <PromoSkeletonCard key={index} index={index} />
        ))}
      </section>
    </div>
  );
}
