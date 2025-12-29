import React from "react";
import { motion } from "framer-motion";
import HistorialItem from "./HistorialItem";

export default function HistorialList({ items, variant }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col gap-[2px]"
    >
      {items.map((item) => (
        <HistorialItem key={item.id} item={item} variant={variant} />
      ))}
    </motion.div>
  );
}
