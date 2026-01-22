import React, { useLayoutEffect, useMemo, useState } from "react";
import { BarChart3, MonitorSmartphone, ShieldCheck, Users } from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useNegocioHeader } from "../layout/NegocioHeaderContext";
import { useCacheStore } from "../../cache/cacheStore";
import { CACHE_KEYS } from "../../cache/cacheKeys";
import GestionarTabs from "../gestionar/GestionarTabs";
import GestionarPanel from "../gestionar/GestionarPanel";
import Metricas from "../gestionar/sections/Metricas";
import Dispositivos from "../gestionar/sections/Dispositivos";
import Grupos from "../gestionar/sections/Grupos";
import Seguridad from "../gestionar/sections/Seguridad";

export default function NegocioGestionarBase() {
  const onboarding = useAppStore((s) => s.onboarding);
  const { setHeaderOptions } = useNegocioHeader();
  const isActive = useCacheStore(
    (state) => state.activeKeys.negocio === CACHE_KEYS.NEGOCIO_GESTIONAR
  );
  const negocioNombre = onboarding?.negocio?.nombre || "Tu negocio";
  const [activeId, setActiveId] = useState("metricas");

  const tabs = useMemo(
    () => [
      { id: "metricas", label: "Metricas", Icon: BarChart3, Component: Metricas },
      {
        id: "dispositivos",
        label: "Dispositivos",
        Icon: MonitorSmartphone,
        Component: Dispositivos,
      },
      { id: "grupos", label: "Grupos", Icon: Users, Component: Grupos },
      { id: "seguridad", label: "Seguridad", Icon: ShieldCheck, Component: Seguridad },
    ],
    []
  );

  const activeTab = tabs.find((tab) => tab.id === activeId) || tabs[0];
  const ActiveSection = activeTab.Component;

  useLayoutEffect(() => {
    if (!isActive) return undefined;
    setHeaderOptions({
      mode: "default",
      onSearchBack: null,
      headerVisible: true,
      profileDockOpen: true,
      profileTitle: "Configuracion",
    });
    return () => {
      setHeaderOptions({
        mode: "default",
        onSearchBack: null,
        headerVisible: true,
        profileDockOpen: true,
        profileTitle: "Configuracion",
      });
    };
  }, [isActive, setHeaderOptions]);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#5E30A5]/60">
              Panel
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#3F1F73]">
              Gestionar
            </h1>
            <p className="text-sm text-slate-500">
              Controla promociones, equipos y seguridad desde un solo lugar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#E9E2F7] bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              Operacion estable
            </div>
            <button
              type="button"
              className="rounded-xl bg-[#5E30A5] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4B2488]"
            >
              Nueva promo
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#EFE9FA] bg-[#FAF8FF] p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#5E30A5]/70">
                Negocio
              </div>
              <div className="text-lg font-semibold text-[#2F1A55]">
                {negocioNombre}
              </div>
              <div className="text-xs text-slate-500">
                Panel central de gestion y operaciones.
              </div>
            </div>
            <div className="text-xs text-slate-400">Actualizado hace 5 min</div>
          </div>
        </div>

        <div className="mt-6">
          <GestionarTabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
        </div>

        <GestionarPanel activeId={activeId}>
          <ActiveSection />
        </GestionarPanel>
      </div>
    </div>
  );
}
