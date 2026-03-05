import { ipcMain } from 'electron';
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import * as pty from 'node-pty';
import { os } from 'os';

export function setupIpc() {
  // File System IPC
  ipcMain.handle('file:read', async (_, filePath: string) => {
    try {
      if (!existsSync(filePath)) return null;
      return await readFile(filePath, 'utf-8');
    } catch (e) {
      console.error('Failed to read file:', e);
      return null;
    }
  });

  ipcMain.handle('file:write', async (_, filePath: string, content: string) => {
    try {
      await writeFile(filePath, content, 'utf-8');
      return { success: true };
    } catch (e) {
      console.error('Failed to write file:', e);
      return { success: false, error: (e as Error).message };
    }
  });

  // Terminal IPC (Basic implementation)
  let ptyProcess: pty.IPty | null = null;

  ipcMain.on('terminal:init', (event, rootDir: string) => {
    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 24,
      cwd: rootDir,
      env: process.env as any
    });

    ptyProcess.onData((data) => {
      event.reply('terminal:data', data);
    });
  });

  ipcMain.on('terminal:write', (_, data: string) => {
    ptyProcess?.write(data);
  });

  ipcMain.on('terminal:resize', (_, { cols, rows }) => {
    ptyProcess?.resize(cols, rows);
  });
}
