import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
  registerType: 'autoUpdate',
  manifest: {
       "name": "Sandtara Trip",
      "short_name": "Sandtara",
      "description": "Temukan destinasi wisata terbaik di Indonesia",
      "start_url": ".",
      "scope": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#FF9800",
      "orientation": "portrait-primary",
      "categories": ["travel", "tourism"],
      "icons": [
        {
          "src": "icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/maskable-icon.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      "shortcuts": [
        {
          "name": "Lihat Cuaca",
          "short_name": "Cuaca",
          "description": "Cek info cuaca terkini",
          "url": "/cuaca",
          "icons": [{ "src": "icons/icon-96x96.png", "sizes": "96x96" }]
        },
        {
          "name": "Cari Hotel",
          "short_name": "Hotel",
          "description": "Temukan hotel terdekat",
          "url": "/hotel",
          "icons": [{ "src": "icons/icon-96x96.png", "sizes": "96x96" }]
        }
      ],
      "screenshots": [
        {
          "src": "screenshots/desktop-home.png",
          "type": "image/png",
          "sizes": "1366x675"
        },
        {
          "src": "screenshots/mobile-home.png",
          "type": "image/png",
          "sizes": "540x720"
        }
      ]
      }
    })
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://cuaca-harian-production-816b.up.railway.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/weather-hourly': {
        target: 'https://cuaca-jam-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response:', proxyRes.statusCode, req.url);
          });
        },
        rewrite: (path) => path.replace(/^\/weather-hourly/, '')
      }
    }
  }
})
