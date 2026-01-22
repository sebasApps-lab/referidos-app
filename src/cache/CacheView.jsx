import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCacheStore } from "./cacheStore";

export default function CacheView({ scope, cacheKey, fallbackTo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const setActive = useCacheStore((state) => state.setActive);
  const preloaded = useCacheStore(
    (state) => Boolean(state.preloadedScopes[scope])
  );

  useLayoutEffect(() => {
    if (!preloaded && fallbackTo && location.pathname !== fallbackTo) {
      navigate(fallbackTo, { replace: true });
      return;
    }
    setActive(scope, cacheKey);
  }, [cacheKey, fallbackTo, location.pathname, navigate, preloaded, scope, setActive]);

  return null;
}
