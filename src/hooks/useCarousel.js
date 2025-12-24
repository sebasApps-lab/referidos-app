// src/hooks/useCarousel.js
import { useEffect, useState } from "react";

export function useCarousel(ref) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;

    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 5);
  };

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;

    el.scrollBy({
      left: dir === "right" ? el.clientWidth * 0.9 : -el.clientWidth * 0.9,
      behavior: "smooth",
    });

    setTimeout(update, 200);
  };

  const scrollToStart = () => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "smooth" });
    setTimeout(update, 200);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return { canLeft, canRight, scroll, scrollToStart };
}
