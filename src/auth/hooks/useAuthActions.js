import { useCallback } from "react";
import {
  CODE_RE,
  EMAIL_RE,
  PHONE_RE,
  validateEmail,
} from "../../utils/validators";
import { useAppStore } from "../../store/appStore";
import { signInWithOAuth, signInWithGoogleIdToken } from "../../services/authService";
import { supabase } from "../../lib/supabaseClient";
import { requestGoogleCredential } from "../../utils/googleOneTap";
import { AUTH_STEPS } from "../constants/authSteps";

const OAUTH_INTENT_KEY = "oauth_intent";
const OAUTH_LOGIN_PENDING = "oauth_login_pending";
const GOOGLE_ONE_TAP_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_ONE_TAP_CLIENT_ID ||
  import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function useAuthActions({
  email,
  password,
  passwordConfirm,
  telefono,
  nombreDueno,
  apellidoDueno,
  ruc,
  nombreNegocio,
  sectorNegocio,
  calle1,
  calle2,
  step,
  setEmailError,
  setWelcomeError,
  setLoginLoading,
  setOauthLoading,
  setOauthProvider,
  setWelcomeLoading,
  setStep,
  goToStep,
  onResetToWelcome,
}) {
  const login = useAppStore((s) => s.login);
  const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

  const redirectTo =
    (typeof window !== "undefined" && `${window.location.origin}/auth`) ||
    import.meta.env.VITE_AUTH_REDIRECT_URL;

  const goToEmailLogin = useCallback(() => {
    setStep(AUTH_STEPS.EMAIL_LOGIN);
    setEmailError("");
  }, [setEmailError, setStep]);

  const goToEmailRegister = useCallback(() => {
    setStep(AUTH_STEPS.EMAIL_REGISTER);
    setEmailError("");
  }, [setEmailError, setStep]);

  const validateEmailRegister = useCallback(() => {
    if (!EMAIL_RE.test(email)) {
      setEmailError("Email invalido");
      return false;
    }
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const hasNumberAndSymbol = hasNumber && hasSymbol;

    if (!hasMinLength) {
      setEmailError("La contrasena debe tener al menos 8 caracteres");
      return false;
    }
    if (!hasNumberAndSymbol) {
      setEmailError("Incluye un simbolo y un numero");
      return false;
    }
    if (password !== passwordConfirm) {
      setEmailError("Las contrasenas deben coincidir");
      return false;
    }
    setEmailError("");
    return true;
  }, [email, password, passwordConfirm, setEmailError]);

  const handleEmailLogin = useCallback(async () => {
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

      setEmailError(result.error || "Email o contrasena incorrectos");
      return;
    }
  }, [email, password, login, setEmailError, setLoginLoading]);

  const createClienteProfile = useCallback(async () => {
    setEmailError("");

    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.user) {
      setEmailError("Sesion no valida");
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

    //Crear perfil cliente solo si no tenia rol
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
    return { ok: true };
  }, [bootstrapAuth, email, setEmailError, telefono]);

  const createNegocioProfile = useCallback(async ({
    bootstrap = true,
    silent = false,
  } = {}) => {
    const reportError = silent ? () => {} : setEmailError;
    reportError("");

    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.user) {
      reportError("Sesion no valida");
      return { ok: false, error: "Sesion no valida" };
    }
    const authEmail = session.user.email || email;
    if (!authEmail) {
      reportError("No se pudo obtener el email de la cuenta");
      return { ok: false, error: "No se pudo obtener el email de la cuenta" };
    }

    //Crear o actualizar perfil de negocio (solo si no tenia rol)
    const { data: existing, error: exErr } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", session.user.id)
      .maybeSingle();
    if (exErr) {
      reportError(exErr.message || "No se pudo leer perfil");
      return { ok: false, error: exErr.message || "No se pudo leer perfil" };
    }

    //Crear perfil negocio solo si no tenia rol
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
        reportError(error.message || "Error al crear perfil");
        return { ok: false, error: error.message || "Error al crear perfil" };
      }
    }

    if (bootstrap) {
      await bootstrapAuth({ force: true });
    }
    return { ok: true };
  }, [bootstrapAuth, email, setEmailError]);

  const handleRoleSelect = useCallback(
    async (role) => {
      if (role === "cliente") {
        return createClienteProfile();
      }
      if (role === "negocio") {
        return createNegocioProfile();
      }
      return { ok: false };
    },
    [createClienteProfile, createNegocioProfile]
  );

  const validateNegocioCode = useCallback(
    async (codeRaw) => {
      const code = String(codeRaw || "").trim().toUpperCase();
      if (!CODE_RE.test(code)) {
        return { ok: false, error: "Codigo de registro invalido" };
      }

      const session = (await supabase.auth.getSession()).data.session;
      if (!session?.access_token) {
        return { ok: false, error: "No hay sesion activa" };
      }

      const { data: validation, error: validationError } =
        await supabase.functions.invoke("validate-registration-code", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: {
            code,
            expected_role: "negocio",
            consume: false,
          },
        });

      if (validationError) {
        return {
          ok: false,
          error: validationError.message || "No se pudo validar el codigo",
        };
      }

      if (!validation?.ok || !validation?.valid) {
        const reason = validation?.reason;
        const message =
          reason === "revoked"
            ? "Codigo revocado"
            : reason === "used"
              ? "Codigo ya utilizado"
              : reason === "expired"
                ? "Codigo expirado"
                : reason === "role_mismatch"
                  ? "Codigo no valido para negocio"
                  : "Codigo de registro invalido";
        return { ok: false, error: message };
      }

      const created = await createNegocioProfile({
        bootstrap: false,
        silent: true,
      });
      if (!created.ok) {
        return {
          ok: false,
          error: created.error || "No se pudo crear el perfil de negocio",
        };
      }

      const { data: consumed, error: consumeError } =
        await supabase.functions.invoke("validate-registration-code", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: {
            code,
            expected_role: "negocio",
            consume: true,
          },
        });

      if (consumeError) {
        return {
          ok: false,
          error: consumeError.message || "No se pudo consumir el codigo",
        };
      }

      if (!consumed?.ok || !consumed?.valid) {
        return { ok: false, error: "No se pudo consumir el codigo" };
      }

      return { ok: true };
    },
    [createNegocioProfile]
  );

  const handleEmailRegister = useCallback(async () => {
    if (!validateEmailRegister()) return;
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
          goToEmailLogin();
          return;
        }
        setEmailError(error.message);
        return;
      }

      //Asegurar sesion activa
      const session = data?.session ?? (await supabase.auth.getSession()).data.session;
      if (!session?.user) {
        setEmailError("No se pudo iniciar la sesion");
        return;
      }

      const boot = await bootstrapAuth({ force: true });
      if (!boot.ok) {
        setEmailError(boot.error || "No se pudo validar onboarding");
        return;
      }

    } catch (err) {
      setEmailError(err?.message || "Error al crear la cuenta");
    }
  }, [
    email,
    onResetToWelcome,
    password,
    bootstrapAuth,
    setEmailError,
    goToEmailLogin,
    validateEmailRegister,
  ]);

  const handleOwnerDataNext = useCallback(async () => {
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
    goToStep(AUTH_STEPS.BUSINESS_DATA);
  }, [
    apellidoDueno,
    bootstrapAuth,
    goToStep,
    nombreDueno,
    setEmailError,
    telefono,
  ]);

  const handleBusinessRegister = useCallback(async () => {
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
    const fallbackToOAuth = async () => {
      try {
        await signInWithOAuth("google", { redirectTo });
      } catch (err) {
        setWelcomeError(err?.message || "No se pudo iniciar con Google");
      }
    };

    if (!GOOGLE_ONE_TAP_CLIENT_ID) {
      await fallbackToOAuth();
      setWelcomeLoading(false);
      return;
    }

    try {
      const result = await requestGoogleCredential({
        clientId: GOOGLE_ONE_TAP_CLIENT_ID,
      });

      if (!result || result.type !== "credential") {
        await fallbackToOAuth();
        return;
      }

      localStorage.setItem(OAUTH_LOGIN_PENDING, JSON.stringify({ ts: Date.now() }));
      await signInWithGoogleIdToken({ token: result.credential });

      await bootstrapAuth({ force: true });
    } catch (err) {
      await fallbackToOAuth();
    } finally {
      setWelcomeLoading(false);
    }
  }, [bootstrapAuth, redirectTo, setWelcomeError, setWelcomeLoading]);

  const startFacebookOneTap = useCallback(() => {}, []);

  const handleFormBack = useCallback(() => {
    if (step === AUTH_STEPS.BUSINESS_DATA) {
      goToStep(AUTH_STEPS.OWNER_DATA);
      return;
    }
    if (step === AUTH_STEPS.OWNER_DATA) {
      setStep(AUTH_STEPS.ROLE_SELECT);
      return;
    }
    goToEmailRegister();
  }, [goToEmailRegister, goToStep, setStep, step]);

  return {
    goToEmailLogin,
    goToEmailRegister,
    handleEmailLogin,
    handleEmailRegister,
    handleOwnerDataNext,
    handleBusinessRegister,
    handleRoleSelect,
    startOAuth,
    startGoogleOAuth,
    startFacebookOAuth,
    startGoogleOneTap,
    startFacebookOneTap,
    handleFormBack,
    validateNegocioCode,
  };
}
