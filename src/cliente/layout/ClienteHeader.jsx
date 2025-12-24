import React from "react";
import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import {
  getAvatarSrc,
  getTierMeta,
  getUserShortName,
  formatCompactNumber,
} from "../services/clienteUI";

export default function ClienteHeader({
  usuario,
  avatarSrc,
  onOpenMenu,
  onOpenNotifications,
}) {
  const tier = getTierMeta(usuario);
  const displayName = getUserShortName(usuario);
  const notiCount =
    usuario?.notificaciones?.length || usuario?.notificacionesCount || 0;
  const safeAvatar = getAvatarSrc(usuario, avatarSrc);
  const referidos = formatCompactNumber(usuario?.referidosCount || 0);

  return (
    <div className="border-b border-[#E9E2F7] bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/cliente/perfil" className="flex items-center gap-3">
            <div className="relative">
              <img
                src={safeAvatar}
                alt="avatar"
                className="h-11 w-11 rounded-2xl border border-[#E9E2F7] bg-white object-cover"
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
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E30A5]/70">
                Referidos
              </span>
              <span className="text-base font-semibold text-[#2F1A55]">
                {displayName}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[#5E30A5]"
                  style={{ background: "#F3EEFF" }}
                >
                  {tier.label}
                </span>
                <span className="text-[10px] text-slate-400">
                  {referidos} referidos
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative h-10 w-10 rounded-2xl flex items-center justify-center border border-[#E9E2F7] bg-white text-[#5E30A5] shadow-sm transition hover:border-[#5E30A5]/40"
              aria-label="Notificaciones"
            >
              <Bell size={18} />
              {notiCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-[#5E30A5] text-white text-[10px] font-semibold flex items-center justify-center px-1">
                  {notiCount > 99 ? "99+" : notiCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onOpenMenu}
              className="h-10 w-10 rounded-2xl flex items-center justify-center border border-[#E9E2F7] bg-white text-[#5E30A5] shadow-sm transition hover:border-[#5E30A5]/40"
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
