import { createContext, useContext } from "react";

export const TreeContext = createContext("desktop");

export function useTree() {
  return useContext(TreeContext);
}
