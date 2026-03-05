import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { join } from 'path'
import { writeFileSync } from 'fs'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { startProxyServer } from './proxy'
import { setupTerminal } from './terminal'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      webviewTag: true // Needed for script execution
    }
  })

  setupTerminal(mainWindow)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // The Electron renderer MUST load from http://localhost:{port}/ide/ (served by the proxy)
  const hostPort = process.env.PORT || 3000
  mainWindow.loadURL(`http://localhost:${hostPort}/ide/`)
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC Handlers
  ipcMain.handle('save-file', async (_event, { path: filePath, content }) => {
    try {
      const rootPath = app.isPackaged ? join(process.resourcesPath, 'app') : app.getAppPath();
      const publicPath = join(rootPath, 'public');
      const fullPath = join(publicPath, filePath);
      
      writeFileSync(fullPath, content, 'utf8');
      return { success: true };
    } catch (err) {
      console.error('Save file error:', err);
      return { success: false, error: (err as Error).message };
    }
  });

  startProxyServer()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
