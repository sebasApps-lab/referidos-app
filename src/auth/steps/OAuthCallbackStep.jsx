import React from "react";
import AuthCard from "../blocks/AuthCard";

export default function OAuthCallbackStep() {
  return (
    <div className="relative w-full max-w-sm mt-2">
      <AuthCard className="p-6">
        <div className="text-center text-sm text-gray-500">Procesando...</div>
      </AuthCard>
    </div>
  );
}
