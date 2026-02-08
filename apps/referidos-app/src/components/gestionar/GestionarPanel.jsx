// src/components/gestionar/GestionarPanel.jsx
import React from "react";
import { motion } from "framer-motion";

export default function GestionarPanel({ activeId, children }) {
  return (
    <motion.div
      key={activeId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-6"
    >
      <div className="rounded-2xl border border-[#E9E2F7] bg-white p-5 shadow-sm">
        {children}
      </div>
    </motion.div>
  );
}
