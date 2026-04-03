import { lazy, Suspense, useMemo } from "react";
import { useTree } from "./useTree";

export default function AdaptiveRoute({
  DesktopComponent,
  MobileComponent,
  desktopLoader,
  mobileLoader,
  fallback = null,
}) {
  const tree = useTree();
  const LazyDesktopView = useMemo(
    () => (desktopLoader ? lazy(desktopLoader) : null),
    [desktopLoader],
  );
  const LazyMobileView = useMemo(
    () => (mobileLoader ? lazy(mobileLoader) : null),
    [mobileLoader],
  );

  const DesktopView = DesktopComponent || LazyDesktopView;
  const MobileView = MobileComponent || LazyMobileView;
  const ActiveView = tree === "mobile" ? MobileView : DesktopView;

  if (!ActiveView) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <ActiveView />
    </Suspense>
  );
}
