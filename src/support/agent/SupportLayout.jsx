import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MessageSquare, List, Users } from "lucide-react";

const NAV_ITEMS = [
  { to: "/soporte/inbox", label: "Inbox", Icon: List },
  { to: "/soporte/irregulares", label: "Irregulares", Icon: MessageSquare },
  { to: "/admin/asesores", label: "Asesores", Icon: Users, adminOnly: true },
];

export default function SupportLayout({ isAdmin = false }) {
  const location = useLocation();
  const items = NAV_ITEMS.filter((item) => !item.adminOnly || isAdmin);

  return (
    <div className="min-h-screen bg-[#F6F2FB] text-slate-700">
      <div className="lg:pl-64">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[#E9E2F7] bg-white px-4 pb-6 pt-6 lg:block">
          <div className="text-lg font-extrabold text-[#5E30A5]">
            Soporte
          </div>
          <div className="mt-6 space-y-2">
            {items.map((item) => {
              const active = location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[#F0EBFF] text-[#5E30A5]"
                      : "text-slate-600 hover:bg-[#F7F4FF]"
                  }`}
                >
                  <item.Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <main className="px-4 pb-16 pt-6 lg:pl-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
