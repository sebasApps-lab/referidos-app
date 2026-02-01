import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "prelaunch",
  publicDir: "../public",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../dist-prelaunch",
    rollupOptions: {
      input: {
        prelaunch: "index.html",
      },
    },
  },
  server: {
    host: true,
    fs: {
      allow: [".."],
    },
    allowedHosts: [
      "indissolubly-preluxurious-harmony.ngrok-free.dev",
      "shiftiest-corinne-spookily.ngrok-free.dev",
    ],
  },
});
