export default function NotificationsPanel({ notifications = [] }) {
  return (
    <div className="header-panel-surface">
      <div className="header-panel-body text-white">
        {notifications.length === 0 ? (
          <div className="text-sm text-white/80">
            No tienes notificaciones nuevas.
          </div>
        ) : (
          <ul className="space-y-2 text-sm text-white/90 header-panel-list">
            {notifications.map((item, index) => {
              const title =
                typeof item === "string"
                  ? item
                  : item?.title || item?.text || "Notificacion";
              const key = item?.id || `${title}-${index}`;
              return (
                <li
                  key={key}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2"
                >
                  <span>{title}</span>
                  <button
                    type="button"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70"
                  >
                    Marcar
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <button
          type="button"
          className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
        >
          Ver todas
        </button>
      </div>
    </div>
  );
}
