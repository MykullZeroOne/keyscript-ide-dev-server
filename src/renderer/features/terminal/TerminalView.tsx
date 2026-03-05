import React, { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { useTerminalStore } from './TerminalStore'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, data: any) => void
        on: (channel: string, func: (...args: any[]) => void) => void
      }
    }
  }
}

export const TerminalView: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<Terminal | null>(null)
  const { setInitialized } = useTerminalStore()

  useEffect(() => {
    if (!terminalRef.current) return

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#0a0a0a',
        foreground: '#e0e0e0',
        cursor: '#3b82f6',
        selectionBackground: 'rgba(59, 130, 246, 0.3)'
      },
      fontSize: 13,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, "Courier New", monospace',
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    term.open(terminalRef.current)
    fitAddon.fit()

    xtermRef.current = term

    // Initialize backend PTY
    window.electron.ipcRenderer.send('terminal-init', {})

    const onDataHandler = (data: string) => {
      term.write(data)
    }

    term.onData((data) => {
      window.electron.ipcRenderer.send('terminal-keystroke', data)
    })

    window.electron.ipcRenderer.on('terminal-incoming-data', onDataHandler)

    const handleResize = () => {
      fitAddon.fit()
      window.electron.ipcRenderer.send('terminal-resize', {
        cols: term.cols,
        rows: term.rows
      })
    }

    window.addEventListener('resize', handleResize)

    setInitialized(true)

    return () => {
      term.dispose()
      window.removeEventListener('resize', handleResize)
      // We don't necessarily want to kill the pty on unmount if it's a persistent tab
      // but if the whole feature is destroyed, maybe.
    }
  }, [setInitialized])

  return (
    <div className="w-full h-full bg-[#0a0a0a] p-2 overflow-hidden">
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  )
}
