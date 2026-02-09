import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "@navigation/RootNavigator";
import GlobalLoader from "@shared/ui/GlobalLoader";
import { useAppStore } from "@shared/store/appStore";
import ModalHost from "@shared/modals/ModalHost";

export default function App() {
  const bootStatus = useAppStore((state) => state.bootStatus);
  const bootError = useAppStore((state) => state.bootError);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  if (bootStatus === "idle" || bootStatus === "loading") {
    return <GlobalLoader label="Inicializando Referidos Android..." />;
  }

  if (bootStatus === "error") {
    return <GlobalLoader label={`Error de bootstrap: ${bootError || "desconocido"}`} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
        <ModalHost />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
