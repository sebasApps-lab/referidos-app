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
    <div className="flex h-full flex-col">
      <section className="hero-bleed historial-hero text-white">
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-2 pb-1">
          <div className="text-center">
            <p className="max-w-[325px] mx-auto text-center text-[18px] font-light leading-snug text-white">
              Gestiona tu informacion
              <span className="block">personal y de seguridad.</span>
            </p>
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
                <div className="rounded-3xl bg-[#5E30A5] p-2 shadow-sm">
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
