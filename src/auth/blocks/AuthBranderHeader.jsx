import React from "react";
import { AUTH_BRAND } from "../constants/authCopy";

export default function AuthBranderHeader({ className = "" }) {
  return (
    <h1 className={`text-white text-2xl font-semibold ${className}`}>
      {AUTH_BRAND.name}
    </h1>
  );
}
