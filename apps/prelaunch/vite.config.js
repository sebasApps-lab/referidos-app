import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  envDir: path.resolve(__dirname, "../.."),
  resolve: {
    alias: {
      "@referidos/legal-content": path.resolve(
        __dirname,
        "../../packages/legal-content/src/index.js"
      ),
      "@referidos/observability": path.resolve(
        __dirname,
        "../../packages/observability/src/index.js"
      ),
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    fs: {
      allow: ["../.."],
    },
    allowedHosts: [
      "indissolubly-preluxurious-harmony.ngrok-free.dev",
      "shiftiest-corinne-spookily.ngrok-free.dev",
    ],
  },
});
