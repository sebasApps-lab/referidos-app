import React, { useEffect, useRef } from "react";

export default function EscanerCamera({
  active = true,
  disabled = false,
  onDetected,
  onSupportChange,
  onPermissionChange,
  onFallback,
  onStatus,
}) {
  const videoRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);
  const streamRef = useRef(null);
  const disabledRef = useRef(disabled);

  useEffect(() => {
    if (!active) return undefined;
    let cancelled = false;

    const start = async () => {
      try {
        const supportsBarcode = "BarcodeDetector" in window;
        onSupportChange?.(supportsBarcode);
        if (supportsBarcode) {
          detectorRef.current = new window.BarcodeDetector({
            formats: ["qr_code"],
          });
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (cancelled) return;
        streamRef.current = stream;
        onPermissionChange?.(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (supportsBarcode) scanLoop();
      } catch {
        onPermissionChange?.(false);
        onFallback?.();
        onStatus?.("Activa la camara o pega el codigo manualmente.");
      }
    };

    const scanLoop = async () => {
      try {
        if (
          !disabledRef.current &&
          detectorRef.current &&
          videoRef.current?.readyState >= 2
        ) {
          const codes = await detectorRef.current.detect(videoRef.current);
          if (codes.length) {
            onDetected?.(codes[0].rawValue);
          }
        }
      } catch {
        onStatus?.("No se pudo leer el QR.");
      } finally {
        rafRef.current = requestAnimationFrame(scanLoop);
      }
    };

    start();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [active, onDetected, onFallback, onPermissionChange, onStatus, onSupportChange]);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  return (
    <div className="relative w-full max-w-sm self-center">
      <div
        className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#E9E2F7] bg-white"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#5E30A5] animate-pulse" />
          <div className="absolute inset-6 rounded-2xl border border-white/40" />
        </div>
      </div>
    </div>
  );
}
