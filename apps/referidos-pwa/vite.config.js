import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isRemoteMode = mode === "remote";

  return {
    envDir: path.resolve(__dirname, "../.."),
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "prompt",
        manifest: {
          name: "Referidos PWA",
          short_name: "Referidos PWA",
          description: "UI base de acceso para Referidos.",
          start_url: "/",
          scope: "/",
          display: "standalone",
          orientation: "portrait",
          background_color: "#5E30A5",
          theme_color: "#5E30A5",
        },
      }),
    ],
    build: {
      sourcemap: "hidden",
      rollupOptions: {
        output: {
          sourcemapExcludeSources: false,
        },
      },
    },
    server: {
      host: true,
      fs: {
        allow: ["../.."],
      },
      hmr: isRemoteMode ? false : undefined,
      allowedHosts: [
        "indissolubly-preluxurious-harmony.ngrok-free.dev",
        "shiftiest-corinne-spookily.ngrok-free.dev",
        "process-cheap-complex-develop.trycloudflare.com",
        ".trycloudflare.com",
      ],
    },
  };
});
