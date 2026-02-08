import React from "react";

export default function AuthCard({ className = "", children }) {
  return (
    <div className={`bg-white w-full rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );
}
