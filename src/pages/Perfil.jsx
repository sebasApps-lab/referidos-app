// src/pages/Perfil.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { deleteUserAccount } from "../services/authService";
import { useModal } from "../modals/useModal";
import { supabase } from "../lib/supabaseClient";

export default function Perfil() {
  const usuario = useAppStore((s) => s.usuario);
  const setUser = useAppStore((s) => s.setUser);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const isSocialAccount = usuario?.provider && usuario.provider !== "email";

  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || ""
  });
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = () => {
    setUser({ ...usuario, ...form });
    alert("Datos guardados");
  };

  const confirmDelete = () => {
    setDeleteError("");

    if (!usuario?.id_auth) {
      setDeleteError("No se pudo identificar la cuenta.");
      return;
    }

    openModal("EliminarCuenta", {
      deleting,
      onConfirm: async () => {
        //Bloqueo real contra múltiples clicks
        if (deleting) return;

        setDeleting(true);
        const res = await deleteUserAccount(usuario.id_auth);
        setDeleting(false);

        //El modal se debe cerrar siempre al recibir respuesta
        closeModal();

        if (!res.ok) {
          //Error se muestra en Perfil, no en el modal
          setDeleteError(res.error || "No se pudo eliminar la cuenta");
          return;
        }
        
        //Éxito = limpia store + persist + sesión supabase
        setUser(null);

        try {
          //Limpia persist zustand
          localStorage.removeItem("referidos_app_user");
        } catch {}

        //IMPORTANTÍSIMO: limpiar storage de Supabase Auth
        try {
          const sbKey = supabase.auth.storageKey; //ej: "sb-<projectref>-auth-token"
          localStorage.removeItem(sbKey);
          localStorage.removeItem(`${sbKey}-code-verifier`);
        } catch {}

        //Navegación limpia (con reload para vaciar memoria/in-memory session)
        window.location.replace("/");
      },
      onCancel: () => {
        setDeleting(false);
      },
    });
  };

  return (
    <div style={{ padding: 20, paddingBottom: 120 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
        Mi perfil
      </h1>

      <label style={{ fontWeight: 600 }}>Nombre</label>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #CCC"
        }}
      />

      <label style={{ fontWeight: 600 }}>Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        disabled={isSocialAccount}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #CCC",
          backgroundColor: isSocialAccount ? "f3f4f6" : "white",
        }}
      />
      {isSocialAccount && (
        <div style={{ fontSize: 12, color: "6b7280", marginBotton: 16 }}>
          Esta cuenta se creó usando Google, gestiona tu email desde Google.
        </div>
      )}

      <label style={{ fontWeight: 600 }}>Teléfono</label>
      <input
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 16,
          borderRadius: 8,
          border: "1px solid #CCC"
        }}
      />

      <button
        onClick={guardar}
        style={{
          width: "100%",
          padding: 12,
          background: "#5E30A5",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 600,
          marginTop: 10
        }}
      >
        Guardar cambios
      </button>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button
          onClick={confirmDelete}
          style={{
            background: "none",
            border: "none",
            color: "#DC2626",
            fontWeight: 700,
            textDecoration: "none",
            cursor: "pointer",
            padding: "8px 12px",
          }}
        >
          Eliminar cuenta
        </button>
        {deleteError && (
          <div style={{ marginTop: 10, color: "#DC2626", fontSize: 13 }}>
            {deleteError}
          </div>
        )}
      </div>
    </div>
  );
}
