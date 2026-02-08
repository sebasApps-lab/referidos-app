import React from "react";

export default function ScannerView({
  showPermissionIntro = false,
  header,
  main,
  footer,
}) {
  return (
    <div
      className={`w-full flex flex-col ${showPermissionIntro ? "" : "px-4 pt-4"}`}
      style={{
        minHeight:
          "calc(100dvh - var(--cliente-header-height, 0px) - 80px - env(safe-area-inset-bottom))",
        paddingBottom: showPermissionIntro
          ? 0
          : "calc(10px + env(safe-area-inset-bottom))",
      }}
    >
      {header}
      <div className="flex flex-1 flex-col">{main}</div>
      {footer}
    </div>
  );
}
