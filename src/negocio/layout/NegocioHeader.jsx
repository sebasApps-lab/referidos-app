import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  HelpCircle,
  LogOut,
  Menu,
} from "lucide-react";
import {
  HeaderPanelContainer,
  NotificationsPanel,
} from "../../layouts/header-panels";
import { TabTitle } from "../../layouts/header-elements";
import SearchHeader from "../../components/search/SearchHeader";
import { useNegocioHeader } from "./NegocioHeaderContext";
import {
  getAvatarSrc,
  getNegocioPlanMeta,
  getUserShortName,
} from "../services/negocioUI";

function QrewLogo({ title = "Qrew" }) {
  return (
    <div className="search-header-logo">
      <svg width="120" height="36" viewBox="0 0 120 36" role="img">
        <title>{title}</title>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="search-header-logo-shadow"
        >
          {title}
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="search-header-logo-text"
        >
          {title}
        </text>
      </svg>
    </div>
  );
}

export default function NegocioHeader({
  usuario,
  avatarSrc,
  onOpenMenu,
  onOpenNotifications,
  onLogout,
  isElevated = false,
}) {
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportVisible, setSupportVisible] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const { mode, onSearchBack, profileDockOpen, profileTitle } =
    useNegocioHeader();
  const scrollDistanceRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const notiCount =
    usuario?.notificaciones?.length || usuario?.notificacionesCount || 0;
  const safeAvatar = getAvatarSrc(usuario, avatarSrc);
  const planMeta = getNegocioPlanMeta({ usuario });
  const displayName = getUserShortName(usuario);
  const scrollCloseThreshold = 38;

  const getScrollTop = (target) => {
    if (target && typeof target.scrollTop === "number") {
      return target.scrollTop;
    }
    return document.scrollingElement?.scrollTop || window.scrollY || 0;
  };

  useEffect(() => {
    if (supportOpen) return;
    if (!supportVisible) return;
    const id = setTimeout(() => setSupportVisible(false), 240);
    return () => clearTimeout(id);
  }, [supportOpen, supportVisible]);

  useEffect(() => {
    if (notificationsOpen) return;
    if (!notificationsVisible) return;
    const id = setTimeout(() => setNotificationsVisible(false), 240);
    return () => clearTimeout(id);
  }, [notificationsOpen, notificationsVisible]);

  useEffect(() => {
    if (!supportOpen && !notificationsOpen) return undefined;
    scrollDistanceRef.current = 0;
    lastScrollTopRef.current = getScrollTop(document.scrollingElement);
    const handleScroll = (event) => {
      const current = getScrollTop(event.target);
      const delta = current - lastScrollTopRef.current;
      lastScrollTopRef.current = current;
      if (!Number.isFinite(delta)) return;
      scrollDistanceRef.current += Math.abs(delta);
      if (scrollDistanceRef.current >= scrollCloseThreshold) {
        setSupportOpen(false);
        setNotificationsOpen(false);
      }
    };
    const captureOpts = { passive: true, capture: true };
    document.addEventListener("scroll", handleScroll, captureOpts);
    return () => {
      document.removeEventListener("scroll", handleScroll, captureOpts);
    };
  }, [notificationsOpen, supportOpen]);

  useEffect(() => {
    if (mode !== "search") return;
    setSupportOpen(false);
    setSupportVisible(false);
    setNotificationsOpen(false);
    setNotificationsVisible(false);
  }, [mode]);

  const profileRounded = mode === "profile" && !profileDockOpen;
  const headerClass = `${isElevated ? "shadow-md" : "shadow-none"} relative text-white${
    profileRounded ? " profile-header-rounded" : ""
  }`;
  const headerSurfaceClass = `relative z-10 bg-[#5E30A5] transition-[border-radius] duration-250${
    profileRounded ? " rounded-b-lg" : ""
  }`;

  return (
    <div id="negocio-header" className={headerClass}>
      <div className={headerSurfaceClass}>
        {mode === "search" ? (
          <SearchHeader title="Qrew" onBack={onSearchBack} />
        ) : mode === "profile" ? (
          <div className="max-w-6xl mx-auto px-4 pt-3 pb-2">
            <TabTitle
              title={profileTitle || "Configuracion"}
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
              <button
                type="button"
                onClick={onOpenMenu}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full text-white/85 hover:text-white hover:bg-white/10 transition"
                aria-label="Abrir menu"
              >
                <Menu size={20} />
              </button>

              <div className="flex-1 flex justify-center">
                <QrewLogo />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(false);
                      if (!supportOpen) {
                        setSupportVisible(true);
                        setSupportOpen(true);
                      } else {
                        setSupportOpen(false);
                      }
                    }}
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label="Soporte"
                    aria-expanded={supportOpen}
                  >
                    <HelpCircle size={18} />
                  </button>
                  {supportVisible ? (
                    <HeaderPanelContainer
                      open={supportOpen}
                      wrapperClassName="header-panel-anchor"
                      panelClassName="hero-search-dock"
                      panelProps={{ "aria-hidden": !supportOpen }}
                    >
                      <div className="header-panel-surface">
                        <div className="header-panel-body text-white">
                          <p className="text-sm text-white/85">
                            Necesitas ayuda?
                          </p>
                          <Link
                            to="/negocio/perfil"
                            className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
                          >
                            Ir a soporte
                          </Link>
                        </div>
                      </div>
                    </HeaderPanelContainer>
                  ) : null}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSupportOpen(false);
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
                    className="relative h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label="Notificaciones"
                    aria-expanded={notificationsOpen}
                  >
                    <Bell size={18} />
                    {notiCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-white text-[#5E30A5] text-[10px] font-semibold flex items-center justify-center px-1">
                        {notiCount > 99 ? "99+" : notiCount}
                      </span>
                    )}
                  </button>
                  {notificationsVisible ? (
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
                  ) : null}
                </div>
                <Link
                  to="/negocio/perfil"
                  className="relative h-10 w-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden"
                  aria-label={`Perfil de ${displayName}`}
                >
                  {safeAvatar ? (
                    <img
                      src={safeAvatar}
                      alt={`Avatar de ${displayName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-white">
                      {displayName?.[0]?.toUpperCase() || "N"}
                    </span>
                  )}
                  <span
                    className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-semibold"
                    style={{ background: planMeta.accent, color: "white" }}
                  >
                    {planMeta.badge}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        id="negocio-header-search-dock"
        className={`absolute left-0 right-0 top-full z-40 ${
          mode === "profile" ? "profile-header-dock" : ""
        }`}
      />
    </div>
  );
}
