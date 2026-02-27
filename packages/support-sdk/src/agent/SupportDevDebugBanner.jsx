import React, { useEffect, useMemo, useState } from "react";

const MAX_ITEMS = 10;
const STORAGE_KEY = "support-dev-debug:last-events";

function formatNow() {
  return new Date().toLocaleTimeString("es-EC", {
    hour12: false,
  });
}

export default function SupportDevDebugBanner({ scope = "support" }) {
  const enabled = Boolean(import.meta.env.DEV);
  const [items, setItems] = useState(() => {
    if (!enabled) return [];
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
    } catch {
      return [];
    }
  });

  const push = useMemo(
    () => (type, detail = "") => {
      if (!enabled) return;
      const line = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        ts: formatNow(),
        type,
        detail: detail ? String(detail) : "",
      };

      // Console trace survives unload/navigation better than UI updates.
      console.debug(`[support-dev-debug][${scope}] ${line.type}`, line.detail);

      let persisted = false;
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        const prev = raw ? JSON.parse(raw) : [];
        const safePrev = Array.isArray(prev) ? prev : [];
        const next = [line, ...safePrev].slice(0, MAX_ITEMS);
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        persisted = true;
      } catch {
        // no-op
      }

      setItems((prev) => {
        const next = [line, ...prev].slice(0, MAX_ITEMS);
        if (persisted) return next;
        try {
          window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // no-op
        }
        return next;
      });
    },
    [enabled, scope]
  );

  useEffect(() => {
    if (!enabled) return undefined;

    push("mount", `${window.location.pathname}${window.location.search}`);
    push("wasDiscarded", String(Boolean(document.wasDiscarded)));
    const navEntry = performance.getEntriesByType("navigation")?.[0];
    if (navEntry?.type) {
      push("navigation", navEntry.type);
    }

    const onFocus = () => push("focus");
    const onBlur = () => push("blur");
    const onVisibility = () => push("visibility", document.visibilityState);
    const onPageShow = (event) => push("pageshow", `persisted=${Boolean(event.persisted)}`);
    const onPageHide = (event) => push("pagehide", `persisted=${Boolean(event.persisted)}`);
    const onBeforeUnload = () => push("beforeunload");
    const onOnline = () => push("online");
    const onOffline = () => push("offline");
    const onError = (event) => push("error", event?.message || "unknown");
    const onUnhandled = (event) => push("unhandledrejection", event?.reason || "unknown");

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandled);

    let cleanupHot = () => {};
    if (import.meta.hot?.on) {
      const onBeforeUpdate = () => push("hmr", "beforeUpdate");
      const onAfterUpdate = () => push("hmr", "afterUpdate");
      const onBeforeFullReload = (payload) =>
        push("hmr", `beforeFullReload ${payload?.path || ""}`.trim());
      const onInvalidate = (payload) =>
        push("hmr", `invalidate ${payload?.path || ""}`.trim());
      const onErrorHot = (payload) => push("hmr_error", payload?.err?.message || "unknown");

      import.meta.hot.on("vite:beforeUpdate", onBeforeUpdate);
      import.meta.hot.on("vite:afterUpdate", onAfterUpdate);
      import.meta.hot.on("vite:beforeFullReload", onBeforeFullReload);
      import.meta.hot.on("vite:invalidate", onInvalidate);
      import.meta.hot.on("vite:error", onErrorHot);

      cleanupHot = () => {
        if (!import.meta.hot?.off) return;
        import.meta.hot.off("vite:beforeUpdate", onBeforeUpdate);
        import.meta.hot.off("vite:afterUpdate", onAfterUpdate);
        import.meta.hot.off("vite:beforeFullReload", onBeforeFullReload);
        import.meta.hot.off("vite:invalidate", onInvalidate);
        import.meta.hot.off("vite:error", onErrorHot);
      };
    }

    return () => {
      cleanupHot();
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandled);
    };
  }, [enabled, push]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-3 right-3 z-[9999] w-[360px] rounded-xl border border-[#d9d2ea] bg-white/95 p-3 text-[10px] text-slate-700 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-semibold text-[#5E30A5]">Debug {scope}</div>
        <button
          type="button"
          onClick={() => {
            setItems([]);
            try {
              window.sessionStorage.removeItem(STORAGE_KEY);
            } catch {
              // no-op
            }
          }}
          className="rounded border border-[#e5def3] px-2 py-0.5 text-[10px] font-semibold text-slate-500"
        >
          Limpiar
        </button>
      </div>
      <div className="max-h-48 space-y-1 overflow-auto">
        {items.length === 0 ? (
          <div className="text-slate-400">Sin eventos</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded bg-[#f7f4ff] px-2 py-1">
              <span className="font-semibold text-[#2F1A55]">{item.ts}</span>{" "}
              <span>{item.type}</span>
              {item.detail ? <span className="text-slate-500"> - {item.detail}</span> : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
