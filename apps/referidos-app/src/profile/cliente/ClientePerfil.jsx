/* eslint-disable react-hooks/exhaustive-deps */
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
  RefreshCcw,
  TriangleAlert,
  Shield,
  UserCircle,
  X,
} from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { useClienteUI } from "../../cliente/hooks/useClienteUI";
import usePinSetup from "../../hooks/usePinSetup";
import {
  formatReadableDate,
  formatCompactNumber,
  getAvatarSrc,
  getPlanFallback,
  getRoleLabel,
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
import { useCacheStore } from "../../cache/cacheStore";
import { CACHE_KEYS } from "../../cache/cacheKeys";
import ProfileOverview from "../shared/sections/ProfileOverview";
import PersonalData from "../shared/sections/PersonalData";
import Access from "../shared/sections/Access";
import LinkedAccounts from "../shared/sections/LinkedAccounts";
import TwoFA from "../shared/sections/TwoFA";
import Sessions from "../shared/sections/Sessions";
import Notifications from "../shared/sections/Notifications";
import Beneficios from "../shared/sections/Beneficios";
import ManageAccount from "../shared/sections/ManageAccount";

// Lint purge (no-unused-vars): se purgaron `navigate`, y lecturas de `passwordAttempted`/`pushEnabled` (bloques de acceso y notificaciones).
import AppAppearance from "../shared/sections/AppAppearance";
import Language from "../shared/sections/Language";
import Help from "../shared/sections/Help";
import SupportChat from "../shared/sections/SupportChat";
import SupportEmail from "../shared/sections/SupportEmail";
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
import useMfaState from "../shared/hooks/useMfaState";
import SupportHelpOptions from "../shared/blocks/SupportHelpOptions";
import FaqContent from "../shared/blocks/FaqContent";
import SupportFeedbackForm from "../shared/blocks/SupportFeedbackForm";
import NotificationsPreferencesCard, {
  DEFAULT_NOTIFICATION_PREFS,
  NOTIFICATION_CHANNELS,
} from "../shared/blocks/NotificationsPreferencesCard";
import VerificationCard from "../shared/blocks/VerificationCard";
import { useModal } from "../../modals/useModal";
import { supabase } from "../../lib/supabaseClient";
import {
  listCurrentUserSessions,
  revokeAllSessions,
  revokeSessionById,
} from "../../services/sessionDevicesService";
import {
  deleteBiometricToken,
  deletePinHash,
  generatePinSalt,
  hashPin,
  loadDeviceSecret,
  saveBiometricToken,
  saveDeviceSecret,
  savePinHash,
} from "../../services/secureStorageService";
import { logCatalogBreadcrumb } from "../../services/loggingClient";

const getDeviceIcon = (session) => {
  const raw = `${session?.device || ""} ${session?.platform || ""}`.toLowerCase();
  if (raw.includes("movil") || raw.includes("android") || raw.includes("ios")) {
    return Smartphone;
  }
  if (raw.includes("tablet")) return Tablet;
  if (raw.includes("pwa")) return Monitor;
  return Laptop;
};
let accessInfoDismissed = false;

export default function ClientePerfil() {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const logout = useAppStore((s) => s.logout);
  const accessMethods = useAppStore((s) => s.accessMethods);
  const requestLocalVerification = useAppStore(
    (s) => s.security.requestLocalVerification
  );
  const requestPasswordVerification = useAppStore(
    (s) => s.security.requestPasswordVerification
  );
  const { openModal } = useModal();
  const { setHeaderOptions } = useClienteHeader();
  const isActive = useCacheStore(
    (state) => state.activeKeys.cliente === CACHE_KEYS.CLIENTE_PERFIL
  );
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
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessionsError, setSessionsError] = useState(null);
  const twoFASms = false;
  const {
    loading: mfaLoading,
    error: mfaError,
    totpEnabled,
    totpFactorId,
    refresh: refreshMfa,
  } = useMfaState();
  const [twoFADismissed, setTwoFADismissed] = useState(false);
  const [aliasStatus, setAliasStatus] = useState(null);
  const [helpView, setHelpView] = useState("menu");

  const loadSessions = useCallback(async () => {
    setSessionsLoading(true);
    setSessionsError(null);
    const result = await listCurrentUserSessions();
    if (!result?.ok) {
      setSessionsError(result?.error || "No se pudieron cargar las sesiones.");
      setSessionsLoading(false);
      return;
    }
    setSessions(result.sessions || []);
    setSessionsLoading(false);
  }, []);

  const handleCloseSession = useCallback(
    async (session) => {
      if (!session?.sessionId) return;
      setSessionsLoading(true);
      setSessionsError(null);
      const result = await revokeSessionById(session.sessionId);
      if (!result?.ok) {
        setSessionsError(result?.error || "No se pudo cerrar la sesion.");
        setSessionsLoading(false);
        return;
      }
      if (result?.current_session_revoked) {
        await logout();
        return;
      }
      await loadSessions();
    },
    [loadSessions, logout],
  );

  const handleCloseAllSessions = useCallback(async () => {
    setSessionsLoading(true);
    setSessionsError(null);
    const result = await revokeAllSessions();
    if (!result?.ok) {
      setSessionsError(result?.error || "No se pudieron cerrar las sesiones.");
      setSessionsLoading(false);
      return;
    }
    await logout();
  }, [logout]);

  useEffect(() => {
    if (profileView !== "tabs" || profileTab !== "sessions") return;
    loadSessions();
  }, [loadSessions, profileTab, profileView]);

  const SessionsPanel = useCallback(
    () => (
      <Sessions
        title="Sesiones y dispositivos"
        subtitle="Controla los accesos activos en tu cuenta."
        subtitleAction={
          <button
            type="button"
            className="rounded-xl border border-[#E9E2F7] bg-white p-2 text-slate-500 transition hover:text-[#5E30A5] disabled:opacity-60"
            title="Refrescar sesiones"
            onClick={loadSessions}
            disabled={sessionsLoading}
            aria-label="Refrescar sesiones"
          >
            <RefreshCcw
              size={16}
              className={sessionsLoading ? "animate-spin" : undefined}
            />
          </button>
        }
        blocks={[
          <SessionsList
            key="sessions-list"
            items={sessions}
            renderLeading={(session) => {
              const Icon = getDeviceIcon(session);
              return <Icon size={18} />;
            }}
            getPrimaryText={(session) => session.device}
            getSecondaryText={(session) =>
              `${session.location} - ${session.lastActive}`
            }
            renderTrailing={(session) =>
              session.current ? (
                <span className="rounded-xl bg-[#F3EEFF] px-2 py-1 text-[10px] font-semibold text-[#5E30A5]">
                  Actual
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCloseSession(session)}
                  className="rounded-xl border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Cerrar
                </button>
              )}
          />,
          sessionsLoading && sessions.length === 0 ? (
            <div
              key="sessions-loading"
              className="rounded-2xl border border-[#E9E2F7] bg-[#FAF8FF] px-4 py-3 text-[11px] text-slate-500 text-center"
            >
              Cargando sesiones...
            </div>
          ) : null,
          sessionsError ? (
            <div
              key="sessions-error"
              className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-[11px] text-red-500 text-center"
            >
              {sessionsError}
            </div>
          ) : null,
        ]}
        footer={
          <button
            type="button"
            onClick={handleCloseAllSessions}
            disabled={sessionsLoading}
            className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-left text-xs font-semibold text-red-600 transition hover:bg-red-100"
          >
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                <LogOut size={16} />
              </span>
              <div>
                <div>Cerrar todas</div>
                <div className="mt-1 text-[11px] font-normal text-red-500">
                  Esto cierra sesion en todos los dispositivos, incluido el
                  actual.
                </div>
              </div>
            </div>
          </button>
        }
      />
    ),
    [
      handleCloseAllSessions,
      handleCloseSession,
      sessions,
      sessionsError,
      sessionsLoading,
    ]
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
                  active: totpEnabled,
                  onChange: () => {
                    if (mfaLoading) return;
                    if (totpEnabled) {
                      openModal("TwoFADisable", {
                        factorId: totpFactorId,
                        onDisabled: refreshMfa,
                      });
                      return;
                    }
                    openModal("TwoFAEnroll", {
                      onComplete: refreshMfa,
                    });
                  },
                  disabled: mfaLoading,
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
            ]}
          />,
          mfaError ? (
            <div
              key="mfa-error"
              className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-[11px] text-red-500"
            >
              {mfaError}
            </div>
          ) : null,
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
      twoFADismissed,
      twoFASms,
      totpEnabled,
      mfaLoading,
      mfaError,
      openModal,
      refreshMfa,
      totpFactorId,
    ]
  );

  const AccessPanel = useCallback(function AccessPanel({ usuario: accessUser }) {
    const { openModal } = useModal();
    const setAccessMethods = useAppStore((s) => s.setAccessMethods);
    const setSuspendViewportResize = useAppStore(
      (s) => s.setSuspendViewportResize
    );
    const setSuspendViewportAfterNext = useAppStore(
      (s) => s.setSuspendViewportAfterNext
    );
    const freezeViewportAfterNextUpdate = useAppStore(
      (s) => s.freezeViewportAfterNextUpdate
    );
    const onboarding = useAppStore((s) => s.onboarding);
    const emailVerifiedSessionAt = useAppStore((s) => s.emailVerifiedSessionAt);
    const setEmailVerifiedSessionAt = useAppStore(
      (s) => s.setEmailVerifiedSessionAt
    );
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
    const [, setPasswordAttempted] = useState(false);
    const [showPinForm, setShowPinForm] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [authProvider, setAuthProvider] = useState(null);
    const [passwordEnabled, setPasswordEnabled] = useState(null);
    const [removalBlocked, setRemovalBlocked] = useState(false);
    const [dismissedMethodsWarning, setDismissedMethodsWarning] = useState(false);
    const [dismissedInfo, setDismissedInfo] = useState(accessInfoDismissed);
    const [emailWarningOpen, setEmailWarningOpen] = useState(false);
    const [emailWarningPulse, setEmailWarningPulse] = useState(false);
    const passwordFormRef = useRef(null);
    const currentPasswordRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmInputRef = useRef(null);
    const prevUserIdRef = useRef(null);
    const provider = (authProvider || accessUser?.provider || "").toLowerCase();
    const emailConfirmed = Boolean(onboarding?.email_confirmed);
    const emailRecentlyVerified =
      Boolean(emailVerifiedSessionAt) &&
      Date.now() - emailVerifiedSessionAt < 2 * 60 * 60 * 1000;
    const hasPassword =
      Boolean(accessUser?.has_password) ||
      provider === "email" ||
      provider === "password";
    const passwordActive = passwordEnabled ?? hasPassword;
    const methodsCount =
      (passwordActive ? 1 : 0) +
      (fingerprintEnabled ? 1 : 0) +
      (pinEnabled ? 1 : 0);
    const showMethodsWarning =
      (methodsCount === 0 || removalBlocked) && !dismissedMethodsWarning;
    const showEmailWarning = !emailConfirmed && emailWarningOpen;
    const emailWarningClass = emailWarningPulse
      ? "animate-[pulse_1.6s_ease-in-out_1]"
      : "";

    useEffect(() => {
      if (!emailConfirmed) {
        setEmailWarningOpen(true);
      }
    }, [emailConfirmed]);

    useEffect(() => {
      if (!emailWarningPulse) return undefined;
      const timer = setTimeout(() => setEmailWarningPulse(false), 1600);
      return () => clearTimeout(timer);
    }, [emailWarningPulse]);

    const triggerEmailWarning = useCallback(() => {
      if (emailWarningOpen) {
        setEmailWarningPulse(true);
        return;
      }
      setEmailWarningOpen(true);
    }, [emailWarningOpen]);

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
      setFingerprintEnabled(Boolean(accessUser?.has_biometrics));
      setPinEnabled(Boolean(accessUser?.has_pin));
    }, [accessUser?.id_auth, accessUser?.has_biometrics, accessUser?.has_pin]);

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
    const showCurrentPasswordError = false;

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

    const handlePasswordSave = async () => {
      setPasswordAttempted(true);
      if (!canSavePassword) return;
      setPasswordEnabled(true);
      setShowPasswordForm(false);
      setPasswordMode("add");
      setPasswordAttempted(false);
      const userId = accessUser?.id_auth ?? accessUser?.id ?? null;
      if (userId) {
        await supabase
          .from("usuarios")
          .update({ has_password: true, must_change_password: false })
          .eq("id_auth", userId);
      }
      if (accessUser) {
        setUser({
          ...accessUser,
          has_password: true,
          must_change_password: false,
        });
      }
    };

    const openAddPassword = () => {
      if (!emailConfirmed) {
        triggerEmailWarning();
        openModal("EmailVerification", {
          email: accessUser?.email ?? null,
        });
        return;
      }
      if (!emailRecentlyVerified) {
        openModal("EmailReauth", {
          email: accessUser?.email ?? null,
          onConfirm: () => {
            setEmailVerifiedSessionAt(Date.now());
            setPasswordMode("add");
            setCurrentPassword("");
            setPasswordValue("");
            setPasswordConfirm("");
            setPasswordAttempted(false);
            setShowPasswordForm(true);
          },
        });
        return;
      }
      setPasswordMode("add");
      setCurrentPassword("");
      setPasswordValue("");
      setPasswordConfirm("");
      setPasswordAttempted(false);
      setShowPasswordForm(true);
    };

    const openChangePassword = () => {
      requestPasswordVerification({
        requireVerifiedEmail: true,
        onBlocked: triggerEmailWarning,
        onVerified: () => {
          setPasswordMode("change");
          setCurrentPassword("");
          setPasswordValue("");
          setPasswordConfirm("");
          setPasswordAttempted(false);
          setShowPasswordForm(true);
        },
        email: accessUser?.email ?? null,
      });
    };

    const savePin = useCallback(async (nextPin) => {
      const userId = accessUser?.id_auth ?? accessUser?.id ?? null;
      if (!userId) {
        return { ok: false, error: "No se pudo obtener sesion." };
      }
      const existingSecret = await loadDeviceSecret(userId);
      if (!existingSecret) {
        const bytes = window.crypto.getRandomValues(new Uint8Array(32));
        const token = btoa(String.fromCharCode(...bytes));
        await saveDeviceSecret(userId, { token, createdAt: new Date().toISOString() });
      }
      const salt = generatePinSalt();
      const hash = await hashPin(nextPin, salt);
      const saved = await savePinHash(userId, {
        salt,
        hash,
        iterations: 160000,
        algo: "PBKDF2-SHA256",
      });
      if (!saved.ok) {
        return { ok: false, error: "No se pudo guardar el PIN." };
      }
      const { error: updErr } = await supabase
        .from("usuarios")
        .update({ has_pin: true })
        .eq("id_auth", userId);
      if (updErr) {
        return { ok: false, error: updErr.message || "No se pudo guardar el PIN." };
      }
      return { ok: true };
    }, [accessUser?.id_auth, accessUser?.id]);

    const pinSetup = usePinSetup({ onSavePin: savePin });
    const pinValue = pinSetup.pinValue;
    const pinSlots = pinSetup.pinSlots;
    const pinReveal = pinSetup.pinReveal;
    const pinStep = pinSetup.pinStep;
    const pinComplete = pinSetup.pinComplete;
    const pinMatches = pinSetup.pinMatches;
    const pinFocused = pinSetup.pinFocused;

    const resetPinForm = useCallback(() => {
      pinSetup.resetPinForm();
      setShowPinForm(false);
      setSuspendViewportResize(false);
      setSuspendViewportAfterNext(false);
      document.activeElement?.blur();
    }, [pinSetup, setSuspendViewportAfterNext, setSuspendViewportResize]);

    const openPinForm = () => {
      pinSetup.resetPinForm();
      setShowPinForm(true);
      window.requestAnimationFrame(() => {
        pinSetup.focusHiddenInput();
      });
    };

    const handlePinNext = () => {
      if (!pinComplete) return;
      setSuspendViewportAfterNext(false);
      setSuspendViewportResize(true);
      pinSetup.handlePinNext();
      window.requestAnimationFrame(() => {
        pinSetup.focusHiddenInput();
      });
    };

    const handlePinConfirm = async () => {
      const result = await pinSetup.handlePinConfirm();
      if (!result?.ok) return;
      setPinEnabled(true);
      if (accessUser) {
        setUser({ ...accessUser, has_pin: true });
      }
      resetPinForm();
    };

    const handleRemoveFingerprint = () => {
      if (methodsCount <= 1) {
        setRemovalBlocked(true);
        setDismissedMethodsWarning(false);
        return;
      }
      requestLocalVerification({
        onVerified: () => {
          openModal("ConfirmAction", {
            title: "Quitar huella",
            message: "Seguro que deseas quitar la huella?",
            confirmLabel: "Confirmar",
            cancelLabel: "Cancelar",
            onConfirm: async () => {
              const userId = accessUser?.id_auth ?? accessUser?.id ?? null;
              if (userId) {
                await supabase
                  .from("usuarios")
                  .update({ has_biometrics: false })
                  .eq("id_auth", userId);
                await deleteBiometricToken(userId);
              }
              setFingerprintEnabled(false);
              if (accessUser) {
                setUser({ ...accessUser, has_biometrics: false });
              }
            },
          });
        },
        userId: accessUser?.id_auth ?? accessUser?.id ?? null,
        email: accessUser?.email ?? null,
        displayName: accessUser?.nombre ?? accessUser?.alias ?? "Usuario",
      });
    };

    const handleRemovePin = () => {
      if (methodsCount <= 1) {
        setRemovalBlocked(true);
        setDismissedMethodsWarning(false);
        return;
      }
      requestLocalVerification({
        onVerified: () => {
          openModal("ConfirmAction", {
            title: "Quitar PIN",
            message: "Seguro que deseas quitar el PIN?",
            confirmLabel: "Confirmar",
            cancelLabel: "Cancelar",
            onConfirm: async () => {
              const userId = accessUser?.id_auth ?? accessUser?.id ?? null;
              if (userId) {
                await supabase
                  .from("usuarios")
                  .update({ has_pin: false })
                  .eq("id_auth", userId);
                await deletePinHash(userId);
              }
              setPinEnabled(false);
              if (accessUser) {
                setUser({ ...accessUser, has_pin: false });
              }
            },
          });
        },
        userId: accessUser?.id_auth ?? accessUser?.id ?? null,
        email: accessUser?.email ?? null,
        displayName: accessUser?.nombre ?? accessUser?.alias ?? "Usuario",
      });
    };

    const handlePinPointerDown = (event) => {
      event.preventDefault();
      pinSetup.focusHiddenInput();
    };

    const registerHiddenRef = (el) => {
      pinSetup.registerHiddenRef(el);
    };

    const handlePinFocus = useCallback(() => {
      const vv = window.visualViewport;
      const height = vv?.height ?? window.innerHeight;
      const keyboardOpen = height < window.innerHeight - 40;
      if (keyboardOpen) {
        setSuspendViewportAfterNext(false);
        setSuspendViewportResize(true);
      } else {
        freezeViewportAfterNextUpdate();
      }
      pinSetup.setPinFocus(true);
    }, [
      freezeViewportAfterNextUpdate,
      pinSetup,
      setSuspendViewportAfterNext,
      setSuspendViewportResize,
    ]);

    const handlePinBlur = useCallback(() => {
      if (!showPinForm) {
        setSuspendViewportResize(false);
        setSuspendViewportAfterNext(false);
      }
      pinSetup.setPinFocus(false);
    }, [
      pinSetup,
      setSuspendViewportAfterNext,
      setSuspendViewportResize,
      showPinForm,
    ]);

    const handleTogglePinForm = () => {
      if (showPinForm) {
        resetPinForm();
        return;
      }
        requestLocalVerification({
          onVerified: () => {
            openPinForm();
          },
          onBlocked: triggerEmailWarning,
        requireVerifiedEmail: true,
        userId: accessUser?.id_auth ?? accessUser?.id ?? null,
        email: accessUser?.email ?? null,
        displayName: accessUser?.nombre ?? accessUser?.alias ?? "Usuario",
      });
    };

    const handleAddFingerprint = () => {
      requestLocalVerification({
        onVerified: () => {
          openModal("FingerprintPrompt", {
            onConfirm: async (credentialId) => {
              const userId = accessUser?.id_auth ?? accessUser?.id ?? null;
              if (!userId) return;
              const existingSecret = await loadDeviceSecret(userId);
              if (!existingSecret) {
                const bytes = window.crypto.getRandomValues(new Uint8Array(32));
                const token = btoa(String.fromCharCode(...bytes));
                await saveDeviceSecret(userId, { token, createdAt: new Date().toISOString() });
              }
              if (!credentialId) return;
              await saveBiometricToken(userId, {
                credentialId,
                createdAt: new Date().toISOString(),
              });
              await supabase
                .from("usuarios")
                .update({ has_biometrics: true })
                .eq("id_auth", userId);
              setFingerprintEnabled(true);
              if (accessUser) {
                setUser({ ...accessUser, has_biometrics: true });
              }
            },
            userId: accessUser?.id_auth ?? accessUser?.id ?? null,
            email: accessUser?.email ?? null,
            displayName: accessUser?.nombre ?? accessUser?.alias ?? "Usuario",
          });
        },
        onBlocked: triggerEmailWarning,
        requireVerifiedEmail: true,
        userId: accessUser?.id_auth ?? accessUser?.id ?? null,
        email: accessUser?.email ?? null,
        displayName: accessUser?.nombre ?? accessUser?.alias ?? "Usuario",
      });
    };

    return (
      <Access
        warningBlock={
          showEmailWarning || showMethodsWarning ? (
            <div className="space-y-2">
              {showEmailWarning ? (
                <div
                  className={`relative left-1/2 right-1/2 w-screen -mx-[50vw] ${emailWarningClass}`}
                >
                  <div className="flex items-center gap-3 border border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-600">
                    <AlertTriangle size={14} className="shrink-0" />
                    <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      Antes de realizar cambios sensibles,{" "}
                      <button
                        type="button"
                        onClick={() =>
                          openModal("EmailVerification", {
                            email: accessUser?.email ?? null,
                          })
                        }
                        className="underline underline-offset-2"
                      >
                        verifica tu correo
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailWarningOpen(false);
                        setEmailWarningPulse(false);
                      }}
                      className="text-orange-400 hover:text-orange-500"
                      aria-label="Cerrar aviso"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : null}
              {showMethodsWarning ? (
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
              ) : null}
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
              pinValue={pinValue}
              pinSlots={pinSlots}
              pinReveal={pinReveal}
              pinComplete={pinComplete}
              pinMatches={pinMatches}
              pinFocused={pinFocused}
              onRemovePin={handleRemovePin}
              onTogglePinForm={handleTogglePinForm}
              onPinPointerDown={handlePinPointerDown}
              onPinValueChange={pinSetup.updatePinValueDirect}
              onPinFocus={handlePinFocus}
              onPinBlur={handlePinBlur}
              registerHiddenRef={registerHiddenRef}
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
    const [, setPushEnabled] = useState(false);
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

  const handleHelpSelect = useCallback((option) => {
    logCatalogBreadcrumb("support.help.select", {
      option: option || "unknown",
      role: "cliente",
    });
    if (option === "Preguntas frecuentes") {
      setHelpView("faq");
      return;
    }
    if (option === "Chatear con un asesor") {
      setHelpView("support_chat");
      return;
    }
    if (option === "Recibir soporte por correo") {
      setHelpView("support_email");
    }
  }, []);

  const HelpPanel = useCallback(
    function HelpPanel() {
      return (
          <Help
            blocks={[
              helpView === "faq" ? (
                <FaqContent
                  key="faq"
                  audience="cliente"
                  onBack={() => setHelpView("menu")}
                />
              ) : helpView === "support_chat" ? (
                <SupportChat
                  key="support-chat"
                  role="cliente"
                  onBack={() => setHelpView("menu")}
                />
              ) : helpView === "support_email" ? (
                <SupportEmail
                  key="support-email"
                  onBack={() => setHelpView("menu")}
                />
              ) : (
                <SupportHelpOptions
                  key="support-help"
                  options={[
                    "Preguntas frecuentes",
                    "Recibir soporte por correo",
                    "Chatear con un asesor",
                  ]}
                  onSelect={handleHelpSelect}
                />
              ),
            ]}
          />
        );
      },
    [handleHelpSelect, helpView]
    );

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
              key="overview-benefits"
              title="Tier"
              badgeLabel={tier.label}
              BadgeIcon={Sparkles}
              perks={plan?.perks || []}
            />
          }
          secondaryBlock={
            <AliasCard
              key="overview-alias"
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
    if (!isActive) {
      setHeaderOptions({
        mode: "default",
        onSearchBack: null,
        headerVisible: true,
        profileDockOpen: true,
        profileTitle: "Configuracion",
      });
      return undefined;
    }
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
        profileTitle: "Configuracion",
      });
    };
  }, [
    dockOpenForHeader,
    handleBack,
    isActive,
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
    if (!isActive) {
      setDockTarget(null);
      setDockOpenForHeader(false);
      return;
    }
    setDockTarget(document.getElementById("cliente-header-search-dock"));
  }, [isActive]);

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
      {isActive && dockTarget
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
                <TEMP_MOTION_SPLASH_TAG
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
                </TEMP_MOTION_SPLASH_TAG>
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
