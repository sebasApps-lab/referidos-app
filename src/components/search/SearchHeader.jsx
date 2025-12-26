import { ArrowLeft } from "lucide-react";

export default function SearchHeader({ title = "REFERIDOS", onBack }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-3 pb-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-10 w-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition"
          aria-label="Volver"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-semibold tracking-[0.24em] text-white">
          {title}
        </span>
      </div>
    </div>
  );
}
