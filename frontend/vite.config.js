import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Teranga Code',
        short_name: 'Teranga Code',
        description: "Prépare tes entretiens d'ingénieur logiciel en voyageant à travers le Sénégal.",
        theme_color: '#00853f',
        background_color: '#f2dfb8',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'pwa-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: 'pwa-512.svg', sizes: '512x512', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
