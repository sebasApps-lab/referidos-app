import React from "react";
import { motion } from "framer-motion";
import HistorialItem from "./HistorialItem";

export default function HistorialList({ items, variant, now }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col gap-0"
    >
      {items.length > 0 && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5E30A5]/20 to-transparent" />
      )}
      {items.map((item, index) => (
        <div key={item.id} className="w-full">
          {index > 0 && (
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5E30A5]/20 to-transparent" />
          )}
          <HistorialItem item={item} variant={variant} now={now} />
        </div>
      ))}
      {items.length > 0 && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#5E30A5]/20 to-transparent" />
      )}
    </motion.div>
  );
}
