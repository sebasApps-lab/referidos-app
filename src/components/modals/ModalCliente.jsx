// src/components/ModalCliente.jsx

import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ModalCliente({ onClose }) {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const ok = login(email, password);
    if (!ok) setError("Credenciales incorrectas");
    else onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
        <h2 className="text-xl font-bold mb-4 text-[#5E30A5]">Solo clientes</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#5E30A5]"
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="flex flex-col gap-2">
          <button onClick={handleLogin} className="bg-[#5E30A5] text-white w-full py-2 rounded-lg">Entrar</button>
          <a
            href={`https://wa.me/0995705833?text=${encodeURIComponent("Hola! Deseo recibir el formulario de Registro de Negocio")}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#5E30A5] underline"
          >
            Registrarme como negocio
          </a>
          <button onClick={onClose} className="text-gray-500 text-sm">Cancelar</button>
        </div>

        <div className="absolute bottom-2 right-2 text-xs opacity-60">ALPHA v0.0.1</div>
      </div>
    </div>
  );
}
