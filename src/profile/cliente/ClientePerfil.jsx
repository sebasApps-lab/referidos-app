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
  Tablet,
  Shield,
  UserCircle,
  X,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useClienteUI } from "../../cliente/hooks/useClienteUI";
import {
  formatReadableDate,
  getAvatarSrc,
  getPlanFallback,
  getRoleLabel,
  getSessionListFallback,
  getTierMeta,
} from "../../cliente/services/clienteUI";
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
import AliasCard from "../shared/blocks/AliasCard";
import BenefitsCard from "../shared/blocks/BenefitsCard";
import IdentityCard from "../shared/blocks/IdentityCard";
import PersonalDataBlock from "../shared/blocks/PersonalDataBlock";
import VerificationCard from "../shared/blocks/VerificationCard";
import { useModal } from "../../modals/useModal";

const DEVICE_ICON = {
  Movil: Smartphone,
  Laptop,
  Tablet,
};

export default function ClientePerfil() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const logout = useAppStore((s) => s.logout);
  const accessMethods = useAppStore((s) => s.accessMethods);
  const { openModal } = useModal();
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
  const [twoFAVerified] = useState(false);
  const [twoFATotp, setTwoFATotp] = useState(false);
  const [twoFASms] = useState(false);
  const [twoFABackup, setTwoFABackup] = useState(true);
  const [twoFADismissed, setTwoFADismissed] = useState(false);
  const [aliasStatus, setAliasStatus] = useState(null);

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

  const aliasConfig = useMemo(
    () => ({
      panelTitle: "Nombre en pantalla",
      emptyMessage: "Haz que tu perfil se sienta tuyo, anade un alias.",
      editMessage: "Esto es lo que los demas veran.",
      viewMessage: "Esto es lo que los demas veran.",
      editTitle: "Elige tu alias",
      fieldLabel: "Alias",
      placeholder: "Ingresa un alias",
      displayLabel: "Alias",
      emptyValue: "Sin alias.",
      valueClass: "mt-1 block text-[13px] text-slate-500",
      minLettersText: "El alias debe contener al menos cuatro letras",
    }),
    []
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

  const openVerificationMethods = useCallback(() => {
    setProfileTab("security-access");
    setProfileView("panel");
  }, [setProfileTab, setProfileView]);

  const OverviewPanel = useCallback(
    ({ usuario: overviewUser, setUser: setOverviewUser, verification }) => {
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
      const tier = getTierMeta(overviewUser);
      const plan = getPlanFallback(overviewUser?.role);

      return (
        <ProfileOverview
          verificationBlock={
            !verification.accountVerified ? (
              <VerificationCard />
            ) : null
          }
          identityBlock={
            <IdentityCard
              title="Identidad"
              name={overviewUser?.nombre || "Usuario"}
              meta={metaLine}
              avatarSrc={getAvatarSrc(overviewUser)}
              showVerified={verification.accountVerified}
              onAvatarSelect={() =>
                setAliasStatus({
                  type: "success",
                  text: "Imagen seleccionada (pendiente de guardado)",
                })
              }
            />
          }
          primaryBlock={
            <BenefitsCard
              title="Tier"
              badgeLabel={tier.label}
              BadgeIcon={Sparkles}
              perks={plan?.perks || []}
            />
          }
          secondaryBlock={
            <AliasCard
              usuario={overviewUser}
              setUser={setOverviewUser}
              config={aliasConfig}
              status={aliasStatus}
              onStatus={setAliasStatus}
            />
          }
        />
      );
    },
    [aliasConfig, aliasStatus]
  );

  function PersonalDataPanel({ usuario: personalUser, setUser: setPersonalUser, verification }) {
    const initial = useMemo(() => {
      const nombre = personalUser?.nombre || "";
      const parts = nombre.split(" ").filter(Boolean);
      return {
        nombres: personalUser?.nombres || parts.slice(0, 1).join(" ") || nombre,
        apellidos: personalUser?.apellidos || parts.slice(1).join(" "),
        direccion:
          personalUser?.direccion ||
          personalUser?.ubicacion ||
          personalUser?.ciudad ||
          "",
        email: personalUser?.email || "",
        telefono: personalUser?.telefono || personalUser?.phone || "",
      };
    }, [personalUser]);

    const [form, setForm] = useState(initial);
    const [confirmedSensitive, setConfirmedSensitive] = useState(false);
    const [editing, setEditing] = useState({
      names: false,
      contact: false,
    });
    const [expandedEmail, setExpandedEmail] = useState(false);

    useEffect(() => {
      setForm(initial);
    }, [
      initial.nombres,
      initial.apellidos,
      initial.direccion,
      initial.email,
      initial.telefono,
    ]);

    useEffect(() => {
      if (editing.contact) {
        setExpandedEmail(false);
      }
    }, [editing.contact]);

    const emailChanged = form.email !== initial.email;
    const phoneChanged = form.telefono !== initial.telefono;
    const needsSensitiveVerification = emailChanged || phoneChanged;
    const baseVerified =
      (!emailChanged || verification.emailVerified) &&
      (!phoneChanged || verification.phoneVerified);
    const provider = (personalUser?.provider || "").toLowerCase();
    const hasPasswordFallback = provider === "email" || provider === "password";

    const handleChange = (field) => (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSaveNames = () => {
      if (!personalUser) return;
      const nombreCompleto = [form.nombres, form.apellidos]
        .filter(Boolean)
        .join(" ");
      setPersonalUser({
        ...personalUser,
        nombres: form.nombres,
        apellidos: form.apellidos,
        nombre: nombreCompleto || personalUser?.nombre,
      });
      if (form.nombres?.trim() && form.apellidos?.trim()) {
        setEditing((prev) => ({ ...prev, names: false }));
      }
    };

    const persistContact = (overrideSensitive = false) => {
      if (!personalUser) return;
      if (!baseVerified) return;
      if (!overrideSensitive && needsSensitiveVerification && !confirmedSensitive) {
        return;
      }
      setPersonalUser({ ...personalUser, email: form.email, telefono: form.telefono });
      if (form.email?.trim() && form.telefono?.trim()) {
        setEditing((prev) => ({ ...prev, contact: false }));
      }
    };

    const handleSaveContact = () => {
      if (needsSensitiveVerification && !confirmedSensitive) {
        openModal("ConfirmarCambios", {
          hasFingerprint: accessMethods?.fingerprint,
          hasPin: accessMethods?.pin,
          hasPassword: accessMethods?.password || hasPasswordFallback,
          userId: personalUser?.id_auth ?? personalUser?.id ?? null,
          email: personalUser?.email ?? null,
          displayName: personalUser?.nombre ?? personalUser?.alias ?? "Usuario",
          onConfirm: () => {
            setConfirmedSensitive(true);
            requestAnimationFrame(() => {
              persistContact(true);
            });
          },
          onOpenMethods: openVerificationMethods,
        });
        return;
      }
      persistContact(false);
    };

    const handleCancelNames = () => {
      setForm((prev) => ({
        ...prev,
        nombres: initial.nombres || "",
        apellidos: initial.apellidos || "",
      }));
      setEditing((prev) => ({
        ...prev,
        names: false,
      }));
      document.activeElement?.blur();
    };

    const handleCancelContact = () => {
      setForm((prev) => ({
        ...prev,
        email: initial.email || "",
        telefono: initial.telefono || "",
      }));
      setConfirmedSensitive(false);
      setEditing((prev) => ({
        ...prev,
        contact: false,
      }));
      document.activeElement?.blur();
    };

    const fullName = [form.nombres, form.apellidos].filter(Boolean).join(" ");
    const addressItems = form.direccion?.trim()
      ? [{ label: "Casa", value: form.direccion || "Sin direccion" }]
      : [];
    const showSaveNames = Boolean(form.nombres?.trim() || form.apellidos?.trim());
    const showSaveContact = Boolean(form.email?.trim() || form.telefono?.trim());
    const saveContactDisabled = !baseVerified;

    return (
      <PersonalData
        blocks={[
          <PersonalDataBlock
            key="personal-data"
            editingNames={editing.names}
            editingContact={editing.contact}
            fullName={fullName}
            nombres={form.nombres}
            apellidos={form.apellidos}
            addressItems={addressItems}
            email={form.email}
            telefono={form.telefono}
            expandedEmail={expandedEmail}
            emailVerified={verification.emailVerified}
            onEditNames={() => setEditing((prev) => ({ ...prev, names: true }))}
            onEditAddress={() => {}}
            onEditContact={() => setEditing((prev) => ({ ...prev, contact: true }))}
            onChangeNombres={handleChange("nombres")}
            onChangeApellidos={handleChange("apellidos")}
            onChangeEmail={handleChange("email")}
            onChangeTelefono={handleChange("telefono")}
            onCancelNames={handleCancelNames}
            onCancelContact={handleCancelContact}
            onSaveNames={handleSaveNames}
            onSaveContact={handleSaveContact}
            showSaveNames={showSaveNames}
            showSaveContact={showSaveContact}
            saveContactDisabled={saveContactDisabled}
            onToggleExpandedEmail={() => setExpandedEmail((prev) => !prev)}
          />,
        ]}
      />
    );
  }

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
      personal: PersonalDataPanel,
      "security-access": Access,
      "security-links": LinkedAccounts,
      overview: OverviewPanel,
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
    [OverviewPanel, PersonalDataPanel, SessionsPanel, TwoFAPanel]
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
