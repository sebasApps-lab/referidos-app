import React, { useEffect, useRef, useState } from "react";
import PromoCardCercanas from "../cards/PromoCardCercanas";
import SectionTitle from "./SectionTitle";
import { useCarousel } from "../../hooks/useCarousel";
import { useAutoCarousel } from "../../hooks/useAutoCarousel";

// Lint purge (no-unused-vars): `CardComponent` ahora se renderiza via createElement (bloque renderItems).
export default function PromoSection({
  title,
  promos,
  ratings,
  CardComponent = PromoCardCercanas,
  autoScroll = false,
  autoScrollInterval = 5000,
  loop = true,
  loopPeek = 0,
  gapClassName = "gap-2",
}) {
  const ref = useRef(null);
  const [autoActive, setAutoActive] = useState(true);
  const resumeTimerRef = useRef(null);
  const resumeDelayMs = 4000;
  const loopEnabled = loop && promos?.length > 1;
  const { canLeft, canRight, scroll, scrollToStart } = useCarousel(ref, {
    loop: loopEnabled,
    itemsCount: promos?.length || 0,
    loopPeek,
    onInteract: () => {
      if (!autoScroll) return;
      setAutoActive(false);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
      resumeTimerRef.current = setTimeout(() => {
        setAutoActive(true);
        scroll("right");
      }, resumeDelayMs);
    },
  });

  useAutoCarousel({
    enabled: autoScroll && promos?.length > 1 && autoActive,
    intervalMs: autoScrollInterval,
    onTick: () => {
      if (loopEnabled) {
        scroll("right");
        return;
      }
      if (canRight) {
        scroll("right");
        return;
      }
      if (canLeft) {
        scrollToStart();
      }
    },
  });

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  if (!promos || promos.length === 0) return null;

  const renderItems = loopEnabled
    ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].flatMap((loopIndex) =>
        promos.map((promo, index) => ({
          promo,
          key: `${promo.id}-${loopIndex}`,
          loopIndex,
          index,
        }))
      )
    : promos.map((promo, index) => ({
        promo,
        key: promo.id,
        loopIndex: 0,
        index,
      }));

  const snapProps = {
    style: { scrollSnapAlign: "center", scrollSnapStop: "always" },
  };
  const snapType = loopEnabled ? "none" : "x mandatory";

  return (
    <div className="mb-8 relative">
      <div className="flex items-center justify-between px-2">
        <SectionTitle>{title}</SectionTitle>
        <div className="hidden md:flex items-center gap-2" />
      </div>


      <div
        ref={ref}
        className={`flex overflow-x-auto ${gapClassName} no-scrollbar scroll-smooth px-2 pt-2`}
        style={{ scrollSnapType: snapType }}
      >
        {renderItems.map(({ promo, key, loopIndex, index }) =>
          React.createElement(CardComponent, {
            key,
            promo,
            rating: ratings?.[promo.id],
            wrapperProps: {
              ...snapProps,
              "data-carousel-item": true,
              "data-carousel-index": index,
              "data-carousel-dup": loopIndex,
            },
          })
        )}
      </div>
    </div>
  );
}
