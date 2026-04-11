import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function emitBuildHeaders() {
  return {
    name: "prelaunch-build-headers",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const headersPath = path.join(distDir, "_headers");
      const content = `/*
  Cache-Control: public, max-age=0, must-revalidate

/app-config.js
  Cache-Control: no-store, max-age=0

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/favicon/*
  Cache-Control: public, max-age=604800
`;

      fs.writeFileSync(headersPath, content, "utf8");
    },
  };
}

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
  plugins: [react(), tailwindcss(), emitBuildHeaders()],
  build: {
    sourcemap: "hidden",
    manifest: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false,
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return null;
          }

          if (id.includes("react-router-dom")) {
            return "vendor-router";
          }

          if (
            id.includes("react-dom") ||
            id.includes("react/jsx-runtime") ||
            id.includes(`${path.sep}react${path.sep}`)
          ) {
            return "vendor-react";
          }

          return "vendor";
        },
        chunkFileNames: "assets/chunks/[name]-[hash].js",
        entryFileNames: "assets/chunks/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (name?.endsWith(".css")) {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/media/[name]-[hash][extname]";
        },
      },
    },
  },
  server: {
    host: true,
    fs: {
      allow: ["../.."],
    },
    allowedHosts: [
      "indissolubly-preluxurious-harmony.ngrok-free.dev",
      "shiftiest-corinne-spookily.ngrok-free.dev",
      "process-cheap-complex-develop.trycloudflare.com",
      ".trycloudflare.com",
    ],
  },
});
