import React from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, Sparkles } from "lucide-react";
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
    <div
      className="border-b border-black/5 shadow-sm backdrop-blur"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/cliente/perfil" className="flex items-center gap-3">
            <div className="relative">
              <img
                src={safeAvatar}
                alt="avatar"
                className="h-11 w-11 rounded-2xl border border-white shadow-sm object-cover"
              />
              <span
                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-semibold"
                style={{
                  background: tier.accent,
                  color: "white",
                  boxShadow: `0 6px 16px ${tier.glow}`,
                }}
              >
                {tier.badge}
              </span>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.2em] text-black/45">
                Referidos
              </span>
              <span
                className="text-base font-semibold"
                style={{ color: "var(--cliente-ink)" }}
              >
                {displayName}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-black/50">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
                  style={{
                    background: `${tier.glow}66`,
                    color: tier.accent,
                    border: `1px solid ${tier.glow}`,
                  }}
                >
                  <Sparkles size={12} />
                  {tier.label}
                </span>
                <span className="text-[10px] text-black/40">
                  {referidos} referidos
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative h-10 w-10 rounded-2xl flex items-center justify-center border border-black/10 bg-white/80 text-black/70 shadow-sm transition hover:shadow-md"
              aria-label="Notificaciones"
            >
              <Bell size={18} />
              {notiCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-[#E07A5F] text-white text-[10px] font-semibold flex items-center justify-center px-1">
                  {notiCount > 99 ? "99+" : notiCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onOpenMenu}
              className="h-10 w-10 rounded-2xl flex items-center justify-center border border-black/10 bg-white/80 text-black/70 shadow-sm transition hover:shadow-md"
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
