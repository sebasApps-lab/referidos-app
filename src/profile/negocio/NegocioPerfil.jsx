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
  Sparkles,
  ShieldCheck,
  Smartphone,
  Shield,
  Tablet,
  UserCircle,
  X,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useLocation } from "react-router-dom";
import { useNegocioUI } from "../../negocio/hooks/useNegocioUI";
import {
  formatReadableDate,
  getAvatarSrc,
  getPlanFallback,
  getRoleLabel,
  getSessionListFallback,
} from "../../cliente/services/clienteUI";
import ProfileTabs from "../shared/ProfileTabs";
import ProfilePanel from "../shared/ProfilePanel";
import {
  HeaderPanelContainer,
  SearchbarPanel,
} from "../../layouts/header-panels";
import { useNegocioHeader } from "../../negocio/layout/NegocioHeaderContext";
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
import BenefitsCard from "../shared/blocks/BenefitsCard";
import IdentityCard from "../shared/blocks/IdentityCard";
import NegocioIdentityCard from "../shared/blocks/NegocioIdentityCard";
import VerificationCard from "../shared/blocks/VerificationCard";

const DEVICE_ICON = {
  Movil: Smartphone,
  Laptop,
  Tablet,
};

const EMPLOYEE_SESSIONS_FALLBACK = [
  {
    id: "employee-1",
    name: "Valeria Cruz",
    genero: "f",
    location: "Quito, Ecuador",
    lastActive: "Activa ahora",
    current: true,
  },
  {
    id: "employee-2",
    name: "Mateo Reyes",
    genero: "m",
    location: "Guayaquil, Ecuador",
    lastActive: "Hace 2 dias",
    current: false,
  },
];

export default function NegocioPerfil() {
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const setUser = useAppStore((s) => s.setUser);
  const logout = useAppStore((s) => s.logout);
  const { setHeaderOptions } = useNegocioHeader();
  const { profileTab, setProfileTab } = useNegocioUI({
    defaultProfileTab: "overview",
  });
  const location = useLocation();
  const [profileView, setProfileView] = useState("tabs");
  const [tabsActiveKey, setTabsActiveKey] = useState(null);
  const tabTransitionRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [dockTarget, setDockTarget] = useState(null);
  const showSearchDock = profileView === "tabs";
  const [dockOpenForHeader, setDockOpenForHeader] = useState(showSearchDock);
  const prevShowSearchDockRef = useRef(showSearchDock);
  const deepLinkAppliedRef = useRef(false);
  const [ownerSessions, setOwnerSessions] = useState(getSessionListFallback());
  const [employeeSessions, setEmployeeSessions] = useState(() =>
    EMPLOYEE_SESSIONS_FALLBACK.map((employee) => ({
      ...employee,
      avatar: getAvatarSrc({ genero: employee.genero }),
    }))
  );
  const [twoFAVerified] = useState(false);
  const [twoFATotp, setTwoFATotp] = useState(false);
  const [twoFASms] = useState(false);
  const [twoFABackup, setTwoFABackup] = useState(true);
  const [twoFADismissed, setTwoFADismissed] = useState(false);

  const handleCloseAllOwners = useCallback(() => {
    setOwnerSessions((prev) => prev.filter((session) => session.current));
  }, []);

  const handleCloseAllEmployees = useCallback(() => {
    setEmployeeSessions((prev) => prev.filter((session) => session.current));
  }, []);

  const SessionsPanel = useCallback(
    () => (
      <div className="flex flex-col gap-6">
        <Sessions
          title="Sesiones de cuenta propietario"
          subtitle="Controla los accesos activos en tu cuenta."
          items={ownerSessions}
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
              onClick={handleCloseAllOwners}
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
        <Sessions
          title="Sesiones de empleados"
          subtitle="Controla las sesiones de las cuentas de tus empleados o ayudantes."
          items={employeeSessions}
          renderLeading={(session) => (
            <img
              src={session.avatar}
              alt={session.name}
              className="h-full w-full object-cover"
            />
          )}
          leadingClassName="bg-[#F3EEFF] overflow-hidden"
          getPrimaryText={(session) => session.name}
          getSecondaryText={(session) =>
            `${session.location} - ${session.lastActive}`
          }
          footer={
            <button
              type="button"
              onClick={handleCloseAllEmployees}
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
      </div>
    ),
    [
      employeeSessions,
      handleCloseAllEmployees,
      handleCloseAllOwners,
      ownerSessions,
    ]
  );

  const TwoFAPanel = useCallback(
    () => (
      <TwoFA
        title="Autenticacion en dos pasos"
        subtitle="Refuerza tu seguridad con factores adicionales."
        factors={[
          {
            id: "totp",
            title: "App autenticadora",
            description: "TOTP para accesos seguros.",
            toggle: {
              active: twoFATotp,
              onChange: () =>
                twoFAVerified && setTwoFATotp((prev) => !prev),
              disabled: !twoFAVerified,
            },
          },
          {
            id: "sms",
            title: "SMS",
            badge: "No disponible aun",
            description: "Codigo enviado al telefono.",
            disabled: true,
            toggle: {
              active: twoFASms,
              onChange: () => {},
              disabled: true,
            },
          },
          {
            id: "backup",
            title: "Codigos de respaldo",
            description: "Imprime o guarda los codigos.",
            toggle: {
              active: twoFABackup,
              onChange: () =>
                twoFAVerified && setTwoFABackup((prev) => !prev),
              disabled: !twoFAVerified,
            },
          },
        ]}
        notice={
          !twoFADismissed ? (
            <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-[#5E30A5]" />
              Mantener 2FA activo reduce riesgos de acceso no autorizado.
              <button
                type="button"
                onClick={() => setTwoFADismissed(true)}
                className="ml-auto text-slate-400 hover:text-slate-500"
                aria-label="Cerrar aviso"
              >
                <X size={14} />
              </button>
            </div>
          ) : null
        }
      />
    ),
    [
      twoFABackup,
      twoFADismissed,
      twoFASms,
      twoFATotp,
      twoFAVerified,
    ]
  );
  const openNegocioIdentity = useCallback(() => {
    setProfileTab("manage");
    setProfileView("panel");
  }, [setProfileTab, setProfileView]);
  const negocioItems = useMemo(() => {
    const fromOnboarding = Array.isArray(onboarding?.negocios)
      ? onboarding.negocios
      : onboarding?.negocio
      ? [onboarding.negocio]
      : [];
    const fromUser = Array.isArray(usuario?.negocios)
      ? usuario.negocios
      : usuario?.negocio
      ? [usuario.negocio]
      : [];
    const base =
      fromOnboarding.length > 0
        ? fromOnboarding
        : fromUser.length > 0
        ? fromUser
        : [
            {
              nombre: usuario?.negocioNombre || usuario?.negocio || "",
              sector: usuario?.sector || "",
              direccion: usuario?.direccion || usuario?.ubicacion || "",
            },
          ];
    return base.map((item, index) => ({
      id: item?.id || item?.negocioId || `negocio-${index}`,
      nombre:
        item?.nombre || item?.negocioNombre || item?.nombre_negocio || "",
      sector: item?.sector || "",
      direccion: item?.direccion || item?.ubicacion || "",
    }));
  }, [onboarding, usuario]);

  const negocioDisplayItems = useMemo(() => {
    const items = negocioItems.length
      ? negocioItems
      : [
          {
            id: "negocio-principal",
            nombre: "",
            sector: "",
            direccion: "",
          },
        ];
    return items.map((item, index) => {
      const nombre = (item?.nombre || "").trim();
      const sector = (item?.sector || "").trim();
      const direccion = (item?.direccion || "").trim();
      const missing = !(nombre && sector && direccion);
      return {
        id: item?.id || `negocio-${index}`,
        label: index === 0 ? "Principal" : `Sucursal ${index}`,
        value: nombre || "No haz ingresado el nombre de tu negocio aun.",
        missing,
        raw: item,
        index,
      };
    });
  }, [negocioItems]);

  const negocioMissing = useMemo(
    () => negocioDisplayItems.some((item) => item.missing),
    [negocioDisplayItems]
  );

  const OverviewPanel = useCallback(
    ({ usuario: overviewUser, verification }) => {
      const createdAtRaw = overviewUser?.fechacreacion;
      const createdAtValue =
        typeof createdAtRaw === "string" &&
        createdAtRaw.includes(" ") &&
        !createdAtRaw.includes("T")
          ? createdAtRaw.replace(" ", "T")
          : createdAtRaw;
      const createdAtLabel = formatReadableDate(createdAtValue);
      const showRole = overviewUser?.role && overviewUser.role !== "cliente";
      const metaLine = `${
        showRole ? `${getRoleLabel(overviewUser)} - ` : ""
      }Miembro desde ${createdAtLabel}`;
      const plan = getPlanFallback(overviewUser?.role);

      return (
        <ProfileOverview
          headerBadge="Cuenta de Negocio"
          verificationBlock={
            !verification.accountVerified ? (
              <VerificationCard />
            ) : null
          }
          identityBlock={
            <IdentityCard
              title="Identidad del propietario"
              name={overviewUser?.nombre || "Usuario"}
              meta={metaLine}
              avatarSrc={getAvatarSrc(overviewUser)}
              showVerified={verification.accountVerified}
            />
          }
          primaryBlock={
            <BenefitsCard
              title="Plan"
              badgeLabel={plan?.plan || "FREE"}
              BadgeIcon={Sparkles}
              perks={plan?.perks || []}
            />
          }
          secondaryBlock={
            <NegocioIdentityCard
              title="Identidad del Negocio"
              subtitle="Define como te ven tus clientes y manten tu info actualizada"
              warningText="Completa la informacion de tu negocio, para una mejor experiencia."
              showWarning={negocioMissing}
              items={negocioDisplayItems}
              onEdit={openNegocioIdentity}
            />
          }
        />
      );
    },
    [negocioDisplayItems, negocioMissing, openNegocioIdentity]
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
      overview: OverviewPanel,
      personal: PersonalData,
      "security-access": Access,
      "security-links": LinkedAccounts,
      twofa: TwoFAPanel,
      sessions: SessionsPanel,
      notifications: Notifications,
      plan: Tier,
      appearance: AppAppearance,
      language: Language,
      help: SupportHelp,
      feedback: SupportFeedback,
      manage: ManageAccount,
    }),
    [OverviewPanel, SessionsPanel, TwoFAPanel]
  );

  useEffect(() => {
    if (deepLinkAppliedRef.current) return;
    const params = new URLSearchParams(location.search);
    const targetTab = params.get("tab");
    if (!targetTab || !sections[targetTab]) return;
    deepLinkAppliedRef.current = true;
    setProfileTab(targetTab);
    setProfileView("panel");
  }, [location.search, sections, setProfileTab]);

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
    setDockTarget(document.getElementById("negocio-header-search-dock"));
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
