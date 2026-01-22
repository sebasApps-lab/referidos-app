import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCacheStore } from "./cacheStore";

export default function CacheView({ scope, cacheKey, fallbackTo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const setActive = useCacheStore((state) => state.setActive);
  const preloaded = useCacheStore(
    (state) => Boolean(state.preloadedScopes[scope])
  );
  const preloadedAtMount = useRef(preloaded);
  const shouldRedirect =
    !preloadedAtMount.current &&
    Boolean(fallbackTo) &&
    location.pathname !== fallbackTo;

  useLayoutEffect(() => {
    if (shouldRedirect) {
      if (fallbackTo) {
        setActive(scope, fallbackTo);
      }
      navigate(fallbackTo, { replace: true });
      return;
    }
    setActive(scope, cacheKey);
  }, [cacheKey, navigate, scope, setActive, shouldRedirect, fallbackTo]);

  return null;
}
