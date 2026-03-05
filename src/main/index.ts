import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { setupProxy } from './proxy';
import { setupIpc } from './ipc';
import dotenv from 'dotenv';

dotenv.config();

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
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
  const proxyEndpoint = process.env.PROXY_ENDPOINT || 'keystone:8443';
  const supportedInstances = (process.env.SUPPORTED_INSTANCES || 'Test').split('|');

  setupProxy(rootPath, hostPort, servicePort, proxyEndpoint, supportedInstances, (event) => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length > 0) {
      windows[0].webContents.send('network:event', event);
    }
  });
  
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
