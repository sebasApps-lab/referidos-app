// src/hooks/useBootstrapAuth.js
import { useEffect } from "react";
import { useAppStore } from "../store/appStore";

/**
 * Dispara el bootstrap de sesión + onboarding una sola vez al montar.
 * Devuelve estado actual para que el caller pueda saber si estamos cargando.
 */

export function useBootstrapAuth() {
    const bootstrap = useAppStore((s) => s.bootstrap);
    const usuario = useAppStore((s) => s.usuario);
    const error = useAppStore((s) => s.error);
    const bootstrapAuth = useAppStore((s) => s.bootstrapAuth);

    useEffect(() => {
        //Solo dispara si estamos en modo bootstrap inicial (true).
        if (bootstrap) {
            bootstrapAuth();
        }
    }, [bootstrap, bootstrapAuth]);

    return { bootstrap, usuario, error };
}

export default useBootstrapAuth;