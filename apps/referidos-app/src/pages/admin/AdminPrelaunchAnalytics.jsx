import React, { useMemo, useState } from "react";
import AdminLayout from "../../admin/layout/AdminLayout";
import PrelaunchAnalyticsPanel from "../../admin/prelaunch/PrelaunchAnalyticsPanel";
import useOpsTelemetryHotSync from "../../admin/ops/useOpsTelemetryHotSync";
import { useAppStore } from "../../store/appStore";

const ANALYTICS_TABS = [
  {
    id: "prelaunch_web",
    label: "Prelaunch Web",
    enabled: true,
    subtitle: "Metricas de sesiones, waitlist, tickets anonimos y riesgo",
  },
  {
    id: "pwa",
    label: "PWA",
    enabled: false,
    subtitle: "Pendiente de habilitacion",
  },
  {
    id: "android",
    label: "Android",
    enabled: false,
    subtitle: "Pendiente de habilitacion",
  },
];

export default function AdminPrelaunchAnalytics() {
  const role = useAppStore((s) => s.usuario?.role || "");
  const [activeTab, setActiveTab] = useState("prelaunch_web");

  useOpsTelemetryHotSync({
    enabled: role === "admin" || role === "soporte",
    panelKey: "admin_analytics",
  });

  const activeConfig = useMemo(
    () => ANALYTICS_TABS.find((item) => item.id === activeTab) || ANALYTICS_TABS[0],
    [activeTab]
  );

  const handleTabChange = (tabId, enabled) => {
    if (!enabled) return;
    setActiveTab(tabId);
  };

  return (
    <AdminLayout
      title="Analytics"
      subtitle={activeConfig.subtitle}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#E9E2F7] bg-white p-2 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {ANALYTICS_TABS.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  disabled={!tab.enabled}
                  onClick={() => handleTabChange(tab.id, tab.enabled)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#F0EBFF] text-[#5E30A5]"
                      : tab.enabled
                      ? "text-slate-600 hover:bg-[#F7F4FF]"
                      : "cursor-not-allowed text-slate-400"
                  }`}
                >
                  {tab.label}
                  {!tab.enabled ? " (proximamente)" : ""}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "prelaunch_web" ? (
          <PrelaunchAnalyticsPanel />
        ) : (
          <div className="rounded-2xl border border-dashed border-[#E9E2F7] bg-white p-6 text-sm text-slate-500 shadow-sm">
            Este panel se habilitara cuando el canal tenga ingest de analytics activo.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

