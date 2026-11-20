import { createContext } from "react";
import type { NavigationProp, ParamListBase } from "@react-navigation/native";

export type StaffPage = {
  key: string;
  route: string;
  title: string;
  subtitle?: string;
  navigation: NavigationProp<ParamListBase>;
  onRefresh?: () => void;
};

export const StaffLayoutContext = createContext<{
  registerPage: (page: StaffPage) => () => void;
} | null>(null);
