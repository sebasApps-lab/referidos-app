// src/pages/OAuth.jsx
// Pantalla temporal para probar OAuth (Google) sin tocar Login.jsx.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithOAuth, getSessionUserProfile } from "../services/authService";
import { useAppStore } from "../store/appStore";

export default function OAuth() {
  const navigate = useNavigate();
  const setUser = useAppStore((s) => s.setUser);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si ya hay sesión, redirige según rol.
    (async () => {
      const user = await getSessionUserProfile();
      if (!user) return;
      setUser(user);
      if (user.role === "admin") navigate("/admin/inicio", { replace: true });
      else if (user.role === "negocio") navigate("/negocio/inicio", { replace: true });
      else navigate("/cliente/inicio", { replace: true });
    })();
  }, [navigate, setUser]);

  const redirectTo =
    (typeof window !== "undefined" && `${window.location.origin}/oauth`) ||
    import.meta.env.VITE_AUTH_REDIRECT_URL;

  const startOAuth = async (role = "cliente") => {
    setError("");
    setLoading(true);
    try {
      await signInWithOAuth("google", {
        redirectTo,
        data: { role },
      });
      // signInWithOAuth redirige; no hay más que hacer aquí.
    } catch (err) {
      setError(err?.message || "No se pudo iniciar el flujo con Google");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#5E30A5] p-6">
      <h1 className="text-white text-3xl font-extrabold mb-8">REFERIDOS APP</h1>

      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
        <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-6">
          OAuth (Google) - PRUEBA
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-3">
          <button
            onClick={() => startOAuth("cliente")}
            disabled={loading}
            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg shadow flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <GoogleIcon />
            {loading ? "Iniciando..." : "Continuar con Google (cliente)"}
          </button>

          <button
            onClick={() => startOAuth("negocio")}
            disabled={loading}
            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg shadow flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <GoogleIcon />
            {loading ? "Iniciando..." : "Registrar negocio con Google"}
          </button>
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-[#5E30A5] font-medium underline">
            Volver a Login
          </Link>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-white opacity-70">
        ALPHA v0.0.1 - OAuth test
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2087 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9082c1.7018-1.5677 2.6836-3.8745 2.6836-6.6149z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.4673-.8059 5.9563-2.1818l-2.9082-2.2581c-.8059.54-1.834.8609-3.0481.8609-2.3455 0-4.3309-1.5841-5.0386-3.7105H.957v2.3318C2.4382 15.9836 5.4818 18 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.9614 10.7105c-.18-.54-.2823-1.1172-.2823-1.7105 0-.5936.1023-1.1709.2823-1.7109V4.957H.957C.3473 6.1718 0 7.5473 0 9c0 1.4527.3473 2.8282.957 4.0436l3.0044-2.3331z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5795c1.3214 0 2.5086.4541 3.4418 1.3459l2.5814-2.5818C13.4673.8577 11.43 0 9 0 5.4818 0 2.4382 2.0168.957 4.9568l3.0044 2.3318C4.6691 5.1636 6.6545 3.5795 9 3.5795z"
        fill="#EA4335"
      />
    </svg>
  );
}
