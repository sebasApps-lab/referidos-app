import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Linking } from "react-native";
import {
  AUTH_ROLES,
  AUTH_STEPS,
  buildBirthdateISO,
  formatBirthdateForInput,
  getUserProfileStatus,
  isPhoneValidForCountry,
  parsePhoneWithCountry,
  resolveRegistrationStep,
  resolveVerificationStep,
  toStoragePhone,
  validateEmail,
  validateRucFromCedula,
} from "@referidos/domain";
import { mobileApi, supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { MOBILE_ENV } from "@shared/constants/env";

const DEFAULT_HORARIOS = {
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

function parseAuthCallbackParams(url: string) {
  const safeUrl = String(url || "").trim();
  if (!safeUrl) return null;

  const hashIndex = safeUrl.indexOf("#");
  const queryIndex = safeUrl.indexOf("?");
  const queryText =
    queryIndex >= 0
      ? safeUrl.slice(queryIndex + 1, hashIndex >= 0 ? hashIndex : undefined)
      : "";
  const hashText = hashIndex >= 0 ? safeUrl.slice(hashIndex + 1) : "";
  const query = new URLSearchParams(queryText);
  const hash = new URLSearchParams(hashText);

  const code = query.get("code") || hash.get("code");
  const accessToken =
    query.get("access_token") || hash.get("access_token");
  const refreshToken =
    query.get("refresh_token") || hash.get("refresh_token");
  const error =
    query.get("error_description") ||
    hash.get("error_description") ||
    query.get("error") ||
    hash.get("error");

  if (!code && !accessToken && !refreshToken && !error) return null;
  return { code, accessToken, refreshToken, error };
}

async function getCurrentUserRow() {
  const { data: { session } = {} } = await supabase.auth.getSession();
  const authUserId = session?.user?.id;
  if (!authUserId) return { ok: false, error: "no_session" };

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id_auth", authUserId)
    .maybeSingle();
  if (error || !data) return { ok: false, error: error?.message || "user_not_found" };
  return { ok: true, data };
}

async function getCurrentAuthEmail() {
  const { data: { session } = {} } = await supabase.auth.getSession();
  return session?.user?.email || null;
}

export function useAuthEngine() {
  const bootStatus = useAppStore((state) => state.bootStatus);
  const onboarding = useAppStore((state) => state.onboarding);
  const role = useAppStore((state) => state.role);
  const allowAccess = useAppStore((state) => state.allowAccess);
  const reasons = useAppStore((state) => state.reasons);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);

  const [step, setStep] = useState(AUTH_STEPS.WELCOME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [genero, setGenero] = useState("no_especificar");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [nombreNegocio, setNombreNegocio] = useState("");
  const [categoriaNegocio, setCategoriaNegocio] = useState("");
  const [ruc, setRuc] = useState("");
  const [telefono, setTelefono] = useState("");

  const [isSucursalPrincipal, setIsSucursalPrincipal] = useState(true);
  const [horarios, setHorarios] = useState<any>(DEFAULT_HORARIOS);
  const [calles, setCalles] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [sector, setSector] = useState("");
  const [provinciaId, setProvinciaId] = useState("");
  const [cantonId, setCantonId] = useState("");
  const [parroquiaId, setParroquiaId] = useState("");
  const [parroquia, setParroquia] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const handledOAuthUrlsRef = useRef<Set<string>>(new Set());

  const roleFromOnboarding = onboarding?.usuario?.role || role || null;

  const completeOAuthCallback = useCallback(
    async (url: string) => {
      const parsed = parseAuthCallbackParams(url);
      if (!parsed) return false;

      if (handledOAuthUrlsRef.current.has(url)) return true;
      handledOAuthUrlsRef.current.add(url);

      setStep(AUTH_STEPS.OAUTH_CALLBACK);
      setLoading(true);
      setError("");
      setInfo("");

      try {
        if (parsed.error) {
          setError(parsed.error);
          return true;
        }

        if (parsed.code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
            parsed.code,
          );
          if (exchangeError) {
            setError(exchangeError.message || "No se pudo completar OAuth.");
            return true;
          }
          await bootstrapAuth();
          return true;
        }

        if (parsed.accessToken && parsed.refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: parsed.accessToken,
            refresh_token: parsed.refreshToken,
          });
          if (sessionError) {
            setError(sessionError.message || "No se pudo recuperar la sesion OAuth.");
            return true;
          }
          await bootstrapAuth();
          return true;
        }

        setError("Callback OAuth incompleto.");
        return true;
      } catch (err: any) {
        setError(String(err?.message || err || "oauth_callback_failed"));
        return true;
      } finally {
        setLoading(false);
      }
    },
    [bootstrapAuth],
  );

  useEffect(() => {
    if (!onboarding?.ok) return;

    const usuarioRow = onboarding?.usuario || {};
    const negocioRow = onboarding?.negocio || {};
    const sucursalRow = onboarding?.sucursal || onboarding?.branch || {};
    const addressRow =
      onboarding?.address ||
      onboarding?.direccion ||
      sucursalRow?.direccion ||
      sucursalRow?.address ||
      {};

    if (!email && usuarioRow?.email) setEmail(String(usuarioRow.email));
    if (!nombre && usuarioRow?.nombre) setNombre(String(usuarioRow.nombre));
    if (!apellido && usuarioRow?.apellido) setApellido(String(usuarioRow.apellido));
    if ((genero === "no_especificar" || !genero) && usuarioRow?.genero) {
      setGenero(String(usuarioRow.genero));
    }
    if (!fechaNacimiento && usuarioRow?.fecha_nacimiento) {
      setFechaNacimiento(formatBirthdateForInput(String(usuarioRow.fecha_nacimiento)));
    }
    if (!telefono && usuarioRow?.telefono) setTelefono(String(usuarioRow.telefono));

    if (!nombreNegocio && negocioRow?.nombre) setNombreNegocio(String(negocioRow.nombre));
    if (!categoriaNegocio && negocioRow?.categoria) {
      setCategoriaNegocio(String(negocioRow.categoria));
    }
    if (!ruc && negocioRow?.ruc) setRuc(String(negocioRow.ruc));

    if (!calles && addressRow?.calles) setCalles(String(addressRow.calles));
    if (!ciudad && addressRow?.ciudad) setCiudad(String(addressRow.ciudad));
    if (!sector && addressRow?.sector) setSector(String(addressRow.sector));
    if (!provinciaId && addressRow?.provincia_id) {
      setProvinciaId(String(addressRow.provincia_id));
    }
    if (!cantonId && addressRow?.canton_id) setCantonId(String(addressRow.canton_id));
    if (!parroquiaId && addressRow?.parroquia_id) {
      setParroquiaId(String(addressRow.parroquia_id));
    }
    if (!parroquia && addressRow?.parroquia) setParroquia(String(addressRow.parroquia));
    if (!lat && Number.isFinite(Number(addressRow?.lat))) setLat(String(addressRow.lat));
    if (!lng && Number.isFinite(Number(addressRow?.lng))) setLng(String(addressRow.lng));

    if (typeof sucursalRow?.tipo === "string") {
      setIsSucursalPrincipal(String(sucursalRow.tipo) === "principal");
    }
    if (sucursalRow?.horarios) {
      setHorarios(sucursalRow.horarios);
    }
  }, [
    onboarding,
    apellido,
    calles,
    cantonId,
    categoriaNegocio,
    ciudad,
    email,
    fechaNacimiento,
    genero,
    lat,
    lng,
    nombre,
    nombreNegocio,
    parroquia,
    parroquiaId,
    provinciaId,
    ruc,
    sector,
    telefono,
  ]);

  const shouldAutoValidateRegistration = useMemo(() => {
    if (allowAccess) return false;
    const list = Array.isArray(reasons) ? reasons : [];
    if (list.length !== 1) return false;
    return list[0] === "missing_account_status" || list[0] === "account_status:pending";
  }, [allowAccess, reasons]);

  useEffect(() => {
    if (bootStatus !== "ready") return;
    if (!onboarding?.ok) {
      setStep(AUTH_STEPS.EMAIL_LOGIN);
      return;
    }

    if (allowAccess) {
      const verificationStep = resolveVerificationStep({
        onboarding,
        role: roleFromOnboarding,
      });
      if (verificationStep) {
        setStep(verificationStep);
      }
      return;
    }

    setStep(
      resolveRegistrationStep({
        onboarding,
        role: roleFromOnboarding,
      }),
    );
  }, [allowAccess, bootStatus, onboarding, roleFromOnboarding]);

  useEffect(() => {
    if (!shouldAutoValidateRegistration) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setInfo("Validando registro pendiente...");
      const result = await mobileApi.auth.runValidateRegistration();
      if (cancelled) return;
      await bootstrapAuth();
      if (!result?.ok) {
        setError(result?.error || "No se pudo validar el registro");
      } else if (result?.valid === false) {
        setError(result?.message || "Registro aun incompleto");
      } else {
        setInfo("Registro validado.");
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [bootstrapAuth, shouldAutoValidateRegistration]);

  useEffect(() => {
    let isMounted = true;

    const handleInitialUrl = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (!isMounted || !initialUrl) return;
        await completeOAuthCallback(initialUrl);
      } catch {
        // no-op
      }
    };

    handleInitialUrl();

    const subscription = Linking.addEventListener("url", (event) => {
      if (!event?.url) return;
      void completeOAuthCallback(event.url);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [completeOAuthCallback]);

  const submitLogin = useCallback(async () => {
    setError("");
    setInfo("");
    if (!validateEmail(email)) {
      setError("Correo invalido");
      return false;
    }
    if (!password) {
      setError("Ingresa una contrasena");
      return false;
    }
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setLoading(false);
      setError(signInError.message || "No se pudo iniciar sesion");
      return false;
    }
    await bootstrapAuth();
    setLoading(false);
    return true;
  }, [bootstrapAuth, email, password]);

  const submitRegister = useCallback(async () => {
    setError("");
    setInfo("");
    if (!validateEmail(email)) {
      setError("Correo invalido");
      return false;
    }
    if (password.length < 8) {
      setError("La contrasena debe tener minimo 8 caracteres");
      return false;
    }
    if (!/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setError("La contrasena debe incluir numero y simbolo");
      return false;
    }
    if (password !== passwordConfirm) {
      setError("Las contrasenas no coinciden");
      return false;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    if (signUpError) {
      setLoading(false);
      setError(signUpError.message || "No se pudo crear la cuenta");
      return false;
    }
    await bootstrapAuth();
    setLoading(false);
    return true;
  }, [bootstrapAuth, email, password, passwordConfirm]);

  const startOAuth = useCallback(
    async (
      provider: "google" | "apple" | "facebook" | "discord" | "twitter" = "google",
    ) => {
      setError("");
      setInfo("");
      setLoading(true);
      setStep(AUTH_STEPS.OAUTH_CALLBACK);
      try {
        const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: MOBILE_ENV.AUTH_REDIRECT_URL,
            skipBrowserRedirect: true,
          },
        });
        if (oauthError) {
          setError(oauthError.message || "No se pudo iniciar OAuth.");
          setStep(AUTH_STEPS.WELCOME);
          return false;
        }
        if (!data?.url) {
          setError("No se pudo generar URL de autenticacion OAuth.");
          setStep(AUTH_STEPS.WELCOME);
          return false;
        }
        const canOpen = await Linking.canOpenURL(data.url);
        if (!canOpen) {
          setError("No se pudo abrir el proveedor OAuth en este dispositivo.");
          setStep(AUTH_STEPS.WELCOME);
          return false;
        }
        await Linking.openURL(data.url);
        setInfo("Completando OAuth...");
        return true;
      } catch (err: any) {
        setError(String(err?.message || err || "oauth_start_failed"));
        setStep(AUTH_STEPS.WELCOME);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const submitRoleSelection = useCallback(async (roleValue: string) => {
    setError("");
    setInfo("");
    setLoading(true);

    const { data: { session } = {} } = await supabase.auth.getSession();
    const authUserId = session?.user?.id;
    const authEmail = session?.user?.email || email.trim();
    if (!authUserId || !authEmail) {
      setLoading(false);
      setError("Sesion no valida");
      return false;
    }

    const { data: existing, error: existingErr } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_auth", authUserId)
      .maybeSingle();
    if (existingErr) {
      setLoading(false);
      setError(existingErr.message || "No se pudo leer perfil");
      return false;
    }

    const accountStatus = roleValue === AUTH_ROLES.NEGOCIO ? "pending" : "active";
    if (!existing) {
      const { error: insertErr } = await supabase.from("usuarios").insert({
        id_auth: authUserId,
        email: authEmail,
        role: roleValue,
        account_status: accountStatus,
      });
      if (insertErr) {
        setLoading(false);
        setError(insertErr.message || "No se pudo crear perfil");
        return false;
      }
    } else if (!existing.role) {
      const { error: updateErr } = await supabase
        .from("usuarios")
        .update({ role: roleValue, account_status: accountStatus })
        .eq("id", existing.id);
      if (updateErr) {
        setLoading(false);
        setError(updateErr.message || "No se pudo actualizar perfil");
        return false;
      }
    }

    setSelectedRole(roleValue);
    await bootstrapAuth();
    setLoading(false);
    return true;
  }, [bootstrapAuth, email]);

  const submitOwnerProfile = useCallback(async () => {
    setError("");
    setInfo("");
    const minAge = roleFromOnboarding === AUTH_ROLES.CLIENTE ? 16 : 18;
    const status = getUserProfileStatus({
      nombre,
      apellido,
      genero,
      fechaNacimiento,
      minAge,
    });
    if (!status.nombre.trim()) return setError("Ingresa nombre"), false;
    if (!status.apellido.trim()) return setError("Ingresa apellido"), false;
    if (!status.genero.trim()) return setError("Selecciona genero"), false;
    if (!status.birthStatus.isValid) {
      return setError("Fecha de nacimiento invalida"), false;
    }
    if (status.birthStatus.isUnderage) {
      setError(
        roleFromOnboarding === AUTH_ROLES.NEGOCIO
          ? "Debes ser mayor de edad para administrar un negocio"
          : "Debes tener al menos 16 anos",
      );
      return false;
    }
    const isoBirth = buildBirthdateISO(fechaNacimiento);
    if (!isoBirth) return setError("Fecha de nacimiento invalida"), false;

    const current = await getCurrentUserRow();
    if (!current.ok) {
      setError(current.error || "No se pudo cargar usuario");
      return false;
    }

    setLoading(true);
    const payload = {
      nombre: status.nombre.trim(),
      apellido: status.apellido.trim(),
      genero: status.genero.trim(),
      fecha_nacimiento: isoBirth,
      ...(current.data.role === "cliente" ? { cliente_profile_skipped: false } : {}),
    };
    const { error: updateErr } = await supabase
      .from("usuarios")
      .update(payload)
      .eq("id", current.data.id);
    if (updateErr) {
      setLoading(false);
      setError(updateErr.message || "No se pudo guardar perfil");
      return false;
    }
    await bootstrapAuth();
    setLoading(false);
    return true;
  }, [apellido, bootstrapAuth, fechaNacimiento, genero, nombre, roleFromOnboarding]);

  const submitBusinessData = useCallback(async () => {
    setError("");
    setInfo("");
    if (!nombreNegocio.trim()) return setError("Ingresa nombre del negocio"), false;
    if (!categoriaNegocio.trim()) return setError("Selecciona categoria"), false;

    const current = await getCurrentUserRow();
    if (!current.ok) {
      setError(current.error || "No se pudo cargar perfil");
      return false;
    }
    if (current.data.role !== AUTH_ROLES.NEGOCIO) {
      setError("Solo aplica para cuentas negocio");
      return false;
    }

    setLoading(true);
    const { data: existingNeg, error: negErr } = await supabase
      .from("negocios")
      .select("id")
      .eq("usuarioid", current.data.id)
      .maybeSingle();
    if (negErr) {
      setLoading(false);
      setError(negErr.message || "No se pudo leer negocio");
      return false;
    }

    const payload = {
      usuarioid: current.data.id,
      nombre: nombreNegocio.trim(),
      categoria: categoriaNegocio.trim(),
      ruc: validateRucFromCedula(ruc) ? ruc : null,
    };

    if (existingNeg?.id) {
      const { error: updateErr } = await supabase
        .from("negocios")
        .update(payload)
        .eq("id", existingNeg.id);
      if (updateErr) {
        setLoading(false);
        setError(updateErr.message || "No se pudo actualizar negocio");
        return false;
      }
    } else {
      const { error: insertErr } = await supabase.from("negocios").insert(payload);
      if (insertErr) {
        setLoading(false);
        setError(insertErr.message || "No se pudo crear negocio");
        return false;
      }
    }

    await bootstrapAuth();
    setLoading(false);
    return true;
  }, [bootstrapAuth, categoriaNegocio, nombreNegocio, ruc]);

  const submitAddressData = useCallback(async () => {
    setError("");
    setInfo("");
    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (!calles.trim()) return setError("Ingresa calles"), false;
    if (!sector.trim()) return setError("Ingresa sector"), false;
    if (!provinciaId.trim() || !cantonId.trim()) {
      setError("Ingresa provincia y canton");
      return false;
    }
    if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
      setError("Coordenadas invalidas");
      return false;
    }

    const current = await getCurrentUserRow();
    if (!current.ok) {
      setError(current.error || "No se pudo cargar perfil");
      return false;
    }

    const baseDireccion = {
      owner_id: current.data.id,
      calles: calles.trim(),
      ciudad: ciudad.trim() || null,
      sector: sector.trim(),
      provincia_id: provinciaId.trim(),
      canton_id: cantonId.trim(),
      parroquia_id: parroquiaId.trim() || null,
      parroquia: parroquiaId.trim() ? null : parroquia.trim() || null,
      lat: latNum,
      lng: lngNum,
      is_user_provided: true,
    };

    setLoading(true);
    const { data: existingDir, error: existingDirErr } = await supabase
      .from("direcciones")
      .select("id")
      .eq("owner_id", current.data.id)
      .eq("is_user_provided", true)
      .order("updated_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existingDirErr) {
      setLoading(false);
      setError(existingDirErr.message || "No se pudo leer direccion");
      return false;
    }

    let direccionId = existingDir?.id || null;
    if (direccionId) {
      const { error: updateErr } = await supabase
        .from("direcciones")
        .update(baseDireccion)
        .eq("id", direccionId);
      if (updateErr) {
        setLoading(false);
        setError(updateErr.message || "No se pudo actualizar direccion");
        return false;
      }
    } else {
      const { data: created, error: insertErr } = await supabase
        .from("direcciones")
        .insert(baseDireccion)
        .select("id")
        .maybeSingle();
      if (insertErr || !created?.id) {
        setLoading(false);
        setError(insertErr?.message || "No se pudo crear direccion");
        return false;
      }
      direccionId = created.id;
    }

    if (current.data.role === AUTH_ROLES.CLIENTE) {
      const { error: userErr } = await supabase
        .from("usuarios")
        .update({ cliente_address_skipped: false })
        .eq("id", current.data.id);
      if (userErr) {
        setLoading(false);
        setError(userErr.message || "No se pudo actualizar cliente");
        return false;
      }
      await bootstrapAuth();
      setLoading(false);
      return true;
    }

    const { data: negocio, error: negocioErr } = await supabase
      .from("negocios")
      .select("id")
      .eq("usuarioid", current.data.id)
      .maybeSingle();
    if (negocioErr || !negocio?.id) {
      setLoading(false);
      setError(negocioErr?.message || "No se encontro negocio");
      return false;
    }

    const { data: sucursal, error: sucursalErr } = await supabase
      .from("sucursales")
      .select("id, status")
      .eq("negocioid", negocio.id)
      .order("fechacreacion", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (sucursalErr) {
      setLoading(false);
      setError(sucursalErr.message || "No se pudo leer sucursal");
      return false;
    }

    const sucursalPayload = {
      negocioid: negocio.id,
      direccion_id: direccionId,
      tipo: isSucursalPrincipal ? "principal" : "sucursal",
      horarios: horarios || DEFAULT_HORARIOS,
      status: sucursal?.status || "draft",
    };

    if (sucursal?.id) {
      const { error: updateSucErr } = await supabase
        .from("sucursales")
        .update(sucursalPayload)
        .eq("id", sucursal.id);
      if (updateSucErr) {
        setLoading(false);
        setError(updateSucErr.message || "No se pudo actualizar sucursal");
        return false;
      }
    } else {
      const { error: createSucErr } = await supabase
        .from("sucursales")
        .insert({ ...sucursalPayload, status: "draft" });
      if (createSucErr) {
        setLoading(false);
        setError(createSucErr.message || "No se pudo crear sucursal");
        return false;
      }
    }

    const validation = await mobileApi.auth.runValidateRegistration();
    if (!validation?.ok || validation?.valid === false) {
      setError(validation?.message || validation?.error || "Registro incompleto");
      await bootstrapAuth();
      setLoading(false);
      return false;
    }

    await bootstrapAuth();
    setLoading(false);
    return true;
  }, [
    bootstrapAuth,
    calles,
    cantonId,
    ciudad,
    isSucursalPrincipal,
    horarios,
    lat,
    lng,
    parroquia,
    parroquiaId,
    provinciaId,
    sector,
  ]);

  const markVerificationStatus = useCallback(
    async (status: "in_progress" | "verified" | "skipped") => {
      const current = await getCurrentUserRow();
      if (!current.ok) {
        setError(current.error || "No se pudo cargar usuario");
        return false;
      }
      const { error: updateErr } = await supabase
        .from("usuarios")
        .update({ verification_status: status })
        .eq("id", current.data.id);
      if (updateErr) {
        setError(updateErr.message || "No se pudo actualizar estado");
        return false;
      }
      await bootstrapAuth();
      return true;
    },
    [bootstrapAuth],
  );

  const startVerification = useCallback(async () => {
    setError("");
    setInfo("");
    const ok = await markVerificationStatus("in_progress");
    if (!ok) return false;
    const next = resolveVerificationStep({
      onboarding: useAppStore.getState().onboarding,
      role: useAppStore.getState().role,
    });
    if (next) setStep(next);
    return true;
  }, [markVerificationStatus]);

  const skipVerification = useCallback(async () => {
    setError("");
    setInfo("");
    return markVerificationStatus("skipped");
  }, [markVerificationStatus]);

  const sendVerificationEmail = useCallback(async () => {
    setError("");
    setInfo("");
    const targetEmail =
      onboarding?.usuario?.email ||
      (await getCurrentAuthEmail()) ||
      email.trim();
    if (!targetEmail) {
      setError("No se pudo resolver el correo");
      return false;
    }

    setLoading(true);
    const { error: resendErr } = await supabase.auth.resend({
      type: "signup",
      email: targetEmail,
    });
    if (resendErr) {
      setLoading(false);
      setError(resendErr.message || "No se pudo enviar correo");
      return false;
    }
    setLoading(false);
    setInfo("Correo enviado. Revisa tu bandeja y spam.");
    return true;
  }, [email, onboarding?.usuario?.email]);

  const submitBusinessVerificationData = useCallback(async () => {
    setError("");
    setInfo("");

    const parsedPhone = parsePhoneWithCountry(telefono);
    if (!parsedPhone.digits) {
      setError("Ingresa telefono");
      return false;
    }
    if (!isPhoneValidForCountry(parsedPhone.code, parsedPhone.digits)) {
      setError("Telefono invalido");
      return false;
    }
    const normalizedPhone = toStoragePhone(parsedPhone.code, parsedPhone.digits);
    if (ruc && !validateRucFromCedula(ruc)) {
      setError("RUC invalido");
      return false;
    }

    const current = await getCurrentUserRow();
    if (!current.ok) {
      setError(current.error || "No se pudo cargar usuario");
      return false;
    }
    if (current.data.role !== AUTH_ROLES.NEGOCIO) {
      setError("Solo aplica para negocio");
      return false;
    }

    setLoading(true);
    const { data: negocio, error: negErr } = await supabase
      .from("negocios")
      .select("id, ruc")
      .eq("usuarioid", current.data.id)
      .maybeSingle();
    if (negErr || !negocio?.id) {
      setLoading(false);
      setError(negErr?.message || "No se encontro negocio");
      return false;
    }

    const { error: userErr } = await supabase
      .from("usuarios")
      .update({ telefono: normalizedPhone })
      .eq("id", current.data.id);
    if (userErr) {
      setLoading(false);
      setError(userErr.message || "No se pudo guardar telefono");
      return false;
    }

    const nextRuc = ruc ? ruc : negocio.ruc || null;
    const { error: businessErr } = await supabase
      .from("negocios")
      .update({ ruc: nextRuc })
      .eq("id", negocio.id);
    if (businessErr) {
      setLoading(false);
      setError(businessErr.message || "No se pudo guardar RUC");
      return false;
    }

    await bootstrapAuth();
    setLoading(false);
    return true;
  }, [bootstrapAuth, ruc, telefono]);

  const savePassword = useCallback(
    async (newPassword: string, confirmPassword: string) => {
      setError("");
      setInfo("");
      if (newPassword.length < 8) {
        setError("La contrasena debe tener minimo 8 caracteres");
        return false;
      }
      if (newPassword !== confirmPassword) {
        setError("Las contrasenas no coinciden");
        return false;
      }
      if (!/\d/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
        setError("La contrasena debe incluir numero y simbolo");
        return false;
      }

      setLoading(true);
      const { error: updateErr } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateErr) {
        setLoading(false);
        setError(updateErr.message || "No se pudo guardar contrasena");
        return false;
      }

      const current = await getCurrentUserRow();
      if (current.ok) {
        await supabase
          .from("usuarios")
          .update({ has_password: true })
          .eq("id", current.data.id);
      }

      await bootstrapAuth();
      setLoading(false);
      setInfo("Contrasena guardada correctamente.");
      return true;
    },
    [bootstrapAuth],
  );

  const finalizeVerification = useCallback(async () => {
    setError("");
    setInfo("");
    const latest = await mobileApi.auth.runOnboardingCheck();
    if (!latest?.ok) {
      setError(latest?.error || "No se pudo validar onboarding");
      return false;
    }

    const providers = Array.isArray(latest.providers) ? latest.providers : [];
    const primaryProvider = latest.provider || "email";
    const latestUser = latest.usuario || {};
    const latestHasPassword = Boolean(latestUser.has_password);
    const latestHasMfa = Boolean(
      latestUser.mfa_totp_enabled ||
        latestUser.mfa_method ||
        latestUser.mfa_primary_method ||
        latestUser.mfa_enrolled_at,
    );
    const isOauthPrimary = primaryProvider !== "email";
    const isEmailOnly =
      primaryProvider === "email" &&
      providers.length <= 1 &&
      providers.includes("email");

    if (isEmailOnly && !latest.email_confirmed) {
      setError("Tu correo aun no ha sido confirmado.");
      return false;
    }
    if (isOauthPrimary && !latestHasPassword && !latestHasMfa) {
      setError("Agrega contrasena o MFA para finalizar.");
      return false;
    }

    const ok = await markVerificationStatus("verified");
    if (!ok) return false;
    setInfo("Cuenta verificada.");
    return true;
  }, [markVerificationStatus]);

  const refreshOnboarding = useCallback(async () => {
    setError("");
    setInfo("");
    await bootstrapAuth();
  }, [bootstrapAuth]);

  return {
    step,
    setStep,
    loading,
    error,
    setError,
    info,
    onboarding,
    role: roleFromOnboarding,
    allowAccess,
    reasons,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    selectedRole,
    setSelectedRole,
    nombre,
    setNombre,
    apellido,
    setApellido,
    genero,
    setGenero,
    fechaNacimiento,
    setFechaNacimiento,
    nombreNegocio,
    setNombreNegocio,
    categoriaNegocio,
    setCategoriaNegocio,
    ruc,
    setRuc,
    telefono,
    setTelefono,
    isSucursalPrincipal,
    setIsSucursalPrincipal,
    horarios,
    setHorarios,
    calles,
    setCalles,
    ciudad,
    setCiudad,
    sector,
    setSector,
    provinciaId,
    setProvinciaId,
    cantonId,
    setCantonId,
    parroquiaId,
    setParroquiaId,
    parroquia,
    setParroquia,
    lat,
    setLat,
    lng,
    setLng,
    submitLogin,
    submitRegister,
    startOAuth,
    submitRoleSelection,
    submitOwnerProfile,
    submitBusinessData,
    submitAddressData,
    startVerification,
    skipVerification,
    sendVerificationEmail,
    submitBusinessVerificationData,
    savePassword,
    finalizeVerification,
    refreshOnboarding,
  };
}
