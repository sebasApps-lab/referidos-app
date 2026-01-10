import React, { useEffect, useRef } from "react";
import L from "leaflet";

export default function LeafletMapPicker({
  center,
  zoom = 16,
  onCenterChange,
  onReady,
  onError,
  className = "",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const onCenterChangeRef = useRef(onCenterChange);
  const lat = Number(center?.lat ?? 0);
  const lng = Number(center?.lng ?? 0);

  useEffect(() => {
    onCenterChangeRef.current = onCenterChange;
  }, [onCenterChange]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let mapInstance;
    let handleMoveEnd;

    try {
      mapInstance = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance);

      mapInstance.setView([lat, lng], zoom, { animate: false });

      handleMoveEnd = () => {
        const nextCenter = mapInstance.getCenter();
        onCenterChangeRef.current?.({
          lat: nextCenter.lat,
          lng: nextCenter.lng,
        });
      };

      mapInstance.on("moveend", handleMoveEnd);
      mapRef.current = mapInstance;
      onReady?.();
    } catch (error) {
      if (mapInstance) {
        mapInstance.remove();
      }
      mapRef.current = null;
      onError?.(error);
      return undefined;
    }

    return () => {
      mapInstance?.off("moveend", handleMoveEnd);
      mapInstance?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, zoom, onReady, onError]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
    map.setView([lat, lng], map.getZoom(), { animate: false });
  }, [lat, lng]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <PinIcon className="h-8 w-8 text-[#5E30A5]" />
      </div>
    </div>
  );
}

function PinIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
