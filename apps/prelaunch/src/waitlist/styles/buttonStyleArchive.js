// Archive snapshot of button styles before reverting to previous look.
// Keep for future re-apply/reference.
// Full renderable archive (JSX + state + handlers + keyframes + SVG):
// src/waitlist/styles/buttonFullArchive.jsx
export const BUTTON_STYLE_ARCHIVE = {
  toggle: {
    track:
      "flex items-center rounded-full border border-[#E6E8F0] bg-[#F6F7FB] px-0.5 py-0.5 shadow-lg backdrop-blur",
    tabBase:
      "rounded-full border px-5 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A894FF]/70 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
    tabActive:
      "border-[#2D1B69] bg-[#2D1B69] text-white shadow hover:bg-[#241554] active:bg-[#1D1144]",
    tabInactive:
      "border-transparent bg-transparent text-[#2B2F3A] hover:bg-white hover:text-[#3B1FB8] active:bg-[#F8F6FF]",
  },
  joinWaitlistButton: {
    className:
      "waitlist-btn-trace w-[288px] rounded-2xl border border-transparent bg-[#1F1F1E] px-6 py-3 text-sm font-semibold text-[#FFC21C]/80 shadow-md shadow-purple-900/20 transition-colors transition-transform hover:-translate-y-0.5 hover:bg-[#1F1F1E] hover:text-[#FFC21C]/80 active:bg-[#171716] active:text-[#FFC21C]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(111,63,217,0.4)] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-70",
  },
  businessDownloadButton: {
    className:
      "waitlist-btn-trace w-[288px] translate-x-2 rounded-2xl border border-transparent bg-[#1F1F1E] px-6 pb-1 pt-2 text-center text-sm font-semibold leading-tight text-[#FFC21C]/80 shadow-md shadow-purple-900/20 transition-colors transition-transform hover:-translate-y-0.5 hover:bg-[#1F1F1E] hover:text-[#FFC21C]/80 active:bg-[#171716] active:text-[#FFC21C]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(111,63,217,0.4)] focus-visible:ring-offset-1",
    subLabelClassName: "block text-xs font-semibold text-[#FFC21C]",
  },
  borderTrace: {
    drawDurationMs: 1010,
    fadeDurationMs: 260,
    fadeDelayMs: 750,
    coreFinalDashArray: "405 311",
    coreFinalDashOffset: 311,
  },
};
