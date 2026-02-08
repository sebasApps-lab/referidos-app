import React, { useLayoutEffect } from "react";
import ScannerView from "../../scanner/ScannerView";
import ScannerCameraBlock from "../../scanner/blocks/ScannerCameraBlock";
import ScannerHeader from "../../scanner/blocks/ScannerHeader";
import ScannerManualEntry from "../../scanner/blocks/ScannerManualEntry";
import ScannerPermissionCard from "../../scanner/blocks/ScannerPermissionCard";
import ScannerPermissionIntro from "../../scanner/blocks/ScannerPermissionIntro";
import ScannerProcessingHint from "../../scanner/blocks/ScannerProcessingHint";
import ScannerResultCard from "../../scanner/blocks/ScannerResultCard";
import { scannerCopy } from "../../scanner/constants/scannerCopy";
import { useScannerState } from "../../scanner/hooks/useScannerState";
import { useClienteHeader } from "../layout/ClienteHeaderContext";
import { useCacheStore } from "../../cache/cacheStore";
import { CACHE_KEYS } from "../../cache/cacheKeys";

export default function ClienteEscanerBase() {
  const { setHeaderOptions } = useClienteHeader();
  const isActive = useCacheStore(
    (state) => state.activeKeys.cliente === CACHE_KEYS.CLIENTE_ESCANEAR
  );
  const {
    canScan,
    camGranted,
    setCamGranted,
    setScanSupported,
    manualRequested,
    manualValue,
    setManualValue,
    manualDisabled,
    processing,
    result,
    showCamera,
    showManual,
    showPermisos,
    showPermissionIntro,
    handleCode,
    handleManualOpen,
    handleStatusInfo,
    requestCameraPermission,
    skipPermissionIntro,
  } = useScannerState({ role: "cliente" });

  const headerTitle = showPermisos ? scannerCopy.header.manualTitle : null;

  useLayoutEffect(() => {
    if (!isActive) return undefined;
    setHeaderOptions({
      mode: "default",
      onSearchBack: null,
      headerVisible: true,
      profileDockOpen: true,
      profileTitle: "Configuracion",
    });
    return () => {
      setHeaderOptions({
        mode: "default",
        onSearchBack: null,
        headerVisible: true,
        profileDockOpen: true,
        profileTitle: "Configuracion",
      });
    };
  }, [isActive, setHeaderOptions]);

  return (
    <ScannerView
      showPermissionIntro={showPermissionIntro}
      header={
        !showPermissionIntro ? (
          <ScannerHeader
            title={headerTitle}
            right={
              processing ? (
                <ScannerProcessingHint label={scannerCopy.processingHint} />
              ) : null
            }
          />
        ) : null
      }
      main={
        <>
          {showCamera && !showManual ? (
            <ScannerCameraBlock
              active={showCamera && !showManual}
              disabled={processing}
              onDetected={handleCode}
              onSupportChange={setScanSupported}
              onPermissionChange={setCamGranted}
              onFallback={() => setCamGranted(false)}
              onStatus={handleStatusInfo}
            />
          ) : null}

          {showPermissionIntro ? (
            <ScannerPermissionIntro
              title={scannerCopy.permissionIntro.title}
              description={scannerCopy.permissionIntro.description}
              primaryLabel={scannerCopy.permissionIntro.primaryAction}
              secondaryLabel={scannerCopy.permissionIntro.secondaryAction}
              onPrimary={requestCameraPermission}
              onSecondary={skipPermissionIntro}
            />
          ) : null}

          {showPermisos ? (
            <ScannerPermissionCard
              canScan={canScan}
              camGranted={camGranted}
              onManual={handleManualOpen}
              onRequestCamera={requestCameraPermission}
              showButton={!showManual}
              manualDisabled={manualRequested}
              manualOpen={showManual}
              manualContent={
                <ScannerManualEntry
                  value={manualValue}
                  onChange={setManualValue}
                  onSubmit={() => handleCode(manualValue)}
                  disabled={manualDisabled}
                />
              }
            />
          ) : null}
        </>
      }
      footer={
        !showPermissionIntro ? (
          <div className="mt-5 flex flex-col gap-3 w-full max-w-lg self-center">
            <ScannerResultCard data={result} labels={scannerCopy.resultCard} />
          </div>
        ) : null
      }
    />
  );
}
