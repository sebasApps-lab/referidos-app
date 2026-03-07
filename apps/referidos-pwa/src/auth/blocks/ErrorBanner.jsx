import React from "react";

export default function ErrorBanner({ message, className = "" }) {
  if (!message) return null;
  return <div className={`text-red-500 text-sm ${className}`}>{message}</div>;
}
