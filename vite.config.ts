import { defineConfig } from 'vite'
import { pages, replaceHead } from './scripts/seo.mjs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    {
      name: 'uxora-page-metadata',
      transformIndexHtml(html, context) {
        const path = context.path.replace(/\/$/, '') || '/'
        return replaceHead(html, pages[path] ? path : '/')
      },
    },
    react(),
    tailwindcss(),
  ],
})