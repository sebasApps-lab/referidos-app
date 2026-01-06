import { useCallback } from "react";
import {
  EMAIL_RE,
  PHONE_RE,
  validateEmail,
} from "../../utils/validators";
import { useAppStore } from "../../store/appStore";
import { signInWithOAuth, signInWithGoogleIdToken } from "../../services/authService";
import { useModal } from "../../modals/useModal";
import { supabase } from "../../lib/supabaseClient";
import { requestGoogleCredential } from "../../utils/googleOneTap";

const OAUTH_INTENT_KEY = "oauth_intent";
const OAUTH_LOGIN_PENDING = "oauth_login_pending";
const GOOGLE_ONE_TAP_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_ONE_TAP_CLIENT_ID ||
  import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function useAuthActions({
  email,
  password,
  telefono,
  nombreDueno,
  apellidoDueno,
  ruc,
  nombreNegocio,
  sectorNegocio,
  calle1,
  calle2,
  setTelefono,
  setEmailError,
  setWelcomeError,
  setLoginLoading,
  setOauthLoading,
  setOauthProvider,
  setWelcomeLoading,
  setEntryStep,
  setAuthTab,
  setPage,
  goTo,
  page,
  onResetToWelcome,
}) {
  const login = useAppStore((s) => s.login);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);
  const onboarding = useAppStore((s) => s.onboarding);
  const { openModal, closeModal } = useModal();

  const redirectTo =
    (typeof window !== "undefined" && `${window.location.origin}/auth`) ||
    import.meta.env.VITE_AUTH_REDIRECT_URL;

  const goToLoginTab = useCallback(() => {
    setAuthTab("login");
    setEntryStep("email");
    setPage(1);
    setEmailError("");
  }, [setAuthTab, setEntryStep, setPage, setEmailError]);

  const goToRegisterTab = useCallback(() => {
    setPage(2);
    setEmailError("");
    setEntryStep("email");
    setAuthTab("register");
  }, [setPage, setEmailError, setEntryStep, setAuthTab]);

  const validatePage1 = useCallback(() => {
    if (!EMAIL_RE.test(email)) {
      setEmailError("Email inválido");
      return false;
    }
    if (!password || password.length < 6) {
      setEmailError("Contraseña mínimo 6 caracteres");
      return false;
    }
    setEmailError("");
    return true;
  }, [email, password, setEmailError]);

  const handleLogin = useCallback(async () => {
    setEmailError("");

    if (!email) return setEmailError("Ingrese su email");
    if (!validateEmail(email)) return setEmailError("Formato de email inválido");
    if (!password) return setEmailError("Ingrese su contraseña");

    setLoginLoading(true);
    const result = await login(email, password);
    setLoginLoading(false);

    if (!result.ok) {
      const msg = (result.error || "").toLowerCase();

      //UX especÇðfica: cuenta creada con Oauth
      if (
        msg.includes("invalid") ||
        msg.includes("credentials") ||
        msg.includes("password")
      ) {
        const { data: oauthUser } = await supabase
          .from("usuarios")
          .select("id_auth")
          .eq("email", email)
          .maybeSingle();

        if (oauthUser) {
          setEmailError("Esta Cuenta fue creada con Google. Inicia sesión con Google para continuar");
          return;
        }
      }

      setEmailError(result.error || "Usuario o contraseÇña incorrectos");
      return;
    }
  }, [email, password, login, setEmailError, setLoginLoading]);

  const openChoiceOverlay = useCallback(() => {
    if (onboarding?.allowAccess) return;

    openModal("SplashChoiceOverlay", {
      authCreds: { email, password, telefono },
      onBack: () => {
        goToRegisterTab();
        closeModal();
      },

      onCliente: async () => {
        setEmailError("");

        const session = (await supabase.auth.getSession()).data.session;
        if (!session?.user) {
          setEmailError("Sesión no válida");
          return { ok: false };
        }
        const authEmail = session.user.email || email;
        if (!authEmail) {
          setEmailError("No se pudo obtener el email de la cuenta");
          return { ok: false };
        }

        //Crear perfil si no existe, o actualizar si ya existe
        const { data: existing, error: exErr } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id_auth", session.user.id)
          .maybeSingle();
        if (exErr) {
          setEmailError(exErr.message || "No se puede leer perfil");
          return { ok: false };
        }

        //Crear perfil cliente solo si no tenÇða rol
        if (!existing?.role) {
          const { error } = await supabase
            .from("usuarios")
            .insert({
              id_auth: session.user.id,
              email: authEmail,
              nombre: authEmail.split("@")[0],
              role: "cliente",
              telefono: telefono || null,
              account_status: "active",
            })
            .select()
            .maybeSingle();
          if (error) {
            setEmailError(error.message || "Error al crear perfil");
            return { ok: false };
          }
        }

        await bootstrapAuth({ force: true });
        closeModal();
        return { ok: true };
      },

      onNegocio: async (code) => {
        setEmailError("");

        const session = (await supabase.auth.getSession()).data.session;
        if (!session?.user) {
          setEmailError("Sesión no válida");
          return { ok: false };
        }
        const authEmail = session.user.email || email;
        if (!authEmail) {
          setEmailError("No se pudo obtener el email de la cuenta");
          return { ok: false };
        }

        //Crear o actualizar perfil de negocio (solo si no tenÇða rol)
        const { data: existing, error: exErr } = await supabase
          .from("usuarios")
          .select("*")
          .eq("id_auth", session.user.id)
          .maybeSingle();
        if (exErr) {
          setEmailError(exErr.message || "No se pudo leer perfil");
          return { ok: false };
        }

        //Crear perfil negocio solo si no tenÇða rol
        if (!existing?.role) {
          const { error } = await supabase
            .from("usuarios")
            .insert({
              id_auth: session.user.id,
              email: authEmail,
              role: "negocio",
              account_status: "pending",
            })
            .select()
            .maybeSingle();
          if (error) {
            setEmailError(error.message || "Error al crear perfil");
            return { ok: false };
          }
        }

        await bootstrapAuth({ force: true });
        closeModal();

        return { ok: true };
      },
    });
  }, [
    onboarding,
    openModal,
    closeModal,
    email,
    password,
    telefono,
    bootstrapAuth,
    goToRegisterTab,
    setEmailError,
  ]);

  const handlePrimaryPage1 = useCallback(async () => {
    if (!validatePage1()) return;
    setEmailError("");

    try {
      //Crear SOLO la cuenta Auth (sin perfil)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        const msg = error.message?.toLowerCase() || "";
        if (msg.includes("ya existe") || msg.includes("already") || msg.includes("exists")) {
          setEmailError("Esta cuenta ya existe. Si la creaste con Google, usa Google para continuar.");
          if (onResetToWelcome) {
            onResetToWelcome();
            return;
          }
          setAuthTab("login");
          setEntryStep("welcome");
          setPage(1);
          setEmailError("");
          return;
        }
        setEmailError(error.message);
        return;
      }

      //Asegurar sesiÇün activa
      const session = data?.session ?? (await supabase.auth.getSession()).data.session;
      if (!session?.user) {
        setEmailError("No se pudo iniciar la sesión");
        return;
      }

      //Avanzar a seleccion de rol
      setEntryStep("form");
      setAuthTab("register");
      setPage(2);
      openChoiceOverlay();
    } catch (err) {
      setEmailError(err?.message || "Error al crear la cuenta");
    }
  }, [
    email,
    onResetToWelcome,
    openChoiceOverlay,
    password,
    setAuthTab,
    setEmailError,
    setEntryStep,
    setPage,
    validatePage1,
  ]);

  const handleNext2 = useCallback(async () => {
    if (!nombreDueno) return setEmailError("Ingrese nombres");
    if (!apellidoDueno) return setEmailError("Ingrese apellidos");
    if (!PHONE_RE.test(telefono)) return setEmailError("Ingrese un teléfono válido");
    setEmailError("");

    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.user) {
      setEmailError("No hay sesión activa");
      return;
    }
    //Perfil debe existir y ser rol negocio (ya seteado en SplashChoice)
    //Inserta/actualiza datos del propietario en usuarios
    const { data: existing, error: exErr } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", session.user.id)
      .maybeSingle();
    if (exErr) {
      setEmailError(exErr.message || "No se pudo leer perfil");
      return;
    }
    if (!existing) {
      setEmailError("Primero debes seleccionar tipo de cuenta");
      return;
    }
    if (existing.role !== "negocio") {
      setEmailError("Tu cuenta no es de negocio");
      return;
    }
    const { error } = await supabase
      .from("usuarios")
      .update({
        nombre: nombreDueno,
        apellido: apellidoDueno,
        telefono,
      })
      .eq("id_auth", session.user.id);

    if (error) {
      setEmailError(error.message || "No se pudo guardar datos del propietario");
      return;
    }

    await bootstrapAuth({ force: true });
    //MantÇ¸n UX: si acabÇü page 2, avanza a page3.
    setPage(3);
  }, [
    apellidoDueno,
    bootstrapAuth,
    nombreDueno,
    setEmailError,
    setPage,
    telefono,
  ]);

  const handleRegister = useCallback(async () => {
    try {
      const session = (await supabase.auth.getSession())?.data?.session;
      const userId = session?.user?.id;
      if (!userId || !session?.access_token) {
        setEmailError("No hay sesion activa. Inicia sesión y vuelve a intentar.");
        return;
      }

      //Obtener perfil actual
      const { data: userRow, error: userErr } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_auth", userId)
        .maybeSingle();

      if (userErr) {
        setEmailError(userErr.message || "No se pudo leer el perfil");
        return;
      }
      if (!userRow) {
        setEmailError("Falta crear el perfil de usuario antes de registrar el negocio");
        return;
      }
      if (userRow.role !== "negocio") {
        setEmailError("Tu cuenta no es de negocio");
        return;
      }

      const { data: existingNeg, error: negReadErr } = await supabase
        .from("negocios")
        .select("*")
        .eq("usuarioid", userRow.id)
        .maybeSingle();
      if (negReadErr) {
        setEmailError(negReadErr.message || "No se pudo leer el negocio");
        return;
      }

      const direccion = calle2
        ? `${(calle1 || "").trim()}|${(calle2 || "").trim()}`
        : (calle1 || "").trim();

      const negocioPayload = {
        usuarioid: userRow.id,
        nombre: nombreNegocio || existingNeg?.nombre || "Nombre Local",
        sector: sectorNegocio || existingNeg?.sector || null,
        direccion: direccion || existingNeg?.direccion || null,
      };

      //Crear/actualizar negocio
      if (existingNeg) {
        const { error } = await supabase
          .from("negocios")
          .update(negocioPayload)
          .eq("id", existingNeg.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("negocios")
          .insert(negocioPayload);
        if (error) throw error;
      }

      //Actualizar perfil de usuario a completo con datos del dueÇño
      const { error: updErr } = await supabase
        .from("usuarios")
        .update({
          nombre: nombreDueno || userRow.nombre,
          apellido: apellidoDueno || userRow.apellido,
          telefono,
          ruc,
        })
        .eq("id_auth", userId);
      if (updErr) throw updErr;

      await bootstrapAuth({ force: true });
    } catch (err) {
      setEmailError(err?.message || "Error al registrar negocio");
    }
  }, [
    apellidoDueno,
    bootstrapAuth,
    calle1,
    calle2,
    nombreDueno,
    nombreNegocio,
    ruc,
    sectorNegocio,
    setEmailError,
    telefono,
  ]);

  const startOAuth = useCallback(async (provider) => {
    setEmailError("");
    setOauthProvider(provider);
    setOauthLoading(true);

    try {
      await signInWithOAuth(provider, { redirectTo });
    } catch (err) {
      localStorage.removeItem(OAUTH_INTENT_KEY);
      setEmailError(err?.message || "No se pudo iniciar sesiÇün");
      setOauthLoading(false);
      setOauthProvider(null);
    }
  }, [redirectTo, setEmailError, setOauthLoading, setOauthProvider]);

  const startGoogleOAuth = useCallback(() => startOAuth("google"), [startOAuth]);
  const startFacebookOAuth = useCallback(() => startOAuth("facebook"), [startOAuth]);

  const startGoogleOneTap = useCallback(async () => {
    setWelcomeError("");
    setWelcomeLoading(true);
    if (!GOOGLE_ONE_TAP_CLIENT_ID) {
      setWelcomeError("Falta configurar Google Client ID");
      setWelcomeLoading(false);
      return;
    }

    try {
      const result = await requestGoogleCredential({
        clientId: GOOGLE_ONE_TAP_CLIENT_ID,
      });

      if (!result || result.type === "dismissed") return;

      localStorage.setItem(OAUTH_LOGIN_PENDING, JSON.stringify({ ts: Date.now() }));
      await signInWithGoogleIdToken({ token: result.credential });

      await bootstrapAuth({ force: true });
    } catch (err) {
      setWelcomeError(err?.message || "No se pudo iniciar con Google");
    } finally {
      setWelcomeLoading(false);
    }
  }, [bootstrapAuth, setWelcomeError, setWelcomeLoading]);

  const startFacebookOneTap = useCallback(() => {}, []);

  const handleBackFromForm = useCallback(() => {
    if (page === 3) {
      goTo(2);
      return;
    }
    goToRegisterTab();
  }, [goTo, goToRegisterTab, page]);

  return {
    goToLoginTab,
    goToRegisterTab,
    handleLogin,
    handlePrimaryPage1,
    handleNext2,
    handleRegister,
    startOAuth,
    startGoogleOAuth,
    startFacebookOAuth,
    startGoogleOneTap,
    startFacebookOneTap,
    openChoiceOverlay,
    handleBackFromForm,
  };
}
