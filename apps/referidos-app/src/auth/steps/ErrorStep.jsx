import React from "react";
import AuthCard from "../blocks/AuthCard";

export default function ErrorStep({ message }) {
  return (
    <div className="relative w-full max-w-sm mt-2">
      <AuthCard className="p-6">
        <div className="text-center text-sm text-red-500">{message}</div>
      </AuthCard>
    </div>
  );
}
