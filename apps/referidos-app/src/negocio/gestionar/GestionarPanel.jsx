// src/components/gestionar/GestionarPanel.jsx
import React from "react";
import { motion } from "framer-motion";

export default function GestionarPanel({ activeId, children }) {
  // TEMP lint: splash de montaje mientras completamos el refactor de motion.
  const TEMP_MOTION_SPLASH_TAG = motion.div;

  return (
    <TEMP_MOTION_SPLASH_TAG
      key={activeId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-6"
    >
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
        {children}
      </div>
    </TEMP_MOTION_SPLASH_TAG>
  );
}
