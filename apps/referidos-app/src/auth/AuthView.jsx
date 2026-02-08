import React from "react";

export default function AuthView({
  className = "",
  header,
  children,
  footer,
}) {
  return (
    <div className={`flex flex-col items-center min-h-screen bg-[#5E30A5] p-6 ${className}`}>
      {header}
      {children}
      {footer}
    </div>
  );
}
