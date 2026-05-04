import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'English Quest - Learn English!',
        short_name: 'English Quest',
        description: 'Fun English learning game for kids',
        theme_color: '#6366f1',
        background_color: '#f0f9ff',
        display: 'standalone',
        orientation: 'any',
        icons: [
          { src: 'favicon.ico', sizes: '64x64', type: 'image/x-icon' }
        ]
      }
    })
  ],
})
