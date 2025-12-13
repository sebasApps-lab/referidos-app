// src/pages/SplashChoice.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "../modals/useModal";
import { useAppStore } from "../store/appStore";
import { supabase } from "../lib/supabaseClient";
import { supabase as supabaseClient } from "../lib/supabaseClient";

const cards = [
  {
    key: "cliente",
    title: "Cliente",
    desc: "Gana y canjea promociones escaneando códigos.",
  },
  {
    key: "negocio",
    title: "Negocio",
    desc: "Administra promos y canjes para tus sucursales.",
  },
];

export default function SplashChoice() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();
  const { openModal } = useModal();
  const location = useLocation();
  const setUser = useAppStore((s) => s.setUser);
  const register = useAppStore((s) => s.register);

  const fromOAuth = location.state?.fromOAuth || false;
  const regStatus = location.state?.regStatus || null;
  const fromAuthHub = location.state?.fromAuthHub || false;
  const authCreds = location.state?.authCreds || null;

  const REG_STATUS_PREFIX = "reg_status_";
  const setRegStatus = (userId, status) => {
    if (!userId) return;
    try {
      localStorage.setItem(`${REG_STATUS_PREFIX}${userId}`, status);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const goNext = () => {
    if (!selected) return;

    if (selected === "cliente") {
      if (fromOAuth) {
        setError("");
        (async () => {
          const session = (await supabase?.auth?.getSession())?.data?.session;
          const userId = session?.user?.id;
          if (!userId) {
            setError("No hay sesión activa");
            return;
          }
          setRegStatus(userId, null);
          const { error, data } = await supabaseClient.functions.invoke("onboarding", {
            body: { role: "cliente" },
          });
          if (error || !data?.ok) {
            setError(data?.message || error?.message || "No se pudo completar el onboarding");
            return;
          }
          setUser(data.usuario);
          navigate("/cliente/inicio", { replace: true });
        })().catch((e) => setError(e?.message || "No se pudo crear el perfil"));
        return;
      }
      if (fromAuthHub && authCreds?.email && authCreds?.password && authCreds?.telefono) {
        setError("");
        setActionLoading(true);
        (async () => {
          const result = await register({
            email: authCreds.email,
            password: authCreds.password,
            telefono: authCreds.telefono,
            nombre: authCreds.email.split("@")[0],
            role: "cliente",
          });
          setActionLoading(false);
          if (!result.ok) {
            setError(result.error || "No se pudo crear la cuenta");
            return;
          }
          setUser(result.user);
          navigate("/cliente/inicio", { replace: true });
        })().catch((e) => {
          setActionLoading(false);
          setError(e?.message || "No se pudo crear la cuenta");
        });
        return;
      }
      navigate("/auth", { state: { role: "cliente" } });
      return;
    }

    openModal("CodigoNegocio", {
      onConfirm: (code) => {
        if (fromOAuth) {
          setError("");
          (async () => {
            const session = (await supabase?.auth?.getSession())?.data?.session;
            const userId = session?.user?.id;
            if (!userId) {
              setError("No hay sesión activa");
              return;
            }
            setRegStatus(userId, "negocio_page2");
            setError("");
            setRegStatus(userId, "negocio_page2");
            // No marcamos completo; se completará en Registro (page2/page3)
            setUser({ id_auth: userId, role: "negocio" });
            navigate("/auth", { state: { role: "negocio", codigo: code, fromOAuth: true, page: 2 } });
          })().catch((e) => setError(e?.message || "No se pudo iniciar el registro de negocio"));
          return;
        }
        if (fromAuthHub && authCreds?.email && authCreds?.password && authCreds?.telefono) {
          navigate("/auth", { state: { role: "negocio", codigo: code, page: 2, authCreds, fromChoice: true } });
          return;
        }
        navigate("/auth", { state: { role: "negocio", codigo: code } });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5E30A5] text-white p-6">
      <div
        className={`w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="p-8 space-y-6">
          {error && <div className="text-center text-sm text-red-300">{error}</div>}
          <div className="space-y-1 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">Tipo de cuenta</p>
            <h1 className="text-2xl font-semibold text-white">¿Cómo quieres continuar?</h1>
            <p className="text-sm text-white/60">Elige tu rol para entrar con la experiencia adecuada.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card, idx) => {
              const isActive = selected === card.key;
              return (
                <button
                  key={card.key}
                  onClick={() => setSelected(card.key)}
                  className={`text-left rounded-2xl border transition-all duration-300 p-5 h-full ${
                    isActive
                      ? "border-[#FFC21C]/80 bg-white/10 shadow-lg shadow-[#ffc21c1f]"
                      : "border-white/10 bg-white/0 hover:bg-white/5"
                  }`}
                  style={{
                    animation: mounted ? `fadeIn 0.35s ease ${idx * 0.05}s both` : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{card.title}</h2>
                      <p className="text-sm text-white/60 mt-1">{card.desc}</p>
                    </div>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border ${
                        isActive ? "bg-[#FFC21C] border-[#FFC21C]" : "border-white/40"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={goNext}
              disabled={!selected || actionLoading}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                selected && !actionLoading
                  ? "bg-[#FFC21C] text-[#0F172A] shadow-lg shadow-[#ffc21c33] active:scale-[0.99]"
                  : "bg-white/10 text-white/60 cursor-not-allowed"
              }`}
            >
              {actionLoading ? "Procesando..." : "Siguiente"}
            </button>
          </div>

          <div className="text-center text-xs text-white/50">
            Pantalla de bienvenida temporal. Selecciona tu rol y continúa a Login.
          </div>
        </div>
      </div>
    </div>
  );
}
