import { ipcMain, app } from 'electron';
import * as pty from 'node-pty';
import path from 'path';
import os from 'os';

let ptyProcess: pty.IPty | null = null;

export function setupTerminal(mainWindow: any) {
  const rootPath = app.isPackaged ? path.join(process.resourcesPath, 'app') : app.getAppPath();
  const scriptsPath = path.join(rootPath, 'public/scripts');

  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'zsh';

  ipcMain.on('terminal-init', () => {
    if (ptyProcess) {
      // If already exists, just send the current state or clear?
      // For now, let's just recreate it if requested to ensure a fresh session
      ptyProcess.kill();
    }

    ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 24,
      cwd: scriptsPath,
      env: process.env as any
    });

    ptyProcess.onData((data) => {
      mainWindow.webContents.send('terminal-incoming-data', data);
    });
  });

  ipcMain.on('terminal-keystroke', (_event, data) => {
    if (ptyProcess) {
      ptyProcess.write(data);
    }
  });

  ipcMain.on('terminal-resize', (_event, { cols, rows }) => {
    if (ptyProcess) {
      ptyProcess.resize(cols, rows);
    }
  });
}
