// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";

import { TEMP_USERS } from "../constants/tempUsers";
import { validateEmail } from "../utils/validators";

export default function Login() {
  const loginLocal = useAppStore((state) => state.loginLocal);
  const setUser = useAppStore((state) => state.setUser);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fake serverless login real o temporal
  const fakeServerlessLogin = async (email, password) => {
    // 1) usuarios temporales
    const tempUser = TEMP_USERS.find((u) => u.email === email && u.password === password);
    if (tempUser) return { ok: true, user: tempUser };

    // 2) loginLocal (supabase-backed via appStore)
    const result = await loginLocal(email, password);
    return result;
  };

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

    const result = await fakeServerlessLogin(email, password);

    if (!result || !result.ok) {
      setError(result?.error || "Usuario o contraseña incorrectos");
      return;
    }

    setUser(result.user);

    if (result.user.role === "admin") {
      navigate("/admin/inicio");
    } else if (result.user.role === "negocio") {
      navigate("/negocio/inicio");
    } else {
      navigate("/cliente/inicio");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#5E30A5] p-6">
      <h1 className="text-white text-3xl font-extrabold mb-8">REFERIDOS APP</h1>

      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
        <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">Inicio de Sesión</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <label className="text-sm text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Ingrese su email..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-4 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm text-gray-700">Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese su contraseña..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-6 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="w-full bg-[#FFC21C] text-white font-semibold py-2.5 rounded-lg shadow active:scale-[0.98]">
          INGRESAR
        </button>

        <Link to="/recuperar" className="block text-center text-sm text-gray-200 mt-6 mb-3 underline">
          OLVIDASTE TU CONTRASEÑA?
        </Link>

        <Link to="/registro" className="block text-center text-sm text-[#5E30A5] font-medium underline">
          REGISTRARSE
        </Link>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-white opacity-70">ALPHA v0.0.1</div>
    </div>
  );
}
