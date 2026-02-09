import { useEffect, useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { subscribeErrorEvents } from "../../services/loggingClient";

const DEDUPE_WINDOW_MS = 60_000;

function toEventKey(event = {}) {
  return `${event.code || "unknown"}|${event.route || "-"}|${event.fingerprint || "-"}`;
}

function formatNow() {
  return new Date().toLocaleString("es-EC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function AdminRuntimeErrorModalHost() {
  const [queue, setQueue] = useState([]);
  const [lastByKey, setLastByKey] = useState({});

  useEffect(() => {
    const unsubscribe = subscribeErrorEvents((event) => {
      const key = toEventKey(event);
      const now = Date.now();
      setLastByKey((current) => {
        const lastAt = current[key] || 0;
        if (now - lastAt < DEDUPE_WINDOW_MS) {
          return current;
        }
        setQueue((items) => [
          ...items,
          {
            id: `${key}:${now}`,
            at: formatNow(),
            code: event?.code || "unknown_error",
            route: event?.route || event?.context?.route || "-",
            message: event?.message || "Error sin mensaje",
            requestId: event?.context?.request_id || "-",
            traceId: event?.context?.trace_id || "-",
            fingerprint: event?.fingerprint || "-",
            source: event?.context?.source || event?.source || "web",
          },
        ]);
        return { ...current, [key]: now };
      });
    });

    return () => unsubscribe?.();
  }, []);

  const current = useMemo(() => queue[0] || null, [queue]);
  if (!current) return null;

  const close = () => {
    setQueue((items) => items.slice(1));
  };

  return (
    <div className="fixed inset-0 z-[12000] flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-red-100 bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600" />
            <h3 className="text-base font-bold text-red-700">Runtime error detectado</h3>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700"
          >
            X
          </button>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          <div><span className="font-semibold">Hora:</span> {current.at}</div>
          <div><span className="font-semibold">Code:</span> {current.code}</div>
          <div><span className="font-semibold">Route:</span> {current.route}</div>
          <div><span className="font-semibold">Source:</span> {current.source}</div>
          <div><span className="font-semibold">Request ID:</span> {current.requestId}</div>
          <div><span className="font-semibold">Trace ID:</span> {current.traceId}</div>
        </div>

        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
          <div className="font-semibold">Mensaje</div>
          <div className="mt-1 whitespace-pre-wrap break-words">{current.message}</div>
          <div className="mt-2 text-[11px] text-slate-500">
            fingerprint: {current.fingerprint}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={close}
            className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

