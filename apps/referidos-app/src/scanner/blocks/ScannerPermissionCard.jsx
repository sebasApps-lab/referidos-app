import React from "react";
import EscanerPermisos from "../EscanerPermisos";

export default function ScannerPermissionCard({
  canScan,
  camGranted,
  onManual,
  onRequestCamera,
  showButton = true,
  manualDisabled = false,
  manualOpen = false,
  manualContent,
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center ${
        manualOpen ? "pt-6" : "justify-center"
      }`}
    >
      <div className="w-full max-w-xl transition-transform duration-500 ease-out">
        <EscanerPermisos
          camSupported={canScan}
          camGranted={camGranted}
          onManual={onManual}
          onRequestCamera={onRequestCamera}
          showButton={showButton}
          manualDisabled={manualDisabled}
          manualOpen={manualOpen}
          manualContent={manualContent}
        />
      </div>
    </div>
  );
}
