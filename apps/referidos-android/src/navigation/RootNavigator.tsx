import React, { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthFlowScreen from "@features/auth/AuthFlowScreen";
import { useAppStore } from "@shared/store/appStore";
import { AdminTabs, ClienteTabs, NegocioTabs, SoporteTabs } from "./RoleTabs";
import { ROOT_ROUTES, STACK_ROUTES } from "./routeKeys";
import AdminNegociosScreen from "@features/admin/AdminNegociosScreen";
import AdminPromosScreen from "@features/admin/AdminPromosScreen";
import AdminQRsScreen from "@features/admin/AdminQRsScreen";
import AdminReportesScreen from "@features/admin/AdminReportesScreen";
import AdminLogsScreen from "@features/admin/AdminLogsScreen";
import AdminDatosScreen from "@features/admin/AdminDatosScreen";
import AdminAppsScreen from "@features/admin/AdminAppsScreen";
import AdminSistemaScreen from "@features/admin/AdminSistemaScreen";
import AdminAnalyticsScreen from "@features/admin/AdminAnalyticsScreen";
import AdminIssuesScreen from "@features/admin/AdminIssuesScreen";
import AdminIssueEventsScreen from "@features/admin/AdminIssueEventsScreen";
import AdminIssueEventDetailScreen from "@features/admin/AdminIssueEventDetailScreen";
import AdminErrorCatalogScreen from "@features/admin/AdminErrorCatalogScreen";
import AdminVersioningScreen from "@features/admin/AdminVersioningScreen";
import AdminDocumentationScreen from "@features/admin/AdminDocumentationScreen";
import AdminLegalScreen from "@features/admin/AdminLegalScreen";
import AdminSupportTicketsPanelScreen from "@features/admin/AdminSupportTicketsPanelScreen";
import AdminSupportCatalogScreen from "@features/admin/AdminSupportCatalogScreen";
import AdminSupportTicketScreen from "@features/admin/AdminSupportTicketScreen";
import AdminSupportAgentsScreen from "@features/admin/AdminSupportAgentsScreen";
import SoporteJornadasScreen from "@features/support/SoporteJornadasScreen";
import SoporteIssuesScreen from "@features/support/SoporteIssuesScreen";
import SoporteErrorCatalogScreen from "@features/support/SoporteErrorCatalogScreen";
import SoporteTicketScreen from "@features/support/SoporteTicketScreen";

const Stack = createNativeStackNavigator();
const RoleStack = createNativeStackNavigator();

function AdminStackNavigator() {
  return (
    <RoleStack.Navigator initialRouteName={STACK_ROUTES.ADMIN.TABS} screenOptions={{ headerShown: false }}>
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.TABS} component={AdminTabs} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.NEGOCIOS} component={AdminNegociosScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.PROMOS} component={AdminPromosScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.QRS} component={AdminQRsScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.REPORTES} component={AdminReportesScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.LOGS} component={AdminLogsScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.DATOS} component={AdminDatosScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.APPS} component={AdminAppsScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.SISTEMA} component={AdminSistemaScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.ANALYTICS} component={AdminAnalyticsScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.ISSUES} component={AdminIssuesScreen} />
      <RoleStack.Screen
        name={STACK_ROUTES.ADMIN.ISSUE_EVENTS}
        component={AdminIssueEventsScreen}
      />
      <RoleStack.Screen
        name={STACK_ROUTES.ADMIN.ISSUE_EVENT_DETAILS}
        component={AdminIssueEventDetailScreen}
      />
      <RoleStack.Screen
        name={STACK_ROUTES.ADMIN.ERROR_CODES}
        component={AdminErrorCatalogScreen}
      />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.VERSIONING} component={AdminVersioningScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.DOCUMENTATION} component={AdminDocumentationScreen} />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.LEGAL} component={AdminLegalScreen} />
      <RoleStack.Screen
        name={STACK_ROUTES.ADMIN.SUPPORT_TICKETS_PANEL}
        component={AdminSupportTicketsPanelScreen}
      />
      <RoleStack.Screen name={STACK_ROUTES.ADMIN.SUPPORT_CATALOG} component={AdminSupportCatalogScreen} />
      <RoleStack.Screen
        name={STACK_ROUTES.ADMIN.SUPPORT_TICKET}
        component={AdminSupportTicketScreen}
      />
      <RoleStack.Screen
        name={STACK_ROUTES.ADMIN.SUPPORT_AGENTS}
        component={AdminSupportAgentsScreen}
      />
    </RoleStack.Navigator>
  );
}

function SoporteStackNavigator() {
  return (
    <RoleStack.Navigator initialRouteName={STACK_ROUTES.SOPORTE.TABS} screenOptions={{ headerShown: false }}>
      <RoleStack.Screen name={STACK_ROUTES.SOPORTE.TABS} component={SoporteTabs} />
      <RoleStack.Screen name={STACK_ROUTES.SOPORTE.JORNADAS} component={SoporteJornadasScreen} />
      <RoleStack.Screen name={STACK_ROUTES.SOPORTE.ISSUES} component={SoporteIssuesScreen} />
      <RoleStack.Screen
        name={STACK_ROUTES.SOPORTE.ERROR_CATALOG}
        component={SoporteErrorCatalogScreen}
      />
      <RoleStack.Screen name={STACK_ROUTES.SOPORTE.TICKET} component={SoporteTicketScreen} />
    </RoleStack.Navigator>
  );
}

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
      {!allowAccess || requiresVerificationFlow ? (
        <Stack.Screen name={ROOT_ROUTES.AUTH} component={AuthFlowScreen} />
      ) : null}
      {allowAccess && !requiresVerificationFlow && role === "cliente" ? (
        <Stack.Screen name={ROOT_ROUTES.CLIENTE} component={ClienteTabs} />
      ) : null}
      {allowAccess && !requiresVerificationFlow && role === "negocio" ? (
        <Stack.Screen name={ROOT_ROUTES.NEGOCIO} component={NegocioTabs} />
      ) : null}
      {allowAccess && !requiresVerificationFlow && role === "admin" ? (
        <Stack.Screen name={ROOT_ROUTES.ADMIN} component={AdminStackNavigator} />
      ) : null}
      {allowAccess && !requiresVerificationFlow && role === "soporte" ? (
        <Stack.Screen name={ROOT_ROUTES.SOPORTE} component={SoporteStackNavigator} />
      ) : null}
    </Stack.Navigator>
  );
}
