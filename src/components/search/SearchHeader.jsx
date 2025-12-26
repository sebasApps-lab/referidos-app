import { ArrowLeft } from "lucide-react";

export default function SearchHeader({ title = "Qrew", onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-3 pt-3 pb-2">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={onBack}
          className="h-10 w-10 -ml-1 rounded-full flex items-center justify-center text-white/90 bg-white/15 hover:text-white hover:bg-white/20 transition"
          aria-label="Volver"
        >
          <ArrowLeft size={17} />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 search-header-logo">
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
      </div>
    </div>
  );
}
