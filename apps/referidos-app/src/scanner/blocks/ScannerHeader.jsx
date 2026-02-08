import React from "react";

export default function ScannerHeader({ title, right }) {
  return (
    <div className="flex justify-between items-center mb-4">
      {title ? (
        <h1 className="text-base font-semibold text-[#2F1A55]">{title}</h1>
      ) : (
        <div />
      )}
      {right}
    </div>
  );
}
