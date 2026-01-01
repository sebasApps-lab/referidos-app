import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  CreditCard,
  Crown,
  Fingerprint,
  Globe,
  HelpCircle,
  IdCard,
  KeyRound,
  Link2,
  LogOut,
  MessageSquare,
  Monitor,
  Palette,
  Shield,
  UserCircle,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useClienteUI } from "../hooks/useClienteUI";
import ProfileTabs from "./shared/ProfileTabs";
import ProfilePanel from "./shared/ProfilePanel";
import SearchBar from "../../components/search/SearchBar";
import ProfileOverview from "./shared/sections/ProfileOverview";
import PersonalData from "./shared/sections/PersonalData";
import Access from "./shared/sections/Access";
import LinkedAccounts from "./shared/sections/LinkedAccounts";
import TwoFA from "./shared/sections/TwoFA";
import Sessions from "./shared/sections/Sessions";
import Notifications from "./shared/sections/Notifications";
import Tier from "./shared/sections/Tier";
import ManageAccount from "./shared/sections/ManageAccount";
import AppAppearance from "./shared/sections/AppAppearance";
import Language from "./shared/sections/Language";
import SupportHelp from "./shared/sections/SupportHelp";
import SupportFeedback from "./shared/sections/SupportFeedback";

export default function ClientePerfil() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const logout = useAppStore((s) => s.logout);
  const { profileTab, setProfileTab } = useClienteUI({
    defaultProfileTab: "overview",
  });
  const [profileView, setProfileView] = useState("tabs");
  const [tabsActiveKey, setTabsActiveKey] = useState(null);
  const tabTransitionRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const tabGroups = useMemo(
    () => [
      {
        title: "Cuenta",
        items: [
          { key: "overview", label: "Perfil", icon: UserCircle },
          { key: "personal", label: "Datos personales", icon: IdCard },
          { key: "manage", label: "Gestionar cuenta", icon: AlertTriangle },
        ],
      },
      {
        title: "Seguridad",
        items: [
          { key: "security-access", label: "Acceso", icon: KeyRound },
          { key: "security-links", label: "Cuentas vinculadas", icon: Link2 },
          { key: "twofa", label: "2FA", icon: Fingerprint },
          { key: "sessions", label: "Sesiones", icon: Monitor },
        ],
      },
      {
        title: "Plan/Tier",
        items: [
          { key: "plan", label: "Beneficios", icon: Crown },
          { key: "payments", label: "Pagos", icon: CreditCard, disabled: true },
        ],
      },
      {
        title: "Preferencias",
        items: [
          { key: "notifications", label: "Notificaciones", icon: Bell },
          { key: "appearance", label: "Apariencia", icon: Palette },
          { key: "language", label: "Idioma", icon: Globe },
        ],
      },
      {
        title: "Soporte",
        items: [
          { key: "help", label: "Ayuda", icon: HelpCircle },
          { key: "feedback", label: "Dejar un comentario", icon: MessageSquare },
        ],
      },
      {
        items: [{ key: "signout", label: "Cerrar sesion", icon: LogOut, tone: "danger" }],
      },
    ],
    []
  );

  const sections = useMemo(
    () => ({
      overview: ProfileOverview,
      personal: PersonalData,
      "security-access": Access,
      "security-links": LinkedAccounts,
      twofa: TwoFA,
      sessions: Sessions,
      notifications: Notifications,
      plan: Tier,
      appearance: AppAppearance,
      language: Language,
      help: SupportHelp,
      feedback: SupportFeedback,
      manage: ManageAccount,
    }),
    []
  );

  useEffect(() => {
    if (profileView !== "tabs") {
      setTabsActiveKey(null);
    }
  }, [profileView]);

  const handleTabChange = useCallback(
    (nextTab) => {
      if (nextTab === "signout") {
        if (tabTransitionRef.current) {
          clearTimeout(tabTransitionRef.current);
        }
        setTabsActiveKey("signout");
        tabTransitionRef.current = setTimeout(() => {
          setTabsActiveKey(null);
          logout();
        }, 140);
        return;
      }
      if (tabTransitionRef.current) {
        clearTimeout(tabTransitionRef.current);
      }
      setTabsActiveKey(nextTab);
      setProfileTab(nextTab);
      tabTransitionRef.current = setTimeout(() => {
        setProfileView("panel");
      }, 140);
    },
    [setProfileTab]
  );

  const handleBack = useCallback(() => {
    setProfileView("tabs");
    setTabsActiveKey(null);
  }, []);

  useEffect(() => {
    return () => {
      if (tabTransitionRef.current) {
        clearTimeout(tabTransitionRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative flex-1 overflow-y-auto bg-white">
        <AnimatePresence mode="wait">
          {profileView === "tabs" ? (
            <motion.div
              key="profile-tabs-screen"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <section className="hero-bleed text-white">
                <div className="relative z-10 max-w-3xl mx-auto px-4 pt-2 pb-1">
                  <div className="text-center">
                    <p className="max-w-[340px] mx-auto text-center text-[18px] font-light leading-snug text-white">
                      Gestiona tu informacion personal y
                      <span className="block">de seguridad.</span>
                    </p>
                  </div>
                </div>
                <div className="relative z-10 mt-4 px-4 pb-2">
                  <SearchBar value={searchValue} onChange={setSearchValue} />
                </div>
              </section>

              <div className="w-full flex flex-col items-center gap-4 pt-2 pb-6">
                <div className="w-[98%] max-w-md bg-white">
                  <ProfileTabs
                    groups={tabGroups}
                    active={tabsActiveKey}
                    onChange={handleTabChange}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="profile-panel"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full flex flex-col items-center gap-4 pt-2 pb-6"
            >
              <div className="w-[90%] max-w-md">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
