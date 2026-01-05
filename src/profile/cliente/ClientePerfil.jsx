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
  TriangleAlert,
  Shield,
  UserCircle,
  X,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useClienteUI } from "../../cliente/hooks/useClienteUI";
import {
  formatReadableDate,
  formatCompactNumber,
  getAvatarSrc,
  getPlanFallback,
  getRoleLabel,
  getSessionListFallback,
  getTierMeta,
  getTierProgress,
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
import Beneficios from "../shared/sections/Beneficios";
import ManageAccount from "../shared/sections/ManageAccount";
import AppAppearance from "../shared/sections/AppAppearance";
import Language from "../shared/sections/Language";
import Help from "../shared/sections/Help";
import Feedback from "../shared/sections/Feedback";
import AccountStatusCard from "../shared/blocks/AccountStatusCard";
import AliasCard from "../shared/blocks/AliasCard";
import BenefitsCard from "../shared/blocks/BenefitsCard";
import DangerZone from "../shared/blocks/DangerZone";
import ExploreTiersCard from "../shared/blocks/ExploreTiersCard";
import FingerprintAccessCard from "../shared/blocks/FingerprintAccessCard";
import FontSelector from "../shared/blocks/FontSelector";
import IdentityCard from "../shared/blocks/IdentityCard";
import LanguageSelector from "../shared/blocks/LanguageSelector";
import LinkedAccountsCard from "../shared/blocks/LinkedAccountsCard";
import PasswordAccessCard from "../shared/blocks/PasswordAccessCard";
import PinAccessCard from "../shared/blocks/PinAccessCard";
import PersonalDataBlock from "../shared/blocks/PersonalDataBlock";
import TierCurrentCard from "../shared/blocks/TierCurrentCard";
import TierNextCard from "../shared/blocks/TierNextCard";
import SessionsList from "../shared/blocks/SessionsList";
import ThemeSelector from "../shared/blocks/ThemeSelector";
import TwoFACard from "../shared/blocks/TwoFACard";
import SupportHelpOptions from "../shared/blocks/SupportHelpOptions";
import SupportFeedbackForm from "../shared/blocks/SupportFeedbackForm";
import NotificationsPreferencesCard, {
  DEFAULT_NOTIFICATION_PREFS,
  NOTIFICATION_CHANNELS,
} from "../shared/blocks/NotificationsPreferencesCard";
import VerificationCard from "../shared/blocks/VerificationCard";
import { useModal } from "../../modals/useModal";
import { supabase } from "../../lib/supabaseClient";

const DEVICE_ICON = {
  Movil: Smartphone,
  Laptop,
  Tablet,
};
let accessInfoDismissed = false;

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
        blocks={[
          <SessionsList
            key="sessions-list"
            items={sessions}
            renderLeading={(session) => {
              const Icon = DEVICE_ICON[session.device] || Laptop;
              return <Icon size={18} />;
            }}
            getPrimaryText={(session) => session.device}
            getSecondaryText={(session) =>
              `${session.location} - ${session.lastActive}`
            }
          />,
        ]}
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
        blocks={[
          <TwoFACard
            key="twofa"
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
          />,
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

  const AccessPanel = useCallback(function AccessPanel({ usuario: accessUser }) {
    const { openModal } = useModal();
    const setAccessMethods = useAppStore((s) => s.setAccessMethods);
    const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
    const [pinEnabled, setPinEnabled] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordMode, setPasswordMode] = useState("add");
    const [currentPassword, setCurrentPassword] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [passwordAttempted, setPasswordAttempted] = useState(false);
    const [showPinForm, setShowPinForm] = useState(false);
    const [pinValue, setPinValue] = useState("");
    const [pinStep, setPinStep] = useState("create");
    const [pinFirst, setPinFirst] = useState("");
    const [pinReveal, setPinReveal] = useState([false, false, false, false]);
    const [focusedField, setFocusedField] = useState(null);
    const [authProvider, setAuthProvider] = useState(null);
    const [passwordEnabled, setPasswordEnabled] = useState(null);
    const [removalBlocked, setRemovalBlocked] = useState(false);
    const [dismissedMethodsWarning, setDismissedMethodsWarning] = useState(false);
    const [dismissedInfo, setDismissedInfo] = useState(accessInfoDismissed);
    const passwordFormRef = useRef(null);
    const currentPasswordRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmInputRef = useRef(null);
    const pinInputRefs = useRef([]);
    const pinRevealTimersRef = useRef([]);
    const prevUserIdRef = useRef(null);
    const provider = (authProvider || accessUser?.provider || "").toLowerCase();
    const hasPassword = provider === "email" || provider === "password";
    const passwordActive = passwordEnabled ?? hasPassword;
    const methodsCount =
      (passwordActive ? 1 : 0) +
      (fingerprintEnabled ? 1 : 0) +
      (pinEnabled ? 1 : 0);
    const showMethodsWarning =
      (methodsCount === 0 || removalBlocked) && !dismissedMethodsWarning;

    useEffect(() => {
      let active = true;
      const loadProvider = async () => {
        const { data } = await supabase.auth.getSession();
        const nextProvider = data?.session?.user?.app_metadata?.provider ?? null;
        if (active) {
          setAuthProvider(nextProvider);
        }
      };
      loadProvider();
      return () => {
        active = false;
      };
    }, []);

    useEffect(() => {
      if (passwordEnabled === null) {
        setPasswordEnabled(hasPassword);
        return;
      }
      if (!hasPassword && passwordEnabled) {
        setPasswordEnabled(false);
      }
    }, [hasPassword, passwordEnabled]);

    useEffect(() => {
      if (passwordActive && showPasswordForm && passwordMode === "add") {
        setShowPasswordForm(false);
      }
    }, [passwordActive, showPasswordForm, passwordMode]);

    useEffect(() => {
      if (methodsCount === 0) {
        setDismissedMethodsWarning(false);
      }
    }, [methodsCount]);

    useEffect(() => {
      setAccessMethods({
        fingerprint: fingerprintEnabled,
        pin: pinEnabled,
        password: passwordActive,
      });
    }, [fingerprintEnabled, passwordActive, pinEnabled, setAccessMethods]);

    useEffect(() => {
      const currentId = accessUser?.id_auth ?? null;
      if (prevUserIdRef.current !== currentId) {
        prevUserIdRef.current = currentId;
        accessInfoDismissed = false;
        setDismissedInfo(false);
      }
    }, [accessUser?.id_auth]);

    useEffect(() => {
      if (methodsCount > 1 && removalBlocked) {
        setRemovalBlocked(false);
      }
    }, [methodsCount, removalBlocked]);

    const handlePasswordFocus = useCallback((field) => {
      setFocusedField(field);
    }, []);

    const handlePasswordBlur = useCallback(() => {
      requestAnimationFrame(() => {
        const active = document.activeElement;
        if (active === currentPasswordRef.current) {
          setFocusedField("current");
          return;
        }
        if (active === passwordInputRef.current) {
          setFocusedField("new");
          return;
        }
        if (active === confirmInputRef.current) {
          setFocusedField("confirm");
          return;
        }
        setFocusedField(null);
      });
    }, []);

    const hasMinLength = passwordValue.length >= 8;
    const hasNumber = /\d/.test(passwordValue);
    const hasSymbol = /[^A-Za-z0-9]/.test(passwordValue);
    const hasNumberAndSymbol = hasNumber && hasSymbol;
    const passwordsMatch =
      passwordValue.length > 0 &&
      passwordConfirm.length > 0 &&
      passwordValue === passwordConfirm;
    const showPasswordRules = focusedField === "new" || passwordValue.length > 0;
    const showPasswordErrors = focusedField !== "new" && passwordValue.length > 0;
    const showConfirmErrors =
      focusedField !== "confirm" && passwordConfirm.length > 0;
    const showConfirmRule =
      hasMinLength && hasNumberAndSymbol && passwordConfirm.length > 0;
    const canSavePassword = hasMinLength && hasNumberAndSymbol && passwordsMatch;
    const showCurrentPasswordError =
      passwordMode === "change" && passwordAttempted && !currentPassword.trim();

    const handlePasswordCancel = () => {
      setPasswordValue("");
      setPasswordConfirm("");
      setCurrentPassword("");
      setFocusedField(null);
      setPasswordMode("add");
      setPasswordAttempted(false);
      setShowPasswordForm(false);
      document.activeElement?.blur();
    };

    const handlePasswordSave = () => {
      setPasswordAttempted(true);
      if (!canSavePassword) return;
      if (passwordMode === "change" && !currentPassword.trim()) return;
      setPasswordEnabled(true);
      setShowPasswordForm(false);
      setPasswordMode("add");
      setPasswordAttempted(false);
    };

    const openAddPassword = () => {
      setPasswordMode("add");
      setCurrentPassword("");
      setPasswordValue("");
      setPasswordConfirm("");
      setPasswordAttempted(false);
      setShowPasswordForm(true);
    };

    const openChangePassword = () => {
      setPasswordMode("change");
      setCurrentPassword("");
      setPasswordValue("");
      setPasswordConfirm("");
      setPasswordAttempted(false);
      setShowPasswordForm(true);
    };

    const sanitizedPin = pinValue.replace(/[^0-9]/g, "").slice(0, 4);
    const pinSlots = Array(4)
      .fill("")
      .map((_, index) => sanitizedPin[index] || "");
    const pinComplete = pinSlots.every(Boolean);
    const pinMatches = pinValue === pinFirst;

    const getFirstEmptyPinIndex = () => pinSlots.findIndex((char) => !char);
    const getLastFilledPinIndex = () => {
      for (let i = pinSlots.length - 1; i >= 0; i -= 1) {
        if (pinSlots[i]) return i;
      }
      return -1;
    };

    const focusPinInput = (index) => {
      window.requestAnimationFrame(() => {
        pinInputRefs.current[index]?.focus();
      });
    };

    const setPinRevealIndex = useCallback((index) => {
      setPinReveal((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
      if (pinRevealTimersRef.current[index]) {
        clearTimeout(pinRevealTimersRef.current[index]);
      }
      pinRevealTimersRef.current[index] = setTimeout(() => {
        setPinReveal((prev) => {
          const next = [...prev];
          next[index] = false;
          return next;
        });
      }, 400);
    }, []);

    const updatePinSlot = (nextValue) => {
      const cleaned = (nextValue || "").replace(/[^0-9]/g, "");
      if (!cleaned) return;
      const chars = cleaned.split("");
      const nextSlots = [...pinSlots];
      const firstEmpty = getFirstEmptyPinIndex();
      let cursor = firstEmpty === -1 ? nextSlots.length - 1 : firstEmpty;
      chars.forEach((char) => {
        if (cursor < nextSlots.length) {
          nextSlots[cursor] = char;
          setPinRevealIndex(cursor);
          cursor += 1;
        }
      });
      setPinValue(nextSlots.join(""));
      if (cursor < nextSlots.length) {
        focusPinInput(cursor);
      } else {
        pinInputRefs.current[nextSlots.length - 1]?.blur();
      }
    };

    const handlePinKeyDown = (event) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        const lastFilled = getLastFilledPinIndex();
        if (lastFilled === -1) return;
        const nextSlots = [...pinSlots];
        nextSlots[lastFilled] = "";
        setPinValue(nextSlots.join(""));
        focusPinInput(lastFilled);
      }
    };

    const resetPinForm = useCallback(() => {
      setPinValue("");
      setPinFirst("");
      setPinStep("create");
      setShowPinForm(false);
      setPinReveal([false, false, false, false]);
      pinRevealTimersRef.current.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
      pinRevealTimersRef.current = [];
      document.activeElement?.blur();
    }, []);

    const openPinForm = () => {
      setPinValue("");
      setPinFirst("");
      setPinStep("create");
      setPinReveal([false, false, false, false]);
      setShowPinForm(true);
    };

    const handlePinNext = () => {
      if (!pinComplete) return;
      setPinFirst(pinValue);
      setPinValue("");
      setPinStep("confirm");
      setPinReveal([false, false, false, false]);
      focusPinInput(0);
    };

    const handlePinConfirm = () => {
      if (!pinComplete || !pinMatches) return;
      setPinEnabled(true);
      resetPinForm();
    };

    const handleRemovePassword = () => {
      if (methodsCount <= 1) {
        setRemovalBlocked(true);
        setDismissedMethodsWarning(false);
        return;
      }
      setPasswordEnabled(false);
    };

    const handleRemoveFingerprint = () => {
      if (methodsCount <= 1) {
        setRemovalBlocked(true);
        setDismissedMethodsWarning(false);
        return;
      }
      setFingerprintEnabled(false);
    };

    const handleRemovePin = () => {
      if (methodsCount <= 1) {
        setRemovalBlocked(true);
        setDismissedMethodsWarning(false);
        return;
      }
      setPinEnabled(false);
    };

    const handlePinPointerDown = (event) => {
      event.preventDefault();
      const firstEmpty = getFirstEmptyPinIndex();
      const targetIndex = firstEmpty === -1 ? pinSlots.length - 1 : firstEmpty;
      pinInputRefs.current[targetIndex]?.focus();
    };

    const registerPinRef = (index) => (el) => {
      pinInputRefs.current[index] = el;
    };

    const handleTogglePinForm = () => {
      if (showPinForm) {
        resetPinForm();
      } else {
        openPinForm();
        focusPinInput(0);
      }
    };

    const handleAddFingerprint = () => {
      openModal("FingerprintPrompt", {
        onConfirm: () => setFingerprintEnabled(true),
        userId: accessUser?.id_auth ?? accessUser?.id ?? null,
        email: accessUser?.email ?? null,
        displayName: accessUser?.nombre ?? accessUser?.alias ?? "Usuario",
      });
    };

    useEffect(() => {
      return () => {
        pinRevealTimersRef.current.forEach((timer) => {
          if (timer) clearTimeout(timer);
        });
      };
    }, []);

    return (
      <Access
        warningBlock={
          showMethodsWarning ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-center gap-3 text-xs text-red-500">
              <TriangleAlert size={16} className="text-red-500" />
              Es necesario al menos un metodo de verificacion.
              <button
                type="button"
                onClick={() => setDismissedMethodsWarning(true)}
                className="ml-auto text-red-400 hover:text-red-500"
                aria-label="Cerrar aviso"
              >
                <X size={14} />
              </button>
            </div>
          ) : null
        }
        blocks={[
          <PasswordAccessCard
            key="password"
            passwordActive={passwordActive}
            showPasswordForm={showPasswordForm}
            passwordMode={passwordMode}
            currentPassword={currentPassword}
            passwordValue={passwordValue}
            passwordConfirm={passwordConfirm}
            showPassword={showPassword}
            showPasswordConfirm={showPasswordConfirm}
            showCurrentPassword={showCurrentPassword}
            hasMinLength={hasMinLength}
            hasNumberAndSymbol={hasNumberAndSymbol}
            passwordsMatch={passwordsMatch}
            showPasswordRules={showPasswordRules}
            showPasswordErrors={showPasswordErrors}
            showConfirmErrors={showConfirmErrors}
            showConfirmRule={showConfirmRule}
            canSavePassword={canSavePassword}
            showCurrentPasswordError={showCurrentPasswordError}
            onPasswordCancel={handlePasswordCancel}
            onPasswordSave={handlePasswordSave}
            onOpenAdd={openAddPassword}
            onOpenChange={openChangePassword}
            onRemovePassword={handleRemovePassword}
            onToggleShowPassword={() => setShowPassword((prev) => !prev)}
            onToggleShowPasswordConfirm={() =>
              setShowPasswordConfirm((prev) => !prev)
            }
            onToggleShowCurrentPassword={() =>
              setShowCurrentPassword((prev) => !prev)
            }
            onChangeCurrentPassword={(event) =>
              setCurrentPassword(event.target.value)
            }
            onChangePasswordValue={(event) =>
              setPasswordValue(event.target.value)
            }
            onChangePasswordConfirm={(event) =>
              setPasswordConfirm(event.target.value)
            }
            onFocusField={handlePasswordFocus}
            onBlurField={handlePasswordBlur}
            passwordFormRef={passwordFormRef}
            currentPasswordRef={currentPasswordRef}
            passwordInputRef={passwordInputRef}
            confirmInputRef={confirmInputRef}
          />,
          <FingerprintAccessCard
            key="fingerprint"
            enabled={fingerprintEnabled}
            onAdd={handleAddFingerprint}
            onRemove={handleRemoveFingerprint}
          />,
          <PinAccessCard
            key="pin"
            showPinForm={showPinForm}
            pinEnabled={pinEnabled}
            pinStep={pinStep}
            pinSlots={pinSlots}
            pinReveal={pinReveal}
            pinComplete={pinComplete}
            pinMatches={pinMatches}
            onRemovePin={handleRemovePin}
            onTogglePinForm={handleTogglePinForm}
            onPinPointerDown={handlePinPointerDown}
            onUpdatePinSlot={updatePinSlot}
            onPinKeyDown={handlePinKeyDown}
            registerPinRef={registerPinRef}
            onResetPinForm={resetPinForm}
            onPinNext={handlePinNext}
            onPinConfirm={handlePinConfirm}
          />,
        ]}
        infoBlock={
          !dismissedInfo ? (
            <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
              <KeyRound size={16} className="text-[#5E30A5]" />
              Cambios sensibles requieren verificacion antes de guardarse.
              <button
                type="button"
                onClick={() => {
                  accessInfoDismissed = true;
                  setDismissedInfo(true);
                }}
                className="ml-auto text-slate-400 hover:text-slate-500"
                aria-label="Cerrar aviso"
              >
                <X size={14} />
              </button>
            </div>
          ) : null
        }
      />
    );
  }, []);

  const LinkedAccountsPanel = useCallback(function LinkedAccountsPanel({
    usuario: linkedUser,
  }) {
    const [linked, setLinked] = useState({});
    const [verified] = useState(false);
    const [dismissedInfo, setDismissedInfo] = useState(false);

    useEffect(() => {
      const provider = (linkedUser?.provider || "").toLowerCase();
      if (!provider) return;
      const mapped =
        provider === "google"
          ? "Google"
          : provider === "facebook"
            ? "Facebook"
            : provider === "apple"
              ? "Apple"
              : provider === "instagram"
                ? "Instagram"
                : provider === "discord"
                  ? "Discord"
                  : null;
      if (!mapped) return;
      setLinked((prev) => ({ ...prev, [mapped]: true }));
    }, [linkedUser?.provider]);

    const toggleProvider = useCallback((providerKey) => {
      setLinked((prev) => ({ ...prev, [providerKey]: !prev[providerKey] }));
    }, []);

    return (
      <LinkedAccounts
        blocks={[
          <LinkedAccountsCard
            key="linked-accounts"
            linked={linked}
            verified={verified}
            onToggle={toggleProvider}
          />,
        ]}
        infoBlock={
          !dismissedInfo ? (
            <div className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] p-4 flex items-center gap-3 text-xs text-slate-500">
              <KeyRound size={16} className="text-[#5E30A5]" />
              Cambios sensibles requieren verificacion antes de guardarse.
              <button
                type="button"
                onClick={() => setDismissedInfo(true)}
                className="ml-auto text-slate-400 hover:text-slate-500"
                aria-label="Cerrar aviso"
              >
                <X size={14} />
              </button>
            </div>
          ) : null
        }
      />
    );
  }, []);

  const NotificationsPanel = useCallback(function NotificationsPanel() {
    const { openModal } = useModal();
    const [prefs, setPrefs] = useState(DEFAULT_NOTIFICATION_PREFS);
    const [permission, setPermission] = useState("default");
    const [pushEnabled, setPushEnabled] = useState(false);
    const [dismissedWarning, setDismissedWarning] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const nextPermission =
        typeof Notification !== "undefined" ? Notification.permission : "default";
      setPermission(nextPermission);

      if (!("serviceWorker" in navigator)) return;
      navigator.serviceWorker.ready
        .then((reg) => reg.pushManager?.getSubscription?.())
        .then((sub) => {
          setPushEnabled(Boolean(sub));
        })
        .catch(() => {
          setPushEnabled(false);
        });
    }, []);

    const toggle = useCallback(
      (section) => {
        setPrefs((prev) => ({
          ...prev,
          [section]: !prev[section],
        }));
        openModal("Notifications");
      },
      [openModal]
    );

    const statusLabel =
      permission === "granted"
        ? "Permitidas"
        : permission === "denied"
          ? "Bloqueadas"
          : "No configuradas";

    const showChannels = permission === "granted";
    const showWarning = !showChannels && !dismissedWarning;

    return (
      <Notifications
        blocks={[
          <NotificationsPreferencesCard
            key="notifications"
            permission={permission}
            statusLabel={statusLabel}
            channels={NOTIFICATION_CHANNELS}
            prefs={prefs}
            onToggle={toggle}
            showChannels={showChannels}
            showWarning={showWarning}
            onDismissWarning={() => setDismissedWarning(true)}
          />,
        ]}
      />
    );
  }, []);

  const AppAppearancePanel = useCallback(function AppAppearancePanel() {
    const [theme, setTheme] = useState("claro");
    const [font, setFont] = useState("actual");

    return (
      <AppAppearance
        blocks={[
          <ThemeSelector key="theme" value={theme} onChange={setTheme} />,
          <FontSelector key="font" value={font} onChange={setFont} />,
        ]}
      />
    );
  }, []);

  const LanguagePanel = useCallback(function LanguagePanel() {
    const [language, setLanguage] = useState("es");

    return (
      <Language
        blocks={[
          <LanguageSelector
            key="language-selector"
            value={language}
            onChange={setLanguage}
          />,
        ]}
      />
    );
  }, []);

  const HelpPanel = useCallback(function HelpPanel() {
    return (
      <Help
        blocks={[
          <SupportHelpOptions
            key="support-help"
            options={[
              "Preguntas frecuentes",
              "Recibir soporte por correo",
              "Chatear con un asesor",
            ]}
          />,
        ]}
      />
    );
  }, []);

  const FeedbackPanel = useCallback(function FeedbackPanel() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    return (
      <Feedback
        blocks={[
          <SupportFeedbackForm
            key="support-feedback"
            message={message}
            email={email}
            onChangeMessage={setMessage}
            onChangeEmail={setEmail}
          />,
        ]}
      />
    );
  }, []);

  const BeneficiosPanel = useCallback(
    ({ usuario: benefitsUser }) => {
      const plan = getPlanFallback(benefitsUser?.role);
      const tier = getTierMeta(benefitsUser);
      const progress = getTierProgress(benefitsUser);

      return (
        <Beneficios
          title="Tier (Liga)"
          subtitle="Avanza y desbloquea beneficios."
          blocks={[
            <TierCurrentCard
              key="tier-current"
              badgeLabel={tier.label}
              pointsLabel={formatCompactNumber(progress.points)}
              goalLabel={formatCompactNumber(progress.nextGoal)}
              progress={progress.progress}
              perks={plan?.perks || []}
            />,
            <TierNextCard key="tier-next" perks={plan?.perks || []} />,
            <ExploreTiersCard key="tier-explore" />,
          ]}
        />
      );
    },
    []
  );

  const ManageAccountPanel = useCallback(
    ({ usuario: manageUser, setUser: setManageUser, verification }) => (
      <ManageAccount
        blocks={[
          !verification.accountVerified ? (
            <AccountStatusCard
              key="account-status"
              subtitle="Verifica tu cuenta para acceder a mejores beneficios."
            />
          ) : null,
          <DangerZone key="danger-zone" usuario={manageUser} setUser={setManageUser} />,
        ]}
      />
    ),
    []
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
      "security-access": AccessPanel,
      "security-links": LinkedAccountsPanel,
      overview: OverviewPanel,
      twofa: TwoFAPanel,
      sessions: SessionsPanel,
      notifications: NotificationsPanel,
      plan: BeneficiosPanel,
      appearance: AppAppearancePanel,
      language: LanguagePanel,
      help: HelpPanel,
      feedback: FeedbackPanel,
      manage: ManageAccountPanel,
    }),
    [
      AccessPanel,
      LinkedAccountsPanel,
      NotificationsPanel,
      BeneficiosPanel,
      AppAppearancePanel,
      LanguagePanel,
      HelpPanel,
      FeedbackPanel,
      ManageAccountPanel,
      OverviewPanel,
      PersonalDataPanel,
      SessionsPanel,
      TwoFAPanel,
    ]
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
