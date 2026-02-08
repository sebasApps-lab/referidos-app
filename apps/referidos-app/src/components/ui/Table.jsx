// src/components/ui/Table.jsx
import React from "react";

const alignClass = (align) => {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
};

export default function Table({ columns = [], children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[#E9E2F7] bg-white shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#F7F4FF] text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key || column.label}
                  className={`px-4 py-3 font-semibold ${alignClass(
                    column.align
                  )} ${column.hideOnMobile ? "hidden md:table-cell" : ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1ECFB]">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
