// src/pages/Auth.jsx
import React, { useEffect, useRef, useState, useMemo, useLayoutEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  EMAIL_RE,
  PHONE_RE,
  CODE_RE,
  validarCedula,
  validateEmail,
  validatePhone,
} from "../utils/validators";
import { useAppStore } from "../store/appStore";
import { signInWithOAuth, getSessionUserProfile, signOut, updateUserProfile } from "../services/authService";
import { useModal } from "../modals/useModal";
import { supabase } from "../lib/supabaseClient";

const CODES_KEY = "registration_codes";
const DEFAULT_CODES = ["REF-001532", "REF-003765"];
const OAUTH_INTENT_KEY = "registro_oauth_intent";
const REG_STATUS_PREFIX = "reg_status_";

export default function AuthHub() {
  const navigate = useNavigate();
  const register = useAppStore((s) => s.register);
  const login = useAppStore((s) => s.login);
  const setUser = useAppStore((s) => s.setUser);
  const { openModal, closeModal } = useModal();
  const location = useLocation();
  const roleFromSplash = location.state?.role || null;
  const codeFromSplash = location.state?.codigo || "";
  const fromOAuth = location.state?.fromOAuth || false;
  const pageFromState = location.state?.page || null;
  const authCredsFromChoice = location.state?.authCreds || null;

  const [cardHeight, setCardHeight] = useState(null);
  const [sliderHeight, setSliderHeight] = useState(null);

  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const sliderRef = useRef(null);
  const regPage1Ref = useRef(null); // antes page2: datos del propietario
  const regPage2Ref = useRef(null); // antes page3: datos del negocio

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState(codeFromSplash);
  const [codeValid, setCodeValid] = useState(roleFromSplash === "negocio");
  const [codeChecking, setCodeChecking] = useState(false);

  const [nombreDueno, setNombreDueno] = useState("");
  const [apellidoDueno, setApellidoDueno] = useState("");

  const [ruc, setRuc] = useState("");
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [sectorNegocio, setSectorNegocio] = useState("");
  const [calle1, setCalle1] = useState("");
  const [calle2, setCalle2] = useState("");

  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [animating, setAnimating] = useState(false);
  const [entryStep, setEntryStep] = useState("email");
  const [authTab, setAuthTab] = useState("login");
  const [loginLoading, setLoginLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthProvider, setOauthProvider] = useState(null);
  const [oauthIntentRole, setOauthIntentRole] = useState(null);
  const [startedWithOAuth, setStartedWithOAuth] = useState(false);
  const [roleLocked, setRoleLocked] = useState(false);
  const [codeLocked, setCodeLocked] = useState(false);
  const [lastValidCode, setLastValidCode] = useState(codeFromSplash || "");
  const [selectedChoiceRole, setSelectedChoiceRole] = useState(null);
  const allowExitRef = useRef(false);
  const [oauthExit, setOauthExit] = useState(false);
  const [pendingOAuthProfile, setPendingOAuthProfile] = useState(null);

  const redirectTo =
    (typeof window !== "undefined" && `${window.location.origin}/auth`) ||
    import.meta.env.VITE_AUTH_REDIRECT_URL;

  useEffect(() => {
    if (!localStorage.getItem(CODES_KEY)) {
      localStorage.setItem(CODES_KEY, JSON.stringify(DEFAULT_CODES));
    }
  }, []);

  const effectiveRole = roleFromSplash || oauthIntentRole || null;
  const leaveGuardActive = entryStep === "form" && roleLocked && codeLocked && !allowExitRef.current;
  const setRegStatus = async (status) => {
    let uid = pendingOAuthProfile?.id_auth || null;
    if (!uid) {
      try {
        const session = (await supabase?.auth?.getSession())?.data?.session;
        uid = session?.user?.id || null;
      } catch {
        uid = null;
      }
    }
    if (!uid) return;
    try {
      if (!status) localStorage.removeItem(`${REG_STATUS_PREFIX}${uid}`);
      else localStorage.setItem(`${REG_STATUS_PREFIX}${uid}`, status);
    } catch {
      /* ignore */
    }
  };
  const getRegStatus = (uid) => {
    if (!uid) return null;
    try {
      return localStorage.getItem(`${REG_STATUS_PREFIX}${uid}`);
    } catch {
      return null;
    }
  };

  const saveOAuthIntent = (role) => {
    try {
      localStorage.setItem(OAUTH_INTENT_KEY, JSON.stringify({ role, ts: Date.now() }));
    } catch {
      // ignore
    }
  };

  const clearOAuthIntent = () => {
    try {
      localStorage.removeItem(OAUTH_INTENT_KEY);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!roleFromSplash) return;
    clearOAuthIntent();
    setOauthIntentRole(null);
    setPendingOAuthProfile(null);
    setStartedWithOAuth(false);
    const targetPage = pageFromState && pageFromState >= 2 ? pageFromState : 2;
    setEntryStep(targetPage >= 2 ? "form" : "email");
    setAuthTab(targetPage >= 2 ? "register" : "login");
    setLoginLoading(false);
    setPage(targetPage);
    setError("");
    setOauthProvider(null);
    setOauthLoading(false);
    setCodigo(codeFromSplash || "");
    if (codeFromSplash) setLastValidCode(codeFromSplash);
    setCodeValid(roleFromSplash === "negocio");
    if (roleFromSplash === "negocio") setRoleLocked(true);
    if (roleFromSplash === "negocio") setSelectedChoiceRole("negocio");
  }, [roleFromSplash, codeFromSplash, pageFromState]);

  useEffect(() => {
    if (!authCredsFromChoice) return;
    if (authCredsFromChoice.email) setEmail(authCredsFromChoice.email);
    if (authCredsFromChoice.password) setPassword(authCredsFromChoice.password);
    if (authCredsFromChoice.telefono) setTelefono(authCredsFromChoice.telefono);
    if (authCredsFromChoice.role === "negocio") {
      setEntryStep("form");
      setAuthTab("register");
      setPage(authCredsFromChoice.page || 2);
      const incomingCode = authCredsFromChoice.codigo || codeFromSplash || "";
      setCodigo(incomingCode);
      if (incomingCode) setLastValidCode(incomingCode);
      setCodeValid(true);
      setOauthIntentRole("negocio");
      setRoleLocked(true);
      setSelectedChoiceRole("negocio");
      if (authCredsFromChoice.codigo) setCodeLocked(true);
      else if (codeFromSplash) setCodeLocked(true);
    }
  }, [authCredsFromChoice]);

  useEffect(() => {
    if (!location.state?.openChoice) return;
    const { openChoice, ...rest } = location.state || {};
    setAuthTab("register");
    setEntryStep("email");
    setPage(1);
    setError("");
    setStartedWithOAuth(false);
    setRoleLocked(false);
    setCodeLocked(false);
    openChoiceOverlay();
    navigate(location.pathname, { replace: true, state: { ...rest } });
  }, [location.state?.openChoice, location.pathname, navigate]);

  useEffect(() => {
    if (roleFromSplash) return;
    try {
      const raw = localStorage.getItem(OAUTH_INTENT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const age = parsed?.ts ? Date.now() - parsed.ts : 0;
      if (parsed?.role && (!parsed?.ts || age < 15 * 60 * 1000)) {
        setOauthIntentRole(parsed.role);
        setEntryStep("form");
        setPage(pageFromState || 2);
        setStartedWithOAuth(true);
        setPendingOAuthProfile(null);
        if (parsed.role === "negocio") setCodeValid(true);
        if (parsed.role === "negocio") setSelectedChoiceRole("negocio");
      }
    } catch {
      // ignore
    }
  }, [pageFromState]);

  useEffect(() => {
    if (codeLocked && CODE_RE.test((codigo || lastValidCode || "").toString())) {
      setSelectedChoiceRole((prev) => prev || "negocio");
      setRoleLocked(true);
      if (!codigo && lastValidCode) setCodigo(lastValidCode);
    }
  }, [codeLocked, codigo, lastValidCode]);

  const showLeaveModal = () => {
    openModal("AbandonarRegistro", {
      onAbandon: () => {
        allowExitRef.current = true;
        clearOAuthIntent();
        setPendingOAuthProfile(null);
        signOut();
        window.location.assign("/");
      },
      onStay: () => {
        allowExitRef.current = false;
      },
    });
  };

  useEffect(() => {
    if (!leaveGuardActive) return;
    const handleBeforeUnload = (e) => {
      if (allowExitRef.current || oauthExit) return;
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveGuardActive, oauthExit]);

  useEffect(() => {
    // Si vuelve de OAuth con sesion activa, mostrar mensaje y redirigir.
    (async () => {
      const user = await getSessionUserProfile();
      if (!user) {
        setOauthExit(false);
        allowExitRef.current = false;
        return;
      }

      let intendedRole = null;
      let hasIntent = false;
      try {
        const raw = localStorage.getItem(OAUTH_INTENT_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const age = parsed?.ts ? Date.now() - parsed.ts : 0;
          if (!parsed?.ts || age < 15 * 60 * 1000) {
            intendedRole = parsed?.role || null;
            hasIntent = true;
          }
        }
      } catch {
        intendedRole = null;
      }
      localStorage.removeItem(OAUTH_INTENT_KEY);

      if (hasIntent && startedWithOAuth) {
        setPendingOAuthProfile(user);
        if (user?.email) setEmail((prev) => prev || user.email);
        setOauthExit(false);
        allowExitRef.current = false;
        if (intendedRole === "negocio") {
          setEntryStep("form");
          setPage(pageFromState || 2);
          setCodeValid(true);
        }
        return;
      }

      const regStatus = getRegStatus(user?.id_auth);
      setUser(user);
      setOauthExit(false);
      allowExitRef.current = false;

      if (user.registro_estado !== "completo") {
        if (user.role === "negocio") {
          setEntryStep("form");
          setAuthTab("register");
          setRoleLocked(true);
          setCodeValid(true);
          setSelectedChoiceRole("negocio");
          const targetPage = regStatus === "negocio_page3" ? 3 : 2;
          setPage(targetPage);
          return;
        }
        if (user.role === "cliente") {
          setAuthTab("register");
          setEntryStep("email");
          setPage(1);
          return;
        }
      }

      if (user.role === "admin") navigate("/admin/inicio", { replace: true });
      else if (user.role === "negocio") navigate("/negocio/inicio", { replace: true });
      else navigate("/cliente/inicio", { replace: true });
    })();
  }, [navigate, setUser]);

  async function fakeValidateCode(code) {
    await new Promise((r) => setTimeout(r, 250));
    try {
      const raw = localStorage.getItem(CODES_KEY);
      const list = raw ? JSON.parse(raw) : DEFAULT_CODES;
      return { ok: list.includes(code) };
    } catch {
      return { ok: false };
    }
  }

  useEffect(() => {
    let mounted = true;

    if (!codigo || !CODE_RE.test(codigo)) {
      setCodeValid(effectiveRole === "negocio");
      return;
    }

    setCodeChecking(true);

    fakeValidateCode(codigo)
      .then((res) => {
        if (!mounted) return;
        setCodeValid(res.ok);
      })
      .finally(() => mounted && setCodeChecking(false));

    return () => {
      mounted = false;
    };
  }, [codigo, roleFromSplash, effectiveRole]);

  const sliderGap = 28;
  const containerStyle = useMemo(
    () => ({
      display: "flex",
      flexDirection: "column",
      gap: sliderGap,
      transition: "opacity 250ms ease",
      filter: animating ? "blur(1.2px)" : "none",
      opacity: animating ? 0.55 : 1,
      width: "100%",
      boxSizing: "border-box",
    }),
    [animating, sliderGap]
  );

  const measureHeights = useCallback(
    (targetPage = page) => {
      const inner = cardInnerRef.current;
      const active = targetPage === 3 ? regPage2Ref.current : regPage1Ref.current;
      if (!inner || !active) return;
      const p2 = regPage1Ref.current;
      const p3 = regPage2Ref.current;

      const styles = window.getComputedStyle(inner);
      const pt = parseFloat(styles.paddingTop || "0");
      const pb = parseFloat(styles.paddingBottom || "0");
      const hActive = active.scrollHeight;
      const fallbackH = Math.max(p2?.scrollHeight || 0, p3?.scrollHeight || 0);
      const contentH = hActive > 0 ? hActive : fallbackH;

      setSliderHeight(Math.ceil(contentH));
      setCardHeight(Math.ceil(contentH + pt + pb));
    },
    [page]
  );

  useLayoutEffect(() => {
    if (entryStep === "email") return;
    measureHeights(page);
  }, [page, entryStep, measureHeights]);

  useEffect(() => {
    if (entryStep === "email") return;
    const id = requestAnimationFrame(() => measureHeights(page));
    return () => cancelAnimationFrame(id);
  }, [page, entryStep, measureHeights]);

  useEffect(() => {
    if (entryStep === "email") return;
    const active = page === 3 ? regPage2Ref.current : regPage1Ref.current;
    if (!active) return;
    const ro = new ResizeObserver(() => measureHeights(page));
    ro.observe(active);
    return () => ro.disconnect();
  }, [page, entryStep, measureHeights]);

  const handleLogin = async () => {
    setError("");

    if (!email) {
      setError("Ingrese su email");
      return;
    }
    if (!validateEmail(email)) {
      setError("Formato de email inválido");
      return;
    }
    if (!password) {
      setError("Ingrese su contraseña");
      return;
    }

    setLoginLoading(true);
    const result = await login(email, password);
    setLoginLoading(false);

    if (!result.ok) {
      setError(result.error || "Usuario o contraseña incorrectos");
      return;
    }

    const { user } = result;
    if (user.role === "admin") navigate("/admin/inicio");
    else if (user.role === "negocio") navigate("/negocio/inicio");
    else navigate("/cliente/inicio");
  };

  const goTo = (p) => {
    setAnimating(true);
    setPage(p);
    setTimeout(() => setAnimating(false), 360);
  };

  const validatePage1 = () => {
    if (!EMAIL_RE.test(email)) return setError("Email inválido"), false;
    if (!password || password.length < 6) return setError("Contraseña mínimo 6 caracteres"), false;
    setError("");
    return true;
  };

  const handleRegisterCliente = async () => {
    try {
      const result = await register({
        email,
        password,
        telefono,
        nombre: email.split("@")[0],
        role: "cliente",
      });
      if (!result.ok) {
        setError(result.error || "Error al registrar cliente");
        return;
      }
      navigate("/cliente/inicio");
    } catch (err) {
      setError(err?.message || "Error al registrar cliente");
    }
  };

  const openEmailModal = ({ email: emailForModal, initialError, role, readOnlyEmail = true }) => {
    const modalEmail = emailForModal || email;
    openModal("SplashEmailConfirmation", {
      email: modalEmail,
      initialError,
      readOnlyEmail,
      onSkip:
        role === "negocio"
          ? () => {
              setSelectedChoiceRole("negocio");
              setRoleLocked(true);
              setCodeValid(true);
              setEntryStep("form");
              setAuthTab("register");
              setPage(2);
              closeModal();
            }
          : null,
      onBack: () => {
        if (role === "negocio" && (codigo || lastValidCode)) {
          const codeVal = lastValidCode || codigo;
          if (codeVal) {
            setCodigo(codeVal);
            setLastValidCode(codeVal);
            setSelectedChoiceRole("negocio");
            setRoleLocked(true);
          }
        }
        closeModal();
        openChoiceOverlay();
      },
      onSend: async (targetEmail) => {
        if (role === "cliente") {
          const result = await register({
            email: targetEmail,
            password,
            telefono,
            nombre: targetEmail.split("@")[0],
            role: "cliente",
          });
          if (!result.ok) {
            setError(result.error || "No se pudo crear la cuenta");
            return { ok: false, error: result.error || "No se pudo crear la cuenta" };
          }
          setUser(result.user);
          allowExitRef.current = true;
          closeModal();
          navigate("/cliente/inicio");
          return { ok: true, message: result.warning };
        }

        const result = await register({
          email: targetEmail,
          password,
          telefono,
          nombre: nombreDueno || targetEmail.split("@")[0],
          role: "negocio",
        });
        if (!result.ok) {
          setError(result.error || "Error al registrar negocio");
          return { ok: false, error: result.error || "Error al registrar negocio" };
        }
        setUser(result.user);
        setRoleLocked(true);
        setSelectedChoiceRole("negocio");
        setEntryStep("form");
        setAuthTab("register");
        setPage(2);
        allowExitRef.current = false;
        closeModal();
        return { ok: true, message: result.warning };
      },
    });
  };

  const openChoiceOverlay = () => {
    setCodeLocked(false);
    setRoleLocked(false);
    openModal("SplashChoiceOverlay", {
      authCreds: { email, password, telefono },
      onBack: () => {
        goToRegisterTab();
        closeModal();
      },
      onCliente: async () => {
        setError("");

        const session = (await supabase.auth.getSession()).data.session;
        if(!session?.user) {
          setError("Sesión no válida");
          return { ok: false };
        }
        
        const result = await updateUserProfile({
          id_auth: session.user.id,
          role: "cliente",
          nombre: email.split("@")[0],
          telefono,
          registro_estado: "completo",
        });

        if (!result.ok) {
          setError(result.error || "Error al crear perfil");
          return { ok: false };
        }

        setUser(result.user);
        allowExitRef.current = true;
        closeModal();
        navigate("/cliente/inicio");
        return { ok: true };
      },

      onNegocio: async (code) => {
        setError("");

        if (!CODE_RE.test(finalCode)) {
          setError("Código de registro inválido");
          return { ok: false };
        }

        setCodigo(code);
        setLastValidCode(code);
        setCodeValid(true);
        setRoleLocked(true);
        setSelectedChoiceRole("negocio");
        setCodeLocked(true);

        setEntryStep("form");
        setAuthTab("register");
        setPage(2);

        closeModal();
        return { ok:true };
      },
    });
  };

  const handlePrimaryPage1 = async () => {
    if (!validatePage1()) return;
    setError("");

    try {
      //Crear SOLO la cuanta Auth (sin perfil)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error && !error.message?.toLowerCase().includes("already registred")) {
        setError(error.message);
        return;
      }

      //Asegurar sesión activa
      const session =
        data?.session ??
        (await supabase.auth.getSession()).data.session;

      if (!session?.user) {
        setError("No se pudo iniciar la sesión");
        return;
      }

      //Avanzar igual que OAuth
      setEntryStep("form");
      setAuthTab("register");
      setPage(2);
      openChoiceOverlay();
    } catch (err) {
      setError(err?.message || "Error al crear la cuenta")

    }
  };

  const handleNext2 = () => {
    if (!nombreDueno) return setError("Ingrese nombres");
    if (!apellidoDueno) return setError("Ingrese apellidos");
    if (!PHONE_RE.test(telefono)) return setError("Ingrese un teléfono válido");
    setError("");
    if (startedWithOAuth || fromOAuth) setRegStatus("negocio_page3");
    goTo(3);
  };

  const handleRegister = async () => {
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId || !session?.access_token) {
        setError("No hay sesion activa. Inicia sesion y vuelve a intentar.");
        return;
      }
      const payload = {
        role: "negocio",
        nombre: nombreDueno || pendingOAuthProfile?.nombre,
        apellido: apellidoDueno || pendingOAuthProfile?.apellido || null,
        telefono: telefono || pendingOAuthProfile?.telefono || telefono,
        ruc,
        nombreNegocio,
        sectorNegocio,
        calle1,
        calle2,
      };
      const { data, error } = await supabase.functions.invoke("onboarding", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: payload,
      });
      if (error || !data?.ok) {
        let msg = data?.message || error?.message || "No se pudo completar el registro";
        let status = error?.context?.response?.status;
        let bodyText = null;
        if (error?.context?.response) {
          const resp = error.context.response;
          if (typeof resp.clone === "function") {
            try {
              const cloned = resp.clone();
              bodyText = await cloned.text();
              try {
                const parsed = JSON.parse(bodyText);
                if (parsed?.message) msg = parsed.message;
              } catch {
                /* plain text */
              }
            } catch {
              /* ignore */
            }
          }
        }
        console.error("onboarding invoke error", { status, error, data, bodyText });
        setError(status ? `(${status}) ${msg}` : msg);
        return;
      }
      setUser(data.usuario);
      setRegStatus(null);
      clearOAuthIntent();
      allowExitRef.current = true;
      navigate("/negocio/inicio");
    } catch (err) {
      let msg = err?.message || "Error al registrar negocio";
      try {
        const ctxBody = err?.context?.body;
        if (ctxBody) {
          if (typeof ctxBody === "string") msg = ctxBody;
          else if (ctxBody?.message) msg = ctxBody.message;
          else if (ctxBody?.error) msg = ctxBody.error;
        }
        const resp = err?.context?.response;
        if (resp && typeof resp.text === "function") {
          const txt = await resp.text();
          if (txt) msg = txt;
        }
      } catch {
        /* ignore */
      }
      console.error("onboarding error", err);
      setError(msg || "Error al registrar negocio");
    }
  };

  const startOAuth = async (provider) => {
    setError("");
    setOauthProvider(provider);
    setOauthLoading(true);
    const role = effectiveRole || "cliente";
    setOauthIntentRole(role);
    setEntryStep("form");
    setPage(2);
    setStartedWithOAuth(true);
    setOauthExit(true);
    allowExitRef.current = true;
    if (role === "negocio") setCodeValid(true);
    saveOAuthIntent(role);
    try {
      await signInWithOAuth(provider, {
        redirectTo,
        data: { role },
      });
    } catch (err) {
      localStorage.removeItem(OAUTH_INTENT_KEY);
      setError(err?.message || `No se pudo iniciar con ${provider === "google" ? "Google" : "Facebook"}`);
      setOauthLoading(false);
      setOauthProvider(null);
      setOauthExit(false);
      allowExitRef.current = false;
    }
  };

  const startGoogle = () => startOAuth("google");
  const startFacebook = () => startOAuth("facebook");

  const inputCommon = "w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 text-sm";
  const inputCommon1 = "w-full box-border border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E30A5]";

  const segment = (n) => (
    <div
      key={n}
      className="flex-1 mx-1 rounded-full"
      style={{ height: 4, background: "#FFFFFF", opacity: page === n + 1 ? 1 : 0.35, transition: "opacity 200ms" }}
    />
  );

  const showBackButton = entryStep === "email" || entryStep === "form";

  const handleBack = () => {
    if (entryStep === "email") {
      navigate("/");
      return;
    }
    if (page === 3) {
      goTo(2);
      return;
    }
    goToRegisterTab();
  };

  const showForwardButton = entryStep === "form" && page < 3;

  const handleForward = () => {
    if (page === 2) {
      handleNext2();
      return;
    }
  };

  const goToLoginTab = () => {
    setAuthTab("login");
    setEntryStep("email");
    setPage(1);
    setStartedWithOAuth(false);
    setError("");
    setOauthExit(false);
    allowExitRef.current = false;
  };

  const goToRegisterTab = () => {
    clearOAuthIntent();
    setOauthIntentRole(null);
    setCodeValid(roleFromSplash === "negocio");
    setPage(2);
    setStartedWithOAuth(false);
    setError("");
    setEntryStep("email");
    setAuthTab("register");
    setOauthExit(false);
    allowExitRef.current = false;
  };

  const primaryEmailLabel = authTab === "login" ? (loginLoading ? "Ingresando..." : "INGRESAR") : "REGISTRARSE";
  const primaryEmailHandler = authTab === "login" ? handleLogin : handlePrimaryPage1;
  const primaryEmailDisabled = authTab === "login" ? loginLoading : false;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#5E30A5] p-6 relative">
      <h1 className="text-white text-3xl font-extrabold mt-12 mb-2 text-center">REFERIDOS APP</h1>

      {showBackButton && (
        <button
          onClick={handleBack}
          className="absolute left-2 top-68 w-9 h-18 rounded-xl bg-white shadow flex items-center justify-center text-[#5E30A5] hover:bg-[#F3E8FF] active:scale-95 transition z-20"
          aria-label="Volver"
        >
          <ArrowLeftIcon />
        </button>
      )}

      {showForwardButton && (
        <button
          onClick={handleForward}
          className="absolute right-2 top-68 w-9 h-18 rounded-xl bg-white shadow flex items-center justify-center text-[#5E30A5] hover:bg-[#F3E8FF] active:scale-95 transition z-20"
          aria-label="Siguiente"
        >
          <ArrowRightIcon />
        </button>
      )}

      {entryStep === "email" && (
        <div className="relative w-full max-w-sm mt-2">
          <div className="bg-white w-full rounded-2xl shadow-xl p-6">
            {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

            <div className="flex items-center gap-3 mb-5 -mt-2">
              <div className="flex-1">
                <div
                  className="flex bg-[#f7f5fdff] rounded-xl py-0.75 gap-3"
                  style={{ marginLeft: "-10px", marginRight: "-10px", width: "calc(100% + 20px)" }}
                >
                  <button
                    onClick={goToLoginTab}
                    className={`flex-1 text-base font-semibold py-3 px-3 rounded-xl transition-all ${
                      authTab === "login"
                        ? "bg-[#5E30A5] text-white shadow flex-[0.85] px-6"
                        : "text-[#5E30A5] bg-transparent flex-[1.15]"
                    }`}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={goToRegisterTab}
                    className={`flex-1 text-base font-semibold py-3 px-5 rounded-xl transition-all ${
                      authTab === "register"
                        ? "bg-[#5E30A5] text-white shadow flex-[1.25] px-6"
                        : "text-[#5E30A5] bg-transparent flex-[0.75]"
                    }`}
                  >
                    Registrarse
                  </button>
                </div>
              </div>
            </div>

            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Ingrese su email..."
              className={inputCommon}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={authTab === "login" ? loginLoading : false}
            />

            <label className="text-sm text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña..."
              className={inputCommon}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={authTab === "login" ? loginLoading : false}
            />

            <button
              onClick={primaryEmailHandler}
              disabled={primaryEmailDisabled}
              className="w-full bg-[#FFC21C] text-white font-semibold py-2.5 rounded-lg shadow active:scale-[0.98] disabled:opacity-50 mt-3"
            >
              {primaryEmailLabel}
            </button>

            {authTab === "login" ? (
              <Link to="/recuperar" className="block text-center text-sm text-gray-400 mt-4 underline">
                OLVIDASTE TU CONTRASENA?
              </Link>
            ) : (
              <div className="block text-center text-sm text-gray-500 mt-4">Avanza para elegir el tipo de cuenta</div>
            )}
          </div>
        </div>
      )}

      {entryStep !== "email" && page >= 2 && (
        <div className="w-full max-w-sm px-2 mb-4">
          <div className="flex">
            {segment(1)}
            {segment(2)}
          </div>
        </div>
      )}

      {entryStep !== "email" && (
        <>

          <div
            ref={cardRef}
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl mt-2 overflow-visible"
            style={{
              height: cardHeight != null ? `${cardHeight}px` : "auto",
              boxSizing: "border-box",
              transition: "height 260ms ease",
              overflow: "hidden",
            }}
          >
            <div
              ref={cardInnerRef}
              className="bg-white w-full rounded-2xl shadow-xl p-6 pt-4"
              style={{ boxSizing: "border-box", overflow: "hidden" }}
            >
              <div ref={sliderRef} style={containerStyle} className="relative z-10">
                {page === 2 && (
                  <section style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }} className="px-2">
                    <div className="pb-4" ref={regPage1Ref}>
                      <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar negocio</h2>
                      <p className="text-sm text-gray-600 mb-3">Datos del Propietario</p>

                      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                      <label className="text-sm text-gray-700">Nombres</label>
                      <input className={inputCommon} value={nombreDueno} onChange={(e) => setNombreDueno(e.target.value)} />

                      <label className="text-sm text-gray-700">Apellidos</label>
                      <input className={inputCommon} value={apellidoDueno} onChange={(e) => setApellidoDueno(e.target.value)} />

                      <label className="text-sm text-gray-700">Telefono</label>
                      <input
                        className={inputCommon}
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="0998888888"
                      />

                      <div className="pt-4">
                        <button onClick={handleNext2} className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow">
                          Siguiente
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <Link to="/" className="text-sm text-gray-700">
                          YA TENGO UNA CUENTA.
                        </Link>
                      </div>
                    </div>
                  </section>
                )}

                {page === 3 && (
                  <section style={{ boxSizing: "border-box", position: "relative", zIndex: 1 }} className="px-2">
                    <div className="pb-4" ref={regPage2Ref}>
                      <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar negocio</h2>
                      <p className="text-sm text-gray-600 mb-3">Datos del negocio</p>

                      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                      <label className="text-sm text-gray-700">RUC</label>
                      <input
                        className={inputCommon}
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value.replace(/[^\d]/g, ""))}
                        maxLength={13}
                      />

                      <label className="text-sm text-gray-700">Nombre negocio</label>
                      <input className={inputCommon} value={nombreNegocio} onChange={(e) => setNombreNegocio(e.target.value)} />

                      <label className="text-sm text-gray-700">Sector negocio</label>
                      <input className={inputCommon} value={sectorNegocio} onChange={(e) => setSectorNegocio(e.target.value)} />

                      <label className="text-sm text-gray-700">Calle 1</label>
                      <input className={inputCommon} value={calle1} onChange={(e) => setCalle1(e.target.value)} />

                      <label className="text-sm text-gray-700">Calle 2 (opcional)</label>
                      <input className={inputCommon} value={calle2} onChange={(e) => setCalle2(e.target.value)} />

                      <div className="pt-4">
                        <button onClick={handleRegister} className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow">
                          Registrar Negocio
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <Link to="/" className="text-sm text-gray-700">
                          YA TENGO UNA CUENTA.
                        </Link>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="absolute bottom-2 right-2 text-xs text-white opacity-70">ALPHA v0.0.1</div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2087 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9082c1.7018-1.5677 2.6836-3.8745 2.6836-6.6149z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.4673-.8059 5.9563-2.1818l-2.9082-2.2581c-.8059.54-1.834.8609-3.0481.8609-2.3455 0-4.3309-1.5841-5.0386-3.7105H.957v2.3318C2.4382 15.9836 5.4818 18 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.9614 10.7105c-.18-.54-.2823-1.1172-.2823-1.7105 0-.5936.1023-1.1709.2823-1.7109V4.957H.957C.3473 6.1718 0 7.5473 0 9c0 1.4527.3473 2.8282.957 4.0436l3.0044-2.3331z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5795c1.3214 0 2.5086.4541 3.4418 1.3459l2.5814-2.5818C13.4673.8577 11.43 0 9 0 5.4818 0 2.4382 2.0168.957 4.9568l3.0044 2.3318C4.6691 5.1636 6.6545 3.5795 9 3.5795z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="21"
      viewBox="0 0 24 24"
      width="21"
    >
      <path
        fill="#1877F2"
        d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.4V9.62c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22V22c4.78-.8 8.44-4.94 8.44-9.93z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      width="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l7.82 6.165a2 2 0 002.36 0L22 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
