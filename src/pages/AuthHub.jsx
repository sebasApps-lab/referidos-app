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
import { runOnboardingCheck } from "../services/onboardingClient";

const CODES_KEY = "registration_codes";
const DEFAULT_CODES = ["REF-001532", "REF-003765"];

export default function AuthHub() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const setUser = useAppStore((s) => s.setUser);
  const { openModal, closeModal } = useModal();
  const location = useLocation();

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
  const [codigo, setCodigo] = useState("");
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

  const redirectTo =
    (typeof window !== "undefined" && `${window.location.origin}/auth`) ||
    import.meta.env.VITE_AUTH_REDIRECT_URL;

  useEffect(() => {
    if (!localStorage.getItem(CODES_KEY)) {
      localStorage.setItem(CODES_KEY, JSON.stringify(DEFAULT_CODES));
    }
  }, []);

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
      return;
    }

    setCodeChecking(true);

    fakeValidateCode(codigo)
      .then((res) => {
        if (!mounted) return;
      })
      .finally(() => mounted && setCodeChecking(false));

    return () => {
      mounted = false;
    };
  }, [codigo]);

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
      const msg = (result.error || "").toLowerCase();
      if (msg.includes("invalid") || msg.includes("credentials") || msg.includes("password")) {
        const { data: oauthUser } = await supabase
          .from("usuarios")
          .select("id_auth")
          .eq("email", email)
          .maybeSingle();
        if (oauthUser) {
          setError("Esta cuenta fue creada con Google. Inicia sesión con Google para continuar.");
          navigate("/", { replace: true });
          return;
        }
      }
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

  const openChoiceOverlay = () => {
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
        const authEmail = session.user.email || email;
        if (!authEmail) {
          setError("No se pudo obtener el email de la cuenta");
          return { ok: false };
        }

        //Crear perfil si no existe, o actualizar si ya existe
        const { data: existing, error: exErr } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id_auth", session.user.id)
          .maybeSingle();
        if (exErr) {
          setError(exErr.message || "No se puede leer perfil");
          return { ok: false };
        }
        
        if (!existing) {
          const { data, error } = await supabase
            .from("usuarios")
            .insert({
              id_auth: session.user.id,
              email: authEmail,
              nombre: authEmail.split("@")[0],
              role: "cliente",
              telefono: telefono || null,
              registro_estado: "completo",
            })
            .select()
            .maybeSingle();
          if (error) {
            setError(error.message || "Error al crear perfil");
            return { ok: false };
          }
          setUser(data);
        } else {
          const result = await updateUserProfile({
            id_auth: session.user.id,
            role: "cliente",
            email: existing.email || authEmail,
            nombre: existing.nombre || authEmail.split("@")[0],
            telefono: telefono || existing.telefono || null,
            registro_estado: "completo",
          });
          if (!result.ok) {
          setError(result.error || "Error al actualizar perfil");
          return { ok: false };
          }
          setUser(result.user);
        }

        const check = await runOnboardingCheck();
        if (!check?.ok || check?.allowAccess === false) {
          setError(check?.reasons?.join(", ") || "Completa tu registro");
          return { ok: false };
        }

        closeModal();
        navigate("/cliente/inicio");
        return { ok: true };
      },

      onNegocio: async (code) => {
        setError("");

        if (!CODE_RE.test(code)) {
          setError("Código de registro inválido");
          return { ok: false };
        }

        const session = (await supabase.auth.getSession()).data.session;
        if (!session?.user) {
          setError("Sesión no válida");
          return { ok: false };
        }
        const authEmail = session.user.email || email;
        if (!authEmail) {
          setError("No se pudo obtener el email de la cuenta");
          return { ok: false };
        }

        //Crear o actualizar perfil de negocio en usuarios
        const { data: existing, error: exErr } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id_auth", session.user.id)
          .maybeSingle();
        if (exErr) {
          setError(exErr.message || "No se pudo leer perfil");
          return { ok: false };
        }

        if (!existing) {
          const { data, error } = await supabase
            .from("usuarios")
            .insert({
              id_auth: session.user.id,
              email: authEmail,
              role: "negocio",
              registro_estado: "incompleto",              
            })
            .select()
            .maybeSingle();
          if (error) {
            setError(error.message || "Error al crear perfil");
            return { ok: false };
          }
          setUser(data);
        } else {
          const { data, error } = await supabase
            .from("usuarios")
            .update({
              role: "negocio",
              email: existing.email || email,
              registro_estado: existing.registro_estado || "incompleto",
            })
            .eq("id_auth", session.user.id)
            .select()
            .maybeSingle();
          if (error) {
            setError(error.message || "Error al actualizar perfil");
            return { ok: false };
          }
          setUser(data);
        }
        setCodigo(code);
        setEntryStep("form");
        setAuthTab("register");
        setPage(2);
        closeModal();
        return { ok:true };
      },
    });
  };

  const landingHandledRef = useRef(false);

  useEffect (() => {
    if (landingHandledRef.current) return;

    (async () => {
      const { data: { session } = {} } = await supabase.auth.getSession();
      if(!session?.user) return;

      //Intentar cargar perfil
      const { data: userProfile } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_auth", session.user.id)
        .maybeSingle();

      //Si no hay perfil, o falta rol -> abrir SplashChoice
      if (!userProfile || !userProfile.role) {
        landingHandledRef.current = true;
        setEntryStep("form");
        setAuthTab("register");
        setPage(2);
        openChoiceOverlay();
        return;
      }

      //Si role === cliente
      if (userProfile.role === "cliente") {
        if (userProfile.registro_estado !== "completo") {
          await updateUserProfile({ id_auth: session.user.id, registro_estado: "completo"});
        }
        landingHandledRef.current = true;
        setUser(userProfile);
        navigate("/cliente/inicio", { replace : true });
        return;
      }

      //Si role === admin
      if (userProfile.role === "admin") {
        landingHandledRef.current = true;
        setUser(userProfile);
        navigate("/admin/inicio", { replace: true });
        return;
      }

      //Negocio
      const missingOwner = !userProfile.nombre || !userProfile.apellido || !userProfile.telefono;
      const missingBusiness = !userProfile.ruc || !userProfile.nombreNegocio || !userProfile.sectorNegocio || !userProfile.calle1;

      if (missingOwner) {
        landingHandledRef.current = true;
        setEntryStep("form");
        setAuthTab("register");
        setPage(2);
        setNombreDueno(userProfile.nombre || "");
        setApellidoDueno(userProfile.apellido || "");
        setTelefono(userProfile.telefono || "");
        return;
      }

      if (missingBusiness) {
        landingHandledRef.current = true;
        setEntryStep("form");
        setAuthTab("register");
        setPage(3);
        setNombreDueno(userProfile.nombre || "");
        setApellidoDueno(userProfile.apellido || "");
        setRuc(userProfile.ruc || "");
        setTelefono(userProfile.telefono || "");
        setRuc(userProfile.ruc || "");
        setNombreNegocio(userProfile.nombreNegocio || "");
        setSectorNegocio(userProfile.sectorNegocio || "");
        setCalle1(userProfile.calle1 || "");
        setCalle2(userProfile.calle2 || "");
        return;
      }

      if (userProfile.registro_estado !== "completo") {
        await updateUserProfile({ id_auth: session.user.id, registro_estado: "completo" });
      }
      landingHandledRef.current = true;
      setUser(userProfile);
      navigate("/negocio/inicio", { replace: true });

    })();
  }, []);

  const handlePrimaryPage1 = async () => {
    if (!validatePage1()) return;
    setError("");

    try {
      //Crear SOLO la cuanta Auth (sin perfil)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        const msg = error.message?.toLowerCase() || "";
        if(msg.includes("ya existe") || msg.includes("already") || msg.includes("exists") ) {
          //Correo ya usado: asumir que puede ser cuenta creada con OAuth
          setError("Esta cuenta ya existe. Si la creaste con Google, usa Google para continuar.");
          setAuthTab("login");
          setEntryStep("email");
          setPage(1);
          //Redirige a la pantalla de bienvenida con botones OAuth
          navigate("/", { replace: true });
          return;
        }
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

  const handleNext2 = async () => {
    if (!nombreDueno) return setError("Ingrese nombres");
    if (!apellidoDueno) return setError("Ingrese apellidos");
    if (!PHONE_RE.test(telefono)) return setError("Ingrese un teléfono válido");
    setError("");

    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.user) {
      setError("No hay sesión activa");
      return;
    }
    //Inserta/actualiza datos del propietario en usuarios
    const { data: existing } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", session.user.id)
      .maybeSingle();

    if(!existing) {
      const { error } = await supabase.from("usuarios").insert({
        id_auth: session.user.id,
        email,
        role: "negocio",
        nombre: nombreDueno,
        telefono,
        registro_estado: "incompleto",
      });
      if (error) {
        setError(error.message || "No se pudo guardar datos del propietario");
        return;
      }
    } else {
      const { error } = await supabase
        .from("usuarios")
        .update({
          nombre: nombreDueno,
          apellido: apellidoDueno,
          telefono,
          role: existing.role || "negocio",
          registro_estado: existing.registro_estado || "incompleto",
        })
        .eq("id_auth", session.user.id);
      if (error) {
        setError(error.message || "No se pudo guardar datos del propietario");
        return;
      }
    }

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

      //Obtener perfil actual
      const { data: userRow, error: userErr } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_auth", userId)
        .maybeSingle();

      if (userErr) {
        setError(userErr.message || "No se pudo leer el perfil");
        return;
      }
      if (!userRow) {
        setError("Falta crear el perfil de usuario antes de registrar el negocio");
        return;
      }

      const { data: existingNeg, error: negReadError } = await supabase
        .from("negocios")
        .select("*")
        .eq("usuarioId", userRow.id)
        .maybeSingle();
      if (negReadErr) {
        setError(negReadErr.message || "No se pudo leer el negocio");
        return;
      }

      const direccion = calle2 ? `${calle1} ${calle2}` : calle1;
      const negocioPayload = {
        usuarioId: userRow.id,
        nombre: nombreNegocio || existingNeg?.nombre || "Nombre Local",
        sector: sectorNegocio || existingNeg?.sector || null,
        direction: direccion || existingNeg?.direccion || null,
      };

      //Crear/actualizar negocio
      let negocio = existingNeg;
      if (existingNeg) {
        const { data, error } = await supabase
          .from("negocios")
          .update(negocioPayload)
          .eq("id", existingNeg.id)
          .select()
          .maybeSingle();
        if (error) throw error;
        negocio = data;
      } else {
        const { data, error } = await supabase
          .from("negocios")
          .insert(negocioPayload)
          .select()
          .maybeSingle();
        if (error) throw error;
        negocio = data;
      }

      //Actualizar perfil de usuario a completo con datos del dueño
      const { data: updatedUser, error: updErr } = await supabase
        .from("usuarios")
        .update({
          role: "negocio",
          nombre: nombreDueno || userRow.nombre,
          apellido: apellidoDueno || userRow.apellido,
          telefono,
          ruc,
          registro_estado: "completo",
        })
        .eq("id_auth", userId)
        .select()
        .maybeSingle();
      if (updErr) throw updErr;

      setUser(updatedUser);

      const check = await runOnboardingCheck();
      if (!check?.ok || check?.allowAccess === false) {
        setError(check?.reasons?.join(",") || "Completa tu registro");
        return;
      }
      
      //Redirigir
      navigate("/negocio/inicio");
    } catch (err) {
      setError(err?.message || "Error al registrar negocio");
    }
  };

  const startOAuth = async (provider) => {
    setError("");
    setOauthProvider(provider);
    setOauthLoading(true);

    try {
      await signInWithOAuth(provider, { redirectTo });
    } catch (err) {
      localStorage.removeItem(OAUTH_INTENT_KEY);
      setError(err?.message || "No se pudo iniciar sesión");
      setOauthLoading(false);
      setOauthProvider(null);
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
    setError("");
  };

  const goToRegisterTab = () => {
    setPage(2);
    setError("");
    setEntryStep("email");
    setAuthTab("register");
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
