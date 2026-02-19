import { useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_HOT_INTERVAL_MS = 60_000;

export default function useOpsTelemetryHotSync({
  enabled = false,
  panelKey = "unknown",
  intervalMs = DEFAULT_HOT_INTERVAL_MS,
} = {}) {
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;

    let disposed = false;

    const runSync = async (force = false) => {
      if (disposed || inFlightRef.current) return;
      if (
        !force &&
        typeof document !== "undefined" &&
        document.visibilityState !== "visible"
      ) {
        return;
      }

      inFlightRef.current = true;
      try {
        await supabase.functions.invoke("ops-telemetry-sync-dispatch", {
          body: {
            mode: "hot",
            panel_key: panelKey,
          },
        });
      } catch {
        // Silent fail: this sync is best-effort and should not bloquear la UI.
      } finally {
        inFlightRef.current = false;
      }
    };

    void runSync(true);

    const timer = globalThis.setInterval(() => {
      void runSync(false);
    }, Math.max(15_000, Number(intervalMs) || DEFAULT_HOT_INTERVAL_MS));

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void runSync(true);
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibility);
    }

    return () => {
      disposed = true;
      globalThis.clearInterval(timer);
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibility);
      }
    };
  }, [enabled, intervalMs, panelKey]);
}
