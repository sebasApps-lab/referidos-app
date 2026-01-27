import { useCallback } from "react";
import {
  CODE_RE,
  EMAIL_RE,
  validateEmail,
} from "../../utils/validators";
import { useAppStore } from "../../store/appStore";
import { signInWithOAuth, signInWithGoogleIdToken } from "../../services/authService";
import { supabase } from "../../lib/supabaseClient";
import { requestGoogleCredential } from "../../utils/googleOneTap";
import { AUTH_STEPS } from "../constants/authSteps";
import {
  buildBirthdateISO,
  getUserProfileStatus,
  normalizeUserName,
} from "../utils/userProfileUtils";
import {
  getBusinessDataStatus,
  normalizeBusinessName,
} from "../utils/businessDataUtils";
import { runValidateRegistration } from "../../services/registrationClient";
import { toTitleCaseEs } from "../../utils/textCase";

const OAUTH_INTENT_KEY = "oauth_intent";
const OAUTH_LOGIN_PENDING = "oauth_login_pending";
const GOOGLE_ONE_TAP_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_ONE_TAP_CLIENT_ID ||
  import.meta.env.VITE_GOOGLE_CLIENT_ID;
const DEFAULT_SUCURSAL_HORARIOS = {
  semanal: {
    lunes: [{ abre: "10:00", cierra: "18:00" }],
    martes: [{ abre: "10:00", cierra: "18:00" }],
    miercoles: [{ abre: "10:00", cierra: "18:00" }],
    jueves: [{ abre: "10:00", cierra: "18:00" }],
    viernes: [{ abre: "10:00", cierra: "18:00" }],
    sabado: [],
    domingo: [],
  },
  excepciones: [],
};

const normalizeNullableString = (value) => {
  const text = String(value ?? "").trim();
  return text ? text : null;
};

const normalizeNullableNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
};

const areDireccionesEqual = (current, next) => {
  if (!current || !next) return false;
  return (
    normalizeNullableString(current.owner_id) ===
      normalizeNullableString(next.owner_id) &&
    normalizeNullableString(current.calles) ===
      normalizeNullableString(next.calles) &&
    normalizeNullableString(current.referencia) ===
      normalizeNullableString(next.referencia) &&
    normalizeNullableString(current.ciudad) ===
      normalizeNullableString(next.ciudad) &&
    normalizeNullableString(current.sector) ===
      normalizeNullableString(next.sector) &&
    normalizeNullableString(current.place_id) ===
      normalizeNullableString(next.place_id) &&
    normalizeNullableString(current.label) ===
      normalizeNullableString(next.label) &&
    normalizeNullableString(current.provider) ===
      normalizeNullableString(next.provider) &&
    normalizeNullableString(current.provincia_id) ===
      normalizeNullableString(next.provincia_id) &&
    normalizeNullableString(current.canton_id) ===
      normalizeNullableString(next.canton_id) &&
    normalizeNullableString(current.parroquia_id) ===
      normalizeNullableString(next.parroquia_id) &&
    normalizeNullableString(current.parroquia) ===
      normalizeNullableString(next.parroquia) &&
    normalizeNullableNumber(current.lat) ===
      normalizeNullableNumber(next.lat) &&
    normalizeNullableNumber(current.lng) ===
      normalizeNullableNumber(next.lng) &&
    Boolean(current.is_user_provided) === Boolean(next.is_user_provided)
  );
};

export default function useAuthActions({
  email,
  password,
  passwordConfirm,
  telefono,
  nombreDueno,
  apellidoDueno,
  genero,
  fechaNacimiento,
  ownerPrefill,
  businessPrefill,
  nombreNegocio,
  categoriaNegocio,
  isSucursalPrincipal,
  horarios,
  direccionPayload,
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
  const setJustCompletedRegistration = useAppStore(
    (s) => s.setJustCompletedRegistration
  );
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);

  const redirectTo =
    (typeof window !== "undefined" && `${window.location.origin}/auth`) ||
    import.meta.env.VITE_AUTH_REDIRECT_URL;

  const resolveClientSteps = useCallback((state = onboarding) => {
    const steps = state?.client_steps || {};
    const profile = steps.profile || {};
    const address = steps.address || {};
    const profileCompleted = Boolean(profile.completed);
    const addressCompleted = Boolean(address.completed);
    const profileSkipped = Boolean(profile.skipped) && !profileCompleted;
    const addressSkipped = Boolean(address.skipped) && !addressCompleted;
    return {
      profilePending: !profileCompleted && !profileSkipped,
      addressPending: !addressCompleted && !addressSkipped,
    };
  }, [onboarding]);

  const advanceClientFlow = useCallback(async () => {
    await bootstrapAuth({ force: true });
    const nextOnboarding = useAppStore.getState().onboarding;
    const { profilePending, addressPending } = resolveClientSteps(nextOnboarding);
    if (profilePending) {
      goToStep(AUTH_STEPS.USER_PROFILE);
      return;
    }
    if (addressPending) {
      goToStep(AUTH_STEPS.USER_ADDRESS);
    }
  }, [bootstrapAuth, goToStep, resolveClientSteps]);

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
      goToStep(AUTH_STEPS.USER_PROFILE);
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

  const handleUserProfile = useCallback(async () => {
    const profileStatus = getUserProfileStatus({
      nombre: nombreDueno,
      apellido: apellidoDueno,
      genero,
      fechaNacimiento,
    });
    if (!profileStatus.nombre.trim()) return setEmailError("Ingrese nombres");
    if (!profileStatus.apellido.trim()) return setEmailError("Ingrese apellidos");
    if (!profileStatus.genero.trim()) return setEmailError("Selecciona un g??nero");
    if (!profileStatus.birthStatus.isValid) {
      return setEmailError("Ingrese una fecha de nacimiento valida");
    }
    setEmailError("");

    const prefillNombre = normalizeUserName(ownerPrefill?.nombre || "");
    const prefillApellido = normalizeUserName(ownerPrefill?.apellido || "");
    const prefillFecha = ownerPrefill?.fechaNacimiento || "";
    const prefillGenero = ownerPrefill?.genero || "";
    const unchanged =
      profileStatus.nombre === prefillNombre &&
      profileStatus.apellido === prefillApellido &&
      (fechaNacimiento || "") === prefillFecha &&
      profileStatus.genero === prefillGenero;

    const session = (await supabase.auth.getSession()).data.session;
    if (!session?.user) {
      setEmailError("No hay sesion activa");
      return;
    }
    const { data: existing, error: exErr } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", session.user.id)
      .maybeSingle();
    if (exErr) {
      setEmailError(exErr.message || "No se pudo leer perfil");
      return;
    }
    if (!existing?.role) {
      setEmailError("Primero debes seleccionar tipo de cuenta");
      return;
    }
    if (existing.role !== "negocio" && existing.role !== "cliente") {
      setEmailError("Tu cuenta no es valida");
      return;
    }

    const underageMessage =
      existing.role === "negocio"
        ? "Tienes que ser mayor de edad para ser el administrador"
        : "Debes ser mayor de edad para usar la app.";
    if (profileStatus.birthStatus.isUnderage) {
      return setEmailError(underageMessage);
    }

    const shouldUpdateProfile =
      !unchanged || Boolean(existing.cliente_profile_skipped);

    if (!shouldUpdateProfile) {
      if (existing.role === "negocio") {
        goToStep(AUTH_STEPS.BUSINESS_DATA);
        return;
      }
      await advanceClientFlow();
      return;
    }

    const birthdateIso = buildBirthdateISO(fechaNacimiento);
    const updatePayload = {
      nombre: profileStatus.nombre,
      apellido: profileStatus.apellido,
      genero: profileStatus.genero,
      fecha_nacimiento: birthdateIso,
    };
    if (existing.role === "cliente") {
      updatePayload.cliente_profile_skipped = false;
    }
    const { error } = await supabase
      .from("usuarios")
      .update(updatePayload)
      .eq("id_auth", session.user.id);

    if (error) {
      setEmailError(error.message || "No se pudo guardar datos del usuario");
      return;
    }

    if (existing.role === "negocio") {
      await bootstrapAuth({ force: true });
      goToStep(AUTH_STEPS.BUSINESS_DATA);
      return;
    }
    await advanceClientFlow();
  }, [
    apellidoDueno,
    advanceClientFlow,
    bootstrapAuth,
    fechaNacimiento,
    genero,
    goToStep,
    nombreDueno,
    ownerPrefill,
    setEmailError,
  ]);

  const handleBusinessData = useCallback(async () => {
    try {
      const businessStatus = getBusinessDataStatus({
        nombreNegocio,
        ruc: "",
        categoriaNegocio,
      });
      if (!businessStatus.nombre.trim()) {
        setEmailError("Ingresa el nombre del negocio");
        return;
      }
      if (!businessStatus.categoria) {
        setEmailError("Selecciona una categoria");
        return;
      }
      setEmailError("");

      const prefillNombre = normalizeBusinessName(
        businessPrefill?.nombreNegocio || ""
      );
      const prefillCategoria = String(
        businessPrefill?.categoriaNegocio || ""
      ).trim();
      const unchanged =
        businessStatus.nombre === prefillNombre &&
        businessStatus.categoria === prefillCategoria;

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
        .order("id", { ascending: false })
        .limit(1)
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
        .order("id", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (negReadErr) {
        setEmailError(negReadErr.message || "No se pudo leer el negocio");
        return;
      }

      const negocioPayload = {
        usuarioid: userRow.id,
        nombre: businessStatus.nombre || existingNeg?.nombre || "Nombre Local",
        categoria: businessStatus.categoria || existingNeg?.categoria || null,
      };

      //Crear/actualizar negocio
      let negocioId = existingNeg?.id || null;

      if (existingNeg && !unchanged) {
        const { data: updatedNeg, error } = await supabase
          .from("negocios")
          .update(negocioPayload)
          .eq("id", existingNeg.id)
          .select("id")
          .maybeSingle();
        if (error) throw error;
        if (!updatedNeg) {
          setEmailError("No se pudo actualizar el negocio");
          return;
        }
        negocioId = updatedNeg.id;
      } else if (!existingNeg) {
        const { data: createdNeg, error } = await supabase
          .from("negocios")
          .insert(negocioPayload)
          .select("id")
          .maybeSingle();
        if (error) throw error;
        if (!createdNeg) {
          setEmailError("No se pudo crear el negocio");
          return;
        }
        negocioId = createdNeg.id;
      }

      await bootstrapAuth({ force: true });
      goToStep(AUTH_STEPS.USER_ADDRESS);
    } catch (err) {
      setEmailError(err?.message || "Error al registrar negocio");
    }
  }, [
    apellidoDueno,
    bootstrapAuth,
    businessPrefill,
    categoriaNegocio,
    isSucursalPrincipal,
    goToStep,
    nombreDueno,
    nombreNegocio,
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
  const startAppleOAuth = useCallback(() => startOAuth("apple"), [startOAuth]);
  const startTwitterOAuth = useCallback(() => startOAuth("x"), [startOAuth]);
  const startDiscordOAuth = useCallback(() => startOAuth("discord"), [startOAuth]);

  const startGoogleOneTap = useCallback(async () => {
    setWelcomeError("");
    setWelcomeLoading(true);
    const fallbackEnabled = true;
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
      await signInWithGoogleIdToken({
        token: result.credential,
        nonce: result.nonce,
      });

      await bootstrapAuth({ force: true });
    } catch (err) {
      await fallbackToOAuth();
    } finally {
      setWelcomeLoading(false);
    }
  }, [bootstrapAuth, redirectTo, setWelcomeError, setWelcomeLoading]);

  const startFacebookOneTap = useCallback(() => {}, []);

  const skipUserProfile = useCallback(async () => {
    setEmailError("");
    const session = (await supabase.auth.getSession())?.data?.session;
    if (!session?.user) {
      setEmailError("No hay sesion activa");
      return;
    }
    const { error } = await supabase
      .from("usuarios")
      .update({ cliente_profile_skipped: true })
      .eq("id_auth", session.user.id);
    if (error) {
      setEmailError(error.message || "No se pudo omitir el paso");
      return;
    }
    await advanceClientFlow();
  }, [advanceClientFlow, setEmailError]);

  const skipUserAddress = useCallback(async () => {
    setEmailError("");
    const session = (await supabase.auth.getSession())?.data?.session;
    if (!session?.user) {
      setEmailError("No hay sesion activa");
      return;
    }
    const { error } = await supabase
      .from("usuarios")
      .update({ cliente_address_skipped: true })
      .eq("id_auth", session.user.id);
    if (error) {
      setEmailError(error.message || "No se pudo omitir el paso");
      return;
    }
    await advanceClientFlow();
  }, [advanceClientFlow, setEmailError]);

  const handleClientAddress = useCallback(async () => {
    setEmailError("");
    const placeId = String(direccionPayload?.place_id || "").trim();
    const label = toTitleCaseEs(String(direccionPayload?.label || "").trim());
    const provider = String(direccionPayload?.provider || "").trim();
    const provinciaId = String(direccionPayload?.provincia_id || "").trim();
    const cantonId = String(direccionPayload?.canton_id || "").trim();
    const parroquiaId = String(direccionPayload?.parroquia_id || "").trim();
    const latValue = direccionPayload?.lat ?? null;
    const lngValue = direccionPayload?.lng ?? null;
    if (!placeId || !label) {
      setEmailError("Selecciona una direcciÃ³n de la lista");
      return;
    }

    const calles = toTitleCaseEs(String(direccionPayload?.calles || "").trim());
    const ciudad = toTitleCaseEs(String(direccionPayload?.ciudad || "").trim());
    const sector = toTitleCaseEs(String(direccionPayload?.sector || "").trim());
    const referencia = String(direccionPayload?.referencia || "").trim();
    const parroquiaText = toTitleCaseEs(
      String(direccionPayload?.parroquia || "").trim()
    );

    if (latValue == null || lngValue == null) {
      setEmailError("Selecciona una direcciÃ³n vÃ¡lida");
      return;
    }

    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      setEmailError("No hay sesiÃ³n activa. Inicia sesiÃ³n y vuelve a intentar.");
      return;
    }

    const { data: userRow, error: userErr } = await supabase
      .from("usuarios")
      .select("id, role")
      .eq("id_auth", userId)
      .maybeSingle();

    if (userErr || !userRow) {
      setEmailError(userErr?.message || "No se pudo leer el perfil");
      return;
    }
    if (userRow.role !== "cliente") {
      setEmailError("Tu cuenta no es de cliente");
      return;
    }

    const direccionData = {
      owner_id: userRow.id,
      calles: calles || null,
      referencia: referencia || null,
      ciudad: ciudad || null,
      sector: sector || null,
      lat: Number(latValue),
      lng: Number(lngValue),
      place_id: placeId,
      label,
      provider: provider || null,
      provincia_id: provinciaId || null,
      canton_id: cantonId || null,
      parroquia_id: parroquiaId || null,
      parroquia: parroquiaId ? null : (parroquiaText || null),
      is_user_provided: true,
    };

    const { data: existingDir, error: existingErr } = await supabase
      .from("direcciones")
      .select(
        "id, owner_id, calles, referencia, ciudad, sector, lat, lng, place_id, label, provider, provincia_id, canton_id, parroquia_id, parroquia, is_user_provided"
      )
      .eq("owner_id", userRow.id)
      .eq("is_user_provided", true)
      .order("updated_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingErr) {
      setEmailError(existingErr.message || "No se pudo leer la direccion");
      return;
    }

    if (existingDir?.id) {
      const needsUpdate = !areDireccionesEqual(existingDir, direccionData);
      if (needsUpdate) {
        const { error: dirErr } = await supabase
          .from("direcciones")
          .update(direccionData)
          .eq("id", existingDir.id);
        if (dirErr) {
          setEmailError(dirErr.message || "No se pudo actualizar la direccion");
          return;
        }
      }
    } else {
      const { error: dirErr } = await supabase
        .from("direcciones")
        .insert(direccionData)
        .select("id")
        .maybeSingle();
      if (dirErr) {
        setEmailError(dirErr.message || "No se pudo guardar la direccion");
        return;
      }
    }

    const { error: skipErr } = await supabase
      .from("usuarios")
      .update({ cliente_address_skipped: false })
      .eq("id_auth", userId);
    if (skipErr) {
      setEmailError(skipErr.message || "No se pudo actualizar el perfil");
      return;
    }

    await advanceClientFlow();
  }, [advanceClientFlow, direccionPayload, setEmailError]);

  const handleBusinessAddress = useCallback(async () => {
    setEmailError("");
    const placeId = String(direccionPayload?.place_id || "").trim();
    const label = toTitleCaseEs(String(direccionPayload?.label || "").trim());
    const provider = String(direccionPayload?.provider || "").trim();
    const provinciaId = String(direccionPayload?.provincia_id || "").trim();
    const cantonId = String(direccionPayload?.canton_id || "").trim();
    const parroquiaId = String(direccionPayload?.parroquia_id || "").trim();
    const latValue = direccionPayload?.lat ?? null;
    const lngValue = direccionPayload?.lng ?? null;
    if (!placeId || !label) {
      setEmailError("Selecciona una dirección de la lista");
      return;
    }

    const calles = toTitleCaseEs(String(direccionPayload?.calles || "").trim());
    const ciudad = toTitleCaseEs(String(direccionPayload?.ciudad || "").trim());
    const sector = toTitleCaseEs(String(direccionPayload?.sector || "").trim());
    const referencia = String(direccionPayload?.referencia || "").trim();
    const parroquiaText = toTitleCaseEs(
      String(direccionPayload?.parroquia || "").trim()
    );

    if (latValue == null || lngValue == null) {
      setEmailError("Selecciona una dirección válida");
      return;
    }

    const session = (await supabase.auth.getSession())?.data?.session;
    const userId = session?.user?.id;
    if (!userId) {
      setEmailError("No hay sesión activa. Inicia sesión y vuelve a intentar.");
      return;
    }

    const { data: userRow, error: userErr } = await supabase
      .from("usuarios")
      .select("id, role")
      .eq("id_auth", userId)
      .maybeSingle();

    if (userErr || !userRow) {
      setEmailError(userErr?.message || "No se pudo leer el perfil");
      return;
    }
    if (userRow.role !== "negocio") {
      setEmailError("Tu cuenta no es de negocio");
      return;
    }

    const { data: negocioRow, error: negErr } = await supabase
      .from("negocios")
      .select("id")
      .eq("usuarioid", userRow.id)
      .maybeSingle();

    if (negErr || !negocioRow) {
      setEmailError(negErr?.message || "No se pudo leer el negocio");
      return;
    }

    const { data: sucursales, error: sucErr } = await supabase
      .from("sucursales")
      .select("id, direccion_id, status, tipo, fechacreacion")
      .eq("negocioid", negocioRow.id)
      .order("fechacreacion", { ascending: false });

    if (sucErr) {
      setEmailError(sucErr.message || "No se pudo leer sucursales");
      return;
    }

    const allSucursales = Array.isArray(sucursales) ? sucursales : [];
    const draftSucursal = allSucursales.find(
      (row) => String(row.status || "draft").toLowerCase() === "draft"
    );
    const targetSucursal = draftSucursal || allSucursales[0] || null;
    let ensuredSucursal = targetSucursal;

    const direccionData = {
      owner_id: userRow.id,
      calles: calles || null,
      referencia: referencia || null,
      ciudad: ciudad || null,
      sector: sector || null,
      lat: Number(latValue),
      lng: Number(lngValue),
      place_id: placeId,
      label,
      provider: provider || null,
      provincia_id: provinciaId || null,
      canton_id: cantonId || null,
      parroquia_id: parroquiaId || null,
      parroquia: parroquiaId ? null : (parroquiaText || null),
      is_user_provided: true,
    };

    let direccionId = ensuredSucursal?.direccion_id || null;


    if (direccionId) {
      const { data: existingDir, error: existingDirErr } = await supabase
        .from("direcciones")
        .select(
          "id, owner_id, calles, referencia, ciudad, sector, lat, lng, place_id, label, provider, provincia_id, canton_id, parroquia_id, parroquia, is_user_provided"
        )
        .eq("id", direccionId)
        .maybeSingle();

      if (existingDirErr) {
        setEmailError(existingDirErr.message || "No se pudo leer la direccion");
        return;
      }

      const needsUpdate = !areDireccionesEqual(existingDir, direccionData);
      if (needsUpdate) {
        const { error: dirErr } = await supabase
          .from("direcciones")
          .update(direccionData)
          .eq("id", direccionId);
        if (dirErr) {
          setEmailError(dirErr.message || "No se pudo actualizar la direccion");
          return;
        }
      }
    } else {
      const linkedDireccionIds = allSucursales
        .map((row) => row.direccion_id)
        .filter(Boolean);
      if (ensuredSucursal?.direccion_id) {
        linkedDireccionIds.push(ensuredSucursal.direccion_id);
      }

      let existingFreeDir = null;
      let existingFreeErr = null;
      if (linkedDireccionIds.length > 0) {
        const { data, error } = await supabase
          .from("direcciones")
          .select(
            "id, owner_id, calles, referencia, ciudad, sector, lat, lng, place_id, label, provider, provincia_id, canton_id, parroquia_id, parroquia, is_user_provided, created_at"
          )
          .eq("owner_id", userRow.id)
          .eq("is_user_provided", true)
          .not("id", "in", `(${linkedDireccionIds.join(",")})`)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        existingFreeDir = data || null;
        existingFreeErr = error || null;
      } else {
        const { data, error } = await supabase
          .from("direcciones")
          .select(
            "id, owner_id, calles, referencia, ciudad, sector, lat, lng, place_id, label, provider, provincia_id, canton_id, parroquia_id, parroquia, is_user_provided, created_at"
          )
          .eq("owner_id", userRow.id)
          .eq("is_user_provided", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        existingFreeDir = data || null;
        existingFreeErr = error || null;
      }

      if (existingFreeErr) {
        setEmailError(
          existingFreeErr.message || "No se pudo leer la direccion"
        );
        return;
      }

      if (existingFreeDir?.id) {
        const needsUpdate = !areDireccionesEqual(
          existingFreeDir,
          direccionData
        );
        if (needsUpdate) {
          const { error: dirErr } = await supabase
            .from("direcciones")
            .update(direccionData)
            .eq("id", existingFreeDir.id);
          if (dirErr) {
            setEmailError(
              dirErr.message || "No se pudo actualizar la direccion"
            );
            return;
          }
        }
        direccionId = existingFreeDir.id;
      } else {
        const { data: newDir, error: dirErr } = await supabase
          .from("direcciones")
          .insert(direccionData)
          .select("id")
          .maybeSingle();
        if (dirErr || !newDir?.id) {
          setEmailError(dirErr?.message || "No se pudo guardar la direcci?n");
          return;
        }
        direccionId = newDir.id;
      }
    }

    const tipoValue = isSucursalPrincipal ? "principal" : "sucursal";
    const statusValue =
      String(targetSucursal?.status || "").trim() || "draft";
    const horariosValue =
      horarios && typeof horarios === "object"
        ? horarios
        : DEFAULT_SUCURSAL_HORARIOS;

    if (ensuredSucursal) {
      const { error: updErr } = await supabase
        .from("sucursales")
        .update({
          direccion_id: direccionId,
          tipo: tipoValue,
          status: statusValue,
          horarios: horariosValue,
        })
        .eq("id", ensuredSucursal.id);

      if (updErr) {
        setEmailError(updErr.message || "No se pudo actualizar la sucursal");
        return;
      }
    } else {
      const { data: createdSucursal, error: insErr } = await supabase
        .from("sucursales")
        .insert({
          negocioid: negocioRow.id,
          direccion_id: direccionId,
          tipo: tipoValue,
          horarios: horariosValue,
          status: "draft",
        })
        .select("id")
        .maybeSingle();

      if (insErr || !createdSucursal?.id) {
        setEmailError(insErr.message || "No se pudo crear la sucursal");
        return;
      }
      ensuredSucursal = createdSucursal;
    }

    const result = await runValidateRegistration();
    if (!result?.ok || !result?.valid) {
      setEmailError(result?.message || result?.error || "Aún falta completar datos");
    } else {
      setJustCompletedRegistration?.(true);
    }
    await bootstrapAuth({ force: true });
  }, [
    bootstrapAuth,
    direccionPayload,
    horarios,
    isSucursalPrincipal,
    setEmailError,
    setJustCompletedRegistration,
  ]);

  const handleUserAddress = useCallback(async () => {
    const role = usuario?.role || onboarding?.usuario?.role;
    if (role === "cliente") {
      await handleClientAddress();
      return;
    }
    await handleBusinessAddress();
  }, [handleBusinessAddress, handleClientAddress, onboarding?.usuario?.role, usuario?.role]);

  const handleButtonBack = useCallback(() => {
    const role = usuario?.role || onboarding?.usuario?.role;
    if (step === AUTH_STEPS.BUSINESS_CATEGORY) {
      goToStep(AUTH_STEPS.BUSINESS_DATA);
      return;
    }
    if (step === AUTH_STEPS.USER_ADDRESS) {
      if (role === "cliente") {
        goToStep(AUTH_STEPS.USER_PROFILE);
        return;
      }
      goToStep(AUTH_STEPS.BUSINESS_DATA);
      return;
    }
    if (step === AUTH_STEPS.BUSINESS_DATA) {
      goToStep(AUTH_STEPS.USER_PROFILE);
      return;
    }
    if (step === AUTH_STEPS.USER_PROFILE) {
      goToEmailRegister();
      return;
    }
    goToEmailRegister();
  }, [goToEmailRegister, goToStep, onboarding?.usuario?.role, step, usuario?.role]);

  return {
    goToEmailLogin,
    goToEmailRegister,
    handleEmailLogin,
    handleEmailRegister,
    handleUserProfile,
    handleBusinessData,
    handleUserAddress,
    handleRoleSelect,
    skipUserProfile,
    skipUserAddress,
    startOAuth,
    startGoogleOAuth,
    startFacebookOAuth,
    startAppleOAuth,
    startTwitterOAuth,
    startDiscordOAuth,
    startGoogleOneTap,
    startFacebookOneTap,
    handleButtonBack,
    validateNegocioCode,
  };
}

