import React from "react";
import ClienteLayout from "../../cliente/layout/ClienteLayout";
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

export default function ClienteEscaner() {
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

  return (
    <ClienteLayout>
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
    </ClienteLayout>
  );
}
