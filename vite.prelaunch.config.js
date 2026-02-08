import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prelaunchSpaRedirectsPlugin = {
  name: "prelaunch-spa-redirects",
  writeBundle() {
    const redirectsPath = path.resolve(__dirname, "dist-prelaunch", "_redirects");
    fs.writeFileSync(redirectsPath, "/* /index.html 200\n", "utf8");
  },
};

export default defineConfig({
  root: "prelaunch",
  envDir: __dirname,
  publicDir: "../public",
  plugins: [react(), tailwindcss(), prelaunchSpaRedirectsPlugin],
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
