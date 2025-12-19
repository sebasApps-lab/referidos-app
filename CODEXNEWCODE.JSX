import React, { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../store/appStore";
import { supabase } from "../lib/supabaseClient";

export default function NegocioHome() {
  const usuario = useAppStore((s) => s.usuario);
  const onboarding = useAppStore((s) => s.onboarding);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [promos, setPromos] = useState([]);
  const [tab, setTab] = useState("activas");

  useEffect(() => {
    let abort = false;

    const fetchPromos = async () => {
      if (typeof usuario === "undefined") return; // bootstrap no resuelto
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
          setPromos([]);
          setError("No se encontró el negocio asociado a esta cuenta.");
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
            negocioid,
            fechacreacion
          `
          )
          .eq("negocioid", negocioId)
          .order("fechacreacion", { ascending: false });

        if (promoErr) throw promoErr;
        if (abort) return;

        setPromos(
          (data || []).map((p) => ({
            id: p.id,
            titulo: p.titulo,
            descripcion: p.descripcion,
            inicio: p.inicio,
            fin: p.fin,
            imagen: p.imagen,
            estado: p.estado,
            negocioId: p.negocioid,
          }))
        );
        setLoading(false);
      } catch (err) {
        if (abort) return;
        setError(err?.message || "No se pudieron cargar tus promos");
        setLoading(false);
      }
    };

    fetchPromos();
    return () => {
      abort = true;
    };
  }, [usuario, onboarding]);

  const { activas, inactivas, pendientes } = useMemo(() => {
    const activas = [];
    const pendientes = [];
    const inactivas = [];
    promos.forEach((p) => {
      if (p.estado === "activo") activas.push(p);
      else if (p.estado === "pendiente") pendientes.push(p);
      else inactivas.push(p);
    });
    return { activas, inactivas, pendientes };
  }, [promos]);

  const renderEmptyMessage = () => {
    if (tab === "activas" && activas.length === 0) {
      const haCreadoAntes = inactivas.length > 0 || pendientes.length > 0;
      return (
        <p style={{ padding: "12px 0", color: "#666", textAlign: "center" }}>
          {haCreadoAntes
            ? "Publica una promo y no pierdas más clientes."
            : "Añade tu primera promo y empieza a atraer nuevos clientes."}
        </p>
      );
    }
    if (tab === "inactivas" && inactivas.length === 0) {
      return <p style={{ padding: "12px 0", color: "#666", textAlign: "center" }}>Tus promos INACTIVAS se verán aquí.</p>;
    }
    if (tab === "pendientes" && pendientes.length === 0) {
      return <p style={{ padding: "12px 0", color: "#666", textAlign: "center" }}>Tus promos en cola se mostrarán en este espacio.</p>;
    }
    return null;
  };

  const renderPromos = (list) => {
    if (list.length === 0) return renderEmptyMessage();
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {list.map((promo) => (
          <div
            key={promo.id}
            style={{
              background: "#fafafa",
              borderRadius: 14,
              padding: 20,
              border: "1px solid #eee",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{promo.titulo}</div>
            <div style={{ color: "#555", fontSize: 14, marginBottom: 8 }}>{promo.descripcion}</div>
            <div style={{ fontSize: 12, color: "#888" }}>Estado: {promo.estado}</div>
          </div>
        ))}
      </div>
    );
  };

  const currentList =
    tab === "activas" ? activas : tab === "inactivas" ? inactivas : pendientes;

  return (
    <div style={{ padding: "16px 16px 120px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: "#5E30A5",
          }}
        >
          Mis Promos
        </h2>

        <button
          style={{
            background: "#5E30A5",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 8,
            border: "none",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => console.log("Añadir promo")}
        >
          Añadir
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 24,
          borderBottom: "1px solid #ddd",
          paddingBottom: 10,
        }}
      >
        {["activas", "inactivas", "pendientes"].map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                padding: "6px 8px",
                fontSize: 15,
                fontWeight: active ? 700 : 500,
                color: active ? "#5E30A5" : "#666",
                borderBottom: active ? "2px solid #5E30A5" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          );
        })}
      </div>

      {loading && <p style={{ padding: "12px 0", color: "#666", textAlign: "center" }}>Cargando promos...</p>}
      {!loading && error && <p style={{ padding: "12px 0", color: "#c00", textAlign: "center" }}>{error}</p>}
      {!loading && !error && renderPromos(currentList)}
    </div>
  );
}
