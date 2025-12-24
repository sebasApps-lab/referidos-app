import React, { useEffect, useState } from "react";
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
}) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
  const tier = getTierMeta(usuario);
  const displayName = getUserShortName(usuario);
  const notiCount =
    usuario?.notificaciones?.length || usuario?.notificacionesCount || 0;
  const safeAvatar = getAvatarSrc(usuario, avatarSrc);
  const locationLabel = "La Carolina";

  useEffect(() => {
    if (locationOpen) return;
    if (!locationVisible) return;
<<<<<<< HEAD
    const id = setTimeout(() => setLocationVisible(false), 180);
=======
    const id = setTimeout(() => setLocationVisible(false), 240);
>>>>>>> refactor-ui
    return () => clearTimeout(id);
  }, [locationOpen, locationVisible]);

  return (
    <div className="bg-[#5E30A5] text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 pt-3 pb-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Link to="/cliente/perfil">
                <img
                  src={safeAvatar}
                  alt="avatar"
                  className="h-11 w-11 rounded-2xl border border-white/20 bg-white object-cover"
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
<<<<<<< HEAD
                    <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 z-20">
                      <button
                        type="button"
                        onClick={() => {}}
                        data-state={locationOpen ? "open" : "closed"}
                        className="location-popover inline-flex items-center whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
                      >
                        <span
                          data-state={locationOpen ? "open" : "closed"}
                          className="location-text-reveal"
                        >
                          {locationLabel}
                        </span>
                      </button>
=======
                    <div className="absolute left-1/2 top-full -translate-x-1/2 mt-1 z-20">
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
>>>>>>> refactor-ui
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
    </div>
  );
}
