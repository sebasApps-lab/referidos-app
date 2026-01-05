import React from "react";
import EscanerFallback from "../EscanerFallback";

export default function ScannerManualEntry({
  value,
  onChange,
  onSubmit,
  disabled,
}) {
  return (
    <div className="w-full">
      <EscanerFallback
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </div>
  );
}
