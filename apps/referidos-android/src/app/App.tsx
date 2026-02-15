import React, { useCallback, useEffect } from "react";
import {
  AppState,
  Appearance,
  Dimensions,
  I18nManager,
  NativeModules,
  Platform,
} from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "@navigation/RootNavigator";
import GlobalLoader from "@shared/ui/GlobalLoader";
import { useAppStore } from "@shared/store/appStore";
import ModalHost from "@shared/modals/ModalHost";
import { MOBILE_ENV } from "@shared/constants/env";
import { observability } from "@shared/services/mobileApi";

function readNetworkSummary() {
  const navigatorRef = (globalThis as any)?.navigator || {};
  const connection =
    navigatorRef.connection ||
    navigatorRef.mozConnection ||
    navigatorRef.webkitConnection ||
    {};

  return {
    online: typeof navigatorRef.onLine === "boolean" ? navigatorRef.onLine : null,
    effective_type:
      typeof connection.effectiveType === "string" ? connection.effectiveType : null,
    downlink: typeof connection.downlink === "number" ? connection.downlink : null,
  };
}

function readDeviceSummary(appStateOverride?: string | null) {
  const dims = Dimensions.get("window");
  const platformConstants = (NativeModules as any)?.PlatformConstants || {};
  const locales = Array.isArray(platformConstants.locales) ? platformConstants.locales : [];
  const firstLocale = locales.length > 0 ? locales[0] : null;
  const locale =
    typeof firstLocale === "string"
      ? firstLocale
      : firstLocale?.languageTag || firstLocale?.identifier || null;

  return {
    platform: Platform.OS,
    os_version: String(Platform.Version || ""),
    model: String(
      platformConstants.Model || platformConstants.model || platformConstants.Brand || "",
    ),
    locale: locale || null,
    appearance: Appearance.getColorScheme() || "unknown",
    is_rtl: Boolean(I18nManager.isRTL),
    window: `${Math.round(dims.width)}x${Math.round(dims.height)}`,
    app_state: appStateOverride || AppState.currentState || "unknown",
  };
}

function toErrorPayload(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name || "Error",
      message: error.message || "unknown_error",
      stack: error.stack || "",
    };
  }
  return {
    name: "UnknownError",
    message: String(error || "unknown_error"),
    stack: "",
  };
}

function installGlobalErrorTracking() {
  const globalAny = globalThis as any;
  const errorUtils = globalAny?.ErrorUtils;
  const previousHandler =
    typeof errorUtils?.getGlobalHandler === "function"
      ? errorUtils.getGlobalHandler()
      : null;

  if (typeof errorUtils?.setGlobalHandler === "function") {
    errorUtils.setGlobalHandler((error: unknown, isFatal?: boolean) => {
      void observability.track({
        level: isFatal ? "fatal" : "error",
        category: "error",
        message: "global_js_error",
        error: toErrorPayload(error),
        context: { is_fatal: Boolean(isFatal) },
      });
      if (typeof previousHandler === "function") {
        previousHandler(error, isFatal);
      }
    });
  }

  const previousUnhandled = globalAny?.onunhandledrejection;
  const unhandledHandler = (event: any) => {
    const reason = event?.reason ?? event;
    void observability.track({
      level: "error",
      category: "error",
      message: "unhandled_promise_rejection",
      error: toErrorPayload(reason),
    });
    if (typeof previousUnhandled === "function") {
      return previousUnhandled(event);
    }
    return false;
  };
  globalAny.onunhandledrejection = unhandledHandler;

  return () => {
    if (typeof errorUtils?.setGlobalHandler === "function" && previousHandler) {
      errorUtils.setGlobalHandler(previousHandler);
    }
    if (globalAny?.onunhandledrejection === unhandledHandler) {
      globalAny.onunhandledrejection = previousUnhandled;
    }
  };
}

export default function App() {
  const bootStatus = useAppStore((state) => state.bootStatus);
  const bootError = useAppStore((state) => state.bootError);
  const role = useAppStore((state) => state.role);
  const onboarding = useAppStore((state) => state.onboarding);
  const bootstrapAuth = useAppStore((state) => state.bootstrapAuth);
  const navigationRef = useNavigationContainerRef();

  const syncRouteContext = useCallback(() => {
    const route = navigationRef.getCurrentRoute();
    const routeName = route?.name || "unknown";
    observability.setContext({
      route: routeName,
      screen: routeName,
      flow: routeName,
    });
  }, [navigationRef]);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  useEffect(() => {
    observability.setContext({
      app_id: "referidos-android",
      app_version: MOBILE_ENV.APP_VERSION,
      build_id: MOBILE_ENV.APP_VERSION,
      env: __DEV__ ? "development" : "production",
      network: readNetworkSummary(),
      device_summary: readDeviceSummary(),
      app_state: AppState.currentState || "unknown",
    });

    observability.setContextProvider(() => ({
      network: readNetworkSummary(),
      app_state: AppState.currentState || "unknown",
    }));

    const cleanupGlobalErrors = installGlobalErrorTracking();
    const appStateSub = AppState.addEventListener("change", (nextState) => {
      observability.setContext({
        app_state: nextState,
        network: readNetworkSummary(),
        device_summary: readDeviceSummary(nextState),
      });
      if (nextState !== "active") {
        void observability.flush();
      }
    });

    const dimensionsSub = Dimensions.addEventListener("change", () => {
      observability.setContext({
        device_summary: readDeviceSummary(),
      });
    });

    const heartbeat = setInterval(() => {
      observability.setContext({
        network: readNetworkSummary(),
      });
    }, 30000);

    return () => {
      clearInterval(heartbeat);
      appStateSub.remove();
      dimensionsSub.remove();
      observability.setContextProvider(null);
      cleanupGlobalErrors();
      void observability.flush();
    };
  }, []);

  useEffect(() => {
    const user = onboarding?.usuario || {};
    observability.setContext({
      role: role || null,
      user_ref: {
        role: role || null,
        user_id: user?.id || null,
        auth_user_id: user?.id_auth || null,
        public_user_id: user?.public_id || null,
      },
    });
  }, [onboarding, role]);

  if (bootStatus === "idle" || bootStatus === "loading") {
    return <GlobalLoader label="Inicializando Referidos Android..." />;
  }

  if (bootStatus === "error") {
    return <GlobalLoader label={`Error de bootstrap: ${bootError || "desconocido"}`} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={syncRouteContext}
        onStateChange={syncRouteContext}
      >
        <RootNavigator />
        <ModalHost />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
