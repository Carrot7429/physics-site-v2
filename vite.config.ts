import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' // Or whatever react import your file currently uses at the very top
import tailwindcss from '@tailwindcss/vite' 
import path from 'path'

export default defineConfig({
  base: '/physics-site-v2/', // 👈 Added this line so your sub-pages and assets map correctly to GitHub Pages
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
