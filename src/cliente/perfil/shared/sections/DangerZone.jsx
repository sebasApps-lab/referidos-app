import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, LogOut, Power, Trash2 } from "lucide-react";
import { useModal } from "../../../../modals/useModal";
import { deleteUserAccount } from "../../../../services/authService";
import { useAppStore } from "../../../../store/appStore";
import { supabase } from "../../../../lib/supabaseClient";

export default function DangerZone({ usuario, setUser }) {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const logout = useAppStore((s) => s.logout);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const confirmDelete = () => {
    setDeleteError("");

    if (!usuario?.id_auth) {
      setDeleteError("No se pudo identificar la cuenta.");
      return;
    }

    openModal("EliminarCuenta", {
      deleting,
      onConfirm: async () => {
        if (deleting) return;

        setDeleting(true);
        const res = await deleteUserAccount(usuario.id_auth);
        setDeleting(false);

        closeModal();

        if (!res.ok) {
          setDeleteError(res.error || "No se pudo eliminar la cuenta");
          return;
        }

        setUser(null);

        try {
          localStorage.removeItem("referidos_app_user");
        } catch {}

        try {
          const sbKey = supabase.auth.storageKey;
          localStorage.removeItem(sbKey);
          localStorage.removeItem(`${sbKey}-code-verifier`);
        } catch {}

        window.location.replace("/");
      },
      onCancel: () => {
        setDeleting(false);
      },
    });
  };

  return (
    <section className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm space-y-5">
      <div className="flex items-center gap-2 text-red-600">
        <AlertTriangle size={18} />
        <h3 className="text-sm font-semibold">Zona peligrosa</h3>
      </div>

      <div className="rounded-2xl border border-red-200 bg-white/80 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-black/70">Cerrar sesion</p>
          <p className="text-[11px] text-black/50">
            Finaliza la sesion actual en este dispositivo.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
        >
          <LogOut size={14} />
          Salir
        </button>
      </div>

      <div className="rounded-2xl border border-red-200 bg-white/80 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-black/70">Desactivar cuenta</p>
          <p className="text-[11px] text-black/50">
            Oculta temporalmente tu perfil. Puedes reactivarlo luego.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-500"
        >
          <Power size={14} />
          Desactivar
        </button>
      </div>

      <div className="rounded-2xl border border-red-300 bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-black/70">Eliminar cuenta</p>
            <p className="text-[11px] text-black/50">
              Esta accion es irreversible. Se borraran tus datos.
            </p>
          </div>
          <button
            type="button"
            onClick={confirmDelete}
            className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-3 py-2 text-xs font-semibold text-white"
          >
            <Trash2 size={14} />
            Eliminar
          </button>
        </div>
        {deleteError && (
          <div className="text-[11px] text-red-600">{deleteError}</div>
        )}
        <button
          type="button"
          onClick={() => navigate("/cliente/inicio")}
          className="text-[11px] text-black/50 underline text-left"
        >
          Volver al inicio
        </button>
      </div>
    </section>
  );
}
