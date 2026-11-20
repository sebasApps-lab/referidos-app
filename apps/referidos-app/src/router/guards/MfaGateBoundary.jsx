import { useLocation } from "react-router-dom";
import useMfaGate from "../../hooks/useMfaGate";
import { useAppStore } from "../../store/appStore";

const PUBLIC_PATHS = new Set(["/inicio", "/privacy", "/terms", "/delete-data"]);

export default function MfaGateBoundary({ children }) {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const enabled = !PUBLIC_PATHS.has(pathname) && !pathname.startsWith("/legal/");
  const logout = useAppStore((s) => s.logout);
  const { blockAccess, error, refresh } = useMfaGate({ enabled });

  if (!blockAccess) return children;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#5E30A5] p-6 text-center text-white">
      {error ? (
        <div className="max-w-sm" role="alert">
          <h1 className="text-lg font-semibold">No se pudo verificar tu sesión</h1>
          <p className="mt-2 text-sm">{error}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={refresh} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#5E30A5]">
              Reintentar
            </button>
            <button type="button" onClick={logout} className="rounded-lg border border-white px-4 py-2 text-sm font-semibold">
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : <p role="status">Verificando seguridad...</p>}
    </div>
  );
}
