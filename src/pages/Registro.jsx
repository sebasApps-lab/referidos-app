// src/pages/Registro.jsx
// Versión corregida definitiva: flujo cliente/negocio + cálculo altura intacto

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// CONSTANTES
const STORAGE_KEY = "referidos_demo_v0";
const CODES_KEY = "registration_codes";
const DEFAULT_CODES = ["REF-001532", "REF-003765"];
const EMAIL_RE = /\S+@\S+\.\S+/;
const PHONE_RE = /^09\d{8}$/;
const CODE_RE = /^REF-\d{6}$/;

// validar cédula (Ecuador)
function validarCedula(cedula) {
  if (!/^\d{10}$/.test(cedula)) return false;
  const provincia = parseInt(cedula.slice(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;
  const dig = cedula.split("").map((d) => parseInt(d, 10));
  const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let prod = dig[i] * coef[i];
    if (prod >= 10) prod -= 9;
    suma += prod;
  }
  const verificador = (10 - (suma % 10)) % 10;
  return verificador === dig[9];
}

// storage helpers
function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// fake validate code
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

// fake register
async function fakeRegisterUser(user) {
  await new Promise((r) => setTimeout(r, 350));
  let db = getData();
  if (!db) {
    db = {
      soporteNumero: "0995705833",
      usuarios: [],
      negocios: [],
      qrValidos: [],
      admin: {
        id: 999,
        nombre: "Admin",
        email: "alejoguamialama@gmail.com",
        password: "admin",
        role: "admin",
      },
    };
  }

  const exists =
    (db.usuarios || []).some((u) => u.email === user.email) ||
    (db.negocios || []).some((n) => n.email === user.email) ||
    db.admin?.email === user.email;

  if (exists) return { ok: false, error: "Email ya registrado" };

  const newUser = { id: (db.usuarios || []).length + 1, ...user };
  db.usuarios = [...(db.usuarios || []), newUser];
  saveData(db);

  return { ok: true, user: newUser };
}

// ===============================================
// COMPONENTE
// ===============================================
export default function Registro() {
  const navigate = useNavigate();

  // refs
  const cardRef = useRef(null);
  const sliderRef = useRef(null);
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);

  // page1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codeValid, setCodeValid] = useState(false);
  const [codeChecking, setCodeChecking] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  // page2
  const [nombreDueño, setNombreDueño] = useState("");
  const [apellidoDueño, setApellidoDueño] = useState("");

  // page3
  const [ruc, setRuc] = useState("");
  const [nombreNegocio, setNombreNegocio] = useState("");
  const [sectorNegocio, setSectorNegocio] = useState("");
  const [calle1, setCalle1] = useState("");
  const [calle2, setCalle2] = useState("");

  // ui
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [animating, setAnimating] = useState(false);
  const [btnText, setBtnText] = useState("Registrarse");
  const [btnFadeKey, setBtnFadeKey] = useState(0);

  // init codes
  useEffect(() => {
    if (!localStorage.getItem(CODES_KEY))
      localStorage.setItem(CODES_KEY, JSON.stringify(DEFAULT_CODES));
  }, []);

  // Validación en vivo del código
  useEffect(() => {
    let mounted = true;

    if (!codigo) {
      setCodeValid(false);
      setBtnFadeKey((k) => k + 1);
      setBtnText("Registrarse");
      return;
    }

    if (!CODE_RE.test(codigo)) {
      setCodeValid(false);
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

    return () => (mounted = false);
  }, [codigo]);

  // slider style
  const containerStyle = useMemo(
    () => ({
      display: "flex",
      transform: `translateX(${-(page - 1) * 100}%)`,
      transition: animating
        ? "transform 350ms ease, filter 350ms ease, opacity 350ms ease"
        : "transform 350ms ease",
      filter: animating ? "blur(1.2px)" : "none",
      opacity: animating ? 0.55 : 1,
      width: "100%",
      boxSizing: "border-box",
    }),
    [page, animating]
  );

  // altura correcta usando scrollHeight
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

  // altura inicial
  useEffect(() => {
    const id = requestAnimationFrame(() => updateHeight(1));
    return () => cancelAnimationFrame(id);
  }, []);

  // recálculo cuando cambie page o cambie contenido dinámico
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      updateHeight(page);
    });
    return () => cancelAnimationFrame(rafId);
  }, [page, codeValid]);

  // navegación
  const goTo = (p) => {
    setAnimating(true);
    setPage(p);
    setTimeout(() => setAnimating(false), 360);
  };

  // validación página 1
  const validatePage1 = () => {
    if (!EMAIL_RE.test(email)) return setError("Email inválido"), false;
    if (!password || password.length < 6)
      return setError("Contraseña mínimo 6 caracteres"), false;
    if (!PHONE_RE.test(telefono)) return setError("Teléfono inválido"), false;
    if (codigo && !codeValid) return setError("Código inválido"), false;

    setError("");
    return true;
  };

  // REGISTRO CLIENTE DIRECTO
  const handleRegisterCliente = async () => {
    const payload = {
      email,
      password,
      telefono,
      nombre: email.split("@")[0],
      apellido: "",
      cedula: "",
      ruc: "",
      role: "cliente",
      negocio: null,
    };

    const res = await fakeRegisterUser(payload);
    if (!res.ok) {
      setError(res.error || "Error al registrar cliente");
      return;
    }

    // CORRECCIÓN: enviar al home REAL del cliente
    navigate("/cliente/home");
  };

  // Página 1 → siguiente
  const handlePrimaryPage1 = () => {
    if (!validatePage1()) return;

    if (!codeValid) {
      handleRegisterCliente();
      return;
    }

    goTo(2);
  };

  // Página 2
  const handleNext2 = () => {
    if (!nombreDueño) return setError("Ingrese nombres");
    if (!apellidoDueño) return setError("Ingrese apellidos");
    setError("");
    goTo(3);
  };

  // Registro negocio (página 3)
  const handleRegister = async () => {
    setError("");

    if (!codeValid) {
      setError("Error interno: esta página es solo para negocio.");
      return;
    }

    if (!/^\d{13}$/.test(ruc)) return setError("RUC inválido");
    const ced = ruc.slice(0, 10);
    if (!validarCedula(ced)) return setError("RUC incorrecto (cédula inválida)");

    const payload = {
      email,
      password,
      telefono,
      nombre: nombreDueño,
      apellido: apellidoDueño,
      cedula: ced,
      ruc,
      role: "negocio",
      negocio: {
        nombre: nombreNegocio,
        sector: sectorNegocio,
        calle1,
        calle2,
        codigo,
      },
    };

    const res = await fakeRegisterUser(payload);
    if (!res.ok) {
      setError(res.error || "Error al registrar negocio");
      return;
    }

    // CORRECCIÓN: enviar al home REAL del negocio
    navigate("/negocio/home");
  };

  // inputs css
  const inputCommon =
    "w-full box-border border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E30A5]";
  const codigoInputClass =
    (!codigo && !codeFocused ? "bg-gray-200 text-gray-700 " : "bg-white ") +
    inputCommon;
  const whatsappHref =
    "https://wa.me/593995705833?text=" +
    encodeURIComponent(
      "Hola! Deseo recibir un codigo de registro para registrar mi negocio."
    );

  const segment = (n) => (
    <div
      key={n}
      className="flex-1 mx-1 rounded-full"
      style={{
        height: 4,
        background: "#FFFFFF",
        opacity: page === n ? 1 : 0.35,
        transition: "opacity 200ms",
      }}
    />
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#5E30A5] p-6">
      <h1 className="text-white text-3xl font-extrabold mt-12 mb-2 text-center">
        REFERIDOS APP
      </h1>

      {codeValid && (
        <div className="w-full max-w-sm px-2 mb-4">
          <div className="flex">
            {segment(1)}
            {segment(2)}
            {segment(3)}
          </div>
        </div>
      )}

      {/* tarjeta blanca */}
      <div
        ref={cardRef}
        className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 overflow-hidden"
        style={{ height: "auto", boxSizing: "border-box" }}
      >
        <div className="overflow-hidden" style={{ boxSizing: "border-box" }}>
          <div ref={sliderRef} style={containerStyle} className="flex">
            {/* PAGE 1 */}
            <section
              style={{ flex: "0 0 100%", boxSizing: "border-box" }}
              className="px-2"
            >
              <div className="pb-4" ref={page1Ref}>
                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">
                  Registrarse
                </h2>

                {error && (
                  <div className="text-red-500 text-sm mb-2">{error}</div>
                )}

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
                  onChange={(e) =>
                    setTelefono(e.target.value.replace(/[^\d]/g, ""))
                  }
                />

                <label className="text-sm text-gray-700">
                  Código de registro
                </label>
                <input
                  type="text"
                  className={codigoInputClass}
                  placeholder="REF-123456 (solo si tienes)"
                  value={codigo}
                  onFocus={() => setCodeFocused(true)}
                  onBlur={() => setCodeFocused(false)}
                  onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                />

                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-gray-500">
                    Solo necesario para negocio
                  </div>
                  <div className="text-xs text-gray-500">
                    {codeChecking
                      ? "Verificando..."
                      : codeValid
                      ? "Código válido"
                      : ""}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handlePrimaryPage1}
                    className="w-full bg-yellow-400 text-white font-semibold py-2.5 rounded-lg shadow"
                  >
                    <span
                      key={btnFadeKey}
                      style={{
                        display: "inline-block",
                        transition: "opacity 180ms",
                      }}
                    >
                      {btnText}
                    </span>
                  </button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#5E30A5] underline self-start"
                  >
                    Solicitar código para negocio
                  </a>

                  <div className="text-center mt-3">
                    <Link to="/login" className="text-sm text-gray-700">
                      YA TENGO UNA CUENTA.
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* PAGE 2 */}
            <section
              style={{ flex: "0 0 100%", boxSizing: "border-box" }}
              className="px-2"
            >
              <div className="pb-4" ref={page2Ref}>
                <button onClick={() => goTo(1)} className="text-gray-500 mb-2">
                  ←
                </button>

                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">
                  Registrar
                </h2>
                <p className="text-sm text-gray-600 mb-3">Datos del Propietario</p>

                {error && (
                  <div className="text-red-500 text-sm mb-2">{error}</div>
                )}

                <label className="text-sm text-gray-700">Nombres</label>
                <input
                  className={inputCommon}
                  value={nombreDueño}
                  onChange={(e) => setNombreDueño(e.target.value)}
                />

                <label className="text-sm text-gray-700">Apellidos</label>
                <input
                  className={inputCommon}
                  value={apellidoDueño}
                  onChange={(e) => setApellidoDueño(e.target.value)}
                />

                <div className="pt-4">
                  <button
                    onClick={handleNext2}
                    className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow"
                  >
                    Siguiente
                  </button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/login" className="text-sm text-gray-700">
                    YA TENGO UNA CUENTA.
                  </Link>
                </div>
              </div>
            </section>

            {/* PAGE 3 */}
            <section
              style={{ flex: "0 0 100%", boxSizing: "border-box" }}
              className="px-2"
            >
              <div className="pb-4" ref={page3Ref}>
                <button
                  onClick={() => goTo(codeValid ? 2 : 1)}
                  className="text-gray-500 mb-2"
                >
                  ←
                </button>

                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">
                  Registrar
                </h2>
                <p className="text-sm text-gray-600 mb-3">Datos del negocio</p>

                {error && (
                  <div className="text-red-500 text-sm mb-2">{error}</div>
                )}

                <label className="text-sm text-gray-700">RUC</label>
                <input
                  className={inputCommon}
                  value={ruc}
                  onChange={(e) =>
                    setRuc(e.target.value.replace(/[^\d]/g, ""))
                  }
                  maxLength={13}
                />

                {codeValid && (
                  <>
                    <label className="text-sm text-gray-700">
                      Nombre negocio
                    </label>
                    <input
                      className={inputCommon}
                      value={nombreNegocio}
                      onChange={(e) => setNombreNegocio(e.target.value)}
                    />

                    <label className="text-sm text-gray-700">
                      Sector negocio
                    </label>
                    <input
                      className={inputCommon}
                      value={sectorNegocio}
                      onChange={(e) => setSectorNegocio(e.target.value)}
                    />

                    <label className="text-sm text-gray-700">Calle 1</label>
                    <input
                      className={inputCommon}
                      value={calle1}
                      onChange={(e) => setCalle1(e.target.value)}
                    />

                    <label className="text-sm text-gray-700">
                      Calle 2 (opcional)
                    </label>
                    <input
                      className={inputCommon}
                      value={calle2}
                      onChange={(e) => setCalle2(e.target.value)}
                    />
                  </>
                )}

                <div className="pt-4">
                  <button
                    onClick={handleRegister}
                    className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow"
                  >
                    Registrar
                  </button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/login" className="text-sm text-gray-700">
                    YA TENGO UNA CUENTA.
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-white opacity-70">
        ALPHA v0.0.1
      </div>
    </div>
  );
}
