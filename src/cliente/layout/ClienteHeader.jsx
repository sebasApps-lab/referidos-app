import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, MapPin, Timer } from "lucide-react";
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
  const scrollDistanceRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const tier = getTierMeta(usuario);
  const displayName = getUserShortName(usuario);
  const notiCount =
    usuario?.notificaciones?.length || usuario?.notificacionesCount || 0;
  const safeAvatar = getAvatarSrc(usuario, avatarSrc);
  const locationLabel = "La Carolina";
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
    if (!locationOpen) return undefined;
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
      }
    };
    const captureOpts = { passive: true, capture: true };
    document.addEventListener("scroll", handleScroll, captureOpts);
    return () => {
      document.removeEventListener("scroll", handleScroll, captureOpts);
    };
  }, [locationOpen]);

  const headerClass = isElevated
    ? "relative bg-[#5E30A5] text-white shadow-md"
    : "relative bg-[#5E30A5] text-white shadow-none";

  return (
    <div id="cliente-header" className={headerClass}>
      <div className="max-w-6xl mx-auto px-4 pt-3 pb-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Link to="/cliente/perfil">
                <img
                  src={safeAvatar}
                  alt="avatar"
                  className="h-9 w-9 rounded-2xl border border-white/20 bg-white object-cover"
                />
                <span
                  className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-semibold"
                  style={{
                    background: tier.accent,
                    color: "white",
                  }}
                >
                  {tier.badge}
                </span>
              </Link>
            </div>

            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-2">
                <Link
                  to="/cliente/perfil"
                  className="text-sm font-semibold text-white"
                >
                  {displayName}
                </Link>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (!locationOpen) {
                        setLocationVisible(true);
                        setLocationOpen(true);
                      } else {
                        setLocationOpen(false);
                      }
                    }}
                    className="h-7 w-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label="Mostrar ubicacion"
                    aria-expanded={locationOpen}
                  >
                    <MapPin size={14} />
                  </button>
                  {locationVisible && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 mt-3 z-20">
                      <div
                        data-state={locationOpen ? "open" : "closed"}
                        className="location-popover"
                      >
                        <button
                          type="button"
                          onClick={() => {}}
                          className="location-surface"
                        >
                          <span
                            data-state={locationOpen ? "open" : "closed"}
                            className="location-text-reveal"
                          >
                            {locationLabel}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Notificaciones"
            >
              <Bell size={18} />
              {notiCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-white text-[#5E30A5] text-[10px] font-semibold flex items-center justify-center px-1">
                  {notiCount > 99 ? "99+" : notiCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onOpenMenu}
              className="h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="En cola"
            >
              <Timer size={18} />
            </button>
          </div>
        </div>
      </div>
      <div
        id="cliente-header-search-dock"
        className="absolute left-0 right-0 top-full z-40"
      />
    </div>
  );
}
