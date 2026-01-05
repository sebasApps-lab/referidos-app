import React from "react";
import EscanerCamera from "../EscanerCamera";

export default function ScannerCameraBlock({
  active,
  disabled,
  onDetected,
  onSupportChange,
  onPermissionChange,
  onFallback,
  onStatus,
}) {
  return (
    <div className="space-y-4">
      <EscanerCamera
        active={active}
        disabled={disabled}
        onDetected={onDetected}
        onSupportChange={onSupportChange}
        onPermissionChange={onPermissionChange}
        onFallback={onFallback}
        onStatus={onStatus}
      />
    </div>
  );
}
