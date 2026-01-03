import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppStore } from "../../store/appStore";
import { supabase } from "../../lib/supabaseClient";
import LoaderOverlay from "../../components/ui/LoaderOverlay";
import { useNegocioHeader } from "../layout/NegocioHeaderContext";
import InicioHero from "./InicioHero";
import InicioPromos from "./InicioPromos";
import InicioBeneficios from "./InicioBeneficios";
import InicioEmptyState from "./InicioEmptyState";
import InicioSkeleton from "./InicioSkeleton";
import { MOCK_PROMOS } from "./InicioPromosPreview";

export default function NegocioInicio() {
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);
  const { setHeaderOptions, headerEntering } = useNegocioHeader();

  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchPromos = async () => {
      if (typeof usuario === "undefined") return;
      if (!usuario || usuario.role !== "negocio") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const negocioId =
          onboarding?.negocio?.id ||
          (await (async () => {
            const { data, error: negErr } = await supabase
              .from("negocios")
              .select("id")
              .eq("usuarioid", usuario.id)
              .maybeSingle();
            if (negErr) throw negErr;
            return data?.id || null;
          })());

        if (!negocioId) {
          if (!active) return;
          setPromos([]);
          setError("No se encontro el negocio asociado a esta cuenta.");
          setLoading(false);
          return;
        }

        const { data, error: promoErr } = await supabase
          .from("promos")
          .select(
            `
            id,
            titulo,
            descripcion,
            inicio,
            fin,
            imagen,
            estado,
            fechacreacion
          `
          )
          .eq("negocioid", negocioId)
          .order("fechacreacion", { ascending: false });

        if (promoErr) throw promoErr;
        if (!active) return;

        setPromos(
          (data || []).map((promo) => ({
            id: promo.id,
            titulo: promo.titulo,
            descripcion: promo.descripcion,
            inicio: promo.inicio,
            fin: promo.fin,
            imagen: promo.imagen,
            estado: promo.estado,
            fechacreacion: promo.fechacreacion,
          }))
        );
        setLoading(false);
      } catch (err) {
        if (!active) return;
        setError(err?.message || "No se pudieron cargar tus promos.");
        setLoading(false);
      }
    };

    fetchPromos();

    return () => {
      active = false;
    };
  }, [onboarding, reloadKey, usuario]);

  const usePromosPreview = true;
  const hasRealPromos = promos.length > 0;
  const showPreview = usePromosPreview && !hasRealPromos;
  const displayPromos = useMemo(() => {
    if (showPreview) return MOCK_PROMOS;
    return promos;
  }, [promos, showPreview]);

  const displayStats = useMemo(() => {
    const next = { activas: 0, pendientes: 0, inactivas: 0 };
    displayPromos.forEach((promo) => {
      if (promo.estado === "activo") next.activas += 1;
      else if (promo.estado === "pendiente") next.pendientes += 1;
      else next.inactivas += 1;
    });
    return next;
  }, [displayPromos]);

  const showSkeleton = loading && promos.length === 0;
  const headerVisible = !showSkeleton;

  useLayoutEffect(() => {
    setHeaderOptions({
      mode: "default",
      onSearchBack: null,
      headerVisible,
    });
    return () => {
      setHeaderOptions({ mode: "default", onSearchBack: null, headerVisible: true });
    };
  }, [headerVisible, setHeaderOptions]);

  if (showSkeleton) {
    return (
      <LoaderOverlay>
        <InicioSkeleton />
      </LoaderOverlay>
    );
  }

  const showEmptyState = !hasRealPromos && !showPreview;

  return (
    <div className="pb-16">
      <div className={headerEntering ? "cliente-merge-enter" : ""}>
        <InicioHero
          usuario={usuario}
          negocio={onboarding?.negocio}
          stats={displayStats}
        />
      </div>

      {error ? (
        <InicioEmptyState
          variant="error"
          onRetry={() => setReloadKey((prev) => prev + 1)}
        />
      ) : showEmptyState ? (
        <InicioEmptyState variant="promos" />
      ) : (
        <InicioPromos promos={displayPromos} stats={displayStats} />
      )}

      {!error && <InicioBeneficios negocio={onboarding?.negocio} usuario={usuario} />}
    </div>
  );
}
