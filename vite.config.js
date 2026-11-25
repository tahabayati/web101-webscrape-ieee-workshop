import { defineConfig } from 'vite'

// The same one-page pass-through as vercel.json, so the live labs also work on your computer.
const proxy = {
  '/live/books.html': { target: 'https://books.toscrape.com', changeOrigin: true, rewrite: () => '/index.html' },
}

export default defineConfig({
  base: './',
  publicDir: 'public/practice',
  server: { proxy },
  preview: { proxy },
})
