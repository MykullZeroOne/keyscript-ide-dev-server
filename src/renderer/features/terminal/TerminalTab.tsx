import React, { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

const TerminalTab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const termInstance = useRef<Terminal | null>(null)
  const fitRef = useRef<FitAddon | null>(null)
  const initialized = useRef(false)
  const [ready, setReady] = useState(false)

  // Phase 1: wait for container to have layout dimensions
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (el.clientHeight > 0) {
      setReady(true)
      return
    }

    const ro = new ResizeObserver(() => {
      if (el.clientHeight > 0) {
        setReady(true)
        ro.disconnect()
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Phase 2: once container is ready, create and open the terminal
  useEffect(() => {
    if (!ready || !terminalRef.current || initialized.current) return
    initialized.current = true

    const el = terminalRef.current
    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
        foreground: '#cccccc',
        cursor: '#aeafad',
        selectionBackground: '#264f78'
      },
      fontSize: 12,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace'
    })

    const fit = new FitAddon()
    term.loadAddon(fit)
    fitRef.current = fit
    term.open(el)
    termInstance.current = term

    try { fit.fit() } catch { /* ignore */ }

    window.api.initTerminal('')
    window.api.onTerminalData((data: string) => {
      term.write(data)
    })
    term.onData((data) => {
      window.api.writeTerminal(data)
    })

    const handleResize = (): void => {
      try {
        fit.fit()
        window.api.resizeTerminal(term.cols, term.rows)
      } catch { /* not ready */ }
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(el)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ro.disconnect()
      term.dispose()
    }
  }, [ready])

  return (
    <div ref={containerRef} className="h-full w-full bg-[#1e1e1e]">
      {ready && <div ref={terminalRef} className="h-full w-full" />}
    </div>
  )
}

export default TerminalTab
