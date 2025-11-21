// src/context/AppContext.jsx

import React, { createContext, useEffect, useState } from "react";
import { initialData } from "../data/simulatedData";
import { v4 as uuidv4 } from "uuid";

export const AppContext = createContext();

const STORAGE_KEY = "referidos_demo_v0";

export function AppProvider({ children }) {
  // Cargar de localStorage o inicial
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : initialData;
    } catch {
      return initialData;
    }
  });

  const [usuario, setUsuario] = useState(null);

  // ✅ Asegurar que los arrays existan
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      qrValidos: prev.qrValidos || [],
      qrGenerados: prev.qrGenerados || [],
    }));
  }, []);

  // Persistir cambios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error guardando localStorage", e);
    }
  }, [data]);

  // Login: busca en usuarios, negocios o admin
  const login = (email, password) => {
    const u = data.usuarios.find(
      (x) => x.email === email && x.password === password
    );
    if (u) {
      setUsuario(u);
      return true;
    }

    const n = data.negocios.find(
      (x) => x.email === email && x.password === password
    );
    if (n) {
      setUsuario(n);
      return true;
    }

    if (data.admin.email === email && data.admin.password === password) {
      setUsuario({ ...data.admin });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUsuario(null);
  };

  // Editar número de soporte (admin)
  const setSoporteNumero = (nuevo) => {
    setData((prev) => ({ ...prev, soporteNumero: nuevo }));
  };

  // Reset demo
  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(initialData);
    setUsuario(null);
  };

  // Generar QRAlpha por usuario y promo (simulado)
  // qrAlpha: { id, userId, promoId, codigo }
  const generarQRAlpha = (userId, promoId) => {
    const id = uuidv4();
    const qrAlpha = {
      id,
      userId,
      promoId,
      codigo: `QRA-${id.slice(0, 8)}`,
    };

    setData((prev) => {
      const qrGenerados = prev.qrGenerados
        ? [...prev.qrGenerados, qrAlpha]
        : [qrAlpha];
      return { ...prev, qrGenerados };
    });

    return qrAlpha;
  };

  // Forzar creación de QR válido entre dos usuarios (para demo)
  // qrValido: { id, promoId, fromUserId, toUserId, creadoAt, expiresAt, usado }
  const forzarCrearQRValido = (fromUserId, toUserId, promoId) => {
    const creadoAt = Date.now();
    const expiresAt = creadoAt + 90 * 60 * 1000; // 90 minutos
    const qr = {
      id: uuidv4(),
      promoId,
      fromUserId,
      toUserId,
      creadoAt,
      expiresAt,
      usado: false,
    };
    setData((prev) => ({
      ...prev,
      qrValidos: [...prev.qrValidos, qr],
    }));
    return qr;
  };

  // Marcar QR como usado
  const marcarQRUsado = (qrId) => {
    setData((prev) => ({
      ...prev,
      qrValidos: prev.qrValidos.map((q) =>
        q.id === qrId ? { ...q, usado: true } : q
      ),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        usuario,
        setUsuario,
        login,
        logout,
        setSoporteNumero,
        resetDemo,
        generarQRAlpha,
        forzarCrearQRValido,
        marcarQRUsado,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
