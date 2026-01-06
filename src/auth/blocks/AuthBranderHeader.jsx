import React from "react";
import { AUTH_BRAND } from "../constants/authCopy";

export default function AuthBranderHeader({ className = "" }) {
  return (
    <h1 className={`text-white text-3xl font-extrabold ${className}`}>
      {AUTH_BRAND.name}
    </h1>
  );
}
