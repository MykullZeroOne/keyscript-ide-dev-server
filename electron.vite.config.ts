import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    base: '/ide/',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer'),
        '@features': resolve('src/renderer/features'),
        '@shell': resolve('src/renderer/shell'),
        '@components': resolve('src/renderer/components'),
        '@assets': resolve('src/renderer/assets')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
