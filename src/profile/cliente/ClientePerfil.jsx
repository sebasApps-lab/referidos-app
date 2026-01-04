import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  Laptop,
  Link2,
  LogOut,
  MessageSquare,
  Monitor,
  Palette,
  Smartphone,
  Tablet,
  Shield,
  UserCircle,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useClienteUI } from "../../cliente/hooks/useClienteUI";
import { getSessionListFallback } from "../../cliente/services/clienteUI";
import ProfileTabs from "../shared/ProfileTabs";
import ProfilePanel from "../shared/ProfilePanel";
import {
  HeaderPanelContainer,
  SearchbarPanel,
} from "../../components/header-panels";
import { useClienteHeader } from "../../cliente/layout/ClienteHeaderContext";
import ProfileOverview from "../shared/sections/ProfileOverview";
import PersonalData from "../shared/sections/PersonalData";
import Access from "../shared/sections/Access";
import LinkedAccounts from "../shared/sections/LinkedAccounts";
import TwoFA from "../shared/sections/TwoFA";
import Sessions from "../shared/sections/Sessions";
import Notifications from "../shared/sections/Notifications";
import Tier from "../shared/sections/Tier";
import ManageAccount from "../shared/sections/ManageAccount";
import AppAppearance from "../shared/sections/AppAppearance";
import Language from "../shared/sections/Language";
import SupportHelp from "../shared/sections/SupportHelp";
import SupportFeedback from "../shared/sections/SupportFeedback";

const DEVICE_ICON = {
  Movil: Smartphone,
  Laptop,
  Tablet,
};

export default function ClientePerfil() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const logout = useAppStore((s) => s.logout);
  const { setHeaderOptions } = useClienteHeader();
  const { profileTab, setProfileTab } = useClienteUI({
    defaultProfileTab: "overview",
  });
  const [profileView, setProfileView] = useState("tabs");
  const [tabsActiveKey, setTabsActiveKey] = useState(null);
  const tabTransitionRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [dockTarget, setDockTarget] = useState(null);
  const showSearchDock = profileView === "tabs";
  const [dockOpenForHeader, setDockOpenForHeader] = useState(showSearchDock);
  const prevShowSearchDockRef = useRef(showSearchDock);
  const [sessions, setSessions] = useState(getSessionListFallback());

  const handleCloseAllSessions = useCallback(() => {
    setSessions((prev) => prev.filter((session) => session.current));
  }, []);

  const SessionsPanel = useCallback(
    () => (
      <Sessions
        title="Sesiones y dispositivos"
        subtitle="Controla los accesos activos en tu cuenta."
        items={sessions}
        renderLeading={(session) => {
          const Icon = DEVICE_ICON[session.device] || Laptop;
          return <Icon size={18} />;
        }}
        getPrimaryText={(session) => session.device}
        getSecondaryText={(session) =>
          `${session.location} - ${session.lastActive}`
        }
        footer={
          <button
            type="button"
            onClick={handleCloseAllSessions}
            className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-xs font-semibold text-red-600 transition hover:bg-red-100"
          >
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <LogOut size={16} />
              </span>
              <div>
                <div>Cerrar todas</div>
                <div className="mt-1 text-[11px] font-normal text-red-500">
                  Esto cerra sesion en el resto de dispositivos, menos en el
                  actual.
                </div>
              </div>
            </div>
          </button>
        }
      />
    ),
    [sessions, handleCloseAllSessions]
  );

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
        items: [
          { key: "signout", label: "Cerrar sesion", icon: LogOut, tone: "danger" },
        ],
      },
    ],
    []
  );

  const tabLabelMap = useMemo(() => {
    const map = {};
    tabGroups.forEach((group) => {
      group.items?.forEach((item) => {
        map[item.key] = item.label;
      });
    });
    return map;
  }, [tabGroups]);

  const sections = useMemo(
    () => ({
      overview: ProfileOverview,
      personal: PersonalData,
      "security-access": Access,
      "security-links": LinkedAccounts,
      twofa: TwoFA,
      sessions: SessionsPanel,
      notifications: Notifications,
      plan: Tier,
      appearance: AppAppearance,
      language: Language,
      help: SupportHelp,
      feedback: SupportFeedback,
      manage: ManageAccount,
    }),
    [SessionsPanel]
  );

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
    const headerTitle =
      profileView === "panel"
        ? tabLabelMap[profileTab] || "Configuracion"
        : "Configuracion";
    setHeaderOptions({
      mode: "profile",
      onSearchBack: profileView === "panel" ? handleBack : null,
      headerVisible: true,
      profileDockOpen: dockOpenForHeader,
      profileTitle: headerTitle,
    });
    return () => {
      setHeaderOptions({
        mode: "default",
        onSearchBack: null,
        headerVisible: true,
        profileDockOpen: true,
      });
    };
  }, [
    dockOpenForHeader,
    handleBack,
    profileTab,
    profileView,
    setHeaderOptions,
    tabLabelMap,
  ]);

  useEffect(() => {
    const prev = prevShowSearchDockRef.current;
    prevShowSearchDockRef.current = showSearchDock;

    if (!showSearchDock) {
      setDockOpenForHeader(false);
      return undefined;
    }

    if (!prev && showSearchDock) {
      const timer = setTimeout(() => {
        setDockOpenForHeader(true);
      }, 125);
      return () => clearTimeout(timer);
    }

    setDockOpenForHeader(true);
    return undefined;
  }, [showSearchDock]);


  useEffect(() => {
    setDockTarget(document.getElementById("cliente-header-search-dock"));
  }, []);

  useEffect(() => {
    if (profileView !== "tabs") {
      setTabsActiveKey(null);
    }
  }, [profileView]);

  useEffect(() => {
    return () => {
      if (tabTransitionRef.current) {
        clearTimeout(tabTransitionRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-full flex-col bg-white">
      {dockTarget
        ? createPortal(
            <HeaderPanelContainer
              open
              panelClassName="hero-search-dock profile-search-dock"
              panelProps={{
                "aria-hidden": !showSearchDock,
                style: { pointerEvents: showSearchDock ? "auto" : "none" },
              }}
            >
              <div className="profile-search-clip">
                <motion.div
                  className="profile-search-panel"
                  initial={false}
                  animate={{
                    y: showSearchDock ? "0%" : "-100%",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <SearchbarPanel
                    value={searchValue}
                    onChange={setSearchValue}
                  />
                </motion.div>
              </div>
            </HeaderPanelContainer>,
            dockTarget
          )
        : null}
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
              <div className="w-full flex flex-col items-center gap-4 pt-16 pb-6">
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
              className="w-full flex flex-col items-center gap-4 pt-16 pb-6"
            >
              <div className="w-[90%] max-w-md">
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
