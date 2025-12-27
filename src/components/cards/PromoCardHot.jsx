import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sanitizeText } from "../../utils/sanitize";
import badgeHot from "../../assets/badges/badge-promo-hot.png";
import embersBg from "../../assets/images/embers-bg.png";
import sparklesOverlay from "../../assets/overlays/hot-sparkles-overlay.png";

export default function PromoCardHot({ promo, className, wrapperProps }) {
  const navigate = useNavigate();
  if (!promo) return null;

  const goDetalle = () => navigate(`/detalle/${promo.id}`);
  const titulo = sanitizeText(promo.titulo || "Promo hot");
  const descripcion = sanitizeText(promo.descripcion || "Sin descripcion");
  const nombreLocal = sanitizeText(promo.nombreLocal || "Local");
  const localWrapperRef = useRef(null);
  const localTextRef = useRef(null);
  const [isMarquee, setIsMarquee] = useState(false);
  const [marqueeDistance, setMarqueeDistance] = useState(0);
  const [marqueeDuration, setMarqueeDuration] = useState("6s");

  const baseClass = className || "flex-shrink-0 w-[310px] pr-0";
  const {
    className: wrapperClassName,
    style: wrapperStyle,
    ...restWrapperProps
  } = wrapperProps || {};
  const mergedClassName = [baseClass, wrapperClassName]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const wrapper = localWrapperRef.current;
    const text = localTextRef.current;
    if (!wrapper || !text) return undefined;

    const update = () => {
      const availableWidth = wrapper.clientWidth;
      const textWidth = text.scrollWidth;
      const overflow = textWidth > availableWidth + 1;
      setIsMarquee(overflow);
      if (!overflow) {
        setMarqueeDistance(0);
        setMarqueeDuration("0s");
        return;
      }
      const gap = 12;
      const distance = textWidth + gap;
      const duration = Math.min(12, Math.max(6, distance / 24));
      setMarqueeDistance(distance);
      setMarqueeDuration(`${duration}s`);
    };

    update();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(update)
        : null;

    if (resizeObserver) {
      resizeObserver.observe(wrapper);
      resizeObserver.observe(text);
    } else {
      window.addEventListener("resize", update);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", update);
      }
    };
  }, [nombreLocal]);

  return (
    <div
      className={mergedClassName}
      style={wrapperStyle}
      {...restWrapperProps}
    >
      <article
        onClick={goDetalle}
        className="cursor-pointer rounded-[20px] shadow-lg overflow-hidden relative text-white aspect-[2/1] min-h-[150px]"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-[65%]">
            {promo.imagen ? (
              <img
                src={promo.imagen}
                alt={titulo}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[#2B0B0B]" />
            )}
          </div>

          <img
            src={sparklesOverlay}
            alt=""
            className="absolute inset-y-0 left-0 h-full w-full object-cover object-left"
            aria-hidden="true"
          />

          <div
            className="absolute inset-y-0 left-[35%] w-[65%]"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.6) 15%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 100%)",
              maskImage:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.6) 15%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 100%)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <img
              src={embersBg}
              alt=""
              className="h-full w-full object-cover mix-blend-screen"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col px-0 pt-2 pb-3">
          <div
            className="relative inline-flex w-fit ml-[41%] items-center gap-0.5"
            style={{ opacity: 0.85, mixBlendMode: "screen" }}
          >
            <img src={badgeHot} alt="Hot" className="h-8 w-auto" />
            <span
              ref={localWrapperRef}
              className={`hot-local-marquee -ml-1 text-[12px] font-semibold tracking-[0.10em] text-white/985 uppercase ${
                isMarquee ? "hot-local-marquee--animate" : ""
              }`}
              style={{
                "--hot-marquee-distance": `${marqueeDistance}px`,
                "--hot-marquee-duration": marqueeDuration,
              }}
            >
              <span
                className={`hot-local-marquee-track ${
                  isMarquee ? "hot-local-marquee-track--animate" : ""
                }`}
              >
                <span ref={localTextRef} className="hot-local-marquee-text">
                  {nombreLocal}
                </span>
                {isMarquee ? (
                  <span
                    className="hot-local-marquee-text"
                    aria-hidden="true"
                  >
                    {nombreLocal}
                  </span>
                ) : null}
              </span>
            </span>
          </div>

          <div className="-mt-1 ml-[41%] px-3">
            <h3 className="text-[15px] font-bold leading-snug text-white line-clamp-2 min-h-[2.1em]">
              {titulo}
            </h3>
            <p className="text-[12px] text-white/85 line-clamp-3 min-h-[3.3em]">
              {descripcion}
            </p>

            <div className="mt-2 h-px w-full bg-[#FFFFFF]/45" />

            <div className="mt-2 space-y-1 text-[12px] text-white/90">
              <div className="flex items-center gap-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                className="text-[#F6C35B]"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 22s8-6.2 8-12a8 8 0 1 0-16 0c0 5.8 8 12 8 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                />
              </svg>
                <span className="font-semibold">{nombreLocal}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
