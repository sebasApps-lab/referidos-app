import React, { useMemo } from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { TAB_ROUTES } from "./routeKeys";
import ClienteInicioScreen from "@features/cliente/ClienteInicioScreen";
import ClienteEscanerScreen from "@features/cliente/ClienteEscanerScreen";
import ClienteHistorialScreen from "@features/cliente/ClienteHistorialScreen";
import ClientePerfilScreen from "@features/profile/ClientePerfilScreen";
import NegocioInicioScreen from "@features/negocio/NegocioInicioScreen";
import NegocioEscanerScreen from "@features/negocio/NegocioEscanerScreen";
import NegocioGestionarScreen from "@features/negocio/NegocioGestionarScreen";
import NegocioPerfilScreen from "@features/profile/NegocioPerfilScreen";
import AdminInicioScreen from "@features/admin/AdminInicioScreen";
import AdminUsuariosScreen from "@features/admin/AdminUsuariosScreen";
import AdminSoporteScreen from "@features/admin/AdminSoporteScreen";
import AdminObservabilidadScreen from "@features/admin/AdminObservabilidadScreen";
import AdminPerfilScreen from "@features/profile/AdminPerfilScreen";
import SoporteInboxScreen from "@features/support/SoporteInboxScreen";
import SoporteTicketScreen from "@features/support/SoporteTicketScreen";
import SoporteIrregularScreen from "@features/support/SoporteIrregularScreen";
import SoportePerfilScreen from "@features/profile/SoportePerfilScreen";
import { ShellRoleKey, useShellStore } from "@shared/store/shellStore";

const Tab = createBottomTabNavigator();

type TabScreenDef = {
  name: string;
  label: string;
  component: React.ComponentType<any>;
};

type RoleTabConfig = {
  role: ShellRoleKey;
  fallbackRoute: string;
  screens: TabScreenDef[];
};

const COMMON_TAB_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
  lazy: false,
  freezeOnBlur: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    height: 62,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingTop: 6,
    paddingBottom: 6,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: "700",
  },
  sceneStyle: {
    backgroundColor: "#F7F8FC",
  },
};

function RoleTabNavigator({ role, fallbackRoute, screens }: RoleTabConfig) {
  const cacheEpoch = useShellStore((state) => state.cacheEpoch);
  const activeRoute = useShellStore((state) => state.activeTabs[role]);
  const setActiveTab = useShellStore((state) => state.setActiveTab);

  const initialRouteName = useMemo(
    () => activeRoute || fallbackRoute,
    [activeRoute, fallbackRoute],
  );

  return (
    <Tab.Navigator
      key={`${role}-${cacheEpoch}`}
      initialRouteName={initialRouteName}
      detachInactiveScreens={false}
      backBehavior="history"
      screenOptions={COMMON_TAB_OPTIONS}
      screenListeners={{
        state: (event) => {
          const state = event.data.state;
          const current = state?.routes?.[state.index ?? 0];
          if (current?.name) {
            setActiveTab(role, current.name);
          }
        },
      }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ tabBarLabel: screen.label }}
        />
      ))}
    </Tab.Navigator>
  );
}

export function ClienteTabs() {
  return (
    <RoleTabNavigator
      role="cliente"
      fallbackRoute={TAB_ROUTES.CLIENTE.INICIO}
      screens={[
        { name: TAB_ROUTES.CLIENTE.INICIO, label: "Inicio", component: ClienteInicioScreen },
        { name: TAB_ROUTES.CLIENTE.ESCANER, label: "Escaner", component: ClienteEscanerScreen },
        {
          name: TAB_ROUTES.CLIENTE.HISTORIAL,
          label: "Historial",
          component: ClienteHistorialScreen,
        },
        { name: TAB_ROUTES.CLIENTE.PERFIL, label: "Perfil", component: ClientePerfilScreen },
      ]}
    />
  );
}

export function NegocioTabs() {
  return (
    <RoleTabNavigator
      role="negocio"
      fallbackRoute={TAB_ROUTES.NEGOCIO.INICIO}
      screens={[
        { name: TAB_ROUTES.NEGOCIO.INICIO, label: "Inicio", component: NegocioInicioScreen },
        { name: TAB_ROUTES.NEGOCIO.ESCANER, label: "Escaner", component: NegocioEscanerScreen },
        {
          name: TAB_ROUTES.NEGOCIO.GESTIONAR,
          label: "Gestionar",
          component: NegocioGestionarScreen,
        },
        { name: TAB_ROUTES.NEGOCIO.PERFIL, label: "Perfil", component: NegocioPerfilScreen },
      ]}
    />
  );
}

export function AdminTabs() {
  return (
    <RoleTabNavigator
      role="admin"
      fallbackRoute={TAB_ROUTES.ADMIN.INICIO}
      screens={[
        { name: TAB_ROUTES.ADMIN.INICIO, label: "Inicio", component: AdminInicioScreen },
        { name: TAB_ROUTES.ADMIN.USUARIOS, label: "Usuarios", component: AdminUsuariosScreen },
        { name: TAB_ROUTES.ADMIN.SOPORTE, label: "Soporte", component: AdminSoporteScreen },
        {
          name: TAB_ROUTES.ADMIN.OBSERVABILIDAD,
          label: "Observab.",
          component: AdminObservabilidadScreen,
        },
        { name: TAB_ROUTES.ADMIN.PERFIL, label: "Perfil", component: AdminPerfilScreen },
      ]}
    />
  );
}

export function SoporteTabs() {
  return (
    <RoleTabNavigator
      role="soporte"
      fallbackRoute={TAB_ROUTES.SOPORTE.INBOX}
      screens={[
        { name: TAB_ROUTES.SOPORTE.INBOX, label: "Inbox", component: SoporteInboxScreen },
        { name: TAB_ROUTES.SOPORTE.TICKET, label: "Ticket", component: SoporteTicketScreen },
        {
          name: TAB_ROUTES.SOPORTE.IRREGULAR,
          label: "Irregular",
          component: SoporteIrregularScreen,
        },
        { name: TAB_ROUTES.SOPORTE.PERFIL, label: "Perfil", component: SoportePerfilScreen },
      ]}
    />
  );
}
