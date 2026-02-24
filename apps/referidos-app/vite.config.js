import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isRemoteMode = mode === 'remote';

  return {
    envDir: path.resolve(__dirname, '../..'),
    resolve: {
      alias: {
        '@referidos/legal-content': path.resolve(
          __dirname,
          '../../packages/legal-content/src/index.js'
        ),
        '@referidos/observability': path.resolve(
          __dirname,
          '../../packages/observability/src/index.js'
        ),
        '@referidos/support-sdk': path.resolve(__dirname, '../../packages/support-sdk/src'),
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'prompt',
        includeAssets: ['favicon.ico'],
        manifest: {
          name: 'Migo App',
          short_name: 'Migo',
          description: 'Promociones y referidos con QR',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#5E30A5',
          theme_color: '#5E30A5',
          icons: [
            {
              src: '/icons/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
    build: {
      sourcemap: 'hidden',
      rollupOptions: {
        output: {
          sourcemapExcludeSources: false,
        },
      },
    },
    server: {
      host: true,
      fs: {
        allow: ['../..'],
      },
      // In ngrok/remote mode disable HMR to avoid hard reload loops when the tunnel drops background WS.
      hmr: isRemoteMode ? false : undefined,
      // Allow ngrok (or similar) HTTPS tunnels to reach the dev server.
      allowedHosts: [
        'indissolubly-preluxurious-harmony.ngrok-free.dev',
        'shiftiest-corinne-spookily.ngrok-free.dev',
      ],
    },
  };
});
