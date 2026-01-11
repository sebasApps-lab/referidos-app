import React, { useEffect, useRef } from "react";
import L from "leaflet";

export default function LeafletMapPicker({
  center,
  zoom = 16,
  onCenterChange,
  onZoomChange,
  onReady,
  onError,
  className = "",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const onCenterChangeRef = useRef(onCenterChange);
  const onZoomChangeRef = useRef(onZoomChange);
  const onReadyRef = useRef(onReady);
  const onErrorRef = useRef(onError);
  const mapTilerKey = import.meta.env.VITE_MAPTILER_KEY;
  const tileUrl = mapTilerKey
    ? `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${mapTilerKey}`
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileAttribution = mapTilerKey
    ? "&copy; <a href=\"https://www.maptiler.com/copyright/\">MapTiler</a> &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
    : "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>";
  const lat = Number(center?.lat ?? 0);
  const lng = Number(center?.lng ?? 0);

  useEffect(() => {
    onCenterChangeRef.current = onCenterChange;
  }, [onCenterChange]);

  useEffect(() => {
    onZoomChangeRef.current = onZoomChange;
  }, [onZoomChange]);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let mapInstance;
    let handleMoveEnd;
    let handleZoomEnd;

    try {
      mapInstance = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        doubleClickZoom: false,
      });

      if (mapInstance.attributionControl?.setPosition) {
        mapInstance.attributionControl.setPosition("topleft");
      }

      L.tileLayer(tileUrl, {
        attribution: tileAttribution,
        maxZoom: 20,
      }).addTo(mapInstance);

      if (mapInstance.attributionControl?.setPrefix) {
        mapInstance.attributionControl.setPrefix("");
      }

      mapInstance.setView([lat, lng], zoom, { animate: false });

      handleMoveEnd = () => {
        const nextCenter = mapInstance.getCenter();
        onCenterChangeRef.current?.({
          lat: nextCenter.lat,
          lng: nextCenter.lng,
        });
      };
      handleZoomEnd = () => {
        const nextZoom = mapInstance.getZoom();
        onZoomChangeRef.current?.(nextZoom);
      };

      mapInstance.on("moveend", handleMoveEnd);
      mapInstance.on("zoomend", handleZoomEnd);
      mapRef.current = mapInstance;
      onReadyRef.current?.();
    } catch (error) {
      if (mapInstance) {
        mapInstance.remove();
      }
      mapRef.current = null;
      onErrorRef.current?.(error);
      return undefined;
    }

    return () => {
      mapInstance?.off("moveend", handleMoveEnd);
      mapInstance?.off("zoomend", handleZoomEnd);
      mapInstance?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !Number.isFinite(lat) || !Number.isFinite(lng)) return;
    const current = map.getCenter();
    const currentZoom = map.getZoom();
    const targetZoom = Number.isFinite(zoom) ? zoom : currentZoom;
    const centerChanged =
      Math.abs(current.lat - lat) >= 0.000001 ||
      Math.abs(current.lng - lng) >= 0.000001;
    const zoomChanged = Math.abs(currentZoom - targetZoom) >= 0.01;
    if (!centerChanged && !zoomChanged) return;
    map.setView([lat, lng], targetZoom, { animate: false });
  }, [lat, lng, zoom]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="h-full w-full" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-full">
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zm0-15a3 3 0 1 0 0 6a3 3 0 1 0 0-6z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}
