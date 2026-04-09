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
  placeholderContent = null,
  fallback = undefined,
  immediate = false,
}) {
  const [shouldRender, setShouldRender] = useState(immediate);
  const placeholderRef = useRef(null);
  const PlaceholderTag = placeholderAs;

  function renderPlaceholder(ref = undefined) {
    return (
      <PlaceholderTag
        ref={ref}
        id={placeholderId}
        className={placeholderClassName}
        aria-hidden="true"
        style={buildPlaceholderStyle(placeholderHeight)}
      >
        {placeholderContent}
      </PlaceholderTag>
    );
  }

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
    return <Suspense fallback={fallback === undefined ? renderPlaceholder() : fallback}>{children}</Suspense>;
  }

  return renderPlaceholder(placeholderRef);
}
