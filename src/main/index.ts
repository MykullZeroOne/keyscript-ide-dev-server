import { app, shell, BrowserWindow } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { setupProxy } from './proxy'
import { setupIpc } from './ipc'
import dotenv from 'dotenv'

dotenv.config()

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      webviewTag: true // Critical for script execution
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // Load the renderer through our proxy server
  // This ensures Same-Origin with the Keystone proxy for JSESSIONID cookies
  const port = process.env.PORT || 3000;
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadURL(`http://localhost:${port}/ide/index.html`);
  }
}

// Load saved settings for proxy endpoint
import { existsSync as fsExistsSync, readFileSync } from 'fs'
const settingsFile = path.join(app.getPath('userData'), 'settings.json')
let savedEndpoint = ''
try {
  if (fsExistsSync(settingsFile)) {
    const s = JSON.parse(readFileSync(settingsFile, 'utf-8'))
    savedEndpoint = s.proxyEndpoint || ''
  }
} catch {}
const proxyEndpoint = savedEndpoint || process.env.PROXY_ENDPOINT || 'keystonedev.revfcu.com:8443'
const keystoneHost = proxyEndpoint.replace(/:\d+$/, '')
app.commandLine.appendSwitch('auth-server-whitelist', `localhost,${keystoneHost}`)
app.commandLine.appendSwitch('auth-negotiate-delegate-whitelist', `localhost,${keystoneHost}`)
app.commandLine.appendSwitch('ignore-certificate-errors')

// Accept self-signed certificates for Keystone server
app.on('certificate-error', (event, _webContents, _url, _error, _certificate, callback) => {
  event.preventDefault()
  callback(true)
})

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Setup Proxy Server
  const rootPath = process.cwd();
  const hostPort = Number(process.env.PORT || 3000);
  const servicePort = hostPort + 1;
  // Use saved settings, falling back to env vars / defaults
  let savedCfg: any = {}
  try {
    if (fsExistsSync(settingsFile)) {
      savedCfg = JSON.parse(readFileSync(settingsFile, 'utf-8'))
    }
  } catch {}
  const proxyEndpoint = savedCfg.proxyEndpoint || process.env.PROXY_ENDPOINT || 'keystonedev.revfcu.com:8443';
  const supportedInstances = savedCfg.supportedInstances || (process.env.SUPPORTED_INSTANCES || 'Development|Test|CARDS').split('|');

  try {
    setupProxy(rootPath, hostPort, servicePort, proxyEndpoint, supportedInstances, (event) => {
      const windows = BrowserWindow.getAllWindows();
      if (windows.length > 0) {
        windows[0].webContents.send('network:event', event);
      }
    });
    console.log(`Proxy started on port ${hostPort}, service on ${servicePort}`);
    console.log(`Proxy endpoint: ${proxyEndpoint}, instances: ${supportedInstances.join(', ')}`);
  } catch (e) {
    console.error('Failed to start proxy:', e);
  }
  
  // Setup IPC handlers
  setupIpc();

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
