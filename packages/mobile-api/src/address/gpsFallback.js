export async function saveGpsFallbackLocation(supabase, { lat, lng }) {
  const latNum = Number(lat);
  const lngNum = Number(lng);
  if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) {
    return { ok: false, error: "invalid_coords" };
  }

  const { data: { session } = {} } = await supabase.auth.getSession();
  if (!session?.user) return { ok: false, error: "no_session" };

  const { data: userRow, error: userErr } = await supabase
    .from("usuarios")
    .select("id")
    .eq("id_auth", session.user.id)
    .maybeSingle();

  if (userErr || !userRow?.id) {
    return { ok: false, error: userErr?.message || "no_user" };
  }

  const { data: existing, error: existingErr } = await supabase
    .from("direcciones")
    .select("id")
    .eq("owner_id", userRow.id)
    .eq("is_user_provided", false)
    .maybeSingle();
  if (existingErr) return { ok: false, error: existingErr.message || "read_failed" };

  const payload = {
    owner_id: userRow.id,
    lat: latNum,
    lng: lngNum,
    is_user_provided: false,
    updated_at: new Date().toISOString(),
  };

  if (existing?.id) {
    const { error } = await supabase.from("direcciones").update(payload).eq("id", existing.id);
    if (error) return { ok: false, error: error.message || "update_failed" };
    return { ok: true, id: existing.id, updated: true };
  }

  const { data: created, error } = await supabase
    .from("direcciones")
    .insert(payload)
    .select("id")
    .maybeSingle();
  if (error || !created?.id) return { ok: false, error: error?.message || "insert_failed" };
  return { ok: true, id: created.id, updated: false };
}

export async function getGpsFallbackLocation(supabase) {
  const { data: { session } = {} } = await supabase.auth.getSession();
  if (!session?.user) return { ok: false, error: "no_session" };

  const { data: userRow, error: userErr } = await supabase
    .from("usuarios")
    .select("id")
    .eq("id_auth", session.user.id)
    .maybeSingle();
  if (userErr || !userRow?.id) return { ok: false, error: userErr?.message || "no_user" };

  const { data, error } = await supabase
    .from("direcciones")
    .select("lat, lng, updated_at")
    .eq("owner_id", userRow.id)
    .eq("is_user_provided", false)
    .maybeSingle();
  if (error) return { ok: false, error: error.message || "read_failed" };
  if (!data?.lat || !data?.lng) return { ok: false, error: "no_location" };

  return {
    ok: true,
    location: {
      lat: Number(data.lat),
      lng: Number(data.lng),
      updated_at: data.updated_at || null,
    },
  };
}
