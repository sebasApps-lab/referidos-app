import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  BottomTabBarHeightCallbackContext,
  type BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {
  Animated,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type LayoutChangeEvent,
} from "react-native";
import { useAppStore } from "@shared/store/appStore";
import { TAB_ROUTES } from "./routeKeys";

const ICON_SIZE = 20;
const INDICATOR_WIDTH = 32;
const ACTIVE = "#5E30A5";
const INACTIVE = "#94A3B8";

const homeIcon = require("./assets/tab-home.png");
const scannerIcon = require("./assets/tab-qr-code.png");
const profileIcon = require("./assets/tab-user.png");

const icons: Record<string, ImageSourcePropType> = {
  [TAB_ROUTES.CLIENTE.INICIO]: homeIcon,
  [TAB_ROUTES.CLIENTE.ESCANER]: scannerIcon,
  [TAB_ROUTES.CLIENTE.HISTORIAL]: require("./assets/tab-tag.png"),
  [TAB_ROUTES.CLIENTE.PERFIL]: profileIcon,
  [TAB_ROUTES.NEGOCIO.INICIO]: homeIcon,
  [TAB_ROUTES.NEGOCIO.ESCANER]: scannerIcon,
  [TAB_ROUTES.NEGOCIO.GESTIONAR]: require("./assets/tab-layout-grid.png"),
  [TAB_ROUTES.NEGOCIO.PERFIL]: profileIcon,
};

type TabButtonProps = {
  label: string;
  focused: boolean;
  source: ImageSourcePropType;
  badgeCount: number;
  accessibilityLabel?: string;
  testID?: string;
  onPress: () => void;
  onLongPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};

function TabButton({
  label,
  focused,
  source,
  badgeCount,
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
  onLayout,
}: TabButtonProps) {
  const [focusProgress] = useState(() => new Animated.Value(focused ? 1 : 0));
  const tintColor = focusProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [INACTIVE, ACTIVE],
    extrapolate: "clamp",
  });

  useEffect(() => {
    const spring = Animated.spring(focusProgress, {
      toValue: focused ? 1 : 0,
      stiffness: 260,
      damping: 18,
      mass: 1,
      useNativeDriver: true,
    });
    spring.start();
    return () => spring.stop();
  }, [focused, focusProgress]);

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={
        accessibilityLabel ?? (badgeCount > 0 ? `${label}, ${badgeCount} notificaciones` : label)
      }
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      onLayout={onLayout}
      style={styles.tab}
    >
      <Animated.Image
        source={source}
        style={[
          styles.icon,
          {
            tintColor,
            transform: [{
              scale: focusProgress.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] }),
            }],
          },
        ]}
      />
      <Animated.Text
        numberOfLines={1}
        style={[
          styles.label,
          {
            color: tintColor,
            opacity: focusProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      {badgeCount > 0 && (
        <View pointerEvents="none" style={styles.badge}>
          <Text style={styles.badgeLabel}>{badgeCount > 99 ? "99+" : badgeCount}</Text>
        </View>
      )}
    </Pressable>
  );
}

export default function MobileRoleTabBar({
  state,
  navigation,
  descriptors,
  insets,
}: BottomTabBarProps) {
  const notificationCount = useAppStore((app) => {
    const user = app.onboarding?.usuario;
    const count = Number(user?.notificaciones?.length || user?.notificacionesCount || 0);
    return Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0;
  });
  const onBarHeightChange = useContext(BottomTabBarHeightCallbackContext);
  const [keyboardVisible, setKeyboardVisible] = useState(() => Keyboard.isVisible());
  const [tabCenters, setTabCenters] = useState<Record<string, number>>({});
  const [indicatorOffset] = useState(() => new Animated.Value(0));
  const hasIndicatorOffset = useRef(false);
  const focusedRoute = state.routes[state.index];
  const hideForKeyboard =
    descriptors[focusedRoute.key].options.tabBarHideOnKeyboard && keyboardVisible;
  const focusedCenter = tabCenters[focusedRoute.key];

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    if (hideForKeyboard) onBarHeightChange?.(0);
  }, [hideForKeyboard, onBarHeightChange]);

  useLayoutEffect(() => {
    if (focusedCenter === undefined) return;
    const offset = focusedCenter - INDICATOR_WIDTH / 2;
    if (!hasIndicatorOffset.current) {
      indicatorOffset.setValue(offset);
      hasIndicatorOffset.current = true;
      return;
    }
    const spring = Animated.spring(indicatorOffset, {
      toValue: offset,
      stiffness: 240,
      damping: 18,
      mass: 1,
      useNativeDriver: true,
    });
    spring.start();
    return () => spring.stop();
  }, [focusedCenter, indicatorOffset]);

  const measureTab = useCallback((routeKey: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    const center = x + width / 2;
    setTabCenters((current) => (
      current[routeKey] === center ? current : { ...current, [routeKey]: center }
    ));
  }, []);

  if (hideForKeyboard) return null;

  return (
    <View
      style={[
        styles.bar,
        { paddingLeft: insets.left, paddingRight: insets.right, paddingBottom: insets.bottom },
      ]}
      onLayout={({ nativeEvent }) => onBarHeightChange?.(nativeEvent.layout.height)}
    >
      <View accessibilityRole="tablist" style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = index === state.index;
          const label = typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title ?? route.name;

          function onPress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate(route),
                target: state.key,
              });
            }
          }

          return (
            <TabButton
              key={route.key}
              label={label}
              focused={focused}
              source={icons[route.name]}
              badgeCount={route.name === TAB_ROUTES.CLIENTE.HISTORIAL ? notificationCount : 0}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={() => navigation.emit({ type: "tabLongPress", target: route.key })}
              onLayout={(event) => measureTab(route.key, event)}
            />
          );
        })}
        {focusedCenter !== undefined && (
          <Animated.View
            pointerEvents="none"
            style={[styles.indicator, { transform: [{ translateX: indicatorOffset }] }]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E9E2F7",
    borderTopWidth: 1,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 57,
    paddingVertical: 8,
  },
  tab: {
    alignItems: "center",
    flexShrink: 1,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  label: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 16.5,
    includeFontPadding: false,
  },
  indicator: {
    position: "absolute",
    left: 0,
    bottom: 4,
    width: INDICATOR_WIDTH,
    height: 4,
    borderRadius: 2,
    backgroundColor: ACTIVE,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    borderRadius: 100,
    backgroundColor: ACTIVE,
    paddingVertical: 2,
    paddingHorizontal: 6,
    elevation: 2,
  },
  badgeLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 10,
    includeFontPadding: false,
  },
});
