import React, { useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Crown,
  Fingerprint,
  IdCard,
  Monitor,
  Palette,
  Shield,
  UserCircle,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useClienteUI } from "../hooks/useClienteUI";
import ProfileTabs from "./shared/ProfileTabs";
import ProfilePanel from "./shared/ProfilePanel";
import ProfileOverview from "./shared/sections/ProfileOverview";
import PersonalData from "./shared/sections/PersonalData";
import Security from "./shared/sections/Security";
import TwoFA from "./shared/sections/TwoFA";
import Sessions from "./shared/sections/Sessions";
import Notifications from "./shared/sections/Notifications";
import Plan from "./shared/sections/Plan";
import DangerZone from "./shared/sections/DangerZone";
import Preferences from "./shared/sections/Preferences";

export default function ClientePerfil() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const { profileTab, setProfileTab } = useClienteUI({
    defaultProfileTab: "overview",
  });
  const [profileView, setProfileView] = useState("tabs");

  const tabs = useMemo(
    () => [
      {
        key: "overview",
        label: "Perfil",
        description: "Identidad y estado",
        icon: UserCircle,
      },
      {
        key: "personal",
        label: "Datos personales",
        description: "Informacion basica",
        icon: IdCard,
      },
      {
        key: "security",
        label: "Seguridad",
        description: "Accesos y cuentas",
        icon: Shield,
      },
      {
        key: "twofa",
        label: "2FA",
        description: "Autenticacion avanzada",
        icon: Fingerprint,
      },
      {
        key: "sessions",
        label: "Sesiones",
        description: "Dispositivos activos",
        icon: Monitor,
      },
      {
        key: "notifications",
        label: "Notificaciones",
        description: "Preferencias",
        icon: Bell,
      },
      {
        key: "plan",
        label: "Plan y tier",
        description: "Beneficios actuales",
        icon: Crown,
      },
      {
        key: "preferences",
        label: "Preferencias",
        description: "Tema e idioma",
        icon: Palette,
      },
      {
        key: "danger",
        label: "Cuenta",
        description: "Acciones criticas",
        icon: AlertTriangle,
      },
    ],
    []
  );

  const sections = useMemo(
    () => ({
      overview: ProfileOverview,
      personal: PersonalData,
      security: Security,
      twofa: TwoFA,
      sessions: Sessions,
      notifications: Notifications,
      plan: Plan,
      preferences: Preferences,
      danger: DangerZone,
    }),
    []
  );

  const handleTabChange = useCallback(
    (nextTab) => {
      setProfileTab(nextTab);
      setProfileView("panel");
    },
    [setProfileTab]
  );

  const handleBack = useCallback(() => {
    setProfileView("tabs");
  }, []);

  return (
    <div className="flex h-full flex-col bg-white">
      <section className="hero-bleed historial-hero text-white">
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-2 pb-1">
          <div className="text-center">
            <p className="max-w-[340px] mx-auto text-center text-[18px] font-light leading-snug text-white">
              Gestiona tu informacion personal y
              <span className="block">de seguridad.</span>
            </p>
          </div>
        </div>
        <div className="relative z-10 mt-3">
          <div className="w-full rounded-full border border-white/60 bg-[#FAF8FF] px-2 py-0.5 shadow-sm">
            <div className="flex items-center justify-center gap-7">
              <button className="relative px-3 py-1.5 text-[13px] font-bold tracking-[0.22em] text-[#5E30A5] uppercase">
                Basica
              </button>
              <span className="mx-1 h-6 w-px translate-y-0.5 bg-gradient-to-b from-transparent via-[#5E30A5]/30 to-transparent" />
              <button className="relative px-3 py-1.5 text-[13px] font-bold tracking-[0.22em] text-[#94A3B8] uppercase">
                Avanzada
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative flex-1 overflow-y-auto bg-white">
        <div className="w-full flex flex-col items-center gap-4 pt-4 pb-6">
          <AnimatePresence mode="wait">
            {profileView === "tabs" ? (
              <motion.div
                key="profile-tabs"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-[90%] max-w-md"
              >
                <div className="rounded-xl bg-[#5E30A5] shadow-sm">
                  <ProfileTabs
                    tabs={tabs}
                    active={profileTab}
                    onChange={handleTabChange}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="profile-panel"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-[90%] max-w-md"
              >
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-3 text-xs font-semibold text-[#5E30A5] tracking-[0.12em]"
                >
                  VOLVER
                </button>
                <ProfilePanel
                  activeTab={profileTab}
                  sections={sections}
                  usuario={usuario}
                  setUser={setUser}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
