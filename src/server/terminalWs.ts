/**
 * WebSocket terminal — replaces Electron IPC terminal.
 * Each WebSocket connection gets its own PTY process.
 */
import { Server as HttpServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'
import * as pty from 'node-pty'
import os from 'os'

const shell = os.platform() === 'win32' ? 'powershell.exe' : '/bin/bash'

export function setupTerminalWs(server: HttpServer, defaultCwd: string): void {
  const wss = new WebSocketServer({ server, path: '/ws/terminal' })

  wss.on('connection', (ws: WebSocket, req) => {
    const url = new URL(req.url || '/', `http://${req.headers.host}`)
    const cwd = url.searchParams.get('cwd') || defaultCwd

    let ptyProcess: pty.IPty | null = null

    try {
      ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd,
        env: process.env as Record<string, string>
      })

      ptyProcess.onData((data: string) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data)
        }
      })

      ptyProcess.onExit(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.close()
        }
      })
    } catch (e: any) {
      ws.send(`\r\nError: Failed to start terminal - ${e.message}\r\n`)
      ws.close()
      return
    }

    ws.on('message', (msg: Buffer | string) => {
      if (!ptyProcess) return
      try {
        const str = msg.toString()
        // Try parsing as JSON control message
        if (str.startsWith('{')) {
          const parsed = JSON.parse(str)
          if (parsed.type === 'input') {
            ptyProcess.write(parsed.data)
          } else if (parsed.type === 'resize') {
            ptyProcess.resize(parsed.cols, parsed.rows)
          }
          return
        }
        // Raw text fallback — treat as input
        ptyProcess.write(str)
      } catch {
        // Not JSON, treat as raw terminal input
        ptyProcess.write(msg.toString())
      }
    })

    ws.on('close', () => {
      if (ptyProcess) {
        ptyProcess.kill()
        ptyProcess = null
      }
    })

    ws.on('error', () => {
      if (ptyProcess) {
        ptyProcess.kill()
        ptyProcess = null
      }
    })
  })

  console.log('  Terminal WebSocket ready at /ws/terminal')
}
