import { Pencil } from "lucide-react";
import Badge from "../ui/Badge";

export default function LocationPanel({
  locations,
  open,
  onEditLocation,
  onViewAll,
}) {
  const fallbackLocations = [
    { id: "home", name: "Casa" },
    { id: "work", name: "Trabajo" },
  ];
  const safeLocations =
    Array.isArray(locations) && locations.length > 0
      ? locations
      : fallbackLocations;

  return (
    <div className="location-surface">
      <div
        data-state={open ? "open" : "closed"}
        className="location-text-reveal header-panel-body"
      >
        <ul className="space-y-2 header-panel-list">
          {safeLocations.map((loc) => (
            <li
              key={loc.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2"
            >
              <Badge className="border border-white/20 bg-white/10 text-white/90">
                {loc.name}
              </Badge>
              <button
                type="button"
                onClick={() => onEditLocation?.(loc)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label={`Editar ${loc.name}`}
              >
                <Pencil size={14} />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onViewAll?.()}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
        >
          Ver todas
        </button>
      </div>
    </div>
  );
}
