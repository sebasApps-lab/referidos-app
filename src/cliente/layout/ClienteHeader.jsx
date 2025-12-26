import React, { useEffect, useRef, useState } from "react";
import {
  HeaderPanelContainer,
  LocationPanel,
  NotificationsPanel,
  QueuePanel,
} from "../../components/header-panels";
import { HeaderActions, UserIdentity } from "../../components/header-elements";
import SearchHeader from "../../components/search/SearchHeader";
import { useClienteHeader } from "./ClienteHeaderContext";
import {
  getAvatarSrc,
  getTierMeta,
  getUserShortName,
} from "../services/clienteUI";

export default function ClienteHeader({
  usuario,
  avatarSrc,
  onOpenMenu,
  onOpenNotifications,
  isElevated = false,
}) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const { mode, onSearchBack } = useClienteHeader();
  const scrollDistanceRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const tier = getTierMeta(usuario);
  const displayName = getUserShortName(usuario);
  const notiCount =
    usuario?.notificaciones?.length || usuario?.notificacionesCount || 0;
  const safeAvatar = getAvatarSrc(usuario, avatarSrc);
  const scrollCloseThreshold = 38;

  const getScrollTop = (target) => {
    if (target && typeof target.scrollTop === "number") {
      return target.scrollTop;
    }
    return document.scrollingElement?.scrollTop || window.scrollY || 0;
  };

  useEffect(() => {
    if (locationOpen) return;
    if (!locationVisible) return;
    const id = setTimeout(() => setLocationVisible(false), 240);
    return () => clearTimeout(id);
  }, [locationOpen, locationVisible]);

  useEffect(() => {
    if (!locationOpen && !notificationsOpen && !queueOpen) return undefined;
    scrollDistanceRef.current = 0;
    lastScrollTopRef.current = getScrollTop(document.scrollingElement);
    const handleScroll = (event) => {
      const current = getScrollTop(event.target);
      const delta = current - lastScrollTopRef.current;
      lastScrollTopRef.current = current;
      if (!Number.isFinite(delta)) return;
      scrollDistanceRef.current += Math.abs(delta);
      if (scrollDistanceRef.current >= scrollCloseThreshold) {
        setLocationOpen(false);
        setNotificationsOpen(false);
        setQueueOpen(false);
      }
    };
    const captureOpts = { passive: true, capture: true };
    document.addEventListener("scroll", handleScroll, captureOpts);
    return () => {
      document.removeEventListener("scroll", handleScroll, captureOpts);
    };
  }, [locationOpen, notificationsOpen, queueOpen]);

  useEffect(() => {
    if (mode !== "search") return;
    setLocationOpen(false);
    setLocationVisible(false);
    setNotificationsOpen(false);
    setQueueOpen(false);
  }, [mode]);

  const headerClass = isElevated
    ? "relative bg-[#5E30A5] text-white shadow-md"
    : "relative bg-[#5E30A5] text-white shadow-none";

  return (
    <div id="cliente-header" className={headerClass}>
      {mode === "search" ? (
        <SearchHeader title="Qrew" onBack={onSearchBack} />
      ) : (
        <div className="max-w-6xl mx-auto px-4 pt-3 pb-2">
          <div className="flex items-center justify-between gap-4">
            <UserIdentity
              avatarSrc={safeAvatar}
              tier={tier}
              displayName={displayName}
            />

            <HeaderActions
              onToggleLocation={() => {
                setNotificationsOpen(false);
                setQueueOpen(false);
                if (!locationOpen) {
                  setLocationVisible(true);
                  setLocationOpen(true);
                } else {
                  setLocationOpen(false);
                }
              }}
              locationOpen={locationOpen}
              locationPanel={
                locationVisible ? (
                  <HeaderPanelContainer
                    open={locationOpen}
                    wrapperClassName="header-panel-anchor"
                    panelClassName="hero-search-dock"
                    panelProps={{ "aria-hidden": !locationOpen }}
                  >
                    <LocationPanel open={locationOpen} />
                  </HeaderPanelContainer>
                ) : null
              }
              onToggleNotifications={() => {
                setLocationOpen(false);
                setQueueOpen(false);
                setNotificationsOpen((prev) => !prev);
                if (typeof onOpenNotifications === "function") {
                  onOpenNotifications();
                }
              }}
              notificationsOpen={notificationsOpen}
              notificationsPanel={
                <HeaderPanelContainer
                  open={notificationsOpen}
                  wrapperClassName="header-panel-anchor"
                  panelClassName="hero-search-dock"
                  panelProps={{ "aria-hidden": !notificationsOpen }}
                >
                  <NotificationsPanel
                    notifications={usuario?.notificaciones || []}
                  />
                </HeaderPanelContainer>
              }
              onToggleQueue={() => {
                setLocationOpen(false);
                setNotificationsOpen(false);
                setQueueOpen((prev) => !prev);
              }}
              queueOpen={queueOpen}
              queuePanel={
                <HeaderPanelContainer
                  open={queueOpen}
                  wrapperClassName="header-panel-anchor"
                  panelClassName="hero-search-dock"
                  panelProps={{ "aria-hidden": !queueOpen }}
                >
                  <QueuePanel />
                </HeaderPanelContainer>
              }
              notiCount={notiCount}
            />
          </div>
        </div>
      )}
      <div
        id="cliente-header-search-dock"
        className="absolute left-0 right-0 top-full z-40"
      />
    </div>
  );
}
