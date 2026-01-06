import React from "react";

export default function AuthTabs({ activeTab, onLogin, onRegister }) {
  return (
    <div className="flex items-center gap-3 mb-5 -mt-2">
      <div className="flex-1">
        <div
          className="flex bg-[#f7f5fdff] rounded-xl py-0.75 gap-3"
          style={{ marginLeft: "-10px", marginRight: "-10px", width: "calc(100% + 20px)" }}
        >
          <button
            onClick={onLogin}
            className={`flex-1 text-base font-semibold py-3 px-3 rounded-xl transition-all ${
              activeTab === "login"
                ? "bg-[#5E30A5] text-white shadow flex-[0.85] px-6"
                : "text-[#5E30A5] bg-transparent flex-[1.15]"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={onRegister}
            className={`flex-1 text-base font-semibold py-3 px-5 rounded-xl transition-all ${
              activeTab === "register"
                ? "bg-[#5E30A5] text-white shadow flex-[1.25] px-6"
                : "text-[#5E30A5] bg-transparent flex-[0.75]"
            }`}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
