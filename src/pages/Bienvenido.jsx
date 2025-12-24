// src/pages/Bienvenido.jsx
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { signInWithGoogleIdToken } from "../services/authService";
import { requestGoogleCredential } from "../utils/googleOneTap";

const OAUTH_LOGIN_PENDING = "oauth_login_pending"; //Borrar si ya no se le asigna una función
const GOOGLE_ONE_TAP_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_ONE_TAP_CLIENT_ID ||
  import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Bienvenido() {
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const usuario = useAppStore((state) => state.usuario);
  const bootstrap = useAppStore((state) => state.bootstrap);
  const onboarding = useAppStore((state) => state.onboarding);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSessionRedirect = useCallback(() => {
    if (bootstrap || typeof usuario === "undefined") return false;

    if (usuario && onboarding?.allowAccess) {
      navigate("/app", { replace: true });
      return true;
    }

    if (onboarding && onboarding.allowAccess === false) {
      navigate("/auth", { replace: true, state: { openChoice: true } });
      return true;
    }

    return false;
  }, [bootstrap, navigate, usuario, onboarding]);

  const startGoogle = async () => {
    setError("");
    setLoading(true);
    if (!GOOGLE_ONE_TAP_CLIENT_ID) {
      setError("Falta configurar Google Client ID");
      setLoading(false);
      return;
    }

    try {
      const result = await requestGoogleCredential({
        clientId: GOOGLE_ONE_TAP_CLIENT_ID,
      });

      if (!result || result.type === "dismissed") return;

      localStorage.setItem(OAUTH_LOGIN_PENDING, JSON.stringify({ ts: Date.now() }));
      await signInWithGoogleIdToken({ token: result.credential });

      //Tras login con Google, correr bootstrap/onboarding y dejar que la UI reaccione
      await bootstrapAuth({ force: true });
      handleSessionRedirect();
    } catch (err) {
      setError(err?.message || "No se pudo iniciar con Google");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      handleSessionRedirect();
  }, [bootstrap, handleSessionRedirect]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh safe-area bg-[#5E30A5] p-6 pb-28">
      <h1 className="text-white text-3xl font-extrabold mb-6">REFERIDOS APP</h1>

      <div className="relative w-full max-w-sm">
        <div className="bg-white w-full rounded-2xl shadow-xl p-6">
          {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

          <div className="space-y-4">
            <h2 className="text-center text-xl font-bold text-[#5E30A5] mb-1">
              Elige como continuar...
            </h2>
            <p className="text-center text-sm text-gray-500 mb-4">
              Si ya tienes cuenta, elige una opción y entrarás automaticamente.
            </p>

            <button
              onClick={() => {
                setError("");
                navigate("/auth");
              }}
              className="w-full bg-[#FFC21C] text-white font-semibold py-3 rounded-lg shadow active:scale-[0.98]"
            >
              <div className="flex items-center justify-center gap-2">
                <MailIcon />
                <span>Continuar con correo</span>
              </div>
            </button>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(270deg, rgba(173, 173, 173, 0.9) 0%, rgba(209,213,219,0.75) 95%, rgba(194, 194, 194, 0.2) 100%)" }}
              />
              <span className="font-semibold">O</span>
              <span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(90deg, rgba(173, 173, 173, 0.9) 0%, rgba(209,213,219,0.75) 95%, rgba(194, 194, 194, 0.2) 100%)" }}
              />
            </div>

            <button
              onClick={startGoogle}
              disabled={loading}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg shadow flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              <GoogleIcon />
              {loading ? "Iniciando..." : "Continuar con Google"}
            </button>

            <button
              onClick={() => {}}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg shadow flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <FacebookIcon />
              Continuar con Facebook
            </button>

            <div className="text-center pt-2 text-sm text-gray-500">
              Si eres nuevo, te ayudaremos a{" "}
              <Link to="/auth" className="text-sm text-[#5E30A5] font-bold">
                crear tu cuenta.
              </Link>              
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-white opacity-70">
        ALPHA v0.0.1
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

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="21"
      viewBox="0 0 24 24"
      width="21"
    >
      <path
        fill="#1877F2"
        d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.4V9.62c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22V22c4.78-.8 8.44-4.94 8.44-9.93z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      width="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l7.82 6.165a2 2 0 002.36 0L22 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
