import { Bell, MapPin, Timer } from "lucide-react";

export default function HeaderActions({
  onToggleLocation,
  locationOpen = false,
  locationPanel,
  onToggleNotifications,
  notificationsOpen = false,
  notificationsPanel,
  onToggleQueue,
  queueOpen = false,
  queuePanel,
  notiCount = 0,
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <button
          type="button"
          onClick={onToggleLocation}
          className="h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
          aria-label="Mostrar ubicacion"
          aria-expanded={locationOpen}
        >
          <MapPin size={18} />
        </button>
        {locationPanel}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={onToggleNotifications}
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
        {notificationsPanel}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={onToggleQueue}
          className="h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
          aria-label="En cola"
          aria-expanded={queueOpen}
        >
          <Timer size={18} />
        </button>
        {queuePanel}
      </div>
    </div>
  );
}
