import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    // Allow ngrok (or similar) HTTPS tunnels to reach the dev server.
    allowedHosts: [
      'indissolubly-preluxurious-harmony.ngrok-free.dev',
    ],
  },
});
