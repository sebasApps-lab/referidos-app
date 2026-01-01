import React, { useEffect, useRef, useState } from "react";
import {
  HeaderPanelContainer,
  LocationPanel,
  NotificationsPanel,
  QueuePanel,
} from "../../components/header-panels";
import { ChevronLeft, LogOut } from "lucide-react";
import {
  HeaderActions,
  TabTitle,
  UserIdentity,
} from "../../components/header-elements";
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
  onLogout,
  isElevated = false,
}) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [queueVisible, setQueueVisible] = useState(false);
  const { mode, onSearchBack, profileDockOpen } = useClienteHeader();
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
    if (notificationsOpen) return;
    if (!notificationsVisible) return;
    const id = setTimeout(() => setNotificationsVisible(false), 240);
    return () => clearTimeout(id);
  }, [notificationsOpen, notificationsVisible]);

  useEffect(() => {
    if (queueOpen) return;
    if (!queueVisible) return;
    const id = setTimeout(() => setQueueVisible(false), 240);
    return () => clearTimeout(id);
  }, [queueOpen, queueVisible]);

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
    setNotificationsVisible(false);
    setQueueOpen(false);
    setQueueVisible(false);
  }, [mode]);

  const profileRounded = mode === "profile" && !profileDockOpen;
  const headerClass = `${isElevated ? "shadow-md" : "shadow-none"} relative bg-[#5E30A5] text-white transition-[border-radius] duration-250${
    profileRounded ? " rounded-b-lg" : ""
  }`;

  return (
    <div id="cliente-header" className={headerClass}>
      {mode === "search" ? (
        <SearchHeader title="Qrew" onBack={onSearchBack} />
      ) : mode === "profile" ? (
        <div className="max-w-6xl mx-auto px-4 pt-3 pb-2">
          <TabTitle
            title="Configuracion"
            action={
              <button
                type="button"
                aria-label="Cerrar sesion"
                onClick={onLogout}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <LogOut size={18} />
              </button>
            }
          />
          {onSearchBack ? (
            <button
              type="button"
              onClick={onSearchBack}
              aria-label="Volver"
              className="absolute left-4 top-3 h-10 w-10 inline-flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <ChevronLeft size={20} />
            </button>
          ) : null}
        </div>
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
                if (!notificationsOpen) {
                  setNotificationsVisible(true);
                  setNotificationsOpen(true);
                } else {
                  setNotificationsOpen(false);
                }
                if (typeof onOpenNotifications === "function") {
                  onOpenNotifications();
                }
              }}
              notificationsOpen={notificationsOpen}
              notificationsPanel={
                notificationsVisible ? (
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
                ) : null
              }
              onToggleQueue={() => {
                setLocationOpen(false);
                setNotificationsOpen(false);
                if (!queueOpen) {
                  setQueueVisible(true);
                  setQueueOpen(true);
                } else {
                  setQueueOpen(false);
                }
              }}
              queueOpen={queueOpen}
              queuePanel={
                queueVisible ? (
                  <HeaderPanelContainer
                    open={queueOpen}
                    wrapperClassName="header-panel-anchor"
                    panelClassName="hero-search-dock"
                    panelProps={{ "aria-hidden": !queueOpen }}
                  >
                    <QueuePanel />
                  </HeaderPanelContainer>
                ) : null
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
