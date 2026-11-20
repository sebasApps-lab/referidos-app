import React, { useCallback, useContext, useRef, type ReactNode } from "react";
import { type NavigationProp, type ParamListBase, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { StaffLayoutContext } from "./StaffLayoutContext";
import { STAFF_ROUTE_META } from "./staffNavigation";

type Props = { title: string; subtitle?: string; onRefresh?: () => void; children?: ReactNode };

export default function StaffScreenScaffold({ title, subtitle, onRefresh, children }: Props) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const context = useContext(StaffLayoutContext);
  const refreshRef = useRef(onRefresh);
  refreshRef.current = onRefresh;
  const hasRefresh = Boolean(onRefresh);

  useFocusEffect(useCallback(() => {
    const meta = STAFF_ROUTE_META[route.name];
    return context?.registerPage({
      key: route.key,
      route: route.name,
      title: meta?.title ?? title,
      subtitle: meta?.subtitle ?? subtitle,
      navigation,
      onRefresh: hasRefresh ? () => refreshRef.current?.() : undefined,
    });
  }, [context, hasRefresh, navigation, route.key, route.name, subtitle, title]));

  return <View style={styles.body}>{children}</View>;
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    maxWidth: 1280,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#F6F2FB",
  },
});
