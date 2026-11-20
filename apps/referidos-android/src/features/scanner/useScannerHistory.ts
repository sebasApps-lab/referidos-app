import { useCallback, useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { supabase } from "@shared/services/mobileApi";
import { useAppStore } from "@shared/store/appStore";
import { fetchBusinessByUserId, fetchCurrentUserRow, fetchQrHistoryByBusinessId, fetchQrHistoryByClientId } from "@shared/services/entityQueries";

export default function useScannerHistory(isBusiness = false) {
  const focused = useIsFocused();
  const profileId = useAppStore((state) => state.onboarding?.usuario?.id);
  const request = useRef(0);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const id = ++request.current;
    setLoading(true);
    setError("");
    try {
      const userId = profileId || (await fetchCurrentUserRow(supabase)).data?.id;
      if (!userId) throw new Error("missing_user");
      const ownerId = isBusiness ? (await fetchBusinessByUserId(supabase, userId)).data?.id : userId;
      if (!ownerId) throw new Error("missing_owner");
      const fetchHistory = isBusiness ? fetchQrHistoryByBusinessId : fetchQrHistoryByClientId;
      const history = await fetchHistory(supabase, ownerId, 8);
      if (!history.ok) throw new Error("history_query_failed");
      if (id === request.current) setRows(history.data);
    } catch {
      if (id === request.current) setError("No pudimos cargar los códigos recientes.");
    } finally {
      if (id === request.current) setLoading(false);
    }
  }, [isBusiness, profileId]);

  useEffect(() => {
    setRows([]);
  }, [profileId]);

  useEffect(() => {
    if (!focused) return;
    void refresh();
    return () => { request.current += 1; };
  }, [focused, refresh]);

  return { rows, loading, error, onRefresh: refresh };
}
