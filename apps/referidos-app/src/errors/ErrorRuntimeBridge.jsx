import { useEffect } from "react";
import { executeErrorPolicy } from "../services/errorPolicyService";
import { subscribeErrorEvents } from "../services/loggingClient";

export default function ErrorRuntimeBridge() {
  useEffect(() => {
    const unsubscribe = subscribeErrorEvents((event) => {
      void executeErrorPolicy(event);
    });
    return () => unsubscribe?.();
  }, []);

  return null;
}

