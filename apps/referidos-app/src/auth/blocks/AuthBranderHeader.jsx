import React from "react";
import { AUTH_BRAND } from "../constants/authCopy";

export default function AuthBranderHeader({ className = "", text }) {
  return (
    <h1 className={`text-white text-2xl font-semibold ${className}`}>
      {text || AUTH_BRAND.name}
    </h1>
  );
}
