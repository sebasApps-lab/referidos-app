import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useSupportDeskStore } from "@shared/store/supportDeskStore";
import SoporteTicketScreen from "@features/support/SoporteTicketScreen";

export default function AdminSupportTicketScreen() {
  const route = useRoute<any>();
  const setSelectedThreadPublicId = useSupportDeskStore((state) => state.setSelectedThreadPublicId);

  useEffect(() => {
    const threadPublicId = String(route?.params?.threadPublicId || "").trim();
    if (threadPublicId) {
      setSelectedThreadPublicId(threadPublicId);
    }
  }, [route?.params?.threadPublicId, setSelectedThreadPublicId]);

  return <SoporteTicketScreen />;
}
