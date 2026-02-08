import React, { useEffect, useRef, useState } from "react";

export const archivedButtonTraceCss = `
@keyframes borderDrawPath {
  0% {
    opacity: 0;
    stroke-dasharray: 10 716;
    stroke-dashoffset: 716;
  }
  4% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    stroke-dasharray: 405 311;
    stroke-dashoffset: 311;
  }
}
@keyframes borderFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.waitlist-btn-trace {
  position: relative;
  overflow: visible;
}
.waitlist-btn-outline {
  position: absolute;
  inset: -2px;
  pointer-events: none;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  overflow: visible;
}
.waitlist-btn-outline rect {
  fill: none;
  stroke: rgba(255, 194, 28, 0.9);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 10 716;
  stroke-dashoffset: 716;
  opacity: 0;
}
.waitlist-btn-trace.is-tracing .waitlist-btn-outline rect {
  animation:
    borderDrawPath 1010ms cubic-bezier(0.25, 0.85, 0.3, 1) 1 both,
    borderFadeOut 260ms ease-out 750ms 1 both;
}
`;

export const archivedButtonStyleSnapshot = {
  traceTimeoutMs: 1200,
  joinClass:
    "waitlist-btn-trace w-[288px] rounded-2xl border border-transparent bg-[#1F1F1E] px-6 py-3 text-sm font-semibold text-[#FFC21C]/80 shadow-md shadow-purple-900/20 transition-colors transition-transform hover:-translate-y-0.5 hover:bg-[#1F1F1E] hover:text-[#FFC21C]/80 active:bg-[#171716] active:text-[#FFC21C]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(111,63,217,0.4)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-70",
  businessClass:
    "waitlist-btn-trace w-[288px] translate-x-2 rounded-2xl border border-transparent bg-[#1F1F1E] px-6 pb-1 pt-2 text-center text-sm font-semibold leading-tight text-[#FFC21C]/80 shadow-md shadow-purple-900/20 transition-colors transition-transform hover:-translate-y-0.5 hover:bg-[#1F1F1E] hover:text-[#FFC21C]/80 active:bg-[#171716] active:text-[#FFC21C]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(111,63,217,0.4)] focus-visible:ring-offset-1",
};

export function useArchivedButtonTrace({ timeoutMs = 1200 } = {}) {
  const [isBorderTracing, setIsBorderTracing] = useState(false);
  const [isBusinessBorderTracing, setIsBusinessBorderTracing] = useState(false);
  const borderTraceRafRef = useRef(null);
  const businessBorderTraceRafRef = useRef(null);
  const borderTraceTimeoutRef = useRef(null);
  const businessBorderTraceTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (borderTraceRafRef.current != null) {
        window.cancelAnimationFrame(borderTraceRafRef.current);
      }
      if (businessBorderTraceRafRef.current != null) {
        window.cancelAnimationFrame(businessBorderTraceRafRef.current);
      }
      if (borderTraceTimeoutRef.current != null) {
        window.clearTimeout(borderTraceTimeoutRef.current);
      }
      if (businessBorderTraceTimeoutRef.current != null) {
        window.clearTimeout(businessBorderTraceTimeoutRef.current);
      }
    };
  }, []);

  const triggerBorderTrace = () => {
    if (borderTraceRafRef.current != null) {
      window.cancelAnimationFrame(borderTraceRafRef.current);
    }
    setIsBorderTracing(false);
    borderTraceRafRef.current = window.requestAnimationFrame(() => {
      setIsBorderTracing(true);
      borderTraceRafRef.current = null;
    });
    if (borderTraceTimeoutRef.current != null) {
      window.clearTimeout(borderTraceTimeoutRef.current);
    }
    borderTraceTimeoutRef.current = window.setTimeout(() => {
      setIsBorderTracing(false);
      borderTraceTimeoutRef.current = null;
    }, timeoutMs);
  };

  const handleBorderTraceAnimationEnd = (event) => {
    if (event.animationName === "borderFadeOut") {
      setIsBorderTracing(false);
    }
  };

  const triggerBusinessBorderTrace = () => {
    if (businessBorderTraceRafRef.current != null) {
      window.cancelAnimationFrame(businessBorderTraceRafRef.current);
    }
    setIsBusinessBorderTracing(false);
    businessBorderTraceRafRef.current = window.requestAnimationFrame(() => {
      setIsBusinessBorderTracing(true);
      businessBorderTraceRafRef.current = null;
    });
    if (businessBorderTraceTimeoutRef.current != null) {
      window.clearTimeout(businessBorderTraceTimeoutRef.current);
    }
    businessBorderTraceTimeoutRef.current = window.setTimeout(() => {
      setIsBusinessBorderTracing(false);
      businessBorderTraceTimeoutRef.current = null;
    }, timeoutMs);
  };

  const handleBusinessBorderTraceAnimationEnd = (event) => {
    if (event.animationName === "borderFadeOut") {
      setIsBusinessBorderTracing(false);
    }
  };

  return {
    isBorderTracing,
    isBusinessBorderTracing,
    triggerBorderTrace,
    triggerBusinessBorderTrace,
    handleBorderTraceAnimationEnd,
    handleBusinessBorderTraceAnimationEnd,
  };
}

export function ArchivedJoinWaitlistButton({
  trace,
  loading = false,
  disabled = false,
  loadingLabel = "Enviando...",
  label = "Unirse a la lista de espera",
}) {
  const {
    isBorderTracing,
    triggerBorderTrace,
    handleBorderTraceAnimationEnd,
  } = trace;

  return (
    <button
      type="submit"
      disabled={disabled || loading}
      onPointerEnter={triggerBorderTrace}
      onPointerDown={triggerBorderTrace}
      onFocus={triggerBorderTrace}
      className={`waitlist-btn-trace w-[288px] rounded-2xl border border-transparent bg-[#1F1F1E] px-6 py-3 text-sm font-semibold text-[#FFC21C]/80 shadow-md shadow-purple-900/20 transition-colors transition-transform hover:-translate-y-0.5 hover:bg-[#1F1F1E] hover:text-[#FFC21C]/80 active:bg-[#171716] active:text-[#FFC21C]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(111,63,217,0.4)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-70 ${isBorderTracing ? "is-tracing" : ""}`}
    >
      {loading ? loadingLabel : label}
      <svg
        aria-hidden="true"
        className="waitlist-btn-outline"
        viewBox="0 0 292 60"
        preserveAspectRatio="none"
      >
        <rect
          x="1.5"
          y="1.5"
          width="289"
          height="57"
          rx="16"
          ry="16"
          onAnimationEnd={handleBorderTraceAnimationEnd}
        />
      </svg>
    </button>
  );
}

export function ArchivedBusinessDownloadButton({
  trace,
  href = "/app",
  onClick,
  label = "Descargar panel para negocio",
  subLabel = "(Acceso anticipado)",
}) {
  const {
    isBusinessBorderTracing,
    triggerBusinessBorderTrace,
    handleBusinessBorderTraceAnimationEnd,
  } = trace;

  return (
    <a
      href={href}
      onClick={onClick}
      onPointerEnter={triggerBusinessBorderTrace}
      onPointerDown={triggerBusinessBorderTrace}
      onFocus={triggerBusinessBorderTrace}
      className={`waitlist-btn-trace w-[288px] translate-x-2 rounded-2xl border border-transparent bg-[#1F1F1E] px-6 pb-1 pt-2 text-center text-sm font-semibold leading-tight text-[#FFC21C]/80 shadow-md shadow-purple-900/20 transition-colors transition-transform hover:-translate-y-0.5 hover:bg-[#1F1F1E] hover:text-[#FFC21C]/80 active:bg-[#171716] active:text-[#FFC21C]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(111,63,217,0.4)] focus-visible:ring-offset-1 ${isBusinessBorderTracing ? "is-tracing" : ""}`}
    >
      {label}
      <span className="block text-xs font-semibold text-[#FFC21C]">
        {subLabel}
      </span>
      <svg
        aria-hidden="true"
        className="waitlist-btn-outline"
        viewBox="0 0 292 60"
        preserveAspectRatio="none"
      >
        <rect
          className="trace-stroke trace-stroke--soft"
          x="1.5"
          y="1.5"
          width="289"
          height="57"
          rx="16"
          ry="16"
        />
        <rect
          className="trace-stroke trace-stroke--mid"
          x="1.5"
          y="1.5"
          width="289"
          height="57"
          rx="16"
          ry="16"
        />
        <rect
          className="trace-stroke trace-stroke--core"
          x="1.5"
          y="1.5"
          width="289"
          height="57"
          rx="16"
          ry="16"
          onAnimationEnd={handleBusinessBorderTraceAnimationEnd}
        />
      </svg>
    </a>
  );
}
