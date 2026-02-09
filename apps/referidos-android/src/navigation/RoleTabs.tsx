import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Tab = createBottomTabNavigator();

export function ClienteTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={TAB_ROUTES.CLIENTE.INICIO} component={ClienteInicioScreen} />
      <Tab.Screen name={TAB_ROUTES.CLIENTE.ESCANER} component={ClienteEscanerScreen} />
      <Tab.Screen name={TAB_ROUTES.CLIENTE.HISTORIAL} component={ClienteHistorialScreen} />
      <Tab.Screen name={TAB_ROUTES.CLIENTE.PERFIL} component={ClientePerfilScreen} />
    </Tab.Navigator>
  );
}

export function NegocioTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={TAB_ROUTES.NEGOCIO.INICIO} component={NegocioInicioScreen} />
      <Tab.Screen name={TAB_ROUTES.NEGOCIO.ESCANER} component={NegocioEscanerScreen} />
      <Tab.Screen name={TAB_ROUTES.NEGOCIO.GESTIONAR} component={NegocioGestionarScreen} />
      <Tab.Screen name={TAB_ROUTES.NEGOCIO.PERFIL} component={NegocioPerfilScreen} />
    </Tab.Navigator>
  );
}

export function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={TAB_ROUTES.ADMIN.INICIO} component={AdminInicioScreen} />
      <Tab.Screen name={TAB_ROUTES.ADMIN.USUARIOS} component={AdminUsuariosScreen} />
      <Tab.Screen name={TAB_ROUTES.ADMIN.SOPORTE} component={AdminSoporteScreen} />
      <Tab.Screen
        name={TAB_ROUTES.ADMIN.OBSERVABILIDAD}
        component={AdminObservabilidadScreen}
      />
      <Tab.Screen name={TAB_ROUTES.ADMIN.PERFIL} component={AdminPerfilScreen} />
    </Tab.Navigator>
  );
}

export function SoporteTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={TAB_ROUTES.SOPORTE.INBOX} component={SoporteInboxScreen} />
      <Tab.Screen name={TAB_ROUTES.SOPORTE.TICKET} component={SoporteTicketScreen} />
      <Tab.Screen name={TAB_ROUTES.SOPORTE.IRREGULAR} component={SoporteIrregularScreen} />
      <Tab.Screen name={TAB_ROUTES.SOPORTE.PERFIL} component={SoportePerfilScreen} />
    </Tab.Navigator>
  );
}
