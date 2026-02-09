import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthFlowScreen from "@features/auth/AuthFlowScreen";
import { useAppStore } from "@shared/store/appStore";
import { AdminTabs, ClienteTabs, NegocioTabs, SoporteTabs } from "./RoleTabs";
import { ROOT_ROUTES } from "./routeKeys";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const role = useAppStore((state) => state.role);
  const allowAccess = useAppStore((state) => state.allowAccess);
  const requiresVerificationFlow = useAppStore(
    (state) => state.requiresVerificationFlow,
  );

  const startRoute = useMemo(() => {
    if (!allowAccess || requiresVerificationFlow) return ROOT_ROUTES.AUTH;
    if (role === "cliente") return ROOT_ROUTES.CLIENTE;
    if (role === "negocio") return ROOT_ROUTES.NEGOCIO;
    if (role === "admin") return ROOT_ROUTES.ADMIN;
    if (role === "soporte") return ROOT_ROUTES.SOPORTE;
    return ROOT_ROUTES.AUTH;
  }, [allowAccess, requiresVerificationFlow, role]);

  return (
    <Stack.Navigator
      key={startRoute}
      initialRouteName={startRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthFlowScreen} />
      <Stack.Screen name={ROOT_ROUTES.CLIENTE} component={ClienteTabs} />
      <Stack.Screen name={ROOT_ROUTES.NEGOCIO} component={NegocioTabs} />
      <Stack.Screen name={ROOT_ROUTES.ADMIN} component={AdminTabs} />
      <Stack.Screen name={ROOT_ROUTES.SOPORTE} component={SoporteTabs} />
    </Stack.Navigator>
  );
}
