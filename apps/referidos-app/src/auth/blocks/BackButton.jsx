import React from "react";

export default function BackButton({
  onClick,
  direction = "left",
  className = "",
  ariaLabel,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-9 h-18 rounded-xl bg-white shadow flex items-center justify-center text-[#5E30A5] hover:bg-[#F3E8FF] active:scale-95 transition z-20 ${className}`}
      aria-label={ariaLabel}
    >
      {direction === "right" ? <ArrowRightIcon /> : <ArrowLeftIcon />}
    </button>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
