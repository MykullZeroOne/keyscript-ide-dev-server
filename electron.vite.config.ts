import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { config } from 'dotenv'

config()

const port = Number(process.env.PORT || 3000)
const servicePort = port + 1
const proxyTarget = `http://localhost:${port}`
// If DEVICE_SERVICE_URL is set, /GetDeviceInformation is handled by Express proxy on main port
const deviceTarget = process.env.DEVICE_SERVICE_URL ? proxyTarget : `http://localhost:${servicePort}`

// Build instance proxy routes from .env
const instances = (process.env.SUPPORTED_INSTANCES || 'Test').split('|')
const instanceRoutes: Record<string, string> = {}
for (const inst of instances) {
  instanceRoutes[`/${inst}`] = proxyTarget
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer')
      }
    },
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        '/GetDeviceInformation': deviceTarget,
        '/KeyscriptServlet': proxyTarget,
        '/UserLogin': proxyTarget,
        '/SearchJSON': proxyTarget,
        '/DirectXMLPostJSON': proxyTarget,
        '/SessionStore': proxyTarget,
        '/LoginUserInterface': proxyTarget,
        '/TableListJSON': proxyTarget,
        '/TableBrowser': proxyTarget,
        '/scripts': proxyTarget,
        '/api': proxyTarget,
        ...instanceRoutes
      }
    }
  }
})
