import { useCallback, useEffect, useRef, useState } from "react";
import { useModal } from "../../modals/useModal";
import { saveGpsFallbackLocation } from "../../services/gpsFallbackClient";

export default function useLocationStep({
  stage,
  coords,
  direccionPayload,
  setCoords,
  setCoordsSource,
  setMapZoom,
  updateDireccionPayload,
  programmaticMoveRef,
  programmaticZoomRef,
  closeZoom,
  locationTitle,
}) {
  const { openModal, closeModal, activeModal } = useModal();
  const [permissionState, setPermissionState] = useState("prompt");
  const [geoAttempted, setGeoAttempted] = useState(false);
  const [geoErrorCode, setGeoErrorCode] = useState(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const didAutoLocateRef = useRef(false);
  const didPromptLocationRef = useRef(false);
  const didDeniedLocationRef = useRef(false);
  const updateDireccionPayloadRef = useRef(updateDireccionPayload);

  useEffect(() => {
    updateDireccionPayloadRef.current = updateDireccionPayload;
  }, [updateDireccionPayload]);

  const closeLocationModal = useCallback(() => {
    if (activeModal === "LocationPermission") {
      closeModal();
    }
  }, [activeModal, closeModal]);

  const closeLocationDeniedModal = useCallback(() => {
    if (activeModal === "LocationDenied") {
      closeModal();
    }
  }, [activeModal, closeModal]);

  const closeLocationUnavailableModal = useCallback(() => {
    if (activeModal === "LocationUnavailable") {
      closeModal();
    }
  }, [activeModal, closeModal]);

  const requestLocation = useCallback(() => {
    if (!navigator?.geolocation) {
      return;
    }
    if (isRequestingLocation) return;
    setIsRequestingLocation(true);
    setGeoAttempted(true);
    setGeoErrorCode(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        programmaticMoveRef.current = true;
        setCoords(nextCenter);
        setCoordsSource("gps");
        programmaticZoomRef.current = true;
        setMapZoom(closeZoom);
        updateDireccionPayloadRef.current?.({
          lat: nextCenter.lat,
          lng: nextCenter.lng,
        });
        saveGpsFallbackLocation(nextCenter).catch(() => {});
        setIsRequestingLocation(false);
      },
      (error) => {
        setIsRequestingLocation(false);
        const code = error?.code ?? null;
        setGeoErrorCode(code);
        if (code === 1) {
          setPermissionState("denied");
          openModal("LocationDenied");
          return;
        }
        if (code === 2 || code === 3) {
          openModal("LocationUnavailable", {
            onRetry: () => requestLocation(),
          });
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [
    closeZoom,
    isRequestingLocation,
    openModal,
    programmaticMoveRef,
    programmaticZoomRef,
    setCoords,
    setCoordsSource,
    setMapZoom,
  ]);

  useEffect(() => {
    let active = true;
    if (!navigator?.geolocation) {
      return undefined;
    }

    const checkPermission = async () => {
      if (stage !== "map") return;
      if (!navigator.permissions?.query) {
        return;
      }
      try {
        const status = await navigator.permissions.query({
          name: "geolocation",
        });
        if (!active) return;
        const handlePermissionState = (state) => {
          setPermissionState(state);
          if (state === "granted") {
            closeLocationModal();
            closeLocationDeniedModal();
            if (!didAutoLocateRef.current) {
              const hasCoords =
                coords ||
                (direccionPayload?.lat != null && direccionPayload?.lng != null);
              if (!hasCoords) {
                didAutoLocateRef.current = true;
                requestLocation();
              }
            }
            return;
          }
          if (state === "denied") {
            closeLocationModal();
            if (!didDeniedLocationRef.current) {
              didDeniedLocationRef.current = true;
              openModal("LocationDenied");
            }
            return;
          }
          closeLocationDeniedModal();
          if (!didPromptLocationRef.current) {
            didPromptLocationRef.current = true;
            openModal("LocationPermission", {
              onConfirm: () => requestLocation(),
              title: locationTitle,
            });
          }
        };

        handlePermissionState(status.state);
        status.onchange = () => {
          if (!active) return;
          handlePermissionState(status.state);
        };
      } catch (error) {
        return;
      }
    };

    checkPermission();
    return () => {
      active = false;
    };
  }, [
    closeLocationDeniedModal,
    closeLocationModal,
    coords,
    direccionPayload?.lat,
    direccionPayload?.lng,
    openModal,
    requestLocation,
    stage,
  ]);

  useEffect(() => {
    if (stage !== "map") {
      closeLocationModal();
      closeLocationDeniedModal();
      closeLocationUnavailableModal();
    }
  }, [
    closeLocationDeniedModal,
    closeLocationModal,
    closeLocationUnavailableModal,
    stage,
  ]);

  return {
    requestLocation,
    permissionState,
    geoAttempted,
    geoErrorCode,
  };
}
