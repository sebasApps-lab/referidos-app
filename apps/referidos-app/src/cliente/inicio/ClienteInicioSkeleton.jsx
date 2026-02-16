import SkeletonBlock from "../../components/ui/skeleton/SkeletonBlock";
import SkeletonText from "../../components/ui/skeleton/SkeletonText";
import SkeletonCard from "../../components/ui/skeleton/SkeletonCard";

function NuevasRow() {
  return (
    <div className="flex gap-2 overflow-hidden px-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`nuevas-${index}`}
          className="flex-shrink-0 w-[90%] sm:w-[420px]"
        >
          <div
            className="flex overflow-hidden rounded-2xl border border-[#E6E7EB] bg-white"
            style={{ height: 112 }}
          >
            <div className="w-28 sm:w-32">
              <SkeletonBlock height="100%" radius={0} />
            </div>
            <div className="flex-1 p-3 flex flex-col gap-2">
              <SkeletonBlock height={12} radius="9999px" />
              <SkeletonText lines={2} lineHeight={10} gap={6} lastLineWidth="65%" />
              <SkeletonBlock height={10} width="40%" radius="9999px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CercanasRow() {
  return (
    <div className="flex gap-2 overflow-hidden px-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <SkeletonCard
          key={`cercanas-${index}`}
          className="flex-shrink-0 w-[88%] sm:w-[340px]"
          imageHeight={170}
          lines={2}
        />
      ))}
    </div>
  );
}

function HotRow() {
  return (
    <div className="flex gap-2 overflow-hidden px-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={`hot-${index}`} className="flex-shrink-0 w-[210px]">
          <div
            className="flex overflow-hidden rounded-xl border border-[#E6E7EB] bg-white"
            style={{ height: 86 }}
          >
            <div className="w-20">
              <SkeletonBlock height="100%" radius={0} />
            </div>
            <div className="flex-1 p-3 flex flex-col gap-2">
              <SkeletonBlock height={10} radius="9999px" />
              <SkeletonBlock height={8} width="60%" radius="9999px" />
              <SkeletonBlock height={8} width="50%" radius="9999px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClienteInicioSkeleton() {
  return (
    <div className="pb-16">
      <section className="px-4 pt-4">
        <SkeletonBlock height={140} radius="32px" />
        <div className="mt-4">
          <SkeletonBlock height={36} radius="9999px" />
        </div>
      </section>

      <section className="mt-6 space-y-8">
        <div>
          <div className="px-4 mb-3">
            <SkeletonBlock width="120px" height={12} radius="9999px" />
          </div>
          <NuevasRow />
        </div>

        <div>
          <div className="px-4 mb-3">
            <SkeletonBlock width="140px" height={12} radius="9999px" />
          </div>
          <CercanasRow />
        </div>

        <div>
          <div className="px-4 mb-3">
            <SkeletonBlock width="80px" height={12} radius="9999px" />
          </div>
          <HotRow />
        </div>
      </section>
    </div>
  );
}
