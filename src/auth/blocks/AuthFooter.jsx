import React from "react";
import { AUTH_BRAND } from "../constants/authCopy";

export default function AuthFooter({ className = "" }) {
  return (
    <div className={`absolute bottom-2 right-2 text-xs text-white opacity-70 ${className}`}>
      {AUTH_BRAND.alpha}
    </div>
  );
}
