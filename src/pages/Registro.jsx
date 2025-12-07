// src/pages/Registro.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  EMAIL_RE,
  PHONE_RE,
  CODE_RE,
  validarCedula,
  validateEmail,
  validatePhone,
} from "../utils/validators";

import { useAppStore } from "../store/appStore";

// CONSTANTES
const CODES_KEY = "registration_codes";
const DEFAULT_CODES = ["REF-001532", "REF-003765"];

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

  const createUser = useAppStore((s) => s.createUser);

  // init codes
  useEffect(() => {
    if (!localStorage.getItem(CODES_KEY)) localStorage.setItem(CODES_KEY, JSON.stringify(DEFAULT_CODES));
  }, []);

  // fakeValidateCode reads localStorage codes
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
    const rafId = requestAnimationFrame(() => {
      updateHeight(page);
    });
    return () => cancelAnimationFrame(rafId);
  }, [page, codeValid]);

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

  // Registro cliente directo
  const handleRegisterCliente = async () => {
  const register = useAppStore.getState().register;
  
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
};

  const handlePrimaryPage1 = () => {
    if (!validatePage1()) return;
    if (!codeValid) {
      handleRegisterCliente();
      return;
    }
    goTo(2);
  };

  const handleNext2 = () => {
    if (!nombreDueño) return setError("Ingrese nombres");
    if (!apellidoDueño) return setError("Ingrese apellidos");
    setError("");
    goTo(3);
  };

  const handleRegister = async () => {
  const register = useAppStore.getState().register;
  
  const result = await register({
    email,
    password,
    telefono,
    nombre: nombreDueño,
    role: "negocio",
  });

  if (!result.ok) {
    setError(result.error || "Error al registrar negocio");
    return;
  }

  navigate("/negocio/inicio");
};

  const inputCommon = "w-full box-border border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E30A5]";
  const codigoInputClass = (!codigo && !codeFocused ? "bg-gray-200 text-gray-700 " : "bg-white ") + inputCommon;
  const whatsappHref = "https://wa.me/593995705833?text=" + encodeURIComponent("Hola! Deseo recibir un codigo de registro para registrar mi negocio.");

  const segment = (n) => (
    <div key={n} className="flex-1 mx-1 rounded-full" style={{ height: 4, background: "#FFFFFF", opacity: page === n ? 1 : 0.35, transition: "opacity 200ms" }} />
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#5E30A5] p-6">
      <h1 className="text-white text-3xl font-extrabold mt-12 mb-2 text-center">REFERIDOS APP</h1>

      {codeValid && (
        <div className="w-full max-w-sm px-2 mb-4">
          <div className="flex">{segment(1)}{segment(2)}{segment(3)}</div>
        </div>
      )}

      <div ref={cardRef} className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 overflow-hidden" style={{ height: "auto", boxSizing: "border-box" }}>
        <div className="overflow-hidden" style={{ boxSizing: "border-box" }}>
          <div ref={sliderRef} style={containerStyle} className="flex">
            <section style={{ flex: "0 0 100%", boxSizing: "border-box" }} className="px-2">
              <div className="pb-4" ref={page1Ref}>
                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrarse</h2>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <label className="text-sm text-gray-700">Email</label>
                <input type="email" className={inputCommon} placeholder="Ingrese su email..." value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="text-sm text-gray-700">Contraseña</label>
                <input type="password" className={inputCommon} placeholder="Ingrese su contraseña..." value={password} onChange={(e) => setPassword(e.target.value)} />

                <label className="text-sm text-gray-700">Teléfono</label>
                <input type="tel" className={inputCommon} placeholder="0998888888" value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/[^\d]/g, ""))} />

                <label className="text-sm text-gray-700">Código de registro</label>
                <input type="text" className={codigoInputClass} placeholder="REF-123456 (solo si tienes)" value={codigo} onFocus={() => setCodeFocused(true)} onBlur={() => setCodeFocused(false)} onChange={(e) => setCodigo(e.target.value.toUpperCase())} />

                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-gray-500">Solo necesario para negocio</div>
                  <div className="text-xs text-gray-500">{codeChecking ? "Verificando..." : codeValid ? "Código válido" : ""}</div>
                </div>

                <div className="flex flex-col gap-3">
                  <button onClick={handlePrimaryPage1} className="w-full bg-yellow-400 text-white font-semibold py-2.5 rounded-lg shadow">
                    <span key={btnFadeKey} style={{ display: "inline-block", transition: "opacity 180ms" }}>{btnText}</span>
                  </button>

                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="text-xs text-[#5E30A5] underline self-start">Solicitar código para negocio</a>

                  <div className="text-center mt-3">
                    <Link to="/login" className="text-sm text-gray-700">YA TENGO UNA CUENTA.</Link>
                  </div>
                </div>
              </div>
            </section>

            <section style={{ flex: "0 0 100%", boxSizing: "border-box" }} className="px-2">
              <div className="pb-4" ref={page2Ref}>
                <button onClick={() => goTo(1)} className="text-gray-500 mb-2">←</button>

                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar</h2>
                <p className="text-sm text-gray-600 mb-3">Datos del Propietario</p>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <label className="text-sm text-gray-700">Nombres</label>
                <input className={inputCommon} value={nombreDueño} onChange={(e) => setNombreDueño(e.target.value)} />

                <label className="text-sm text-gray-700">Apellidos</label>
                <input className={inputCommon} value={apellidoDueño} onChange={(e) => setApellidoDueño(e.target.value)} />

                <div className="pt-4">
                  <button onClick={handleNext2} className="w-full bg-[#5E30A5] text-white font-semibold py-2.5 rounded-lg shadow">Siguiente</button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/login" className="text-sm text-gray-700">YA TENGO UNA CUENTA.</Link>
                </div>
              </div>
            </section>

            <section style={{ flex: "0 0 100%", boxSizing: "border-box" }} className="px-2">
              <div className="pb-4" ref={page3Ref}>
                <button onClick={() => goTo(codeValid ? 2 : 1)} className="text-gray-500 mb-2">←</button>

                <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Registrar</h2>
                <p className="text-sm text-gray-600 mb-3">Datos del negocio</p>

                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                <label className="text-sm text-gray-700">RUC</label>
                <input className={inputCommon} value={ruc} onChange={(e) => setRuc(e.target.value.replace(/[^\d]/g, ""))} maxLength={13} />

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
                  <button onClick={handleRegister} className="w-full bg-[#10B981] text-white font-semibold py-2.5 rounded-lg shadow">Registrar</button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/login" className="text-sm text-gray-700">YA TENGO UNA CUENTA.</Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-white opacity-70">ALPHA v0.0.1</div>
    </div>
  );
}
