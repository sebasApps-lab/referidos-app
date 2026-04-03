import { Suspense, useEffect, useRef, useState } from "react";

function buildPlaceholderStyle(placeholderHeight) {
  if (!placeholderHeight) {
    return undefined;
  }

  return {
    minHeight: typeof placeholderHeight === "number" ? `${placeholderHeight}px` : placeholderHeight,
  };
}

export default function DeferredRender({
  children,
  rootMargin = "360px 0px",
  placeholderAs = "div",
  placeholderId = undefined,
  placeholderClassName = "",
  placeholderHeight = 0,
  fallback = null,
  immediate = false,
}) {
  const [shouldRender, setShouldRender] = useState(immediate);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (shouldRender) {
      return undefined;
    }

    const node = placeholderRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  if (shouldRender) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }

  const PlaceholderTag = placeholderAs;
  return (
    <PlaceholderTag
      ref={placeholderRef}
      id={placeholderId}
      className={placeholderClassName}
      aria-hidden="true"
      style={buildPlaceholderStyle(placeholderHeight)}
    />
  );
}
