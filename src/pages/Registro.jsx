// src/pages/Registro.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
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

export default function Registro() {
  const navigate = useNavigate();
  const register = useAppStore((s) => s.register);
  const setUser = useAppStore((s) => s.setUser);
  const { openModal } = useModal();
  const location = useLocation();
  const roleFromSplash = location.state?.role || null;
  const codeFromSplash = location.state?.codigo || "";
  const fromOAuth = location.state?.fromOAuth || false;
  const pageFromState = location.state?.page || null;

  const cardRef = useRef(null);
  const sliderRef = useRef(null);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);

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
  const [btnText, setBtnText] = useState("Registrarse");
  const [btnFadeKey, setBtnFadeKey] = useState(0);
  const [entryStep, setEntryStep] = useState("choice");
  const [oauthLoading, setOauthLoading] = useState(false);
  const [oauthProvider, setOauthProvider] = useState(null);
  const [oauthIntentRole, setOauthIntentRole] = useState(null);
  const [startedWithOAuth, setStartedWithOAuth] = useState(false);
  const allowExitRef = useRef(false);
  const [oauthExit, setOauthExit] = useState(false);
  const [pendingOAuthProfile, setPendingOAuthProfile] = useState(null);

  const redirectTo =
    (typeof window !== "undefined" && `${window.location.origin}/registro`) ||
    import.meta.env.VITE_AUTH_REDIRECT_URL;

  useEffect(() => {
    if (!localStorage.getItem(CODES_KEY)) {
      localStorage.setItem(CODES_KEY, JSON.stringify(DEFAULT_CODES));
    }
  }, []);

  const effectiveRole = roleFromSplash || oauthIntentRole || null;
  const leaveGuardActive = effectiveRole === "negocio" && entryStep !== "choice";
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
    setEntryStep("choice");
    setPage(1);
    setError("");
    setOauthProvider(null);
    setOauthLoading(false);
    setCodigo(codeFromSplash || "");
    setCodeValid(roleFromSplash === "negocio");
  }, [roleFromSplash, codeFromSplash]);

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
      }
    } catch {
      // ignore
    }
  }, [pageFromState]);

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
      showLeaveModal();
      return "";
    };
    const handlePopState = (e) => {
      if (allowExitRef.current || oauthExit) return;
      e.preventDefault?.();
      showLeaveModal();
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
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
        setOauthExit(false);
        allowExitRef.current = false;
        if (intendedRole === "negocio") {
          setEntryStep("form");
          setPage(pageFromState || 2);
          setCodeValid(true);
        }
        return;
      }

      setUser(user);
      setOauthExit(false);
      allowExitRef.current = false;
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
      setCodeValid(roleFromSplash === "negocio");
      setBtnFadeKey((k) => k + 1);
      setBtnText("Registrarse");
      return;
    }

    setCodeChecking(true);

    fakeValidateCode(codigo)
      .then((res) => {
        if (!mounted) return;
        setCodeValid(res.ok);
        setBtnFadeKey((k) => k + 1);
        setBtnText(res.ok ? "Siguiente" : "Registrarse");
      })
      .finally(() => mounted && setCodeChecking(false));

    return () => {
      mounted = false;
    };
  }, [codigo, roleFromSplash]);

  const containerStyle = useMemo(
    () => ({
      display: "flex",
      transform: `translateX(${-(page - 1) * 100}%)`,
      transition: animating ? "transform 350ms ease, filter 350ms ease, opacity 350ms ease" : "transform 350ms ease",
      filter: animating ? "blur(1.2px)" : "none",
      opacity: animating ? 0.55 : 1,
      width: "100%",
      boxSizing: "border-box",
    }),
    [page, animating]
  );

  const updateHeight = (targetPage = page) => {
    if (!cardRef.current) return;
    let sec = page1Ref.current;
    if (targetPage === 2) sec = page2Ref.current;
    if (targetPage === 3) sec = page3Ref.current;
    if (!sec) return;

    const contentH = sec.scrollHeight;
    const cs = window.getComputedStyle(cardRef.current);
    const pt = parseFloat(cs.paddingTop || "0");
    const pb = parseFloat(cs.paddingBottom || "0");
    const extra = 8;
    const targetHeight = Math.ceil(contentH + pt + pb + extra);
    cardRef.current.style.transition = "height 260ms ease";
    cardRef.current.style.height = `${targetHeight}px`;
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => updateHeight(1));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (entryStep === "choice") return;
    const rafId = requestAnimationFrame(() => {
      updateHeight(page);
    });
    return () => cancelAnimationFrame(rafId);
  }, [page, codeValid, entryStep]);

  const goTo = (p) => {
    setAnimating(true);
    setPage(p);
    setTimeout(() => setAnimating(false), 360);
  };

  const validatePage1 = () => {
    if (!EMAIL_RE.test(email)) return setError("Email inválido"), false;
    if (!password || password.length < 6) return setError("Contraseña mínimo 6 caracteres"), false;
    if (!PHONE_RE.test(telefono)) return setError("Teléfono inválido"), false;
    if (codigo && !codeValid) return setError("Código inválido"), false;
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

  const handlePrimaryPage1 = () => {
    if (effectiveRole === "negocio") {
      setError("");
      goTo(2);
      return;
    }

    if (!validatePage1()) return;
    if (!codeValid) {
      handleRegisterCliente();
      return;
    }
    goTo(2);
  };

  const handleNext2 = () => {
    if (!nombreDueno) return setError("Ingrese nombres");
    if (!apellidoDueno) return setError("Ingrese apellidos");
    setError("");
    if (startedWithOAuth || fromOAuth) setRegStatus("negocio_page3");
    goTo(3);
  };

  const handleRegister = async () => {
    try {
      if (pendingOAuthProfile || fromOAuth || startedWithOAuth) {
        const session = (await supabase.auth.getSession())?.data?.session;
        const userId = session?.user?.id;
        if (!userId) {
          setError("No hay sesión activa");
          return;
        }
        const payload = {
          role: "negocio",
          nombre: nombreDueno || pendingOAuthProfile?.nombre,
          telefono: telefono || pendingOAuthProfile?.telefono,
          ruc,
          nombreNegocio,
          sectorNegocio,
          calle1,
          calle2,
        };
        const { data, error } = await supabase.functions.invoke("onboarding", { body: payload });
        if (error || !data?.ok) {
          setError(data?.message || error?.message || "No se pudo completar el registro");
          return;
        }
        setUser(data.usuario);
        setRegStatus(null);
        clearOAuthIntent();
        allowExitRef.current = true;
        navigate("/negocio/inicio");
        return;
      }

      const result = await register({
        email,
        password,
        telefono,
        nombre: nombreDueno,
        role: "negocio",
      });
      if (!result.ok) {
        setError(result.error || "Error al registrar negocio");
        return;
      }
      navigate("/negocio/inicio");
    } catch (err) {
      setError(err?.message || "Error al registrar negocio");
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

  const inputCommon = "w-full box-border border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E30A5]";

  const segment = (n) => (
    <div
      key={n}
      className="flex-1 mx-1 rounded-full"
      style={{ height: 4, background: "#FFFFFF", opacity: page === n + 1 ? 1 : 0.35, transition: "opacity 200ms" }}
    />
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#5E30A5] p-6">
      <h1 className="text-white text-3xl font-extrabold mt-12 mb-2 text-center">REFERIDOS APP</h1>

      {entryStep === "choice" && (
        <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
          {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

          <div className="space-y-4">
            <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-4">Registro</h2>

            <button
              onClick={() => {
                clearOAuthIntent();
                setOauthIntentRole(null);
                setCodeValid(roleFromSplash === "negocio");
                setPage(1);
                setStartedWithOAuth(false);
                setError("");
                setEntryStep("form");
                setOauthExit(false);
                allowExitRef.current = false;
              }}
              className="w-full bg-[#FFC21C] text-white font-semibold py-3 rounded-lg shadow active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <MailIcon />
                <span>Continuar con correo</span>
              </div>
            </button>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(270deg, rgba(173, 173, 173, 0.9) 0%, rgba(209,213,219,0.75) 95%, rgba(194, 194, 194, 0.2) 100%)" }}
              />
              <span className="font-semibold">O</span>
              <span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, rgba(173, 173, 173, 0.9) 0%, rgba(209,213,219,0.75) 95%, rgba(194, 194, 194, 0.2) 100%)" }}
              />
            </div>

            <button
              onClick={startGoogle}
              disabled={oauthLoading}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg shadow flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              <GoogleIcon />
              {oauthLoading && oauthProvider === "google" ? "Iniciando..." : "Continuar con Google"}
            </button>

            <button
              onClick={startFacebook}
              disabled={oauthLoading}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg shadow flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              <FacebookIcon />
              {oauthLoading && oauthProvider === "facebook" ? "Iniciando..." : "Continuar con Facebook"}
            </button>

            <Link to="/" className="block text-center text-sm text-gray-600 font-bold pt-3">
              YA TENGO UNA CUENTA.
            </Link>
          </div>
        </div>
      )}

      {entryStep !== "choice" && page >= 2 && (
        <div className="w-full max-w-sm px-2 mb-4">
          <div className="flex">
            {segment(1)}
            {segment(2)}
          </div>
        </div>
      )}

      {entryStep !== "choice" && (
        <>

          <div
            ref={cardRef}
            className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 overflow-hidden"
            style={{ height: "auto", boxSizing: "border-box" }}
          >
            <div className="overflow-hidden" style={{ boxSizing: "border-box" }}>
              <div ref={sliderRef} style={containerStyle} className="flex">
            <section style={{ flex: "0 0 100%", boxSizing: "border-box" }} className="px-2">
              <div className="pb-4" ref={page1Ref}>
                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrarse</h2>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <label className="text-sm text-gray-700">Email</label>
                <input
                  type="email"
                  className={inputCommon}
                  placeholder="Ingrese su email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="text-sm text-gray-700">Contraseña</label>
                <input
                  type="password"
                  className={inputCommon}
                  placeholder="Ingrese su contraseña..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="text-sm text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  className={inputCommon}
                  placeholder="0998888888"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value.replace(/[^\d]/g, ""))}
                />

                <div className="mb-4" />

                <div className="flex flex-col gap-3">
                  <button onClick={handlePrimaryPage1} className="w-full bg-yellow-400 text-white font-semibold py-2.5 rounded-lg shadow">
                    <span key={btnFadeKey} style={{ display: "inline-block", transition: "opacity 180ms" }}>
                      {btnText}
                    </span>
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/" className="text-sm text-gray-700">
                      YA TENGO UNA CUENTA.
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ flex: "0 0 100%", boxSizing: "border-box" }} className="px-2">
              <div className="pb-4" ref={page2Ref}>
                {!startedWithOAuth && (
                  <button onClick={() => goTo(1)} className="text-gray-500 mb-2">
                    ←
                  </button>
                )}

                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar</h2>
                <p className="text-sm text-gray-600 mb-3">Datos del Propietario</p>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <label className="text-sm text-gray-700">Nombres</label>
                <input className={inputCommon} value={nombreDueno} onChange={(e) => setNombreDueno(e.target.value)} />

                <label className="text-sm text-gray-700">Apellidos</label>
                <input className={inputCommon} value={apellidoDueno} onChange={(e) => setApellidoDueno(e.target.value)} />

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

            <section style={{ flex: "0 0 100%", boxSizing: "border-box" }} className="px-2">
              <div className="pb-4" ref={page3Ref}>
                <button onClick={() => goTo(codeValid ? 2 : 1)} className="text-gray-500 mb-2">
                  ←
                </button>

                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar</h2>
                <p className="text-sm text-gray-600 mb-3">Datos del negocio</p>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <label className="text-sm text-gray-700">RUC</label>
                <input
                  className={inputCommon}
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value.replace(/[^\d]/g, ""))}
                  maxLength={13}
                />

                {codeValid && (
                  <>
                    <label className="text-sm text-gray-700">Nombre negocio</label>
                    <input className={inputCommon} value={nombreNegocio} onChange={(e) => setNombreNegocio(e.target.value)} />

                    <label className="text-sm text-gray-700">Sector negocio</label>
                    <input className={inputCommon} value={sectorNegocio} onChange={(e) => setSectorNegocio(e.target.value)} />

                    <label className="text-sm text-gray-700">Calle 1</label>
                    <input className={inputCommon} value={calle1} onChange={(e) => setCalle1(e.target.value)} />

                    <label className="text-sm text-gray-700">Calle 2 (opcional)</label>
                    <input className={inputCommon} value={calle2} onChange={(e) => setCalle2(e.target.value)} />
                  </>
                )}

                <div className="pt-4">
                  <button onClick={handleRegister} className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow">
                    Registrar
                  </button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/" className="text-sm text-gray-700">
                    YA TENGO UNA CUENTA.
                  </Link>
                </div>
              </div>
            </section>
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
